"use client";

import { useEffect, useState } from "react";
import { getStats } from "@/app/actions";
import { Card } from "@/components/Card";

export const StatsBanner = () => {
  const [stats, setStats] = useState<{
    totalVisits: number;
    activeUsers: number;
  } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getStats();
      setStats(data);
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <div className="mx-auto mb-6 w-full max-w-5xl">
        <div className="rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-50/80 to-pink-50/80 px-6 py-3 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2.5 text-sm text-rose-600">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-rose-300 border-t-rose-500"></span>
            <span>Loading stats...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-6 w-full max-w-5xl animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="group relative overflow-hidden rounded-2xl border border-rose-200/60 bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50/50 px-6 py-4 shadow-lg shadow-rose-100/50 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-rose-200/50">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
        <div className="relative flex items-center justify-center gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                💘
              </span>
              <span className="absolute -right-1 -top-1 h-2 w-2 animate-ping rounded-full bg-rose-400 opacity-75"></span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-rose-950 tabular-nums">
                {stats.totalVisits.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-rose-700">
                {stats.totalVisits === 1 ? "heart checked" : "hearts checked"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

