// GitHub API Types

export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  name: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  created_at: string
  updated_at: string
  pushed_at: string
  language: string | null
  stargazers_count: number
  forks_count: number
  watchers_count: number
  size: number
  default_branch: string
  open_issues_count: number
  topics: string[]
  archived: boolean
  fork: boolean
}

export interface GitHubLanguage {
  [language: string]: number // language name -> bytes
}

export interface GitHubCommit {
  sha: string
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
    message: string
  }
  author: {
    login: string
    avatar_url: string
  } | null
}

export interface GitHubEvent {
  id: string
  type: string
  created_at: string
  repo: {
    id: number
    name: string
  }
  payload: {
    commits?: Array<{
      message: string
      sha: string
    }>
    action?: string
    pull_request?: {
      title: string
      state: string
    }
    issue?: {
      title: string
      state: string
    }
  }
}

export interface GitHubContribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ProcessedGitHubData {
  user: GitHubUser
  repos: GitHubRepo[]
  events: GitHubEvent[]
  totalStars: number
  totalForks: number
  languages: LanguageStats[]
  contributions: GitHubContribution[]
}

export interface LanguageStats {
  name: string
  bytes: number
  percentage: number
  color: string
}
