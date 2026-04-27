import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaExternalLinkAlt, FaGithub, FaTimes } from 'react-icons/fa'
import { usePortfolioData } from '../context/PortfolioDataContext'

const Projects = () => {
  const { content } = usePortfolioData()
  const [selectedProject, setSelectedProject] = useState(null)
  const projectsSection = content.projects ?? {}
  const projects = Array.isArray(projectsSection.items) ? projectsSection.items : []

  return (
    <section id="projects" className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl md:mb-16 md:text-5xl"
        >
          {projectsSection.title ?? 'Featured Projects'}
        </motion.h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.01 }}
              className="bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedProject(project)}
            >
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={`${project.title} thumbnail`}
                  className="h-44 w-full object-cover sm:h-48"
                  loading="lazy"
                />
              ) : (
                <div className="h-44 w-full bg-linear-to-br from-purple-900/40 via-gray-900 to-blue-900/40 flex items-center justify-center sm:h-48">
                  <div className="text-center">
                    <div className="text-4xl mb-2 opacity-50">📁</div>
                    <p className="text-sm text-gray-400">Project Thumbnail</p>
                  </div>
                </div>
              )}

              <div className="p-5 sm:p-6">
                <h3 className="mb-3 text-lg font-semibold text-purple-400 transition-colors group-hover:text-purple-300 sm:text-xl">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm text-gray-400 sm:text-base">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(project.tech ?? []).map((tech, techIndex) => (
                    <span
                      key={`${tech}-${techIndex}`}
                      className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-300 sm:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button className="text-sm text-purple-300 transition-colors hover:text-purple-200 sm:text-base">
                    View Details
                  </button>

                  {project.link && project.link !== '#' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-blue-400 transition-colors hover:text-blue-300 sm:text-base"
                    >
                      <FaExternalLinkAlt />
                      Live Demo
                    </a>
                  )}

                  {project.repoUrl && project.repoUrl !== '#' && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white sm:text-base"
                    >
                      <FaGithub />
                      GitHub Repo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="mx-1 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-gray-700 bg-gray-900 p-4 sm:mx-4 sm:p-6 md:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-purple-400 sm:text-2xl">{selectedProject.title}</h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-xl text-gray-400 hover:text-white"
                  >
                    <FaTimes />
                  </button>
                </div>

                {selectedProject.thumbnail && (
                  <img
                    src={selectedProject.thumbnail}
                    alt={`${selectedProject.title} thumbnail`}
                    className="mb-4 h-44 w-full rounded-lg object-cover sm:h-56"
                  />
                )}

                <p className="mb-6 text-sm text-gray-300 sm:text-base">{selectedProject.details}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(selectedProject.tech ?? []).map((tech, techIndex) => (
                    <span
                      key={`${tech}-${techIndex}`}
                      className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-300 sm:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {selectedProject.link && selectedProject.link !== '#' && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 sm:w-auto sm:text-base"
                    >
                      <FaExternalLinkAlt />
                      View Live Demo
                    </a>
                  )}

                  {selectedProject.repoUrl && selectedProject.repoUrl !== '#' && (
                    <a
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-500 bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-100 transition-all duration-300 hover:border-slate-300 hover:bg-slate-700 sm:w-auto sm:text-base"
                    >
                      <FaGithub />
                      View GitHub Repo
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Projects