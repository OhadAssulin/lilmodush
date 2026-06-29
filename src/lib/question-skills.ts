import { QuestionSkill, Subject } from "@/types";

export type QuestionSkillOption = {
  id: QuestionSkill;
  subject: Subject;
  label: string;
};

export const questionSkillOptions: QuestionSkillOption[] = [
  { id: "counting_quantity", subject: "math", label: "ספירה וזיהוי כמות" },
  { id: "number_comparison", subject: "math", label: "השוואת מספרים" },
  { id: "number_order", subject: "math", label: "סדר מספרים" },
  { id: "addition_to_10", subject: "math", label: "חיבור עד 10" },
  { id: "subtraction_to_10", subject: "math", label: "חיסור עד 10" },
  { id: "addition_to_20", subject: "math", label: "חיבור עד 20" },
  { id: "subtraction_to_20", subject: "math", label: "חיסור עד 20" },
  { id: "addition_to_100_no_regrouping", subject: "math", label: "חיבור עד 100 ללא המרה" },
  { id: "addition_to_100_with_regrouping", subject: "math", label: "חיבור עד 100 עם המרה" },
  { id: "subtraction_to_100_no_borrowing", subject: "math", label: "חיסור עד 100 ללא פריטה" },
  { id: "subtraction_to_100_with_borrowing", subject: "math", label: "חיסור עד 100 עם פריטה" },
  { id: "place_value_to_100", subject: "math", label: "מבנה עשרוני עד 100" },
  { id: "place_value_to_1000", subject: "math", label: "מבנה עשרוני עד 1,000" },
  { id: "place_value_to_10000", subject: "math", label: "מבנה עשרוני עד 10,000" },
  { id: "addition_subtraction_to_1000", subject: "math", label: "חיבור וחיסור עד 1,000" },
  { id: "addition_subtraction_to_10000", subject: "math", label: "חיבור וחיסור בתחום הרבבה" },
  { id: "multiplication_as_repeated_addition", subject: "math", label: "כפל כחיבור חוזר" },
  { id: "multiplication_table_to_5", subject: "math", label: "לוח הכפל עד 5" },
  { id: "multiplication_table_full", subject: "math", label: "לוח הכפל המלא" },
  { id: "division_groups", subject: "math", label: "חילוק כחלוקה לקבוצות" },
  { id: "division_by_multiplication_table", subject: "math", label: "חילוק לפי לוח הכפל" },
  { id: "word_problem_one_step", subject: "math", label: "בעיה מילולית חד-שלבית" },
  { id: "word_problem_two_steps", subject: "math", label: "בעיה מילולית דו-שלבית" },
  { id: "money_change", subject: "math", label: "כסף ועודף" },
  { id: "time_clock", subject: "math", label: "זמן ושעון" },
  { id: "measurement", subject: "math", label: "מדידות" },
  { id: "simple_fractions", subject: "math", label: "שברים פשוטים: חצי/שליש/רבע" },
  { id: "compare_simple_fractions", subject: "math", label: "השוואת שברים פשוטים" },
  { id: "basic_order_of_operations", subject: "math", label: "סדר פעולות פשוט" },
  { id: "numeric_patterns", subject: "math", label: "דפוסים וסדרות מספריות" },
  { id: "early_algebraic_thinking", subject: "math", label: "חשיבה אלגברית התחלתית" },

  { id: "letter_recognition", subject: "hebrew", label: "זיהוי אותיות" },
  { id: "opening_closing_sound", subject: "hebrew", label: "צליל פותח / סוגר" },
  { id: "word_reading", subject: "hebrew", label: "קריאת מילים" },
  { id: "sentence_reading", subject: "hebrew", label: "קריאת משפטים" },
  { id: "reading_fluency", subject: "hebrew", label: "שטף קריאה" },
  { id: "reading_explicit_detail", subject: "hebrew", label: "הבנת הנקרא: פרט מפורש" },
  { id: "reading_simple_inference", subject: "hebrew", label: "הבנת הנקרא: הסקה פשוטה" },
  { id: "reading_text_evidence", subject: "hebrew", label: "הבנת הנקרא: נימוק מהטקסט" },
  { id: "vocabulary_context", subject: "hebrew", label: "אוצר מילים מהקשר" },
  { id: "synonyms", subject: "hebrew", label: "מילים נרדפות" },
  { id: "antonyms", subject: "hebrew", label: "הפכים" },
  { id: "connectors", subject: "hebrew", label: "מילות קישור" },
  { id: "gender_agreement", subject: "hebrew", label: "זכר/נקבה" },
  { id: "singular_plural", subject: "hebrew", label: "יחיד/רבים" },
  { id: "verb_tense_basic", subject: "hebrew", label: "זמן פועל בסיסי" },
  { id: "punctuation", subject: "hebrew", label: "סימני פיסוק" },
  { id: "sentence_writing", subject: "hebrew", label: "כתיבת משפט" },
  { id: "paragraph_writing", subject: "hebrew", label: "כתיבת פסקה" },
  { id: "story_structure", subject: "hebrew", label: "מבנה טקסט: סיפור" },
  { id: "information_text_structure", subject: "hebrew", label: "מבנה טקסט: מידע" },
  { id: "multi_step_instructions", subject: "hebrew", label: "הוראות מרובות שלבים" },

  { id: "animals", subject: "science", label: "בעלי חיים" },
  { id: "plants", subject: "science", label: "צמחים" },
  { id: "human_body", subject: "science", label: "גוף האדם" },
  { id: "materials_properties", subject: "science", label: "חומרים ותכונות" },
  { id: "water_states", subject: "science", label: "מים ומצבי צבירה" },
  { id: "weather", subject: "science", label: "מזג אוויר" },
  { id: "space", subject: "science", label: "חלל" },
  { id: "environment", subject: "science", label: "סביבה" },

  { id: "basic_geography", subject: "knowledge", label: "גאוגרפיה בסיסית" },
  { id: "holidays", subject: "knowledge", label: "חגים ומועדים" },
  { id: "israel_symbols", subject: "knowledge", label: "ישראל וסמלים" },
  { id: "time_concepts", subject: "knowledge", label: "מושגי זמן" },
  { id: "verbal_analogies", subject: "knowledge", label: "אנלוגיות מילוליות" },
  { id: "visual_analogies", subject: "knowledge", label: "אנלוגיות צורניות" },
  { id: "visual_matrices", subject: "knowledge", label: "מטריצות צורניות" },
  { id: "odd_one_out", subject: "knowledge", label: "יוצא דופן" },
  { id: "rule_generalization", subject: "knowledge", label: "הכללה וחוקיות" },
  { id: "non_routine_problems", subject: "knowledge", label: "בעיות לא שגרתיות" },
  { id: "multiple_solution_paths", subject: "knowledge", label: "כמה דרכי פתרון" },
  { id: "logical_conditions", subject: "knowledge", label: "תנאים ולוגיקה" },
  { id: "spatial_thinking", subject: "knowledge", label: "חשיבה מרחבית" },
];

export const defaultQuestionSkillBySubject: Record<Subject, QuestionSkill> = {
  math: "addition_to_10",
  hebrew: "letter_recognition",
  science: "plants",
  knowledge: "basic_geography",
};

export function getQuestionSkillsBySubject(subject: Subject): QuestionSkillOption[] {
  return questionSkillOptions.filter((skill) => skill.subject === subject);
}

export function getQuestionSkillLabel(skill: QuestionSkill): string {
  return questionSkillOptions.find((option) => option.id === skill)?.label || skill;
}

export function isQuestionSkillForSubject(skill: QuestionSkill, subject: Subject): boolean {
  return questionSkillOptions.some((option) => option.id === skill && option.subject === subject);
}
