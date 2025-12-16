/**
 * Slide 9: Impact Metrics
 * Repositories created, total commits, and languages used in the year
 */

'use client'

import React from 'react'
import { FadeInUp, NumberCounter } from '@/components/animations'
import { FolderGit, GitCommit, Code2 } from 'lucide-react'
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
              <FolderGit className="h-12 w-12 mx-auto text-accent" />
              <NumberCounter
                value={data.repos_created_in_year || 0}
                className="text-5xl font-bold text-primary"
              />
              <p className="text-lg text-foreground/80">repositories created</p>
            </div>

            <div className="card-theme p-8 text-center space-y-4">
              <GitCommit className="h-12 w-12 mx-auto text-accent" />
              <NumberCounter
                value={data.total_commits}
                className="text-5xl font-bold text-primary"
              />
              <p className="text-lg text-foreground/80">commits made</p>
            </div>

            <div className="card-theme p-8 text-center space-y-4">
              <Code2 className="h-12 w-12 mx-auto text-accent" />
              <NumberCounter
                value={data.languages.length}
                className="text-5xl font-bold text-primary"
              />
              <p className="text-lg text-foreground/80">languages used</p>
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
