/**
 * Slide 8: Baby Project
 * Most committed repository
 */

'use client'

import React from 'react'
import { FadeInUp, NumberCounter } from '@/components/animations'
import { Heart, Star, Code } from 'lucide-react'
import type { SlideProps } from '@/lib/types'

export function Slide08BabyProject({ data }: SlideProps) {
  return (
    <div className="slide-container">
      <div className="max-w-4xl mx-auto space-y-10">
        <FadeInUp>
          <h2 className="text-3xl md:text-4xl font-body text-center text-foreground">
            Most Committed:
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <div className="card-theme p-10 space-y-6 text-center">
            <h3 className="text-4xl md:text-6xl font-header font-bold text-primary break-all">
              {data.top_repo_name}
            </h3>

            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Code className="h-8 w-8 mx-auto text-accent" />
                <NumberCounter
                  value={data.top_repo_commits}
                  className="text-3xl font-bold text-foreground"
                />
                <p className="text-sm text-foreground/60">commits</p>
              </div>

              <div className="space-y-2">
                <div className="h-8 w-8 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-sm font-bold">{data.top_repo_language.slice(0, 2)}</span>
                </div>
                <p className="text-lg font-semibold text-foreground">{data.top_repo_language}</p>
                <p className="text-sm text-foreground/60">powered</p>
              </div>

              <div className="space-y-2">
                <Star className="h-8 w-8 mx-auto text-accent" />
                <NumberCounter
                  value={data.top_repo_stars}
                  className="text-3xl font-bold text-foreground"
                />
                <p className="text-sm text-foreground/60">stars</p>
              </div>
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.8}>
          <div className="text-center">
            <p className="text-2xl text-foreground/80 flex items-center justify-center gap-3">
              This one had your heart <Heart className="h-6 w-6 text-red-500 fill-red-500" />
            </p>
          </div>
        </FadeInUp>
      </div>
    </div>
  )
}
