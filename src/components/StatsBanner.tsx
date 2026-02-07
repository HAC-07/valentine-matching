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
      <div className="mx-auto mb-8 w-full max-w-5xl">
        <Card className="py-4">
          <div className="flex items-center justify-center gap-2 text-base text-rose-600">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-rose-300 border-t-rose-500"></span>
            <span>Loading stats...</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-8 w-full max-w-5xl">
      <Card className="border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 py-4 shadow-md">
        <div className="flex flex-wrap items-center justify-center gap-6 text-base font-medium text-rose-900">
          <span className="flex items-center gap-2.5">
            <span className="text-2xl">💘</span>
            <span>
              <strong className="font-display text-lg text-rose-950">
                {stats.totalVisits.toLocaleString()}
              </strong>{" "}
              {stats.totalVisits === 1 ? "heart checked" : "hearts checked"}
            </span>
          </span>
          {stats.activeUsers > 0 && (
            <>
              <span className="hidden text-rose-300 sm:inline">•</span>
              <span className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></span>
                <span>
                  <strong className="font-display text-lg text-rose-950">
                    {stats.activeUsers}
                  </strong>{" "}
                  {stats.activeUsers === 1 ? "person is" : "people are"}{" "}
                  currently active
                </span>
              </span>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

