import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  FaCode,
  FaCss3Alt,
  FaDatabase,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJava,
  FaJs,
  FaNodeJs,
  FaPython,
  FaReact,
  FaTools,
} from 'react-icons/fa'
import { usePortfolioData } from '../context/PortfolioDataContext'

const skillIcons = {
  FaCode,
  FaCss3Alt,
  FaDatabase,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJava,
  FaJs,
  FaNodeJs,
  FaPython,
  FaReact,
  FaTools,
}

const barGradientClasses = [
  'from-cyan-400 to-blue-500',
  'from-violet-400 to-fuchsia-500',
  'from-orange-400 to-rose-500',
  'from-emerald-400 to-teal-500',
  'from-blue-400 to-indigo-500',
  'from-amber-400 to-orange-500',
]

const Skills = () => {
  const { content } = usePortfolioData()
  const skillsSection = content.skills ?? {}
  const skillGroups = Array.isArray(skillsSection.groups)
    ? skillsSection.groups
    : []
  const trackRef = useRef(null)
  const firstSetRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

  // Flatten all skills from all groups
  const allSkills = skillGroups.flatMap((group) => group.skills ?? [])

  const renderSkillCard = (skill, keyPrefix, index) => {
    const SkillIcon = skillIcons[skill.icon] ?? FaCode

    return (
      <motion.article
        key={`${keyPrefix}-${skill.name}-${index}`}
        whileHover={{ y: -4, scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-24 shrink-0 rounded-xl border border-gray-700 bg-gray-900/50 p-3 transition-all duration-300 hover:border-purple-500/50 hover:bg-gray-800/50 sm:w-32 sm:p-4"
      >
        <div className="mb-3 flex items-center justify-center">
          <SkillIcon
            className={`text-xl ${skill.color || 'text-sky-400'} transition-all duration-300 hover:drop-shadow-[0_0_10px_currentColor] sm:text-3xl`}
          />
        </div>
        <p className="mb-2 text-center text-[11px] font-medium text-gray-300 sm:text-sm">{skill.name}</p>

        <div className="h-1 w-full overflow-hidden rounded-full bg-gray-800">
          <div className="h-full rounded-full bg-linear-to-r from-cyan-400 to-purple-500" />
        </div>
      </motion.article>
    )
  }

  const renderGridSkillCard = (skill, index, keyPrefix) => {
    const SkillIcon = skillIcons[skill.icon] ?? FaCode
    const barGradient = barGradientClasses[index % barGradientClasses.length]

    return (
      <motion.article
        key={`grid-${keyPrefix}-${skill.name}-${index}`}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03, duration: 0.45 }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="rounded-xl border border-purple-500/35 bg-gray-900/55 p-2.5 shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300 hover:border-purple-400/60 hover:shadow-[0_10px_30px_rgba(139,92,246,0.16)] sm:rounded-2xl sm:p-6"
      >
        <div className="mb-2 flex justify-center sm:mb-5">
          <SkillIcon
            className={`text-lg ${skill.color || 'text-cyan-400'} transition-all duration-300 group-hover:drop-shadow-[0_0_10px_currentColor] sm:text-5xl`}
          />
        </div>

        <p className="mb-2 text-center text-[11px] font-semibold leading-tight text-gray-100 sm:mb-4 sm:text-2xl">{skill.name}</p>

        <div className="h-1 w-full overflow-hidden rounded-full bg-gray-700/80 sm:h-1.5">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '88%' }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className={`h-full rounded-full bg-linear-to-r ${barGradient}`}
          />
        </div>
      </motion.article>
    )
  }

  // Infinite marquee effect with seamless reset based on measured content width.
  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const track = trackRef.current
    const firstSet = firstSetRef.current

    if (!track || !firstSet || allSkills.length === 0) {
      return undefined
    }

    let frameId = 0
    let offsetX = 0
    let lastTs = performance.now()
    let firstSetWidth = firstSet.getBoundingClientRect().width
    const speedPxPerSecond = 34

    const updateWidth = () => {
      firstSetWidth = firstSet.getBoundingClientRect().width
    }

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateWidth) : null

    if (resizeObserver) {
      resizeObserver.observe(firstSet)
    }

    window.addEventListener('resize', updateWidth)

    const animate = (ts) => {
      const deltaSeconds = (ts - lastTs) / 1000
      lastTs = ts

      if (!isPaused && firstSetWidth > 0) {
        offsetX -= speedPxPerSecond * deltaSeconds

        if (Math.abs(offsetX) >= firstSetWidth) {
          offsetX += firstSetWidth
        }

        track.style.transform = `translate3d(${offsetX}px, 0, 0)`
      }

      frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', updateWidth)

      if (resizeObserver) {
        resizeObserver.disconnect()
      }

      track.style.transform = 'translate3d(0, 0, 0)'
    }
  }, [allSkills.length, isPaused])

  return (
    <section id="skills" className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl md:mb-12 md:text-5xl"
        >
          {skillsSection.title ?? 'Skills & Technologies'}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mb-12 text-center text-gray-400 sm:text-lg"
        >
          The magical tools I use to bring <span className="text-cyan-400">ideas to life</span>
        </motion.p>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-black to-transparent" />

          <div
            className="overflow-hidden pb-3"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div ref={trackRef} className="flex w-max gap-4 will-change-transform">
              <div ref={firstSetRef} className="flex gap-4">
                {allSkills.map((skill, index) => renderSkillCard(skill, 'base', index))}
              </div>

              <div className="flex gap-4" aria-hidden="true">
                {allSkills.map((skill, index) => renderSkillCard(skill, 'clone', index))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <motion.h3
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center text-2xl font-semibold text-slate-200 sm:text-3xl"
          >
            Skills Showcase
          </motion.h3>

          {skillGroups.length > 0 ? (
            <div className="space-y-8">
              {skillGroups
                .filter((group) => Array.isArray(group?.skills) && group.skills.length > 0)
                .map((group, groupIndex) => (
                  <motion.div
                    key={`${group.title ?? 'group'}-${groupIndex}`}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300 sm:text-base">
                        {group.title ?? 'Category'}
                      </h4>
                      <div className="h-px flex-1 bg-linear-to-r from-cyan-400/60 to-transparent" />
                    </div>

                    <div className="grid grid-cols-4 gap-2 sm:gap-5">
                      {(group.skills ?? []).map((skill, skillIndex) =>
                        renderGridSkillCard(
                          skill,
                          skillIndex,
                          `${group.title ?? 'group'}-${groupIndex}`,
                        ),
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>
          ) : (
            <p className="text-center text-sm text-slate-400">No skills added yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Skills