/**
 * Cosmic Nebula Background
 * Swirling gradient clouds for Aurora Code theme
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function CosmicNebula() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main nebula clouds */}
      <motion.div
        className="absolute -inset-1/2"
        style={{
          background: 'radial-gradient(ellipse at 30% 40%, rgba(123, 44, 191, 0.4) 0%, transparent 50%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute -inset-1/2"
        style={{
          background: 'radial-gradient(ellipse at 70% 60%, rgba(0, 245, 255, 0.3) 0%, transparent 50%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute -inset-1/2"
        style={{
          background: 'radial-gradient(ellipse at 50% 80%, rgba(255, 0, 110, 0.2) 0%, transparent 50%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -100, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(10, 14, 39, 0.5) 100%)',
        }}
      />
    </div>
  )
}
