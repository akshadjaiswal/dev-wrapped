/**
 * Neon Particles Component
 * Floating hexagons with neon glow for Neon Dreams theme
 */

'use client'

import React, { useMemo } from 'react'
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
  const particles = useMemo(() => {
    const count = 20
    const result: Particle[] = []

    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        size: Math.random() * 60 + 30, // 30-90px
        x: Math.random() * 100, // 0-100%
        y: Math.random() * 100, // 0-100%
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15, // 15-25s
      })
    }

    return result
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
            opacity: [0, 0.6, 0.4, 0.6, 0],
            scale: [0, 1, 1, 1, 0],
            y: [0, -100, -200, -300, -400],
            x: [0, 30, -20, 40, -30],
            rotate: [0, 180, 360, 540, 720],
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
