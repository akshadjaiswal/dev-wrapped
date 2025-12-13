/**
 * Time Pattern Chart
 * Radial visualization of coding hours
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface TimePatternProps {
  peakHour: number
  codingTimePreference: 'morning' | 'afternoon' | 'evening' | 'night'
}

export function TimePattern({ peakHour, codingTimePreference }: TimePatternProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const getIntensity = (hour: number) => {
    const distance = Math.min(
      Math.abs(hour - peakHour),
      24 - Math.abs(hour - peakHour)
    )
    return Math.max(0.1, 1 - distance / 12)
  }

  const getLabelForHour = (hour: number) => {
    if (hour === 0) return '12 AM'
    if (hour < 12) return `${hour} AM`
    if (hour === 12) return '12 PM'
    return `${hour - 12} PM`
  }

  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Clock circle */}
      <svg className="w-full h-full" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.2"
        />

        {/* Hour markers */}
        {hours.map((hour) => {
          const angle = (hour / 24) * 360 - 90
          const intensity = getIntensity(hour)
          const radius = 70
          const x = 100 + radius * Math.cos((angle * Math.PI) / 180)
          const y = 100 + radius * Math.sin((angle * Math.PI) / 180)

          return (
            <motion.circle
              key={hour}
              cx={x}
              cy={y}
              r={hour === peakHour ? 8 : 4}
              fill="rgb(var(--primary))"
              opacity={intensity}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: hour * 0.02, duration: 0.3 }}
            />
          )
        })}

        {/* Peak hour indicator */}
        {[0, 6, 12, 18].map((hour) => {
          const angle = (hour / 24) * 360 - 90
          const labelRadius = 95
          const x = 100 + labelRadius * Math.cos((angle * Math.PI) / 180)
          const y = 100 + labelRadius * Math.sin((angle * Math.PI) / 180)

          return (
            <text
              key={hour}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-body"
              fill="currentColor"
              opacity="0.6"
            >
              {getLabelForHour(hour)}
            </text>
          )
        })}
      </svg>

      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-header font-bold text-primary">
            {getLabelForHour(peakHour)}
          </p>
          <p className="text-xs font-body text-foreground/60">Peak Hour</p>
        </div>
      </div>
    </div>
  )
}
