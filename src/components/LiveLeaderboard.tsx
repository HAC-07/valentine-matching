"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { AttemptRow } from "@/lib/types";
import { Card } from "@/components/Card";
import { formatPercentage } from "@/lib/quiz";

type LiveLeaderboardProps = {
  quizId: string;
  initialAttempts: AttemptRow[];
};

export const LiveLeaderboard = ({
  quizId,
  initialAttempts,
}: LiveLeaderboardProps) => {
  const [attempts, setAttempts] = useState<AttemptRow[]>(initialAttempts);

  useEffect(() => {
    let cancelled = false;

    const fetchAttempts = async () => {
      const { data } = await supabase
        .from("attempts")
        .select("id, quiz_id, user_name, score, percentage, created_at")
        .eq("quiz_id", quizId)
        .order("score", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(10);

      if (!cancelled && data) {
        setAttempts(data as AttemptRow[]);
      }
    };

    // initial refresh plus interval polling
    fetchAttempts();
    const intervalId = setInterval(fetchAttempts, 4000);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, [quizId]);

  const attemptsCount = attempts.length;
  const topScore =
    attemptsCount > 0
      ? Math.max(...attempts.map((entry) => entry.percentage))
      : null;

  return (
    <Card className="space-y-4">
      <h2 className="font-display text-2xl text-rose-950">Leaderboard</h2>
      {attemptsCount > 0 && topScore !== null && (
        <p className="text-xs text-rose-500">
          💘 {attemptsCount} attempt{attemptsCount > 1 ? "s" : ""} so far · Top
          score: {formatPercentage(topScore)}%
        </p>
      )}
      {attemptsCount > 0 ? (
        <ul className="space-y-3 text-sm text-rose-900/70">
          {attempts.map((entry, index) => (
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
          No attempts yet. Share your quiz link to see players appear here.
        </p>
      )}
    </Card>
  );
};


