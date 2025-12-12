/**
 * Particle Systems Index
 * Central export for all particle components
 */

'use client'

import { NeonParticles } from './NeonParticles'
import { AuroraParticles } from './AuroraParticles'
import { MatrixRain } from './MatrixRain'
import { FloatingOrbs } from './FloatingOrbs'
import { GeometricShapes } from './GeometricShapes'
import type { ThemeType } from '@/lib/types'

interface ParticleSystemProps {
  theme: ThemeType
}

export function ParticleSystem({ theme }: ParticleSystemProps) {
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

export {
  NeonParticles,
  AuroraParticles,
  MatrixRain,
  FloatingOrbs,
  GeometricShapes,
}
