// Theme Types

export type ThemeType =
  | 'neon-dreams'
  | 'aurora-code'
  | 'terminal-green'
  | 'sunset-developer'
  | 'monochrome-elite'

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  cardBg?: string
  border?: string
}

export interface ThemeConfig {
  id: ThemeType
  name: string
  description: string
  vibe: string
  colors: ThemeColors
  fonts: {
    header: string
    body: string
  }
  particleType: 'neon' | 'aurora' | 'matrix' | 'orbs' | 'geometric'
  backgroundType: 'grid' | 'nebula' | 'terminal' | 'gradient-mesh' | 'brutalist'
}

export const THEME_CONFIGS: Record<ThemeType, ThemeConfig> = {
  'neon-dreams': {
    id: 'neon-dreams',
    name: 'Neon Dreams',
    description: 'Cyberpunk developer, late-night coder energy',
    vibe: '🌃 Cyberpunk',
    colors: {
      primary: '#00F0FF',
      secondary: '#FF0080',
      accent: '#7000FF',
      background: '#0A0014',
      text: '#FFFFFF',
      cardBg: '#1A0A2E',
      border: '#00F0FF40',
    },
    fonts: {
      header: 'Orbitron',
      body: 'Space Mono',
    },
    particleType: 'neon',
    backgroundType: 'grid',
  },
  'aurora-code': {
    id: 'aurora-code',
    name: 'Aurora Code',
    description: 'Cosmic explorer, infinite possibilities',
    vibe: '🌌 Cosmic',
    colors: {
      primary: '#7B2CBF',
      secondary: '#00F5FF',
      accent: '#FF006E',
      background: '#0A0E27',
      text: '#E0AAFF',
      cardBg: '#240046',
      border: '#7B2CBF40',
    },
    fonts: {
      header: 'Outfit',
      body: 'JetBrains Mono',
    },
    particleType: 'aurora',
    backgroundType: 'nebula',
  },
  'terminal-green': {
    id: 'terminal-green',
    name: 'Terminal Green',
    description: 'Classic hacker, old-school terminal aesthetic',
    vibe: '💚 Hacker',
    colors: {
      primary: '#00FF41',
      secondary: '#39FF14',
      accent: '#CCFF00',
      background: '#000000',
      text: '#00FF41',
      cardBg: '#0A0A0A',
      border: '#00FF4140',
    },
    fonts: {
      header: 'IBM Plex Mono',
      body: 'IBM Plex Mono',
    },
    particleType: 'matrix',
    backgroundType: 'terminal',
  },
  'sunset-developer': {
    id: 'sunset-developer',
    name: 'Sunset Developer',
    description: 'Warm, optimistic, balanced coder',
    vibe: '🌅 Optimistic',
    colors: {
      primary: '#FF6B35',
      secondary: '#F7931E',
      accent: '#FEDC56',
      background: '#2D1B69',
      text: '#FEFAE0',
      cardBg: '#4A3480',
      border: '#FF6B3540',
    },
    fonts: {
      header: 'DM Sans',
      body: 'Inter',
    },
    particleType: 'orbs',
    backgroundType: 'gradient-mesh',
  },
  'monochrome-elite': {
    id: 'monochrome-elite',
    name: 'Monochrome Elite',
    description: 'Minimalist professional, clean and bold',
    vibe: '⚫⚪ Minimalist',
    colors: {
      primary: '#000000',
      secondary: '#FFFFFF',
      accent: '#808080',
      background: '#F5F5F5',
      text: '#000000',
      cardBg: '#FFFFFF',
      border: '#00000020',
    },
    fonts: {
      header: 'Helvetica Neue',
      body: 'SF Mono',
    },
    particleType: 'geometric',
    backgroundType: 'brutalist',
  },
}
