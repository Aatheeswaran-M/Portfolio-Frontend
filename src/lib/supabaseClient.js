import { createClient } from '@supabase/supabase-js'

const readEnvValue = (...keys) => {
  for (const key of keys) {
    const value = import.meta.env[key]

    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
  }

  return ''
}

const supabaseUrl = readEnvValue('VITE_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL')
const supabaseAnonKey = readEnvValue(
  'VITE_SUPABASE_ANON_KEY',
  'VITE_SUPABASE_PUBLISHABLE_KEY',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
)

const contentTable =
  readEnvValue('VITE_SUPABASE_CONTENT_TABLE', 'NEXT_PUBLIC_SUPABASE_CONTENT_TABLE') ||
  'portfolio_content'
const contentRowId =
  readEnvValue('VITE_SUPABASE_CONTENT_ROW_ID', 'NEXT_PUBLIC_SUPABASE_CONTENT_ROW_ID') ||
  'portfolio-main'
const supabaseHost = (() => {
  if (!supabaseUrl) {
    return ''
  }

  try {
    return new URL(supabaseUrl).host
  } catch {
    return ''
  }
})()

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    })
  : null

export const supabaseConfig = {
  table: contentTable,
  rowId: contentRowId,
  url: supabaseUrl || '',
  host: supabaseHost,
}
