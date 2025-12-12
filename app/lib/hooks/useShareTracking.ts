/**
 * React Query Hook: Share Tracking
 * Tracks share events
 */

'use client'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import type { ShareResponse } from '@/lib/types'

interface ShareParams {
  wrapId: string
  platform: 'twitter' | 'linkedin' | 'download' | 'link'
}

export function useShareTracking() {
  return useMutation({
    mutationFn: async ({ wrapId, platform }: ShareParams): Promise<void> => {
      const response = await axios.post<ShareResponse>(`/api/share/${wrapId}`, {
        platform,
      })

      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to track share')
      }
    },
    onError: (error) => {
      // Don't throw errors for analytics failures
      console.error('Failed to track share:', error)
    },
  })
}
