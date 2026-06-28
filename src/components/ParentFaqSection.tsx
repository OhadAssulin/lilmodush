import Link from "next/link";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "לאיזה גיל זה מתאים?",
    answer:
      "התוכנית מתאימה בעיקר לילדים בכיתות א׳-ג׳: סוף כיתה א׳, כיתה ב׳ וכיתה ג׳. המיקוד הוא בקריאה, הבנת הנקרא, מתמטיקה, בעיות מילוליות, דגמים וחשיבה לוגית.",
  },
  {
    question: "האם זה מתאים רק לילדים מחוננים?",
    answer:
      "לא. זה מתאים לילדים מצטיינים, לילדים רגילים, וגם להורים שרוצים להבין איפה הילד עומד. ילד חזק יקבל אתגר גבוה יותר, וילד שבונה בסיס יקבל תרגול מותאם ולא מתסכל.",
  },
  {
    question: "האם אתם מבטיחים קבלה לתוכנית מחוננים?",
    answer:
      "לא, ואי אפשר להבטיח דבר כזה. אנחנו כן עוזרים לבנות מיומנויות שחשובות למבחני חשיבה: הבנת הוראות, הבנת הנקרא, חשיבה כמותית, דגמים, ריכוז וביטחון.",
  },
  {
    question: "האם זה מכין למבחני מחוננים?",
    answer:
      "כן, בצורה הדרגתית ובריאה. התרגול כולל הבנת הנקרא, בעיות מילוליות, סדרות, דגמים, אנלוגיות, חשיבה צורנית ועבודה מול שאלות לא מוכרות.",
  },
  {
    question: "האם הילד יעמוד בדרישות משרד החינוך?",
    answer:
      "אנחנו לא מחליפים בית ספר ולא נותנים ציון רשמי. אנחנו כן נותנים מדד שמראה האם הילד בקצב, כמעט בקצב, מעל הקצב או צריך חיזוק בכל תחום מרכזי.",
  },
  {
    question: "מה הילד מקבל בפועל?",
    answer:
      "הילד מקבל תרגול קצר ומותאם אישית במקום דפי עבודה כלליים: קריאה, הוראות, בעיות מילוליות, חשיבה מתמטית ודפוסים. המטרה היא להתקדם בלי לחץ ולבנות ביטחון.",
  },
  {
    question: "איך 20 דקות ביום יכולות להספיק?",
    answer:
      "כי לילדים צעירים עדיף תרגול קצר, מדויק וקבוע. לא צריך יותר זמן; צריך זמן מדויק שממוקד במה שהילד צריך עכשיו ולא במה שהוא כבר יודע.",
  },
  {
    question: "מה זה מבחן אדפטיבי?",
    answer:
      "זה מבחן שמתאים את עצמו לילד. אם הילד מצליח, הרמה עולה. אם הוא מתקשה, המערכת לא מציפה אותו בשאלות קשות אלא מזהה את נקודת החיזוק.",
  },
  {
    question: "האם הילד מקבל ציון?",
    answer:
      "הילד לא רואה ציון מלחיץ. הוא רואה שלבים, הצלחות והתקדמות. ההורה מקבל דוח מפורט בשפה בריאה: בקצב, כמעט בקצב, מעל הקצב או כדאי לחזק.",
  },
  {
    question: "מה ההורה מקבל בסוף בדיקה?",
    answer:
      "דוח ברור עם מדד כללי, רמה בכל תחום, חוזקות, תחומים לחיזוק, השוואה לדוחות קודמים והמלצה לתרגול שבועי של 10-20 דקות ביום.",
  },
  {
    question: "האם השאלות מנוקדות?",
    answer:
      "כן, לפי גיל ורמת הילד. בכיתה א׳ רוב השאלות מנוקדות. בכיתות ב׳-ג׳ אפשר לעבוד בהדרגה ללא ניקוד, והדוח מתחשב בזה.",
  },
  {
    question: "מה קורה אם הילד לא מצליח?",
    answer:
      "המערכת לא ממשיכה להקשות עליו. היא עוצרת, מתאימה את הרמה, ומסמנת להורה איפה כדאי לחזק. המטרה היא להבין, לא לגרום לילד להרגיש שנכשל.",
  },
  {
    question: "כמה זמן זה לוקח?",
    answer:
      "בדיקת הקצב לוקחת בדרך כלל 10-20 דקות. התרגול היומי מומלץ באותו טווח, בהתאם לגיל הילד ולסבלנות שלו.",
  },
  {
    question: "כמה זה עולה?",
    answer:
      "כרגע השירות בחינם למשתמשים הראשונים. בהמשך, אם ייפתח מסלול בתשלום, הכוונה היא לשמור אותו נגיש מאוד, עד 20 ש״ח בחודש.",
  },
  {
    question: "האם זה מחליף שיעור פרטי?",
    answer:
      "לא. שיעור פרטי או הוראה מתקנת חשובים כשיש קושי משמעותי. המוצר נותן מדד, תרגול יומי ומעקב חכם בין לבין.",
  },
];

export function ParentFaqSection() {
  return (
    <section className="relative py-20 px-6 overflow-hidden" dir="rtl">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--border-accent), transparent)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-8 lg:gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-5"
              style={{ background: "var(--accent-primary)16", color: "var(--accent-primary)" }}
            >
              <span aria-hidden="true">?</span>
              שאלות של הורים
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold leading-tight mb-5"
              style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
            >
              לפני שנרשמים, הנה מה שחשוב לדעת.
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
              המטרה היא פשוטה: להבין האם הילד בקצב, מה כדאי לחזק, ואיך לבנות שגרת תרגול קצרה בלי לחץ.
            </p>

            <div
              className="p-5 rounded-2xl mb-5"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
            >
              <div className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
                העיקרון שלנו
              </div>
              <div
                className="text-2xl font-bold leading-snug"
                style={{ color: "var(--text-primary)", fontFamily: "'Rubik', sans-serif" }}
              >
                20 דקות ביום, תרגול מדויק, ודוח ברור להורה.
              </div>
            </div>

            <Link
              href="/parent"
              className="inline-flex items-center justify-center px-7 py-4 rounded-2xl font-semibold text-base"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                color: "white",
                fontFamily: "'Rubik', sans-serif",
                boxShadow: "0 4px 18px rgba(59, 130, 246, 0.32)",
              }}
            >
              להתחיל עם ילד ראשון
            </Link>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <details
                key={item.question}
                className="group rounded-2xl overflow-hidden"
                open={index < 3}
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <summary
                  className="cursor-pointer list-none p-5 flex items-center gap-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ background: "var(--accent-primary)18", color: "var(--accent-primary)" }}
                  >
                    {index + 1}
                  </span>
                  <span className="flex-1 text-lg font-semibold" style={{ fontFamily: "'Rubik', sans-serif" }}>
                    {item.question}
                  </span>
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-open:rotate-45"
                    style={{ background: "var(--bg-card)", color: "var(--text-muted)" }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 pr-[4.5rem]">
                  <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
