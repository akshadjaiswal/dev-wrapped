/**
 * Formatting utilities for displaying data
 */

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B'
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

/**
 * Format number with commas
 */
export function formatNumberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Format percentage
 */
export function formatPercentage(num: number, decimals: number = 1): string {
  return num.toFixed(decimals) + '%'
}

/**
 * Format date to readable format
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format date to short format
 */
export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Get time of day label
 */
export function getTimeOfDayLabel(
  preference: 'morning' | 'afternoon' | 'evening' | 'night'
): string {
  const labels = {
    morning: 'Early Bird 🐦',
    afternoon: 'Day Warrior ☀️',
    evening: 'Evening Coder 🌆',
    night: 'Night Owl 🦉',
  }
  return labels[preference]
}

/**
 * Get time range for preference
 */
export function getTimeRange(preference: 'morning' | 'afternoon' | 'evening' | 'night'): string {
  const ranges = {
    morning: '5am - 12pm',
    afternoon: '12pm - 5pm',
    evening: '5pm - 11pm',
    night: '11pm - 5am',
  }
  return ranges[preference]
}

/**
 * Get contribution badge based on overall activity
 */
export function getContributionBadge(prs: number, issues: number, commits: number): string {
  const total = prs + issues
  if (total === 0) return 'Solo Builder'
  if (total < 10) return 'Team Player'
  if (total < 50) return 'Active Contributor'
  if (total < 100) return 'Community Champion'
  return 'Open Source Hero'
}

/**
 * Get collaboration badge (legacy support)
 */
export function getCollaborationBadge(prs: number, issues: number): string {
  return getContributionBadge(prs, issues, 0)
}

/**
 * Get language proficiency badge
 */
export function getLanguageBadge(languageCount: number): string {
  if (languageCount === 1) return 'Specialist'
  if (languageCount === 2) return 'Dual Expert'
  if (languageCount <= 4) return 'Full Stack'
  return 'Polyglot'
}

/**
 * Get developer profile type based on language distribution
 */
export function getDeveloperProfileType(languages: Array<{ name: string; percentage: number }>): string {
  if (!languages || languages.length === 0) return 'Code Explorer'

  const primaryLanguage = languages[0].name
  const frontendLanguages = ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Vue', 'React', 'Svelte']
  const backendLanguages = ['Python', 'Java', 'Go', 'Ruby', 'PHP', 'C#', 'Rust', 'Elixir']
  const dataLanguages = ['Python', 'R', 'Julia', 'MATLAB']
  const mobileLanguages = ['Swift', 'Kotlin', 'Dart', 'Objective-C']

  // Check if polyglot (3+ languages with significant usage)
  const significantLanguages = languages.filter(l => l.percentage > 15)
  if (significantLanguages.length >= 3) return 'Polyglot Engineer'

  if (frontendLanguages.includes(primaryLanguage)) return 'Frontend Artist'
  if (backendLanguages.includes(primaryLanguage)) return 'Backend Architect'
  if (dataLanguages.includes(primaryLanguage)) return 'Data Scientist'
  if (mobileLanguages.includes(primaryLanguage)) return 'Mobile Developer'
  return 'Full Stack Wizard'
}

/**
 * Format hour to 12-hour time
 */
export function formatHour(hour: number): string {
  if (hour === 0) return '12 AM'
  if (hour < 12) return `${hour} AM`
  if (hour === 12) return '12 PM'
  return `${hour - 12} PM`
}

/**
 * Pluralize word
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) return `${count} ${singular}`
  return `${count} ${plural || singular + 's'}`
}

/**
 * Get ordinal suffix (1st, 2nd, 3rd, etc.)
 */
export function getOrdinal(num: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = num % 100
  return num + (s[(v - 20) % 10] || s[v] || s[0])
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 3) + '...'
}

/**
 * Generate share text for social media
 */
export function generateShareText(
  username: string,
  stats: { stat1: string; stat2: string; stat3: string }
): {
  twitter: string
  linkedin: string
} {
  const twitter = `My 2024 developer journey 🚀

- ${stats.stat1}
- ${stats.stat2}
- ${stats.stat3}

See yours at DevWrapped.com

#DevWrapped #DevWrapped2024`

  const linkedin = `Reflecting on my 2024 developer journey:

${stats.stat1}
${stats.stat2}
${stats.stat3}

It's been a year of growth and learning. What were your coding highlights this year?

Create yours: DevWrapped.com`

  return { twitter, linkedin }
}
