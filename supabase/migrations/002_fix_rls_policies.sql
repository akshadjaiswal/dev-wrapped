-- ============================================
-- FIX 1: wraps — add missing INSERT + UPDATE for anon
-- ============================================

-- Upsert in /api/analyze needs INSERT when row doesn't exist
CREATE POLICY "Allow anonymous insert on wraps"
  ON wraps FOR INSERT
  TO anon
  WITH CHECK (true);

-- Upsert conflict path + RPC increment_view_count/increment_share_count need UPDATE
CREATE POLICY "Allow anonymous update on wraps"
  ON wraps FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- ============================================
-- FIX 2: analytics — RLS enabled but NO policies exist in DB
-- ============================================

-- Enable RLS (idempotent — safe to run even if already enabled)
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Allow browser anon client (analytics.ts uses createBrowserClient with anon key)
CREATE POLICY "Allow anonymous insert on analytics"
  ON analytics FOR INSERT
  TO anon
  WITH CHECK (true);

-- Service role full access
CREATE POLICY "Allow service role full access on analytics"
  ON analytics
  TO service_role
  USING (true)
  WITH CHECK (true);
