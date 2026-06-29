export const schemaStatements = [
  `
  CREATE TABLE IF NOT EXISTS parents (
    username TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
  `,
  `
  CREATE TABLE IF NOT EXISTS children (
    id TEXT PRIMARY KEY,
    parent_username TEXT REFERENCES parents(username) ON DELETE CASCADE,
    name TEXT NOT NULL,
    avatar TEXT NOT NULL,
    subjects JSONB NOT NULL DEFAULT '[]'::jsonb,
    progress JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
  `,
  `
  CREATE TABLE IF NOT EXISTS questions (
    id TEXT PRIMARY KEY,
    subject TEXT NOT NULL CHECK (subject IN ('math', 'hebrew', 'science', 'knowledge')),
    question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'open_input', 'ordering', 'oral_reading', 'writing_prompt')),
    skill TEXT NOT NULL,
    grade INTEGER CHECK (grade IN (1, 2, 3)),
    difficulty_score INTEGER NOT NULL CHECK (difficulty_score BETWEEN 1 AND 10),
    question TEXT NOT NULL,
    options JSONB,
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
  `,
  `
  ALTER TABLE questions
  ADD COLUMN IF NOT EXISTS skill TEXT NOT NULL DEFAULT 'addition_to_10'
  `,
  `
  ALTER TABLE questions
  ADD COLUMN IF NOT EXISTS grade INTEGER CHECK (grade IN (1, 2, 3))
  `,
  `
  ALTER TABLE questions
  DROP CONSTRAINT IF EXISTS questions_question_type_check
  `,
  `
  ALTER TABLE questions
  ADD CONSTRAINT questions_question_type_check
  CHECK (question_type IN ('multiple_choice', 'open_input', 'ordering', 'oral_reading', 'writing_prompt'))
  `,
  `
  CREATE TABLE IF NOT EXISTS question_attempts (
    id TEXT PRIMARY KEY,
    question_id TEXT NOT NULL,
    question_text TEXT NOT NULL,
    subject TEXT NOT NULL CHECK (subject IN ('math', 'hebrew', 'science', 'knowledge')),
    question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'open_input', 'ordering', 'oral_reading', 'writing_prompt')),
    question_skill TEXT NOT NULL,
    difficulty_score INTEGER NOT NULL CHECK (difficulty_score BETWEEN 1 AND 10),
    child_id TEXT NOT NULL,
    child_name TEXT NOT NULL,
    parent_username TEXT,
    grade INTEGER CHECK (grade IN (1, 2, 3)),
    answer TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    answered_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
  `,
  `
  ALTER TABLE question_attempts
  ADD COLUMN IF NOT EXISTS question_skill TEXT NOT NULL DEFAULT 'addition_to_10'
  `,
  `
  ALTER TABLE question_attempts
  DROP CONSTRAINT IF EXISTS question_attempts_question_type_check
  `,
  `
  ALTER TABLE question_attempts
  ADD CONSTRAINT question_attempts_question_type_check
  CHECK (question_type IN ('multiple_choice', 'open_input', 'ordering', 'oral_reading', 'writing_prompt'))
  `,
  `
  CREATE TABLE IF NOT EXISTS assessment_reports (
    id TEXT PRIMARY KEY,
    child_id TEXT NOT NULL,
    grade INTEGER NOT NULL CHECK (grade IN (1, 2, 3)),
    expected_level INTEGER NOT NULL,
    reading_support TEXT NOT NULL CHECK (reading_support IN ('with_nikud', 'without_nikud')),
    overall_status TEXT NOT NULL,
    average_score INTEGER NOT NULL,
    answered_count INTEGER NOT NULL,
    confidence TEXT NOT NULL,
    report_payload JSONB NOT NULL,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
  `,
  `
  CREATE INDEX IF NOT EXISTS idx_children_parent_username
  ON children(parent_username)
  `,
  `
  CREATE INDEX IF NOT EXISTS idx_question_attempts_question_id
  ON question_attempts(question_id)
  `,
  `
  CREATE INDEX IF NOT EXISTS idx_question_attempts_child_id
  ON question_attempts(child_id)
  `,
  `
  CREATE INDEX IF NOT EXISTS idx_assessment_reports_child_id
  ON assessment_reports(child_id)
  `,
] as const;
