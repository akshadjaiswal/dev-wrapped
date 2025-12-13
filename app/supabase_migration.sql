-- ============================================
-- DEVWRAPPED DATABASE MIGRATION
-- Add missing columns to existing wraps table
-- ============================================

-- Run this in your Supabase SQL Editor to add missing columns

-- Add contribution data for heatmap (365 days)
ALTER TABLE wraps
ADD COLUMN IF NOT EXISTS contribution_data JSONB DEFAULT '[]'::jsonb;

-- Add monthly activity for charts (12 months)
ALTER TABLE wraps
ADD COLUMN IF NOT EXISTS monthly_activity JSONB DEFAULT '[]'::jsonb;

-- Add missing stats columns
ALTER TABLE wraps
ADD COLUMN IF NOT EXISTS fastest_commit_day VARCHAR(50),
ADD COLUMN IF NOT EXISTS fastest_commit_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_stars_earned INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS followers_gained INTEGER DEFAULT 0;

-- Add collaboration stats
ALTER TABLE wraps
ADD COLUMN IF NOT EXISTS total_prs INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS merged_prs INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS prs_reviewed INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_issues INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS issues_opened INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS days_active INTEGER DEFAULT 0;

-- Add personality summary
ALTER TABLE wraps
ADD COLUMN IF NOT EXISTS personality_summary TEXT;

-- ============================================
-- FIX UNIQUE CONSTRAINT FOR UPSERT
-- ============================================

-- Drop the old unique constraint on username only
ALTER TABLE wraps DROP CONSTRAINT IF EXISTS wraps_username_key;

-- Add a composite unique constraint on (username, year)
-- This allows same user to have wraps for different years
ALTER TABLE wraps ADD CONSTRAINT wraps_username_year_unique UNIQUE (username, year);

-- Add comments for documentation
COMMENT ON COLUMN wraps.contribution_data IS '365-day contribution heatmap data as JSON array';
COMMENT ON COLUMN wraps.monthly_activity IS '12-month activity chart data as JSON array';
COMMENT ON COLUMN wraps.total_stars_earned IS 'Total stars earned this year';
COMMENT ON COLUMN wraps.followers_gained IS 'New followers gained this year';
COMMENT ON COLUMN wraps.total_prs IS 'Total pull requests (created + reviewed)';
COMMENT ON COLUMN wraps.merged_prs IS 'Pull requests that were merged';
COMMENT ON COLUMN wraps.prs_reviewed IS 'Pull requests reviewed';
COMMENT ON COLUMN wraps.total_issues IS 'Total issues (opened + closed)';
COMMENT ON COLUMN wraps.issues_opened IS 'Issues opened';
COMMENT ON COLUMN wraps.days_active IS 'Total days with at least one commit';
COMMENT ON COLUMN wraps.personality_summary IS 'AI-generated personality summary';

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_wraps_days_active ON wraps (days_active DESC);
CREATE INDEX IF NOT EXISTS idx_wraps_total_commits ON wraps (total_commits DESC);

-- Helper function to increment view count (if not exists)
CREATE OR REPLACE FUNCTION increment_view_count(wrap_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE wraps
  SET view_count = view_count + 1,
      updated_at = NOW()
  WHERE id = wrap_uuid;
END;
$$ LANGUAGE plpgsql;

-- Helper function to increment share count (if not exists)
CREATE OR REPLACE FUNCTION increment_share_count(wrap_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE wraps
  SET share_count = share_count + 1,
      updated_at = NOW()
  WHERE id = wrap_uuid;
END;
$$ LANGUAGE plpgsql;

-- Verify the changes
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'wraps'
ORDER BY ordinal_position;
