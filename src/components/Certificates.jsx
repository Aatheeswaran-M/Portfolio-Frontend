import { useMemo, useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { usePortfolioData } from '../context/PortfolioDataContext'

const Certificates = () => {
  const { content } = usePortfolioData()
  const certificatesSection = content.certificates ?? {}
  const certificates = Array.isArray(certificatesSection.items) ? certificatesSection.items : []
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const scrollRef = useRef(null)

  // Auto-advance carousel
  useEffect(() => {
    if (certificates.length === 0 || isHovering) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % certificates.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [certificates.length, isHovering])

  const safeActiveIndex = useMemo(() => {
    if (certificates.length === 0) {
      return 0
    }

    return activeIndex % certificates.length
  }, [activeIndex, certificates.length])

  const previousIndex =
    certificates.length > 0 ? (safeActiveIndex - 1 + certificates.length) % certificates.length : 0
  const nextIndex = certificates.length > 0 ? (safeActiveIndex + 1) % certificates.length : 0

  const renderCertificateCard = (certificate, isActive = false) => {
    if (!certificate) {
      return null
    }

    return (
      <article
        className={`overflow-hidden rounded-3xl border bg-slate-900/65 backdrop-blur-md transition-all duration-300 ${isActive
          ? 'border-cyan-300/70 shadow-[0_0_45px_rgba(34,211,238,0.38)]'
          : 'border-cyan-600/35 opacity-55'}`}
      >
        {certificate.thumbnail ? (
          <img
            src={certificate.thumbnail}
            alt={`${certificate.title} thumbnail`}
            className={`w-full object-cover ${isActive ? 'h-48 sm:h-56' : 'h-40 sm:h-44'}`}
            loading="lazy"
          />
        ) : (
          <div className={`w-full bg-slate-800 ${isActive ? 'h-48 sm:h-56' : 'h-40 sm:h-44'}`} />
        )}

        <div className={`${isActive ? 'p-5 sm:p-6' : 'p-4 sm:p-5'}`}>
          <h3 className={`${isActive ? 'text-2xl' : 'text-xl'} mb-2 font-semibold text-cyan-300`}>
            {certificate.title}
          </h3>
          <p className="mb-3 text-xs uppercase tracking-wide text-cyan-100/70">
            {certificate.issuer} • {certificate.date}
          </p>
          <p className={`${isActive ? 'line-clamp-3' : 'line-clamp-2'} text-sm text-slate-200`}>
            {certificate.description}
          </p>

          {isActive && certificate.credentialUrl && certificate.credentialUrl !== '#' && (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-300 transition-colors hover:text-cyan-200"
            >
              <FaExternalLinkAlt />
              Verify Certificate
            </a>
          )}
        </div>
      </article>
    )
  }

  return (
    <section id="certificates" className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-size-[36px_36px] opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 bg-linear-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-center text-3xl font-bold text-transparent drop-shadow-[0_0_26px_rgba(34,211,238,0.45)] sm:text-4xl md:mb-14 md:text-6xl"
        >
          {certificatesSection.title ?? 'Certificates'}
        </motion.h2>

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative mx-auto max-w-5xl"
        >
          {certificates.length > 0 ? (
            <>
              <div className="hidden items-end gap-6 md:grid md:grid-cols-[1fr_1.35fr_1fr]">
                <motion.div
                  key={`left-${previousIndex}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45 }}
                  className="translate-y-6"
                >
                  {renderCertificateCard(certificates[previousIndex], false)}
                </motion.div>

                <motion.div
                  key={`center-${safeActiveIndex}`}
                  initial={{ opacity: 0, y: 24, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45 }}
                  className="relative"
                >
                  <div className="pointer-events-none absolute -left-8 top-1/2 h-px w-8 bg-linear-to-r from-transparent to-cyan-300/70" />
                  <div className="pointer-events-none absolute -right-8 top-1/2 h-px w-8 bg-linear-to-r from-cyan-300/70 to-transparent" />
                  {renderCertificateCard(certificates[safeActiveIndex], true)}
                </motion.div>

                <motion.div
                  key={`right-${nextIndex}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45 }}
                  className="translate-y-6"
                >
                  {renderCertificateCard(certificates[nextIndex], false)}
                </motion.div>
              </div>

              <motion.div
                key={`mobile-${safeActiveIndex}`}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45 }}
                className="md:hidden"
              >
                {renderCertificateCard(certificates[safeActiveIndex], true)}
              </motion.div>

              <div className="mt-7 flex flex-col items-center gap-4">
                <div className="min-w-20 text-center text-base font-semibold tracking-wide text-cyan-100">
                  {safeActiveIndex + 1} / {certificates.length}
                </div>

                <div className="h-1 w-44 overflow-hidden rounded-full bg-slate-700/60">
                  <motion.div
                    className="h-full bg-linear-to-r from-cyan-300 to-blue-500"
                    animate={{ width: `${((safeActiveIndex + 1) / certificates.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="mt-1 flex max-w-full items-center gap-2 overflow-x-auto pb-1">
                  {certificates.map((certificate, index) => (
                    <motion.button
                      key={`${certificate.title}-${index}-thumb`}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      className={`h-10 w-10 shrink-0 overflow-hidden rounded-md border transition-all duration-300 ${index === safeActiveIndex
                        ? 'border-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.45)]'
                        : 'border-slate-500/70 opacity-75 hover:opacity-100'}`}
                      aria-label={`Show certificate ${index + 1}`}
                    >
                      {certificate.thumbnail ? (
                        <img
                          src={certificate.thumbnail}
                          alt={`${certificate.title} thumbnail preview`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full bg-slate-800" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl border border-cyan-600/35 bg-slate-900/65 p-12 text-center backdrop-blur-md"
            >
              <p className="text-slate-400">No certificates available yet.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Certificates
