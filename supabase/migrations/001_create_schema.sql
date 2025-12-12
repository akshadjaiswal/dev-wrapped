-- DevWrapped Database Schema
-- This migration creates all necessary tables for the DevWrapped application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: wraps
-- Stores complete developer wrap data
-- ============================================
CREATE TABLE IF NOT EXISTS wraps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- User Information
  username VARCHAR(100) NOT NULL,
  display_name VARCHAR(200),
  avatar_url TEXT,
  year INTEGER DEFAULT 2024,

  -- GitHub Raw Stats
  total_commits INTEGER DEFAULT 0,
  total_repos INTEGER DEFAULT 0,
  public_repos INTEGER DEFAULT 0,
  new_repos_2024 INTEGER DEFAULT 0,
  total_stars INTEGER DEFAULT 0,
  total_forks INTEGER DEFAULT 0,
  followers INTEGER DEFAULT 0,

  -- Language Data
  primary_language VARCHAR(50),
  languages JSONB DEFAULT '[]'::jsonb,

  -- Activity Patterns
  most_active_month VARCHAR(20),
  longest_streak INTEGER DEFAULT 0,
  coding_time_preference VARCHAR(20),
  peak_hour INTEGER,

  -- Top Repository
  top_repo_name VARCHAR(200),
  top_repo_commits INTEGER DEFAULT 0,
  top_repo_language VARCHAR(50),
  top_repo_stars INTEGER DEFAULT 0,

  -- Collaboration
  prs_created INTEGER DEFAULT 0,
  issues_closed INTEGER DEFAULT 0,
  repos_contributed INTEGER DEFAULT 0,

  -- Calculated Insights
  commits_per_day DECIMAL(10, 2) DEFAULT 0,
  growth_vs_last_year DECIMAL(10, 2),
  developer_personality VARCHAR(100),
  personality_description TEXT,
  personality_traits JSONB DEFAULT '[]'::jsonb,

  -- Fun Stats
  fix_commits INTEGER DEFAULT 0,
  avg_commit_msg_length INTEGER DEFAULT 0,
  late_night_commits_percent INTEGER DEFAULT 0,
  fastest_commit_day VARCHAR(20),
  fastest_commit_count INTEGER DEFAULT 0,

  -- Contribution Data (for heatmap)
  contribution_data JSONB DEFAULT '[]'::jsonb,

  -- Monthly Activity (for charts)
  monthly_activity JSONB DEFAULT '[]'::jsonb,

  -- Metadata
  theme_selected VARCHAR(50),
  view_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,

  -- Constraints
  UNIQUE(username, year)
);

-- Create indexes for better query performance
CREATE INDEX idx_wraps_username ON wraps(username);
CREATE INDEX idx_wraps_year ON wraps(year);
CREATE INDEX idx_wraps_created_at ON wraps(created_at DESC);
CREATE INDEX idx_wraps_username_year ON wraps(username, year);

-- ============================================
-- TABLE: shares
-- Tracks social sharing events
-- ============================================
CREATE TABLE IF NOT EXISTS shares (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  wrap_id UUID NOT NULL REFERENCES wraps(id) ON DELETE CASCADE,
  platform VARCHAR(20) NOT NULL CHECK (platform IN ('twitter', 'linkedin', 'download', 'link'))
);

-- Create indexes
CREATE INDEX idx_shares_wrap_id ON shares(wrap_id);
CREATE INDEX idx_shares_created_at ON shares(created_at DESC);
CREATE INDEX idx_shares_platform ON shares(platform);

-- ============================================
-- TABLE: analytics
-- Tracks application events for insights
-- ============================================
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  event VARCHAR(50) NOT NULL CHECK (event IN (
    'username_entered',
    'theme_selected',
    'wrap_viewed',
    'slide_viewed',
    'share_clicked',
    'generation_completed',
    'error_occurred'
  )),
  username VARCHAR(100),
  theme VARCHAR(50),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes
CREATE INDEX idx_analytics_event ON analytics(event);
CREATE INDEX idx_analytics_created_at ON analytics(created_at DESC);
CREATE INDEX idx_analytics_username ON analytics(username);

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_wraps_updated_at
    BEFORE UPDATE ON wraps
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(wrap_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE wraps
    SET view_count = view_count + 1
    WHERE id = wrap_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to increment share count
CREATE OR REPLACE FUNCTION increment_share_count(wrap_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE wraps
    SET share_count = share_count + 1
    WHERE id = wrap_uuid;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Enable read access for everyone, write for service role
-- ============================================

-- Enable RLS
ALTER TABLE wraps ENABLE ROW LEVEL SECURITY;
ALTER TABLE shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Wraps: Allow anonymous read access
CREATE POLICY "Allow anonymous read access on wraps"
ON wraps FOR SELECT
TO anon
USING (true);

-- Wraps: Allow service role full access
CREATE POLICY "Allow service role full access on wraps"
ON wraps
TO service_role
USING (true)
WITH CHECK (true);

-- Shares: Allow anonymous insert (for tracking shares)
CREATE POLICY "Allow anonymous insert on shares"
ON shares FOR INSERT
TO anon
WITH CHECK (true);

-- Shares: Allow service role full access
CREATE POLICY "Allow service role full access on shares"
ON shares
TO service_role
USING (true)
WITH CHECK (true);

-- Analytics: Allow anonymous insert (for tracking events)
CREATE POLICY "Allow anonymous insert on analytics"
ON analytics FOR INSERT
TO anon
WITH CHECK (true);

-- Analytics: Allow service role full access
CREATE POLICY "Allow service role full access on analytics"
ON analytics
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================
-- SAMPLE QUERIES (FOR REFERENCE)
-- ============================================

-- Get wrap by username and year
-- SELECT * FROM wraps WHERE username = 'octocat' AND year = 2024;

-- Get total wraps generated
-- SELECT COUNT(*) FROM wraps;

-- Get most popular themes
-- SELECT theme_selected, COUNT(*) as count
-- FROM wraps
-- WHERE theme_selected IS NOT NULL
-- GROUP BY theme_selected
-- ORDER BY count DESC;

-- Get share statistics
-- SELECT platform, COUNT(*) as count
-- FROM shares
-- GROUP BY platform
-- ORDER BY count DESC;

-- Get analytics by event type
-- SELECT event, COUNT(*) as count
-- FROM analytics
-- GROUP BY event
-- ORDER BY count DESC;

-- Get most viewed wraps
-- SELECT username, year, view_count, share_count
-- FROM wraps
-- ORDER BY view_count DESC
-- LIMIT 10;

-- ============================================
-- END OF SCHEMA
-- ============================================
