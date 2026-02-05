export type QuizRow = {
  id: string;
  creator_name: string;
  title: string;
  valentine_threshold: number;
  created_at: string;
};

export type QuestionRow = {
  id: string;
  quiz_id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: "A" | "B" | "C" | "D";
};

export type AttemptRow = {
  id: string;
  quiz_id: string;
  user_name: string | null;
  score: number;
  percentage: number;
  created_at: string;
};

export type AttemptAnswerRow = {
  id: string;
  attempt_id: string;
  question_id: string;
  selected_option: "A" | "B" | "C" | "D";
  is_correct: boolean;
};

export type CreateQuestion = {
  questionText: string;
  options: [string, string, string, string];
  correctOption: "A" | "B" | "C" | "D";
};

export type CreateQuizPayload = {
  creatorName: string;
  title: string;
  valentineThreshold?: number;
  questions: CreateQuestion[];
};

export type SubmitAttemptPayload = {
  quizId: string;
  userName?: string;
  answers: Record<string, "A" | "B" | "C" | "D">;
};

