/**
 * Geometric Shapes Component
 * Sharp lines and dots for Monochrome Elite theme
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Shape {
  id: number
  type: 'line' | 'dot' | 'square'
  size: number
  x: number
  y: number
  rotation: number
  delay: number
}

export function GeometricShapes() {
  const [shapes, setShapes] = useState<Shape[]>([])

  useEffect(() => {
    const count = 25
    const result: Shape[] = []

    for (let i = 0; i < count; i++) {
      const types: Array<'line' | 'dot' | 'square'> = ['line', 'dot', 'square']
      result.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        size: Math.random() * 60 + 20,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        delay: Math.random() * 2,
      })
    }

    setShapes(result)
  }, [])

  const renderShape = (shape: Shape) => {
    switch (shape.type) {
      case 'dot':
        return (
          <div
            className="rounded-full bg-foreground"
            style={{
              width: shape.size / 3,
              height: shape.size / 3,
            }}
          />
        )
      case 'line':
        return (
          <div
            className="bg-foreground"
            style={{
              width: shape.size,
              height: 2,
              rotate: `${shape.rotation}deg`,
            }}
          />
        )
      case 'square':
        return (
          <div
            className="border-2 border-foreground"
            style={{
              width: shape.size / 2,
              height: shape.size / 2,
              rotate: `${shape.rotation}deg`,
            }}
          />
        )
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.15, 0.1, 0],
            scale: [0, 1, 1.2, 0],
            rotate: [shape.rotation, shape.rotation + 180, shape.rotation + 360],
          }}
          transition={{
            duration: 8,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {renderShape(shape)}
        </motion.div>
      ))}

      {/* Grid lines overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}
