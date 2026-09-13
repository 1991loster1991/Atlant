import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Verificamos de forma estricta si la variable existe y no está vacía o llena de espacios
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabaseUrl = (rawUrl && rawUrl.trim().length > 0) ? rawUrl.trim() : 'https://placeholder.supabase.co';
  const supabaseKey = (rawKey && rawKey.trim().length > 0) ? rawKey.trim() : 'placeholder-anon-key';

  return createBrowserClient(supabaseUrl, supabaseKey);
}