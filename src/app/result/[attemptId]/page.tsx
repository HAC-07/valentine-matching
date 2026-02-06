import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Shell } from "@/components/Shell";
import { Card } from "@/components/Card";
import { ShareButton } from "@/components/ShareButton";
import { formatPercentage, scoreMessage } from "@/lib/quiz";

type PageProps = {
  params: Promise<{ attemptId: string }>;
};

export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }: PageProps) => {
  const { attemptId } = await params;
  return {
    title: "Your result",
    openGraph: {
      images: [`/og/result/${attemptId}`],
    },
    twitter: {
      images: [`/og/result/${attemptId}`],
    },
  };
};

export default async function ResultPage({ params }: PageProps) {
  const { attemptId } = await params;
  const { data: attempt, error: attemptError } = await supabase
    .from("attempts")
    .select("id, quiz_id, user_name, score, percentage, created_at")
    .eq("id", attemptId)
    .single();

  if (attemptError || !attempt) {
    notFound();
  }

  const { data: quiz, error: quizError } = await supabase
    .from("quizzes")
    .select("id, creator_name, title")
    .eq("id", attempt.quiz_id)
    .single();

  if (quizError || !quiz) {
    notFound();
  }

  const { data: answers, error: answersError } = await supabase
    .from("attempt_answers")
    .select(
      "id, selected_option, is_correct, question:questions(question_text, option_a, option_b, option_c, option_d, correct_option)",
    )
    .eq("attempt_id", attempt.id);

  if (answersError || !answers) {
    notFound();
  }

  const { data: leaderboard } = await supabase
    .from("attempts")
    .select("id, user_name, score, percentage, created_at")
    .eq("quiz_id", attempt.quiz_id)
    .order("score", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(10);

  const correctAnswers = answers.filter((answer) => answer.is_correct);
  const missedAnswers = answers.filter((answer) => !answer.is_correct);

  const shareUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <Card className="space-y-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-400">
            Compatibility score
          </p>
          <div className="inline-flex items-baseline justify-center gap-3 rounded-full bg-rose-50 px-6 py-3">
            <span className="font-display text-5xl text-rose-950">
              {formatPercentage(attempt.percentage)}%
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
              vibe match
            </span>
          </div>
          <p className="text-sm font-semibold text-rose-700">
            {scoreMessage(attempt.percentage)}
          </p>
          <p className="text-sm text-rose-900/70">
            {attempt.user_name
              ? `${attempt.user_name} vs. ${quiz.creator_name}`
              : `How well do you know ${quiz.creator_name}?`}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ShareButton
              url={`${shareUrl}/result/${attempt.id}`}
              label="Share result"
            />
            <ShareButton
              url={`${shareUrl}/quiz/${quiz.id}`}
              label="Share quiz"
            />
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <Card className="space-y-4">
              <h2 className="font-display text-2xl text-rose-950">
                Correct answers ({correctAnswers.length})
              </h2>
              <ul className="space-y-3 text-sm text-rose-900/70">
                {correctAnswers.map((answer) => {
                  const question = Array.isArray(answer.question)
                    ? answer.question[0]
                    : answer.question;
                  return (
                    <li key={answer.id} className="rounded-xl bg-rose-50 px-4 py-3">
                      {question?.question_text}
                    </li>
                  );
                })}
              </ul>
            </Card>
            <Card className="space-y-4">
              <h2 className="font-display text-2xl text-rose-950">
                Missed answers ({missedAnswers.length})
              </h2>
              <ul className="space-y-3 text-sm text-rose-900/70">
                {missedAnswers.map((answer) => {
                  const question = Array.isArray(answer.question)
                    ? answer.question[0]
                    : answer.question;
                  if (!question) return null;
                  const options = {
                    A: question.option_a,
                    B: question.option_b,
                    C: question.option_c,
                    D: question.option_d,
                  };
                  return (
                    <li
                      key={answer.id}
                      className="rounded-xl border border-rose-100 bg-white px-4 py-3"
                    >
                      <p className="font-semibold text-rose-900">
                        {question.question_text}
                      </p>
                      <p className="text-xs text-rose-500">
                        Your pick: {answer.selected_option} · Correct:{" "}
                        {question.correct_option}
                      </p>
                      <p className="text-xs text-rose-700">
                        Correct answer:{" "}
                        {options[question.correct_option as keyof typeof options]}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="space-y-4">
              <h2 className="font-display text-2xl text-rose-950">
                Leaderboard
              </h2>
              {leaderboard && leaderboard.length > 0 ? (
                <ul className="space-y-3 text-sm text-rose-900/70">
                  {leaderboard.map((entry, index) => (
                    <li
                      key={entry.id}
                      className="flex items-center justify-between rounded-xl bg-rose-50 px-4 py-3"
                    >
                      <span>
                        {index + 1}. {entry.user_name ?? "Anonymous"}
                      </span>
                      <span className="font-semibold text-rose-700">
                        {formatPercentage(entry.percentage)}%
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-rose-900/70">
                  No attempts yet. Share your quiz link to see players appear
                  here.
                </p>
              )}
            </Card>
            <Card className="space-y-4 text-center">
              <p className="text-sm text-rose-900/70">
                Want your own leaderboard?
              </p>
              <a
                href="/create"
                className="inline-flex items-center justify-center rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-rose-600"
              >
                Create your quiz
              </a>
            </Card>
          </div>
        </div>
      </div>
    </Shell>
  );
}

