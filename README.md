# Valentine Vibe Check

Production-ready MVP for a viral Valentine compatibility quiz.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Postgres + optional auth later)
- Vercel ready

## Features
- Create a quiz (8-12 questions, 4 options each, select correct answers)
- Share a unique quiz link
- Friends answer and get compatibility score
- Results page with fun message + breakdown
- Per-quiz leaderboard (top 10)
- Dynamic OpenGraph images for share cards

## Setup
1. Install dependencies
```bash
npm install
```

2. Create a Supabase project and run the schema
- In Supabase SQL Editor, run:
```sql
\i supabase/schema.sql
```
- (Optional) Seed data:
```sql
\i supabase/seed.sql
```

3. Add env vars
Create `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Run the dev server
```bash
npm run dev
```

Open `http://localhost:3000`.

## Deployment (Vercel)
- Add the same env vars in Vercel.
- Set `NEXT_PUBLIC_SITE_URL` to your deployed URL.

## Project Structure
- `src/app` – routes, pages, OG images, server actions
- `src/components` – reusable UI
- `src/lib` – Supabase client, types, helpers
- `supabase/schema.sql` – database schema + RLS policies
- `supabase/seed.sql` – sample data

## Notes
- No auth required for MVP (RLS allows public insert/select).
- Leaderboard uses score + latest attempt tiebreaker.

