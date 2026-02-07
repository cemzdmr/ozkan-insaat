'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Hide splash after animation
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
        >
          {/* Construction Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(250, 204, 21, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(250, 204, 21, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Animated Construction Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: -20,
                opacity: 0.6,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                y: window.innerHeight + 20,
                opacity: [0.6, 1, 0.6, 0],
                rotate: Math.random() * 360
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-2 h-2 bg-yellow-400"
              style={{
                clipPath: i % 3 === 0 ? 'polygon(50% 0%, 100% 100%, 0% 100%)' : 
                          i % 3 === 1 ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' :
                          'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
              }}
            />
          ))}

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Container with Construction Effect */}
            <div className="relative">
              {/* Building Frame Effect */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute -inset-2.5 border-4 border-yellow-400 origin-bottom"
                style={{ transform: 'translateZ(0)' }}
              />
              
              {/* Logo Reveal with Clip Path */}
              <motion.div
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotateY: [0, 5, 0, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                >
                  <Image
                    src="/ozkaninsaat-logo.png"
                    alt="Özkan İnşaat"
                    width={300}
                    height={300}
                    className="w-40 h-40 md:w-64 md:h-64 object-contain drop-shadow-2xl brightness-0 invert"
                    priority
                  />
                </motion.div>
              </motion.div>

              {/* Corner Construction Indicators */}
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                className="absolute -top-6 -left-6 w-8 h-8 border-t-4 border-l-4 border-yellow-400"
              />
              <motion.div
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
                className="absolute -top-6 -right-6 w-8 h-8 border-t-4 border-r-4 border-yellow-400"
              />
              <motion.div
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.7, duration: 0.6, type: "spring" }}
                className="absolute -bottom-6 -left-6 w-8 h-8 border-b-4 border-l-4 border-yellow-400"
              />
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
                className="absolute -bottom-6 -right-6 w-8 h-8 border-b-4 border-r-4 border-yellow-400"
              />
            </div>

            {/* Progress Bar with Blueprint Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8 }}
              className="mt-10 w-64 md:w-80"
            >
              <div className="relative">
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 relative"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                    />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mt-3 text-center text-yellow-400 text-xs md:text-sm font-mono"
                >
                  Building Your Experience... {progress}%
                </motion.div>
              </div>
            </motion.div>

            {/* Blueprint Corner Decorations */}
            <div className="absolute top-8 left-8 text-yellow-400/20 text-6xl font-bold">⌜</div>
            <div className="absolute top-8 right-8 text-yellow-400/20 text-6xl font-bold">⌝</div>
            <div className="absolute bottom-8 left-8 text-yellow-400/20 text-6xl font-bold">⌞</div>
            <div className="absolute bottom-8 right-8 text-yellow-400/20 text-6xl font-bold">⌟</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
