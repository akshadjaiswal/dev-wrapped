/**
 * GitHub API Service
 * Handles all interactions with the GitHub REST API
 */

import axios, { AxiosError } from 'axios'
import type {
  GitHubUser,
  GitHubRepo,
  GitHubEvent,
  GitHubLanguage,
  GitHubContribution,
  ProcessedGitHubData,
  LanguageStats,
} from '@/lib/types'

const GITHUB_API_BASE = 'https://api.github.com'

// Get token - will be checked at runtime
function getGitHubToken(): string {
  return process.env.GITHUB_TOKEN || ''
}

// Log token status at module load
const tokenAtLoad = getGitHubToken()
console.log('[GITHUB] Token status:', {
  exists: !!tokenAtLoad,
  length: tokenAtLoad.length,
  prefix: tokenAtLoad.substring(0, 4),
})

if (tokenAtLoad) {
  console.log('[GITHUB] ✅ Using authenticated requests (5000 req/hour)')
} else {
  console.warn('[GITHUB] ⚠️  No GITHUB_TOKEN found - using unauthenticated requests (60 req/hour)')
  console.warn('[GITHUB] Add GITHUB_TOKEN to .env.local to avoid rate limits')
}

// Configure axios instance with interceptor to add token dynamically
const githubClient = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
  timeout: 30000, // 30 second timeout
})

// Add request interceptor to inject token on each request
githubClient.interceptors.request.use((config) => {
  const token = getGitHubToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add response interceptor to log rate limit info
githubClient.interceptors.response.use(
  (response) => {
    const remaining = response.headers['x-ratelimit-remaining']
    const limit = response.headers['x-ratelimit-limit']
    if (remaining) {
      console.log(`[GITHUB] Rate limit: ${remaining}/${limit} remaining`)
    }
    return response
  },
  (error) => {
    // Log rate limit on errors too
    if (error.response) {
      const remaining = error.response.headers['x-ratelimit-remaining']
      const limit = error.response.headers['x-ratelimit-limit']
      console.error(`[GITHUB] Rate limit on error: ${remaining}/${limit} remaining`)
    }
    return Promise.reject(error)
  }
)

// Language colors (common languages)
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Ruby: '#701516',
  PHP: '#4F5D95',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  R: '#198CE7',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Scala: '#c22d40',
  Elixir: '#6e4a7e',
  Clojure: '#db5855',
  Haskell: '#5e5086',
  Lua: '#000080',
  Perl: '#0298c3',
  Objective: '#438eff',
}

/**
 * Error types for better error handling
 */
export class GitHubAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public rateLimitRemaining?: number
  ) {
    super(message)
    this.name = 'GitHubAPIError'
  }
}

/**
 * Fetch user profile
 */
export async function fetchUserProfile(username: string): Promise<GitHubUser> {
  try {
    const response = await githubClient.get<GitHubUser>(`/users/${username}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 404) {
        throw new GitHubAPIError('User not found', 404)
      }
      if (axiosError.response?.status === 403) {
        throw new GitHubAPIError(
          'GitHub API rate limit exceeded',
          403,
          parseInt(axiosError.response.headers['x-ratelimit-remaining'] || '0')
        )
      }
    }
    throw new GitHubAPIError('Failed to fetch user profile')
  }
}

/**
 * Fetch all public repositories for a user
 */
export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const repos: GitHubRepo[] = []
    let page = 1
    const perPage = 100 // Max allowed by GitHub

    // Fetch all pages
    while (true) {
      const response = await githubClient.get<GitHubRepo[]>(
        `/users/${username}/repos`,
        {
          params: {
            type: 'owner', // Only repos owned by user
            sort: 'updated',
            direction: 'desc',
            per_page: perPage,
            page,
          },
        }
      )

      if (response.data.length === 0) break

      repos.push(...response.data)

      // If we got less than perPage, we're done
      if (response.data.length < perPage) break

      page++
    }

    return repos
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 404) {
        throw new GitHubAPIError('User not found', 404)
      }
      if (axiosError.response?.status === 403) {
        throw new GitHubAPIError('GitHub API rate limit exceeded', 403)
      }
    }
    throw new GitHubAPIError('Failed to fetch repositories')
  }
}

/**
 * Fetch languages for a specific repository
 */
export async function fetchRepoLanguages(
  owner: string,
  repo: string
): Promise<GitHubLanguage> {
  try {
    const response = await githubClient.get<GitHubLanguage>(
      `/repos/${owner}/${repo}/languages`
    )
    return response.data
  } catch (error) {
    // If languages fetch fails, return empty object (non-critical)
    return {}
  }
}

/**
 * Fetch recent events for a user (last 90 days)
 */
export async function fetchUserEvents(username: string): Promise<GitHubEvent[]> {
  try {
    const events: GitHubEvent[] = []
    let page = 1
    const perPage = 100

    // GitHub only provides last 90 days of events
    // Fetch up to 300 events (3 pages)
    while (page <= 3) {
      const response = await githubClient.get<GitHubEvent[]>(
        `/users/${username}/events`,
        {
          params: {
            per_page: perPage,
            page,
          },
        }
      )

      if (response.data.length === 0) break

      events.push(...response.data)

      if (response.data.length < perPage) break

      page++
    }

    console.log(`[GITHUB] Fetched ${events.length} events for ${username}`)
    return events
  } catch (error) {
    // Events are not critical, return empty array if fails
    console.error('[GITHUB] Failed to fetch events:', error)
    return []
  }
}

/**
 * Calculate language statistics from repositories
 */
export async function calculateLanguageStats(
  repos: GitHubRepo[],
  username: string
): Promise<LanguageStats[]> {
  const languageBytes: Record<string, number> = {}

  // Fetch languages for each repo
  for (const repo of repos) {
    try {
      const languages = await fetchRepoLanguages(username, repo.name)

      for (const [language, bytes] of Object.entries(languages)) {
        languageBytes[language] = (languageBytes[language] || 0) + bytes
      }
    } catch (error) {
      // Skip if language fetch fails
      continue
    }
  }

  // Calculate total bytes
  const totalBytes = Object.values(languageBytes).reduce((sum, bytes) => sum + bytes, 0)

  // Convert to percentage and add colors
  const languageStats: LanguageStats[] = Object.entries(languageBytes)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0,
      color: LANGUAGE_COLORS[name] || '#' + Math.floor(Math.random()*16777215).toString(16),
    }))
    .sort((a, b) => b.percentage - a.percentage)

  return languageStats
}

/**
 * Estimate commit count from events
 * Note: This is an estimation as GitHub API doesn't provide exact commit counts
 */
export function estimateCommitsFromEvents(events: GitHubEvent[]): number {
  let commitCount = 0

  for (const event of events) {
    if (event.type === 'PushEvent' && event.payload.commits) {
      commitCount += event.payload.commits.length
    }
  }

  // Multiply by estimation factor (events only cover ~90 days)
  // Rough estimation: multiply by 4 to approximate full year
  const estimatedAnnualCommits = Math.round(commitCount * (365 / 90))

  return estimatedAnnualCommits
}

/**
 * Get PR and issue counts from events
 */
export function getCollaborationStats(events: GitHubEvent[]): {
  prs: number
  issues: number
} {
  let prs = 0
  let issues = 0

  for (const event of events) {
    if (event.type === 'PullRequestEvent') {
      prs++
    }
    if (event.type === 'IssuesEvent') {
      issues++
    }
  }

  return { prs, issues }
}

/**
 * Main function: Fetch and process all GitHub data for a user
 */
export async function fetchCompleteGitHubData(
  username: string,
  year: number = 2025
): Promise<ProcessedGitHubData> {
  try {
    // Fetch user profile
    const user = await fetchUserProfile(username)

    // Fetch repositories
    const repos = await fetchUserRepos(username)

    // Fetch recent events
    const events = await fetchUserEvents(username)

    // Calculate statistics
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)

    // Get language statistics
    const languages = await calculateLanguageStats(repos, username)

    // Fetch GraphQL contributions for accurate commit data
    let totalCommits = 0
    let graphqlContributions: GitHubContribution[] = []
    let repositoryCommits: Array<{
      name: string
      owner: string
      commits: number
      stars: number
      language: string | null
    }> = []

    try {
      const { fetchContributionsGraphQL, getYearDateRange } = await import('./github-graphql')
      const { from, to } = getYearDateRange(year)

      console.log(`[GITHUB] Fetching GraphQL contributions from ${from} to ${to}`)
      const contributionsData = await fetchContributionsGraphQL(username, from, to)

      totalCommits = contributionsData.totalCommitContributions

      // Convert GraphQL calendar to our format
      graphqlContributions = contributionsData.contributionCalendar.weeks.flatMap((week) =>
        week.contributionDays.map((day) => {
          // Calculate level based on contribution count
          let level: 0 | 1 | 2 | 3 | 4 = 0
          if (day.contributionCount > 0) {
            if (day.contributionCount >= 10) level = 4
            else if (day.contributionCount >= 7) level = 3
            else if (day.contributionCount >= 4) level = 2
            else level = 1
          }

          return {
            date: day.date,
            count: day.contributionCount,
            level,
          }
        })
      )

      // Extract per-repository commit counts
      if (contributionsData.commitContributionsByRepository) {
        repositoryCommits = contributionsData.commitContributionsByRepository.map((repoContrib) => ({
          name: repoContrib.repository.name,
          owner: repoContrib.repository.owner.login,
          commits: repoContrib.contributions.totalCount,
          stars: repoContrib.repository.stargazerCount,
          language: repoContrib.repository.primaryLanguage?.name || null,
        }))

        console.log(`[GITHUB] ✅ GraphQL: ${totalCommits} commits across ${repositoryCommits.length} repositories`)
      }

      console.log(`[GITHUB] ✅ GraphQL: ${graphqlContributions.length} days of contribution data`)
    } catch (graphqlError) {
      console.error('[GITHUB] GraphQL fetch failed, falling back to events API:', graphqlError)
      // GraphQL failed, we'll fall back to events API in calculations
    }

    // Return processed data
    return {
      user,
      repos,
      events,
      totalStars,
      totalForks,
      languages,
      contributions: graphqlContributions,
      totalCommits,
      graphqlContributions,
      repositoryCommits,
    }
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error
    }
    throw new GitHubAPIError('Failed to fetch GitHub data')
  }
}

/**
 * Get rate limit info
 */
export async function getRateLimitInfo() {
  try {
    const response = await githubClient.get('/rate_limit')
    return response.data
  } catch (error) {
    console.error('Failed to get rate limit info:', error)
    return null
  }
}

/**
 * Check if user exists (lightweight check)
 */
export async function checkUserExists(username: string): Promise<boolean> {
  try {
    await githubClient.head(`/users/${username}`)
    return true
  } catch (error) {
    return false
  }
}
