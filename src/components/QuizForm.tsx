"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitAttempt } from "@/app/actions";
import { optionLabels } from "@/lib/quiz";
import type { QuestionRow } from "@/lib/types";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ShareButton } from "@/components/ShareButton";

type QuizFormProps = {
  quizId: string;
  title: string;
  creatorName: string;
  questions: QuestionRow[];
  shareUrl: string;
};

export const QuizForm = ({
  quizId,
  title,
  creatorName,
  questions,
  shareUrl,
}: QuizFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [userName, setUserName] = useState("");
  const [answers, setAnswers] = useState<Record<string, "A" | "B" | "C" | "D">>(
    {},
  );
  const [error, setError] = useState<string | null>(null);

  const allAnswered = useMemo(
    () => questions.every((question) => answers[question.id]),
    [answers, questions],
  );

  const handleSubmit = () => {
    if (!allAnswered) {
      setError("Answer every question to see your score.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await submitAttempt({
        quizId,
        userName,
        answers,
      });
      if (result?.error) {
        setError(result.error);
        return;
      }
      if (result?.attemptId) {
        if (result.shouldShowValentine) {
          router.push(`/valentine/${result.attemptId}`);
        } else {
          router.push(`/result/${result.attemptId}`);
        }
      }
    });
  };

  return (
    <div className="space-y-8">
      <Card className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-400">
          {creatorName}&apos;s quiz
        </p>
        <h1 className="font-display text-3xl text-rose-950">{title}</h1>
        <p className="text-sm text-rose-900/70">
          Drop your name if you want it on the leaderboard.
        </p>
        <ShareButton url={shareUrl} label="Copy quiz link" />
        <input
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          placeholder="Your name (optional)"
          className="w-full rounded-xl border border-rose-100 bg-white px-4 py-3 text-sm text-rose-900 shadow-sm focus:border-rose-300 focus:outline-none"
        />
      </Card>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <Card key={question.id} className="space-y-4">
            <p className="text-sm font-semibold text-rose-700">
              Q{index + 1}. {question.question_text}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {optionLabels.map((label) => {
                const value =
                  question[
                    `option_${label.toLowerCase()}` as "option_a"
                  ] as string;
                const isSelected = answers[question.id] === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        [question.id]: label,
                      }))
                    }
                    className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      isSelected
                        ? "border-rose-400 bg-rose-500 text-white shadow-md"
                        : "border-rose-100 bg-white text-rose-800 hover:border-rose-300"
                    }`}
                  >
                    <span className="mr-2 text-xs text-rose-300">
                      {label}.
                    </span>
                    {value}
                  </button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="button" onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Calculating..." : "See compatibility"}
        </Button>
        {error && <p className="text-sm text-rose-600">{error}</p>}
      </div>
    </div>
  );
};
