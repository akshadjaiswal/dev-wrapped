/**
 * Loading Spinner Component
 * Theme-aware loading indicator
 */

'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
  className?: string
}

export function LoadingSpinner({
  size = 'md',
  message,
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div className="relative">
        <div
          className={cn(
            'animate-spin rounded-full border-4 border-foreground/20',
            sizeClasses[size]
          )}
        />
        <div
          className={cn(
            'absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary',
            sizeClasses[size],
            'glow-primary'
          )}
        />
      </div>
      {message && (
        <p className="text-lg font-body text-foreground/80 animate-pulse">
          {message}
        </p>
      )}
    </div>
  )
}
