import { Question, Subject } from "@/types";

export const QUESTION_BANK_STORAGE_KEY = "lilmodush_question_bank";

const mathQuestions: Question[] = [
  {
    id: "math-1",
    subject: "math",
    difficulty: "easy",
    question: "כמה זה 5 + 3?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8",
    explanation: "5 ועוד 3 שווה 8. נספור: 5, 6, 7, 8!",
  },
  {
    id: "math-2",
    subject: "math",
    difficulty: "easy",
    question: "כמה זה 10 - 4?",
    options: ["4", "5", "6", "7"],
    correctAnswer: "6",
    explanation: "10 פחות 4 שווה 6. אם יש לנו 10 ממתקים ואכלנו 4, נשארו לנו 6!",
  },
  {
    id: "math-3",
    subject: "math",
    difficulty: "easy",
    question: "כמה זה 2 × 3?",
    options: ["4", "5", "6", "7"],
    correctAnswer: "6",
    explanation: "2 כפול 3 שווה 6. זה כמו 3 + 3 או 2 + 2 + 2!",
  },
  {
    id: "math-4",
    subject: "math",
    difficulty: "medium",
    question: "כמה זה 15 + 27?",
    options: ["42", "41", "43", "40"],
    correctAnswer: "42",
    explanation: "15 + 27 = 42. נחבר קודם את היחידות: 5+7=12, נשאיר 2 ונעביר 1. אחר כך: 1+2+1=4.",
  },
  {
    id: "math-5",
    subject: "math",
    difficulty: "medium",
    question: "מה המספר שחסר? 4 × ___ = 20",
    options: ["4", "5", "6", "7"],
    correctAnswer: "5",
    explanation: "4 × 5 = 20. כמה פעמים 4 נכנס ב-20? 5 פעמים!",
  },
];

const hebrewQuestions: Question[] = [
  {
    id: "hebrew-1",
    subject: "hebrew",
    difficulty: "easy",
    question: "איזו אות באה אחרי ג׳?",
    options: ["ה", "ד", "ב", "ו"],
    correctAnswer: "ד",
    explanation: "סדר האותיות: א, ב, ג, ד. אחרי ג׳ באה ד׳!",
  },
  {
    id: "hebrew-2",
    subject: "hebrew",
    difficulty: "easy",
    question: "כמה אותיות יש בא״ב העברי?",
    options: ["24", "22", "26", "20"],
    correctAnswer: "22",
    explanation: "בא״ב העברי יש 22 אותיות, מ-א׳ ועד ת׳!",
  },
  {
    id: "hebrew-3",
    subject: "hebrew",
    difficulty: "easy",
    question: "איזו מילה מתחילה באות ש׳?",
    options: ["כלב", "שמש", "בית", "עץ"],
    correctAnswer: "שמש",
    explanation: "המילה ׳שמש׳ מתחילה באות ש׳!",
  },
  {
    id: "hebrew-4",
    subject: "hebrew",
    difficulty: "medium",
    question: "מה ההפך של ׳גדול׳?",
    options: ["רחב", "קטן", "ארוך", "גבוה"],
    correctAnswer: "קטן",
    explanation: "ההפך של גדול הוא קטן!",
  },
  {
    id: "hebrew-5",
    subject: "hebrew",
    difficulty: "medium",
    question: "איזו מילה היא שם עצם?",
    options: ["רץ", "יפה", "ספר", "מהר"],
    correctAnswer: "ספר",
    explanation: "ספר הוא שם עצם - דבר שאפשר לגעת בו או לראות אותו!",
  },
];

const scienceQuestions: Question[] = [
  {
    id: "science-1",
    subject: "science",
    difficulty: "easy",
    question: "מה צריכים צמחים כדי לגדול?",
    options: ["רק מים", "מים ואור שמש", "רק אדמה", "רק אוויר"],
    correctAnswer: "מים ואור שמש",
    explanation: "צמחים צריכים מים, אור שמש, אוויר ואדמה כדי לגדול!",
  },
  {
    id: "science-2",
    subject: "science",
    difficulty: "easy",
    question: "כמה רגליים יש לעכביש?",
    options: ["6", "8", "4", "10"],
    correctAnswer: "8",
    explanation: "לעכביש יש 8 רגליים! לכן הוא לא חרק (לחרקים יש 6 רגליים).",
  },
  {
    id: "science-3",
    subject: "science",
    difficulty: "easy",
    question: "מה קורה למים כשהם מתחממים מאוד?",
    options: ["הם קופאים", "הם הופכים לקיטור", "הם נעלמים", "כלום"],
    correctAnswer: "הם הופכים לקיטור",
    explanation: "כשמים מתחממים מספיק, הם מתאדים והופכים לקיטור - גז שאי אפשר לראות!",
  },
  {
    id: "science-4",
    subject: "science",
    difficulty: "medium",
    question: "מהו כוכב הלכת הקרוב ביותר לשמש?",
    options: ["נוגה", "מאדים", "כוכב חמה", "צדק"],
    correctAnswer: "כוכב חמה",
    explanation: "כוכב חמה הוא הקרוב ביותר לשמש! אחריו נוגה, כדור הארץ ומאדים.",
  },
  {
    id: "science-5",
    subject: "science",
    difficulty: "medium",
    question: "מה גורם לקשת בענן?",
    options: ["עננים צבעוניים", "אור שמש וטיפות גשם", "רוח חזקה", "ברקים"],
    correctAnswer: "אור שמש וטיפות גשם",
    explanation: "כשאור השמש עובר דרך טיפות גשם, הוא מתפרק לצבעים ויוצר קשת!",
  },
];

const knowledgeQuestions: Question[] = [
  {
    id: "knowledge-1",
    subject: "knowledge",
    difficulty: "easy",
    question: "מהי בירת ישראל?",
    options: ["תל אביב", "חיפה", "ירושלים", "באר שבע"],
    correctAnswer: "ירושלים",
    explanation: "ירושלים היא בירת ישראל!",
  },
  {
    id: "knowledge-2",
    subject: "knowledge",
    difficulty: "easy",
    question: "כמה ימים יש בשבוע?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
    explanation: "בשבוע יש 7 ימים: ראשון, שני, שלישי, רביעי, חמישי, שישי ושבת!",
  },
  {
    id: "knowledge-3",
    subject: "knowledge",
    difficulty: "easy",
    question: "איזה חג חוגגים בחודש תשרי?",
    options: ["פסח", "ראש השנה", "חנוכה", "פורים"],
    correctAnswer: "ראש השנה",
    explanation: "ראש השנה הוא החג הראשון בחודש תשרי, ההתחלה של השנה העברית!",
  },
  {
    id: "knowledge-4",
    subject: "knowledge",
    difficulty: "medium",
    question: "מה צבע הדגל של ישראל?",
    options: ["אדום ולבן", "כחול ולבן", "ירוק ולבן", "צהוב וכחול"],
    correctAnswer: "כחול ולבן",
    explanation: "דגל ישראל הוא כחול ולבן עם מגן דוד במרכז!",
  },
  {
    id: "knowledge-5",
    subject: "knowledge",
    difficulty: "medium",
    question: "איזה ים נמצא במערב ישראל?",
    options: ["ים המלח", "ים סוף", "הים התיכון", "ים כנרת"],
    correctAnswer: "הים התיכון",
    explanation: "הים התיכון נמצא במערב ישראל, לאורך החוף!",
  },
];

export const defaultQuestionBank: Record<Subject, Question[]> = {
  math: mathQuestions,
  hebrew: hebrewQuestions,
  science: scienceQuestions,
  knowledge: knowledgeQuestions,
};

function cloneQuestionBank(bank: Record<Subject, Question[]>): Record<Subject, Question[]> {
  return {
    math: bank.math.map((question) => ({ ...question, options: question.options ? [...question.options] : undefined })),
    hebrew: bank.hebrew.map((question) => ({ ...question, options: question.options ? [...question.options] : undefined })),
    science: bank.science.map((question) => ({ ...question, options: question.options ? [...question.options] : undefined })),
    knowledge: bank.knowledge.map((question) => ({ ...question, options: question.options ? [...question.options] : undefined })),
  };
}

export function getQuestionBank(): Record<Subject, Question[]> {
  if (typeof window === "undefined") {
    return cloneQuestionBank(defaultQuestionBank);
  }

  const stored = localStorage.getItem(QUESTION_BANK_STORAGE_KEY);
  if (!stored) {
    return cloneQuestionBank(defaultQuestionBank);
  }

  try {
    const parsed = JSON.parse(stored) as Partial<Record<Subject, Question[]>>;
    return {
      math: parsed.math || [],
      hebrew: parsed.hebrew || [],
      science: parsed.science || [],
      knowledge: parsed.knowledge || [],
    };
  } catch {
    return cloneQuestionBank(defaultQuestionBank);
  }
}

export function saveQuestionBank(bank: Record<Subject, Question[]>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(QUESTION_BANK_STORAGE_KEY, JSON.stringify(bank));
}

export function resetQuestionBank(): Record<Subject, Question[]> {
  const bank = cloneQuestionBank(defaultQuestionBank);
  saveQuestionBank(bank);
  return bank;
}

export function getAllQuestions(): Question[] {
  const bank = getQuestionBank();
  return [...bank.math, ...bank.hebrew, ...bank.science, ...bank.knowledge];
}

export function getQuestions(subject: Subject, count: number = 5): Question[] {
  const questions = [...getQuestionBank()[subject]];
  const shuffled = questions.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getRandomQuestion(subject: Subject): Question {
  const questions = getQuestionBank()[subject];
  return questions[Math.floor(Math.random() * questions.length)];
}

export function checkAnswer(question: Question, answer: string): boolean {
  return question.correctAnswer === answer;
}
