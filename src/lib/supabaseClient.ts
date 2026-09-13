import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Usamos una URL de respaldo válida para que el build de Vercel nunca falle por falta de variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}