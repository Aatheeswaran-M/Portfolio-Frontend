import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

const contentTable = import.meta.env.VITE_SUPABASE_CONTENT_TABLE || 'portfolio_content'
const contentRowId = import.meta.env.VITE_SUPABASE_CONTENT_ROW_ID || 'portfolio-main'
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
