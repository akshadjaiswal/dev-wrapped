/**
 * Theme Store
 * Manages theme selection and configuration
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ThemeType, ThemeConfig } from '@/lib/types'
import { THEME_CONFIGS } from '@/lib/types/theme'

interface ThemeStore {
  // State
  selectedTheme: ThemeType
  availableThemes: ThemeConfig[]

  // Actions
  setTheme: (theme: ThemeType) => void
  getThemeConfig: (theme: ThemeType) => ThemeConfig
  applyTheme: (theme: ThemeType) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      // Initial state
      selectedTheme: 'neon-dreams',
      availableThemes: Object.values(THEME_CONFIGS),

      // Actions
      setTheme: (theme) => {
        set({ selectedTheme: theme })
        get().applyTheme(theme)
      },

      getThemeConfig: (theme) => {
        return THEME_CONFIGS[theme] || THEME_CONFIGS['neon-dreams']
      },

      applyTheme: (theme) => {
        // Apply theme to document
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', theme)
        }
      },
    }),
    {
      name: 'devwrapped-theme',
    }
  )
)
