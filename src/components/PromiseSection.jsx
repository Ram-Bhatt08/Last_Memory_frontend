import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PromiseSection = ({ promises }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [responses, setResponses] = useState({});
  const [showFinal, setShowFinal] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [floatingStars, setFloatingStars] = useState([]);
  const [sparkleIntensity, setSparkleIntensity] = useState(0);

  // Generate floating stars
  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 20; i++) {
      stars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 3,
        type: ['✦', '✧', '🌟', '✨', '💫', '⭐'][Math.floor(Math.random() * 6)]
      });
    }
    setFloatingStars(stars);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkleIntensity((prev) => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleResponse = (id, accepted) => {
    setResponses((prev) => ({ ...prev, [id]: accepted }));

    const allAnswered = promises.every((p) => responses[p.id] !== undefined || p.id === id);
    if (allAnswered) {
      setTimeout(() => {
        setShowFinal(true);
        // Trigger magical burst
        setSparkleIntensity(100);
        setTimeout(() => setSparkleIntensity(0), 2000);
      }, 500);
    }
  };

  const total = promises.length;
  const answered = Object.keys(responses).length;
  const accepted = Object.values(responses).filter((r) => r === true).length;
  const allDone = answered === total;
  const magicLevel = total > 0 ? Math.round((accepted / total) * 100) : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, type: 'spring', damping: 20 }}
      style={{
        maxWidth: '900px',
        margin: '4rem auto',
        padding: '0 1rem',
        position: 'relative',
      }}
    >
      {/* ===== MAGICAL BACKGROUND ===== */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `
            radial-gradient(circle at 30% 20%, rgba(233, 196, 106, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(231, 111, 81, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(42, 157, 143, 0.02) 0%, transparent 70%)
          `,
          animation: 'magicAura 10s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ===== FLOATING STARS ===== */}
      {floatingStars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.3, 0.6, 0.3, 0],
            scale: [0, 1, 1.2, 1, 0],
            x: [`${star.x}%`, `${star.x + (Math.random() - 0.5) * 20}%`],
            y: [`${star.y}%`, `${star.y + (Math.random() - 0.5) * 20}%`],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          style={{
            position: 'absolute',
            fontSize: `${star.size}px`,
            color: star.type === '✦' || star.type === '✧' ? '#e9c46a' : '#f4a261',
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0.3,
          }}
        >
          {star.type}
        </motion.div>
      ))}

      {/* ===== MAIN CARD ===== */}
      <motion.div
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'relative',
          background: `
            linear-gradient(180deg, rgba(10, 10, 26, 0.95) 0%, rgba(20, 10, 30, 0.95) 50%, rgba(10, 10, 26, 0.95) 100%)
          `,
          borderRadius: '30px',
          padding: '3rem 2.5rem 2.5rem',
          border: '1px solid rgba(233, 196, 106, 0.1)',
          boxShadow: `
            0 30px 80px rgba(0,0,0,0.6),
            0 0 60px rgba(233, 196, 106, 0.02),
            inset 0 1px 0 rgba(255,255,255,0.02)
          `,
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {/* ===== MAGICAL GLOW RING ===== */}
        <motion.div
          animate={{
            rotate: [0, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            border: '1px solid rgba(233, 196, 106, 0.02)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        {/* ===== MAGICAL BORDER PARTICLES ===== */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
            style={{
              position: 'absolute',
              top: i < 4 ? '-5px' : 'auto',
              bottom: i >= 4 ? '-5px' : 'auto',
              left: `${i * 14.28}%`,
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#e9c46a',
              boxShadow: '0 0 10px rgba(233, 196, 106, 0.3)',
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* ===== CONTENT ===== */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* ===== HEADER ===== */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            style={{ textAlign: 'center', marginBottom: '2rem' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '0.5rem',
              }}
            >
              <motion.span
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{ fontSize: '2rem' }}
              >
                ✧
              </motion.span>
              <span style={{ fontSize: '2.5rem' }}>🔮</span>
              <motion.span
                animate={{
                  rotate: [360, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{ fontSize: '2rem' }}
              >
                ✧
              </motion.span>
            </div>

            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, type: 'spring' }}
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontWeight: 300,
                background: 'linear-gradient(135deg, #e9c46a, #f4a261, #e76f51, #f4a261, #e9c46a)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradientMove 4s ease-in-out infinite',
                letterSpacing: '4px',
                fontFamily: '"Georgia", serif',
              }}
            >
              ✦ Mystical Vows ✦
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              style={{
                color: '#888',
                fontSize: '1rem',
                fontWeight: 300,
                letterSpacing: '3px',
                fontFamily: '"Georgia", serif',
                marginTop: '0.3rem',
              }}
            >
              ✧ Bind your soul to these sacred promises ✧
            </motion.p>
          </motion.div>

          {/* ===== MAGIC METER ===== */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
            style={{
              marginBottom: '2rem',
              padding: '1rem 1.5rem',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.03)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.85rem',
                color: '#666',
                marginBottom: '0.5rem',
                fontFamily: '"Georgia", serif',
                flexWrap: 'wrap',
                gap: '0.3rem',
              }}
            >
              <span>
                <span style={{ color: '#e9c46a' }}>✦</span> Bound: {answered}/{total}
              </span>
              <span>
                <span style={{ color: '#e9c46a' }}>✦</span> Honored: {accepted}
              </span>
              {answered > 0 && (
                <span>
                  <span style={{ color: '#e9c46a' }}>✦</span> Magic Level: {magicLevel}%
                </span>
              )}
            </div>

            <div
              style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(answered / total) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #e9c46a, #f4a261, #e76f51, #f4a261, #e9c46a)',
                  backgroundSize: '200% 100%',
                  borderRadius: '10px',
                  position: 'relative',
                  boxShadow: '0 0 20px rgba(233, 196, 106, 0.1)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    animation: 'shimmerMagic 2s infinite',
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* ===== PROMISE CARDS ===== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {promises.map((promise, index) => {
              const isAnswered = responses[promise.id] !== undefined;
              const isAccepted = responses[promise.id] === true;
              const isHovered = hoveredId === promise.id;

              return (
                <motion.div
                  key={promise.id}
                  initial={{ opacity: 0, x: -30, rotateY: -5 }}
                  animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                  transition={{ delay: index * 0.06, type: 'spring', damping: 20 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  onHoverStart={() => setHoveredId(promise.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  style={{
                    background: isAnswered
                      ? isAccepted
                        ? 'rgba(42, 157, 143, 0.06)'
                        : 'rgba(231, 111, 81, 0.06)'
                      : 'rgba(255,255,255,0.01)',
                    border: `1px solid ${
                      isAnswered
                        ? isAccepted
                          ? 'rgba(42, 157, 143, 0.2)'
                          : 'rgba(231, 111, 81, 0.2)'
                        : isHovered
                        ? 'rgba(233, 196, 106, 0.2)'
                        : 'rgba(255,255,255,0.03)'
                    }`,
                    borderRadius: '14px',
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    transition: 'all 0.4s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: isHovered ? '0 0 30px rgba(233, 196, 106, 0.02)' : 'none',
                  }}
                >
                  {/* Glow effect on hover */}
                  {isHovered && !isAnswered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        background: 'radial-gradient(circle at center, rgba(233, 196, 106, 0.02), transparent 70%)',
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  {/* Promise number with magical symbol */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      flex: 1,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.8rem',
                        color: isAnswered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                        fontFamily: '"Georgia", serif',
                        minWidth: '25px',
                        textAlign: 'center',
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <p
                      style={{
                        color: isAnswered ? (isAccepted ? '#2a9d8f' : '#e76f51') : '#d4cbc4',
                        fontSize: '1rem',
                        fontWeight: 300,
                        margin: 0,
                        fontFamily: '"Georgia", serif',
                      }}
                    >
                      {isAnswered && (
                        <span style={{ marginRight: '0.6rem' }}>
                          {isAccepted ? '✦' : '✧'}
                        </span>
                      )}
                      {promise.text}
                    </p>
                  </div>

                  {/* Action buttons */}
                  {!isAnswered ? (
                    <div
                      style={{
                        display: 'flex',
                        gap: '0.5rem',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(42, 157, 143, 0.2)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleResponse(promise.id, true)}
                        style={{
                          padding: '0.3rem 1.2rem',
                          background: 'rgba(42, 157, 143, 0.08)',
                          border: '1px solid rgba(42, 157, 143, 0.15)',
                          borderRadius: '50px',
                          color: '#2a9d8f',
                          cursor: 'pointer',
                          fontFamily: '"Georgia", serif',
                          fontSize: '0.85rem',
                          transition: 'all 0.3s ease',
                          letterSpacing: '1px',
                        }}
                      >
                        ✦ Bind
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(231, 111, 81, 0.2)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleResponse(promise.id, false)}
                        style={{
                          padding: '0.3rem 1.2rem',
                          background: 'rgba(231, 111, 81, 0.08)',
                          border: '1px solid rgba(231, 111, 81, 0.15)',
                          borderRadius: '50px',
                          color: '#e76f51',
                          cursor: 'pointer',
                          fontFamily: '"Georgia", serif',
                          fontSize: '0.85rem',
                          transition: 'all 0.3s ease',
                          letterSpacing: '1px',
                        }}
                      >
                        ✧ Release
                      </motion.button>
                    </div>
                  ) : (
                    <motion.span
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 15 }}
                      style={{
                        fontSize: '0.8rem',
                        color: isAccepted ? '#2a9d8f' : '#e76f51',
                        fontFamily: '"Georgia", serif',
                        fontStyle: 'italic',
                        padding: '0.2rem 1rem',
                        background: isAccepted
                          ? 'rgba(42, 157, 143, 0.05)'
                          : 'rgba(231, 111, 81, 0.05)',
                        borderRadius: '50px',
                        border: `1px solid ${isAccepted ? 'rgba(42, 157, 143, 0.1)' : 'rgba(231, 111, 81, 0.1)'}`,
                      }}
                    >
                      {isAccepted ? '✦ Bound' : '✧ Released'}
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* ===== FINAL MAGICAL REVELATION ===== */}
          <AnimatePresence>
            {allDone && showFinal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -30 }}
                transition={{ type: 'spring', damping: 15, duration: 0.8 }}
                style={{
                  marginTop: '2rem',
                  padding: '2rem',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '18px',
                  border: '1px solid rgba(233, 196, 106, 0.08)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Magical burst background */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 2 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at center, rgba(233, 196, 106, 0.03), transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Floating magical symbols */}
                {['✦', '✧', '🌟', '💫', '✨'].map((symbol, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                      y: [-20, -60, -100],
                      x: [0, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 80],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.2, 0.5],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 2.5,
                      delay: i * 0.3,
                      repeat: Infinity,
                    }}
                    style={{
                      position: 'absolute',
                      fontSize: '1.2rem',
                      color: '#e9c46a',
                      pointerEvents: 'none',
                      opacity: 0,
                    }}
                  >
                    {symbol}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  style={{ fontSize: '3.5rem', marginBottom: '0.5rem', position: 'relative', zIndex: 1 }}
                >
                  {magicLevel >= 80 ? '🌟' : magicLevel >= 50 ? '🔮' : '💫'}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    color: '#e9c46a',
                    fontWeight: 300,
                    fontSize: '1.2rem',
                    fontFamily: '"Georgia", serif',
                    lineHeight: 1.8,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {magicLevel === 100
                    ? '✨ The magic binds you forever! A sacred bond has been forged! ✨'
                    : magicLevel >= 70
                    ? '🔮 Strong magic flows through these vows. The bond is powerful! 🔮'
                    : magicLevel >= 50
                    ? '🌟 Some bonds are formed, some released. The magic is still alive! 🌟'
                    : '💫 The magic accepts your choices. Some bonds are meant to be free. 💫'}
                </motion.p>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring' }}
                  style={{
                    marginTop: '0.8rem',
                    padding: '0.5rem 1.5rem',
                    display: 'inline-block',
                    background: 'rgba(233, 196, 106, 0.04)',
                    borderRadius: '50px',
                    border: '1px solid rgba(233, 196, 106, 0.06)',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <p
                    style={{
                      color: '#888',
                      fontSize: '0.8rem',
                      margin: 0,
                      fontFamily: '"Georgia", serif',
                      letterSpacing: '2px',
                    }}
                  >
                    {accepted}/{total} bonds forged • {magicLevel}% magic
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ===== FOOTER ===== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            style={{
              marginTop: '2rem',
              textAlign: 'center',
              fontFamily: '"Georgia", serif',
              color: '#444',
              fontSize: '0.8rem',
              letterSpacing: '3px',
              borderTop: '1px solid rgba(255,255,255,0.02)',
              paddingTop: '1.2rem',
            }}
          >
            <span style={{ color: '#555' }}>✦</span>
            <span style={{ margin: '0 0.5rem', color: '#444' }}>The magic is real</span>
            <span style={{ color: '#555' }}>✦</span>
          </motion.div>
        </div>

        <style>{`
          @keyframes gradientMove {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          @keyframes shimmerMagic {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          @keyframes magicAura {
            0%, 100% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.1) rotate(5deg); }
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
};

export default PromiseSection;
