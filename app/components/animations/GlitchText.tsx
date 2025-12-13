/**
 * Glitch Text Effect
 * Cyberpunk-style text glitch animation
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface GlitchTextProps {
  text: string
  className?: string
  glitchIntensity?: 'low' | 'medium' | 'high'
}

export function GlitchText({ text, className, glitchIntensity = 'medium' }: GlitchTextProps) {
  const [glitchedText, setGlitchedText] = useState(text)

  useEffect(() => {
    const intervals = {
      low: 5000,
      medium: 3000,
      high: 1000,
    }

    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'

    const glitch = () => {
      const chars = text.split('')
      const glitched = chars.map((char) => {
        if (Math.random() < 0.1) {
          return glitchChars[Math.floor(Math.random() * glitchChars.length)]
        }
        return char
      })
      setGlitchedText(glitched.join(''))

      setTimeout(() => setGlitchedText(text), 100)
    }

    const interval = setInterval(glitch, intervals[glitchIntensity])

    return () => clearInterval(interval)
  }, [text, glitchIntensity])

  return (
    <motion.span
      className={className}
      style={{
        textShadow: '0 0 10px rgba(0, 240, 255, 0.8), 0 0 20px rgba(255, 0, 128, 0.6)',
      }}
    >
      {glitchedText}
    </motion.span>
  )
}
