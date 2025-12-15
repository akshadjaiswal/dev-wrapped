/**
 * Wrap Viewer Page
 * Main page for viewing the DevWrapped presentation
 * Route: /wrap/[username]/[year]
 */

'use client'

import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { SlideContainer } from '@/components/wrap/SlideContainer'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@/components/ui/button'
import { useWrapStore } from '@/lib/store/wrap-store'
import { useThemeStore } from '@/lib/store/theme-store'
import { useNavigationStore } from '@/lib/store/navigation-store'
import { useWrap } from '@/lib/hooks/use-wrap'
import {
  Slide01Opening,
  Slide02BigNumber,
  Slide03CodeOutput,
  Slide04LanguageMastery,
  Slide05ContributionHeatmap,
  Slide06PeakPerformance,
  Slide07TimePatterns,
  Slide08BabyProject,
  Slide09ImpactMetrics,
  Slide10Collaboration,
  Slide11LanguageDeepDive,
  Slide12Personality,
  Slide13FunStats,
  Slide14ShareCard,
} from '@/components/wrap/slides'
import { ThemeBackground } from '@/components/themes/ThemeBackground'
import { Home } from 'lucide-react'

export default function WrapPage() {
  const params = useParams()
  const router = useRouter()
  const username = params.username as string
  const year = parseInt(params.year as string, 10)

  const { selectedTheme: currentTheme } = useThemeStore()
  const wrapData = useWrapStore((state) => state.wrapData)

  // Fetch wrap data
  const { data, isLoading, error } = useWrap(username, year)

  // Reset navigation to slide 1 when wrap page mounts
  useEffect(() => {
    useNavigationStore.getState().reset()
  }, [])

  // Update wrap store when data loads
  useEffect(() => {
    if (data) {
      useWrapStore.setState({ wrapData: data })
    }
  }, [data])

  // Apply theme to document
  useEffect(() => {
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme)
    }
  }, [currentTheme])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6">
          <LoadingSpinner size="lg" />
          <p className="text-foreground/60">Loading your wrap...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-md w-full space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-header font-bold text-foreground">
              Oops!
            </h1>
            <p className="text-foreground/60">
              {error?.message || 'Failed to load wrap data'}
            </p>
          </div>
          <Button onClick={() => router.push('/')} variant="primary">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Theme background */}
      <ThemeBackground theme={currentTheme} />

      {/* Main content */}
      <div className="relative z-10">
        <SlideContainer totalSlides={14}>
          <Slide01Opening data={data} theme={currentTheme} />
          <Slide02BigNumber data={data} theme={currentTheme} />
          <Slide03CodeOutput data={data} theme={currentTheme} />
          <Slide04LanguageMastery data={data} theme={currentTheme} />
          <Slide05ContributionHeatmap data={data} theme={currentTheme} />
          <Slide06PeakPerformance data={data} theme={currentTheme} />
          <Slide07TimePatterns data={data} theme={currentTheme} />
          <Slide08BabyProject data={data} theme={currentTheme} />
          <Slide09ImpactMetrics data={data} theme={currentTheme} />
          <Slide10Collaboration data={data} theme={currentTheme} />
          <Slide11LanguageDeepDive data={data} theme={currentTheme} />
          <Slide12Personality data={data} theme={currentTheme} />
          <Slide13FunStats data={data} theme={currentTheme} />
          <Slide14ShareCard data={data} theme={currentTheme} />
        </SlideContainer>
      </div>

      {/* Home button */}
      <div className="fixed top-6 left-6 z-50">
        <Button
          onClick={() => router.push('/')}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          <span className="hidden md:inline">Home</span>
        </Button>
      </div>
    </div>
  )
}
