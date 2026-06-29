export type Subject = "math" | "hebrew" | "science" | "knowledge";
export type QuestionType =
  | "multiple_choice"
  | "open_input"
  | "ordering"
  | "oral_reading"
  | "writing_prompt";
export type QuestionSkill = string;
export type Grade = 1 | 2 | 3;

export interface Child {
  id: string;
  name: string;
  avatar: string;
  subjects: Subject[];
  progress: Record<Subject, number>;
  assessmentHistory?: AssessmentHistoryEntry[];
  createdAt: string;
}

export interface Parent {
  username: string;
  children: Child[];
  createdAt: string;
}

export interface Question {
  id: string;
  subject: Subject;
  type: QuestionType;
  skill: QuestionSkill;
  grade?: Grade;
  difficultyScore: number;
  question: string;
  options?: string[];
  correctAnswer: string;
  acceptableAnswers?: string[];
  explanation?: string;
  rubric?: string;
  tags?: string[];
  maxPoints?: number;
  readAloudAllowed?: boolean;
  giftedPathRelevant?: boolean;
}

export interface Session {
  childId: string;
  subject: Subject;
  questions: Question[];
  answers: Record<string, string>;
  score: number;
  completedAt?: string;
}

export interface QuestionAnalyticsAttempt {
  id: string;
  questionId: string;
  questionText: string;
  subject: Subject;
  questionType: QuestionType;
  questionSkill: QuestionSkill;
  difficultyScore: number;
  childId: string;
  childName: string;
  parentUsername: string | null;
  grade: Grade | null;
  answer: string;
  isCorrect: boolean;
  answeredAt: string;
}

export type AssessmentStatus = "מחוננים" | "מעל הקצב" | "בקצב" | "כמעט בקצב" | "צריך חיזוק";
export type AssessmentConfidence = "נמוך" | "בינוני" | "גבוה";
export type AssessmentReadingSupport = "with_nikud" | "without_nikud";

export interface AssessmentDomainSnapshot {
  domainId: string;
  label: string;
  shortLabel: string;
  emoji: string;
  color: string;
  status: AssessmentStatus;
  skillScore: number;
  adjustedLevel: number;
  confidence: AssessmentConfidence;
  recommendation: string;
  answeredCount: number;
  correctCount: number;
}

export interface AssessmentHistoryEntry {
  id: string;
  completedAt: string;
  grade: 1 | 2 | 3;
  expectedLevel: number;
  readingSupport: AssessmentReadingSupport;
  overallStatus: AssessmentStatus;
  averageScore: number;
  answeredCount: number;
  confidence: AssessmentConfidence;
  readingIndependence: string;
  summaryLines: string[];
  strength: AssessmentDomainSnapshot;
  focus: AssessmentDomainSnapshot;
  domains: AssessmentDomainSnapshot[];
  weeklyPlan: {
    day: string;
    task: string;
    goal: string;
  }[];
}
