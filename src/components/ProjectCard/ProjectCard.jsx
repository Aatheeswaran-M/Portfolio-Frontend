import React, { useEffect, useState } from "react";
import "./ProjectCard.css";
import { motion as Motion } from "framer-motion";

const ProjectCard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://portfolio-api-jie5.onrender.com/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const uniqueProjects = data.filter(
            (p, index, self) =>
              index === self.findIndex((x) => x._id === p._id)
          );
          setProjects(uniqueProjects);
        } else {
          setProjects([]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="projects-wrapper">
      <Motion.h2
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        🚀 My Projects
      </Motion.h2>

      <Motion.div className="underlineP"></Motion.div>

      <Motion.div
        className="projects-grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {projects.length === 0 ? (
          <div className="loading">Loading projects...</div>
        ) : (
          projects.map((p, idx) => (
            <Motion.article
              key={p._id ?? idx}
              className="project-card"

              // 👇 FINAL LEFT-SIDE ANIMATION
              initial={{ x: -120, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div
                className="thumbnail"
                style={{
                  backgroundImage: `url(${p.thumbnail || ""})`,
                }}
              />
              <div className="card-body">
                <h3 className="title">{p.title || "Untitled Project"}</h3>
                <p className="description">
                  {p.description || "No description available."}
                </p>
              </div>
              <div className="card-meta">
                {p.technologies && (
                  <span className="tech">🧩 {p.technologies.join(", ")}</span>
                )}
                <div className="card-actions">
                  {p.githubUrl && (
                    <a
                      className="btn"
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      💻 Code
                    </a>
                  )}
                  {p.demoUrl && (
                    <a
                      className="btn live"
                      href={p.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🌐 Live
                    </a>
                  )}
                </div>
              </div>
            </Motion.article>
          ))
        )}
      </Motion.div>
    </div>
  );
};

export default ProjectCard;
