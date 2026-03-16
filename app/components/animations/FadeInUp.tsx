/**
 * Fade In Up Animation
 * Common entrance animation
 */

'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface FadeInUpProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeInUp({ children, delay = 0, duration = 0.6, className }: FadeInUpProps) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0.15 : duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
