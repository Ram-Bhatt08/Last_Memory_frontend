import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Hero = ({ name, onEnter, photoUrl }) => {
  const [showBtn, setShowBtn] = useState(true);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient glow */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle at 50% 50%, rgba(244, 162, 97, 0.05), transparent 60%)',
          animation: 'rotateGlow 30s linear infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Floating particles background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: 'rgba(233, 196, 106, 0.3)',
            }}
          />
        ))}
      </div>

      {/* Photo Frame with Glow */}
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{
          delay: 0.2,
          type: 'spring',
          stiffness: 120,
          damping: 15,
          duration: 0.8,
        }}
        style={{
          position: 'relative',
          width: '180px',
          height: '180px',
          marginBottom: '2rem',
          borderRadius: '50%',
          padding: '6px',
          background: 'linear-gradient(135deg, #e9c46a, #f4a261, #e76f51, #f4a261, #e9c46a)',
          backgroundSize: '300% 300%',
          animation: 'gradientMove 4s ease-in-out infinite',
          boxShadow: '0 0 60px rgba(244, 162, 97, 0.2), 0 0 120px rgba(244, 162, 97, 0.05)',
        }}
      >
        {/* Inner glow ring */}
        <div
          style={{
            position: 'absolute',
            top: '-4px',
            left: '-4px',
            right: '-4px',
            bottom: '-4px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Photo */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid rgba(15, 14, 26, 0.8)',
            position: 'relative',
          }}
        >
          <img
            src={photoUrl}
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
          />

          {/* Photo overlay glow on hover */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '50%',
              background: 'radial-gradient(circle at center, transparent 50%, rgba(15,14,26,0.2) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Decorative dots around photo */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: i % 2 === 0 ? '#e9c46a' : '#f4a261',
              transform: `rotate(${i * 45}deg) translateX(-90px)`,
              boxShadow: '0 0 20px rgba(233, 196, 106, 0.2)',
            }}
          />
        ))}

        {/* Crown emoji on top */}
        <motion.div
          initial={{ y: -50, opacity: 0, scale: 0 }}
          animate={{ y: -20, opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          style={{
            position: 'absolute',
            top: '-25px',
            right: '-10px',
            fontSize: '2.5rem',
            filter: 'drop-shadow(0 4px 15px rgba(233, 196, 106, 0.3))',
          }}
        >
          👑
        </motion.div>

        {/* Sparkle effects around photo */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5,
          }}
          style={{
            position: 'absolute',
            top: '10px',
            left: '-15px',
            fontSize: '1.2rem',
          }}
        >
          ✨
        </motion.div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 1,
          }}
          style={{
            position: 'absolute',
            bottom: '15px',
            right: '-15px',
            fontSize: '1.2rem',
          }}
        >
          ✨
        </motion.div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1.5,
          }}
          style={{
            position: 'absolute',
            top: '30%',
            right: '-20px',
            fontSize: '0.8rem',
          }}
        >
          ✦
        </motion.div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: 0.8,
          }}
          style={{
            position: 'absolute',
            bottom: '35%',
            left: '-20px',
            fontSize: '0.8rem',
          }}
        >
          ✦
        </motion.div>
      </motion.div>

      {/* 🎉 Emoji with animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring' }}
        style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}
      >
        🎉
      </motion.div>

      {/* Title with glow */}
      <motion.h1
        style={{
          fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
          fontWeight: 700,
          color: '#e9c46a',
          letterSpacing: '3px',
          marginBottom: '0.3rem',
          textShadow: '0 0 40px rgba(233, 196, 106, 0.15), 0 0 80px rgba(233, 196, 106, 0.05)',
        }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        Happy Birthday
      </motion.h1>

      {/* Name with special styling */}
      <motion.h2
        style={{
          fontSize: 'clamp(2.2rem, 5vw, 4rem)',
          fontWeight: 300,
          background: 'linear-gradient(135deg, #e9c46a, #f4a261, #e76f51)',
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
          animation: 'gradientMove 3s ease-in-out infinite',
          letterSpacing: '2px',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {name}
      </motion.h2>

      {/* Subtitle with typing effect */}
      <motion.p
        style={{
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          color: '#aaa',
          maxWidth: '500px',
          fontWeight: 300,
          letterSpacing: '2px',
          borderRight: '2px solid rgba(233, 196, 106, 0.3)',
          paddingRight: '0.5rem',
          display: 'inline-block',
        }}
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 'auto' }}
        transition={{ delay: 1, duration: 1 }}
      >
        Meri pyari biharan 🧡
      </motion.p>

      {/* Decorative divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          width: '100px',
          height: '2px',
          margin: '1.5rem 0',
          background: 'linear-gradient(90deg, transparent, #e9c46a, transparent)',
        }}
      />

      {/* Enter Button */}
      {showBtn && (
        <motion.button
          onClick={() => {
            setShowBtn(false);
            setTimeout(onEnter, 300);
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          whileHover={{
            scale: 1.05,
            background: 'linear-gradient(135deg, #f4a261, #e76f51)',
            color: '#0f0e1a',
            boxShadow: '0 0 50px rgba(244, 162, 97, 0.3)',
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: '0.5rem',
            padding: '1rem 3.5rem',
            background: 'rgba(244, 162, 97, 0.12)',
            border: '2px solid #f4a261',
            borderRadius: '50px',
            color: '#f4a261',
            fontSize: '1.1rem',
            cursor: 'pointer',
            fontFamily: 'inherit',
            letterSpacing: '3px',
            transition: 'all 0.4s ease',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Button shimmer effect */}
          <span
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.03), transparent)',
              transform: 'rotate(45deg)',
              animation: 'shimmer 3s infinite',
            }}
          />
          ✦ Padh lo ✦
        </motion.button>
      )}

      <style>{`
        @keyframes rotateGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
      `}</style>
    </motion.section>
  );
};

export default Hero;
