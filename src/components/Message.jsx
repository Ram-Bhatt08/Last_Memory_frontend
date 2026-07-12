import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Message = ({ letter, onOpen }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [expanded, setExpanded] = useState(false);
  const [hasTriggeredFlowers, setHasTriggeredFlowers] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState('📜');
  const [floatingParticles, setFloatingParticles] = useState([]);
  const [currentYear, setCurrentYear] = useState(2003);
  const [showTimeCapsule, setShowTimeCapsule] = useState(false);

  // ===== TIME CAPSULE YEARS =====
  const years = [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

  // ===== FLOATING PARTICLES =====
  useEffect(() => {
    const particles = ['✦', '✧', '💫', '✨', '🌟', '🕊️', '📜', '⌛'];
    const newParticles = [];
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 12 + 6,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 5,
        type: particles[Math.floor(Math.random() * particles.length)],
        opacity: Math.random() * 0.25 + 0.05,
      });
    }
    setFloatingParticles(newParticles);
  }, []);

  // ===== TIME CAPSULE ANIMATION =====
  useEffect(() => {
    if (inView) {
      setShowTimeCapsule(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index < years.length) {
          setCurrentYear(years[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 150);
      return () => clearInterval(interval);
    }
  }, [inView]);

  // ===== TRIGGER FLOWERS =====
  useEffect(() => {
    if (inView && !hasTriggeredFlowers && onOpen) {
      setHasTriggeredFlowers(true);
      onOpen();
    }
  }, [inView, hasTriggeredFlowers, onOpen]);

  // ===== EMOJI HOVER =====
  const emojis = ['📜', '💌', '⌛', '🕯️', '💫', '✨', '🌟', '🧡'];

  const handleHover = () => {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setCurrentEmoji(randomEmoji);
  };

  const handleLeave = () => {
    setCurrentEmoji('📜');
  };

  // ===== PARSE LETTER WITH MARKDOWN & HTML =====
  const parseLetter = (text) => {
    // Split by double newlines for paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((para, index) => {
      // Check for HTML span with style (like <span style="color:red">)
      if (para.includes('<span')) {
        const spanRegex = /<span style="([^"]*)">(.*?)<\/span>/g;
        let match;
        let processed = para;
        const parts = [];
        let lastIndex = 0;
        
        while ((match = spanRegex.exec(para)) !== null) {
          const before = para.slice(lastIndex, match.index);
          if (before) parts.push({ type: 'text', content: before });
          parts.push({ type: 'span', style: match[1], content: match[2] });
          lastIndex = match.index + match[0].length;
        }
        if (lastIndex < para.length) {
          parts.push({ type: 'text', content: para.slice(lastIndex) });
        }
        
        return (
          <p
            key={index}
            style={{
              textAlign: 'center',
              fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
              lineHeight: 2.2,
              color: '#3d2b1f',
              fontWeight: 300,
              marginBottom: '1rem',
              fontFamily: '"Georgia", serif',
            }}
          >
            {parts.map((part, i) => {
              if (part.type === 'span') {
                // Extract color from style string
                const colorMatch = part.style.match(/color:([^;]+)/);
                const color = colorMatch ? colorMatch[1].trim() : '#e74c3c';
                return (
                  <span key={i} style={{ 
                    textalign: 'center',
                    color: color,
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.05), rgba(231, 76, 60, 0.02))',
                    padding: '0.1rem 0.3rem',
                    borderRadius: '4px',
                  }}>
                    {part.content}
                  </span>
                );
              }
              return <span key={i}>{part.content}</span>;
            })}
          </p>
        );
      }

      // Check if it's a heading (starts with #)
      if (para.startsWith('# ')) {
        return (
          <h3
            key={index}
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 400,
              color: '#4a2c1a',
              textAlign: 'center',
              margin: '1.5rem 0 1rem',
              fontFamily: '"Georgia", serif',
              letterSpacing: '2px',
              background: 'linear-gradient(135deg, #5a3d2b, #8b6b4d, #5a3d2b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {para.replace('# ', '')}
          </h3>
        );
      }
      
      // Check for bold text (**text**)
      if (para.includes('**')) {
        const parts = para.split('**');
        return (
          <p
            key={index}
            style={{
              textalign: 'center',
              fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
              lineHeight: 2.2,
              color: '#3d2b1f',
              fontWeight: 300,
              marginBottom: '1rem',
              fontFamily: '"Georgia", serif',
            }}
          >
            {parts.map((part, i) => {
              if (i % 2 === 1) {
                return (
                  <span key={i} style={{ 
                    textalign: 'center',
                    fontWeight: 'bold', 
                    color: '#8b1a1a',
                    background: 'linear-gradient(135deg, rgba(139, 26, 26, 0.08), rgba(139, 26, 26, 0.03))',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '4px',
                    borderLeft: '2px solid rgba(139, 26, 26, 0.1)',
                  }}>
                    {part}
                  </span>
                );
              }
              return <span key={i}>{part}</span>;
            })}
          </p>
        );
      }
      
      // Regular paragraph
      return (
        <p
          key={index}
          style={{
            textAlign: 'center',
            fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
            lineHeight: 2.2,
            color: '#3d2b1f',
            fontWeight: 300,
            marginBottom: '1rem',
            fontFamily: '"Georgia", serif',
          }}
        >
          {para}
        </p>
      );
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 1.2, type: 'spring', damping: 20 }}
      style={{
        textAlign: 'center',
        maxWidth: '1000px',
        margin: '3rem auto',
        padding: '0 1rem',
        perspective: '1200px',
        position: 'relative',
      }}
    >
      {/* ===== FLOATING PARTICLES ===== */}
      {floatingParticles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, p.opacity, 0],
            scale: [0, 1, 0.5],
            x: [`${p.x}%`, `${p.x + (Math.random() - 0.5) * 25}%`],
            y: [`${p.y}%`, `${p.y + (Math.random() - 0.5) * 25}%`],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          style={{
            textAlign: 'center',
            position: 'absolute',
            fontSize: `${p.size}px`,
            color: '#8b6b4d',
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0,
          }}
        >
          {p.type}
        </motion.div>
      ))}

      {/* ===== TIME CAPSULE HEADER ===== */}
      {showTimeCapsule && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            padding: '0.5rem 1.5rem',
            background: 'rgba(139, 107, 77, 0.05)',
            borderRadius: '50px',
            border: '1px solid rgba(139, 107, 77, 0.05)',
            display: 'inline-block',
            width: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <span style={{ 
            fontFamily: '"Georgia", serif', 
            color: '#F8CC2C',
            fontSize: '0.8rem',
            letterSpacing: '3px',
            opacity: 0.6,
            textalign: 'center',
          }}>
            ✦ TIME CAPSULE ✦
          </span>
          <motion.span
            key={currentYear}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'inline-block',
              marginLeft: '0.8rem',
              fontFamily: '"Georgia", serif',
              color: '#F8CC2C',
              fontSize: '1rem',
              fontWeight: 'bold',
              letterSpacing: '2px',
              textalign: 'center',
            }}
          >
            {currentYear}
          </motion.span>
        </motion.div>
      )}

      {/* ===== MAIN LETTER ===== */}
      <motion.div
        whileHover={{ scale: 1.003 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: 'center',
          position: 'relative',
          background: 'linear-gradient(165deg, #f5e6d3 0%, #e8d5c4 30%, #f5e6d3 60%, #ede0d0 100%)',
          borderRadius: '28px',
          padding: '4rem 3.5rem 3.5rem',
          boxShadow: `
            0 40px 100px rgba(0,0,0,0.6),
            0 0 0 1px rgba(139, 107, 77, 0.1),
            inset 0 1px 0 rgba(255,255,255,0.3),
            inset 0 -2px 0 rgba(0,0,0,0.05)
          `,
          border: '3px solid #d4b896',
          transform: expanded ? 'scale(1.008)' : 'scale(1)',
          transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
        }}
      >
        {/* ===== PAPER TEXTURE ===== */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '25px',
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(139, 107, 77, 0.025) 2px,
                rgba(139, 107, 77, 0.025) 4px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 3px,
                rgba(139, 107, 77, 0.015) 3px,
                rgba(139, 107, 77, 0.015) 6px
              ),
              radial-gradient(ellipse at 15% 25%, rgba(139,107,77,0.03) 0%, transparent 50%),
              radial-gradient(ellipse at 85% 75%, rgba(139,107,77,0.03) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(139,107,77,0.01) 0%, transparent 70%)
            `,
            pointerEvents: 'none',
            opacity: 0.6,
          }}
        />

        {/* ===== AGED EDGES ===== */}
        <div
          style={{
            position: 'absolute',
            top: -3,
            left: -3,
            right: -3,
            bottom: -3,
            borderRadius: '30px',
            background: `
              radial-gradient(ellipse at 0% 0%, rgba(139, 107, 77, 0.2) 0%, transparent 40%),
              radial-gradient(ellipse at 100% 0%, rgba(139, 107, 77, 0.2) 0%, transparent 40%),
              radial-gradient(ellipse at 0% 100%, rgba(139, 107, 77, 0.2) 0%, transparent 40%),
              radial-gradient(ellipse at 100% 100%, rgba(139, 107, 77, 0.2) 0%, transparent 40%)
            `,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* ===== WATERMARK ===== */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-25deg)',
            fontSize: '8rem',
            color: 'rgba(139, 107, 77, 0.015)',
            fontFamily: '"Georgia", serif',
            fontWeight: 'bold',
            pointerEvents: 'none',
            zIndex: 0,
            letterSpacing: '10px',
          }}
        >
          ✦ 2003 ✦ 2026 ✦
        </div>

        {/* ===== WAX SEAL - TOP LEFT ===== */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 150, damping: 15 }}
          style={{
            position: 'absolute',
            top: '-25px',
            left: '-25px',
            zIndex: 10,
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at 40% 35%, #c0392b, #8b1a1a, #5a0e0e)',
              boxShadow: `
                0 10px 40px rgba(139, 26, 26, 0.5),
                inset 0 -4px 12px rgba(0,0,0,0.4),
                inset 0 4px 12px rgba(255,255,255,0.15)
              `,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid #5a0e0e',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '2px solid rgba(255, 200, 150, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem',
                color: '#d4a574',
                fontWeight: 'bold',
                fontFamily: 'Georgia, serif',
                background: 'radial-gradient(circle at 40% 35%, rgba(255,200,150,0.05), transparent)',
              }}
            >
              📜
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '8px',
                width: '12px',
                height: '20px',
                background: '#8b1a1a',
                borderRadius: '0 0 6px 6px',
                opacity: 0.5,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-16px',
                right: '12px',
                width: '8px',
                height: '16px',
                background: '#8b1a1a',
                borderRadius: '0 0 5px 5px',
                opacity: 0.4,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-12px',
                left: '38px',
                width: '6px',
                height: '12px',
                background: '#8b1a1a',
                borderRadius: '0 0 4px 4px',
                opacity: 0.3,
              }}
            />
          </div>
        </motion.div>

        {/* ===== VINTAGE RIBBON - TOP RIGHT ===== */}
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.3, type: 'spring', stiffness: 150, damping: 15 }}
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: '90px',
              height: '45px',
              background: 'linear-gradient(180deg, #8b1a1a, #c0392b, #8b1a1a)',
              clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)',
              boxShadow: '0 8px 30px rgba(139, 26, 26, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(15deg)',
            }}
          >
            <span
              style={{
                color: '#d4a574',
                fontSize: '0.5rem',
                fontWeight: 'bold',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                fontFamily: 'Georgia, serif',
              }}
            >
              ✦ 2003 ✦ 2026 ✦
            </span>
          </div>
        </motion.div>

        {/* ===== CORNER FLOURISHES ===== */}
        {['❧', '❧', '❧', '❧'].map((char, i) => {
          const positions = [
            { top: '30px', left: '30px', transform: 'none' },
            { top: '30px', right: '30px', transform: 'scaleX(-1)' },
            { bottom: '30px', left: '30px', transform: 'scaleY(-1)' },
            { bottom: '30px', right: '30px', transform: 'scale(-1, -1)' },
          ];
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                ...positions[i],
                fontSize: '3.5rem',
                color: 'rgba(139, 107, 77, 0.06)',
                fontFamily: 'Georgia, serif',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              {char}
            </div>
          );
        })}

        {/* ===== CONTENT ===== */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* ===== DECORATIVE HEADER ===== */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div
              style={{
                textAlign: 'center',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}
            >
              <span
                style={{
                  flex: 1,
                  height: '2px',
                  maxWidth: '80px',
                  background: 'linear-gradient(90deg, transparent, #8b6b4d, transparent)',
                }}
              />
              <motion.span
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                style={{
                  fontSize: '2.8rem',
                  cursor: 'pointer',
                  display: 'inline-block',
                  filter: 'drop-shadow(0 2px 10px rgba(139, 107, 77, 0.1))',
                }}
              >
                {currentEmoji}
              </motion.span>
              <span
                style={{
                  flex: 1,
                  height: '2px',
                  maxWidth: '80px',
                  background: 'linear-gradient(90deg, transparent, #8b6b4d, transparent)',
                }}
              />
            </div>

            <h1
              style={{
                color: '#4a2c1a',
                fontWeight: 400,
                fontSize: '18px',
                textAlign: 'center',
                marginBottom: '0.3rem',
                letterSpacing: '3px',
                fontFamily: '"Georgia", "Times New Roman", serif',
                textShadow: '1px 1px 3px rgba(255,255,255,0.3)',
              }}
            >
              To the purest of hearts, the most sincere of souls, and the dreamers who dare to believe in the magic of love and the beauty of life.
            </h1>

            <p
              style={{
                color: '#5a3d2b',
                textAlign: 'center',
                fontStyle: 'italic',
                marginBottom: '1.5rem',
                fontSize: '1rem',
                fontWeight: 300,
                fontFamily: '"Georgia", serif',
                opacity: 0.6,
                letterSpacing: '2px',
              }}
            >
              ✧ 2003 — 2026 ✧
            </p>
          </motion.div>

          {/* ===== DIVIDER ===== */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.8rem',
              marginBottom: '1.5rem',
              color: '#8b6b4d',
              opacity: 0.15,
              fontSize: '0.8rem',
            }}
          >
            {['✦', '✦', '✦', '✦', '✦', '✦', '✦', '✦', '✦'].map((s, i) => (
              <motion.span
                key={i}
                animate={{
                  opacity: [0.1, 0.6, 0.1],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {s}
              </motion.span>
            ))}
          </div>

          {/* ===== LETTER CONTENT ===== */}
          <div
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
              lineHeight: 2.4,
              color: '#3d2b1f',
              fontWeight: 300,
              maxHeight: expanded ? 'none' : '380px',
              overflow: 'hidden',
              position: 'relative',
              fontFamily: '"Georgia", "Times New Roman", serif',
              padding: '0 0.5rem',
            }}
          >
            {/* First letter drop cap */}
            {!expanded && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 }}
                style={{
                  float: 'left',
                  fontSize: '5rem',
                  lineHeight: 0.9,
                  color: '#5a3d2b',
                  marginRight: '0.6rem',
                  marginTop: '0.1rem',
                  fontFamily: '"Georgia", serif',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.05)',
                  background: 'linear-gradient(135deg, #5a3d2b, #8b6b4d, #5a3d2b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  border: '1px solid rgba(139, 107, 77, 0.05)',
                  padding: '0.2rem 0.2rem 0 0.2rem',
                  borderRadius: '4px',
                }}
              >
                {letter.charAt(0)}
              </motion.span>
            )}

            <div>
              {parseLetter(!expanded ? letter.slice(1) : letter)}
            </div>

            {!expanded && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '120px',
                  background: 'linear-gradient(transparent, #f5e6d3 70%)',
                  borderRadius: '0 0 14px 14px',
                }}
              />
            )}
          </div>

          {/* ===== READ MORE BUTTON ===== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            style={{ textAlign: 'center', marginTop: '1.5rem' }}
          >
            <motion.button
              onClick={() => setExpanded(!expanded)}
              whileHover={{ 
                scale: 1.05,
                boxShadow: expanded 
                  ? '0 0 40px rgba(139, 107, 77, 0.05)' 
                  : '0 12px 40px rgba(90, 61, 43, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.8rem 3.5rem',
                background: expanded
                  ? 'rgba(139, 107, 77, 0.08)'
                  : 'linear-gradient(135deg, #8b6b4d, #5a3d2b)',
                border: expanded
                  ? '1px solid rgba(139, 107, 77, 0.15)'
                  : 'none',
                borderRadius: '50px',
                color: expanded ? '#5a3d2b' : '#f5e6d3',
                cursor: 'pointer',
                fontFamily: '"Georgia", "Times New Roman", serif',
                fontSize: '1rem',
                letterSpacing: '4px',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: expanded
                  ? 'none'
                  : '0 8px 35px rgba(90, 61, 43, 0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {!expanded && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.05), transparent)',
                    transform: 'rotate(45deg)',
                    animation: 'shimmerBtn 3s infinite',
                  }}
                />
              )}
              {expanded ? '⌛ Chhota karo ↑' : '📜 Pura padho ↓'}
            </motion.button>
          </motion.div>

          {/* ===== SIGNATURE ===== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            style={{
              marginTop: '2rem',
              textAlign: 'right',
              fontFamily: '"Georgia", "Times New Roman", serif',
              color: '#5a3d2b',
              opacity: 0.4,
              fontSize: '0.95rem',
              fontStyle: 'italic',
              borderTop: '1px solid rgba(139, 107, 77, 0.08)',
              paddingTop: '1.2rem',
            }}
          >
            <div style={{ letterSpacing: '4px' }}>— 2003 se 2026 tak,</div>
            <motion.div
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              style={{
                fontSize: '1.4rem',
                fontWeight: '300',
                marginTop: '0.2rem',
                color: '#4a2c1a',
                letterSpacing: '2px',
              }}
            >
              ✧ Bhoomi Bestiiii🫣 ✧
            </motion.div>
            <div style={{ 
              fontSize: '0.7rem', 
              opacity: 0.4, 
              marginTop: '0.3rem',
              letterSpacing: '3px',
            }}>
              ✦ A timeless bond ✦
            </div>
          </motion.div>
        </div>

        <style>{`
          @keyframes shimmerBtn {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(100%) rotate(45deg); }
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
};

export default Message;

