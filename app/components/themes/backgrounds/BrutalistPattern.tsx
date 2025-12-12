/**
 * Brutalist Pattern Background
 * Bold geometric patterns for Monochrome Elite theme
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function BrutalistPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Diagonal stripes */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diagonalStripes" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="10" height="20" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalStripes)" />
      </svg>

      {/* Large geometric shapes */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 border-4 border-foreground/5"
        style={{ transformOrigin: 'top right' }}
        animate={{
          rotate: [0, 90, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 bg-foreground/3"
        style={{ transformOrigin: 'bottom left', clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-3" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="brutalistGrid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#brutalistGrid)" />
      </svg>

      {/* Red accent elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-32 bg-red-500/20"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/3 w-32 h-2 bg-red-500/20"
        animate={{
          x: [0, 20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
