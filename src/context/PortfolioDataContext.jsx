import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultPortfolioData } from '../data/defaultPortfolioData'

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

export const PortfolioDataProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
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
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  }, [content])

  const resetContent = () => {
    setContent(cloneDefaultData())
  }

  const contextValue = useMemo(
    () => ({
      content,
      setContent,
      resetContent,
      defaultContent: defaultPortfolioData,
    }),
    [content],
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
