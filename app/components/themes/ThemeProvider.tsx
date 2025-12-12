/**
 * Theme Provider Component
 * Applies theme to the entire app
 */

'use client'

import React, { useEffect } from 'react'
import { useThemeStore } from '@/lib/store/theme-store'
import { ParticleSystem } from './particles'
import { BackgroundSystem } from './backgrounds'
import type { ThemeType } from '@/lib/types'

interface ThemeProviderProps {
  children: React.ReactNode
  theme?: ThemeType
  showParticles?: boolean
  showBackground?: boolean
}

export function ThemeProvider({
  children,
  theme,
  showParticles = true,
  showBackground = true,
}: ThemeProviderProps) {
  const { selectedTheme, applyTheme } = useThemeStore()
  const activeTheme = theme || selectedTheme

  useEffect(() => {
    applyTheme(activeTheme)
  }, [activeTheme, applyTheme])

  return (
    <div className="relative min-h-screen w-full">
      {showBackground && <BackgroundSystem theme={activeTheme} />}
      {showParticles && <ParticleSystem theme={activeTheme} />}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
