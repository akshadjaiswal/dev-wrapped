/**
 * React Query Hook: Wrap Data by ID
 * Fetches wrap data by wrap ID
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { WrapResponse, WrapData } from '@/lib/types'

export function useWrapData(wrapId: string | null) {
  return useQuery({
    queryKey: ['wrapById', wrapId],
    queryFn: async (): Promise<WrapData> => {
      if (!wrapId) {
        throw new Error('Wrap ID is required')
      }

      const response = await axios.get<WrapResponse>(`/api/wrap/${wrapId}`)

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error || 'Failed to fetch wrap')
      }

      return response.data.data
    },
    enabled: !!wrapId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  })
}
