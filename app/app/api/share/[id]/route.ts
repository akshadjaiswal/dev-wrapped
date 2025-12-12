/**
 * API Route: /api/share/[id]
 * Tracks share events
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { ShareResponse } from '@/lib/types'

export const runtime = 'nodejs'

/**
 * POST /api/share/[id]
 * Records a share event and increments share count
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Validate ID format (UUID)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return NextResponse.json<ShareResponse>(
        {
          success: false,
          error: 'Invalid wrap ID format',
        },
        { status: 400 }
      )
    }

    // Get platform from request body
    const body = await request.json()
    const { platform } = body

    // Validate platform
    const validPlatforms = ['twitter', 'linkedin', 'download', 'link']
    if (!platform || !validPlatforms.includes(platform)) {
      return NextResponse.json<ShareResponse>(
        {
          success: false,
          error: 'Invalid platform',
        },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Check if wrap exists
    const { data: wrap } = await supabase
      .from('wraps')
      .select('id')
      .eq('id', id)
      .single()

    if (!wrap) {
      return NextResponse.json<ShareResponse>(
        {
          success: false,
          error: 'Wrap not found',
        },
        { status: 404 }
      )
    }

    // Record share event
    const { error: shareError } = await supabase.from('shares').insert({
      wrap_id: id,
      platform,
    })

    if (shareError) {
      console.error('[SHARE] Error recording share:', shareError)
    }

    // Increment share count (fire and forget)
    supabase.rpc('increment_share_count', { wrap_uuid: id }).then()

    return NextResponse.json<ShareResponse>({
      success: true,
    })
  } catch (error) {
    console.error('[SHARE] Error:', error)
    return NextResponse.json<ShareResponse>(
      {
        success: false,
        error: 'Failed to record share event',
      },
      { status: 500 }
    )
  }
}
