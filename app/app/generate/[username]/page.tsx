/**
 * Theme Selection Page
 * User picks their theme and generates wrap
 */

'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { ThemeProvider } from '@/components/themes/ThemeProvider'
import { ThemeCard } from '@/components/wrap/ThemeCard'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { Button } from '@/components/ui/button'
import { useWrapGeneration } from '@/lib/hooks'
import { useThemeStore } from '@/lib/store/theme-store'
import { useWrapStore } from '@/lib/store/wrap-store'
import { THEME_CONFIGS } from '@/lib/types/theme'
import { trackThemeSelected } from '@/lib/services/analytics'
import type { ThemeType } from '@/lib/types'

export default function ThemeSelectionPage() {
  const router = useRouter()
  const params = useParams()
  const username = params.username as string

  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('neon-dreams')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)

  const { setTheme } = useThemeStore()
  const { setWrapData, setUsername } = useWrapStore()

  // Fetch wrap data
  const { data: wrapData, isLoading, error } = useWrapGeneration(username)

  useEffect(() => {
    if (username) {
      setUsername(username)
    }
  }, [username, setUsername])

  // Simulate progress for better UX
  useEffect(() => {
    if (isLoading && progress < 90) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + Math.random() * 10, 90))
      }, 500)
      return () => clearInterval(interval)
    }
    if (wrapData) {
      setProgress(100)
    }
  }, [isLoading, wrapData, progress])

  const handleThemeSelect = (theme: ThemeType) => {
    setSelectedTheme(theme)
    setTheme(theme)
  }

  const handleGenerate = () => {
    if (!wrapData) return

    setIsGenerating(true)
    trackThemeSelected(username, selectedTheme)
    setWrapData(wrapData)

    // Navigate to wrap viewer
    setTimeout(() => {
      router.push(`/wrap/${username}/2025?theme=${selectedTheme}`)
    }, 500)
  }

  const handleBack = () => {
    router.push('/')
  }

  // Error state
  if (error) {
    return (
      <ThemeProvider theme="neon-dreams">
        <div className="min-h-screen flex items-center justify-center p-6">
          <motion.div
            className="max-w-md w-full card-theme p-8 text-center space-y-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl">😅</div>
            <h2 className="text-2xl font-header font-bold text-foreground">
              Oops! Something went wrong
            </h2>
            <p className="font-body text-foreground/70">
              {error instanceof Error ? error.message : 'Failed to fetch GitHub data'}
            </p>
            <Button onClick={handleBack} variant="primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </motion.div>
        </div>
      </ThemeProvider>
    )
  }

  // Loading state
  if (isLoading || !wrapData) {
    return (
      <ThemeProvider theme="neon-dreams">
        <div className="min-h-screen flex items-center justify-center p-6">
          <motion.div
            className="max-w-md w-full space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center space-y-4">
              <LoadingSpinner size="lg" />
              <h2 className="text-2xl font-header font-bold text-foreground">
                Analyzing {username}'s GitHub...
              </h2>
              <p className="font-body text-foreground/70">
                Fetching repos, commits, and calculating stats
              </p>
            </div>
            <ProgressBar progress={progress} />
          </motion.div>
        </div>
      </ThemeProvider>
    )
  }

  const themes = Object.values(THEME_CONFIGS)

  return (
    <ThemeProvider theme={selectedTheme} showParticles showBackground>
      <main className="min-h-screen flex flex-col p-6">
        {/* Header */}
        <motion.header
          className="max-w-6xl w-full mx-auto flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="text-center">
            <h1 className="text-2xl font-header font-bold text-foreground">
              Pick Your Vibe
            </h1>
            <p className="text-sm font-body text-foreground/60">
              for @{username}
            </p>
          </div>

          <div className="w-20" /> {/* Spacer for centering */}
        </motion.header>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-6xl w-full space-y-8">
            {/* Theme Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.map((theme, index) => (
                <ThemeCard
                  key={theme.id}
                  theme={theme}
                  isSelected={selectedTheme === theme.id}
                  onSelect={() => handleThemeSelect(theme.id)}
                  index={index}
                />
              ))}
            </div>

            {/* Generate Button */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-12 gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>Generate My Wrap →</>
                )}
              </Button>
            </motion.div>

            {/* Stats Preview */}
            <motion.div
              className="text-center space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="font-body text-foreground/60 text-sm">
                {wrapData.total_commits.toLocaleString()} commits •{' '}
                {wrapData.total_repos} repos •{' '}
                {wrapData.primary_language}
              </p>
              <p className="font-body text-foreground/40 text-xs">
                Data fetched from GitHub • Cached for 24 hours
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}
