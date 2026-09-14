import { claimAnalysisSchema } from "./schema";
import { analyzeDemo } from "./demo-analyzer";
import type { ClaimAnalysis } from "./types";

const responseSchema = {
  type: "OBJECT",
  properties: {
    claimType: { type: "STRING", enum: ["vehicle", "property", "health", "travel", "life", "other"] },
    severity: { type: "STRING", enum: ["low", "medium", "high", "critical"] },
    summary: { type: "STRING" }, injuries: { type: "BOOLEAN", nullable: true },
    incidentDate: { type: "STRING", nullable: true }, location: { type: "STRING", nullable: true },
    entities: { type: "ARRAY", items: { type: "OBJECT", properties: { label: { type: "STRING" }, value: { type: "STRING" } }, required: ["label", "value"] } },
    missingInformation: { type: "ARRAY", items: { type: "STRING" } }, recommendedDocuments: { type: "ARRAY", items: { type: "STRING" } },
    nextAction: { type: "STRING" }, confidence: { type: "NUMBER" }, riskFlags: { type: "ARRAY", items: { type: "STRING" } }, rationale: { type: "ARRAY", items: { type: "STRING" } }
  },
  required: ["claimType", "severity", "summary", "injuries", "incidentDate", "location", "entities", "missingInformation", "recommendedDocuments", "nextAction", "confidence", "riskFlags", "rationale"]
};

export async function analyzeWithAI(description: string): Promise<{ analysis: ClaimAnalysis; provider: string; model: string }> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  if (!apiKey) return { analysis: analyzeDemo(description), provider: "demo", model: "deterministic-fallback" };
  const systemPrompt = `You are a conservative insurance-claims intake assistant. Analyze only the supplied fictional demo text. Do not decide coverage, liability, fraud, or payout. Extract facts, identify missing intake information, and recommend a human-review next step. Use the same language as the input for user-facing text. Confidence must be 0..1. Rationale must be concise and based only on explicit text.`;
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${apiKey}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ system_instruction: { parts: [{ text: systemPrompt }] }, contents: [{ role: "user", parts: [{ text: description }] }], generationConfig: { temperature: 0.15, responseMimeType: "application/json", responseSchema } }), cache: "no-store" });
  if (!response.ok) throw new Error(`Gemini request failed: ${response.status}`);
  const payload = await response.json(); const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned no structured content");
  return { analysis: claimAnalysisSchema.parse(JSON.parse(text)), provider: "google-gemini", model };
}
