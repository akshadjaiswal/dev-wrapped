/**
 * Slide 3: Code Output
 * Repository statistics
 */

'use client'

import React from 'react'
import { NumberCounter, FadeInUp } from '@/components/animations'
import { Code2 } from 'lucide-react'
import type { SlideProps } from '@/lib/types'

export function Slide03CodeOutput({ data }: SlideProps) {
  return (
    <div className="slide-container">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <FadeInUp>
          <p className="text-2xl md:text-3xl font-body text-foreground">
            You shipped code across
          </p>
        </FadeInUp>

        <div className="flex justify-center">
          <NumberCounter
            value={data.total_repos}
            duration={2}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-header font-bold text-primary"
          />
        </div>

        <FadeInUp delay={1}>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-body text-foreground">
            Repositories
          </p>
        </FadeInUp>

        <FadeInUp delay={1.5}>
          <div className="flex items-center justify-center gap-3">
            <Code2 className="h-8 w-8 text-accent" />
            <p className="text-xl text-foreground/80">
              <span className="text-accent font-semibold">{data.new_repos_2024}</span> were brand new in 2025
            </p>
          </div>
        </FadeInUp>
      </div>
    </div>
  )
}
