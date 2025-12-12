/**
 * Custom Hook: Swipe Gesture Detection
 * Detects swipe gestures for slide navigation
 */

'use client'

import { useEffect, useRef } from 'react'

interface SwipeGestureOptions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  threshold?: number // Minimum distance for swipe (px)
}

export function useSwipeGesture({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: SwipeGestureOptions) {
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX
    }

    const handleTouchEnd = () => {
      const distance = touchStartX.current - touchEndX.current
      const isSwipe = Math.abs(distance) > threshold

      if (isSwipe) {
        if (distance > 0) {
          // Swiped left
          onSwipeLeft?.()
        } else {
          // Swiped right
          onSwipeRight?.()
        }
      }

      // Reset
      touchStartX.current = 0
      touchEndX.current = 0
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onSwipeLeft, onSwipeRight, threshold])
}
