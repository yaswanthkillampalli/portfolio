"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Reduced from 50 to 20 for better performance
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ willChange: 'auto' }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-500/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: 'translateZ(0)',
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20" style={{ willChange: 'auto' }}>
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          transform: 'translateZ(0)',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Diagonal lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 100px,
            rgba(139, 92, 246, 0.05) 100px,
            rgba(139, 92, 246, 0.05) 101px
          )`,
          transform: 'translateZ(0)',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '141px 141px'],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export function CodeRain() {
  const characters = "01</>{}[];:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const columns = 15; // Reduced from 30 for better performance

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      {Array.from({ length: columns }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs text-green-400"
          style={{ left: `${(i / columns) * 100}%` }}
          animate={{
            y: ["0vh", "100vh"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear",
          }}
        >
          {Array.from({ length: 30 }, () =>
            characters.charAt(Math.floor(Math.random() * characters.length))
          ).join('\n')}
        </motion.div>
      ))}
    </div>
  );
}

export function GlowOrbs() {
  return (
    <div style={{ willChange: 'auto' }}>
      <motion.div
        className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"
        style={{ top: '10%', left: '10%', transform: 'translateZ(0)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"
        style={{ top: '50%', right: '10%', transform: 'translateZ(0)' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-[120px]"
        style={{ bottom: '10%', left: '30%', transform: 'translateZ(0)' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}

export function FloatingCode() {
  const codeSnippets = [
    "const dev = <FullStack />",
    "npm install future",
    "while(alive) { learn(); }",
    "import { success } from 'hardwork'",
  ]; // Reduced for performance

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codeSnippets.map((code, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-sm text-blue-400/10"
          style={{
            left: `${(i * 15) % 90}%`,
            top: `${(i * 20) % 80}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.05, 0.15, 0.05],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          {code}
        </motion.div>
      ))}
    </div>
  );
}
