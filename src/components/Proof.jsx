import { motion } from 'framer-motion'
import { usePortfolioData } from '../context/PortfolioDataContext'

const Proof = () => {
  const { content } = usePortfolioData()
  const proof = content.proof ?? {}
  const metrics = Array.isArray(proof.metrics) ? proof.metrics : []

  return (
    <section className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl md:mb-16 md:text-5xl"
        >
          {proof.title ?? "What I've Built"}
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 md:gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-xl p-5 text-center hover:border-purple-500/50 transition-all duration-300 sm:p-6"
            >
              <div className="mb-4 text-3xl sm:text-4xl">{metric.icon}</div>
              <div className="mb-2 text-2xl font-bold text-purple-400 sm:text-3xl">{metric.number}</div>
              <div className="text-sm text-gray-400 sm:text-base">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Proof