/**
 * Terminal Lines Background
 * Scan lines and CRT effects for Terminal Green theme
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function TerminalLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Horizontal scan lines */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 255, 65, 0.1) 0px, transparent 1px, transparent 2px, rgba(0, 255, 65, 0.1) 3px)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Moving scan line */}
      <motion.div
        className="absolute left-0 right-0 h-1"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0, 255, 65, 0.3), transparent)',
          boxShadow: '0 0 20px rgba(0, 255, 65, 0.6)',
        }}
        animate={{
          y: ['0%', '100vh'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* CRT flicker effect */}
      <motion.div
        className="absolute inset-0 bg-primary/5"
        animate={{
          opacity: [0, 0.1, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: 5,
        }}
      />

      {/* Terminal window frame effect */}
      <div className="absolute inset-0 border-2 border-primary/10 rounded-lg m-4" />

      {/* Phosphor glow overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  )
}
