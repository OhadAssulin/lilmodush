export type Subject = "math" | "hebrew" | "science" | "knowledge";

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
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
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
  difficulty: Question["difficulty"];
  childId: string;
  childName: string;
  parentUsername: string | null;
  grade: 1 | 2 | 3 | null;
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
