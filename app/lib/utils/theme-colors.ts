/**
 * Theme Color Utilities
 * Resolves CSS custom properties to actual RGB values for use in charts
 */

'use client'

/**
 * Get RGB color value from CSS custom property
 * @param cssVar - CSS variable name (e.g., '--primary')
 * @param opacity - Optional opacity value (0-1)
 * @returns RGB color string (e.g., 'rgb(0, 240, 255)' or 'rgba(0, 240, 255, 0.5)')
 */
export function getCSSVariable(cssVar: string, opacity?: number): string {
  if (typeof window === 'undefined') {
    // SSR fallback - return a default color
    return opacity !== undefined ? `rgba(0, 240, 255, ${opacity})` : 'rgb(0, 240, 255)'
  }

  const root = document.documentElement
  const value = getComputedStyle(root).getPropertyValue(cssVar).trim()

  if (!value) {
    // Fallback if variable not found
    console.warn(`CSS variable ${cssVar} not found, using fallback`)
    return opacity !== undefined ? `rgba(0, 240, 255, ${opacity})` : 'rgb(0, 240, 255)'
  }

  // Value should be in format "r g b" (e.g., "0 240 255")
  const [r, g, b] = value.split(' ').map((v) => v.trim())

  if (opacity !== undefined) {
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  return `rgb(${r}, ${g}, ${b})`
}

/**
 * Get theme colors for charts
 * @returns Object with primary and accent colors
 */
export function getThemeColors() {
  return {
    primary: getCSSVariable('--primary'),
    primaryWithOpacity: (opacity: number) => getCSSVariable('--primary', opacity),
    accent: getCSSVariable('--accent'),
    accentWithOpacity: (opacity: number) => getCSSVariable('--accent', opacity),
    foreground: getCSSVariable('--foreground'),
    foregroundWithOpacity: (opacity: number) => getCSSVariable('--foreground', opacity),
  }
}

/**
 * Get contribution heatmap colors based on level
 * @param level - Contribution level (0-4)
 * @returns RGB color string
 */
export function getContributionColor(level: 0 | 1 | 2 | 3 | 4): string {
  const colors = {
    0: getCSSVariable('--foreground', 0.05),
    1: getCSSVariable('--accent', 0.3),
    2: getCSSVariable('--accent', 0.5),
    3: getCSSVariable('--primary', 0.7),
    4: getCSSVariable('--primary', 1),
  }

  return colors[level] || colors[0]
}
