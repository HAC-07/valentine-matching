import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Shell } from "@/components/Shell";
import { Card } from "@/components/Card";
import { ShareButton } from "@/components/ShareButton";
import { LiveLeaderboard } from "@/components/LiveLeaderboard";

type PageProps = {
  params: Promise<{ quizId: string }>;
};

export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }: PageProps) => {
  const { quizId } = await params;
  return {
    title: "Quiz leaderboard",
    openGraph: {
      images: [`/og/quiz/${quizId}`],
    },
    twitter: {
      images: [`/og/quiz/${quizId}`],
    },
  };
};

export default async function QuizLeaderboardPage({ params }: PageProps) {
  const { quizId } = await params;
  const { data: quiz, error: quizError } = await supabase
    .from("quizzes")
    .select("id, creator_name, title")
    .eq("id", quizId)
    .single();

  if (quizError || !quiz) {
    notFound();
  }

  const { data: leaderboard } = await supabase
    .from("attempts")
    .select("id, quiz_id, user_name, score, percentage, created_at")
    .eq("quiz_id", quiz.id)
    .order("score", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(10);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const quizUrl = `${baseUrl}/quiz/${quiz.id}`;
  const leaderboardUrl = `${baseUrl}/quiz/${quiz.id}/leaderboard`;

  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <Card className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-400">
            Quiz leaderboard
          </p>
          <h1 className="font-display text-3xl text-rose-950">
            Leaderboard for &quot;{quiz.title}&quot;
          </h1>
          <p className="text-sm text-rose-900/70">
            Anyone with this link can see the scores. Share it if you want your
            friends (or your crush) to peek at the rankings.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ShareButton url={quizUrl} label="Copy quiz link" />
            <ShareButton
              url={leaderboardUrl}
              label="Copy leaderboard link"
            />
          </div>
        </Card>

        <LiveLeaderboard
          quizId={quiz.id}
          initialAttempts={leaderboard ?? []}
        />
      </div>
    </Shell>
  );
}

