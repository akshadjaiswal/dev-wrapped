/**
 * API Route: /api/wrap/[id]
 * Retrieves wrap data by ID
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { WrapResponse, WrapData } from '@/lib/types'

export const runtime = 'nodejs'

/**
 * GET /api/wrap/[id]
 * Retrieves a wrap by ID and increments view count
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Validate ID format (UUID)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return NextResponse.json<WrapResponse>(
        {
          success: false,
          error: 'Invalid wrap ID format',
        },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Fetch wrap data
    const { data: wrap, error } = await supabase
      .from('wraps')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !wrap) {
      return NextResponse.json<WrapResponse>(
        {
          success: false,
          error: 'Wrap not found',
        },
        { status: 404 }
      )
    }

    // Increment view count (fire and forget)
    supabase.rpc('increment_view_count', { wrap_uuid: id }).then()

    return NextResponse.json<WrapResponse>({
      success: true,
      data: wrap as WrapData,
    })
  } catch (error) {
    console.error('[WRAP] Error:', error)
    return NextResponse.json<WrapResponse>(
      {
        success: false,
        error: 'Failed to retrieve wrap data',
      },
      { status: 500 }
    )
  }
}
