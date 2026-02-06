# Valentine Vibe Check 💘

A production-ready Valentine compatibility quiz app where you create personalized quizzes, share them with friends or your crush, and see who really knows you best.

## Stack
- **Next.js 16.1.6** (App Router with latest features)
- **TypeScript** (type-safe)
- **Tailwind CSS 4** (modern styling)
- **Supabase** (Postgres database with RLS)
- **Google Analytics** (tracking integrated)
- **Vercel ready** (optimized for deployment)

## Features

### Quiz Creation
- **Flexible question count**: Create quizzes with 1-12 questions (no minimum required)
- **Popular question presets**: Quick-add from 10 pre-written Valentine-themed questions
- **Customizable Valentine threshold**: Set when the special "Will you be my Valentine?" screen appears (70%, 80%, 90%, or 100%)
- **4 multiple-choice options** per question with correct answer selection

### Taking Quizzes
- **Clean, intuitive interface** with one question per card
- **Optional name entry** for leaderboard display
- **Instant scoring** with percentage-based compatibility score

### Results & Leaderboard
- **Beautiful result pages** with score breakdown (correct vs missed answers)
- **Live leaderboard**: Auto-updates every 4 seconds showing top 10 attempts
- **Shareable links**: Both quiz link and leaderboard link can be shared
- **Dynamic OpenGraph images** for beautiful social media previews

### Valentine Experience 🎉
- **Special Valentine page**: Appears when someone scores above your set threshold
- **Animated celebration**: Falling flower petals animation (90+ flowers) when "Yes" is clicked
- **Interactive "No" button**: Dodges cursor attempts (only "Yes" is clickable)
- **Auto-redirect**: After 12 seconds, redirects to leaderboard

### UI/UX Highlights
- **Romantic Valentine-themed design** with soft pink gradients and elegant typography
- **Responsive layout** works beautifully on mobile and desktop
- **Smooth animations** and transitions throughout
- **Accessible** with proper focus states and keyboard navigation

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase Database

Create a Supabase project at [supabase.com](https://supabase.com), then:

**Run the schema** in Supabase SQL Editor:
```sql
-- Copy and paste the contents of supabase/schema.sql
-- This creates tables: quizzes, questions, attempts, attempt_answers
-- And sets up RLS policies for public access
```

**Optional - Seed sample data:**
```sql
-- Copy and paste contents of supabase/seed.sql
```

### 3. Configure Environment Variables

Create `.env.local` in the project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Get these values from:** Supabase Dashboard → Project Settings → API

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Test on Mobile (Same Network)
```bash
npm run dev -- --hostname 0.0.0.0
```
Then access from your phone using your laptop's IP address (e.g., `http://192.168.1.100:3000`)

## Deployment

### Vercel (Recommended)

1. **Push to GitHub** (or connect your Git provider)
2. **Import project** in Vercel dashboard
3. **Add environment variables:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your Vercel deployment URL)
4. **Deploy** - Vercel will auto-detect Next.js and build

The app is optimized for Vercel with:
- Edge runtime for OG image generation
- Automatic static optimization
- Server-side rendering for dynamic routes

## Project Structure

```
valentine/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── create/            # Quiz creation page
│   │   ├── quiz/[quizId]/     # Take quiz page
│   │   │   └── leaderboard/   # Live leaderboard page
│   │   ├── result/[attemptId]/ # Results page
│   │   ├── valentine/[attemptId]/ # Valentine proposal page
│   │   └── og/                # Dynamic OG image routes
│   ├── components/            # React components
│   │   ├── CreateQuizForm.tsx
│   │   ├── QuizForm.tsx
│   │   ├── LiveLeaderboard.tsx
│   │   ├── ValentinePrompt.tsx
│   │   └── ...
│   └── lib/                   # Utilities
│       ├── supabase.ts        # Supabase client
│       ├── types.ts           # TypeScript types
│       └── quiz.ts            # Helper functions
├── supabase/
│   ├── schema.sql            # Database schema + RLS
│   └── seed.sql              # Sample data (optional)
└── public/
    └── valentine.jpg         # Logo/favicon image
```

## Key Features Explained

### Valentine Threshold
When creating a quiz, you can set a threshold (70-100%). If someone scores at or above this threshold, they'll see the special "Will you be my Valentine?" page instead of the regular results page.

### Live Leaderboard
The leaderboard automatically refreshes every 4 seconds using client-side polling, so you can watch scores update in real-time without refreshing the page.

### Popular Questions
Quick-add buttons for common Valentine-themed questions like:
- "What's my ideal perfect date?"
- "What's my love language?"
- "How do I like to be comforted when I'm sad?"
- And 7 more...

## Database Schema

- **quizzes**: Quiz metadata (creator name, title, valentine_threshold)
- **questions**: Quiz questions with 4 options and correct answer
- **attempts**: User attempts with score and percentage
- **attempt_answers**: Individual answer selections per attempt

All tables use Row Level Security (RLS) with public read/insert policies - no authentication required.

## Tech Notes

- **Next.js 16**: Uses latest App Router with async params (Promise-based)
- **TypeScript**: Fully typed for better DX
- **Tailwind CSS 4**: Modern utility-first styling
- **Supabase**: PostgreSQL with real-time capabilities (future-ready)
- **Google Analytics**: Integrated for tracking page views

## License

MIT - Feel free to use this for your own Valentine projects! 💘

