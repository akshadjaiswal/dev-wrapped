/**
 * Slide 9: Impact Metrics
 * Stars, forks, and followers gained
 */

'use client'

import React from 'react'
import { FadeInUp, NumberCounter } from '@/components/animations'
import { Star, GitFork, Users } from 'lucide-react'
import type { SlideProps } from '@/lib/types'

export function Slide09ImpactMetrics({ data }: SlideProps) {
  return (
    <div className="slide-container">
      <div className="max-w-4xl mx-auto space-y-10">
        <FadeInUp>
          <h2 className="text-3xl md:text-4xl font-body text-center text-foreground">
            Your Impact
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-theme p-8 text-center space-y-4">
              <Star className="h-12 w-12 mx-auto text-accent" />
              <NumberCounter
                value={data.total_stars_earned}
                className="text-5xl font-bold text-primary"
              />
              <p className="text-lg text-foreground/80">stars earned</p>
            </div>

            <div className="card-theme p-8 text-center space-y-4">
              <GitFork className="h-12 w-12 mx-auto text-accent" />
              <NumberCounter
                value={data.total_forks}
                className="text-5xl font-bold text-primary"
              />
              <p className="text-lg text-foreground/80">forks</p>
            </div>

            <div className="card-theme p-8 text-center space-y-4">
              <Users className="h-12 w-12 mx-auto text-accent" />
              <NumberCounter
                value={data.followers_gained}
                className="text-5xl font-bold text-primary"
              />
              <p className="text-lg text-foreground/80">new followers</p>
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.8}>
          <div className="text-center">
            <p className="text-2xl text-foreground/80">
              Your code is making waves
            </p>
          </div>
        </FadeInUp>
      </div>
    </div>
  )
}
