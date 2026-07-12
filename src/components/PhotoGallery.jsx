import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PhotoGallery = ({ photos }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  const autoPlayRef = useRef(null);

  // Auto-play carousel effect
  useEffect(() => {
    if (isAutoPlay && inView) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
      }, 3000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlay, inView, photos.length]);

  const openModal = (photo, index) => {
    setSelectedPhoto({ ...photo, index });
    document.body.style.overflow = 'hidden';
    setIsAutoPlay(false);
    clearInterval(autoPlayRef.current);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
    setIsAutoPlay(true);
  };

  const navigatePhoto = (direction) => {
    if (selectedPhoto) {
      const newIndex = (selectedPhoto.index + direction + photos.length) % photos.length;
      setSelectedPhoto({ ...photos[newIndex], index: newIndex });
    }
  };

  const handleImageError = (photoId) => {
    setImageErrors(prev => ({ ...prev, [photoId]: true }));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhoto) {
        if (e.key === 'ArrowLeft') navigatePhoto(-1);
        if (e.key === 'ArrowRight') navigatePhoto(1);
        if (e.key === 'Escape') closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: '1000px',
          margin: '3rem auto',
          padding: '0 1rem',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle at 30% 30%, rgba(244, 162, 97, 0.03), transparent 60%)',
              pointerEvents: 'none',
              animation: 'rotateGlow 20s linear infinite',
            }}
          />

          {/* Header with Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🎂</div>
            <h2
              style={{
                color: '#e9c46a',
                fontWeight: 300,
                fontSize: '18px',
                marginBottom: '0.3rem',
                letterSpacing: '2px',
                textShadow: '0 0 40px rgba(233, 196, 106, 0.1)',
                lineHeight: 1.4,
              }}
            >
            Biharan Ye sab bas photos nahi hai tumre sath k wo anmol pal hai jo hamesha yaad rahenge.Yes mai kuch aache yaade hai kuch buri yaade hai lekin har yaad bhaut anmol hai. 
            </h2>
            <p
              style={{
                color: '#888',
                fontSize: '1rem',
                marginBottom: '2rem',
                fontWeight: 300,
              }}
            >
              🎈 {photos.length} yaadein, ek pyari biharan 🎈
            </p>
          </motion.div>

          {/* Featured/Highlight Image - Carousel */}
          {inView && photos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '2rem',
                height: '280px',
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
              onClick={() => openModal(photos[currentIndex], currentIndex)}
            >
              {!imageErrors[photos[currentIndex].id] ? (
                <img
                  src={photos[currentIndex].url}
                  alt={`Memory ${currentIndex + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    display: 'block',
                  }}
                  onError={() => handleImageError(photos[currentIndex].id)}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.03)',
                  color: '#666',
                  fontSize: '3rem',
                }}>
                  🖼️
                </div>
              )}
              
              {/* Caption Overlay on Featured Image */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '2rem 1.5rem 1.5rem',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                }}
              >
                <p
                  style={{
                    color: '#f0e6d3',
                    fontSize: '0.95rem',
                    fontWeight: 300,
                    letterSpacing: '1px',
                    fontFamily: '"Georgia", serif',
                    fontStyle: 'italic',
                  }}
                >
                  💌 {photos[currentIndex].caption || '✨ A beautiful memory ✨'}
                </p>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.3)',
                    fontSize: '0.7rem',
                    marginTop: '0.3rem',
                    letterSpacing: '2px',
                  }}
                >
                  ✦ {currentIndex + 1} / {photos.length} ✦
                </p>
              </div>

              {/* Navigation dots on carousel */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '15px',
                  right: '15px',
                  display: 'flex',
                  gap: '6px',
                }}
              >
                {photos.slice(0, 6).map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(i);
                    }}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      border: 'none',
                      background: currentIndex === i ? '#e9c46a' : 'rgba(255,255,255,0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0,
                    }}
                  />
                ))}
                {photos.length > 6 && (
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem' }}>...</span>
                )}
              </div>
            </motion.div>
          )}

          {/* Photo Grid with Stagger Animation */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
              gap: '1.2rem',
            }}
          >
            {photos.map((photo, index) => {
              const isHovered = hoveredId === photo.id;
              const isCurrent = index === currentIndex;
              const hasError = imageErrors[photo.id];

              return (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
                  animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{
                    delay: index * 0.04,
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                    rotate: ['-1deg', '1deg', '-1deg'],
                    transition: { duration: 0.3 },
                  }}
                  onHoverStart={() => setHoveredId(photo.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onClick={() => openModal(photo, index)}
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.03)',
                    border: isCurrent
                      ? '2px solid #e9c46a'
                      : isHovered
                      ? '2px solid rgba(244, 162, 97, 0.4)'
                      : '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.3s ease',
                    boxShadow: isHovered
                      ? '0 15px 40px rgba(244, 162, 97, 0.15)'
                      : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Image Container */}
                  <div style={{ 
                    position: 'relative', 
                    width: '100%',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    overflow: 'hidden',
                    minHeight: '150px',
                    maxHeight: '250px',
                  }}>
                    {!hasError ? (
                      <img
                        src={photo.url}
                        alt={`Memory ${index + 1}`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '250px',
                          objectFit: 'contain',
                          display: 'block',
                          transition: 'transform 0.5s ease',
                          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        }}
                        onError={() => handleImageError(photo.id)}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          minHeight: '150px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(255,255,255,0.03)',
                          color: '#444',
                          fontSize: '2rem',
                        }}
                      >
                        🖼️
                      </div>
                    )}

                    {/* Hover overlay with number */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(4px)',
                        pointerEvents: 'none',
                      }}
                    >
                      <span
                        style={{
                          color: '#fff',
                          fontSize: '2rem',
                          fontWeight: 300,
                          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        }}
                      >
                        ✦
                      </span>
                    </motion.div>

                    {/* Index badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.6rem',
                        color: 'rgba(255,255,255,0.7)',
                        fontWeight: 300,
                        border: '1px solid rgba(255,255,255,0.05)',
                        pointerEvents: 'none',
                      }}
                    >
                      {index + 1}
                    </div>

                    {/* Sparkle effect on hover */}
                    {isHovered && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                          position: 'absolute',
                          top: '-10px',
                          right: '-10px',
                          fontSize: '1.5rem',
                          pointerEvents: 'none',
                        }}
                      >
                        ✨
                      </motion.div>
                    )}
                  </div>

                  {/* ===== CAPTION BELOW IMAGE ===== */}
                  <div
                    style={{
                      padding: '0.7rem 0.8rem',
                      background: 'rgba(0,0,0,0.3)',
                      backdropFilter: 'blur(10px)',
                      borderTop: '1px solid rgba(255,255,255,0.03)',
                      minHeight: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        color: isHovered ? '#e9c46a' : '#d4cbc4',
                        fontSize: '0.75rem',
                        fontWeight: 300,
                        textAlign: 'center',
                        fontFamily: '"Georgia", serif',
                        fontStyle: 'italic',
                        lineHeight: 1.4,
                        margin: 0,
                        transition: 'color 0.3s ease',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {photo.caption || '✨ A beautiful memory ✨'}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p
            style={{
              color: '#555',
              fontSize: '0.85rem',
              textAlign: 'center',
              marginTop: '1.5rem',
              fontWeight: 300,
              letterSpacing: '1px',
            }}
          >
            ✦ Click on any photo to see it closer ✦
          </p>

          <style>{`
            @keyframes rotateGlow {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </motion.div>

      {/* ✨ Enhanced Modal with Navigation & Caption ✨ */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.92)',
              backdropFilter: 'blur(30px)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              cursor: 'pointer',
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 10001,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                color: '#fff',
                fontSize: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(244, 162, 97, 0.2)';
                e.target.style.borderColor = 'rgba(244, 162, 97, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.05)';
                e.target.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              ✕
            </button>

            {/* Counter */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#666',
                fontSize: '0.9rem',
                fontWeight: 300,
                letterSpacing: '2px',
                background: 'rgba(0,0,0,0.5)',
                padding: '0.3rem 1.5rem',
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.03)',
              }}
            >
              🎂 {selectedPhoto.index + 1} / {photos.length}
            </div>

            {/* Main Image */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotate: 10 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '600px',
                width: '100%',
                maxHeight: '80vh',
                borderRadius: '20px',
                overflow: 'hidden',
                background: '#1a1a2e',
                border: '1px solid rgba(244, 162, 97, 0.1)',
                position: 'relative',
                boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
              }}
            >
              {!imageErrors[selectedPhoto.id] ? (
                <img
                  key={selectedPhoto.id}
                  src={selectedPhoto.url}
                  alt={`Memory ${selectedPhoto.index + 1}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '60vh',
                    objectFit: 'contain',
                    display: 'block',
                    background: '#0a0a1a',
                  }}
                  onError={() => handleImageError(selectedPhoto.id)}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '60vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#0a0a1a',
                  color: '#666',
                  fontSize: '4rem',
                }}>
                  🖼️
                </div>
              )}

              {/* ===== CAPTION IN MODAL ===== */}
              <div
                style={{
                  padding: '1rem 1.5rem',
                  background: 'rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(10px)',
                  borderTop: '1px solid rgba(255,255,255,0.03)',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    color: '#e9c46a',
                    fontSize: '1rem',
                    fontWeight: 300,
                    fontFamily: '"Georgia", serif',
                    fontStyle: 'italic',
                    letterSpacing: '1px',
                    margin: 0,
                  }}
                >
                  💌 {selectedPhoto.caption || '✨ A beautiful memory ✨'}
                </p>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePhoto(-1);
                }}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  color: '#fff',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(244, 162, 97, 0.3)';
                  e.target.style.borderColor = 'rgba(244, 162, 97, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(0,0,0,0.5)';
                  e.target.style.borderColor = 'rgba(255,255,255,0.05)';
                }}
              >
                ◀
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePhoto(1);
                }}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  color: '#fff',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(244, 162, 97, 0.3)';
                  e.target.style.borderColor = 'rgba(244, 162, 97, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(0,0,0,0.5)';
                  e.target.style.borderColor = 'rgba(255,255,255,0.05)';
                }}
              >
                ▶
              </button>

              {/* Bottom controls */}
              <div
                style={{
                  padding: '0.8rem 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid rgba(255,255,255,0.03)',
                  background: 'rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span
                  style={{
                    color: '#666',
                    fontSize: '0.85rem',
                    fontWeight: 300,
                  }}
                >
                  🎈 {selectedPhoto.index + 1} of {photos.length}
                </span>
                <button
                  onClick={closeModal}
                  style={{
                    padding: '0.3rem 2rem',
                    background: 'rgba(244, 162, 97, 0.1)',
                    border: '1px solid rgba(244, 162, 97, 0.2)',
                    borderRadius: '50px',
                    color: '#f4a261',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(244, 162, 97, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(244, 162, 97, 0.1)';
                  }}
                >
                  Close ✕
                </button>
              </div>
            </motion.div>

            {/* Keyboard hint */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                color: '#333',
                fontSize: '0.7rem',
                fontWeight: 300,
                letterSpacing: '1px',
              }}
            >
              ← → to navigate • ESC to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoGallery;
