export type Subject = "math" | "hebrew" | "science" | "knowledge";

export interface Child {
  id: string;
  name: string;
  avatar: string;
  subjects: Subject[];
  progress: Record<Subject, number>;
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
