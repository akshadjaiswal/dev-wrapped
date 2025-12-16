/**
 * Groq AI Service
 * Handles developer personality analysis using Groq's LLM
 */

import axios from 'axios'
import type { DeveloperPersonality } from '@/lib/types'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_API_KEY = process.env.GROQ_API_KEY || ''

// Groq configuration - using fast, reliable model
export const GROQ_CONFIG = {
  model: 'llama-3.1-8b-instant', // Faster, more reliable model
  temperature: 0.7,
  maxTokens: 300,
  topP: 1,
} as const

// Fallback models to try if primary fails
const FALLBACK_MODELS = [
  'llama-3.1-8b-instant',
  'mixtral-8x7b-32768',
  'llama-3.1-70b-versatile',
]

/**
 * Developer personality archetypes
 */
const ARCHETYPES = {
  CRAFTSPERSON: 'The Craftsperson',
  SPEEDRUNNER: 'The Speedrunner',
  NIGHT_CODER: 'The Night Coder',
  EXPLORER: 'The Explorer',
  MAINTAINER: 'The Maintainer',
  COLLABORATOR: 'The Collaborator',
  BUILDER: 'The Builder',
  FIXER: 'The Fixer',
}

/**
 * Build the personality analysis prompt
 */
function buildPersonalityPrompt(stats: {
  commits: number
  primaryLanguage: string
  languages: string[]
  codingTime: string
  prs: number
  issues: number
  repoCount: number
  topRepo: string
  avgCommitSize: string
}): string {
  return `Analyze this developer's 2024 GitHub activity and determine their developer personality:

Data:
- Total commits: ${stats.commits}
- Primary language: ${stats.primaryLanguage}
- Languages used: ${stats.languages.join(', ')}
- Coding time preference: ${stats.codingTime}
- Collaboration: ${stats.prs} PRs, ${stats.issues} issues
- Repository focus: ${stats.repoCount} repos, top: ${stats.topRepo}
- Commit patterns: ${stats.avgCommitSize} commits

Based on these patterns, identify which archetype fits best:

1. The Craftsperson: Small, careful commits. Quality over speed. Perfectionist approach.
2. The Speedrunner: Large commits, ships fast, moves quick. Gets things done rapidly.
3. The Night Coder: Primarily codes evening/night hours. Nocturnal developer.
4. The Explorer: Uses many languages, always learning new tech. Curious polyglot.
5. The Maintainer: Steady consistent activity, reliable. The dependable one.
6. The Collaborator: High PR and issue activity. Team player, community focused.
7. The Builder: Deep focus on few projects. Creates substantial things.
8. The Fixer: Many bug fix commits. Problem solver, firefighter.

Return ONLY valid JSON with no markdown formatting or code blocks:
{
  "archetype": "The [Name]",
  "description": "One celebratory sentence capturing their 2024 coding style (max 15 words)",
  "traits": ["trait1", "trait2", "trait3"]
}

Make it personal, specific, and celebratory. This is their year-end wrap!`
}

/**
 * Call Groq AI API for personality analysis
 */
export async function analyzePersonality(stats: {
  commits: number
  primaryLanguage: string
  languages: string[]
  codingTime: string
  prs: number
  issues: number
  repoCount: number
  topRepo: string
  avgCommitSize: string
}): Promise<DeveloperPersonality> {
  // Fallback personality if AI fails
  const fallbackPersonality: DeveloperPersonality = {
    archetype: ARCHETYPES.BUILDER,
    description: 'A dedicated developer who shipped code consistently throughout 2024.',
    traits: ['Consistent', 'Focused', 'Productive'],
  }

  // Check if API key exists
  if (!GROQ_API_KEY) {
    console.warn('GROQ_API_KEY not found, using fallback personality')
    return fallbackPersonality
  }

  try {
    const prompt = buildPersonalityPrompt(stats)

    // Try primary model first, then fallbacks
    let response
    let lastError

    for (const model of FALLBACK_MODELS) {
      try {
        console.log(`[GROQ] Trying model: ${model}`)

        response = await axios.post(
          GROQ_API_URL,
          {
            model: model,
            messages: [
              {
                role: 'system',
                content:
                  'You are a developer personality analyst. Return ONLY valid JSON, no markdown.',
              },
              {
                role: 'user',
                content: prompt,
              },
            ],
            temperature: GROQ_CONFIG.temperature,
            max_tokens: GROQ_CONFIG.maxTokens,
            top_p: GROQ_CONFIG.topP,
            response_format: { type: 'json_object' },
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              'Content-Type': 'application/json',
            },
            timeout: 30000, // 30 second timeout
          }
        )

        console.log(`[GROQ] Success with model: ${model}`)
        break // Success! Exit loop
      } catch (err) {
        console.error(`[GROQ] Model ${model} failed:`, err instanceof Error ? err.message : err)
        lastError = err
        // Try next model
        continue
      }
    }

    // If all models failed, throw the last error
    if (!response) {
      throw lastError || new Error('All Groq models failed')
    }

    const content = response.data.choices[0]?.message?.content

    if (!content) {
      console.error('No content in Groq response')
      return fallbackPersonality
    }

    // Parse the JSON response
    const parsed = JSON.parse(content) as DeveloperPersonality

    // Validate response structure
    if (!parsed.archetype || !parsed.description || !Array.isArray(parsed.traits)) {
      console.error('Invalid personality structure from Groq')
      return fallbackPersonality
    }

    // Validate traits array
    if (parsed.traits.length !== 3) {
      console.warn('Traits array should have exactly 3 items, adjusting...')
      parsed.traits = parsed.traits.slice(0, 3)
      while (parsed.traits.length < 3) {
        parsed.traits.push('Dedicated')
      }
    }

    return parsed
  } catch (error) {
    // Log detailed error information
    if (axios.isAxiosError(error)) {
      console.error('[GROQ] Axios error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      })
    } else {
      console.error('[GROQ] Unknown error:', error)
    }

    // Use rule-based fallback
    console.log('[GROQ] Using rule-based fallback personality')
    return determineFallbackArchetype(stats)
  }
}

/**
 * Determine archetype based on stats (rule-based fallback)
 * Improved with better thresholds and variety
 */
function determineFallbackArchetype(stats: {
  commits: number
  primaryLanguage: string
  languages: string[]
  codingTime: string
  prs: number
  issues: number
  repoCount: number
  topRepo: string
  avgCommitSize: string
}): DeveloperPersonality {
  // Helper to pick random variation within a personality type
  const pickVariation = (variations: Array<{ description: string; traits: string[] }>) => {
    const index = Math.floor(Math.random() * variations.length)
    return variations[index]
  }

  // Score different archetypes
  const scores = {
    nightCoder: stats.codingTime === 'night' ? 10 : 0,
    collaborator: (stats.prs > 20 ? 3 : 0) + (stats.issues > 15 ? 3 : 0),
    explorer: stats.languages.length >= 4 ? stats.languages.length : 0,
    speedrunner: (stats.avgCommitSize === 'large' ? 5 : 0) + (stats.commits > 800 ? 3 : 0),
    craftsperson: (stats.avgCommitSize === 'small' ? 4 : 0) + (stats.commits > 400 ? 2 : 0),
    maintainer: (stats.repoCount < 8 && stats.commits > 200 ? 5 : 0),
    builder: stats.repoCount > 10 ? 3 : 0,
  }

  // Night Coder (highest priority if coding at night)
  if (scores.nightCoder >= 10) {
    const variations = [
      {
        description: 'A nocturnal coder who does their best work under the stars.',
        traits: ['Night Owl', 'Creative', 'Independent'],
      },
      {
        description: 'Late night commits and moonlit debugging sessions define your 2024.',
        traits: ['Nocturnal', 'Focused', 'Creative'],
      },
    ]
    const variation = pickVariation(variations)
    return { archetype: ARCHETYPES.NIGHT_CODER, ...variation }
  }

  // Find the highest scoring archetype
  const maxScore = Math.max(...Object.values(scores))
  const topArchetype = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0]

  // Collaborator
  if (topArchetype === 'collaborator' && scores.collaborator >= 3) {
    const variations = [
      {
        description: 'A team player who thrives on collaboration and community engagement.',
        traits: ['Collaborative', 'Communicative', 'Helpful'],
      },
      {
        description: 'Building bridges and merging PRs, you made 2024 a team effort.',
        traits: ['Team-oriented', 'Supportive', 'Engaging'],
      },
    ]
    const variation = pickVariation(variations)
    return { archetype: ARCHETYPES.COLLABORATOR, ...variation }
  }

  // Explorer
  if (topArchetype === 'explorer' && scores.explorer >= 4) {
    const variations = [
      {
        description: 'A curious polyglot always exploring new technologies and languages.',
        traits: ['Curious', 'Adaptable', 'Versatile'],
      },
      {
        description: `Mastered ${stats.languages.length} languages this year, always learning something new.`,
        traits: ['Polyglot', 'Curious', 'Adventurous'],
      },
    ]
    const variation = pickVariation(variations)
    return { archetype: ARCHETYPES.EXPLORER, ...variation }
  }

  // Speedrunner
  if (topArchetype === 'speedrunner' && scores.speedrunner >= 5) {
    const variations = [
      {
        description: 'A fast-paced developer who ships code quickly and efficiently.',
        traits: ['Fast', 'Decisive', 'Action-oriented'],
      },
      {
        description: 'High velocity commits and rapid iteration defined your productive 2024.',
        traits: ['Rapid', 'Efficient', 'Prolific'],
      },
    ]
    const variation = pickVariation(variations)
    return { archetype: ARCHETYPES.SPEEDRUNNER, ...variation }
  }

  // Craftsperson
  if (topArchetype === 'craftsperson' && scores.craftsperson >= 4) {
    const variations = [
      {
        description: 'A meticulous developer who values quality and careful craftsmanship.',
        traits: ['Careful', 'Detail-oriented', 'Thoughtful'],
      },
      {
        description: 'Every commit polished to perfection, quality over quantity in 2024.',
        traits: ['Precise', 'Meticulous', 'Quality-focused'],
      },
    ]
    const variation = pickVariation(variations)
    return { archetype: ARCHETYPES.CRAFTSPERSON, ...variation }
  }

  // Maintainer
  if (topArchetype === 'maintainer' && scores.maintainer >= 5) {
    const variations = [
      {
        description: 'A reliable maintainer providing steady, consistent contributions.',
        traits: ['Reliable', 'Steady', 'Dependable'],
      },
      {
        description: 'Deep focus and consistent care kept projects thriving all year long.',
        traits: ['Dependable', 'Committed', 'Thorough'],
      },
    ]
    const variation = pickVariation(variations)
    return { archetype: ARCHETYPES.MAINTAINER, ...variation }
  }

  // Builder (default with variations)
  const builderVariations = [
    {
      description: 'A focused builder who creates meaningful projects with dedication.',
      traits: ['Focused', 'Dedicated', 'Persistent'],
    },
    {
      description: 'Turning ideas into reality one commit at a time throughout 2024.',
      traits: ['Creative', 'Determined', 'Productive'],
    },
    {
      description: 'A dedicated developer who shipped code consistently throughout 2024.',
      traits: ['Consistent', 'Reliable', 'Productive'],
    },
  ]
  const variation = pickVariation(builderVariations)
  return { archetype: ARCHETYPES.BUILDER, ...variation }
}

/**
 * Test Groq API connection
 */
export async function testGroqConnection(): Promise<boolean> {
  if (!GROQ_API_KEY) {
    return false
  }

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_CONFIG.model,
        messages: [
          {
            role: 'user',
            content: 'Respond with "OK" if you can read this.',
          },
        ],
        max_tokens: 10,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    )

    return response.status === 200
  } catch (error) {
    console.error('Groq connection test failed:', error)
    return false
  }
}
