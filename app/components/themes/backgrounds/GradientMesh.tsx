/**
 * Gradient Mesh Background
 * Morphing gradient mesh for Sunset Developer theme
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient mesh */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <motion.radialGradient
            id="sunsetGradient1"
            animate={{
              cx: ['30%', '40%', '30%'],
              cy: ['30%', '50%', '30%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <stop offset="0%" stopColor="rgba(255, 107, 53, 0.6)" />
            <stop offset="100%" stopColor="transparent" />
          </motion.radialGradient>

          <motion.radialGradient
            id="sunsetGradient2"
            animate={{
              cx: ['70%', '60%', '70%'],
              cy: ['70%', '50%', '70%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <stop offset="0%" stopColor="rgba(254, 220, 86, 0.4)" />
            <stop offset="100%" stopColor="transparent" />
          </motion.radialGradient>

          <motion.radialGradient
            id="sunsetGradient3"
            animate={{
              cx: ['50%', '45%', '50%'],
              cy: ['50%', '60%', '50%'],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <stop offset="0%" stopColor="rgba(247, 147, 30, 0.5)" />
            <stop offset="100%" stopColor="transparent" />
          </motion.radialGradient>

          <filter id="blur">
            <feGaussianBlur stdDeviation="50" /> {/* Reduced from 80 for better GPU performance */}
          </filter>
        </defs>

        <rect width="100%" height="100%" fill="url(#sunsetGradient1)" filter="url(#blur)" />
        <rect width="100%" height="100%" fill="url(#sunsetGradient2)" filter="url(#blur)" />
        <rect width="100%" height="100%" fill="url(#sunsetGradient3)" filter="url(#blur)" />
      </svg>

      {/* Subtle light rays */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(254, 220, 86, 0.1) 45deg, transparent 90deg, rgba(255, 107, 53, 0.1) 135deg, transparent 180deg, rgba(247, 147, 30, 0.1) 225deg, transparent 270deg, rgba(254, 220, 86, 0.1) 315deg, transparent 360deg)',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}
