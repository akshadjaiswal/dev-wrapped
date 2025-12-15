/**
 * Slide Container
 * Main container for wrap slides with navigation and accessibility
 */

'use client'

import React, { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useNavigationStore } from '@/lib/store/navigation-store'
import { useSwipeGesture } from '@/lib/hooks'
import { Button } from '@/components/ui/button'
import type { SlideNumber } from '@/lib/types'

interface SlideContainerProps {
  children: React.ReactNode
  totalSlides?: number
}

export function SlideContainer({ children, totalSlides = 14 }: SlideContainerProps) {
  const router = useRouter()
  const {
    currentSlide,
    direction,
    isAutoPlaying,
    nextSlide,
    prevSlide,
    goToSlide,
    toggleAutoPlay,
    setAutoPlay,
  } = useNavigationStore()

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Space
          e.preventDefault()
          nextSlide()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          prevSlide()
          break
        case 'Home':
          e.preventDefault()
          goToSlide(1)
          break
        case 'End':
          e.preventDefault()
          goToSlide(totalSlides as SlideNumber)
          break
        case 'p':
        case 'P':
          e.preventDefault()
          toggleAutoPlay()
          break
        case 'Escape':
          e.preventDefault()
          router.push('/')
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, goToSlide, toggleAutoPlay, totalSlides, router])

  // Swipe gesture support
  useSwipeGesture({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide,
    threshold: 50,
  })

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      if (currentSlide < totalSlides) {
        nextSlide()
      } else {
        setAutoPlay(false)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentSlide, totalSlides, nextSlide, setAutoPlay])

  const slideVariants = {
    enter: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? -1000 : 1000,
      opacity: 0,
    }),
  }

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      role="region"
      aria-label="Slide presentation"
      aria-live="polite"
    >
      {/* Main Slide Content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0"
          role="article"
          aria-label={`Slide ${currentSlide} of ${totalSlides}`}
        >
          {React.Children.toArray(children)[currentSlide - 1]}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <nav
        className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 px-6 z-50"
        aria-label="Slide navigation"
      >
        {/* Previous Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          disabled={currentSlide === 1}
          aria-label="Previous slide"
          aria-keyshortcuts="ArrowLeft"
          className="bg-card/80 backdrop-blur-sm"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Progress Dots */}
        <div
          className="flex gap-1 sm:gap-2"
          role="tablist"
          aria-label="Slide progress"
        >
          {Array.from({ length: totalSlides }, (_, i) => i + 1).map((slide) => (
            <button
              key={slide}
              onClick={() => goToSlide(slide as SlideNumber)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                slide === currentSlide
                  ? 'bg-primary w-6 sm:w-8'
                  : 'bg-foreground/30 hover:bg-foreground/50'
              }`}
              aria-label={`Go to slide ${slide}`}
              aria-current={slide === currentSlide ? 'true' : 'false'}
              role="tab"
            />
          ))}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          disabled={currentSlide === totalSlides}
          aria-label="Next slide"
          aria-keyshortcuts="ArrowRight Space"
          className="bg-card/80 backdrop-blur-sm"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </nav>

      {/* Top Controls */}
      <div className="absolute top-6 right-6 flex items-center gap-2 z-50">
        {/* Auto-play Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleAutoPlay}
          aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
          aria-keyshortcuts="p"
          className="bg-card/80 backdrop-blur-sm"
        >
          {isAutoPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>

        {/* Home Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push('/')}
          aria-label="Go to home page"
          aria-keyshortcuts="Escape"
          className="bg-card/80 backdrop-blur-sm"
        >
          <Home className="h-4 w-4" />
        </Button>
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className="sr-only" role="complementary" aria-label="Keyboard shortcuts">
        <p>Use arrow keys or space to navigate slides</p>
        <p>Press P to play/pause slideshow</p>
        <p>Press Home to go to first slide</p>
        <p>Press End to go to last slide</p>
        <p>Press Escape to return home</p>
      </div>
    </div>
  )
}
