# Next-Gen Learning Dashboard

A high-fidelity student dashboard prototype built for the Frontend Intern Challenge. It uses Next.js App Router, Supabase server-side data fetching, Tailwind CSS, Framer Motion, and Lucide React.

## Features

- Dark-only futuristic Bento Grid dashboard
- Functional responsive navigation with Framer Motion `layoutId` highlight animation
- Interactive sections for Home, Courses, Analytics, Planner, and Settings
- Supabase-backed course tiles fetched in a React Server Component
- Animated course progress bars and staggered Bento tile entrance
- Analytics cards, activity graph, skill-balance bars, focus queue, planner tasks, and profile settings
- Skeleton loading state through `Suspense` and `app/loading.tsx`
- Graceful database/environment error state
- Responsive layouts for desktop, tablet, and mobile

## Tech Stack

- Next.js App Router
- TypeScript
- Supabase PostgreSQL through `@supabase/supabase-js`
- Tailwind CSS
- Framer Motion
- Lucide React

## Supabase Setup

1. Create a Supabase project.
2. Open the SQL editor and run `supabase-schema.sql`.
3. Copy `.env.example` to `.env.local`.
4. Fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

The `courses` table schema:

- `id` uuid primary key
- `title` text
- `progress` integer
- `icon_name` text
- `created_at` timestamp

## Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Architecture Notes

`app/page.tsx` is a server-rendered route that wraps the dashboard in `Suspense`. `components/dashboard-content.tsx` fetches course data on the server through `lib/supabase.ts`, then passes the typed payload into `components/dashboard-app.tsx`.

`DashboardApp` owns the active navigation state on the client, so the sidebar buttons open complete dashboard sections instead of only changing their own visual state. `components/animated-dashboard.tsx` handles the section transitions and Bento content, while `CourseCard` renders dynamic Supabase courses.

The UI is split into reusable components: `Sidebar`, `BentoTile`, `CourseCard`, `ActivityGraph`, `DashboardApp`, and `DashboardSkeleton`. Motion uses `transform` and `opacity` for entrance and hover effects to avoid layout shifts.

## Submission Checklist

- Run `npm run build` before deploying.
- Add real Supabase values in Vercel project environment variables.
- Do not commit `.env.local`; `.env.example` is included for reviewers.
- Deploy on Vercel and connect the public GitHub repository.
