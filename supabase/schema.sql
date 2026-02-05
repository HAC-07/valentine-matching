create extension if not exists "pgcrypto";

create table if not exists quizzes (
  id uuid primary key default gen_random_uuid(),
  creator_name text not null,
  title text not null,
  valentine_threshold int not null default 100,
  created_at timestamptz not null default now()
);

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references quizzes(id) on delete cascade,
  question_text text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_option char(1) not null check (correct_option in ('A', 'B', 'C', 'D'))
);

create table if not exists attempts (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references quizzes(id) on delete cascade,
  user_name text,
  score int not null default 0,
  percentage float not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists attempt_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references attempts(id) on delete cascade,
  question_id uuid not null references questions(id) on delete cascade,
  selected_option char(1) not null check (selected_option in ('A', 'B', 'C', 'D')),
  is_correct boolean not null default false
);

create index if not exists questions_quiz_id_idx on questions(quiz_id);
create index if not exists attempts_quiz_id_idx on attempts(quiz_id);
create index if not exists attempt_answers_attempt_id_idx on attempt_answers(attempt_id);

alter table quizzes enable row level security;
alter table questions enable row level security;
alter table attempts enable row level security;
alter table attempt_answers enable row level security;

create policy "public read quizzes"
  on quizzes for select
  using (true);

create policy "public insert quizzes"
  on quizzes for insert
  with check (true);

create policy "public read questions"
  on questions for select
  using (true);

create policy "public insert questions"
  on questions for insert
  with check (true);

create policy "public read attempts"
  on attempts for select
  using (true);

create policy "public insert attempts"
  on attempts for insert
  with check (true);

create policy "public read attempt answers"
  on attempt_answers for select
  using (true);

create policy "public insert attempt answers"
  on attempt_answers for insert
  with check (true);

