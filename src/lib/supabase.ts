import { createClient } from "@supabase/supabase-js"

/**
 * Browser-side Supabase client. Uses ONLY the publishable (anon) key —
 * the service-role key must never appear in frontend code or bundles.
 * VITE_ variables are inlined at build time; they must exist in the
 * deployment environment (Vercel/Netlify project settings) or auth will
 * not work in production.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ""
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ""

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail loudly in the console but do not crash the whole app —
  // public content pages still render from the Express API.
  console.error(
    "[Supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY missing. " +
      "Authentication and profile features will not work.",
  )
}

export const supabase = createClient(supabaseUrl || "https://placeholder.supabase.co", supabaseAnonKey || "public-anon-key")

export default supabase
