/**
 * Groq AI Service
 * Handles developer personality analysis using Groq's LLM
 */

import axios from 'axios'
import type { DeveloperPersonality } from '@/lib/types'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_API_KEY = process.env.GROQ_API_KEY || ''

// Groq configuration as specified
export const GROQ_CONFIG = {
  model: 'llama-3.1-70b-versatile',
  temperature: 0.7,
  maxTokens: 300,
  topP: 1,
} as const

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

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_CONFIG.model,
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
    console.error('Failed to analyze personality with Groq:', error)

    // Try to determine archetype based on stats as fallback
    return determineFallbackArchetype(stats)
  }
}

/**
 * Determine archetype based on stats (rule-based fallback)
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
  // Rule-based logic to determine archetype
  let archetype = ARCHETYPES.BUILDER
  let description = 'A dedicated developer who shipped code consistently throughout 2024.'
  let traits = ['Consistent', 'Focused', 'Productive']

  // Night Coder
  if (stats.codingTime === 'night') {
    archetype = ARCHETYPES.NIGHT_CODER
    description = 'A nocturnal coder who does their best work under the stars.'
    traits = ['Night Owl', 'Creative', 'Independent']
  }
  // Collaborator
  else if (stats.prs > 50 || stats.issues > 30) {
    archetype = ARCHETYPES.COLLABORATOR
    description = 'A team player who thrives on collaboration and community engagement.'
    traits = ['Collaborative', 'Communicative', 'Helpful']
  }
  // Explorer
  else if (stats.languages.length >= 5) {
    archetype = ARCHETYPES.EXPLORER
    description = 'A curious polyglot always exploring new technologies and languages.'
    traits = ['Curious', 'Adaptable', 'Versatile']
  }
  // Speedrunner
  else if (stats.avgCommitSize === 'large' && stats.commits > 1000) {
    archetype = ARCHETYPES.SPEEDRUNNER
    description = 'A fast-paced developer who ships code quickly and efficiently.'
    traits = ['Fast', 'Decisive', 'Action-oriented']
  }
  // Craftsperson
  else if (stats.avgCommitSize === 'small' && stats.commits > 500) {
    archetype = ARCHETYPES.CRAFTSPERSON
    description = 'A meticulous developer who values quality and careful craftsmanship.'
    traits = ['Careful', 'Detail-oriented', 'Thoughtful']
  }
  // Maintainer
  else if (stats.commits > 300 && stats.repoCount < 10) {
    archetype = ARCHETYPES.MAINTAINER
    description = 'A reliable maintainer providing steady, consistent contributions.'
    traits = ['Reliable', 'Steady', 'Dependable']
  }
  // Builder (default)
  else {
    archetype = ARCHETYPES.BUILDER
    description = 'A focused builder who creates meaningful projects with dedication.'
    traits = ['Focused', 'Dedicated', 'Persistent']
  }

  return {
    archetype,
    description,
    traits,
  }
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
