import { NextResponse } from "next/server";
import { createClaimSchema } from "@/lib/schema";
import { analyzeWithAI } from "@/lib/gemini";
import { redactSensitiveText, redactSensitiveValue } from "@/lib/redact";
import { getServerSupabase } from "@/lib/supabase";
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getServerSupabase();
  const { data, error } = await supabase.rpc("list_claims");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ claims: redactSensitiveValue(data ?? []), mode: "supabase" });
}

export async function POST(request: Request) {
  try {
    const input = createClaimSchema.parse(await request.json());
    const safeDescription = redactSensitiveText(input.description);
    const result = await analyzeWithAI(safeDescription);
    const safeAnalysis = redactSensitiveValue(result.analysis);
    const supabase = getServerSupabase();
    const { data, error } = await supabase.rpc("create_claim", {
      p_description: safeDescription,
      p_analysis: safeAnalysis,
      p_ai_provider: result.provider,
      p_model: result.model
    });
    if (error) throw error;
    const claim = Array.isArray(data) ? data[0] : data;
    return NextResponse.json({ claim: redactSensitiveValue(claim), persisted: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 400 });
  }
}
