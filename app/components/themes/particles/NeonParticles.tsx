/**
 * Neon Particles Component
 * Floating hexagons with neon glow for Neon Dreams theme
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  size: number
  x: number
  y: number
  delay: number
  duration: number
}

export function NeonParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  // Generate particles only on client to avoid hydration mismatch
  useEffect(() => {
    const count = 7 // Reduced from 20 for performance (65% reduction)
    const result: Particle[] = []

    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        size: Math.random() * 30 + 30, // Reduced from 60+30 (30-60px now)
        x: Math.random() * 100, // 0-100%
        y: Math.random() * 100, // 0-100%
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15, // 15-25s
      })
    }

    setParticles(result)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            // Simplified from 5 to 3 keyframes for performance
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            y: [0, -200, -400],
            x: [0, 20, -20],
            rotate: [0, 360, 720],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Hexagon SVG */}
          <svg
            width={particle.size}
            height={particle.size}
            viewBox="0 0 100 100"
            className="drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]"
          >
            <polygon
              points="50 5, 95 27.5, 95 72.5, 50 95, 5 72.5, 5 27.5"
              fill="none"
              stroke="url(#neonGradient)"
              strokeWidth="2"
              opacity="0.8"
            />
            <defs>
              <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="50%" stopColor="#FF0080" />
                <stop offset="100%" stopColor="#7000FF" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
