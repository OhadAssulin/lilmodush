export type QuestionType = "multiple_choice" | "open_input";

export interface MathQuestion {
  id: string;
  grade: number;
  grade_label: string;
  age_range: string;
  subject: "חשבון";
  topic: string;
  question: string;
  type: QuestionType;
  options?: string[];
  answer: string;
  accepted_answers?: string[];
  difficulty: "easy" | "medium" | "hard";
}

export interface GradeInfo {
  grade: number;
  label: string;
  ageRange: string;
  topics: string[];
}

export const grades: GradeInfo[] = [
  { grade: 1, label: "כיתה א׳", ageRange: "6-7", topics: ["מנייה וזיהוי כמות", "חיבור עד 10/20", "חיסור בסיסי", "סדר מספרים", "השוואת כמויות"] },
  { grade: 2, label: "כיתה ב׳", ageRange: "7-8", topics: ["חיבור דו־ספרתי", "חיסור דו־ספרתי", "כפל כחיבור חוזר", "זוגי/אי־זוגי", "כסף / עודף"] },
  { grade: 3, label: "כיתה ג׳", ageRange: "8-9", topics: ["כפל", "חילוק", "בעיה מילולית בכפל", "שברים פשוטים", "סדר פעולות פשוט"] },
  { grade: 4, label: "כיתה ד׳", ageRange: "9-10", topics: ["חיבור וחיסור מספרים גדולים", "כפל במספר דו־ספרתי", "חילוק עם שארית", "שברים שווי ערך", "היקף"] },
  { grade: 5, label: "כיתה ה׳", ageRange: "10-11", topics: ["חיבור שברים", "כפל שברים פשוט", "מספרים עשרוניים", "אחוזים בסיסיים", "שטח מלבן"] },
  { grade: 6, label: "כיתה ו׳", ageRange: "11-12", topics: ["אחוזים", "יחס", "שברים ועשרוניים", "סדר פעולות", "ממוצע"] },
];

export const mathQuestions: MathQuestion[] = [
  // Grade 1
  {
    id: "math-g1-001",
    grade: 1,
    grade_label: "כיתה א׳",
    age_range: "6-7",
    subject: "חשבון",
    topic: "מנייה וזיהוי כמות",
    question: "כמה תפוחים יש אם ספרנו: 🍎🍎🍎🍎🍎?",
    type: "open_input",
    answer: "5",
    difficulty: "easy"
  },
  {
    id: "math-g1-002",
    grade: 1,
    grade_label: "כיתה א׳",
    age_range: "6-7",
    subject: "חשבון",
    topic: "חיבור עד 10/20",
    question: "כמה זה 4 + 3?",
    type: "open_input",
    answer: "7",
    difficulty: "easy"
  },
  {
    id: "math-g1-003",
    grade: 1,
    grade_label: "כיתה א׳",
    age_range: "6-7",
    subject: "חשבון",
    topic: "חיסור בסיסי",
    question: "לדנה היו 9 מדבקות. היא נתנה 2. כמה נשארו?",
    type: "open_input",
    answer: "7",
    difficulty: "easy"
  },
  {
    id: "math-g1-004",
    grade: 1,
    grade_label: "כיתה א׳",
    age_range: "6-7",
    subject: "חשבון",
    topic: "סדר מספרים",
    question: "איזה מספר בא אחרי 14?",
    options: ["12", "13", "15", "16"],
    type: "multiple_choice",
    answer: "15",
    difficulty: "easy"
  },
  {
    id: "math-g1-005",
    grade: 1,
    grade_label: "כיתה א׳",
    age_range: "6-7",
    subject: "חשבון",
    topic: "השוואת כמויות",
    question: "מה גדול יותר: 8 או 5?",
    type: "open_input",
    answer: "8",
    difficulty: "easy"
  },
  {
    id: "math-g1-006",
    grade: 1,
    grade_label: "כיתה א׳",
    age_range: "6-7",
    subject: "חשבון",
    topic: "מנייה וזיהוי כמות",
    question: "כמה כוכבים יש? ⭐⭐⭐⭐⭐⭐⭐",
    type: "open_input",
    answer: "7",
    difficulty: "easy"
  },
  {
    id: "math-g1-007",
    grade: 1,
    grade_label: "כיתה א׳",
    age_range: "6-7",
    subject: "חשבון",
    topic: "חיבור עד 10/20",
    question: "כמה זה 6 + 5?",
    type: "open_input",
    answer: "11",
    difficulty: "easy"
  },
  {
    id: "math-g1-008",
    grade: 1,
    grade_label: "כיתה א׳",
    age_range: "6-7",
    subject: "חשבון",
    topic: "סדר מספרים",
    question: "איזה מספר בא לפני 10?",
    options: ["8", "9", "11", "12"],
    type: "multiple_choice",
    answer: "9",
    difficulty: "easy"
  },

  // Grade 2
  {
    id: "math-g2-001",
    grade: 2,
    grade_label: "כיתה ב׳",
    age_range: "7-8",
    subject: "חשבון",
    topic: "חיבור דו־ספרתי",
    question: "כמה זה 23 + 14?",
    type: "open_input",
    answer: "37",
    difficulty: "easy"
  },
  {
    id: "math-g2-002",
    grade: 2,
    grade_label: "כיתה ב׳",
    age_range: "7-8",
    subject: "חשבון",
    topic: "חיסור דו־ספרתי",
    question: "כמה זה 48 − 16?",
    type: "open_input",
    answer: "32",
    difficulty: "easy"
  },
  {
    id: "math-g2-003",
    grade: 2,
    grade_label: "כיתה ב׳",
    age_range: "7-8",
    subject: "חשבון",
    topic: "כפל כחיבור חוזר",
    question: "מה שווה 3 קבוצות של 4?",
    options: ["7", "12", "14", "16"],
    type: "multiple_choice",
    answer: "12",
    difficulty: "medium"
  },
  {
    id: "math-g2-004",
    grade: 2,
    grade_label: "כיתה ב׳",
    age_range: "7-8",
    subject: "חשבון",
    topic: "זוגי/אי־זוגי",
    question: "האם 27 הוא זוגי או אי־זוגי?",
    options: ["זוגי", "אי־זוגי"],
    type: "multiple_choice",
    answer: "אי־זוגי",
    difficulty: "easy"
  },
  {
    id: "math-g2-005",
    grade: 2,
    grade_label: "כיתה ב׳",
    age_range: "7-8",
    subject: "חשבון",
    topic: "כסף / עודף",
    question: "יש לך 10 שקלים וקנית משהו ב־6 שקלים. כמה עודף תקבל?",
    type: "open_input",
    answer: "4",
    difficulty: "easy"
  },
  {
    id: "math-g2-006",
    grade: 2,
    grade_label: "כיתה ב׳",
    age_range: "7-8",
    subject: "חשבון",
    topic: "חיבור דו־ספרתי",
    question: "כמה זה 35 + 28?",
    type: "open_input",
    answer: "63",
    difficulty: "medium"
  },
  {
    id: "math-g2-007",
    grade: 2,
    grade_label: "כיתה ב׳",
    age_range: "7-8",
    subject: "חשבון",
    topic: "זוגי/אי־זוגי",
    question: "האם 44 הוא זוגי או אי־זוגי?",
    options: ["זוגי", "אי־זוגי"],
    type: "multiple_choice",
    answer: "זוגי",
    difficulty: "easy"
  },

  // Grade 3
  {
    id: "math-g3-001",
    grade: 3,
    grade_label: "כיתה ג׳",
    age_range: "8-9",
    subject: "חשבון",
    topic: "כפל",
    question: "כמה זה 7 × 8?",
    type: "open_input",
    answer: "56",
    difficulty: "medium"
  },
  {
    id: "math-g3-002",
    grade: 3,
    grade_label: "כיתה ג׳",
    age_range: "8-9",
    subject: "חשבון",
    topic: "חילוק",
    question: "כמה זה 36 ÷ 6?",
    type: "open_input",
    answer: "6",
    difficulty: "easy"
  },
  {
    id: "math-g3-003",
    grade: 3,
    grade_label: "כיתה ג׳",
    age_range: "8-9",
    subject: "חשבון",
    topic: "בעיה מילולית בכפל",
    question: "בכל קופסה יש 5 עפרונות. יש 4 קופסאות. כמה עפרונות יש?",
    type: "open_input",
    answer: "20",
    difficulty: "easy"
  },
  {
    id: "math-g3-004",
    grade: 3,
    grade_label: "כיתה ג׳",
    age_range: "8-9",
    subject: "חשבון",
    topic: "שברים פשוטים",
    question: "איזה שבר גדול יותר?",
    options: ["1/2", "1/4", "1/8"],
    type: "multiple_choice",
    answer: "1/2",
    difficulty: "medium"
  },
  {
    id: "math-g3-005",
    grade: 3,
    grade_label: "כיתה ג׳",
    age_range: "8-9",
    subject: "חשבון",
    topic: "סדר פעולות פשוט",
    question: "כמה זה 5 + 3 × 2?",
    type: "open_input",
    answer: "11",
    difficulty: "medium"
  },
  {
    id: "math-g3-006",
    grade: 3,
    grade_label: "כיתה ג׳",
    age_range: "8-9",
    subject: "חשבון",
    topic: "כפל",
    question: "כמה זה 9 × 6?",
    type: "open_input",
    answer: "54",
    difficulty: "medium"
  },
  {
    id: "math-g3-007",
    grade: 3,
    grade_label: "כיתה ג׳",
    age_range: "8-9",
    subject: "חשבון",
    topic: "חילוק",
    question: "כמה זה 42 ÷ 7?",
    type: "open_input",
    answer: "6",
    difficulty: "easy"
  },

  // Grade 4
  {
    id: "math-g4-001",
    grade: 4,
    grade_label: "כיתה ד׳",
    age_range: "9-10",
    subject: "חשבון",
    topic: "חיבור וחיסור מספרים גדולים",
    question: "כמה זה 1,245 + 378?",
    type: "open_input",
    answer: "1623",
    accepted_answers: ["1623", "1,623"],
    difficulty: "medium"
  },
  {
    id: "math-g4-002",
    grade: 4,
    grade_label: "כיתה ד׳",
    age_range: "9-10",
    subject: "חשבון",
    topic: "כפל במספר דו־ספרתי",
    question: "כמה זה 24 × 3?",
    type: "open_input",
    answer: "72",
    difficulty: "easy"
  },
  {
    id: "math-g4-003",
    grade: 4,
    grade_label: "כיתה ד׳",
    age_range: "9-10",
    subject: "חשבון",
    topic: "חילוק עם שארית",
    question: "כמה זה 29 ÷ 5?",
    type: "open_input",
    answer: "5 שארית 4",
    accepted_answers: ["5 שארית 4", "5r4", "5 r 4"],
    difficulty: "medium"
  },
  {
    id: "math-g4-004",
    grade: 4,
    grade_label: "כיתה ד׳",
    age_range: "9-10",
    subject: "חשבון",
    topic: "שברים שווי ערך",
    question: "איזה שבר שווה ל־1/2?",
    options: ["2/3", "2/4", "3/5", "4/6"],
    type: "multiple_choice",
    answer: "2/4",
    difficulty: "medium"
  },
  {
    id: "math-g4-005",
    grade: 4,
    grade_label: "כיתה ד׳",
    age_range: "9-10",
    subject: "חשבון",
    topic: "היקף",
    question: "מלבן באורך 6 וברוחב 3. מה ההיקף?",
    type: "open_input",
    answer: "18",
    difficulty: "medium"
  },
  {
    id: "math-g4-006",
    grade: 4,
    grade_label: "כיתה ד׳",
    age_range: "9-10",
    subject: "חשבון",
    topic: "כפל במספר דו־ספרתי",
    question: "כמה זה 15 × 4?",
    type: "open_input",
    answer: "60",
    difficulty: "easy"
  },

  // Grade 5
  {
    id: "math-g5-001",
    grade: 5,
    grade_label: "כיתה ה׳",
    age_range: "10-11",
    subject: "חשבון",
    topic: "חיבור שברים",
    question: "כמה זה 1/4 + 2/4?",
    type: "open_input",
    answer: "3/4",
    accepted_answers: ["3/4", "0.75"],
    difficulty: "medium"
  },
  {
    id: "math-g5-002",
    grade: 5,
    grade_label: "כיתה ה׳",
    age_range: "10-11",
    subject: "חשבון",
    topic: "כפל שברים פשוט",
    question: "כמה זה 1/2 × 8?",
    type: "open_input",
    answer: "4",
    difficulty: "medium"
  },
  {
    id: "math-g5-003",
    grade: 5,
    grade_label: "כיתה ה׳",
    age_range: "10-11",
    subject: "חשבון",
    topic: "מספרים עשרוניים",
    question: "כמה זה 3.5 + 2.25?",
    type: "open_input",
    answer: "5.75",
    difficulty: "medium"
  },
  {
    id: "math-g5-004",
    grade: 5,
    grade_label: "כיתה ה׳",
    age_range: "10-11",
    subject: "חשבון",
    topic: "אחוזים בסיסיים",
    question: "כמה הם 10% מתוך 80?",
    options: ["4", "8", "10", "18"],
    type: "multiple_choice",
    answer: "8",
    difficulty: "medium"
  },
  {
    id: "math-g5-005",
    grade: 5,
    grade_label: "כיתה ה׳",
    age_range: "10-11",
    subject: "חשבון",
    topic: "שטח מלבן",
    question: "מלבן באורך 7 וברוחב 4. מה השטח?",
    type: "open_input",
    answer: "28",
    difficulty: "easy"
  },
  {
    id: "math-g5-006",
    grade: 5,
    grade_label: "כיתה ה׳",
    age_range: "10-11",
    subject: "חשבון",
    topic: "מספרים עשרוניים",
    question: "כמה זה 4.8 - 1.3?",
    type: "open_input",
    answer: "3.5",
    difficulty: "medium"
  },

  // Grade 6
  {
    id: "math-g6-001",
    grade: 6,
    grade_label: "כיתה ו׳",
    age_range: "11-12",
    subject: "חשבון",
    topic: "אחוזים",
    question: "כמה הם 25% מתוך 120?",
    type: "open_input",
    answer: "30",
    difficulty: "medium"
  },
  {
    id: "math-g6-002",
    grade: 6,
    grade_label: "כיתה ו׳",
    age_range: "11-12",
    subject: "חשבון",
    topic: "יחס",
    question: "היחס בין בנים לבנות הוא 2:3. אם יש 10 בנים, כמה בנות יש?",
    type: "open_input",
    answer: "15",
    difficulty: "medium"
  },
  {
    id: "math-g6-003",
    grade: 6,
    grade_label: "כיתה ו׳",
    age_range: "11-12",
    subject: "חשבון",
    topic: "שברים ועשרוניים",
    question: "מה גדול יותר?",
    options: ["0.75", "2/3"],
    type: "multiple_choice",
    answer: "0.75",
    difficulty: "medium"
  },
  {
    id: "math-g6-004",
    grade: 6,
    grade_label: "כיתה ו׳",
    age_range: "11-12",
    subject: "חשבון",
    topic: "סדר פעולות",
    question: "כמה זה 18 − 4 × 3 + 2?",
    type: "open_input",
    answer: "8",
    difficulty: "medium"
  },
  {
    id: "math-g6-005",
    grade: 6,
    grade_label: "כיתה ו׳",
    age_range: "11-12",
    subject: "חשבון",
    topic: "ממוצע",
    question: "הציונים הם 80, 90, 100. מה הממוצע?",
    type: "open_input",
    answer: "90",
    difficulty: "easy"
  },
  {
    id: "math-g6-006",
    grade: 6,
    grade_label: "כיתה ו׳",
    age_range: "11-12",
    subject: "חשבון",
    topic: "אחוזים",
    question: "כמה הם 50% מתוך 64?",
    type: "open_input",
    answer: "32",
    difficulty: "easy"
  },
];

export function getQuestionsByGrade(grade: number): MathQuestion[] {
  return mathQuestions.filter(q => q.grade === grade);
}

export function getQuestionsByGradeAndTopic(grade: number, topic: string): MathQuestion[] {
  return mathQuestions.filter(q => q.grade === grade && q.topic === topic);
}

export function getTopicsForGrade(grade: number): string[] {
  const gradeInfo = grades.find(g => g.grade === grade);
  return gradeInfo?.topics || [];
}

export function checkAnswer(question: MathQuestion, userAnswer: string): boolean {
  const normalizedUserAnswer = userAnswer.trim().toLowerCase();
  const normalizedCorrectAnswer = question.answer.trim().toLowerCase();

  if (normalizedUserAnswer === normalizedCorrectAnswer) {
    return true;
  }

  if (question.accepted_answers) {
    return question.accepted_answers.some(
      ans => ans.trim().toLowerCase() === normalizedUserAnswer
    );
  }

  return false;
}
