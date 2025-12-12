/**
 * React Query Hook: Wrap Generation
 * Fetches and generates wrap data for a user
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { AnalyzeResponse, WrapData } from '@/lib/types'

export function useWrapGeneration(username: string | null) {
  return useQuery({
    queryKey: ['wrap', username],
    queryFn: async (): Promise<WrapData> => {
      if (!username) {
        throw new Error('Username is required')
      }

      const response = await axios.get<AnalyzeResponse>(
        `/api/analyze/${username}`
      )

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error || 'Failed to generate wrap')
      }

      return response.data.data
    },
    enabled: !!username, // Only run query if username is provided
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 48 * 60 * 60 * 1000, // 48 hours (formerly cacheTime)
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
