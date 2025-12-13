/**
 * Contribution Heatmap
 * GitHub-style contribution calendar
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
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

  const getColor = (level: number) => {
    const colors = {
      0: 'rgb(var(--foreground) / 0.05)',
      1: 'rgb(var(--accent) / 0.3)',
      2: 'rgb(var(--accent) / 0.5)',
      3: 'rgb(var(--primary) / 0.7)',
      4: 'rgb(var(--primary) / 1)',
    }
    return colors[level as keyof typeof colors] || colors[0]
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-1 overflow-x-auto pb-4">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <motion.div
                key={day.date}
                className="w-3 h-3 rounded-sm"
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
