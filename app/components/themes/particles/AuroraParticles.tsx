/**
 * Aurora Particles Component
 * Twinkling stars with glow for Aurora Code theme
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Star {
  id: number
  size: number
  x: number
  y: number
  delay: number
  duration: number
}

export function AuroraParticles() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const count = 50
    const result: Star[] = []

    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        size: Math.random() * 4 + 2, // 2-6px
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 1.5, // 1.5-3.5s
      })
    }

    setStars(result)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-gradient-to-r from-secondary via-accent to-primary"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            boxShadow: `0 0 ${star.size * 4}px ${star.size}px rgba(0, 245, 255, 0.6)`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Larger glowing orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            background: 'radial-gradient(circle, rgba(123, 44, 191, 0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
