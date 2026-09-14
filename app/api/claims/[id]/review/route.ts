import { NextResponse } from "next/server";
import { reviewClaimSchema } from "@/lib/schema";
import { getServerSupabase } from "@/lib/supabase";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const input = reviewClaimSchema.parse(await request.json());
    const supabase = getServerSupabase();
    const { data, error } = await supabase.rpc("review_claim", {
      p_id: id,
      p_action: input.action,
      p_notes: input.reviewerNotes,
      p_analysis: input.action === "correct" && input.analysis ? input.analysis : null
    });
    if (error) throw error;
    return NextResponse.json({ claim: Array.isArray(data) ? data[0] : data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 400 });
  }
}
