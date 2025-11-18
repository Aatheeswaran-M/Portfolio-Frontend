import React, { useEffect, useState } from "react";
import { getPortfolio } from "./api";
import "./app.css";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Exp from "./components/Experience/Experience";
import Certificates from "./components/Certificates/Certificates";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact_Form/contact";
import Skills from "./components/Skills/Skills";
import Footer from "./components/Footer/Footer";

import Container from "@mui/material/Container";
import { motion as Motion } from "framer-motion";

// ------- OPTIMIZED ANIMATION VARIANTS -------
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeZoom = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Fetching data... (may take 30-50s on first load)');
        const res = await getPortfolio();
        setData(res.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch:', err);
        setError('Failed to load data. Using fallback...');
        // Use fallback data or show error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: 'white',
        flexDirection: 'column'
      }}>
        <h2>Loading Portfolio...</h2>
        <p style={{ opacity: 0.7 }}>Server is waking up, please wait...</p>
      </div>
    );
  }

  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;
  }

  return (
    <div className="Project-bg">
      <Navbar />

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 2 }}>

        {/* HERO */}
        <Motion.section
          id="hero"
          style={{ marginBottom: '2rem' }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <Hero />
        </Motion.section>

        {/* ABOUT */}
        <Motion.section
          id="about"
          style={{ marginBottom: '2rem' }}
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <About />
        </Motion.section>

        {/* EXPERIENCE */}
        <section id="experience" style={{ marginBottom: '2rem' }}>
          <Exp />
        </section>

        {/* PROJECTS */}
        <Motion.section
          id="projects"
          style={{ marginBottom: '2rem' }}
          variants={fadeZoom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <Projects />
        </Motion.section>

        {/* SKILLS */}
        <Motion.section
          id="skills"
          style={{ marginBottom: '2rem' }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <Skills />
        </Motion.section>

        {/* CERTIFICATES */}
        <Motion.section
          id="certificates"
          style={{ marginBottom: '2rem' }}
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <Certificates />
        </Motion.section>

        {/* CONTACT */}
        <Motion.section
          id="contact"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <Contact />
        </Motion.section>

      </Container>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
