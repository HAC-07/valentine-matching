"use client";

import { useState } from "react";

type ShareButtonProps = {
  url: string;
  label?: string;
};

export const ShareButton = ({ url, label = "Copy link" }: ShareButtonProps) => {
  const [status, setStatus] = useState<"idle" | "copied">("idle");

  const handleCopy = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 1600);
    } catch {
      setStatus("idle");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-full border border-rose-200 bg-white px-5 py-2 text-sm font-semibold text-rose-700 transition hover:-translate-y-0.5 hover:border-rose-300 hover:text-rose-800"
    >
      {status === "copied" ? "Copied!" : label}
    </button>
  );
};

