import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { usePortfolioData } from '../context/PortfolioDataContext'

const Hero = () => {
  const { content } = usePortfolioData()
  const hero = content.hero ?? {}
  const roles =
    Array.isArray(hero.roles) && hero.roles.length > 0
      ? hero.roles
      : ['Full Stack Developer']
  const roleSequence = roles.flatMap((role) => [role, 2000])
  const badges = Array.isArray(hero.badges) ? hero.badges : []
  const profileImage = hero.profileImage ?? ''
  const resumeHref = hero.secondaryButtonHref || '#contact'
  const isDownloadableResume =
    resumeHref.startsWith('data:') ||
    /\.pdf($|\?)/i.test(resumeHref) ||
    /\.docx?($|\?)/i.test(resumeHref)
  const resumeFileName = hero.resumeFileName || 'resume'
  const initials =
    (hero.name ?? 'AM')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'AM'
  const badgeStyles = [
    'bg-green-500/20 text-green-400 border-green-500/30',
    'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'bg-purple-500/20 text-purple-400 border-purple-500/30',
  ]

  return (
    <section id="hero" className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-4 pb-14 pt-20 sm:px-6 md:min-h-screen md:px-8">
      {/* Floating gradient blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute left-4 top-16 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl sm:left-12 sm:top-20 sm:h-56 sm:w-56 md:left-20 md:h-72 md:w-72"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-8 right-4 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl sm:bottom-14 sm:right-12 sm:h-72 sm:w-72 md:bottom-20 md:right-20 md:h-96 md:w-96"
      />

      <div className="z-10 w-full max-w-4xl px-1 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-6 flex justify-center md:mb-8"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-cyan-300/60 bg-slate-900 shadow-[0_0_35px_rgba(56,189,248,0.28)] sm:h-24 sm:w-24 md:h-28 md:w-28">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={`${hero.name ?? 'Profile'} portrait`}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-800 via-slate-900 to-black text-2xl font-bold text-cyan-200 sm:text-3xl md:text-4xl">
                  {initials}
                </div>
              )}
            </div>
            <span className="absolute -bottom-1 right-1 h-3 w-3 rounded-full bg-emerald-400 ring-4 ring-slate-950" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-7xl lg:text-8xl"
        >
          {hero.name ?? 'Aatheeswaran M'}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6 text-lg text-gray-300 sm:text-2xl md:text-4xl"
        >
          <TypeAnimation
            sequence={roleSequence}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="font-semibold"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mx-auto mb-8 max-w-2xl text-base text-gray-400 sm:text-lg md:text-xl"
        >
          {hero.description ??
            'Passionate developer focused on frontend + backend integration, REST APIs, and real-world deployments.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4"
        >
          <a
            href={hero.primaryButtonHref || '#projects'}
            className="w-full rounded-lg bg-linear-to-r from-purple-600 to-blue-600 px-8 py-3 text-center font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 sm:w-auto"
          >
            {hero.primaryButtonText || 'View Projects'}
          </a>
          <a
            href={resumeHref}
            download={isDownloadableResume ? resumeFileName : undefined}
            className="w-full rounded-lg border border-gray-600 px-8 py-3 text-center font-semibold transition-colors duration-300 hover:border-purple-400 hover:text-purple-400 sm:w-auto"
          >
            {hero.secondaryButtonText || 'Download Resume'}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {badges.map((badge, index) => (
            <span
              key={`${badge}-${index}`}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium sm:px-4 sm:py-2 sm:text-sm ${badgeStyles[index % badgeStyles.length]}`}
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero