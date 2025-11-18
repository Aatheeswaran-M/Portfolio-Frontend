import React from "react";
import "./Experience.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Experience = () => {
  const experiences = [
    {
      role: "Web Developer Intern",
      company: "HOSTSPACIO Digital Solution (On Site)",
      date: "2024",
      tasks: [
        "Developed responsive web pages using HTML, CSS, JavaScript, and React.",
        "Improved UI/UX for client projects with modern design practices.",
        "Worked with Node.js APIs and integrated backend features.",
        "Collaborated with the team using Git and project boards."
      ],
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js","MongoDB", "Git"],
    },
    {
      role: "Web Developer Intern",
      company: "CodSoft (Remote)",
      date: "2024",
      tasks: [
        "Built landing pages and portfolio templates using HTML, CSS, and JavaScript.",
        "Created simple interactive UI components with React.",
        "Converted Figma designs into fully responsive web pages.",
        "Improved frontend problem-solving and debugging skills."
      ],
      skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"],
    },
    {
      role: "Personal Project Developer",
      company: "Independent",
      date: "2023 - 2025",
      tasks: [
        "Developed MERN projects including LinkedIn Scraper, Telemedicine App, and Malware Scanner.",
        "Implemented backend APIs using Express.js and MongoDB.",
        "Designed dashboards, authentication, and data visualizations.",
        "Strengthened full-stack development, API integration, and real-world problem solving."
      ],
      skills: ["React", "Node.js", "Express", "MongoDB", "APIs", "Full Stack"],
    }
  ];

  console.log("Total experiences:", experiences.length);
  console.log("Experience data:", experiences);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.99 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 240, damping: 22 },
    },
  };

  return (
    <div className="experience-container" id="experience">
      <motion.h2
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true, amount: 0.25 }}
        className="exp-title"
      >
        Experience
      </motion.h2>
      <div className="exp-underline"></div>
      <p className="exp-subtitle">
        My professional journey in <span className="highlight">software development</span>
      </p>

      <motion.div
        className="exp-list"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {experiences.map((exp, index) => (
          <motion.div
            className="exp-card"
            key={index}
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="exp-header">
              <h3>{exp.role}</h3>
              <span className="exp-date">{exp.date}</span>
            </div>
            <p className="exp-company">{exp.company}</p>

            <ul className="exp-tasks">
              {exp.tasks.map((task, i) => (
                <li key={i}>{task}</li>
              ))}
            </ul>

            <div className="exp-skills">
              {exp.skills.map((skill, i) => (
                <span key={i} className="skill-tag">{skill}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Experience;
