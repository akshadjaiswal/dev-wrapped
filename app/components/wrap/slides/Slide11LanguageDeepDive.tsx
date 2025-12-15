/**
 * Slide 11: Language Deep Dive
 * Top 3 languages with developer profile type
 */

'use client'

import React from 'react'
import { FadeInUp } from '@/components/animations'
import { getDeveloperProfileType } from '@/lib/utils/formatters'
import type { SlideProps } from '@/lib/types'

export function Slide11LanguageDeepDive({ data }: SlideProps) {
  const topLanguages = data.languages.slice(0, 3)
  const profileType = getDeveloperProfileType(data.languages)

  return (
    <div className="slide-container">
      <div className="max-w-4xl mx-auto space-y-10">
        <FadeInUp>
          <h2 className="text-3xl md:text-4xl font-body text-center text-foreground">
            Your Language DNA
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <div className="space-y-6">
            {topLanguages.map((lang, index) => (
              <div
                key={lang.name}
                className="card-theme p-6 flex items-center gap-6"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary/30">
                  {index + 1}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-header font-bold text-foreground">
                      {lang.name}
                    </h3>
                    <span className="text-xl font-bold text-primary">
                      {lang.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-3 bg-background/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                      style={{
                        width: `${lang.percentage}%`,
                        transitionDelay: `${index * 200}ms`,
                      }}
                    />
                  </div>
                  <p className="text-sm text-foreground/60">
                    {lang.bytes.toLocaleString()} bytes written
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeInUp>

        <FadeInUp delay={1.2}>
          <div className="text-center">
            <p className="text-lg text-foreground/60 mb-3">Developer Profile</p>
            <div className="inline-block px-8 py-4 rounded-2xl bg-accent/20 border-2 border-accent">
              <p className="text-2xl font-header font-bold text-accent">{profileType}</p>
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  )
}
