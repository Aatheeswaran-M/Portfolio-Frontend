import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FaEnvelope, FaPhone, FaGlobe, FaGithub, FaLinkedin } from 'react-icons/fa'
import { usePortfolioData } from '../context/PortfolioDataContext'

const contactIcons = {
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaGithub,
  FaLinkedin,
}

const Contact = () => {
  const { content } = usePortfolioData()
  const contact = content.contact ?? {}
  const contactInfo = Array.isArray(contact.methods) ? contact.methods : []
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    msg: '',
  })
  const [isSending, setIsSending] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitStatus({ type: '', message: '' })

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus({
        type: 'error',
        message:
          'Email notification is not configured yet. Add EmailJS keys in your .env file to enable form delivery.',
      })
      return
    }

    try {
      setIsSending(true)

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          msg: formData.msg,
        },
        { publicKey },
      )

      setSubmitStatus({
        type: 'success',
        message: 'Message sent successfully. You will receive this inquiry in your email inbox.',
      })
      setFormData({ name: '', email: '', msg: '' })
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Message failed to send. Please try again or contact directly via email.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent sm:mb-8 sm:text-4xl md:text-5xl"
        >
          {contact.title ?? "Let's Build Something Together"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-10 text-base text-gray-400 sm:text-xl md:mb-12"
        >
          {contact.subtitle ??
            "I'm always excited to work on new projects and collaborate with amazing people."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 md:mb-12"
        >
          {contactInfo.map((info, index) => (
            (() => {
              const IconComponent = contactIcons[info.icon] ?? FaEnvelope

              return (
                <motion.a
                  key={`${info.label}-${index}`}
                  href={info.href}
                  target={info.href?.startsWith('http') ? '_blank' : undefined}
                  rel={info.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-xl p-5 hover:border-purple-500/50 transition-all duration-300 group sm:p-6"
                >
                  <IconComponent className="mx-auto mb-3 text-2xl text-purple-400 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(147,51,234,0.5)] sm:text-3xl" />
                  <h3 className="mb-2 text-base font-semibold text-gray-300 sm:text-lg">{info.label}</h3>
                  <p className="break-all text-xs text-gray-400 sm:text-sm">{info.value}</p>
                </motion.a>
              )
            })()
          ))}
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          onSubmit={handleSubmit}
          className="mx-auto mb-10 max-w-3xl rounded-2xl border border-gray-700 bg-gray-900/50 p-5 text-left backdrop-blur-md sm:p-6 md:mb-12"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-300">Your Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-gray-600 bg-gray-950/80 px-3 py-2.5 text-sm text-gray-100 outline-none transition-colors duration-300 placeholder:text-gray-500 focus:border-cyan-400"
                placeholder="Aathees"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-300">Your Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-gray-600 bg-gray-950/80 px-3 py-2.5 text-sm text-gray-100 outline-none transition-colors duration-300 placeholder:text-gray-500 focus:border-cyan-400"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-medium text-gray-300">Message</span>
            <textarea
              name="msg"
              value={formData.msg}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full resize-none rounded-lg border border-gray-600 bg-gray-950/80 px-3 py-2.5 text-sm text-gray-100 outline-none transition-colors duration-300 placeholder:text-gray-500 focus:border-cyan-400"
              placeholder="Tell me about your project or role."
            />
          </label>

          <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={isSending}
              className="w-full rounded-lg bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus.message && (
              <p
                className={`text-sm ${submitStatus.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}
              >
                {submitStatus.message}
              </p>
            )}
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={contact.primaryButtonHref || '#contact'}
            className="w-full rounded-lg bg-linear-to-r from-purple-600 to-blue-600 px-8 py-3 text-center font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 sm:w-auto"
          >
            {contact.primaryButtonText || 'Contact Me'}
          </a>
          <a
            href={contact.secondaryButtonHref || '#contact'}
            className="w-full rounded-lg border border-gray-600 px-8 py-3 text-center font-semibold transition-colors duration-300 hover:border-purple-400 hover:text-purple-400 sm:w-auto"
          >
            {contact.secondaryButtonText || 'Hire Me'}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact