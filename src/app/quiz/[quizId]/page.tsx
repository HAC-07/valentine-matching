import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Shell } from "@/components/Shell";
import { QuizForm } from "@/components/QuizForm";

type PageProps = {
  params: { quizId: string };
};

export const generateMetadata = async ({ params }: PageProps) => {
  return {
    title: "Take the quiz",
    openGraph: {
      images: [`/og/quiz/${params.quizId}`],
    },
    twitter: {
      images: [`/og/quiz/${params.quizId}`],
    },
  };
};

export default async function QuizPage({ params }: PageProps) {
  const { data: quiz, error: quizError } = await supabase
    .from("quizzes")
    .select("id, creator_name, title")
    .eq("id", params.quizId)
    .single();

  if (quizError || !quiz) {
    notFound();
  }

  const { data: questions, error: questionsError } = await supabase
    .from("questions")
    .select(
      "id, question_text, option_a, option_b, option_c, option_d, correct_option",
    )
    .eq("quiz_id", params.quizId);

  if (questionsError || !questions) {
    notFound();
  }

  return (
    <Shell>
      <div className="mx-auto w-full max-w-4xl">
        <QuizForm
          quizId={quiz.id}
          title={quiz.title}
          creatorName={quiz.creator_name}
          questions={questions}
          shareUrl={`${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/quiz/${quiz.id}`}
        />
      </div>
    </Shell>
  );
}
