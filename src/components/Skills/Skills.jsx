import React from 'react'
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGit, FaGithub, FaDocker, FaAws } from 'react-icons/fa'
import { SiJavascript, SiExpress, SiMongodb, SiMysql, SiTailwindcss, SiBootstrap, SiNextdotjs, SiRedux, SiPostman, SiFirebase, SiFigma, SiTypescript, SiCplusplus, SiC} from 'react-icons/si'
import "./Skills.css"

const Skills = () => {
  const skillsData = [
    { icon: <SiNextdotjs />, name: 'Next.js', color: '#000000', progress: 85 },
    { icon: <FaReact />, name: 'React', color: '#61DAFB', progress: 90 },
    { icon: <SiTypescript />, name: 'TypeScript', color: '#3178C6', progress: 80 },
    { icon: <SiTailwindcss />, name: 'Tailwind CSS', color: '#06B6D4', progress: 85 },
    { icon: <SiJavascript />, name: 'JavaScript', color: '#F7DF1E', progress: 90 },
    { icon: <FaHtml5 />, name: 'HTML', color: '#E34F26', progress: 95 },
    { icon: <FaCss3Alt />, name: 'CSS', color: '#1572B6', progress: 90 },
    { icon: <FaGit />, name: 'Git', color: '#F05032', progress: 85 },
    { icon: <FaNodeJs />, name: 'Node.js', color: '#339933', progress: 85 },
    { icon: <FaDocker />, name: 'Docker', color: '#2496ED', progress: 75 },
    { icon: <SiC />, name: 'C', color: '#A8B9CC', progress: 80 },
    { icon: <SiCplusplus />, name: 'C++', color: '#00599C', progress: 75 },
  ]

  return (
    <div className='Skills' aria-label="skills carousel">
      <h1 className='Skill-H'>Skills</h1>
      <div className="underlineS"></div>
      
      {/* Scrolling Skills */}
      <div className='group' >
        <div className='skill'><FaHtml5 /> <span className='skill-name'>HTML5</span></div>
        <div className='skill'><FaCss3Alt /> <span className='skill-name'>CSS3</span></div>
        <div className='skill'><SiJavascript /> <span className='skill-name'>JavaScript</span></div>
        <div className='skill'><FaReact /> <span className='skill-name'>React</span></div>
        <div className='skill'><FaNodeJs /> <span className='skill-name'>Node.js</span></div>
        <div className='skill'><SiExpress /> <span className='skill-name'>Express</span></div>
        <div className='skill'><SiMongodb /> <span className='skill-name'>MongoDB</span></div>
        <div className='skill'><SiMysql /> <span className='skill-name'>MySQL</span></div>
        <div className='skill'><FaGit /> <span className='skill-name'>Git</span></div>
        <div className='skill'><FaGithub /> <span className='skill-name'>GitHub</span></div>
        <div className='skill'><SiTailwindcss /> <span className='skill-name'>Tailwind CSS</span></div>
        <div className='skill'><SiBootstrap /> <span className='skill-name'>Bootstrap</span></div>
        <div className='skill'><SiNextdotjs /> <span className='skill-name'>Next.js</span></div>
        <div className='skill'><SiRedux /> <span className='skill-name'>Redux</span></div>
        <div className='skill'><SiPostman /> <span className='skill-name'>Postman</span></div>
        <div className='skill'><FaDocker /> <span className='skill-name'>Docker</span></div>
        <div className='skill'><SiFirebase /> <span className='skill-name'>Firebase</span></div>
        <div className='skill'><FaAws /> <span className='skill-name'>AWS</span></div>
        <div className='skill'><SiFigma /> <span className='skill-name'>Figma</span></div>
      </div>

      {/* Skills & Technologies Section */}
      <div className="skills-technologies-section">
        <h2 className="section-title">Skills & Technologies</h2>
        <p className="section-subtitle">
          The magical tools I use to bring <span className="highlight">ideas to life</span>
        </p>
        
        <div className="skills-grid">
          {skillsData.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-icon" style={{ color: skill.color }}>
                {skill.icon}
              </div>
              <h3 className="skill-title">{skill.name}</h3>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${skill.progress}%`,
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Skills