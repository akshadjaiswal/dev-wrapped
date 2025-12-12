/**
 * Progress Bar Component
 * Animated progress indicator
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  progress: number // 0-100
  message?: string
  className?: string
}

export function ProgressBar({ progress, message, className }: ProgressBarProps) {
  return (
    <div className={cn('w-full space-y-3', className)}>
      {message && (
        <p className="text-sm font-body text-foreground/80">{message}</p>
      )}
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-foreground/10">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full glow-primary"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <p className="text-xs font-body text-foreground/60 text-right">
        {Math.round(progress)}%
      </p>
    </div>
  )
}
