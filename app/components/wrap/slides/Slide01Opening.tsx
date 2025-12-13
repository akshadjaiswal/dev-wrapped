/**
 * Slide 1: Opening
 * Welcome message
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FadeInUp } from '@/components/animations'
import type { SlideProps } from '@/lib/types'

export function Slide01Opening({ data }: SlideProps) {
  return (
    <div className="slide-container">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <FadeInUp delay={0.2}>
          <h1 className="text-6xl md:text-8xl font-header font-bold text-foreground">
            Hey {data.display_name || data.username} 👋
          </h1>
        </FadeInUp>

        <FadeInUp delay={0.6}>
          <p className="text-3xl md:text-5xl font-body text-primary">
            Let's rewind your 2025...
          </p>
        </FadeInUp>

        <FadeInUp delay={1}>
          <motion.div
            className="text-foreground/60 text-lg"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Swipe or press → to continue
          </motion.div>
        </FadeInUp>
      </div>
    </div>
  )
}
