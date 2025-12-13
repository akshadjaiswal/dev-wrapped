/**
 * React Query hook for fetching wrap data
 */

import { useQuery } from '@tanstack/react-query'
import type { WrapData } from '@/lib/types'

interface WrapResponse {
  success: boolean
  data?: WrapData
  error?: string
  cached?: boolean
}

/**
 * Fetch wrap data by username and year
 */
export function useWrap(username: string, year: number) {
  return useQuery({
    queryKey: ['wrap', username, year],
    queryFn: async (): Promise<WrapData> => {
      const response = await fetch(`/api/analyze/${username}?year=${year}`)

      if (!response.ok) {
        throw new Error('Failed to fetch wrap data')
      }

      const result: WrapResponse = await response.json()

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to load wrap data')
      }

      return result.data
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 2,
  })
}
