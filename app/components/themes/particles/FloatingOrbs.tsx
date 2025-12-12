/**
 * Floating Orbs Component
 * Warm glowing spheres for Sunset Developer theme
 */

'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

interface Orb {
  id: number
  size: number
  x: number
  y: number
  delay: number
  duration: number
  color: string
}

export function FloatingOrbs() {
  const orbs = useMemo(() => {
    const count = 12
    const colors = [
      'rgba(255, 107, 53, 0.4)', // primary
      'rgba(247, 147, 30, 0.4)', // secondary
      'rgba(254, 220, 86, 0.4)', // accent
    ]
    const result: Orb[] = []

    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        size: Math.random() * 150 + 80, // 80-230px
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        duration: Math.random() * 15 + 15, // 15-30s
        color: colors[i % colors.length],
      })
    }

    return result
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
            scale: [1, 1.3, 0.9, 1],
            opacity: [0.4, 0.7, 0.5, 0.4],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Additional light rays */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute h-1 w-32 bg-gradient-to-r from-transparent via-accent/30 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transformOrigin: 'center',
            rotate: `${i * 45}deg`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3,
            delay: i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
