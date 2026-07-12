import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const API_URL = 'https://last-memory-backend.onrender.com/api';

const WishSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [wish, setWish] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState('');
  const [showMahadev, setShowMahadev] = useState(false);
  const [particles, setParticles] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showTimer, setShowTimer] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [wishCount, setWishCount] = useState(0);
  const timerRef = useRef(null);

  const mahadevImages = [
    "/src/assets/photos/mahadev.jpeg",
    "https://images.unsplash.com/photo-1633421946104-0ba1966bf895?w=400"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const wishes = [
    '🕉️ Mahadev ne sun li tumhari aarti',
    '🔱 Trishul se saari mushkilein dur ho gayi',
    '🌙 Chandrama ki tarah tumhari har wish poori ho',
    '🙏 Mahadev ka aashirwaad tumhare saath',
    '✨ Har kathinayi se nikalne ka raasta mil gaya',
    '🌟 Tumhari har manokamna poori ho Mahadev ki kripa se',
    '🔱 Jai Mahadev! Tumhari dua pahunch gayi',
    '🕉️ Om Namah Shivaya - Tumhari wish poori ho',
    '🌺 Mahadev ne apna var diya tumhe',
    '💫 Ab koi bhi sankat tumhare paas nahi aayega',
    '🙏 Mahadev ki kripa se tumhe sab milega',
    '🔱 Trishul ki tarah mazboot ho tumhari har wish'
  ];

  // ===== SAVE WISH TO BACKEND =====
  const saveWish = async (wishText) => {
    try {
      const response = await fetch(`${API_URL}/wishes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wish: wishText,
          name: 'Biharan'
        })
      });

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error saving wish:', error);
      return false;
    }
  };

  // ===== FETCH WISH COUNT =====
  const fetchWishCount = async () => {
    try {
      const response = await fetch(`${API_URL}/wishes/count`);
      const data = await response.json();
      if (data.success) {
        setWishCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching wish count:', error);
    }
  };

  useEffect(() => {
    fetchWishCount();
  }, []);

  // ===== GENERATE PARTICLES =====
  useEffect(() => {
    if (showMahadev) {
      const newParticles = [];
      const divineSymbols = ['🕉️', '🔱', '🌙', '🙏', '✨', '🌟', '💫', '🌺', '🌸', '🪔'];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 2,
          duration: Math.random() * 4 + 3,
          delay: Math.random() * 3,
          type: divineSymbols[Math.floor(Math.random() * divineSymbols.length)]
        });
      }
      setParticles(newParticles);
      setShowTimer(true);
      setTimeLeft(10);
      setImageError(false);
      setCurrentImageIndex(0);

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setShowMahadev(false);
            setShowTimer(false);
            setSubmitted(false);
            setResponse('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [showMahadev]);

  const handleImageError = () => {
    setImageError(true);
    if (currentImageIndex < mahadevImages.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  // ===== HANDLE SUBMIT =====
  const handleSubmit = async () => {
    if (!wish.trim()) {
      setResponse('🙏 Kuch toh likho, Mahadev sun rahe hain...');
      setTimeout(() => setResponse(''), 2000);
      return;
    }

    setSubmitted(true);
    setShowMahadev(true);
    setTimeLeft(10);
    setShowTimer(true);

    // Save to backend
    await saveWish(wish.trim());
    await fetchWishCount();

    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    setResponse(randomWish);

    setWish('');
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="section-card"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: showMahadev 
          ? 'linear-gradient(135deg, rgba(10, 10, 26, 0.95), rgba(26, 10, 10, 0.95))' 
          : 'rgba(255, 255, 255, 0.02)',
        transition: 'background 1.5s ease',
        borderColor: showMahadev ? 'rgba(233, 196, 106, 0.15)' : 'rgba(255, 255, 255, 0.04)',
      }}
    >
      {/* Divine Glow Background */}
      {showMahadev && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle at center, rgba(233, 196, 106, 0.15), rgba(231, 111, 81, 0.05), transparent 70%)',
              animation: 'divineGlow 3s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              background: 'radial-gradient(circle at 30% 70%, rgba(233, 196, 106, 0.03), transparent 50%)',
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Floating Divine Particles */}
      {showMahadev && particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0.5, 0],
            scale: [0, 1.2, 1, 0.5],
            x: [`${p.x}%`, `${p.x + (Math.random() - 0.5) * 30}%`],
            y: [`${p.y}%`, `${p.y + (Math.random() - 0.5) * 30}%`],
            rotate: [0, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          style={{
            position: 'absolute',
            fontSize: `${p.size * 3}px`,
            pointerEvents: 'none',
            zIndex: 0,
            filter: 'drop-shadow(0 0 10px rgba(233, 196, 106, 0.2))',
          }}
        >
          {p.type}
        </motion.div>
      ))}

      {/* Divine Border Glow */}
      {showMahadev && (
        <div
          style={{
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            borderRadius: '26px',
            background: 'linear-gradient(135deg, #e9c46a, #f4a261, #e76f51, #f4a261, #e9c46a)',
            backgroundSize: '300% 300%',
            animation: 'gradientBorder 3s ease-in-out infinite',
            opacity: 0.2,
            zIndex: -1,
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header Emoji */}
        <motion.span
          className="emoji-big"
          animate={{
            scale: showMahadev ? [1, 1.2, 1] : 1,
            rotate: showMahadev ? [0, 10, -10, 0] : 0,
          }}
          transition={{
            duration: 1.5,
            repeat: showMahadev ? Infinity : 0,
          }}
          style={{
            display: 'block',
            textAlign: 'center',
            marginBottom: '0.5rem',
            fontSize: '3.5rem',
            filter: showMahadev ? 'drop-shadow(0 0 30px rgba(233, 196, 106, 0.3))' : 'none',
          }}
        >
          {showMahadev ? '🔱' : '🌟'}
        </motion.span>

        {/* Title */}
        <motion.h2
          className="section-title"
          style={{
            color: showMahadev ? '#e9c46a' : '#e9c46a',
            textShadow: showMahadev ? '0 0 40px rgba(233, 196, 106, 0.15)' : 'none',
          }}
          animate={{
            scale: showMahadev ? [1, 1.02, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: showMahadev ? Infinity : 0,
          }}
        >
          {showMahadev ? '🔱 Mahadev Ne Sun Li' : 'Ek Wish Karo'}
        </motion.h2>

        {/* Wish Counter */}
        {!showMahadev && wishCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              textAlign: 'center',
              marginBottom: '1rem',
              fontSize: '0.85rem',
              color: '#555',
              fontFamily: '"Georgia", serif',
              letterSpacing: '1px',
            }}
          >
            <span style={{ color: '#e9c46a' }}>✦</span>
            {wishCount} wishes already blessed by Mahadev
            <span style={{ color: '#e9c46a' }}>✦</span>
          </motion.div>
        )}

        {/* Subtitle */}
        <p
          className="section-subtitle"
          style={{
            color: showMahadev ? '#f4a261' : '#888',
            fontSize: showMahadev ? '1.1rem' : '0.95rem',
            fontWeight: showMahadev ? 400 : 300,
            maxWidth: '600px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.8,
          }}
        >
          {showMahadev 
            ? '🕉️ Meri pyari biharan teri har manokaman puri karnege mere mahadev, wo ashutosh shiv hai sab ki sunte hai tu yetne pyari hai teri toh har baat sun rahe hai.' 
            : 'Jo dil mein hai, likh do. Mahadev sun rahe hai 🔱'}
        </p>

        {/* Timer */}
        {showTimer && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              textAlign: 'center',
              marginBottom: '1rem',
              color: '#e9c46a',
              fontSize: '0.9rem',
              fontWeight: 300,
              letterSpacing: '2px',
            }}
          >
            <span style={{ 
              background: 'rgba(233, 196, 106, 0.05)',
              padding: '0.3rem 1.5rem',
              borderRadius: '50px',
              border: '1px solid rgba(233, 196, 106, 0.1)',
            }}>
              ⏳ {timeLeft} seconds
            </span>
          </motion.div>
        )}

        {/* Mahadev Image */}
        <AnimatePresence mode="wait">
          {showMahadev && (
            <motion.div
              key="mahadev"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 180, opacity: 0 }}
              transition={{ type: 'spring', duration: 1, damping: 15 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  padding: '6px',
                  background: 'linear-gradient(135deg, #e9c46a, #f4a261, #e76f51, #f4a261, #e9c46a)',
                  backgroundSize: '300% 300%',
                  animation: 'gradientBorder 3s ease-in-out infinite',
                  boxShadow: '0 0 80px rgba(233, 196, 106, 0.2), 0 0 160px rgba(233, 196, 106, 0.1)',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid rgba(10, 10, 26, 0.9)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(10,10,26,0.5)',
                  }}
                >
                  {!imageError ? (
                    <img
                      src={mahadevImages[currentImageIndex]}
                      alt="Mahadev"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      onError={handleImageError}
                    />
                  ) : (
                    <span style={{ fontSize: '4.5rem' }}>🔱</span>
                  )}
                  
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 30% 30%, rgba(233, 196, 106, 0.1), transparent 60%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    right: '-10px',
                    bottom: '-10px',
                    borderRadius: '50%',
                    border: '2px solid rgba(233, 196, 106, 0.1)',
                    animation: 'glowPulse 2s ease-in-out infinite',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '-18px',
                    left: '-18px',
                    right: '-18px',
                    bottom: '-18px',
                    borderRadius: '50%',
                    border: '1px solid rgba(233, 196, 106, 0.05)',
                    animation: 'glowPulse 2s ease-in-out infinite 0.5s',
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Section */}
        {!showMahadev && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block', width: '100%', maxWidth: '400px' }}>
              <input
                type="text"
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="🙏 Kya wish karti ho?"
                disabled={submitted}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(244, 162, 97, 0.15)',
                  borderRadius: '14px',
                  color: '#f0e6d3',
                  fontSize: '1.1rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#f4a261';
                  e.target.style.boxShadow = '0 0 30px rgba(244, 162, 97, 0.05)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(244, 162, 97, 0.15)';
                  e.target.style.boxShadow = 'none';
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '1.2rem',
                  opacity: 0.3,
                  pointerEvents: 'none',
                }}
              >
                🙏
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={submitted}
              style={{
                marginTop: '1.2rem',
                padding: '0.8rem 3rem',
                background: submitted
                  ? 'rgba(244, 162, 97, 0.3)'
                  : 'linear-gradient(135deg, #e9c46a, #f4a261)',
                border: 'none',
                borderRadius: '50px',
                color: submitted ? '#666' : '#0f0e1a',
                fontSize: '1.1rem',
                cursor: submitted ? 'default' : 'pointer',
                fontFamily: 'inherit',
                opacity: submitted ? 0.5 : 1,
                transition: 'all 0.3s ease',
                boxShadow: submitted
                  ? 'none'
                  : '0 8px 30px rgba(233, 196, 106, 0.2)',
              }}
            >
              {submitted ? '⏳ Mahadev ko bhej rahe...' : '🙏 Wish It'}
            </motion.button>
          </div>
        )}

        {/* Response Message */}
        <AnimatePresence mode="wait">
          {response && (
            <motion.div
              key={response}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20 }}
              style={{
                marginTop: '1.5rem',
                padding: '1.5rem',
                background: showMahadev
                  ? 'rgba(233, 196, 106, 0.06)'
                  : 'rgba(244, 162, 97, 0.04)',
                borderRadius: '16px',
                border: showMahadev
                  ? '1px solid rgba(233, 196, 106, 0.12)'
                  : '1px solid rgba(244, 162, 97, 0.06)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {showMahadev && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle at center, rgba(233, 196, 106, 0.03), transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />
              )}
              
              <p
                style={{
                  color: showMahadev ? '#e9c46a' : '#e9c46a',
                  fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                  fontWeight: 300,
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 1,
                  lineHeight: 1.8,
                }}
              >
                {response}
              </p>
              
              {showMahadev && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  style={{
                    textAlign: 'center',
                    marginTop: '0.8rem',
                    fontSize: '2.5rem',
                    position: 'relative',
                    zIndex: 1,
                    letterSpacing: '8px',
                  }}
                >
                  🕉️🙏🔱
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Devotional Footer */}
        {!showMahadev && (
          <div
            style={{
              marginTop: '1.5rem',
              fontSize: '0.8rem',
              color: '#444',
              textAlign: 'center',
              letterSpacing: '2px',
              borderTop: '1px solid rgba(255,255,255,0.02)',
              paddingTop: '1.2rem',
            }}
          >
            <span style={{ opacity: 0.5 }}>✦</span>
            <span style={{ margin: '0 0.5rem', color: '#555' }}>Mere Mahadev Yesko Khush Rakhna.</span>
            <span style={{ opacity: 0.5 }}>✦</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes divineGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        @keyframes gradientBorder {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.08); }
        }
      `}</style>
    </motion.div>
  );
};

export default WishSection;
