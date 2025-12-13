/**
 * Theme Background Component
 * Dynamically renders the appropriate background and particles for each theme
 */

'use client'

import React from 'react'
import type { ThemeType } from '@/lib/types'

// Import background components
import { NeonGrid } from './backgrounds/NeonGrid'
import { CosmicNebula } from './backgrounds/CosmicNebula'
import { TerminalLines } from './backgrounds/TerminalLines'
import { GradientMesh } from './backgrounds/GradientMesh'
import { BrutalistPattern } from './backgrounds/BrutalistPattern'

// Import particle components
import { NeonParticles } from './particles/NeonParticles'
import { AuroraParticles } from './particles/AuroraParticles'
import { MatrixRain } from './particles/MatrixRain'
import { FloatingOrbs } from './particles/FloatingOrbs'
import { GeometricShapes } from './particles/GeometricShapes'

interface ThemeBackgroundProps {
  theme: ThemeType
}

export function ThemeBackground({ theme }: ThemeBackgroundProps) {
  // Render background based on theme
  const renderBackground = () => {
    switch (theme) {
      case 'neon-dreams':
        return <NeonGrid />
      case 'aurora-code':
        return <CosmicNebula />
      case 'terminal-green':
        return <TerminalLines />
      case 'sunset-developer':
        return <GradientMesh />
      case 'monochrome-elite':
        return <BrutalistPattern />
      default:
        return <NeonGrid />
    }
  }

  // Render particles based on theme
  const renderParticles = () => {
    switch (theme) {
      case 'neon-dreams':
        return <NeonParticles />
      case 'aurora-code':
        return <AuroraParticles />
      case 'terminal-green':
        return <MatrixRain />
      case 'sunset-developer':
        return <FloatingOrbs />
      case 'monochrome-elite':
        return <GeometricShapes />
      default:
        return <NeonParticles />
    }
  }

  return (
    <>
      {renderBackground()}
      {renderParticles()}
    </>
  )
}
