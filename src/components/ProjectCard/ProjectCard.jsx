import React, { useEffect, useState } from "react";
import "./ProjectCard.css";
import { motion as Motion } from "framer-motion";

const ProjectCard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://portfolio-api-jie5.onrender.com/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
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
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="projects-wrapper" id="projects">
      <Motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        🚀 My Projects
      </Motion.h2>

      <Motion.div
        className="underlineP"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      />

      <div className="projects-grid">
        {loading ? (
          <div className="loading">Loading projects...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : projects.length === 0 ? (
          <div className="no-projects">No projects found</div>
        ) : (
          projects.map((p, idx) => (
            <Motion.article
              key={p._id ?? idx}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div
                className="thumbnail"
                style={{
                  backgroundImage: p.thumbnail ? `url(${p.thumbnail})` : "none",
                }}
              >
                {!p.thumbnail && <div className="no-image">📸</div>}
              </div>
              <div className="card-body">
                <h3 className="title">{p.title || "Untitled Project"}</h3>
                <p className="description">
                  {p.description || "No description available."}
                </p>
              </div>
              <div className="card-meta">
                {p.technologies && p.technologies.length > 0 && (
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
      </div>
    </div>
  );
};

export default ProjectCard;
