import { motion } from 'framer-motion'
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { usePortfolioData } from '../context/PortfolioDataContext'

const Experience = () => {
  const { content } = usePortfolioData()
  const experience = content.experience ?? {}
  const items = Array.isArray(experience.items) ? experience.items : []

  return (
    <section id="experience" className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl md:text-5xl"
        >
          {experience.title ?? 'Experience'}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.7 }}
          className="mx-auto mb-12 max-w-3xl text-center text-sm leading-relaxed text-gray-400 sm:text-base md:mb-14"
        >
          {experience.intro ??
            'A closer look at the environments where I have shipped features, collaborated with teams, and delivered production-minded work.'}
        </motion.p>

        <div className="relative space-y-6 md:space-y-8">
          <div className="absolute left-5 top-8 hidden h-[calc(100%-4rem)] w-px bg-linear-to-b from-purple-500/70 via-blue-500/40 to-transparent md:block" />

          {items.map((item, index) => {
            const highlights = Array.isArray(item.highlights) ? item.highlights : []
            const techStack = Array.isArray(item.tech) ? item.tech : []

            return (
              <motion.article
                key={`${item.company}-${item.role}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.7 }}
                className="relative md:pl-16"
              >
                <div className="absolute left-0 top-8 hidden h-10 w-10 items-center justify-center rounded-full border border-cyan-300/40 bg-slate-900 text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.2)] md:flex">
                  <FaBriefcase />
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/60 p-6 shadow-[0_24px_70px_rgba(2,6,23,0.35)] backdrop-blur-md transition-all duration-300 hover:border-purple-400/40">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/85">
                        {item.company}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">
                        {item.role}
                      </h3>
                    </div>

                    {item.type && (
                      <span className="inline-flex w-fit items-center rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-purple-200">
                        {item.type}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-400">
                    {item.period && (
                      <span className="inline-flex items-center gap-2">
                        <FaCalendarAlt className="text-purple-300" />
                        {item.period}
                      </span>
                    )}

                    {item.location && (
                      <span className="inline-flex items-center gap-2">
                        <FaMapMarkerAlt className="text-cyan-300" />
                        {item.location}
                      </span>
                    )}
                  </div>

                  {item.description && (
                    <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
                      {item.description}
                    </p>
                  )}

                  {highlights.length > 0 && (
                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                      {highlights.map((highlight, highlightIndex) => (
                        <div
                          key={`${highlight}-${highlightIndex}`}
                          className="rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-sm leading-relaxed text-slate-200"
                        >
                          {highlight}
                        </div>
                      ))}
                    </div>
                  )}

                  {techStack.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {techStack.map((tech, techIndex) => (
                        <span
                          key={`${tech}-${techIndex}`}
                          className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Experience
