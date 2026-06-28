import type {
  AssessmentConfidence,
  AssessmentDomainSnapshot,
  AssessmentHistoryEntry,
  AssessmentStatus,
} from "@/types";

export type AdaptiveQuestionType = "multiple_choice" | "open_input";
export type AdaptiveReadingSupport = "with_nikud" | "without_nikud";
export type AdaptivePresentationMode = "ניקוד מלא" | "ללא ניקוד";

export type AdaptiveDomainId =
  | "reading_comprehension"
  | "language_writing"
  | "number_sense"
  | "arithmetic"
  | "word_problems"
  | "geometry_data"
  | "patterns_logic";

export type AdaptiveGrade = 1 | 2 | 3;

export interface AdaptiveDomain {
  id: AdaptiveDomainId;
  label: string;
  shortLabel: string;
  emoji: string;
  color: string;
  defaultPractice: string[];
}

export interface AdaptiveItem {
  id: string;
  domainId: AdaptiveDomainId;
  level: number;
  skill: string;
  prompt: string;
  type: AdaptiveQuestionType;
  options?: string[];
  answer: string;
  acceptedAnswers?: string[];
  practice: string;
}

export interface DomainState {
  domainId: AdaptiveDomainId;
  currentLevel: number;
  stableLevel: number;
  boundaryLevel: number | null;
  correctAtLevel: number;
  wrongAtLevel: number;
  askedItemIds: string[];
  correctCount: number;
  answeredCount: number;
  done: boolean;
}

export interface AdaptiveSession {
  grade: AdaptiveGrade;
  expectedLevel: number;
  readingSupport: AdaptiveReadingSupport;
  domainStates: Record<AdaptiveDomainId, DomainState>;
  answers: {
    itemId: string;
    domainId: AdaptiveDomainId;
    level: number;
    isCorrect: boolean;
    answer: string;
    presentationMode: AdaptivePresentationMode;
    responseTimeMs: number;
  }[];
}

export interface DomainReport {
  domain: AdaptiveDomain;
  stableLevel: number;
  adjustedLevel: number;
  boundaryLevel: number | null;
  status: "מחוננים" | "מעל הקצב" | "בקצב" | "כמעט בקצב" | "צריך חיזוק";
  confidence: "נמוך" | "בינוני" | "גבוה";
  skillScore: number;
  levelScore: number;
  accuracyScore: number;
  fluencyScore: number;
  lastLevelAccuracy: number;
  avgResponseSeconds: number | null;
  answeredCount: number;
  correctCount: number;
  recommendation: string;
  supportNote: string | null;
  supportProfile: string;
  stopText: string;
  interpretation: string;
}

export interface AssessmentProgress {
  answeredCount: number;
  maxQuestions: number;
  progressPercent: number;
  completedDomains: number;
  totalDomains: number;
  stableDomains: number;
  currentDomainLabel: string;
  currentLevelLabel: string;
  currentDomainProgress: number;
  readingIndependence: string;
  nextSignal: string;
}

export interface ParentReport {
  title: string;
  monthLabel: string;
  summaryLines: string[];
  metrics: {
    label: string;
    value: string;
    detail: string;
  }[];
  focusDomain: DomainReport;
  strengthDomain: DomainReport;
  weeklyPlan: {
    day: string;
    task: string;
    goal: string;
  }[];
}

const languageDomainIds: AdaptiveDomainId[] = ["reading_comprehension", "language_writing"];

export const adaptiveDomains: AdaptiveDomain[] = [
  {
    id: "reading_comprehension",
    label: "שטף והבנת הנקרא",
    shortLabel: "קריאה",
    emoji: "📖",
    color: "var(--accent-hebrew)",
    defaultPractice: [
      "לקרוא טקסט קצר ולענות על שאלת למה",
      "לבחור כותרת מתאימה לטקסט",
      "להוכיח תשובה בעזרת משפט מהטקסט",
    ],
  },
  {
    id: "language_writing",
    label: "שפה וכתיבה",
    shortLabel: "כתיבה",
    emoji: "✍️",
    color: "var(--accent-secondary)",
    defaultPractice: [
      "לכתוב 5 משפטים ברצף על חוויה",
      "להוסיף מילת קישור כמו כי, לכן או אבל",
      "לבדוק סימני פיסוק ורווחים בסוף הכתיבה",
    ],
  },
  {
    id: "number_sense",
    label: "חוש מספרי",
    shortLabel: "מספרים",
    emoji: "🔢",
    color: "var(--accent-math)",
    defaultPractice: [
      "לסדר 5 מספרים מהקטן לגדול",
      "לשאול בכל יום מה בא לפני ואחרי מספר",
      "לפרק מספר לעשרות ויחידות",
    ],
  },
  {
    id: "arithmetic",
    label: "ארבע פעולות",
    shortLabel: "חשבון",
    emoji: "🧮",
    color: "var(--accent-primary)",
    defaultPractice: [
      "לתרגל 5 תרגילי חיבור וחיסור בעזרת פירוק לעשרת",
      "לפתור בעיה מילולית אחת ביום",
      "לבקש מהילד להסביר איך חשב",
    ],
  },
  {
    id: "word_problems",
    label: "בעיות מילוליות",
    shortLabel: "בעיות",
    emoji: "🧠",
    color: "var(--accent-primary)",
    defaultPractice: [
      "לסמן נתונים ופעולה לפני פתרון",
      "לפתור בעיה דו שלבית אחת ביום",
      "לבקש מהילד להסביר למה בחר בפעולה",
    ],
  },
  {
    id: "geometry_data",
    label: "גאומטריה ומדידות",
    shortLabel: "צורות",
    emoji: "📐",
    color: "var(--accent-science)",
    defaultPractice: [
      "לזהות תכונות של מצולעים",
      "לחשב היקף בצורה פשוטה",
      "לקרוא טבלה או תרשים ולענות על שאלה",
    ],
  },
  {
    id: "patterns_logic",
    label: "חשיבה צורנית ולוגית",
    shortLabel: "חשיבה",
    emoji: "🧩",
    color: "var(--accent-knowledge)",
    defaultPractice: [
      "להשלים סדרת צורות או מספרים אחת ביום",
      "לשאול מה החוק שמסביר את הדגם",
      "למצוא יוצא דופן ולנמק למה",
    ],
  },
];

export const levelLabels: Record<number, string> = {
  0: "טרום שליטה",
  1: "בסיס כיתה א׳",
  2: "סוף כיתה א׳",
  3: "אמצע כיתה ב׳",
  4: "סוף כיתה ב׳",
  5: "סוף כיתה ג׳",
  6: "מצוינות סוף ג׳",
  7: "חשיבה מחוננת",
};

const vocalizedWords: Record<string, string> = {
  אבל: "אֲבָל",
  אדום: "אָדֹם",
  או: "אוֹ",
  אוהב: "אוֹהֵב",
  אומר: "אוֹמֵר",
  אורי: "אוּרִי",
  אותו: "אוֹתוֹ",
  אחד: "אֶחָד",
  אחידה: "אֲחִידָה",
  אחר: "אַחֵר",
  אחרי: "אַחֲרֵי",
  אחת: "אַחַת",
  אי: "אִי",
  איבר: "אֵיבָר",
  איזה: "אֵיזֶה",
  איזו: "אֵיזוֹ",
  איך: "אֵיךְ",
  אין: "אֵין",
  אינו: "אֵינוֹ",
  איפה: "אֵיפֹה",
  אכל: "אָכַל",
  אלא: "אֶלָּא",
  אלפים: "אֲלָפִים",
  אם: "אִם",
  אמא: "אִמָּא",
  אמרה: "אָמְרָה",
  אפשר: "אֶפְשָׁר",
  את: "אֶת",
  בא: "בָּא",
  באורך: "בְּאֹרֶךְ",
  באחד: "בְּאֶחָד",
  באנגלית: "בְּאַנְגְּלִית",
  באף: "בְּאַף",
  בבעיה: "בְּבְעָיָה",
  בגינה: "בַּגִּנָּה",
  בדיוק: "בְּדִיּוּק",
  בהוראה: "בְּהוֹרָאָה",
  בהקשר: "בְּהֶקְשֵׁר",
  בוודאות: "בְּוַדָּאוּת",
  בוקר: "בֹּקֶר",
  בחצר: "בֶּחָצֵר",
  בטבלה: "בְּטַבְלָה",
  בין: "בֵּין",
  ביער: "בַּיַּעַר",
  בכל: "בְּכָל",
  בכמה: "בְּכַמָּה",
  בלי: "בְּלִי",
  במילים: "בְּמִלִּים",
  במספר: "בְּמִסְפָּר",
  במפורש: "בִּמְפֹרָשׁ",
  במקום: "בִּמְקוֹם",
  במשמעות: "בְּמַשְׁמָעוּת",
  במשפט: "בְּמִשְׁפָּט",
  בנפרד: "בְּנִפְרָד",
  בסוף: "בַּסּוֹף",
  בסך: "בְּסַךְ",
  בעזרת: "בְּעֶזְרַת",
  בעיה: "בְּעָיָה",
  בעמודות: "בְּעַמּוּדוֹת",
  בקול: "בְּקוֹל",
  בקופסה: "בְּקֻפְסָה",
  בשורות: "בְּשׁוּרוֹת",
  בשני: "בִּשְׁנֵי",
  בשתי: "בִּשְׁתֵּי",
  בתוך: "בְּתוֹךְ",
  גדול: "גָּדוֹל",
  גדולה: "גְּדוֹלָה",
  גדלה: "גְּדֵלָה",
  גודל: "גֹּדֶל",
  גולות: "גּוּלוֹת",
  גוף: "גּוּף",
  גור: "גּוּר",
  גם: "גַּם",
  גשם: "גֶּשֶׁם",
  דג: "דָּג",
  דגם: "דֶּגֶם",
  דנה: "דָּנָה",
  דני: "דָּנִי",
  דרך: "דֶּרֶךְ",
  דרכי: "דַּרְכֵי",
  דרכים: "דְּרָכִים",
  האוויר: "הָאֲוִיר",
  האם: "הַאִם",
  הבית: "הַבַּיִת",
  הביתה: "הַבַּיְתָה",
  הגשם: "הַגֶּשֶׁם",
  הדלת: "הַדֶּלֶת",
  הדרך: "הַדֶּרֶךְ",
  ההבדל: "הַהֶבְדֵּל",
  הוא: "הוּא",
  הולך: "הוֹלֵךְ",
  הולכים: "הוֹלְכִים",
  הוראה: "הוֹרָאָה",
  הוראות: "הוֹרָאוֹת",
  החבר: "הֶחָבֵר",
  החוק: "הַחֹק",
  החסר: "הֶחָסֵר",
  החשוב: "הֶחָשׁוּב",
  היא: "הִיא",
  היה: "הָיָה",
  היו: "הָיוּ",
  היחיד: "הַיָּחִיד",
  הייתה: "הָיְתָה",
  היקף: "הֶקֵּף",
  הכדור: "הַכַּדּוּר",
  הכול: "הַכֹּל",
  הכי: "הֲכִי",
  הכלב: "הַכֶּלֶב",
  הכללה: "הַכְלָלָה",
  הכפלה: "הַכְפָּלָה",
  הלך: "הָלַךְ",
  הם: "הֵם",
  המטרייה: "הַמִּטְרִיָּה",
  המילה: "הַמִּלָּה",
  המספר: "הַמִּסְפָּר",
  המרות: "הֲמָרוֹת",
  המשפט: "הַמִּשְׁפָּט",
  הן: "הֵן",
  הנכון: "הַנָּכוֹן",
  הסדרה: "הַסִּדְרָה",
  הסיפורים: "הַסִּפּוּרִים",
  הסס: "הִסֵּס",
  הספרה: "הַסִּפְרָה",
  הסקה: "הַסָּקָה",
  העיגול: "הָעִגּוּל",
  העיפרון: "הָעִפָּרוֹן",
  העיקר: "הָעִקָּר",
  הערך: "הָעֵרֶךְ",
  הפירוק: "הַפֵּרוּק",
  הצבע: "הַצֶּבַע",
  הצורה: "הַצּוּרָה",
  הצלעות: "הַצְּלָעוֹת",
  הקשר: "הֶקְשֵׁר",
  הראשון: "הָרִאשׁוֹן",
  הרבה: "הַרְבֵּה",
  הרקע: "הָרֶקַע",
  השולחן: "הַשֻּׁלְחָן",
  השלילה: "הַשְּׁלִילָה",
  השלם: "הַשְׁלֵם",
  השמיים: "הַשָּׁמַיִם",
  התלבט: "הִתְלַבֵּט",
  התלבטה: "הִתְלַבְּטָה",
  התשובה: "הַתְּשׁוּבָה",
  התשובות: "הַתְּשׁוּבוֹת",
  ואז: "וְאָז",
  ואמא: "וְאִמָּא",
  ובכל: "וּבְכָל",
  וגם: "וְגַם",
  והמכפלה: "וְהַמַּכְפֵּלָה",
  ויחידות: "וִיחִידוֹת",
  וכמה: "וְכַמָּה",
  וכפפות: "וּכְפָפוֹת",
  ולא: "וְלֹא",
  ומקבלים: "וּמְקַבְּלִים",
  ונמשך: "וְנִמְשָׁךְ",
  ונתן: "וְנָתַן",
  ושמחים: "וּשְׂמֵחִים",
  זאת: "זֹאת",
  זה: "זֶה",
  זהים: "זֵהִים",
  זיהוי: "זִהוּי",
  זמן: "זְמַן",
  חד: "חַד",
  חדש: "חָדָשׁ",
  חדשה: "חֲדָשָׁה",
  חוזר: "חוֹזֵר",
  חוק: "חֹק",
  חוקיות: "חֻקִּיּוּת",
  חזקה: "חֲזָקָה",
  חזרנו: "חָזַרְנוּ",
  חיבור: "חִבּוּר",
  חילוק: "חִלּוּק",
  חילקו: "חִלְּקוּ",
  חיסור: "חִסּוּר",
  חישוב: "חִשּׁוּב",
  חם: "חַם",
  חסר: "חָסֵר",
  חפצים: "חֲפָצִים",
  חקר: "חֵקֶר",
  חרק: "חֶרֶק",
  חשוב: "חָשׁוּב",
  חשובה: "חֲשׁוּבָה",
  חשובות: "חֲשׁוּבוֹת",
  חשיבה: "חֲשִׁיבָה",
  חתול: "חָתוּל",
  חתולים: "חֲתוּלִים",
  טבלה: "טַבְלָה",
  טוב: "טוֹב",
  טובה: "טוֹבָה",
  טובים: "טוֹבִים",
  טיול: "טִיּוּל",
  יד: "יָד",
  ידעה: "יָדְעָה",
  יואב: "יוֹאָב",
  יום: "יוֹם",
  יומיומיים: "יוֹמְיוֹמִיִּים",
  יונק: "יוֹנֵק",
  יוצא: "יוֹצֵא",
  יותר: "יוֹתֵר",
  יחד: "יַחַד",
  יחיד: "יָחִיד",
  יחידות: "יְחִידוֹת",
  יחס: "יַחַס",
  ייתכן: "יִתָּכֵן",
  ילד: "יֶלֶד",
  ילדה: "יַלְדָּה",
  ילדות: "יְלָדוֹת",
  ילדים: "יְלָדִים",
  יצא: "יָצָא",
  יקרה: "יִקְרֶה",
  ירוק: "יָרֹק",
  יש: "יֵשׁ",
  ישן: "יָשֵׁן",
  כדאי: "כְּדַאי",
  כדור: "כַּדּוּר",
  כדי: "כְּדֵי",
  כובע: "כּוֹבַע",
  כולם: "כֻּלָּם",
  כותרת: "כּוֹתֶרֶת",
  כחול: "כָּחֹל",
  כחולה: "כְּחֻלָּה",
  כי: "כִּי",
  כיסא: "כִּסֵּא",
  כך: "כָּךְ",
  כל: "כָּל",
  כלב: "כֶּלֶב",
  כלל: "כְּלָל",
  כמה: "כַּמָּה",
  כמו: "כְּמוֹ",
  כפול: "כָּפוּל",
  כפל: "כֶּפֶל",
  כתוב: "כָּתוּב",
  לא: "לֹא",
  לאכול: "לֶאֱכֹל",
  לאמא: "לְאִמָּא",
  לאן: "לְאָן",
  לבדוק: "לִבְדֹּק",
  לבקש: "לְבַקֵּשׁ",
  לבקשה: "לְבַקָּשָׁה",
  לבש: "לָבַשׁ",
  לגדול: "לַגָּדוֹל",
  לדעת: "לָדַעַת",
  להבין: "לְהָבִין",
  להגיע: "לְהַגִּיעַ",
  להוסיף: "לְהוֹסִיף",
  להחליט: "לְהַחְלִיט",
  להמשיך: "לְהַמְשִׁיךְ",
  להסיק: "לְהַסִּיק",
  להפוך: "לַהֲפֹךְ",
  להצטרף: "לְהִצְטָרֵף",
  להשאיר: "לְהַשְׁאִיר",
  להשוות: "לְהַשְׁווֹת",
  לו: "לוֹ",
  לזהות: "לְזַהוֹת",
  לחבר: "לְחַבֵּר",
  לחפש: "לְחַפֵּשׂ",
  לחצר: "לֶחָצֵר",
  לטקסט: "לַטֶּקְסְט",
  ליד: "לְיַד",
  ליואב: "לְיוֹאָב",
  ליונק: "לְיוֹנֵק",
  לים: "לַיָּם",
  לכל: "לְכָל",
  לכפפה: "לַכְּפָפָה",
  לכתוב: "לִכְתֹּב",
  ללמוד: "לִלְמֹד",
  למאות: "לְמֵאוֹת",
  למה: "לָמָּה",
  למחוק: "לִמְחֹק",
  למיטה: "לַמִּטָּה",
  למילה: "לַמִּלָּה",
  למלבן: "לַמַּלְבֵּן",
  למצוא: "לִמְצֹא",
  למשולש: "לַמְּשֻׁלָּשׁ",
  למשחק: "לַמִּשְׂחָק",
  לנחש: "לְנַחֵשׁ",
  לסדר: "לְסַדֵּר",
  לסוף: "לַסּוֹף",
  לסמן: "לְסַמֵּן",
  לספור: "לִסְפֹּר",
  לעומת: "לְעֻמַּת",
  לענות: "לַעֲנוֹת",
  לעצור: "לַעֲצֹר",
  לעשרות: "לַעֲשָׂרוֹת",
  לפני: "לִפְנֵי",
  לפרק: "לְפָרֵק",
  לצייר: "לְצַיֵּר",
  לקח: "לָקַח",
  לקחה: "לָקְחָה",
  לקחת: "לָקַחַת",
  לקרוא: "לִקְרֹא",
  לרוץ: "לָרוּץ",
  לשאול: "לִשְׁאֹל",
  לשולחן: "לַשֻּׁלְחָן",
  לשלב: "לְשַׁלֵּב",
  לשם: "לְשָׁם",
  לשפר: "לְשַׁפֵּר",
  לתרגל: "לְתַרְגֵּל",
  מאוד: "מְאֹד",
  מאות: "מֵאוֹת",
  מבנה: "מִבְנֶה",
  מבקשים: "מְבַקְּשִׁים",
  מדבקות: "מַדְבֵּקוֹת",
  מדויק: "מְדֻיָּק",
  מה: "מָה",
  מהם: "מֵהֶם",
  מהר: "מַהֵר",
  מוכיחה: "מוֹכִיחָה",
  מוסיפים: "מוֹסִיפִים",
  מורכבת: "מֻרְכֶּבֶת",
  מזג: "מֶזֶג",
  מחומש: "מְחֻמָּשׁ",
  מחפשים: "מְחַפְּשִׂים",
  מחר: "מָחָר",
  מטרייה: "מִטְרִיָּה",
  מי: "מִי",
  מיד: "מִיָּד",
  מיוזמה: "מִיָּזְמָה",
  מייצגת: "מְיַצֶּגֶת",
  מילה: "מִלָּה",
  מילולית: "מִלּוּלִית",
  מילים: "מִלִּים",
  מים: "מַיִם",
  מלבן: "מַלְבֵּן",
  ממנו: "מִמֶּנּוּ",
  מספר: "מִסְפָּר",
  מספרים: "מִסְפָּרִים",
  מסתיים: "מִסְתַּיֵּם",
  מעיל: "מְעִיל",
  מפורש: "מְפֹרָשׁ",
  מצאה: "מָצְאָה",
  מצולע: "מְצֻלָּע",
  מצולעים: "מְצֻלָּעִים",
  מרובע: "מְרֻבָּע",
  משולש: "מְשֻׁלָּשׁ",
  משלימה: "מַשְׁלִימָה",
  משמעות: "מַשְׁמָעוּת",
  משפט: "מִשְׁפָּט",
  משפטים: "מִשְׁפָּטִים",
  משתנה: "מִשְׁתַּנֶּה",
  מתאים: "מַתְאִים",
  מתאימה: "מַתְאִימָה",
  מתארת: "מְתָאֶרֶת",
  מתוך: "מִתּוֹךְ",
  מתחיל: "מַתְחִיל",
  מתחת: "מִתַּחַת",
  מתי: "מָתַי",
  נדיב: "נָדִיב",
  נוחה: "נוֹחָה",
  נוספת: "נוֹסֶפֶת",
  נועה: "נוֹעָה",
  ניחוש: "נִחוּשׁ",
  נימוק: "נִמּוּק",
  נכון: "נָכוֹן",
  נכונה: "נְכוֹנָה",
  נעל: "נַעַל",
  נעליים: "נַעֲלַיִם",
  נשארו: "נִשְׁאֲרוּ",
  נתן: "נָתַן",
  נתנה: "נָתְנָה",
  סביב: "סָבִיב",
  סדר: "סֵדֶר",
  סדרה: "סִדְרָה",
  סוס: "סוּס",
  סיבה: "סִבָּה",
  סיימה: "סִיְּמָה",
  סימן: "סִימָן",
  סיפור: "סִפּוּר",
  סיפורים: "סִפּוּרִים",
  סמן: "סַמֵּן",
  ספר: "סֵפֶר",
  ספרה: "סִפְרָה",
  ספרים: "סְפָרִים",
  עגול: "עָגֹל",
  עגולה: "עֲגֻלָּה",
  עד: "עַד",
  עוד: "עוֹד",
  עוזרים: "עוֹזְרִים",
  עוף: "עוֹף",
  עזרה: "עֶזְרָה",
  עיגול: "עִגּוּל",
  עייפים: "עֲיֵפִים",
  עיפרון: "עִפָּרוֹן",
  עכשיו: "עַכְשָׁיו",
  על: "עַל",
  עליו: "עָלָיו",
  עם: "עִם",
  עמודה: "עַמּוּדָה",
  עצם: "עֶצֶם",
  עצמה: "עַצְמָהּ",
  ערך: "עֵרֶךְ",
  עשרוני: "עֶשְׂרוֹנִי",
  עשרות: "עֲשָׂרוֹת",
  פוחד: "פּוֹחֵד",
  פחות: "פָּחוֹת",
  פינות: "פִּנּוֹת",
  פירוק: "פֵּרוּק",
  פירוש: "פֵּרוּשׁ",
  פסיק: "פְּסִיק",
  פסקה: "פִּסְקָה",
  פעולה: "פְּעֻלָּה",
  פעולות: "פְּעֻלּוֹת",
  פעם: "פַּעַם",
  פרח: "פֶּרַח",
  פרט: "פְּרָט",
  פשוט: "פָּשׁוּט",
  פשוטה: "פְּשׁוּטָה",
  פתרון: "פִּתְרוֹן",
  צבע: "צֶבַע",
  צהוב: "צָהֹב",
  צורה: "צוּרָה",
  צורות: "צוּרוֹת",
  צורנית: "צוּרָנִית",
  צחקה: "צָחֲקָה",
  ציפור: "צִפּוֹר",
  צלעות: "צְלָעוֹת",
  צמח: "צֶמַח",
  צעיף: "צָעִיף",
  צריך: "צָרִיךְ",
  קבוע: "קָבוּעַ",
  קבוצות: "קְבוּצוֹת",
  קודם: "קֹדֶם",
  קופצת: "קוֹפֶצֶת",
  קטגוריה: "קָטֵגוֹרְיָה",
  קטן: "קָטָן",
  קיבלה: "קִבְּלָה",
  קישור: "קִשּׁוּר",
  קנו: "קָנוּ",
  קצר: "קָצָר",
  קצרה: "קְצָרָה",
  קר: "קַר",
  קרא: "קָרָא",
  קראה: "קָרְאָה",
  קרה: "קָרָה",
  קרוב: "קָרוֹב",
  קריאה: "קְרִיאָה",
  קשורים: "קְשׁוּרִים",
  קשר: "קֶשֶׁר",
  ראה: "רָאָה",
  ראשונה: "רִאשׁוֹנָה",
  רב: "רַב",
  רבים: "רַבִּים",
  רגל: "רֶגֶל",
  רוני: "רוֹנִי",
  ריבוע: "רִבּוּעַ",
  רעיון: "רַעְיוֹן",
  רצה: "רָצָה",
  רצף: "רֶצֶף",
  רק: "רַק",
  שאינה: "שֶׁאֵינָהּ",
  שאלות: "שְׁאֵלוֹת",
  שאלת: "שְׁאֵלַת",
  שבהן: "שֶׁבָּהֶן",
  שבין: "שֶׁבֵּין",
  שהוא: "שֶׁהוּא",
  שהיה: "שֶׁהָיָה",
  שווה: "שָׁוֶה",
  שווים: "שָׁוִים",
  שוות: "שָׁווֹת",
  שולחן: "שֻׁלְחָן",
  שונות: "שׁוֹנוֹת",
  שורה: "שׁוּרָה",
  שורות: "שׁוּרוֹת",
  שחברו: "שֶׁחֲבֵרוֹ",
  שייך: "שַׁיָּךְ",
  שייתכן: "שֶׁיִּתָּכֵן",
  שיעור: "שִׁעוּר",
  שיעורים: "שִׁעוּרִים",
  שירד: "שֶׁיֵּרֵד",
  שכח: "שָׁכַח",
  של: "שֶׁל",
  שלא: "שֶׁלֹּא",
  שלבית: "שְׁלַבִּית",
  שלהם: "שֶׁלָּהֶם",
  שלילה: "שְׁלִילָה",
  שם: "שָׁם",
  שמיים: "שָׁמַיִם",
  שמוכיח: "שֶׁמּוֹכִיחַ",
  שמנחשים: "שֶׁמְּנַחֲשִׁים",
  שמסביר: "שֶׁמַּסְבִּיר",
  שמסכמת: "שֶׁמְּסַכֶּמֶת",
  שמו: "שָׂמוּ",
  שמש: "שֶׁמֶשׁ",
  שמתאים: "שֶׁמַּתְאִים",
  שני: "שְׁנֵי",
  שנייה: "שְׁנִיָּה",
  שסכומם: "שֶׁסְּכוּמָם",
  שעה: "שָׁעָה",
  שקיות: "שַׂקִּיּוֹת",
  שקית: "שַׂקִּית",
  שתי: "שְׁתֵּי",
  תגובה: "תְּגוּבָה",
  תיק: "תִּיק",
  תכונה: "תְּכוּנָה",
  תנאי: "תְּנַאי",
  תנאים: "תְּנָאִים",
  תפוחים: "תַּפּוּחִים",
  תרגיל: "תַּרְגִּיל",
  תרנגולת: "תַּרְנְגֹלֶת",
  תשובה: "תְּשׁוּבָה",
};

const prefixNikud: Record<string, string> = {
  ו: "וְ",
  ה: "הַ",
  ב: "בְּ",
  ל: "לְ",
  כ: "כְּ",
  מ: "מִ",
  ש: "שֶׁ",
};

export function formatAssessmentText(text: string, readingSupport: AdaptiveReadingSupport): string {
  const plainText = stripNikud(text);
  if (readingSupport === "without_nikud") return plainText;

  return plainText.replace(/[א-ת׳״]+/g, (token) => vocalizeToken(token));
}

function vocalizeToken(token: string): string {
  const plainToken = stripNikud(token);
  const directMatch = vocalizedWords[plainToken];
  if (directMatch) return directMatch;

  for (const prefix of ["ו", "ה", "ב", "ל", "כ", "מ", "ש"]) {
    if (plainToken.length > 2 && plainToken.startsWith(prefix)) {
      const base = plainToken.slice(prefix.length);
      const vocalizedBase = vocalizedWords[base];
      if (vocalizedBase) return `${prefixNikud[prefix]}${vocalizedBase}`;
    }
  }

  return plainToken;
}

export const adaptiveItems: AdaptiveItem[] = [
  {
    id: "rc-2-title",
    domainId: "reading_comprehension",
    level: 2,
    skill: "כותרת לטקסט קצר",
    prompt: "רוני ראה כלב קטן בגינה. הוא נתן לו מים וקרא לאמא. איזו כותרת מתאימה?",
    type: "multiple_choice",
    options: ["הכלב בגינה", "הטיול הארוך", "הכדור האדום", "הגשם הראשון"],
    answer: "הכלב בגינה",
    practice: "לקרוא 3 משפטים ולבחור כותרת שמסכמת את העיקר.",
  },
  {
    id: "rc-3-why",
    domainId: "reading_comprehension",
    level: 3,
    skill: "הסקה פשוטה",
    prompt: "דני לבש מעיל, צעיף וכפפות. מה אפשר להבין על מזג האוויר?",
    type: "multiple_choice",
    options: ["חם מאוד", "קר", "יש שמש חזקה", "דני הולך לים"],
    answer: "קר",
    practice: "לשאול מה אפשר להבין גם כשהטקסט לא אומר זאת במפורש.",
  },
  {
    id: "rc-4-context",
    domainId: "reading_comprehension",
    level: 4,
    skill: "מילה לפי הקשר",
    prompt: "במשפט: 'נועה התלבטה אם להצטרף למשחק', מה פירוש התלבטה?",
    type: "multiple_choice",
    options: ["לא ידעה מה להחליט", "רצה מהר", "צחקה בקול", "סיימה לאכול"],
    answer: "לא ידעה מה להחליט",
    practice: "לנחש משמעות של מילה חדשה לפי המשפט שסביבה.",
  },
  {
    id: "rc-5-proof",
    domainId: "reading_comprehension",
    level: 5,
    skill: "הוכחה מהטקסט",
    prompt: "אמא אמרה לאורי לקחת מטרייה כי השמיים היו אפורים. איזו שורה מוכיחה שייתכן גשם?",
    type: "multiple_choice",
    options: ["השמיים היו אפורים", "אורי לקח תיק", "אמא קראה ספר", "הדרך הייתה קצרה"],
    answer: "השמיים היו אפורים",
    practice: "לענות ואז למצוא משפט שמוכיח את התשובה.",
  },
  {
    id: "rc-6-character",
    domainId: "reading_comprehension",
    level: 6,
    skill: "אופי דמות",
    prompt: "ילד ראה שחברו שכח עיפרון ונתן לו את העיפרון היחיד שהיה לו. מה אפשר ללמוד עליו?",
    type: "multiple_choice",
    options: ["שהוא נדיב", "שהוא פוחד מעפרונות", "שהוא שכח שיעורים", "שהוא אוהב לרוץ"],
    answer: "שהוא נדיב",
    practice: "להסיק תכונה של דמות מתוך פעולה ולנמק.",
  },
  {
    id: "rc-7-compare",
    domainId: "reading_comprehension",
    level: 7,
    skill: "השוואה וביקורת",
    prompt: "בשני סיפורים ילדים עוזרים לחבר. באחד הם עוזרים מיד, ובשני רק אחרי שמבקשים מהם. מה ההבדל החשוב?",
    type: "multiple_choice",
    options: ["מיוזמה לעומת תגובה לבקשה", "שני הסיפורים זהים", "אין עזרה באף סיפור", "החבר לא צריך עזרה"],
    answer: "מיוזמה לעומת תגובה לבקשה",
    practice: "להשוות בין שני טקסטים לפי רעיון ולא רק לפי פרטים.",
  },

  {
    id: "lw-2-gender",
    domainId: "language_writing",
    level: 2,
    skill: "זכר ונקבה",
    prompt: "מה נכון לכתוב?",
    type: "multiple_choice",
    options: ["ילדה טובה", "ילדה טוב", "ילדה טובים", "ילדה טובותים"],
    answer: "ילדה טובה",
    practice: "לתרגל התאמה בין שם עצם לתואר: ילד טוב, ילדה טובה.",
  },
  {
    id: "lw-3-plural",
    domainId: "language_writing",
    level: 3,
    skill: "יחיד ורבים",
    prompt: "השלם: ילד אחד, שני ___",
    type: "multiple_choice",
    options: ["ילד", "ילדים", "ילדות", "ילדי"],
    answer: "ילדים",
    practice: "לתרגל יחיד/רבים עם מילים יומיומיות.",
  },
  {
    id: "lw-4-connective",
    domainId: "language_writing",
    level: 4,
    skill: "מילת קישור",
    prompt: "איזו מילה משלימה טוב: דנה לקחה מעיל ___ היה קר.",
    type: "multiple_choice",
    options: ["כי", "אבל", "או", "גם"],
    answer: "כי",
    practice: "לכתוב משפטי סיבה עם המילה כי.",
  },
  {
    id: "lw-5-paragraph",
    domainId: "language_writing",
    level: 5,
    skill: "רצף פסקה",
    prompt: "איזה משפט מתאים לסוף פסקה על טיול ביער?",
    type: "multiple_choice",
    options: ["בסוף חזרנו הביתה עייפים ושמחים.", "המספר 8 גדול מ-6.", "הכדור היה מתחת למיטה.", "מחר נלמד כפל."],
    answer: "בסוף חזרנו הביתה עייפים ושמחים.",
    practice: "לכתוב פסקה עם התחלה, אמצע וסוף.",
  },
  {
    id: "lw-6-improve",
    domainId: "language_writing",
    level: 6,
    skill: "שיפור ניסוח",
    prompt: "איך אפשר לשפר את המשפט: 'הוא הלך לשם ולקח את זה'?",
    type: "multiple_choice",
    options: ["לכתוב מי הלך, לאן ומה לקח", "להשאיר בדיוק כך", "למחוק את כל המשפט", "להוסיף רק סימן קריאה"],
    answer: "לכתוב מי הלך, לאן ומה לקח",
    practice: "להחליף מילים כלליות כמו הוא/שם/זה במילים מדויקות.",
  },
  {
    id: "lw-7-argument",
    domainId: "language_writing",
    level: 7,
    skill: "נימוק",
    prompt: "מה חסר במשפט: 'כדאי לקרוא כל יום כי זה חשוב'?",
    type: "multiple_choice",
    options: ["נימוק שמסביר למה זה חשוב", "עוד פסיק אחרי כל מילה", "מילה באנגלית", "מספר תרגיל"],
    answer: "נימוק שמסביר למה זה חשוב",
    practice: "לבקש מהילד להוסיף נימוק ודוגמה לדעה.",
  },

  {
    id: "ns-1-after-9",
    domainId: "number_sense",
    level: 1,
    skill: "אחרי/לפני",
    prompt: "איזה מספר בא אחרי 9?",
    type: "multiple_choice",
    options: ["8", "10", "11", "19"],
    answer: "10",
    practice: "לתרגל לפני/אחרי עם מספרים עד 20.",
  },
  {
    id: "ns-1-compare",
    domainId: "number_sense",
    level: 1,
    skill: "השוואה",
    prompt: "מה גדול יותר: 7 או 5?",
    type: "multiple_choice",
    options: ["7", "5", "שווים", "אי אפשר לדעת"],
    answer: "7",
    practice: "להשוות זוגות מספרים קטנים בעזרת חפצים.",
  },
  {
    id: "ns-2-after-29",
    domainId: "number_sense",
    level: 2,
    skill: "מספרים עד 100",
    prompt: "איזה מספר בא אחרי 29?",
    type: "multiple_choice",
    options: ["28", "30", "39", "20"],
    answer: "30",
    practice: "לספור בקול סביב מעברי עשרת: 18-22, 28-32, 38-42.",
  },
  {
    id: "ns-2-order",
    domainId: "number_sense",
    level: 2,
    skill: "סדר מספרים",
    prompt: "איזה סדר הוא מהקטן לגדול?",
    type: "multiple_choice",
    options: ["9, 12, 19, 21", "12, 9, 19, 21", "21, 19, 12, 9", "9, 21, 12, 19"],
    answer: "9, 12, 19, 21",
    practice: "לסדר 4 מספרים שונים מהקטן לגדול ולנמק.",
  },
  {
    id: "ns-3-tens-ones",
    domainId: "number_sense",
    level: 3,
    skill: "עשרות ויחידות",
    prompt: "כמה עשרות וכמה יחידות יש במספר 46?",
    type: "multiple_choice",
    options: ["4 עשרות ו-6 יחידות", "6 עשרות ו-4 יחידות", "40 עשרות ו-6 יחידות", "46 עשרות"],
    answer: "4 עשרות ו-6 יחידות",
    practice: "לפרק מספרים דו ספרתיים לעשרות ויחידות.",
  },
  {
    id: "ns-3-place-value",
    domainId: "number_sense",
    level: 3,
    skill: "ערך ספרה",
    prompt: "במספר 58, מה מייצגת הספרה 5?",
    type: "multiple_choice",
    options: ["5 יחידות", "5 עשרות", "50 מאות", "58"],
    answer: "5 עשרות",
    practice: "לשאול מה הערך של כל ספרה במספר דו ספרתי.",
  },
  {
    id: "ns-4-hundreds",
    domainId: "number_sense",
    level: 4,
    skill: "מאות",
    prompt: "במספר 372, מה מייצגת הספרה 7?",
    type: "multiple_choice",
    options: ["7 יחידות", "7 עשרות", "7 מאות", "70 מאות"],
    answer: "7 עשרות",
    practice: "לפרק מספרים תלת ספרתיים למאות, עשרות ויחידות.",
  },
  {
    id: "ns-5-rule",
    domainId: "number_sense",
    level: 5,
    skill: "חוקיות מספרית",
    prompt: "איזה מספר חסר: 110, 120, __, 140",
    type: "open_input",
    answer: "130",
    practice: "למצוא קפיצות קבועות בסדרות מספרים.",
  },

  {
    id: "ar-1-add",
    domainId: "arithmetic",
    level: 1,
    skill: "חיבור עד 10",
    prompt: "3 + 4 = ?",
    type: "open_input",
    answer: "7",
    practice: "לתרגל חיבור עד 10 בעזרת אצבעות או חפצים.",
  },
  {
    id: "ar-1-sub",
    domainId: "arithmetic",
    level: 1,
    skill: "חיסור עד 10",
    prompt: "9 - 5 = ?",
    type: "open_input",
    answer: "4",
    practice: "לתרגל חיסור עד 10 עם ציור מחיקות.",
  },
  {
    id: "ar-2-add-20",
    domainId: "arithmetic",
    level: 2,
    skill: "חיבור עד 20",
    prompt: "8 + 5 = ?",
    type: "open_input",
    answer: "13",
    practice: "לתרגל מעבר עשרת עם 8+5, 9+4, 7+6.",
  },
  {
    id: "ar-2-word-add",
    domainId: "arithmetic",
    level: 2,
    skill: "בעיה מילולית",
    prompt: "היו 5 תפוחים. שמו עוד 3. כמה יש עכשיו?",
    type: "open_input",
    answer: "8",
    practice: "לצייר בעיה מילולית קצרה ולכתוב תרגיל מתאים.",
  },
  {
    id: "ar-3-bridge",
    domainId: "arithmetic",
    level: 3,
    skill: "מעבר עשרת",
    prompt: "18 + 7 = ?",
    type: "open_input",
    answer: "25",
    practice: "לתרגל פירוק לעשרת: 18+2 ואז +5.",
  },
  {
    id: "ar-3-two-step",
    domainId: "arithmetic",
    level: 3,
    skill: "בעיה דו שלבית",
    prompt: "לנועה היו 12 מדבקות. היא קיבלה 7 ואז נתנה 4. כמה נשארו?",
    type: "open_input",
    answer: "15",
    practice: "לסמן בבעיה מילים שמראות פעולה ראשונה ופעולה שנייה.",
  },
  {
    id: "ar-4-add-100",
    domainId: "arithmetic",
    level: 4,
    skill: "חיבור עד 100",
    prompt: "46 + 28 = ?",
    type: "open_input",
    answer: "74",
    practice: "לפרק לעשרות ויחידות לפני החיבור.",
  },
  {
    id: "ar-5-strategy",
    domainId: "arithmetic",
    level: 5,
    skill: "אסטרטגיה",
    prompt: "99 + 36 = ?",
    type: "open_input",
    answer: "135",
    practice: "לתרגל חישוב נוח: להפוך 99 ל-100 ולהחזיר 1.",
  },

  {
    id: "in-1-sentence",
    domainId: "reading_comprehension",
    level: 1,
    skill: "הבנת משפט",
    prompt: "הכלב ישן מתחת לשולחן. איפה הכלב?",
    type: "multiple_choice",
    options: ["על השולחן", "מתחת לשולחן", "בחצר", "ליד הדלת"],
    answer: "מתחת לשולחן",
    practice: "לקרוא משפט ולשאול שאלת איפה/מי/מה.",
  },
  {
    id: "in-2-sequence",
    domainId: "reading_comprehension",
    level: 2,
    skill: "רצף פשוט",
    prompt: "אורי נעל נעליים ואז יצא לחצר. מה קרה קודם?",
    type: "multiple_choice",
    options: ["יצא לחצר", "נעל נעליים", "אכל ארוחת בוקר", "קרא ספר"],
    answer: "נעל נעליים",
    practice: "לסמן במילים קודם/אחר כך בתוך משפט קצר.",
  },
  {
    id: "in-2-explicit",
    domainId: "reading_comprehension",
    level: 2,
    skill: "פרט מפורש",
    prompt: "דנה מצאה גור חתולים ליד הבית. מה דנה מצאה?",
    type: "multiple_choice",
    options: ["גור חתולים", "כדור", "ספר", "ציפור"],
    answer: "גור חתולים",
    practice: "לחפש פרט מפורש במשפט לפני שמנחשים.",
  },
  {
    id: "in-3-inference",
    domainId: "reading_comprehension",
    level: 3,
    skill: "הסקה פשוטה",
    prompt: "השמיים היו אפורים ואמא אמרה לקחת מטרייה. למה?",
    type: "multiple_choice",
    options: ["כי חם מאוד", "כי ייתכן שירד גשם", "כי הולכים לים", "כי המטרייה חדשה"],
    answer: "כי ייתכן שירד גשם",
    acceptedAnswers: ["ייתכן שירד גשם", "גשם"],
    practice: "לשאול מה אפשר להבין גם אם זה לא כתוב במפורש.",
  },
  {
    id: "in-4-negation",
    domainId: "reading_comprehension",
    level: 4,
    skill: "הבנת שלילה",
    prompt: "אם מבקשים לסמן את הצורה שאינה כחולה, מה צריך לחפש?",
    type: "multiple_choice",
    options: ["צורה כחולה", "צורה לא כחולה", "רק עיגול", "רק משולש"],
    answer: "צורה לא כחולה",
    practice: "לתרגל הוראות עם לא/אינו/בלי ולסמן את מילת השלילה.",
  },
  {
    id: "in-5-complex",
    domainId: "reading_comprehension",
    level: 5,
    skill: "הוראה מורכבת",
    prompt: "איזו מילה הכי חשובה בהוראה: סמן את הצורה שבין העיגול למשולש, אבל רק אם היא גדולה מהכוכב?",
    type: "multiple_choice",
    options: ["בין", "גדולה", "רק אם", "כל התשובות חשובות"],
    answer: "כל התשובות חשובות",
    practice: "לפרק הוראה מורכבת לשני תנאים לפני ביצוע.",
  },

  {
    id: "pl-1-shape",
    domainId: "patterns_logic",
    level: 1,
    skill: "זיהוי צורות",
    prompt: "איזו צורה עגולה?",
    type: "multiple_choice",
    options: ["עיגול", "ריבוע", "משולש", "מלבן"],
    answer: "עיגול",
    practice: "למיין צורות לפי תכונה אחת: עגול, פינות, צלעות.",
  },
  {
    id: "pl-2-pattern",
    domainId: "patterns_logic",
    level: 2,
    skill: "דגם חוזר",
    prompt: "מה בא אחרי: ● ▲ ● ▲ ● ?",
    type: "multiple_choice",
    options: ["●", "▲", "■", "★"],
    answer: "▲",
    practice: "להמשיך דגמים חוזרים ולומר בקול את החוק.",
  },
  {
    id: "pl-2-odd",
    domainId: "patterns_logic",
    level: 2,
    skill: "יוצא דופן",
    prompt: "מה לא שייך: כלב, חתול, סוס, שולחן",
    type: "multiple_choice",
    options: ["כלב", "חתול", "סוס", "שולחן"],
    answer: "שולחן",
    practice: "למצוא יוצא דופן ולנמק לפי קטגוריה.",
  },
  {
    id: "pl-3-series",
    domainId: "patterns_logic",
    level: 3,
    skill: "סדרת קפיצות",
    prompt: "5, 10, 15, 20, ?",
    type: "open_input",
    answer: "25",
    practice: "לזהות בכמה הסדרה קופצת בכל פעם.",
  },
  {
    id: "pl-4-series",
    domainId: "patterns_logic",
    level: 4,
    skill: "סדרה לא אחידה",
    prompt: "1, 2, 4, 7, 11, ?",
    type: "open_input",
    answer: "16",
    practice: "לבדוק האם הקפיצה עצמה גדלה: +1, +2, +3.",
  },
  {
    id: "pl-5-analogy",
    domainId: "patterns_logic",
    level: 5,
    skill: "אנלוגיה",
    prompt: "יד היא לכפפה כמו רגל היא ל-?",
    type: "multiple_choice",
    options: ["כובע", "נעל", "כיסא", "שולחן"],
    answer: "נעל",
    acceptedAnswers: ["נעל", "גרב"],
    practice: "לתרגל אנלוגיות: איבר גוף והחפץ שמתאים לו.",
  },
  {
    id: "ns-5-decompose-4372",
    domainId: "number_sense",
    level: 5,
    skill: "מבנה עשרוני עד 10,000",
    prompt: "מה הפירוק הנכון של 4,372?",
    type: "multiple_choice",
    options: [
      "4,000 + 300 + 70 + 2",
      "400 + 30 + 7 + 2",
      "4,000 + 30 + 700 + 2",
      "4 + 3 + 7 + 2",
    ],
    answer: "4,000 + 300 + 70 + 2",
    acceptedAnswers: ["4000 + 300 + 70 + 2", "4000+300+70+2"],
    practice: "לפרק מספרים עד 10,000 לאלפים, מאות, עשרות ויחידות.",
  },
  {
    id: "ns-6-flexible-number",
    domainId: "number_sense",
    level: 6,
    skill: "גמישות מספרית",
    prompt: "איזה מספר שווה ל-3 אלפים, 12 מאות ו-5 יחידות?",
    type: "multiple_choice",
    options: ["3,125", "4,205", "4,250", "4,025"],
    answer: "4,205",
    practice: "לתרגל המרות לא שגרתיות: 12 מאות הן 1,200.",
  },
  {
    id: "ns-7-generalize",
    domainId: "number_sense",
    level: 7,
    skill: "הכללה",
    prompt: "אם מוסיפים 1 לכל ספרה במספר 234 ומקבלים 345, מה יקרה ל-678?",
    type: "multiple_choice",
    options: ["789", "679", "688", "777"],
    answer: "789",
    practice: "לזהות כלל ולהחיל אותו על מספר חדש.",
  },

  {
    id: "ar-5-subtract",
    domainId: "arithmetic",
    level: 5,
    skill: "חיסור רב ספרתי",
    prompt: "803 - 459 = ?",
    type: "open_input",
    answer: "344",
    practice: "לתרגל חיסור עם המרות ולבדוק בחיבור חוזר.",
  },
  {
    id: "ar-6-relations",
    domainId: "arithmetic",
    level: 6,
    skill: "קשר בין פעולות",
    prompt: "אם 7 × 8 = 56, מה נכון בוודאות?",
    type: "multiple_choice",
    options: ["56 ÷ 7 = 8", "56 + 7 = 8", "8 ÷ 56 = 7", "7 - 8 = 56"],
    answer: "56 ÷ 7 = 8",
    practice: "להפוך תרגיל כפל לתרגילי חילוק קשורים.",
  },
  {
    id: "ar-7-algebra-lite",
    domainId: "arithmetic",
    level: 7,
    skill: "חשיבה אלגברית התחלתית",
    prompt: "מספר כפול 4 גדול ממנו ב-27. מה המספר?",
    type: "open_input",
    answer: "9",
    practice: "לתרגל שאלות שבהן מחפשים מספר לפי קשר, לא רק מחשבים.",
  },

  {
    id: "wp-2-one-step",
    domainId: "word_problems",
    level: 2,
    skill: "בעיה חד שלבית",
    prompt: "בקופסה יש 6 שקיות, בכל שקית 3 גולות. כמה גולות יש?",
    type: "open_input",
    answer: "18",
    practice: "לזהות האם הבעיה מתארת קבוצות שוות.",
  },
  {
    id: "wp-3-compare",
    domainId: "word_problems",
    level: 3,
    skill: "השוואה",
    prompt: "לדנה יש 14 מדבקות. ליואב יש 6 פחות. כמה מדבקות יש ליואב?",
    type: "open_input",
    answer: "8",
    practice: "לסמן במילים 'יותר' ו'פחות' ולבחור פעולה מתאימה.",
  },
  {
    id: "wp-4-two-step",
    domainId: "word_problems",
    level: 4,
    skill: "בעיה דו שלבית",
    prompt: "היו 120 מדבקות, חילקו 45, ואז קנו עוד 30. כמה יש עכשיו?",
    type: "open_input",
    answer: "105",
    practice: "לכתוב שתי פעולות בשתי שורות נפרדות.",
  },
  {
    id: "wp-5-grade3-groups",
    domainId: "word_problems",
    level: 5,
    skill: "כפל בהקשר",
    prompt: "בקופסה יש 6 שקיות, בכל שקית 8 גולות. כמה גולות יש בסך הכול?",
    type: "open_input",
    answer: "48",
    practice: "לצייר קבוצות שוות ואז לכתוב תרגיל כפל.",
  },
  {
    id: "wp-6-multiple-ways",
    domainId: "word_problems",
    level: 6,
    skill: "כמה דרכי פתרון",
    prompt: "איזו דרך נוספת נכונה להגיע ל-48?",
    type: "multiple_choice",
    options: ["6×8", "50-2", "24+24", "כל התשובות נכונות"],
    answer: "כל התשובות נכונות",
    practice: "למצוא לפחות שתי דרכים שונות לאותה תשובה.",
  },
  {
    id: "wp-7-open-constraint",
    domainId: "word_problems",
    level: 7,
    skill: "בעיה לא שגרתית",
    prompt: "מצא שני מספרים שסכומם 36 והמכפלה שלהם גדולה מ-200. איזו תשובה מתאימה?",
    type: "multiple_choice",
    options: ["18 ו-18", "20 ו-16", "30 ו-6", "35 ו-1"],
    answer: "18 ו-18",
    practice: "לבדוק כמה תנאים יחד במקום לעצור אחרי תנאי אחד.",
  },

  {
    id: "geo-2-pattern",
    domainId: "geometry_data",
    level: 2,
    skill: "דגם פשוט",
    prompt: "מה בא אחרי: אדום, כחול, אדום, כחול, ?",
    type: "multiple_choice",
    options: ["אדום", "כחול", "ירוק", "צהוב"],
    answer: "אדום",
    practice: "להמשיך דגם חוזר ולומר את החוק בקול.",
  },
  {
    id: "geo-3-polygon",
    domainId: "geometry_data",
    level: 3,
    skill: "מצולעים",
    prompt: "איזה מצולע יש לו 4 צלעות?",
    type: "multiple_choice",
    options: ["מרובע", "משולש", "מחומש", "עיגול"],
    answer: "מרובע",
    practice: "לזהות צורות לפי מספר צלעות וקודקודים.",
  },
  {
    id: "geo-4-time",
    domainId: "geometry_data",
    level: 4,
    skill: "זמן",
    prompt: "אם שיעור מתחיל ב-8:00 ונמשך שעה, מתי הוא מסתיים?",
    type: "multiple_choice",
    options: ["8:30", "9:00", "9:30", "10:00"],
    answer: "9:00",
    practice: "לתרגל חישוב זמן במצבים יומיומיים.",
  },
  {
    id: "geo-5-perimeter",
    domainId: "geometry_data",
    level: 5,
    skill: "היקף",
    prompt: "למלבן יש צלעות באורך 5 ו-3. מה ההיקף?",
    type: "open_input",
    answer: "16",
    practice: "לחבר את כל הצלעות של הצורה ולבדוק שלא שכחנו צלע.",
  },
  {
    id: "geo-6-data",
    domainId: "geometry_data",
    level: 6,
    skill: "חקר נתונים",
    prompt: "בטבלה: אורי קרא 4 ספרים, דנה 7, יואב 5. מי קרא הכי הרבה?",
    type: "multiple_choice",
    options: ["אורי", "דנה", "יואב", "כולם שווים"],
    answer: "דנה",
    practice: "לקרוא טבלה ולענות לפי השוואה, לא לפי ניחוש.",
  },
  {
    id: "geo-7-matrix-rule",
    domainId: "geometry_data",
    level: 7,
    skill: "מטריצה צורנית",
    prompt: "בכל שורה הצורה גדלה, ובכל עמודה הצבע משתנה. מה צריך לבדוק כדי למצוא את החסר?",
    type: "multiple_choice",
    options: ["גם גודל וגם צבע", "רק גודל", "רק צבע", "אף חוק"],
    answer: "גם גודל וגם צבע",
    practice: "לחפש חוק בשורות וחוק בעמודות בנפרד.",
  },

  {
    id: "in-6-vocabulary",
    domainId: "reading_comprehension",
    level: 6,
    skill: "אוצר מילים מדויק",
    prompt: "מה הכי קרוב במשמעות למילה 'הסס'?",
    type: "multiple_choice",
    options: ["התלבט", "קפץ", "צייר", "שכח"],
    answer: "התלבט",
    practice: "למצוא מילים נרדפות והפכים מתוך הקשר.",
  },
  {
    id: "in-7-condition",
    domainId: "reading_comprehension",
    level: 7,
    skill: "הוראה עם תנאי",
    prompt: "בהוראה 'סמן את העיגול רק אם הוא גדול מהכוכב', מה קודם צריך לבדוק?",
    type: "multiple_choice",
    options: ["האם העיגול גדול מהכוכב", "האם יש עיפרון", "איזה צבע הרקע", "כמה מילים יש בהוראה"],
    answer: "האם העיגול גדול מהכוכב",
    practice: "לפרק הוראות עם רק אם/אלא אם לשלב בדיקה ואז פעולה.",
  },

  {
    id: "pl-6-double-rule",
    domainId: "patterns_logic",
    level: 6,
    skill: "חוק כפול",
    prompt: "2, 4, 8, 16, ?",
    type: "open_input",
    answer: "32",
    practice: "לשאול האם החוק הוא חיבור קבוע או הכפלה.",
  },
  {
    id: "pl-7-analogy-category",
    domainId: "patterns_logic",
    level: 7,
    skill: "אנלוגיה קטגוריאלית",
    prompt: "כלב הוא ליונק כמו תרנגולת היא ל-?",
    type: "multiple_choice",
    options: ["עוף", "דג", "חרק", "צמח"],
    answer: "עוף",
    practice: "לתרגל יחס של פרט וקטגוריה: כלב-יונק, ורד-פרח.",
  },
];

export function createAdaptiveSession(
  grade: AdaptiveGrade,
  readingSupport: AdaptiveReadingSupport = "with_nikud"
): AdaptiveSession {
  const expectedLevel = grade === 1 ? 2 : grade === 2 ? 4 : 5;
  const startLevel = grade === 1 ? 2 : grade === 2 ? 3 : 5;
  const effectiveReadingSupport = grade === 1 ? "with_nikud" : readingSupport;

  return {
    grade,
    expectedLevel,
    readingSupport: effectiveReadingSupport,
    answers: [],
    domainStates: adaptiveDomains.reduce((states, domain) => {
      states[domain.id] = {
        domainId: domain.id,
        currentLevel: startLevel,
        stableLevel: Math.max(0, startLevel - 1),
        boundaryLevel: null,
        correctAtLevel: 0,
        wrongAtLevel: 0,
        askedItemIds: [],
        correctCount: 0,
        answeredCount: 0,
        done: false,
      };
      return states;
    }, {} as Record<AdaptiveDomainId, DomainState>),
  };
}

export function getNextAdaptiveItem(session: AdaptiveSession): AdaptiveItem | null {
  const nextState = adaptiveDomains
    .map((domain) => session.domainStates[domain.id])
    .filter(
      (state) =>
        !state.done &&
        adaptiveItems.some(
          (item) =>
            item.domainId === state.domainId &&
            item.level === state.currentLevel &&
            !state.askedItemIds.includes(item.id)
        )
    )
    .sort((a, b) => a.askedItemIds.length - b.askedItemIds.length)[0];

  if (!nextState) return null;

  return (
    adaptiveItems.find(
      (item) =>
        item.domainId === nextState.domainId &&
        item.level === nextState.currentLevel &&
        !nextState.askedItemIds.includes(item.id)
    ) || null
  );
}

export function recordAdaptiveAnswer(
  session: AdaptiveSession,
  item: AdaptiveItem,
  answer: string,
  responseTimeMs = 0
): AdaptiveSession {
  const isCorrect = checkAdaptiveAnswer(item, answer);
  const domainState = session.domainStates[item.domainId];
  const wasFirstAnswerInDomain = domainState.answeredCount === 0;
  const nextAskedItemIds = [...domainState.askedItemIds, item.id];
  const nextAnsweredCount = domainState.answeredCount + 1;
  const nextCorrectCount = domainState.correctCount + (isCorrect ? 1 : 0);

  let currentLevel = domainState.currentLevel;
  let stableLevel = domainState.stableLevel;
  let boundaryLevel = domainState.boundaryLevel;
  let correctAtLevel = isCorrect ? domainState.correctAtLevel + 1 : 0;
  let wrongAtLevel = isCorrect ? 0 : domainState.wrongAtLevel + 1;
  let done = false;

  if (isCorrect) {
    stableLevel = Math.max(stableLevel, item.level);
    const hasMoreItemsAtCurrentLevel = adaptiveItems.some(
      (nextItem) =>
        nextItem.domainId === item.domainId &&
        nextItem.level === currentLevel &&
        !nextAskedItemIds.includes(nextItem.id)
    );
    if ((correctAtLevel >= 2 || !hasMoreItemsAtCurrentLevel) && currentLevel < 7) {
      currentLevel += 1;
      correctAtLevel = 0;
      wrongAtLevel = 0;
    }
  } else if (wasFirstAnswerInDomain && currentLevel > 1) {
    currentLevel -= 1;
    correctAtLevel = 0;
    wrongAtLevel = 0;
  } else if (wrongAtLevel >= 2) {
    boundaryLevel = item.level;
    stableLevel = Math.max(0, item.level - 1);
    done = true;
  }

  if (nextAskedItemIds.length >= 7 || currentLevel > 7) {
    done = true;
  }

  return {
    ...session,
    answers: [
      ...session.answers,
      {
        itemId: item.id,
        domainId: item.domainId,
        level: item.level,
        isCorrect,
        answer,
        presentationMode: getPresentationMode(session),
        responseTimeMs,
      },
    ],
    domainStates: {
      ...session.domainStates,
      [item.domainId]: {
        ...domainState,
        currentLevel,
        stableLevel,
        boundaryLevel,
        correctAtLevel,
        wrongAtLevel,
        askedItemIds: nextAskedItemIds,
        correctCount: nextCorrectCount,
        answeredCount: nextAnsweredCount,
        done,
      },
    },
  };
}

export function isAdaptiveSessionComplete(session: AdaptiveSession): boolean {
  const allDomainsDone = adaptiveDomains.every((domain) => session.domainStates[domain.id].done);
  return allDomainsDone || session.answers.length >= 28;
}

export function buildAdaptiveReport(session: AdaptiveSession): DomainReport[] {
  return adaptiveDomains.map((domain) => {
    const state = session.domainStates[domain.id];
    const domainAnswers = session.answers.filter((answer) => answer.domainId === domain.id);
    const readingSupportBonus =
      session.readingSupport === "without_nikud" && languageDomainIds.includes(domain.id) ? 1 : 0;
    const adjustedLevel = Math.min(7, state.stableLevel + readingSupportBonus);
    const status = getStatus(adjustedLevel, session.expectedLevel);
    const confidence = getConfidence(state);
    const levelScore = getLevelScore(adjustedLevel);
    const accuracyScore = getAccuracyScore(domainAnswers);
    const lastLevelAccuracy = getLastLevelAccuracy(domainAnswers);
    const fluencyScore = getFluencyScore(domain.id, domainAnswers);
    const skillScore = getSkillScore(domain.id, levelScore, lastLevelAccuracy, fluencyScore);
    const avgResponseSeconds = getAverageResponseSeconds(domainAnswers);

    return {
      domain,
      stableLevel: state.stableLevel,
      adjustedLevel,
      boundaryLevel: state.boundaryLevel,
      status,
      confidence,
      skillScore,
      levelScore,
      accuracyScore,
      fluencyScore,
      lastLevelAccuracy,
      avgResponseSeconds,
      answeredCount: state.answeredCount,
      correctCount: state.correctCount,
      recommendation: getRecommendation(domain, state),
      supportNote:
        readingSupportBonus > 0
          ? "בוצע ללא ניקוד, לכן תחום זה חושב כרמת קושי גבוהה יותר."
          : null,
      supportProfile: getSupportProfile(session, domain.id),
      stopText: getStopText(state),
      interpretation: getDomainInterpretation(domain.id, status, skillScore, state),
    };
  });
}

export function buildAssessmentProgress(
  session: AdaptiveSession,
  currentItem: AdaptiveItem | null
): AssessmentProgress {
  const totalDomains = adaptiveDomains.length;
  const completedDomains = adaptiveDomains.filter((domain) => session.domainStates[domain.id].done).length;
  const stableDomains = adaptiveDomains.filter(
    (domain) => session.domainStates[domain.id].stableLevel >= session.expectedLevel
  ).length;
  const currentDomain = currentItem
    ? adaptiveDomains.find((domain) => domain.id === currentItem.domainId)
    : null;
  const currentState = currentItem ? session.domainStates[currentItem.domainId] : null;

  return {
    answeredCount: session.answers.length,
    maxQuestions: 28,
    progressPercent: Math.min(100, Math.round((session.answers.length / 28) * 100)),
    completedDomains,
    totalDomains,
    stableDomains,
    currentDomainLabel: currentDomain?.label || "סיכום",
    currentLevelLabel: currentItem ? `${currentItem.level} · ${levelLabels[currentItem.level]}` : "דוח",
    currentDomainProgress: currentState ? Math.min(100, Math.round((currentState.askedItemIds.length / 7) * 100)) : 100,
    readingIndependence: getReadingIndependenceValue(session),
    nextSignal: getProgressSignal(session, currentItem),
  };
}

export function buildParentReport(session: AdaptiveSession, reports: DomainReport[]): ParentReport {
  const sortedByScore = [...reports].sort((a, b) => b.skillScore - a.skillScore);
  const strengthDomain = sortedByScore[0] || reports[0];
  const focusDomain = [...reports].sort((a, b) => a.skillScore - b.skillScore)[0] || reports[0];
  const overallStatus = getOverallStatus(reports);
  const confidence = getOverallConfidence(reports);
  const readingIndependence = getReadingIndependence(session);
  const monthLabel = new Intl.DateTimeFormat("he-IL", { month: "long", year: "numeric" }).format(new Date());

  return {
    title: `מדד הקצב החודשי`,
    monthLabel,
    summaryLines: [
      `התמונה הכללית כרגע: ${overallStatus}. ${strengthDomain.domain.label} הוא תחום חזק יחסית בבדיקה הזאת.`,
      `${focusDomain.domain.label} הוא התחום שכדאי לחזק ראשון השבוע: ${focusDomain.recommendation}`,
      `${readingIndependence}. הדוח מפריד בין רמת המיומנות לבין התמיכה בקריאה, כדי לא לערבב קושי קריאה עם מתמטיקה או חשיבה.`,
    ],
    metrics: [
      {
        label: "קצב כללי",
        value: overallStatus,
        detail: `ציון משוקלל ממוצע ${getAverageSkillScore(reports)}/100`,
      },
      {
        label: "עצמאות קריאה",
        value: getReadingIndependenceValue(session),
        detail: readingIndependence,
      },
      {
        label: "שימוש בתמיכות",
        value: getPresentationMode(session),
        detail: session.readingSupport === "without_nikud" ? "הילד עבד ללא ניקוד" : "הילד עבד עם ניקוד מלא",
      },
      {
        label: "ביטחון מדידה",
        value: confidence,
        detail: `${session.answers.length} תשובות, ${reports.filter((report) => report.confidence !== "נמוך").length} תחומים עם ביטחון בינוני ומעלה`,
      },
    ],
    focusDomain,
    strengthDomain,
    weeklyPlan: buildWeeklyPlan(focusDomain, strengthDomain),
  };
}

export function buildAssessmentHistoryEntry(
  session: AdaptiveSession,
  reports: DomainReport[],
  parentReport: ParentReport,
  completedAt = new Date()
): AssessmentHistoryEntry {
  const domains = reports.map(toDomainSnapshot);

  return {
    id: `assessment-${completedAt.getTime()}-${session.answers.length}`,
    completedAt: completedAt.toISOString(),
    grade: session.grade,
    expectedLevel: session.expectedLevel,
    readingSupport: session.readingSupport,
    overallStatus: getOverallStatus(reports) as AssessmentStatus,
    averageScore: getAverageSkillScore(reports),
    answeredCount: session.answers.length,
    confidence: getOverallConfidence(reports) as AssessmentConfidence,
    readingIndependence: getReadingIndependenceValue(session),
    summaryLines: parentReport.summaryLines,
    strength: toDomainSnapshot(parentReport.strengthDomain),
    focus: toDomainSnapshot(parentReport.focusDomain),
    domains,
    weeklyPlan: parentReport.weeklyPlan,
  };
}

export function getOverallStatus(reports: DomainReport[]): DomainReport["status"] {
  const countByStatus = reports.reduce(
    (counts, report) => {
      counts[report.status] += 1;
      return counts;
    },
    {
      "מחוננים": 0,
      "מעל הקצב": 0,
      "בקצב": 0,
      "כמעט בקצב": 0,
      "צריך חיזוק": 0,
    } as Record<DomainReport["status"], number>
  );

  if (countByStatus["מחוננים"] >= 3) return "מחוננים";
  if (countByStatus["מחוננים"] + countByStatus["מעל הקצב"] >= 4) return "מעל הקצב";
  if (
    countByStatus["מחוננים"] +
      countByStatus["מעל הקצב"] +
      countByStatus["בקצב"] >=
    Math.ceil(reports.length * 0.6)
  ) {
    return "בקצב";
  }
  if (countByStatus["כמעט בקצב"] + countByStatus["בקצב"] >= 3) return "כמעט בקצב";
  return "צריך חיזוק";
}

function toDomainSnapshot(report: DomainReport): AssessmentDomainSnapshot {
  return {
    domainId: report.domain.id,
    label: report.domain.label,
    shortLabel: report.domain.shortLabel,
    emoji: report.domain.emoji,
    color: report.domain.color,
    status: report.status as AssessmentStatus,
    skillScore: report.skillScore,
    adjustedLevel: report.adjustedLevel,
    confidence: report.confidence as AssessmentConfidence,
    recommendation: report.recommendation,
    answeredCount: report.answeredCount,
    correctCount: report.correctCount,
  };
}

function getPresentationMode(session: AdaptiveSession): AdaptivePresentationMode {
  return session.readingSupport === "without_nikud" ? "ללא ניקוד" : "ניקוד מלא";
}

function getLevelScore(level: number): number {
  const levelScores: Record<number, number> = {
    0: 15,
    1: 32,
    2: 48,
    3: 62,
    4: 72,
    5: 82,
    6: 92,
    7: 98,
  };
  return levelScores[level] ?? 15;
}

function getAccuracyScore(answers: AdaptiveSession["answers"]): number {
  if (answers.length === 0) return 0;
  return Math.round((answers.filter((answer) => answer.isCorrect).length / answers.length) * 100);
}

function getLastLevelAccuracy(answers: AdaptiveSession["answers"]): number {
  if (answers.length === 0) return 0;
  const lastLevel = Math.max(...answers.map((answer) => answer.level));
  const answersAtLastLevel = answers.filter((answer) => answer.level === lastLevel);
  return getAccuracyScore(answersAtLastLevel);
}

function getAverageResponseSeconds(answers: AdaptiveSession["answers"]): number | null {
  const timedAnswers = answers.filter((answer) => answer.responseTimeMs > 0);
  if (timedAnswers.length === 0) return null;
  const totalMs = timedAnswers.reduce((sum, answer) => sum + answer.responseTimeMs, 0);
  return Math.round((totalMs / timedAnswers.length / 1000) * 10) / 10;
}

function getFluencyScore(domainId: AdaptiveDomainId, answers: AdaptiveSession["answers"]): number {
  const avgSeconds = getAverageResponseSeconds(answers);
  if (avgSeconds === null) return 70;

  const carefulDomain = domainId === "patterns_logic";
  const fast = carefulDomain ? 35 : 25;
  const steady = carefulDomain ? 70 : 50;
  const slow = carefulDomain ? 105 : 80;

  if (avgSeconds <= fast) return 100;
  if (avgSeconds <= steady) return 82;
  if (avgSeconds <= slow) return 62;
  return 42;
}

function getSkillScore(
  domainId: AdaptiveDomainId,
  levelScore: number,
  lastLevelAccuracy: number,
  fluencyScore: number
): number {
  if (languageDomainIds.includes(domainId)) {
    return Math.round(levelScore * 0.6 + lastLevelAccuracy * 0.2 + fluencyScore * 0.2);
  }
  if (domainId === "patterns_logic") {
    return Math.round(levelScore * 0.75 + lastLevelAccuracy * 0.2 + fluencyScore * 0.05);
  }
  return Math.round(levelScore * 0.7 + lastLevelAccuracy * 0.2 + fluencyScore * 0.1);
}

function getSupportProfile(session: AdaptiveSession, domainId: AdaptiveDomainId): string {
  if (session.readingSupport === "without_nikud") {
    return languageDomainIds.includes(domainId) ? "קריאה עצמאית ללא ניקוד" : "הוראות ללא ניקוד";
  }
  if (session.grade === 1) return "ניקוד מלא כחלק מרכישת הקריאה";
  return languageDomainIds.includes(domainId) ? "נעזר בניקוד מלא" : "הוראות מנוקדות, ללא הפחתה בציון התחום";
}

function getStopText(state: DomainState): string {
  if (state.boundaryLevel === null) {
    return "לא זוהתה עדיין נקודת עצירה עקבית.";
  }
  return `הרמה ${state.boundaryLevel} עדיין לא יציבה; רמת השליטה האחרונה היא ${state.stableLevel}.`;
}

function getDomainInterpretation(
  domainId: AdaptiveDomainId,
  status: DomainReport["status"],
  skillScore: number,
  state: DomainState
): string {
  if (state.answeredCount === 0) return "התחום עדיין לא נבדק מספיק.";
  if (domainId === "word_problems" && skillScore < 70) {
    return "כדאי להפריד בין קריאת הבעיה, הבנת הנתונים, בחירת הפעולה והחישוב עצמו.";
  }
  if (domainId === "patterns_logic" && status === "מעל הקצב") {
    return "נראית יכולת טובה בזיהוי חוקיות והכללה, גם כאשר השאלה דורשת חשיבה לא שגרתית.";
  }
  if (languageDomainIds.includes(domainId) && status === "צריך חיזוק") {
    return "כדאי לחזק דיוק קריאה, אוצר מילים ושאלות למה/איך ידעת לפני שמעלים עומס.";
  }
  if (status === "מחוננים" || status === "מעל הקצב") {
    return "התחום נראה חזק בבדיקה הנוכחית; אפשר להעלות עומק, נימוק וגמישות חשיבה.";
  }
  if (status === "בקצב") {
    return "התחום תואם את הקצב המצופה; תרגול קצר ועקבי יעזור לשמור על יציבות.";
  }
  return "הרמה הבאה עדיין לא יציבה. עדיף לחזק בסיס נקודתי ולא להמשיך להקשות מהר מדי.";
}

function getReadingIndependence(session: AdaptiveSession): string {
  if (session.grade === 1) return "כיתה א׳ נבדקת עם ניקוד מלא כברירת מחדל, כחלק מרכישת הקריאה.";
  if (session.readingSupport === "without_nikud") {
    return "הילד עבד ללא ניקוד, ולכן יש אינדיקציה לעצמאות קריאה גבוהה יותר בהוראות ובטקסטים קצרים.";
  }
  return "הילד עבד עם ניקוד מלא; זה מידע על תמיכת קריאה, לא הפחתה בציון המיומנות.";
}

function getReadingIndependenceValue(session: AdaptiveSession): string {
  if (session.grade === 1) return "ניקוד מלא";
  return session.readingSupport === "without_nikud" ? "עצמאי" : "נעזר בניקוד";
}

function getProgressSignal(session: AdaptiveSession, currentItem: AdaptiveItem | null): string {
  if (!currentItem) return "הבדיקה הושלמה ומוכנה לדוח.";
  const state = session.domainStates[currentItem.domainId];
  if (state.correctAtLevel === 1) return "עוד תשובה נכונה ברמה הזאת תסמן שליטה יציבה ותעלה רמה.";
  if (state.wrongAtLevel === 1) return "טעות אחת אינה מורידה רמה; שאלה נוספת תבדוק אם זו נקודת עצירה אמיתית.";
  if (state.stableLevel >= session.expectedLevel) return "כבר קיימת שליטה יציבה בקצב המצופה בתחום הזה.";
  return "המערכת מחפשת את הרמה האחרונה שבה יש הצלחה יציבה, לא רק תשובה בודדת נכונה.";
}

function getAverageSkillScore(reports: DomainReport[]): number {
  if (reports.length === 0) return 0;
  return Math.round(reports.reduce((sum, report) => sum + report.skillScore, 0) / reports.length);
}

function getOverallConfidence(reports: DomainReport[]): DomainReport["confidence"] {
  const highCount = reports.filter((report) => report.confidence === "גבוה").length;
  const mediumOrHigh = reports.filter((report) => report.confidence !== "נמוך").length;
  if (highCount >= 4) return "גבוה";
  if (mediumOrHigh >= 4) return "בינוני";
  return "נמוך";
}

function buildWeeklyPlan(focusDomain: DomainReport, strengthDomain: DomainReport): ParentReport["weeklyPlan"] {
  return [
    {
      day: "א׳",
      task: focusDomain.recommendation,
      goal: `לחזק את ${focusDomain.domain.shortLabel} בלי להציף.`,
    },
    {
      day: "ב׳",
      task: "לפתור שתי שאלות דומות ולבקש מהילד להסביר איך ידע.",
      goal: "לחזק דיוק, נימוק וביטחון.",
    },
    {
      day: "ג׳",
      task: "לחזור לרמה שהייתה יציבה ולסיים בהצלחה.",
      goal: "לבסס שליטה לפני עליית קושי.",
    },
    {
      day: "ד׳",
      task: strengthDomain.recommendation,
      goal: `לשמר חוזקה ב${strengthDomain.domain.shortLabel}.`,
    },
    {
      day: "ה׳",
      task: "שאלה אחת מעט קשה יותר + שיחה קצרה על דרך הפתרון.",
      goal: "בדיקת מוכנות לרמה הבאה.",
    },
  ];
}

export function checkAdaptiveAnswer(item: AdaptiveItem, answer: string): boolean {
  const normalizedAnswer = normalizeAnswer(answer);
  const acceptedAnswers = [item.answer, ...(item.acceptedAnswers || [])].map(normalizeAnswer);
  return acceptedAnswers.includes(normalizedAnswer);
}

function getStatus(stableLevel: number, expectedLevel: number): DomainReport["status"] {
  if (stableLevel >= 7) return "מחוננים";
  if (stableLevel >= expectedLevel + 1) return "מעל הקצב";
  if (stableLevel >= expectedLevel) return "בקצב";
  if (stableLevel >= expectedLevel - 1) return "כמעט בקצב";
  return "צריך חיזוק";
}

function getConfidence(state: DomainState): DomainReport["confidence"] {
  if (state.answeredCount >= 5 && state.correctCount >= 3) return "גבוה";
  if (state.answeredCount >= 3) return "בינוני";
  return "נמוך";
}

function getRecommendation(domain: AdaptiveDomain, state: DomainState): string {
  const missedItem = adaptiveItems.find(
    (item) => item.domainId === domain.id && item.level === state.boundaryLevel
  );

  return missedItem?.practice || domain.defaultPractice[0];
}

function normalizeAnswer(answer: string): string {
  return stripNikud(answer)
    .replace(/[\u200e\u200f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function stripNikud(text: string): string {
  return text.normalize("NFD").replace(/[\u0591-\u05C7]/g, "");
}
