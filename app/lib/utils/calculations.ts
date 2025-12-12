/**
 * Data Calculation Engine
 * Processes raw GitHub data into meaningful statistics and insights
 */

import type {
  GitHubEvent,
  GitHubRepo,
  ProcessedGitHubData,
  ContributionDay,
  MonthlyActivity,
  WrapData,
} from '@/lib/types'
import { format, parseISO, getMonth, getHours, differenceInDays } from 'date-fns'

/**
 * Calculate total commits from events and repos
 */
export function calculateTotalCommits(events: GitHubEvent[]): number {
  let commitCount = 0

  for (const event of events) {
    if (event.type === 'PushEvent' && event.payload.commits) {
      commitCount += event.payload.commits.length
    }
  }

  // Estimate annual commits (events only cover ~90 days)
  // Use a multiplier to extrapolate to full year
  const estimatedAnnual = Math.round(commitCount * (365 / 90))

  return Math.max(commitCount, estimatedAnnual)
}

/**
 * Calculate new repositories created in 2024
 */
export function calculateNewRepos2024(repos: GitHubRepo[]): number {
  const year2024Start = new Date('2024-01-01')
  const year2024End = new Date('2024-12-31')

  return repos.filter((repo) => {
    const createdAt = parseISO(repo.created_at)
    return createdAt >= year2024Start && createdAt <= year2024End
  }).length
}

/**
 * Determine most active month from events
 */
export function calculateMostActiveMonth(events: GitHubEvent[]): string {
  const monthCounts: Record<number, number> = {}

  for (const event of events) {
    const month = getMonth(parseISO(event.created_at))
    monthCounts[month] = (monthCounts[month] || 0) + 1
  }

  const mostActiveMonthNum = Object.entries(monthCounts).reduce((max, [month, count]) => {
    return count > (monthCounts[max] || 0) ? parseInt(month) : max
  }, 0)

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return monthNames[mostActiveMonthNum] || 'January'
}

/**
 * Calculate monthly activity breakdown
 */
export function calculateMonthlyActivity(events: GitHubEvent[]): MonthlyActivity[] {
  const monthCounts: Record<number, number> = {}

  for (const event of events) {
    if (event.type === 'PushEvent') {
      const month = getMonth(parseISO(event.created_at))
      monthCounts[month] = (monthCounts[month] || 0) + 1
    }
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return monthNames.map((month, index) => ({
    month,
    monthNumber: index + 1,
    commits: monthCounts[index] || 0,
  }))
}

/**
 * Determine coding time preference
 */
export function calculateCodingTimePreference(events: GitHubEvent[]): {
  preference: 'morning' | 'afternoon' | 'evening' | 'night'
  peakHour: number
} {
  const hourCounts: Record<number, number> = {}

  for (const event of events) {
    if (event.type === 'PushEvent') {
      const hour = getHours(parseISO(event.created_at))
      hourCounts[hour] = (hourCounts[hour] || 0) + 1
    }
  }

  // Find peak hour
  const peakHour = Object.entries(hourCounts).reduce(
    (max, [hour, count]) => {
      return count > (hourCounts[max] || 0) ? parseInt(hour) : max
    },
    12
  )

  // Determine preference
  let preference: 'morning' | 'afternoon' | 'evening' | 'night'
  if (peakHour >= 5 && peakHour < 12) {
    preference = 'morning'
  } else if (peakHour >= 12 && peakHour < 17) {
    preference = 'afternoon'
  } else if (peakHour >= 17 && peakHour < 23) {
    preference = 'evening'
  } else {
    preference = 'night'
  }

  return { preference, peakHour }
}

/**
 * Calculate longest commit streak
 * Note: This is approximate based on events data
 */
export function calculateLongestStreak(events: GitHubEvent[]): number {
  if (events.length === 0) return 0

  // Extract unique dates with commits
  const commitDates = new Set<string>()

  for (const event of events) {
    if (event.type === 'PushEvent') {
      const dateStr = format(parseISO(event.created_at), 'yyyy-MM-dd')
      commitDates.add(dateStr)
    }
  }

  const sortedDates = Array.from(commitDates)
    .map((d) => parseISO(d))
    .sort((a, b) => a.getTime() - b.getTime())

  // Calculate streaks
  let longestStreak = 1
  let currentStreak = 1

  for (let i = 1; i < sortedDates.length; i++) {
    const dayDiff = differenceInDays(sortedDates[i], sortedDates[i - 1])

    if (dayDiff === 1) {
      currentStreak++
      longestStreak = Math.max(longestStreak, currentStreak)
    } else {
      currentStreak = 1
    }
  }

  return longestStreak
}

/**
 * Generate contribution calendar data
 */
export function generateContributionData(events: GitHubEvent[]): ContributionDay[] {
  const dailyCommits: Record<string, number> = {}

  for (const event of events) {
    if (event.type === 'PushEvent' && event.payload.commits) {
      const dateStr = format(parseISO(event.created_at), 'yyyy-MM-dd')
      dailyCommits[dateStr] = (dailyCommits[dateStr] || 0) + event.payload.commits.length
    }
  }

  // Generate full year data (365 days)
  const contributions: ContributionDay[] = []
  const today = new Date()
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(today.getFullYear() - 1)

  for (let i = 0; i < 365; i++) {
    const date = new Date(oneYearAgo)
    date.setDate(oneYearAgo.getDate() + i)
    const dateStr = format(date, 'yyyy-MM-dd')
    const count = dailyCommits[dateStr] || 0

    // Determine level (0-4 scale like GitHub)
    let level: 0 | 1 | 2 | 3 | 4
    if (count === 0) level = 0
    else if (count < 3) level = 1
    else if (count < 6) level = 2
    else if (count < 10) level = 3
    else level = 4

    contributions.push({
      date: dateStr,
      count,
      level,
    })
  }

  return contributions
}

/**
 * Find top repository by commit count
 */
export function findTopRepository(
  repos: GitHubRepo[],
  events: GitHubEvent[]
): {
  name: string
  commits: number
  language: string
  stars: number
} {
  const repoCommitCounts: Record<string, number> = {}

  for (const event of events) {
    if (event.type === 'PushEvent' && event.payload.commits) {
      const repoName = event.repo.name
      repoCommitCounts[repoName] = (repoCommitCounts[repoName] || 0) + event.payload.commits.length
    }
  }

  // Find repo with most commits
  const topRepoFullName = Object.entries(repoCommitCounts).reduce(
    (max, [repo, count]) => {
      return count > (repoCommitCounts[max] || 0) ? repo : max
    },
    Object.keys(repoCommitCounts)[0] || ''
  )

  const topRepoName = topRepoFullName.split('/')[1] || topRepoFullName
  const topRepo = repos.find((r) => r.name === topRepoName || r.full_name === topRepoFullName)

  return {
    name: topRepoName || 'Unknown',
    commits: repoCommitCounts[topRepoFullName] || 0,
    language: topRepo?.language || 'Unknown',
    stars: topRepo?.stargazers_count || 0,
  }
}

/**
 * Calculate collaboration statistics
 */
export function calculateCollaborationStats(events: GitHubEvent[]): {
  prs: number
  issues: number
  reposContributed: number
} {
  let prs = 0
  let issues = 0
  const repoSet = new Set<string>()

  for (const event of events) {
    if (event.type === 'PullRequestEvent') {
      prs++
    }
    if (event.type === 'IssuesEvent' && event.payload.action === 'closed') {
      issues++
    }
    if (event.type === 'PushEvent') {
      repoSet.add(event.repo.name)
    }
  }

  return {
    prs,
    issues,
    reposContributed: repoSet.size,
  }
}

/**
 * Calculate fun statistics
 */
export function calculateFunStats(events: GitHubEvent[]): {
  fixCommits: number
  avgCommitMsgLength: number
  lateNightCommitsPercent: number
  fastestCommitDay: string | null
  fastestCommitCount: number
} {
  let fixCommits = 0
  let totalCommitMsgLength = 0
  let totalCommits = 0
  let lateNightCommits = 0
  const dailyCommits: Record<string, number> = {}

  for (const event of events) {
    if (event.type === 'PushEvent' && event.payload.commits) {
      for (const commit of event.payload.commits) {
        totalCommits++
        totalCommitMsgLength += commit.message.length

        // Check for "fix" in commit message
        if (/\b(fix|fixed|fixes|bugfix|hotfix)\b/i.test(commit.message)) {
          fixCommits++
        }
      }

      // Check for late night commits (11 PM - 5 AM)
      const hour = getHours(parseISO(event.created_at))
      if (hour >= 23 || hour < 5) {
        lateNightCommits += event.payload.commits.length
      }

      // Track daily commits
      const dateStr = format(parseISO(event.created_at), 'yyyy-MM-dd')
      dailyCommits[dateStr] = (dailyCommits[dateStr] || 0) + event.payload.commits.length
    }
  }

  // Find fastest commit day
  let fastestCommitDay: string | null = null
  let fastestCommitCount = 0

  for (const [date, count] of Object.entries(dailyCommits)) {
    if (count > fastestCommitCount) {
      fastestCommitCount = count
      fastestCommitDay = date
    }
  }

  return {
    fixCommits,
    avgCommitMsgLength: totalCommits > 0 ? Math.round(totalCommitMsgLength / totalCommits) : 0,
    lateNightCommitsPercent:
      totalCommits > 0 ? Math.round((lateNightCommits / totalCommits) * 100) : 0,
    fastestCommitDay,
    fastestCommitCount,
  }
}

/**
 * Calculate commits per day average
 */
export function calculateCommitsPerDay(totalCommits: number, daysActive: number): number {
  if (daysActive === 0) return 0
  return Math.round((totalCommits / daysActive) * 100) / 100
}

/**
 * Estimate average commit size
 */
export function estimateCommitSize(
  totalCommits: number,
  repoCount: number
): 'small' | 'medium' | 'large' {
  if (repoCount === 0) return 'medium'

  const commitsPerRepo = totalCommits / repoCount

  if (commitsPerRepo < 20) return 'small'
  if (commitsPerRepo < 50) return 'medium'
  return 'large'
}

/**
 * Calculate growth vs last year (placeholder - requires historical data)
 */
export function calculateGrowthVsLastYear(currentYearCommits: number): number | null {
  // This would require historical data from previous year
  // For MVP, return null or a random growth percentage
  return null
}

/**
 * Main function: Process all GitHub data into complete wrap data
 */
export function processGitHubDataToWrap(
  data: ProcessedGitHubData,
  year: number = 2024
): Partial<WrapData> {
  const { user, repos, events, totalStars, totalForks, languages } = data

  // Calculate all metrics
  const totalCommits = calculateTotalCommits(events)
  const newRepos = calculateNewRepos2024(repos)
  const mostActiveMonth = calculateMostActiveMonth(events)
  const longestStreak = calculateLongestStreak(events)
  const { preference: codingTime, peakHour } = calculateCodingTimePreference(events)
  const topRepo = findTopRepository(repos, events)
  const collaboration = calculateCollaborationStats(events)
  const funStats = calculateFunStats(events)
  const monthlyActivity = calculateMonthlyActivity(events)
  const contributionData = generateContributionData(events)

  // Calculate derived metrics
  const activeDays = contributionData.filter((d) => d.count > 0).length
  const commitsPerDay = calculateCommitsPerDay(totalCommits, activeDays)

  return {
    username: user.login,
    display_name: user.name,
    avatar_url: user.avatar_url,
    year,

    total_commits: totalCommits,
    total_repos: repos.length,
    public_repos: user.public_repos,
    new_repos_2024: newRepos,
    total_stars: totalStars,
    total_forks: totalForks,
    followers: user.followers,

    primary_language: languages[0]?.name || 'Unknown',
    languages,

    most_active_month: mostActiveMonth,
    longest_streak: longestStreak,
    coding_time_preference: codingTime,
    peak_hour: peakHour,

    top_repo_name: topRepo.name,
    top_repo_commits: topRepo.commits,
    top_repo_language: topRepo.language,
    top_repo_stars: topRepo.stars,

    prs_created: collaboration.prs,
    issues_closed: collaboration.issues,
    repos_contributed: collaboration.reposContributed,

    commits_per_day: commitsPerDay,
    growth_vs_last_year: calculateGrowthVsLastYear(totalCommits),

    fix_commits: funStats.fixCommits,
    avg_commit_msg_length: funStats.avgCommitMsgLength,
    late_night_commits_percent: funStats.lateNightCommitsPercent,
    fastest_commit_day: funStats.fastestCommitDay,
    fastest_commit_count: funStats.fastestCommitCount,

    contribution_data: contributionData,
    monthly_activity: monthlyActivity,

    view_count: 0,
    share_count: 0,
  }
}
