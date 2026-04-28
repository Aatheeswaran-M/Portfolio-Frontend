import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultPortfolioData } from '../data/defaultPortfolioData'
import { isSupabaseConfigured, supabase, supabaseConfig } from '../lib/supabaseClient'

const STORAGE_KEY = 'portfolio-admin-content-v2'
const PortfolioDataContext = createContext(undefined)

const cloneDefaultData = () => JSON.parse(JSON.stringify(defaultPortfolioData))

const ensureArray = (value, fallback) => {
  if (Array.isArray(value)) {
    return value
  }

  return fallback
}

const normalizeSidebarItems = (items, fallback) => {
  const sourceItems = Array.isArray(items) ? items.filter(Boolean) : []

  return [
    ...fallback.map((fallbackItem) => {
      const match = sourceItems.find((item) => item?.href === fallbackItem.href)

      return match ? { ...fallbackItem, ...match } : fallbackItem
    }),
    ...sourceItems.filter(
      (item) => item?.href && !fallback.some((fallbackItem) => fallbackItem.href === item.href),
    ),
  ]
}

const normalizeData = (value) => {
  const defaults = cloneDefaultData()

  if (!value || typeof value !== 'object') {
    return defaults
  }

  return {
    ...defaults,
    ...value,
    hero: {
      ...defaults.hero,
      ...value.hero,
      roles: ensureArray(value.hero?.roles, defaults.hero.roles),
      badges: ensureArray(value.hero?.badges, defaults.hero.badges),
    },
    proof: {
      ...defaults.proof,
      ...value.proof,
      metrics: ensureArray(value.proof?.metrics, defaults.proof.metrics),
    },
    about: {
      ...defaults.about,
      ...value.about,
      paragraphs: ensureArray(value.about?.paragraphs, defaults.about.paragraphs),
    },
    experience: {
      ...defaults.experience,
      ...value.experience,
      items: ensureArray(value.experience?.items, defaults.experience.items),
    },
    skills: {
      ...defaults.skills,
      ...value.skills,
      groups: ensureArray(value.skills?.groups, defaults.skills.groups),
    },
    projects: {
      ...defaults.projects,
      ...value.projects,
      items: ensureArray(value.projects?.items, defaults.projects.items),
    },
    certificates: {
      ...defaults.certificates,
      ...value.certificates,
      items: ensureArray(value.certificates?.items, defaults.certificates.items),
    },
    whyHire: {
      ...defaults.whyHire,
      ...value.whyHire,
      items: ensureArray(value.whyHire?.items, defaults.whyHire.items),
    },
    learning: {
      ...defaults.learning,
      ...value.learning,
      items: ensureArray(value.learning?.items, defaults.learning.items),
    },
    contact: {
      ...defaults.contact,
      ...value.contact,
      methods: ensureArray(value.contact?.methods, defaults.contact.methods),
    },
    sidebar: {
      ...defaults.sidebar,
      ...value.sidebar,
      items: normalizeSidebarItems(value.sidebar?.items, defaults.sidebar.items),
    },
  }
}

const readLocalContent = () => {
  if (typeof window === 'undefined') {
    return cloneDefaultData()
  }

  const savedContent = window.localStorage.getItem(STORAGE_KEY)

  if (!savedContent) {
    return cloneDefaultData()
  }

  try {
    return normalizeData(JSON.parse(savedContent))
  } catch (error) {
    console.error('Failed to parse saved portfolio content, using defaults.', error)
    return cloneDefaultData()
  }
}

const writeLocalContent = (value) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
}

const getCloudErrorMessage = (error) => {
  const rawMessage = typeof error?.message === 'string' ? error.message.trim() : ''

  if (/fetch failed|failed to fetch|networkerror/i.test(rawMessage)) {
    return supabaseConfig.host
      ? `Could not reach Supabase at ${supabaseConfig.host}. Check VITE_SUPABASE_URL, and make sure the project is active.`
      : 'Could not reach Supabase. Check VITE_SUPABASE_URL and your network connection.'
  }

  if (typeof error?.message === 'string' && error.message.trim()) {
    return error.message
  }

  return 'Unknown cloud sync error.'
}

export const PortfolioDataProvider = ({ children }) => {
  const [content, setContentState] = useState(() => readLocalContent())
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncError, setSyncError] = useState('')
  const [lastSyncedAt, setLastSyncedAt] = useState('')

  useEffect(() => {
    writeLocalContent(content)
  }, [content])

  useEffect(() => {
    let isMounted = true

    const loadFromCloud = async () => {
      if (!supabase) {
        return
      }

      setIsSyncing(true)

      try {
        const { data, error } = await supabase
          .from(supabaseConfig.table)
          .select('content')
          .eq('id', supabaseConfig.rowId)
          .maybeSingle()

        if (error) {
          throw error
        }

        if (!isMounted || !data?.content) {
          return
        }

        const normalized = normalizeData(data.content)
        setContentState(normalized)
        setSyncError('')
        setLastSyncedAt(new Date().toISOString())
      } catch (error) {
        if (!isMounted) {
          return
        }

        const message = getCloudErrorMessage(error)
        setSyncError(message)
        console.error('Cloud load failed. Falling back to local content.', error)
      } finally {
        if (isMounted) {
          setIsSyncing(false)
        }
      }
    }

    loadFromCloud()

    return () => {
      isMounted = false
    }
  }, [])

  const setContent = (updater) => {
    setContentState((previous) => {
      const nextValue = typeof updater === 'function' ? updater(previous) : updater
      return normalizeData(nextValue)
    })
  }

  const saveContent = async (nextValue) => {
    const normalized = normalizeData(nextValue)
    setContentState(normalized)

    if (!supabase) {
      return {
        ok: true,
        persistedToCloud: false,
        message:
          'Saved locally. Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
      }
    }

    setIsSyncing(true)

    try {
      const { error } = await supabase.from(supabaseConfig.table).upsert(
        {
          id: supabaseConfig.rowId,
          content: normalized,
        },
        {
          onConflict: 'id',
        },
      )

      if (error) {
        throw error
      }

      setSyncError('')
      setLastSyncedAt(new Date().toISOString())

      return {
        ok: true,
        persistedToCloud: true,
        message: 'Saved successfully to Supabase.',
      }
    } catch (error) {
      const message = getCloudErrorMessage(error)
      setSyncError(message)
      console.error('Cloud save failed. Content is still stored locally.', error)

      return {
        ok: false,
        persistedToCloud: false,
        message,
      }
    } finally {
      setIsSyncing(false)
    }
  }

  const resetContent = async ({ syncToCloud = false } = {}) => {
    const defaults = cloneDefaultData()

    if (syncToCloud) {
      return saveContent(defaults)
    }

    setContentState(defaults)

    return {
      ok: true,
      persistedToCloud: false,
      message: 'Reset locally.',
    }
  }

  const contextValue = useMemo(
    () => ({
      content,
      setContent,
      saveContent,
      resetContent,
      defaultContent: defaultPortfolioData,
      isCloudEnabled: isSupabaseConfigured,
      isSyncing,
      syncError,
      lastSyncedAt,
      cloudTable: supabaseConfig.table,
      cloudRowId: supabaseConfig.rowId,
    }),
    [content, isSyncing, lastSyncedAt, resetContent, saveContent, setContent, syncError],
  )

  return (
    <PortfolioDataContext.Provider value={contextValue}>
      {children}
    </PortfolioDataContext.Provider>
  )
}

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext)

  if (!context) {
    throw new Error('usePortfolioData must be used within PortfolioDataProvider')
  }

  return context
}
