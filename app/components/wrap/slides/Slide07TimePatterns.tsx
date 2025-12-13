/**
 * Slide 7: Time Patterns
 * Coding time visualization
 */

'use client'

import React from 'react'
import { FadeInUp } from '@/components/animations'
import { TimePattern } from '@/components/charts'
import { getTimeOfDayLabel } from '@/lib/utils/formatters'
import type { SlideProps } from '@/lib/types'

export function Slide07TimePatterns({ data }: SlideProps) {
  const label = getTimeOfDayLabel(data.coding_time_preference)

  return (
    <div className="slide-container">
      <div className="max-w-4xl mx-auto space-y-10">
        <FadeInUp>
          <h2 className="text-3xl md:text-4xl font-body text-center text-foreground">
            You code most at
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <TimePattern
            peakHour={data.peak_hour}
            codingTimePreference={data.coding_time_preference}
          />
        </FadeInUp>

        <FadeInUp delay={0.8}>
          <div className="text-center">
            <div className="inline-block px-8 py-4 rounded-2xl bg-primary/20 border-2 border-primary">
              <p className="text-3xl font-header font-bold text-primary">{label}</p>
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  )
}
