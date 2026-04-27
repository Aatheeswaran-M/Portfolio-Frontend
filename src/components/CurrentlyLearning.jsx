import { motion } from 'framer-motion'
import { usePortfolioData } from '../context/PortfolioDataContext'

const CurrentlyLearning = () => {
  const { content } = usePortfolioData()
  const learning = content.learning ?? {}
  const learningTopics = Array.isArray(learning.items) ? learning.items : []

  return (
    <section id="learning" className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl md:mb-16 md:text-5xl"
        >
          {learning.title ?? 'Currently Learning'}
        </motion.h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8">
          {learningTopics.map((topic, index) => (
            <motion.div
              key={`${topic.title}-${index}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-xl p-5 text-center hover:border-purple-500/50 transition-all duration-300 sm:p-6"
            >
              <div className="mb-4 text-3xl sm:text-4xl">{topic.icon}</div>
              <h3 className="mb-2 text-base font-semibold text-purple-400 sm:text-lg">{topic.title}</h3>
              <p className="text-xs text-gray-400 sm:text-sm">{topic.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CurrentlyLearning