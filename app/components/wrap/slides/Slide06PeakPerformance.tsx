/**
 * Slide 6: Peak Performance
 * Most active month with chart
 */

'use client'

import React from 'react'
import { FadeInUp } from '@/components/animations'
import { MonthlyActivity } from '@/components/charts'
import type { SlideProps } from '@/lib/types'

export function Slide06PeakPerformance({ data }: SlideProps) {
  const mostActiveMonthData = data.monthly_activity.find(
    (m) => m.month === data.most_active_month.slice(0, 3)
  )
  const commitsInPeak = mostActiveMonthData?.commits || 0

  return (
    <div className="slide-container">
      <div className="max-w-4xl mx-auto space-y-10">
        <FadeInUp>
          <div className="text-center space-y-4">
            <p className="text-2xl text-foreground/80">Most Productive:</p>
            <h2 className="text-6xl md:text-8xl font-header font-bold text-primary text-glow-primary">
              {data.most_active_month}
            </h2>
            <p className="text-3xl text-foreground">
              {commitsInPeak} commits that month
            </p>
            <p className="text-xl text-accent">You were unstoppable 🚀</p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.8}>
          <MonthlyActivity
            data={data.monthly_activity}
            mostActiveMonth={data.most_active_month}
          />
        </FadeInUp>
      </div>
    </div>
  )
}
