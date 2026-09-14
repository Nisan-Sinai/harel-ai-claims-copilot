import { NextResponse } from "next/server";
import { redactSensitiveValue } from "@/lib/redact";
import { getServerSupabase } from "@/lib/supabase";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const supabase = getServerSupabase();
  const { data, error } = await supabase.rpc("get_claim", { p_id: id });
  const claim = Array.isArray(data) ? data[0] : data;
  if (error || !claim) return NextResponse.json({ error: error?.message ?? "Claim not found" }, { status: 404 });
  return NextResponse.json({ claim: redactSensitiveValue(claim) });
}
