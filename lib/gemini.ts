import { claimAnalysisSchema } from "./schema";
import { analyzeDemo } from "./demo-analyzer";
import type { ClaimAnalysis } from "./types";

const responseSchema = {
  type: "OBJECT",
  properties: {
    claimType: { type: "STRING", enum: ["vehicle", "property", "health", "travel", "life", "other"] },
    severity: { type: "STRING", enum: ["low", "medium", "high", "critical"] },
    summary: { type: "STRING" },
    injuries: { type: "BOOLEAN", nullable: true },
    incidentDate: { type: "STRING", nullable: true },
    location: { type: "STRING", nullable: true },
    entities: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: { label: { type: "STRING" }, value: { type: "STRING" } },
        required: ["label", "value"]
      }
    },
    missingInformation: { type: "ARRAY", items: { type: "STRING" } },
    recommendedDocuments: { type: "ARRAY", items: { type: "STRING" } },
    nextAction: { type: "STRING" },
    confidence: { type: "NUMBER" },
    riskFlags: { type: "ARRAY", items: { type: "STRING" } },
    rationale: { type: "ARRAY", items: { type: "STRING" } }
  },
  required: [
    "claimType", "severity", "summary", "injuries", "incidentDate", "location", "entities",
    "missingInformation", "recommendedDocuments", "nextAction", "confidence", "riskFlags", "rationale"
  ]
};

const systemPrompt = `You are a conservative insurance-claims intake assistant. Analyze only the supplied fictional demo text. Do not decide coverage, liability, fraud, or payout. Extract facts, identify missing intake information, and recommend a human-review next step. Use the same language as the input for user-facing text. Confidence must be 0..1. Rationale must be concise and based only on explicit text.`;

function getModelCandidates() {
  const configured = process.env.GEMINI_MODEL?.trim();
  return Array.from(new Set([
    ...(configured ? [configured] : []),
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite"
  ]));
}

async function requestGemini(apiKey: string, model: string, description: string) {
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts: [{ text: description }] }],
        generationConfig: {
          temperature: 0.15,
          responseMimeType: "application/json",
          responseSchema
        }
      }),
      cache: "no-store"
    }
  );
}

function shouldTryNextModel(status: number) {
  return status === 404 || status === 408 || status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}

export async function analyzeWithAI(description: string): Promise<{ analysis: ClaimAnalysis; provider: string; model: string }> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    return { analysis: analyzeDemo(description), provider: "demo", model: "deterministic-fallback" };
  }

  const models = getModelCandidates();
  let lastError = "Gemini request failed";

  for (const model of models) {
    try {
      const response = await requestGemini(apiKey, model, description);

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        lastError = `Gemini ${model} failed with ${response.status}`;
        console.error(lastError, body.slice(0, 500));

        if (shouldTryNextModel(response.status)) continue;
        throw new Error(lastError);
      }

      const payload = await response.json();
      const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        lastError = `Gemini ${model} returned no structured content`;
        console.error(lastError);
        continue;
      }

      try {
        const analysis = claimAnalysisSchema.parse(JSON.parse(text));
        return { analysis, provider: "google-gemini", model };
      } catch (error) {
        lastError = `Gemini ${model} returned invalid structured content`;
        console.error(lastError, error);
      }
    } catch (error) {
      if (error instanceof Error && error.message === lastError) throw error;
      lastError = `Gemini ${model} network request failed`;
      console.error(lastError, error);
      continue;
    }
  }

  console.warn("All Gemini candidates failed; using deterministic demo fallback");
  return { analysis: analyzeDemo(description), provider: "demo", model: "deterministic-fallback" };
}
