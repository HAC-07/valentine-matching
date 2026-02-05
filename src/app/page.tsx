import Link from "next/link";
import { Card } from "@/components/Card";
import { Shell } from "@/components/Shell";

export default function Home() {
  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-400">
              Valentine Vibe Check
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-rose-950 sm:text-5xl">
              Create a love-quiz and see who really gets your vibe.
            </h1>
            <p className="max-w-xl text-base leading-7 text-rose-900/80">
              Ask about your little quirks, favorites, and red flags. Share one
              link, and let your crush or friends find out how compatible they
              really are.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/create"
                className="rounded-full pill-soft px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Start my love quiz
              </Link>
              <Link
                href="#how-it-works"
                className="rounded-full border border-rose-200 bg-white/90 px-6 py-3 text-sm font-semibold text-rose-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-rose-300 hover:text-rose-800"
              >
                How it works
              </Link>
            </div>
          </div>
          <div id="how-it-works">
            <Card className="space-y-6 heart-glow">
              <div className="badge-soft inline-flex rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
                how it works
              </div>
              <ol className="space-y-4 text-sm text-rose-900/80">
                <li>
                  1. Add 1–12 questions about your love language, green flags,
                  and inside jokes.
                </li>
                <li>
                  2. Share your unique link with friends, your crush, or
                  partner.
                </li>
                <li>
                  3. Scores and a cozy leaderboard appear instantly for
                  bragging rights.
                </li>
              </ol>
              <div className="rounded-xl border border-rose-100 bg-white px-4 py-3 text-xs text-rose-700">
                Zero logins. Zero drama. Just feelings, vibes, and screenshots.
              </div>
            </Card>
          </div>
        </section>
        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Shareable links",
              text: "Every quiz has a unique URL and built-in social previews.",
            },
            {
              title: "Instant scoring",
              text: "Auto-scored answers with percentage vibes in seconds.",
            },
            {
              title: "Leaderboard hype",
              text: "Top 10 ranking for each quiz, sorted by score + recency.",
            },
          ].map((item) => (
            <Card key={item.title} className="space-y-2">
              <h3 className="font-display text-lg text-rose-950">
                {item.title}
              </h3>
              <p className="text-sm leading-6 text-rose-900/70">{item.text}</p>
            </Card>
          ))}
        </section>
      </div>
    </Shell>
  );
}

