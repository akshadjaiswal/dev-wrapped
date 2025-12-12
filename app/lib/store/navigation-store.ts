/**
 * Navigation Store
 * Manages slide navigation state
 */

import { create } from 'zustand'
import type { SlideNumber } from '@/lib/types'

interface NavigationStore {
  // State
  currentSlide: SlideNumber
  totalSlides: number
  isAutoPlaying: boolean
  direction: 'forward' | 'backward'

  // Actions
  nextSlide: () => void
  prevSlide: () => void
  goToSlide: (slide: SlideNumber) => void
  toggleAutoPlay: () => void
  setAutoPlay: (isPlaying: boolean) => void
  reset: () => void
}

export const useNavigationStore = create<NavigationStore>((set, get) => ({
  // Initial state
  currentSlide: 1,
  totalSlides: 14,
  isAutoPlaying: false,
  direction: 'forward',

  // Actions
  nextSlide: () => {
    const { currentSlide, totalSlides } = get()
    if (currentSlide < totalSlides) {
      set({
        currentSlide: (currentSlide + 1) as SlideNumber,
        direction: 'forward',
      })
    }
  },

  prevSlide: () => {
    const { currentSlide } = get()
    if (currentSlide > 1) {
      set({
        currentSlide: (currentSlide - 1) as SlideNumber,
        direction: 'backward',
      })
    }
  },

  goToSlide: (slide) => {
    const { currentSlide } = get()
    set({
      currentSlide: slide,
      direction: slide > currentSlide ? 'forward' : 'backward',
    })
  },

  toggleAutoPlay: () => {
    set((state) => ({ isAutoPlaying: !state.isAutoPlaying }))
  },

  setAutoPlay: (isPlaying) => {
    set({ isAutoPlaying: isPlaying })
  },

  reset: () =>
    set({
      currentSlide: 1,
      isAutoPlaying: false,
      direction: 'forward',
    }),
}))
