import { createBrowserClient } from '@supabase/ssr'

// ¡Asegúrate de que tenga la palabra export adelante!
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}