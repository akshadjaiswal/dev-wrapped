/**
 * Slide 4: Language Mastery
 * Language distribution with badge
 */

'use client'

import React from 'react'
import { FadeInUp } from '@/components/animations'
import { LanguageDistribution } from '@/components/charts'
import { getLanguageBadge } from '@/lib/utils/formatters'
import type { SlideProps } from '@/lib/types'

export function Slide04LanguageMastery({ data }: SlideProps) {
  const badge = getLanguageBadge(data.languages.length)

  return (
    <div className="slide-container">
      <div className="max-w-3xl mx-auto space-y-10">
        <FadeInUp>
          <h2 className="text-4xl md:text-6xl font-header font-bold text-center text-foreground">
            Your Tech Stack
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <LanguageDistribution languages={data.languages} maxDisplay={5} />
        </FadeInUp>

        <FadeInUp delay={1.5}>
          <div className="text-center">
            <div className="inline-block px-6 py-3 rounded-full bg-primary/20 border-2 border-primary">
              <span className="text-xl font-header font-bold text-primary">{badge}</span>
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  )
}
