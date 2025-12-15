/**
 * Contribution Heatmap
 * GitHub-style contribution calendar
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { getContributionColor } from '@/lib/utils/theme-colors'
import type { ContributionDay } from '@/lib/types'

interface ContributionHeatmapProps {
  data: ContributionDay[]
  longestStreak: number
}

export function ContributionHeatmap({ data, longestStreak }: ContributionHeatmapProps) {
  // Group by weeks
  const weeks: ContributionDay[][] = []
  let currentWeek: ContributionDay[] = []

  data.forEach((day, index) => {
    currentWeek.push(day)
    if ((index + 1) % 7 === 0) {
      weeks.push([...currentWeek])
      currentWeek = []
    }
  })

  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  // Use theme color utility to resolve CSS variables to actual RGB values
  const getColor = (level: number) => {
    return getContributionColor(level as 0 | 1 | 2 | 3 | 4)
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-0.5 sm:gap-1 overflow-x-auto pb-4">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-0.5 sm:gap-1">
            {week.map((day, dayIndex) => (
              <motion.div
                key={day.date}
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm"
                style={{ backgroundColor: getColor(day.level) }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001, duration: 0.2 }}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-sm font-body text-foreground/70">
          Longest streak: <span className="text-primary font-semibold">{longestStreak} days 🔥</span>
        </p>
      </div>
    </div>
  )
}
