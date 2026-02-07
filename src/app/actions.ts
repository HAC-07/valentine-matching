"use server";

import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { CreateQuizPayload, SubmitAttemptPayload } from "@/lib/types";

export const createQuiz = async (payload: CreateQuizPayload) => {
  if (!payload.creatorName.trim()) {
    return { error: "Creator name is required." };
  }
  if (!payload.title.trim()) {
    return { error: "Quiz title is required." };
  }
  if (payload.questions.length < 1 || payload.questions.length > 12) {
    return { error: "Add between 1 and 12 questions." };
  }

  const threshold =
    typeof payload.valentineThreshold === "number"
      ? Math.min(Math.max(payload.valentineThreshold, 0), 100)
      : 100;

  const { data: quiz, error: quizError } = await supabase
    .from("quizzes")
    .insert({
      creator_name: payload.creatorName.trim(),
      title: payload.title.trim(),
      valentine_threshold: threshold,
    })
    .select("id")
    .single();

  if (quizError || !quiz) {
    return { error: "Could not create quiz. Please try again." };
  }

  const questionRows = payload.questions.map((question) => ({
    quiz_id: quiz.id,
    question_text: question.questionText.trim(),
    option_a: question.options[0].trim(),
    option_b: question.options[1].trim(),
    option_c: question.options[2].trim(),
    option_d: question.options[3].trim(),
    correct_option: question.correctOption,
  }));

  const { error: questionError } = await supabase
    .from("questions")
    .insert(questionRows);

  if (questionError) {
    return { error: "Could not save questions. Please try again." };
  }

  return { quizId: quiz.id };
};

export const submitAttempt = async (payload: SubmitAttemptPayload) => {
  const { quizId, answers, userName } = payload;

  const { data: questions, error: questionsError } = await supabase
    .from("questions")
    .select("id, correct_option")
    .eq("quiz_id", quizId);

  if (questionsError || !questions) {
    return { error: "Could not load quiz answers." };
  }

  const { data: quiz, error: quizError } = await supabase
    .from("quizzes")
    .select("valentine_threshold")
    .eq("id", quizId)
    .single();

  if (questions.some((question) => !answers[question.id])) {
    return { error: "Missing answers for some questions." };
  }

  let correctCount = 0;
  const answerRows = questions.map((question) => {
    const selectedOption = answers[question.id] as "A" | "B" | "C" | "D";
    const isCorrect = selectedOption === question.correct_option;
    if (isCorrect) correctCount += 1;
    return {
      question_id: question.id,
      selected_option: selectedOption,
      is_correct: isCorrect,
    };
  });

  const score = correctCount * 10;
  const percentage =
    questions.length === 0 ? 0 : (score / (questions.length * 10)) * 100;

  const threshold =
    !quizError && quiz && typeof quiz.valentine_threshold === "number"
      ? quiz.valentine_threshold
      : 100;

  const { data: attempt, error: attemptError } = await supabase
    .from("attempts")
    .insert({
      quiz_id: quizId,
      user_name: userName?.trim() || null,
      score,
      percentage,
    })
    .select("id")
    .single();

  if (attemptError || !attempt) {
    return { error: "Could not save attempt." };
  }

  const { error: answersError } = await supabase
    .from("attempt_answers")
    .insert(
      answerRows.map((row) => ({
        attempt_id: attempt.id,
        ...row,
      })),
    );

  if (answersError) {
    return { error: "Could not save answers." };
  }

  const shouldShowValentine = percentage >= threshold;

  return { attemptId: attempt.id, shouldShowValentine };
};

export const goToCreate = async () => {
  redirect("/create");
};

export const trackVisit = async () => {
  await supabase.from("visits").insert({});
};

export const getStats = async () => {
  const { count: totalVisits } = await supabase
    .from("visits")
    .select("*", { count: "exact", head: true });

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count: activeUsers } = await supabase
    .from("visits")
    .select("*", { count: "exact", head: true })
    .gte("created_at", oneHourAgo);

  return {
    totalVisits: totalVisits ?? 0,
    activeUsers: activeUsers ?? 0,
  };
};
