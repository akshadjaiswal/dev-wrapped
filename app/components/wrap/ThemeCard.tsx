/**
 * Theme Card Component
 * Interactive card for theme selection
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { ThemeConfig } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ThemeCardProps {
  theme: ThemeConfig
  isSelected: boolean
  onSelect: () => void
  index: number
}

export function ThemeCard({ theme, isSelected, onSelect, index }: ThemeCardProps) {
  return (
    <motion.button
      onClick={onSelect}
      className={cn(
        'relative w-full rounded-xl overflow-hidden transition-all duration-300',
        'border-2 focus:outline-none focus:ring-2 focus:ring-offset-2',
        isSelected
          ? 'border-primary ring-2 ring-primary scale-105'
          : 'border-transparent hover:border-primary/50 hover:scale-105'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      data-theme={theme.id}
    >
      {/* Background with theme colors */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.cardBg} 100%)`,
        }}
      />

      {/* Particle preview */}
      <div className="absolute inset-0 opacity-30">
        {renderParticlePreview(theme.particleType)}
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 space-y-4">
        {/* Header with selection indicator */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3
              className="text-xl font-header font-bold text-left"
              style={{ color: theme.colors.primary }}
            >
              {theme.name}
            </h3>
            <p className="text-sm font-body text-left opacity-70" style={{ color: theme.colors.text }}>
              {theme.vibe}
            </p>
          </div>

          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="rounded-full p-1"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <Check className="h-5 w-5 text-white" />
            </motion.div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm font-body text-left leading-relaxed" style={{ color: theme.colors.text, opacity: 0.8 }}>
          {theme.description}
        </p>

        {/* Color palette preview */}
        <div className="flex gap-2">
          <div
            className="h-8 w-8 rounded-full border-2 border-white/20"
            style={{ backgroundColor: theme.colors.primary }}
          />
          <div
            className="h-8 w-8 rounded-full border-2 border-white/20"
            style={{ backgroundColor: theme.colors.secondary }}
          />
          <div
            className="h-8 w-8 rounded-full border-2 border-white/20"
            style={{ backgroundColor: theme.colors.accent }}
          />
        </div>

        {/* Font preview */}
        <div className="pt-2 border-t border-white/10">
          <p
            className="text-xs opacity-60"
            style={{
              fontFamily: theme.fonts.header,
              color: theme.colors.text,
            }}
          >
            {theme.fonts.header} • {theme.fonts.body}
          </p>
        </div>
      </div>

      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${theme.colors.primary} 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />
    </motion.button>
  )
}

// Helper function to render minimal particle preview
function renderParticlePreview(type: string) {
  switch (type) {
    case 'neon':
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <polygon
            points="50 10, 90 30, 90 70, 50 90, 10 70, 10 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
      )
    case 'aurora':
      return (
        <div className="flex gap-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-current"
              style={{ marginLeft: `${i * 10}%`, marginTop: `${i * 8}%` }}
            />
          ))}
        </div>
      )
    case 'matrix':
      return (
        <div className="font-mono text-xs opacity-30">
          {'01010101'.split('').map((char, i) => (
            <span key={i} className="inline-block mr-1">
              {char}
            </span>
          ))}
        </div>
      )
    case 'orbs':
      return (
        <div className="absolute inset-0">
          <div
            className="absolute w-16 h-16 rounded-full bg-current opacity-20"
            style={{ top: '20%', left: '30%', filter: 'blur(20px)' }}
          />
        </div>
      )
    case 'geometric':
      return (
        <svg className="w-full h-full opacity-20" viewBox="0 0 100 100">
          <rect x="10" y="10" width="20" height="20" fill="none" stroke="currentColor" />
          <circle cx="70" cy="30" r="8" fill="currentColor" />
          <line x1="20" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    default:
      return null
  }
}
