import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getServerSupabase();
    const { error } = await supabase.rpc("list_claims");
    const database = error ? "error" : "ok";

    return NextResponse.json({
      status: database === "error" ? "degraded" : "ok",
      database,
      ai: process.env.GEMINI_API_KEY?.trim() ? "gemini" : "demo-fallback",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Health check failed", error);
    return NextResponse.json(
      {
        status: "degraded",
        database: "error",
        ai: process.env.GEMINI_API_KEY?.trim() ? "gemini" : "demo-fallback",
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    );
  }
}
