/**
 * Wrap Viewer Page
 * Main page for viewing the DevWrapped presentation
 * Route: /wrap/[username]/[year]
 */

'use client'

import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useParams, useRouter } from 'next/navigation'
import { SlideContainer } from '@/components/wrap/SlideContainer'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@/components/ui/button'
import { useWrapStore } from '@/lib/store/wrap-store'
import { useThemeStore } from '@/lib/store/theme-store'
import { useWrap } from '@/lib/hooks/use-wrap'
import { ThemeBackground } from '@/components/themes/ThemeBackground'
import { Home } from 'lucide-react'

const slideLoader = () => <div className="slide-container" />

const Slide01Opening = dynamic(() => import('@/components/wrap/slides/Slide01Opening').then(m => m.Slide01Opening), { loading: slideLoader })
const Slide02BigNumber = dynamic(() => import('@/components/wrap/slides/Slide02BigNumber').then(m => m.Slide02BigNumber), { loading: slideLoader })
const Slide03CodeOutput = dynamic(() => import('@/components/wrap/slides/Slide03CodeOutput').then(m => m.Slide03CodeOutput), { loading: slideLoader })
const Slide04LanguageMastery = dynamic(() => import('@/components/wrap/slides/Slide04LanguageMastery').then(m => m.Slide04LanguageMastery), { loading: slideLoader, ssr: false })
const Slide05ContributionHeatmap = dynamic(() => import('@/components/wrap/slides/Slide05ContributionHeatmap').then(m => m.Slide05ContributionHeatmap), { loading: slideLoader, ssr: false })
const Slide06PeakPerformance = dynamic(() => import('@/components/wrap/slides/Slide06PeakPerformance').then(m => m.Slide06PeakPerformance), { loading: slideLoader })
const Slide07TimePatterns = dynamic(() => import('@/components/wrap/slides/Slide07TimePatterns').then(m => m.Slide07TimePatterns), { loading: slideLoader, ssr: false })
const Slide08BabyProject = dynamic(() => import('@/components/wrap/slides/Slide08BabyProject').then(m => m.Slide08BabyProject), { loading: slideLoader })
const Slide09ImpactMetrics = dynamic(() => import('@/components/wrap/slides/Slide09ImpactMetrics').then(m => m.Slide09ImpactMetrics), { loading: slideLoader })
const Slide10Collaboration = dynamic(() => import('@/components/wrap/slides/Slide10Collaboration').then(m => m.Slide10Collaboration), { loading: slideLoader })
const Slide11LanguageDeepDive = dynamic(() => import('@/components/wrap/slides/Slide11LanguageDeepDive').then(m => m.Slide11LanguageDeepDive), { loading: slideLoader, ssr: false })
const Slide12Personality = dynamic(() => import('@/components/wrap/slides/Slide12Personality').then(m => m.Slide12Personality), { loading: slideLoader })
const Slide13FunStats = dynamic(() => import('@/components/wrap/slides/Slide13FunStats').then(m => m.Slide13FunStats), { loading: slideLoader })
const Slide14ShareCard = dynamic(() => import('@/components/wrap/slides/Slide14ShareCard').then(m => m.Slide14ShareCard), { loading: slideLoader })

export default function WrapPage() {
  const params = useParams()
  const router = useRouter()
  const username = params.username as string
  const year = parseInt(params.year as string, 10)

  const { selectedTheme: currentTheme } = useThemeStore()
  const wrapData = useWrapStore((state) => state.wrapData)

  // Fetch wrap data
  const { data, isLoading, error } = useWrap(username, year)

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
