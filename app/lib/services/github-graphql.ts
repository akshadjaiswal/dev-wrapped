/**
 * GitHub GraphQL API Service
 * Fetches contribution data using GitHub's GraphQL API v4
 */

import axios from 'axios'

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'

function getGitHubToken(): string {
  return process.env.GITHUB_TOKEN || ''
}

export interface ContributionDay {
  date: string
  contributionCount: number
}

export interface ContributionWeek {
  contributionDays: ContributionDay[]
}

export interface ContributionCalendar {
  totalContributions: number
  weeks: ContributionWeek[]
}

export interface RepositoryContribution {
  repository: {
    name: string
    owner: {
      login: string
    }
    stargazerCount: number
    primaryLanguage: {
      name: string
    } | null
  }
  contributions: {
    totalCount: number
  }
}

export interface ContributionsCollection {
  totalCommitContributions: number
  restrictedContributionsCount: number
  contributionCalendar: ContributionCalendar
  commitContributionsByRepository: RepositoryContribution[]
}

export interface GraphQLContributionResponse {
  data: {
    user: {
      contributionsCollection: ContributionsCollection
    }
  }
}

/**
 * Fetch contributions using GitHub GraphQL API
 * This gives us accurate commit counts for the entire year
 */
export async function fetchContributionsGraphQL(
  username: string,
  fromDate: string,
  toDate: string
): Promise<ContributionsCollection> {
  const token = getGitHubToken()

  if (!token) {
    throw new Error('GitHub token is required for GraphQL API')
  }

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          restrictedContributionsCount
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
          commitContributionsByRepository(maxRepositories: 100) {
            repository {
              name
              owner {
                login
              }
              stargazerCount
              primaryLanguage {
                name
              }
            }
            contributions {
              totalCount
            }
          }
        }
      }
    }
  `

  const variables = {
    username,
    from: fromDate,
    to: toDate,
  }

  try {
    console.log(`[GRAPHQL] Fetching contributions for ${username} from ${fromDate} to ${toDate}`)

    const response = await axios.post<GraphQLContributionResponse>(
      GITHUB_GRAPHQL_URL,
      {
        query,
        variables,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    )

    if (response.data.data?.user?.contributionsCollection) {
      const contributions = response.data.data.user.contributionsCollection
      console.log(`[GRAPHQL] ✅ Total commits: ${contributions.totalCommitContributions}`)
      console.log(`[GRAPHQL] ✅ Total contributions: ${contributions.contributionCalendar.totalContributions}`)
      console.log(`[GRAPHQL] ✅ Private contributions: ${contributions.restrictedContributionsCount}`)
      console.log(`[GRAPHQL] ✅ Repositories with contributions: ${contributions.commitContributionsByRepository?.length || 0}`)
      return contributions
    }

    throw new Error('Invalid GraphQL response structure')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('[GRAPHQL] Error:', error.response?.data || error.message)
      throw new Error(`GraphQL API error: ${error.response?.data?.message || error.message}`)
    }
    throw error
  }
}

/**
 * Get current date range for the year 2025
 */
export function getYearDateRange(year: number = 2025): { from: string; to: string } {
  const from = `${year}-01-01T00:00:00Z`

  // Get current date or end of year, whichever is earlier
  const now = new Date()
  const currentYear = now.getFullYear()

  let to: string
  if (currentYear === year) {
    // If we're in the target year, use current date
    to = now.toISOString()
  } else if (currentYear > year) {
    // If target year has passed, use end of that year
    to = `${year}-12-31T23:59:59Z`
  } else {
    // If target year is in the future, use current date
    to = now.toISOString()
  }

  return { from, to }
}
