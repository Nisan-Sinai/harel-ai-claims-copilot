import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://huuoraggmtuylohwbipb.supabase.co";
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Q37u2OD8WORw7KEXv5jvEA_dOD-hmmz";

export function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? DEFAULT_SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY ?? DEFAULT_SUPABASE_PUBLISHABLE_KEY;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}
