import React from 'react'
import "./About.css"
import Aathees_img from '../images/Aathee.M.png'
import {motion as Motion} from "framer-motion"

const About = () => {
  return (
    <div className="About_Container" id="about">
      <h2 className="about-title">About Me</h2>
      <div className="underline"></div>
      <p className="about-subtext">
        Get to know the person behind the <span className="highlight">code</span>
      </p>

      <div className="about-content">
        <div className="about-text">
          <p>
            I'm a passionate frontend developer with a love for creating beautiful,
            functional web experiences. My journey in web development started with
            curiosity and has evolved into a dedication to crafting digital solutions
            that make a difference.
          </p>
          <p>
            When I'm not coding, you'll find me exploring new technologies, contributing
            to open-source projects, or learning about the latest trends in web
            development. I believe in continuous learning and pushing the boundaries of
            what's possible on the web.
          </p>
          <p>
            My goal is to bridge the gap between design and development, creating
            experiences that are both visually appealing and highly functional.
          </p>
        </div>

        <Motion.div
        
        initial={{ x: -120, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}

        className="about-img">
          <img src={Aathees_img} alt="Aathees Profile" />
        </Motion.div>
      </div>
    </div>
  )
}

export default About
