// Wrap Data Types

import { ThemeType } from './theme'
import { LanguageStats } from './github'

export interface WrapData {
  id: string
  created_at: string
  updated_at: string

  // User Info
  username: string
  display_name: string | null
  avatar_url: string
  year: number

  // Core GitHub Stats
  total_commits: number
  total_repos: number
  public_repos: number
  new_repos_2024: number
  total_stars: number
  total_forks: number
  followers: number

  // Language Data
  primary_language: string
  languages: LanguageStats[]

  // Activity Patterns
  most_active_month: string
  longest_streak: number
  coding_time_preference: 'morning' | 'afternoon' | 'evening' | 'night'
  peak_hour: number

  // Top Repository
  top_repo_name: string
  top_repo_commits: number
  top_repo_language: string
  top_repo_stars: number

  // Collaboration
  prs_created: number
  issues_closed: number
  repos_contributed: number

  // Calculated Insights
  commits_per_day: number
  growth_vs_last_year: number | null
  developer_personality: string
  personality_description: string
  personality_traits: string[]

  // Fun Stats
  fix_commits: number
  avg_commit_msg_length: number
  late_night_commits_percent: number
  fastest_commit_day: string | null
  fastest_commit_count: number

  // Metadata
  theme_selected: ThemeType | null
  view_count: number
  share_count: number

  // Contribution Data (for heatmap)
  contribution_data: ContributionDay[]

  // Monthly Activity (for charts)
  monthly_activity: MonthlyActivity[]
}

export interface ContributionDay {
  date: string // YYYY-MM-DD
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface MonthlyActivity {
  month: string // e.g., "Jan", "Feb"
  monthNumber: number // 1-12
  commits: number
}

export interface DeveloperPersonality {
  archetype: string // e.g., "The Craftsperson"
  description: string
  traits: string[]
}

export interface ShareEvent {
  id: string
  created_at: string
  wrap_id: string
  platform: 'twitter' | 'linkedin' | 'download' | 'link'
}

export interface AnalyticsEvent {
  id: string
  created_at: string
  event: 'username_entered' | 'theme_selected' | 'wrap_viewed' | 'slide_viewed' | 'share_clicked' | 'generation_completed' | 'error_occurred'
  username: string | null
  theme: ThemeType | null
  metadata: Record<string, unknown>
}

// Request/Response Types
export interface AnalyzeRequest {
  username: string
  year?: number
}

export interface AnalyzeResponse {
  success: boolean
  data?: WrapData
  error?: string
  cached?: boolean
}

export interface WrapResponse {
  success: boolean
  data?: WrapData
  error?: string
}

export interface ShareRequest {
  wrap_id: string
  platform: 'twitter' | 'linkedin' | 'download' | 'link'
}

export interface ShareResponse {
  success: boolean
  error?: string
}

// Slide-specific types
export type SlideNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14

export interface SlideProps {
  data: WrapData
  theme: ThemeType
}

export interface NavigationState {
  currentSlide: SlideNumber
  totalSlides: number
  isAutoPlaying: boolean
  direction: 'forward' | 'backward'
}
