/**
 * Neon Grid Background
 * Animated perspective grid for Neon Dreams theme
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function NeonGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Perspective grid */}
      <div className="absolute inset-0" style={{ perspective: '1000px' }}>
        <motion.div
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(60deg)',
          }}
          animate={{
            z: [0, -200, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Horizontal lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px"
              style={{
                top: `${i * 5}%`,
                background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.3) 50%, transparent)',
                boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
              }}
            />
          ))}

          {/* Vertical lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px"
              style={{
                left: `${i * 5}%`,
                background: 'linear-gradient(180deg, transparent, rgba(255, 0, 128, 0.3) 50%, transparent)',
                boxShadow: '0 0 10px rgba(255, 0, 128, 0.5)',
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Scan lines overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '100% 4px',
        }}
        animate={{
          y: ['0%', '100%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}
