/**
 * Wrap Store
 * Manages wrap data and generation state
 */

import { create } from 'zustand'
import type { WrapData } from '@/lib/types'

interface WrapStore {
  // State
  username: string | null
  wrapData: WrapData | null
  isGenerating: boolean
  error: string | null

  // Actions
  setUsername: (username: string) => void
  setWrapData: (data: WrapData | null) => void
  setIsGenerating: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useWrapStore = create<WrapStore>((set) => ({
  // Initial state
  username: null,
  wrapData: null,
  isGenerating: false,
  error: null,

  // Actions
  setUsername: (username) => set({ username, error: null }),

  setWrapData: (data) => set({ wrapData: data, error: null }),

  setIsGenerating: (loading) => set({ isGenerating: loading }),

  setError: (error) => set({ error, isGenerating: false }),

  reset: () =>
    set({
      username: null,
      wrapData: null,
      isGenerating: false,
      error: null,
    }),
}))
