/**
 * Background Components Index
 * Central export for all background components
 */

'use client'

import { NeonGrid } from './NeonGrid'
import { CosmicNebula } from './CosmicNebula'
import { TerminalLines } from './TerminalLines'
import { GradientMesh } from './GradientMesh'
import { BrutalistPattern } from './BrutalistPattern'
import type { ThemeType } from '@/lib/types'

interface BackgroundSystemProps {
  theme: ThemeType
}

export function BackgroundSystem({ theme }: BackgroundSystemProps) {
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

export {
  NeonGrid,
  CosmicNebula,
  TerminalLines,
  GradientMesh,
  BrutalistPattern,
}
