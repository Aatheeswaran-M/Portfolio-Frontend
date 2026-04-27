import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaBook,
  FaBriefcase,
  FaCertificate,
  FaCode,
  FaEnvelope,
  FaHome,
  FaProjectDiagram,
  FaQuestion,
  FaUser,
  FaUserShield,
} from 'react-icons/fa'
import { usePortfolioData } from '../context/PortfolioDataContext'

const navigationIcons = {
  FaBook,
  FaBriefcase,
  FaCertificate,
  FaCode,
  FaEnvelope,
  FaHome,
  FaProjectDiagram,
  FaQuestion,
  FaUser,
  FaUserShield,
}

const defaultMenu = [
  { icon: 'FaHome', label: 'Home', href: '#hero' },
  { icon: 'FaUser', label: 'About', href: '#about' },
  { icon: 'FaBriefcase', label: 'Experience', href: '#experience' },
  { icon: 'FaProjectDiagram', label: 'Projects', href: '#projects' },
  { icon: 'FaEnvelope', label: 'Contact', href: '#contact' },
]

const buildMenuItems = (items) => {
  const sourceItems = Array.isArray(items) ? items.filter(Boolean) : []

  return [
    ...defaultMenu.map((defaultItem) => {
      const match = sourceItems.find((item) => item?.href === defaultItem.href)

      return match ? { ...defaultItem, ...match } : defaultItem
    }),
    ...sourceItems.filter(
      (item) => item?.href && !defaultMenu.some((defaultItem) => defaultItem.href === item.href),
    ),
  ]
}

const Sidebar = () => {
  const { content } = usePortfolioData()
  const sourceItems = Array.isArray(content.sidebar?.items)
    ? content.sidebar.items
    : []
  const allMenuItems = buildMenuItems(sourceItems)
  // Only show the first 5 menu items for the sidebar
  const navItems = allMenuItems.slice(0, 5)
  const mobileNavItems = navItems
  const [activeHref, setActiveHref] = useState('#hero')

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const updateActiveSection = () => {
      const scanLine = window.scrollY + (window.innerHeight * 0.35)
      let currentSection = '#hero'

      for (const item of navItems) {
        if (!item.href?.startsWith('#')) {
          continue
        }

        const section = document.querySelector(item.href)

        if (section && section.offsetTop <= scanLine) {
          currentSection = item.href
        }
      }

      setActiveHref(currentSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('hashchange', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('hashchange', updateActiveSection)
    }
  }, [navItems])

  const renderNavItem = (item, index, compact = false) => {
    const IconComponent = navigationIcons[item.icon] ?? FaCode
    const isActive = activeHref === item.href

    return (
      <motion.a
        key={`${item.label}-${index}-${compact ? 'mobile' : 'desktop'}`}
        href={item.href || '#'}
        aria-label={item.label}
        onClick={() => {
          if (item.href?.startsWith('#')) {
            setActiveHref(item.href)
          }
        }}
        target={item.href?.startsWith('http') ? '_blank' : undefined}
        rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        title={item.label}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06, duration: 0.4 }}
        whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0], y: compact ? -3 : -6, filter: 'brightness(1.2)' }}
        whileTap={{ scale: 0.9 }}
        className={
          compact
            ? `group relative flex min-w-18 flex-none flex-col items-center justify-center rounded-xl px-2 py-2 text-[10px] font-medium leading-tight transition-all duration-300 ${isActive
              ? 'bg-linear-to-br from-cyan-400/25 to-blue-500/25 text-white shadow-[0_8px_18px_rgba(56,189,248,0.25)]'
              : 'text-slate-300 hover:bg-white/10 hover:text-white'}`
            : `group relative flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 ${isActive
              ? 'border-cyan-300/60 bg-linear-to-br from-cyan-400/25 to-blue-500/25 text-white shadow-[0_12px_28px_rgba(56,189,248,0.28)]'
              : 'border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/60 hover:bg-white/10 hover:text-white'}`
        }
      >
        {isActive && (
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-xl md:rounded-2xl border border-cyan-300/80"
            animate={{ opacity: [0.45, 1, 0.45], scale: [0.94, 1.06, 0.94], rotate: [0, 180, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        )}

        <IconComponent
          className={
            compact
              ? `text-lg transition-transform duration-300 ${isActive ? 'drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]' : 'group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.55)]'}`
              : `text-xl transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_14px_rgba(56,189,248,0.8)]' : 'group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.55)]'}`
          }
        />

        <span
          className={`pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-semibold text-cyan-100 opacity-0 shadow-[0_8px_16px_rgba(34,211,238,0.2)] backdrop-blur-sm transition-all duration-250 group-hover:-translate-y-1 group-hover:opacity-100 group-focus-visible:-translate-y-1 group-focus-visible:opacity-100 ${compact
            ? '-top-9 border-cyan-300/60 bg-linear-to-r from-slate-900/95 to-slate-800/95'
            : '-top-10 border-cyan-300/60 bg-linear-to-r from-slate-900/95 to-slate-800/95'}`}
        >
          <span className="absolute inset-0 -z-10 rounded-lg bg-linear-to-r from-cyan-400/15 to-blue-500/15 blur-md" />
          {item.label}
        </span>
      </motion.a>
    )
  }

  return (
    <>
      <motion.nav
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="fixed left-3 top-1/2 z-50 hidden -translate-y-1/2 md:block"
      >
        <div className="relative overflow-visible rounded-3xl border border-cyan-300/20 bg-slate-900/75 p-3 shadow-[0_24px_60px_rgba(2,6,23,0.75)] backdrop-blur-xl">
          <motion.div
            className="pointer-events-none absolute left-1/2 top-2 h-20 w-20 -translate-x-1/2 rounded-full bg-cyan-400/25 blur-2xl"
            animate={{ x: [-6, 8, -6], y: [-2, 10, -2], scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative flex flex-col gap-3">
            {navItems.map((item, index) => renderNavItem(item, index))}
          </div>
        </div>
      </motion.nav>

      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="fixed inset-x-0 bottom-3 z-50 px-3 md:hidden"
      >
        <div className="relative mx-auto w-full max-w-md overflow-visible rounded-2xl border border-cyan-300/20 bg-slate-900/88 p-2 shadow-[0_18px_44px_rgba(2,6,23,0.75)] backdrop-blur-xl">
          <motion.div
            className="pointer-events-none absolute -top-10 left-1/2 h-20 w-24 -translate-x-1/2 rounded-full bg-cyan-400/25 blur-2xl"
            animate={{ x: [-4, 6, -4], scale: [1, 1.12, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative flex items-center gap-1 overflow-x-auto pb-1">
            {mobileNavItems.map((item, index) => renderNavItem(item, index, true))}
          </div>
        </div>
      </motion.nav>
    </>
  )
}

export default Sidebar
