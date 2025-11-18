import React, { useEffect, useState } from "react";
import "./Certificates.css";
import { motion as Motion, AnimatePresence } from "framer-motion";

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch("https://portfolio-api-jie5.onrender.com/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const arr = Array.isArray(data) ? data : [];

        setCerts(
          arr.map((item, i) => ({
            ...item,
            uniqueId: item._id || item.id || i,
            title: item.title,
            description: item.description,
            issuer: item.issuedBy,
            date: item.issueDate ? new Date(item.issueDate).toLocaleDateString() : "N/A",
            link: item.certificateUrl,
            thumbnail: item.thumbnail,
          }))
        );
      })
      .catch(() => !cancelled && setCerts([]));

    return () => {
      cancelled = true;
    };
  }, []);

  const handleNext = () => {
    if (isTransitioning || certs.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % certs.length);
      setIsTransitioning(false);
    }, 400);
  };

  const handlePrevious = () => {
    if (isTransitioning || certs.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + certs.length) % certs.length);
      setIsTransitioning(false);
    }, 400);
  };

  const goToCard = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 400);
  };

  const handleCertificateClick = (cert) => {
    let url = cert.link || cert.certificateUrl;
    if (!url) return;
    if (!url.startsWith("http")) url = `https://${url}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const getCardPositions = () => {
    if (certs.length === 0) return [];

    if (window.innerWidth > 768) {
      const visibleCards = Math.min(5, certs.length);
      const cards = [];

      for (let i = 0; i < visibleCards; i++) {
        const index = (currentIndex + i) % certs.length;
        const isCenterCard = i === 2;
        const offset = i - 2;

        cards.push({
          ...certs[index],
          position: i,
          isCenterCard,
          x: offset * 350,
          y: isCenterCard ? -20 : 20,
          scale: isCenterCard ? 1.1 : 0.85 - Math.abs(offset) * 0.1,
          zIndex: isCenterCard ? 10 : 5 - Math.abs(offset),
          opacity: isCenterCard ? 1 : 0.6 - Math.abs(offset) * 0.1,
          rotation: offset * 5,
        });
      }
      return cards;
    }

    const visibleCards = Math.min(5, certs.length);
    const cards = [];

    for (let i = 0; i < visibleCards; i++) {
      const index = (currentIndex + i) % certs.length;
      const angle = (i / visibleCards) * 2 * Math.PI - Math.PI / 2;
      const radius = i === 0 ? 0 : 120 + i * 20;

      cards.push({
        ...certs[index],
        position: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        scale: i === 0 ? 1 : 0.7 - i * 0.1,
        zIndex: visibleCards - i,
        opacity: i === 0 ? 1 : 0.6 - i * 0.15,
        rotation: i === 0 ? 0 : angle * (180 / Math.PI),
        isCenterCard: i === 0,
      });
    }

    return cards;
  };

  const cardPositions = getCardPositions();

  return (
    <div className="certificates-wrapper">
      <Motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Certificates
        <div className="underlineC" />
      </Motion.h2>

      <div className="carousel-container">
        <div className="carousel-tracks" />

        <AnimatePresence mode="wait">
          {cardPositions.length === 0 ? (
            <Motion.div
              key="loading"
              className="loading-state"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <div className="loading-carousel">
                <div className="carousel-spinner" />
                <div className="carousel-spinner" />
                <div className="carousel-spinner" />
              </div>
              <p>Loading Certificates...</p>
            </Motion.div>
          ) : (
            <div className="cards-carousel">
              {cardPositions.map((cert, index) => (
                <Motion.article
                  key={cert.uniqueId}
                  className={`carousel-card ${
                    cert.isCenterCard ? "spotlight-card" : "side-card"
                  } ${cert.link ? "clickable-card" : "disabled-card"}`}
                  initial={{
                    x: cert.x,
                    y: cert.y,
                    scale: cert.scale,
                    rotate: cert.rotation,
                    opacity: cert.opacity,
                  }}
                  animate={{
                    x: cert.x,
                    y: cert.y,
                    scale: cert.scale,
                    rotate: cert.rotation,
                    opacity: cert.opacity,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.8, 0.25, 1],
                    delay: index * 0.05,
                  }}
                  style={{ zIndex: cert.zIndex }}
                  onHoverStart={() => setHoveredCard(cert.uniqueId)}
                  onHoverEnd={() => setHoveredCard(null)}
                  onClick={() => {
                    if (cert.isCenterCard && (cert.link || cert.certificateUrl)) {
                      handleCertificateClick(cert);
                    } else if (!cert.isCenterCard) {
                      const newIndex =
                        cert.position === 1 ? currentIndex + 1 : currentIndex - 1;
                      setCurrentIndex((newIndex + certs.length) % certs.length);
                    } else {
                      alert("No certificate link available");
                    }
                  }}
                >
                  <Motion.div
                    className="card-slide"
                    animate={{
                      rotateY: hoveredCard === cert.uniqueId ? 8 : 0,
                      rotateX: hoveredCard === cert.uniqueId ? 5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="slide-glow" />

                    <div
                      className="slide-thumbnail"
                      style={{
                        backgroundImage: cert.thumbnail
                          ? `url(${cert.thumbnail})`
                          : "none",
                      }}
                    >
                      <div className="slide-overlay" />
                    </div>

                    <div className="slide-content">
                      <h3 className="slide-title">{cert.title}</h3>

                      {cert.isCenterCard && (
                        <Motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="spotlight-info"
                        >
                          <p className="slide-description">{cert.description}</p>

                          <div className="slide-details">
                            <div className="detail-row">
                              <span>{cert.issuer}</span>
                            </div>
                            <div className="detail-row">
                              <span>{cert.date}</span>
                            </div>
                          </div>

                          <Motion.div
                            className={`click-indicator ${
                              cert.link ? "available" : "unavailable"
                            }`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            {cert.link ? (
                              <span>Click to View Certificate</span>
                            ) : (
                              <span>Certificate Link Unavailable</span>
                            )}
                          </Motion.div>
                        </Motion.div>
                      )}
                    </div>
                  </Motion.div>
                </Motion.article>
              ))}
            </div>
          )}
        </AnimatePresence>

        {certs.length > 1 && (
          <Motion.div
            className="carousel-controls"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Motion.button
              onClick={handlePrevious}
              disabled={isTransitioning}
              className="carousel-nav prev-nav"
            >
              ❮
            </Motion.button>

            <div className="carousel-progress">
              <div className="progress-track">
                <Motion.div
                  className="progress-fill"
                  animate={{
                    width: `${((currentIndex + 1) / certs.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="progress-info">
                <span>{currentIndex + 1}</span>/<span>{certs.length}</span>
              </div>
            </div>

            <Motion.button
              onClick={handleNext}
              disabled={isTransitioning}
              className="carousel-nav next-nav"
            >
              ❯
            </Motion.button>
          </Motion.div>
        )}

        {window.innerWidth > 768 && certs.length > 1 && (
          <Motion.div
            className="thumbnail-nav"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {certs.map((cert, index) => (
              <Motion.button
                key={cert.uniqueId}
                onClick={() => goToCard(index)}
                className={`thumb-btn ${index === currentIndex ? "active" : ""}`}
                disabled={isTransitioning}
              >
                <div
                  className="thumb-image"
                  style={{
                    backgroundImage: cert.thumbnail
                      ? `url(${cert.thumbnail})`
                      : "none",
                  }}
                />
                <div className="thumb-overlay" />
              </Motion.button>
            ))}
          </Motion.div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
