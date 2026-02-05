import { Card } from "@/components/Card";
import { CreateQuizForm } from "@/components/CreateQuizForm";
import { Shell } from "@/components/Shell";

export const metadata = {
  title: "Create your quiz",
};

export default function CreatePage() {
  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <Card className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-400">
            Quiz Builder
          </p>
          <h1 className="font-display text-3xl text-rose-950">
            Build your compatibility quiz
          </h1>
          <p className="text-sm leading-6 text-rose-900/70">
            Add 1–12 questions, set the correct answer for each, then share the
            link with your friends or date.
          </p>
        </Card>
        <CreateQuizForm />
      </div>
    </Shell>
  );
}

