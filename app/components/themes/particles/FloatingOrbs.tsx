/**
 * Floating Orbs Component
 * Warm glowing spheres for Sunset Developer theme
 */

'use client'

import React, { useState, useEffect } from 'react'
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
  const [orbs, setOrbs] = useState<Orb[]>([])

  useEffect(() => {
    const count = 4 // Reduced from 12 for performance (67% reduction)
    const colors = [
      'rgba(255, 107, 53, 0.4)', // primary
      'rgba(247, 147, 30, 0.4)', // secondary
      'rgba(254, 220, 86, 0.4)', // accent
    ]
    const result: Orb[] = []

    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        size: Math.random() * 100 + 80, // Reduced from 150+80 (80-180px now)
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        duration: Math.random() * 15 + 15, // 15-30s
        color: colors[i % colors.length],
      })
    }

    setOrbs(result)
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
            filter: 'blur(40px)', // Reduced from 60px for better GPU performance
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
      {[...Array(3)].map((_, i) => ( {/* Reduced from 8 for performance */}
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
