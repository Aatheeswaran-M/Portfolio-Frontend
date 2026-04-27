import { motion } from 'framer-motion'
import { usePortfolioData } from '../context/PortfolioDataContext'

const About = () => {
  const { content } = usePortfolioData()
  const about = content.about ?? {}
  const hero = content.hero ?? {}
  const paragraphs = Array.isArray(about.paragraphs) ? about.paragraphs : []
  const profileImage = about.profileImage || hero.profileImage

  return (
    <section id="about" className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl md:mb-16 md:text-5xl"
        >
          {about.title ?? 'About Me'}
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-4">
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="text-sm leading-relaxed text-gray-300 sm:text-base"
                >
                  {paragraph}
                </motion.p>
              ))
            ) : (
              <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                Welcome to my portfolio. Explore my work and get to know me better.
              </p>
            )}
          </div>

          {/* Profile Image */}
          {profileImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center md:justify-end"
            >
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 to-blue-600/20 rounded-2xl blur-2xl"></div>
                <img
                  src={profileImage}
                  alt="Profile"
                  className="relative w-full rounded-2xl border-2 border-purple-500/50 object-cover shadow-lg"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default About