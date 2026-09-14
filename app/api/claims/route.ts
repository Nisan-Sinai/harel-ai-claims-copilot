import { NextResponse } from "next/server";
import { createClaimSchema } from "@/lib/schema";
import { analyzeWithAI } from "@/lib/gemini";
import { getServerSupabase } from "@/lib/supabase";
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getServerSupabase();
  const { data, error } = await supabase.rpc("list_claims");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ claims: data ?? [], mode: "supabase" });
}

export async function POST(request: Request) {
  try {
    const input = createClaimSchema.parse(await request.json());
    const result = await analyzeWithAI(input.description);
    const supabase = getServerSupabase();
    const { data, error } = await supabase.rpc("create_claim", {
      p_description: input.description,
      p_analysis: result.analysis,
      p_ai_provider: result.provider,
      p_model: result.model
    });
    if (error) throw error;
    return NextResponse.json({ claim: Array.isArray(data) ? data[0] : data, persisted: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 400 });
  }
}
