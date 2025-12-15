/**
 * Monthly Activity Chart
 * Shows commit activity by month
 */

'use client'

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts'
import { motion } from 'framer-motion'
import { getCSSVariable } from '@/lib/utils/theme-colors'
import type { MonthlyActivity as MonthlyActivityData } from '@/lib/types'

interface MonthlyActivityProps {
  data: MonthlyActivityData[]
  mostActiveMonth: string
}

export function MonthlyActivity({ data, mostActiveMonth }: MonthlyActivityProps) {
  // Resolve CSS variables to actual RGB colors for Recharts
  const primaryColor = getCSSVariable('--primary')
  const accentColor = getCSSVariable('--accent')

  return (
    <motion.div
      className="w-full h-64"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="month"
            stroke="currentColor"
            style={{ fontSize: '12px', fontFamily: 'var(--font-body)' }}
            opacity={0.6}
          />
          <YAxis
            stroke="currentColor"
            style={{ fontSize: '12px', fontFamily: 'var(--font-body)' }}
            opacity={0.6}
          />
          <Bar dataKey="commits" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.month === mostActiveMonth.slice(0, 3) ? primaryColor : accentColor}
                opacity={entry.month === mostActiveMonth.slice(0, 3) ? 1 : 0.6}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
