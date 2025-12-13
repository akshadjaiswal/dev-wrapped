/**
 * Slide 5: Contribution Heatmap
 * Full year heatmap with streak
 */

'use client'

import React from 'react'
import { FadeInUp } from '@/components/animations'
import { ContributionHeatmap } from '@/components/charts'
import type { SlideProps } from '@/lib/types'

export function Slide05ContributionHeatmap({ data }: SlideProps) {
  return (
    <div className="slide-container">
      <div className="max-w-6xl mx-auto space-y-8">
        <FadeInUp>
          <h2 className="text-3xl md:text-5xl font-header font-bold text-center text-foreground">
            Your Coding Year at a Glance
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.5}>
          <ContributionHeatmap
            data={data.contribution_data}
            longestStreak={data.longest_streak}
          />
        </FadeInUp>
      </div>
    </div>
  )
}
