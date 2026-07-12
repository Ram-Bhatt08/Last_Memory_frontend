import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackgroundMusic = ({ songUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageDismissed, setMessageDismissed] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);
  const messageTimeoutRef = useRef(null);

  useEffect(() => {
    if (songUrl) {
      audioRef.current = new Audio(songUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      
      // Set start time to skip first 3 seconds
      audioRef.current.currentTime = 3;

      audioRef.current.addEventListener('canplaythrough', () => {
        setIsLoaded(true);
      });

      audioRef.current.addEventListener('error', (e) => {
        console.log('Audio load error:', e);
      });

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        if (messageTimeoutRef.current) {
          clearTimeout(messageTimeoutRef.current);
        }
      };
    }
  }, [songUrl, volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        // Don't hide message when pausing
      } else {
        // Set current time to 3 seconds before playing
        audioRef.current.currentTime = 3;
        
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            
            // Show the beautiful message
            if (!messageDismissed) {
              setShowMessage(true);
              // Auto-hide after 6 seconds
              if (messageTimeoutRef.current) {
                clearTimeout(messageTimeoutRef.current);
              }
              messageTimeoutRef.current = setTimeout(() => {
                setShowMessage(false);
                setMessageDismissed(true);
              }, 6000);
            }
          })
          .catch(() => {
            // Auto-play blocked, user needs to click
          });
      }
    }
  };

  const dismissMessage = () => {
    setShowMessage(false);
    setMessageDismissed(true);
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
  };

  // Show message on first load if already playing
  useEffect(() => {
    if (isPlaying && !messageDismissed && !showMessage) {
      setShowMessage(true);
      messageTimeoutRef.current = setTimeout(() => {
        setShowMessage(false);
        setMessageDismissed(true);
      }, 6000);
    }
  }, [isPlaying]);

  return (
    <>
      {/* ===== BEAUTIFUL INTRO MESSAGE ===== */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: 'spring', damping: 20 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10000,
              maxWidth: '450px',
              width: '90%',
              padding: '2.5rem 2rem',
              background: 'linear-gradient(145deg, rgba(10, 10, 26, 0.95), rgba(20, 10, 30, 0.95))',
              backdropFilter: 'blur(30px)',
              borderRadius: '24px',
              border: '1px solid rgba(233, 196, 106, 0.15)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(233, 196, 106, 0.03)',
              textAlign: 'center',
            }}
          >
            {/* Decorative glow */}
            <div
              style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle at center, rgba(233, 196, 106, 0.05), transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Floating musical notes */}
            {['🎵', '🎶', '🎵', '🎶', '🎵'].map((note, i) => (
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
                  duration: 3,
                  delay: i * 0.4,
                  repeat: Infinity,
                }}
                style={{
                  position: 'absolute',
                  fontSize: '1.5rem',
                  color: '#e9c46a',
                  pointerEvents: 'none',
                  opacity: 0,
                  top: `${20 + i * 10}%`,
                  left: `${10 + i * 15}%`,
                }}
              >
                {note}
              </motion.div>
            ))}

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Heart emoji */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                style={{
                  fontSize: '3.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                🎵
              </motion.div>

              <h2
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 300,
                  background: 'linear-gradient(135deg, #e9c46a, #f4a261, #e76f51)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradientMove 3s ease-in-out infinite',
                  marginBottom: '0.5rem',
                  fontFamily: '"Georgia", serif',
                }}
              >
                ✧ A Beautiful Song ✧
              </h2>

              <p
                style={{
                  color: '#d4cbc4',
                  fontSize: '1.1rem',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  fontFamily: '"Georgia", serif',
                  marginBottom: '1.5rem',
                }}
              >
                Dedicated to the most beautiful soul I know... 🧡
                <br />
                <span style={{ color: '#888', fontSize: '0.9rem' }}>
                  This melody is just for you, Biharan ✨
                </span>
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={dismissMessage}
                style={{
                  padding: '0.5rem 2.5rem',
                  background: 'rgba(233, 196, 106, 0.1)',
                  border: '1px solid rgba(233, 196, 106, 0.2)',
                  borderRadius: '50px',
                  color: '#e9c46a',
                  cursor: 'pointer',
                  fontFamily: '"Georgia", serif',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease',
                  letterSpacing: '1px',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(233, 196, 106, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(233, 196, 106, 0.1)';
                }}
              >
                ✦ Continue ✦
              </motion.button>
            </div>

            <style>{`
              @keyframes gradientMove {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MUSIC PLAYER BUTTON ===== */}
      <motion.button
        onClick={togglePlay}
        disabled={!isLoaded}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 999,
          padding: '0.8rem 1.5rem',
          background: isPlaying 
            ? 'rgba(233, 196, 106, 0.12)' 
            : 'rgba(255, 255, 255, 0.03)',
          border: `1px solid ${
            isPlaying 
              ? 'rgba(233, 196, 106, 0.2)' 
              : 'rgba(255, 255, 255, 0.06)'
          }`,
          borderRadius: '50px',
          color: isPlaying ? '#e9c46a' : '#666',
          cursor: isLoaded ? 'pointer' : 'default',
          fontFamily: '"Georgia", serif',
          fontSize: '0.85rem',
          backdropFilter: 'blur(15px)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          opacity: isLoaded ? 1 : 0.3,
          boxShadow: isPlaying 
            ? '0 0 30px rgba(233, 196, 106, 0.05)' 
            : 'none',
        }}
      >
        <span style={{ fontSize: '1.1rem' }}>
          {isPlaying ? '🎵' : isLoaded ? '🎧' : '⏳'}
        </span>
        <span>
          {isPlaying 
            ? '✨ Playing' 
            : isLoaded 
              ? 'Play Song 🧡' 
              : 'Loading...'
          }
        </span>
        {isPlaying && (
          <motion.span
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            style={{ fontSize: '0.7rem', color: '#e9c46a' }}
          >
            ●
          </motion.span>
        )}
      </motion.button>
    </>
  );
};

export default BackgroundMusic;

