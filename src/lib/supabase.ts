import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn("Supabase credentials not configured. Using mock mode.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getSupabaseSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function supabaseSignOut() {
  await supabase.auth.signOut();
}
