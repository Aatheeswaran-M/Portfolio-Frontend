import React, { useEffect, useState } from "react";
import "./Hero.css";
import Type_Text from "../Animations/Type_Text";
import Falling_Text from "../Animations/Falling_Text";
import LightRays from "../Animations/Hero-bg/Hero-bg";
import { FaLinkedin } from "react-icons/fa6";
import { AiOutlineGithub } from "react-icons/ai";
import { FaSquareInstagram } from "react-icons/fa6";

function Profile() {
  const profileUrl = "https://portfolio-api-jie5.onrender.com/api/profile";
  const resumeUrl = "https://portfolio-api-jie5.onrender.com/api/resume";
  
  const [Name, setName] = useState("");
  const [Bio, setBio] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const result = await fetch(profileUrl);
        const json = await result.json();
        setName(json.name || "");
        setBio(json.bio || "");
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchdata();
  }, []);

  const handleDownloadResume = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(resumeUrl);
      const data = await response.json();
      
      if (data.resumeUrl) {
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = data.resumeUrl;
        link.download = 'Aathees_Resume.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("Resume URL not found");
        alert("Resume not available at the moment");
      }
    } catch (err) {
      console.error("Failed to download resume:", err);
      alert("Failed to download resume. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
    <div className="profile-container">
      {/* <LightRays className="custom-rays" /> */}

      <div className="name-overlay">
        <div className="welcome-badge">⭐ Welcome to my universe</div>

        <h1 className="main-title">
          <span className="gradient-blue">Frontend Developer</span>
          <br />
          <span className="gradient-purple">& Creative Coder</span>
        </h1>

        <p className="subtext">
          I craft <span className="highlight-blue">beautiful</span>,{" "}
          <span className="highlight-purple">interactive</span> web experiences
          with modern technologies.
        </p>

        <p className="desc">
          Passionate about clean code, stunning designs, and seamless user
          experiences.
        </p>

        <div className="buttons">
          <button className="explore-btn">🚀 Explore My Universe</button>
          <button 
            className="cv-btn" 
            onClick={handleDownloadResume}
            disabled={isDownloading}
          >
            {isDownloading ? "⏳ Downloading..." : "📄 Download CV"}
          </button>
        </div>

        <div className="Links">
          <a href="https://www.linkedin.com/in/aatheeswaran78" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://github.com/Aatheessubash" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <AiOutlineGithub />
          </a>
          <a href="https://www.instagram.com/aathees111/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaSquareInstagram />
          </a>
        </div>
      </div>
    </div>
    </>
  );
}

export default Profile;
