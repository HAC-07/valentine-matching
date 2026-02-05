import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Shell } from "@/components/Shell";
import { Card } from "@/components/Card";
import { ValentinePrompt } from "@/components/ValentinePrompt";

type PageProps = {
  params: { attemptId: string };
};

export const generateMetadata = async () => {
  return {
    title: "Will you be my Valentine?",
  };
};

export default async function ValentinePage({ params }: PageProps) {
  const { data: attempt, error: attemptError } = await supabase
    .from("attempts")
    .select("id, quiz_id, percentage")
    .eq("id", params.attemptId)
    .single();

  if (attemptError || !attempt) {
    notFound();
  }

  const { data: quiz, error: quizError } = await supabase
    .from("quizzes")
    .select("id, creator_name, title, valentine_threshold")
    .eq("id", attempt.quiz_id)
    .single();

  if (quizError || !quiz) {
    notFound();
  }

  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <Card className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-400">
            Valentine moment
          </p>
          <h1 className="font-display text-4xl text-rose-950">
            Will you be my Valentine?
          </h1>
        </Card>
        <Card>
          <ValentinePrompt creatorName={quiz.creator_name} quizId={quiz.id} />
        </Card>
      </div>
    </Shell>
  );
}


