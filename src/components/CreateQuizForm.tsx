"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createQuiz } from "@/app/actions";
import type { CreateQuestion } from "@/lib/types";
import { optionLabels } from "@/lib/quiz";
import { getSiteUrl } from "@/lib/site";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

const emptyQuestion = (): CreateQuestion => ({
  questionText: "",
  options: ["", "", "", ""],
  correctOption: "A",
});

const commonQuestions = [
  "What’s my ideal perfect date?",
  "What’s my love language?",
  "How do I like to be comforted when I’m sad?",
  "What’s my biggest ick?",
  "Which snack am I always craving?",
  "Which movie or show is our vibe?",
  "What song feels like \"us\"?",
  "Where would I love to travel with you?",
  "What little habit of mine do you think is cutest?",
  "When did we first start talking?",
] as const;

export const CreateQuizForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [creatorName, setCreatorName] = useState("");
  const [title, setTitle] = useState("How well do you know me?");
  const [valentineThreshold, setValentineThreshold] = useState(100);
  const [questions, setQuestions] = useState<CreateQuestion[]>(
    [emptyQuestion()],
  );
  const [error, setError] = useState<string | null>(null);
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);

  const canAddMore = questions.length < 12;
  const canRemove = questions.length > 1;

  const isValid = useMemo(() => {
    if (!creatorName.trim() || !title.trim()) return false;
    return questions.every((question) => {
      if (!question.questionText.trim()) return false;
      if (question.options.some((option) => !option.trim())) return false;
      return true;
    });
  }, [creatorName, title, questions]);

  const addCommonQuestion = (text: string) => {
    setQuestions((prev) => {
      // Try to fill the first empty question text
      const emptyIndex = prev.findIndex(
        (q) => !q.questionText.trim(),
      );
      if (emptyIndex !== -1) {
        const next = [...prev];
        next[emptyIndex] = { ...next[emptyIndex], questionText: text };
        return next;
      }
      // Otherwise append a new one if allowed
      if (prev.length >= 12) return prev;
      return [
        ...prev,
        {
          ...emptyQuestion(),
          questionText: text,
        },
      ];
    });
  };

  const updateQuestion = (index: number, patch: Partial<CreateQuestion>) => {
    setQuestions((prev) =>
      prev.map((question, idx) =>
        idx === index ? { ...question, ...patch } : question,
      ),
    );
  };

  const updateOption = (index: number, optionIndex: number, value: string) => {
    setQuestions((prev) =>
      prev.map((question, idx) => {
        if (idx !== index) return question;
        const nextOptions = [...question.options] as CreateQuestion["options"];
        nextOptions[optionIndex] = value;
        return { ...question, options: nextOptions };
      }),
    );
  };

  const handleSubmit = () => {
    setError(null);
    setCopiedMessage(null);
    startTransition(async () => {
      const result = await createQuiz({
        creatorName,
        title,
        valentineThreshold,
        questions,
      });
      if (result?.error) {
        setError(result.error);
        return;
      }
      if (result?.quizId) {
        // Auto-copy the quiz link right after creation (best-effort).
        try {
          await navigator.clipboard.writeText(`${getSiteUrl()}/quiz/${result.quizId}`);
          setCopiedMessage("Copied quiz link!");
        } catch {
          // ignore (clipboard may be blocked by browser settings)
        }
        router.push(`/quiz/${result.quizId}/leaderboard`);
      }
    });
  };

  return (
    <div className="space-y-8">
      <Card className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-rose-900">
            Creator name
          </label>
          <input
            value={creatorName}
            onChange={(event) => setCreatorName(event.target.value)}
            placeholder="e.g. Himanshu"
            className="w-full rounded-xl border border-rose-100 bg-white px-4 py-3 text-sm text-rose-900 shadow-sm focus:border-rose-300 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-rose-900">
            Quiz title
          </label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-xl border border-rose-100 bg-white px-4 py-3 text-sm text-rose-900 shadow-sm focus:border-rose-300 focus:outline-none"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 sm:items-end">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-rose-900">
              Valentine screen threshold
            </label>
            <select
              value={valentineThreshold}
              onChange={(event) =>
                setValentineThreshold(Number(event.target.value))
              }
              className="w-full rounded-xl border border-rose-100 bg-white px-4 py-3 text-sm text-rose-900 shadow-sm focus:border-rose-300 focus:outline-none"
            >
              {[100, 90, 80, 70].map((value) => (
                <option key={value} value={value}>
                  Show &quot;Will you be my Valentine?&quot; at {value}% or more
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-400">
            Popular question ideas
          </p>
          <div className="flex flex-wrap gap-2">
            {commonQuestions.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => addCommonQuestion(q)}
                className="rounded-full border border-rose-100 bg-rose-50 px-3 py-1.5 text-xs text-rose-700 transition hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-100"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <Card key={index} className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-rose-700">
                Question {index + 1}
              </p>
              {canRemove && (
                <button
                  type="button"
                  onClick={() =>
                    setQuestions((prev) =>
                      prev.filter((_, idx) => idx !== index),
                    )
                  }
                  className="text-xs font-semibold text-rose-400 hover:text-rose-600"
                >
                  Remove
                </button>
              )}
            </div>
            <input
              value={question.questionText}
              onChange={(event) =>
                updateQuestion(index, { questionText: event.target.value })
              }
              placeholder="Type your question..."
              className="w-full rounded-xl border border-rose-100 bg-white px-4 py-3 text-sm text-rose-900 shadow-sm focus:border-rose-300 focus:outline-none"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="space-y-2">
                  <label className="text-xs font-semibold text-rose-500">
                    Option {optionLabels[optionIndex]}
                  </label>
                  <input
                    value={option}
                    onChange={(event) =>
                      updateOption(index, optionIndex, event.target.value)
                    }
                    placeholder={`Option ${optionLabels[optionIndex]}`}
                    className="w-full rounded-xl border border-rose-100 bg-white px-3 py-2 text-sm text-rose-900 shadow-sm focus:border-rose-300 focus:outline-none"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {optionLabels.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() =>
                    updateQuestion(index, { correctOption: label })
                  }
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    question.correctOption === label
                      ? "bg-rose-500 text-white"
                      : "border border-rose-100 bg-white text-rose-600 hover:border-rose-300"
                  }`}
                >
                  Correct: {label}
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {canAddMore && (
          <button
            type="button"
            onClick={() =>
              setQuestions((prev) => [...prev, emptyQuestion()])
            }
            className="rounded-full border border-rose-200 bg-white px-5 py-2 text-sm font-semibold text-rose-700 transition hover:-translate-y-0.5 hover:border-rose-300 hover:text-rose-800"
          >
            Add another question
          </button>
        )}
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid || isPending}
        >
          {isPending ? "Creating..." : "Create my quiz"}
        </Button>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        {copiedMessage && (
          <p className="text-sm font-semibold text-rose-700">{copiedMessage}</p>
        )}
      </div>
    </div>
  );
};

