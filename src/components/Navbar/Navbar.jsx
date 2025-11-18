// ...existing code...
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Logo from "../Animations/Name"
import { motion as Motion } from "framer-motion";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    const toggle = () => setOpen(prev => !prev);
    const close = () => setOpen(false);

    // Detect scroll for navbar styling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Track active section
    useEffect(() => {
        const sections = ["hero", "about", "experience", "projects", "certificates", "skills", "contact"];
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    // Smooth scroll handler
    const handleNavClick = (e, href) => {
        e.preventDefault();
        close();
        
        if (href === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const targetId = href.replace("#", "").toLowerCase();
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    return (
        <>
        <Motion.nav 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }} 
            className={`navbar ${scrolled ? "scrolled" : ""}`}
        >
            <div className="brand">
                <a href="/" onClick={(e) => handleNavClick(e, "/")}>{
                    <Logo 
                        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                        animationSpeed={3}
                        showBorder={false}
                        className="custom-class"
                    >
                        🔖Aathees
                    </Logo>
                }</a>
            </div>

            <button
                className={`menu-btn ${open ? "open" : ""}`}
                onClick={toggle}
                aria-label="Toggle navigation"
                aria-expanded={open}
            >
                <span className="bar" />
                <span className="bar" />
                <span className="bar" />
            </button>

            <ul className={`nav-links ${open ? "open" : ""}`}>
                <li className="nav-item">
                    <a 
                        href="#About" 
                        onClick={(e) => handleNavClick(e, "#About")}
                        className={activeSection === "about" ? "active" : ""}
                    >
                        About
                    </a>
                </li>
                <li className="nav-item">
                    <a 
                        href="#Projects" 
                        onClick={(e) => handleNavClick(e, "#Projects")}
                        className={activeSection === "projects" ? "active" : ""}
                    >
                        Projects
                    </a>
                </li>
                <li className="nav-item">
                    <a 
                        href="#Skills" 
                        onClick={(e) => handleNavClick(e, "#Skills")}
                        className={activeSection === "skills" ? "active" : ""}
                    >
                        Skills
                    </a>
                </li>
                <li className="nav-item">
                    <a 
                        href="#Certificates" 
                        onClick={(e) => handleNavClick(e, "#Certificates")}
                        className={activeSection === "certificates" ? "active" : ""}
                    >
                        Certificates
                    </a>
                </li>
                <li className="nav-item">
                    <a 
                        href="#Contact" 
                        onClick={(e) => handleNavClick(e, "#Contact")}
                        className={activeSection === "contact" ? "active" : ""}
                    >
                        Contact
                    </a>
                </li>
            </ul>
        </Motion.nav>
        </>
    );
}
// ...existing code...