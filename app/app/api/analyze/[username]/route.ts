/**
 * API Route: /api/analyze/[username]
 * Analyzes a GitHub user and generates their wrap data
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  fetchCompleteGitHubData,
  GitHubAPIError,
} from '@/lib/services/github'
import { analyzePersonality } from '@/lib/services/groq'
import {
  processGitHubDataToWrap,
  estimateCommitSize,
} from '@/lib/utils/calculations'
import type { AnalyzeResponse, WrapData } from '@/lib/types'

export const runtime = 'nodejs'
export const maxDuration = 60 // 60 seconds max

/**
 * GET /api/analyze/[username]
 * Fetches and analyzes GitHub data for a user
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const startTime = Date.now()

  try {
    const { username } = await params
    const year = 2025 // Current year

    // Validate username
    if (!username || username.trim().length === 0) {
      return NextResponse.json<AnalyzeResponse>(
        {
          success: false,
          error: 'Username is required',
        },
        { status: 400 }
      )
    }

    // Validate username format (GitHub username rules)
    const usernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/
    if (!usernameRegex.test(username)) {
      return NextResponse.json<AnalyzeResponse>(
        {
          success: false,
          error: 'Invalid GitHub username format',
        },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Check cache first (if wrap exists and is recent)
    const { data: cachedWrap } = await supabase
      .from('wraps')
      .select('*')
      .eq('username', username)
      .eq('year', year)
      .single()

    if (cachedWrap) {
      const cacheAge = Date.now() - new Date(cachedWrap.created_at).getTime()
      const twentyFourHours = 24 * 60 * 60 * 1000

      // If cache is less than 24 hours old, return it
      if (cacheAge < twentyFourHours) {
        console.log(`[ANALYZE] Cache hit for ${username}`)
        return NextResponse.json<AnalyzeResponse>({
          success: true,
          data: cachedWrap as WrapData,
          cached: true,
        })
      }
    }

    console.log(`[ANALYZE] Fetching fresh data for ${username}`)

    // Fetch GitHub data with year parameter for GraphQL
    const githubData = await fetchCompleteGitHubData(username, year)

    // Process data into wrap format
    const wrapData = processGitHubDataToWrap(githubData, year)

    // Analyze personality with Groq
    const commitSize = estimateCommitSize(
      wrapData.total_commits || 0,
      wrapData.total_repos || 0
    )

    console.log('[ANALYZE] Personality analysis input:', {
      username,
      commits: wrapData.total_commits,
      repos: wrapData.total_repos,
      commitSize,
      languages: wrapData.languages?.map((l) => l.name),
    })

    const personality = await analyzePersonality({
      commits: wrapData.total_commits || 0,
      primaryLanguage: wrapData.primary_language || 'Unknown',
      languages: wrapData.languages?.map((l) => l.name) || [],
      codingTime: wrapData.coding_time_preference || 'afternoon',
      prs: wrapData.prs_created || 0,
      issues: wrapData.issues_closed || 0,
      repoCount: wrapData.total_repos || 0,
      topRepo: wrapData.top_repo_name || 'Unknown',
      avgCommitSize: commitSize,
    })

    console.log('[ANALYZE] Personality result:', personality)

    // Add personality to wrap data
    const completeWrapData = {
      ...wrapData,
      developer_personality: personality.archetype,
      personality_description: personality.description,
      personality_traits: personality.traits,
    }

    // Save to database (upsert)
    const { data: savedWrap, error: saveError } = await supabase
      .from('wraps')
      .upsert(
        {
          ...completeWrapData,
          username,
          year,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'username,year',
        }
      )
      .select()
      .single()

    if (saveError) {
      console.error('[ANALYZE] Error saving to database:', saveError)
      // Don't fail the request if database save fails
      // Return the data anyway
    }

    const duration = Date.now() - startTime
    console.log(`[ANALYZE] Completed in ${duration}ms for ${username}`)

    return NextResponse.json<AnalyzeResponse>({
      success: true,
      data: (savedWrap || completeWrapData) as WrapData,
      cached: false,
    })
  } catch (error) {
    console.error('[ANALYZE] Error:', error)

    if (error instanceof GitHubAPIError) {
      if (error.statusCode === 404) {
        return NextResponse.json<AnalyzeResponse>(
          {
            success: false,
            error: 'GitHub user not found. Please check the username and try again.',
          },
          { status: 404 }
        )
      }

      if (error.statusCode === 403) {
        return NextResponse.json<AnalyzeResponse>(
          {
            success: false,
            error:
              'GitHub API rate limit exceeded. Please try again in a few minutes.',
          },
          { status: 429 }
        )
      }
    }

    return NextResponse.json<AnalyzeResponse>(
      {
        success: false,
        error: 'Failed to analyze GitHub data. Please try again later.',
      },
      { status: 500 }
    )
  }
}
