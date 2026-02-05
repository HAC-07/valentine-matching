import Link from "next/link";
import { Card } from "@/components/Card";
import { Shell } from "@/components/Shell";

export default function NotFound() {
  return (
    <Shell>
      <div className="mx-auto w-full max-w-3xl">
        <Card className="space-y-4 text-center">
          <h1 className="font-display text-3xl text-rose-950">
            We couldn&apos;t find that quiz
          </h1>
          <p className="text-sm text-rose-900/70">
            The link might be wrong or the quiz was removed.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center justify-center rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-rose-600"
          >
            Create a new quiz
          </Link>
        </Card>
      </div>
    </Shell>
  );
}

