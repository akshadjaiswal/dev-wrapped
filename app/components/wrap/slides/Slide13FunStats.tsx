/**
 * Slide 13: Fun Stats
 * Entertaining statistics and comparisons
 */

'use client'

import React from 'react'
import { FadeInUp, NumberCounter } from '@/components/animations'
import { Coffee, Zap, Calendar, TrendingUp } from 'lucide-react'
import type { SlideProps } from '@/lib/types'

export function Slide13FunStats({ data }: SlideProps) {
  // Calculate fun metrics
  const coffeeEquivalent = Math.round(data.total_commits / 3) // ~3 commits per coffee
  const averageCommitsPerDay = Math.round(data.total_commits / 365)
  const productivePercentage = Math.round(
    (data.days_active / 365) * 100
  )

  return (
    <div className="slide-container">
      <div className="max-w-5xl mx-auto space-y-10">
        <FadeInUp>
          <h2 className="text-3xl md:text-4xl font-body text-center text-foreground">
            Just for Fun
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            <div className="card-theme p-4 md:p-6 flex items-center gap-4">
              <Coffee className="h-10 w-10 md:h-12 md:w-12 text-accent flex-shrink-0" />
              <div>
                <NumberCounter
                  value={coffeeEquivalent}
                  className="text-xl md:text-3xl font-bold text-foreground"
                />
                <p className="text-sm text-foreground/60">
                  cups of coffee worth of code
                </p>
              </div>
            </div>

            <div className="card-theme p-4 md:p-6 flex items-center gap-4">
              <Zap className="h-10 w-10 md:h-12 md:w-12 text-accent flex-shrink-0" />
              <div>
                <NumberCounter
                  value={averageCommitsPerDay}
                  className="text-xl md:text-3xl font-bold text-foreground"
                />
                <p className="text-sm text-foreground/60">
                  commits per day on average
                </p>
              </div>
            </div>

            <div className="card-theme p-4 md:p-6 flex items-center gap-4">
              <Calendar className="h-10 w-10 md:h-12 md:w-12 text-accent flex-shrink-0" />
              <div>
                <NumberCounter
                  value={data.days_active}
                  className="text-xl md:text-3xl font-bold text-foreground"
                />
                <p className="text-sm text-foreground/60">
                  days you shipped code
                </p>
              </div>
            </div>

            <div className="card-theme p-4 md:p-6 flex items-center gap-4">
              <TrendingUp className="h-10 w-10 md:h-12 md:w-12 text-accent flex-shrink-0" />
              <div>
                <NumberCounter
                  value={productivePercentage}
                  className="text-xl md:text-3xl font-bold text-foreground"
                />
                <p className="text-sm text-foreground/60">
                  of the year you were productive
                </p>
              </div>
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.8}>
          <div className="card-theme p-6 md:p-8 text-center space-y-4">
            <p className="text-lg md:text-2xl text-foreground">
              If coding were an Olympic sport...
            </p>
            <p className="text-2xl md:text-4xl font-header font-bold text-primary">
              {data.longest_streak >= 30
                ? "You'd take home the gold 🥇"
                : data.longest_streak >= 14
                ? "You'd be on the podium 🥈"
                : "You'd make your country proud 🎖️"}
            </p>
          </div>
        </FadeInUp>
      </div>
    </div>
  )
}
