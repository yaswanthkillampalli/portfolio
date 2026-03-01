"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Faster loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 5; // Faster increment
      });
    }, 20); // Faster interval

    return () => clearInterval(interval);
  }, []);

  const codeLines = [
    "$ initializing portfolio...",
    "$ loading components...",
    "$ compiling shaders...",
    "$ rendering animations...",
    "$ establishing connection...",
    "$ ready.",
  ];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]"
        >
          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}></div>
          </div>

          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>

          <div className="relative z-10 text-center px-6">
            {/* Main loader content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hexagon Logo */}
              <motion.div 
                className="mb-8 flex justify-center"
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
              >
                <svg width="80" height="80" viewBox="0 0 100 100">
                  <motion.polygon
                    points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Terminal-style loading text */}
              <div className="mb-8 font-mono text-left max-w-md mx-auto">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: progress > i * 16 ? 1 : 0.3, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="text-sm text-green-400 mb-1"
                  >
                    <span className="text-blue-400">{'>'}</span> {line}
                  </motion.div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="relative w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto mb-4">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
                {/* Glowing effect */}
                <motion.div
                  className="absolute left-0 top-0 h-full w-20 bg-linear-to-r from-transparent via-white to-transparent opacity-50 blur-sm"
                  initial={{ left: "-20%" }}
                  animate={{ left: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Percentage */}
              <motion.div 
                className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-purple-400 to-pink-400"
                key={progress}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {progress}%
              </motion.div>

              {/* Scanning effect */}
              <motion.div
                className="absolute -bottom-20 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent"
                animate={{ 
                  y: [0, 400, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

