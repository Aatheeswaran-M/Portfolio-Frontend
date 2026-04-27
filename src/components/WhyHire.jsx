import { motion } from 'framer-motion'
import { usePortfolioData } from '../context/PortfolioDataContext'

const WhyHire = () => {
  const { content } = usePortfolioData()
  const whyHire = content.whyHire ?? {}
  const reasons = Array.isArray(whyHire.items) ? whyHire.items : []

  return (
    <section id="whyhire" className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl md:mb-16 md:text-5xl"
        >
          {whyHire.title ?? 'Why Hire Me'}
        </motion.h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 sm:gap-6 md:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={`${reason.title}-${index}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-xl p-5 hover:border-purple-500/50 transition-all duration-300 sm:p-6"
            >
              <div className="mb-4 text-3xl sm:text-4xl">{reason.icon}</div>
              <h3 className="mb-3 text-lg font-semibold text-purple-400 sm:text-xl">{reason.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400 sm:text-base">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-12"
        >
          <p className="mx-auto max-w-3xl text-base text-gray-300 sm:text-xl">
            {whyHire.intro ??
              "I'm not just learning - I'm already building real-world full stack applications that make a difference."}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyHire