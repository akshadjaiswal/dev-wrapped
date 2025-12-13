/**
 * Slide 10: Collaboration
 * PRs, issues, and collaboration metrics
 */

'use client'

import React from 'react'
import { FadeInUp, NumberCounter } from '@/components/animations'
import { GitPullRequest, MessageSquare, Award } from 'lucide-react'
import { getContributionBadge } from '@/lib/utils/formatters'
import type { SlideProps } from '@/lib/types'

export function Slide10Collaboration({ data }: SlideProps) {
  const badge = getContributionBadge(
    data.total_prs,
    data.total_issues,
    data.total_commits
  )

  return (
    <div className="slide-container">
      <div className="max-w-4xl mx-auto space-y-10">
        <FadeInUp>
          <h2 className="text-3xl md:text-4xl font-body text-center text-foreground">
            Team Player
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-theme p-8 space-y-4">
              <div className="flex items-center gap-4">
                <GitPullRequest className="h-10 w-10 text-accent" />
                <div>
                  <NumberCounter
                    value={data.total_prs}
                    className="text-4xl font-bold text-foreground"
                  />
                  <p className="text-sm text-foreground/60">pull requests</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Merged</span>
                  <span className="text-foreground">{data.merged_prs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Reviewed</span>
                  <span className="text-foreground">{data.prs_reviewed}</span>
                </div>
              </div>
            </div>

            <div className="card-theme p-8 space-y-4">
              <div className="flex items-center gap-4">
                <MessageSquare className="h-10 w-10 text-accent" />
                <div>
                  <NumberCounter
                    value={data.total_issues}
                    className="text-4xl font-bold text-foreground"
                  />
                  <p className="text-sm text-foreground/60">issues engaged</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Opened</span>
                  <span className="text-foreground">{data.issues_opened}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Closed</span>
                  <span className="text-foreground">{data.issues_closed}</span>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.8}>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-primary/20 border-2 border-primary">
              <Award className="h-6 w-6 text-primary" />
              <span className="text-xl font-header font-bold text-primary">{badge}</span>
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  )
}
