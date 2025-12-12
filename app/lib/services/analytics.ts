/**
 * Analytics Service
 * Tracks application events for insights
 */

import { createClient } from '@/lib/supabase/client'
import type { AnalyticsEvent, ThemeType } from '@/lib/types'

/**
 * Track an analytics event
 */
export async function trackEvent(
  event: AnalyticsEvent['event'],
  data?: {
    username?: string
    theme?: ThemeType
    metadata?: Record<string, unknown>
  }
): Promise<void> {
  try {
    const supabase = createClient()

    await supabase.from('analytics').insert({
      event,
      username: data?.username || null,
      theme: data?.theme || null,
      metadata: data?.metadata || {},
    })
  } catch (error) {
    // Don't throw errors for analytics failures
    console.error('Failed to track event:', error)
  }
}

/**
 * Track username entered
 */
export function trackUsernameEntered(username: string): void {
  trackEvent('username_entered', { username })
}

/**
 * Track theme selected
 */
export function trackThemeSelected(username: string, theme: ThemeType): void {
  trackEvent('theme_selected', { username, theme })
}

/**
 * Track wrap viewed
 */
export function trackWrapViewed(username: string, theme: ThemeType): void {
  trackEvent('wrap_viewed', { username, theme })
}

/**
 * Track slide viewed
 */
export function trackSlideViewed(
  username: string,
  slideNumber: number,
  theme: ThemeType
): void {
  trackEvent('slide_viewed', {
    username,
    theme,
    metadata: { slideNumber },
  })
}

/**
 * Track share clicked
 */
export function trackShareClicked(
  username: string,
  platform: 'twitter' | 'linkedin' | 'download' | 'link'
): void {
  trackEvent('share_clicked', {
    username,
    metadata: { platform },
  })
}

/**
 * Track generation completed
 */
export function trackGenerationCompleted(
  username: string,
  durationMs: number
): void {
  trackEvent('generation_completed', {
    username,
    metadata: { durationMs },
  })
}

/**
 * Track error occurred
 */
export function trackError(
  error: string,
  context?: {
    username?: string
    metadata?: Record<string, unknown>
  }
): void {
  trackEvent('error_occurred', {
    username: context?.username,
    metadata: {
      error,
      ...context?.metadata,
    },
  })
}
