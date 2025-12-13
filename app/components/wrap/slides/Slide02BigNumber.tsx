/**
 * Slide 2: Big Number
 * Total commits with details
 */

'use client'

import React from 'react'
import { NumberCounter, FadeInUp } from '@/components/animations'
import type { SlideProps } from '@/lib/types'

export function Slide02BigNumber({ data }: SlideProps) {
  return (
    <div className="slide-container">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <NumberCounter
          value={data.total_commits}
          duration={2.5}
          className="text-9xl md:text-[12rem] font-header font-bold text-primary text-glow-primary"
        />

        <FadeInUp delay={1}>
          <p className="text-3xl md:text-5xl font-body text-foreground">
            Commits in 2025
          </p>
        </FadeInUp>

        <FadeInUp delay={1.5}>
          <div className="space-y-2">
            <p className="text-xl text-foreground/80">
              That's <span className="text-primary font-semibold">{data.commits_per_day}</span> commits every day
            </p>
            {data.growth_vs_last_year && (
              <p className="text-lg text-foreground/60">
                {data.growth_vs_last_year > 0 ? '📈' : '📉'}{' '}
                {Math.abs(data.growth_vs_last_year)}% {data.growth_vs_last_year > 0 ? 'more' : 'less'} than last year
              </p>
            )}
          </div>
        </FadeInUp>
      </div>
    </div>
  )
}
