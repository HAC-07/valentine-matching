"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

type ValentinePromptProps = {
  creatorName: string;
  quizId: string;
};

export const ValentinePrompt = ({
  creatorName,
  quizId,
}: ValentinePromptProps) => {
  const router = useRouter();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [celebrating, setCelebrating] = useState(false);

  const dodge = () => {
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 100;
    setOffset({ x: randomX, y: randomY });
  };

  const handleYes = () => {
    // Warm up the leaderboard route so redirect feels instant
    router.prefetch(`/quiz/${quizId}/leaderboard`);
    setCelebrating(true);
    setTimeout(() => {
      router.push(`/quiz/${quizId}/leaderboard`);
    }, 12000);
  };

  return (
    <div className="relative space-y-6 text-center">
      {celebrating ? (
        <div className="space-y-3">
          <p className="font-display text-3xl text-rose-950">
            It&apos;s a yes. You two are officially Valentine material. 💘
          </p>
          <p className="text-sm text-rose-900/70">
            Screenshot this moment and send it to {creatorName}.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-rose-900/70">
            Looks like you know {creatorName} a little too well...
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button type="button" onClick={handleYes}>
              Yes, be my Valentine
            </Button>
            <button
              type="button"
              onMouseEnter={dodge}
              onMouseMove={dodge}
              className="relative rounded-full border border-rose-200 bg-white px-6 py-3 text-sm font-semibold text-rose-700 shadow-sm transition"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                transition: "transform 160ms ease-out",
              }}
            >
              No 😅
            </button>
          </div>
        </>
      )}
      {celebrating &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
            {Array.from({ length: 150 }).map((_, index) => {
              const left = Math.random() * 100;
              const delay = Math.random(); // small, so stream starts quickly
              const duration = 4 + Math.random() * 3;
              const size = 18 + Math.random() * 10;
              return (
                <span
                  key={`petal-${index}`}
                  className="valentine-petal"
                  style={{
                    left: `${left}%`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                    fontSize: `${size}px`,
                  }}
                >
                  🌸
                </span>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
};

