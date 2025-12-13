/**
 * Matrix Rain Component
 * Falling characters for Terminal Green theme
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface RainColumn {
  id: number
  x: number
  characters: string[]
  delay: number
  duration: number
}

const MATRIX_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'

export function MatrixRain() {
  const [columns, setColumns] = useState<RainColumn[]>([])

  useEffect(() => {
    const count = 30
    const result: RainColumn[] = []

    for (let i = 0; i < count; i++) {
      const charCount = Math.floor(Math.random() * 10) + 5
      const characters = Array.from({ length: charCount }, () =>
        MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length))
      )

      result.push({
        id: i,
        x: (i / count) * 100,
        characters,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + 10, // 10-15s
      })
    }

    setColumns(result)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none font-mono">
      {columns.map((column) => (
        <motion.div
          key={column.id}
          className="absolute top-0 flex flex-col text-primary"
          style={{
            left: `${column.x}%`,
            fontSize: '16px',
            textShadow: '0 0 8px rgba(0, 255, 65, 0.8)',
          }}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{
            y: '100vh',
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: column.duration,
            delay: column.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {column.characters.map((char, idx) => (
            <motion.span
              key={idx}
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                repeat: Infinity,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </div>
  )
}
