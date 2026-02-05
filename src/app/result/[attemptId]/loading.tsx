import { Card } from "@/components/Card";
import { Shell } from "@/components/Shell";

export default function ResultLoading() {
  return (
    <Shell>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <Card className="h-40 animate-pulse bg-rose-50" />
        <Card className="h-56 animate-pulse bg-rose-50" />
      </div>
    </Shell>
  );
}

