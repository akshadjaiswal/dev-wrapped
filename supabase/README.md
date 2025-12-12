# DevWrapped Supabase Setup

## Database Schema

The DevWrapped application uses Supabase (PostgreSQL) for data storage with three main tables:

### Tables

1. **wraps** - Stores complete developer wrap data
2. **shares** - Tracks social sharing events
3. **analytics** - Tracks application events for insights

## Setup Instructions

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the contents of `migrations/001_create_schema.sql`
4. Paste and run the migration
5. Verify tables were created successfully

### Option 2: Using Supabase CLI

```bash
# Initialize Supabase (if not already done)
supabase init

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push

# Or apply the specific migration
supabase migration up
```

## Environment Variables

Make sure you have these variables in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Security

- **Row Level Security (RLS)** is enabled on all tables
- Anonymous users can:
  - Read wraps
  - Insert shares (for tracking)
  - Insert analytics (for tracking)
- Service role has full access for API operations

## Key Features

- **Automatic timestamps**: `created_at` and `updated_at` are managed automatically
- **UUID primary keys**: All tables use UUID for primary keys
- **JSONB fields**: Flexible storage for arrays and complex data
- **Indexes**: Optimized queries on frequently accessed columns
- **Helper functions**: `increment_view_count()` and `increment_share_count()`

## Testing

After running the migration, test with these queries:

```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';

-- Test insert
INSERT INTO wraps (username, year, display_name)
VALUES ('testuser', 2024, 'Test User');

-- Verify insert
SELECT * FROM wraps WHERE username = 'testuser';
```

## Backup

Regular backups are handled by Supabase automatically. For manual backups:

```bash
# Using Supabase CLI
supabase db dump -f backup.sql
```
