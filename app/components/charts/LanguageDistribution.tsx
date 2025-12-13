/**
 * Language Distribution Chart
 * Shows language usage with animated bars
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { LanguageStats } from '@/lib/types'

interface LanguageDistributionProps {
  languages: LanguageStats[]
  maxDisplay?: number
}

export function LanguageDistribution({ languages, maxDisplay = 5 }: LanguageDistributionProps) {
  const topLanguages = languages.slice(0, maxDisplay)

  return (
    <div className="w-full space-y-4">
      {topLanguages.map((lang, index) => (
        <motion.div
          key={lang.name}
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <div className="flex justify-between items-center">
            <span className="font-body text-sm text-foreground">{lang.name}</span>
            <span className="font-body text-sm text-foreground/70">
              {lang.percentage.toFixed(1)}%
            </span>
          </div>
          <div className="relative h-3 bg-foreground/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ backgroundColor: lang.color }}
              initial={{ width: 0 }}
              animate={{ width: `${lang.percentage}%` }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
