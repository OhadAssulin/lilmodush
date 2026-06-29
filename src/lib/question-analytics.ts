import { Child, Question, QuestionAnalyticsAttempt } from "@/types";

const QUESTION_ANALYTICS_STORAGE_KEY = "lilmodush_question_analytics";

export interface QuestionAnalyticsSummary {
  questionId: string;
  attemptsCount: number;
  uniqueChildrenCount: number;
  solvedCount: number;
  solveRate: number;
  gradeBreakdown: {
    grade: 1 | 2 | 3 | null;
    label: string;
    attemptsCount: number;
    uniqueChildrenCount: number;
    solvedCount: number;
  }[];
  answerBreakdown: {
    answer: string;
    count: number;
    solvedCount: number;
    isCorrectAnswer: boolean;
  }[];
  mostPopularAnswer: string | null;
}

export function getQuestionAnalytics(): QuestionAnalyticsAttempt[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(QUESTION_ANALYTICS_STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as QuestionAnalyticsAttempt[];
  } catch {
    return [];
  }
}

export function saveQuestionAnalytics(attempts: QuestionAnalyticsAttempt[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(QUESTION_ANALYTICS_STORAGE_KEY, JSON.stringify(attempts));
}

export function recordQuestionAttempt({
  question,
  child,
  parentUsername,
  answer,
  isCorrect,
}: {
  question: Question;
  child: Child;
  parentUsername: string | null;
  answer: string;
  isCorrect: boolean;
}): QuestionAnalyticsAttempt {
  const attempt: QuestionAnalyticsAttempt = {
    id: createAnalyticsId(question.id),
    questionId: question.id,
    questionText: question.question,
    subject: question.subject,
    questionType: question.type,
    difficultyScore: question.difficultyScore,
    childId: child.id,
    childName: child.name,
    parentUsername,
    grade: child.assessmentHistory?.[0]?.grade || null,
    answer,
    isCorrect,
    answeredAt: new Date().toISOString(),
  };

  saveQuestionAnalytics([...getQuestionAnalytics(), attempt]);
  return attempt;
}

export function getQuestionAnalyticsSummary(
  question: Question,
  attempts: QuestionAnalyticsAttempt[]
): QuestionAnalyticsSummary {
  const questionAttempts = attempts.filter((attempt) => attempt.questionId === question.id);
  const uniqueChildren = new Set(questionAttempts.map((attempt) => attempt.childId));
  const solvedCount = questionAttempts.filter((attempt) => attempt.isCorrect).length;
  const answerBreakdown = buildAnswerBreakdown(question, questionAttempts);

  return {
    questionId: question.id,
    attemptsCount: questionAttempts.length,
    uniqueChildrenCount: uniqueChildren.size,
    solvedCount,
    solveRate: questionAttempts.length === 0 ? 0 : Math.round((solvedCount / questionAttempts.length) * 100),
    gradeBreakdown: buildGradeBreakdown(questionAttempts),
    answerBreakdown,
    mostPopularAnswer: answerBreakdown[0]?.answer || null,
  };
}

function buildGradeBreakdown(attempts: QuestionAnalyticsAttempt[]): QuestionAnalyticsSummary["gradeBreakdown"] {
  const grades: (1 | 2 | 3 | null)[] = [1, 2, 3, null];
  return grades
    .map((grade) => {
      const gradeAttempts = attempts.filter((attempt) => attempt.grade === grade);
      return {
        grade,
        label: getGradeLabel(grade),
        attemptsCount: gradeAttempts.length,
        uniqueChildrenCount: new Set(gradeAttempts.map((attempt) => attempt.childId)).size,
        solvedCount: gradeAttempts.filter((attempt) => attempt.isCorrect).length,
      };
    })
    .filter((item) => item.attemptsCount > 0);
}

function buildAnswerBreakdown(
  question: Question,
  attempts: QuestionAnalyticsAttempt[]
): QuestionAnalyticsSummary["answerBreakdown"] {
  const counts = attempts.reduce<Record<string, { count: number; solvedCount: number }>>((acc, attempt) => {
    if (!acc[attempt.answer]) {
      acc[attempt.answer] = { count: 0, solvedCount: 0 };
    }
    acc[attempt.answer].count += 1;
    if (attempt.isCorrect) {
      acc[attempt.answer].solvedCount += 1;
    }
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([answer, data]) => ({
      answer,
      count: data.count,
      solvedCount: data.solvedCount,
      isCorrectAnswer: normalizeAnswer(answer) === normalizeAnswer(question.correctAnswer),
    }))
    .sort((a, b) => b.count - a.count || Number(b.isCorrectAnswer) - Number(a.isCorrectAnswer));
}

function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase();
}

function getGradeLabel(grade: 1 | 2 | 3 | null): string {
  if (grade === 1) return "כיתה א׳";
  if (grade === 2) return "כיתה ב׳";
  if (grade === 3) return "כיתה ג׳";
  return "לא ידוע";
}

function createAnalyticsId(questionId: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${questionId}-${crypto.randomUUID()}`;
  }
  return `${questionId}-${Date.now()}`;
}
