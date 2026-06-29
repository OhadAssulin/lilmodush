"use client";

import { motion, AnimatePresence } from "framer-motion";

interface GiftedInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export function GiftedInfoDialog({ isOpen, onClose }: GiftedInfoDialogProps) {
  const keyPoints = [
    {
      icon: "🎯",
      title: "קודם כל מוודאים קצב",
      description: "לפני שרצים קדימה, חשוב לראות שהילד עומד בדרישות משרד החינוך ומרגיש בטוח בחומר של הכיתה.",
    },
    {
      icon: "📚",
      title: "20 דקות ביום מספיקות",
      description: "תרגול קצר וקבוע יוצר רצף. לא צריך מרתון לימודים, צריך הרגל יומי שמצטבר לתוצאה.",
    },
    {
      icon: "💪",
      title: "בונים ביטחון דרך הצלחות קטנות",
      description: "כשהילד פוגש שאלות מתאימות לרמה שלו ומתקדם בהדרגה, הלמידה מרגישה אפשרית ולא מאיימת.",
    },
    {
      icon: "🧩",
      title: "מחוננים זו מטרה שאפשר לתרגל אליה",
      description: "מבחני הקבלה נשענים על דפוסי חשיבה ושאלות שניתן להכיר, לפרק ולתרגל לאורך זמן.",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            dir="rtl"
          >
            <motion.div
              className="glass-card rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-6 pb-4 border-b border-[var(--border-subtle)]">
                <button
                  onClick={onClose}
                  className="absolute left-6 top-6 w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-[var(--bg-card-hover)]"
                  style={{ border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
                >
                  <CloseIcon />
                </button>
                <div className="text-center">
                  <motion.div
                    className="text-5xl mb-3"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🌟
                  </motion.div>
                  <h2
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
                  >
                    מקצב הכיתה ועד{" "}
                    <span
                      style={{
                        background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      מחוננים
                    </span>
                  </h2>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    עם תרגול יומי קצר ועקבי
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Main message */}
                <motion.div
                  className="p-5 rounded-2xl mb-6"
                  style={{
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: "'Assistant', sans-serif", color: "var(--text-primary)" }}
                  >
                    <strong style={{ color: "#3b82f6" }}>
                      יש גיל שבו 20 דקות ביום שוות הרבה יותר.
                    </strong>
                    <br />
                    בגילאי היסודי המוח נמצא במה שנקרא בחקר המוח ״התקופה הקריטית״:
                    הוא סופג, מתחזק ובונה את דפוסי החשיבה שילוו את הילד שנים קדימה.
                    עם תרגול קצר, מדויק ועקבי - אפשר לעזור לילד להיות בקצב, לחשוב חד יותר,
                    ולהגיע מוכן יותר לבית הספר, להגיע ולעקוף את דרישות משרד החינוך ולעלות
                    דרמטית את סיכויי ההצלחה במבחני חשיבה ומחוננים.
                  </p>
                </motion.div>

                {/* Key points */}
                <div className="space-y-4 mb-6">
                  {keyPoints.map((point, index) => (
                    <motion.div
                      key={point.title}
                      className="flex gap-4 p-4 rounded-2xl"
                      style={{ background: "var(--bg-elevated)" }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                        style={{ background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.15))" }}
                      >
                        {point.icon}
                      </div>
                      <div>
                        <h3
                          className="font-bold text-base mb-1"
                          style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
                        >
                          {point.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {point.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom message */}
                <motion.div
                  className="text-center p-5 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))",
                    border: "1px solid rgba(34, 197, 94, 0.2)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <p
                    className="text-base font-medium leading-relaxed"
                    style={{ fontFamily: "'Assistant', sans-serif", color: "var(--text-primary)" }}
                  >
                    🚀 <strong>המסע מתחיל כאן</strong> - תרגול קצר, מדויק ועקבי שעוזר לילד להישאר בקצב,
                    לסגור פערים בזמן, ולבנות את החשיבה שנדרשת להצלחה בהמשך.
                  </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-4 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {[
                    { value: "20 דק׳", icon: "⏱️", label: "ביום" },
                    { value: "קצב", icon: "🎯", label: "משרד החינוך" },
                    { value: "יעד", icon: "💪", label: "מחוננים" },
                  ].map((stat) => (
                    <div
                      key={stat.value}
                      className="text-center p-3 rounded-xl"
                      style={{ background: "var(--bg-elevated)" }}
                    >
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <div
                        className="text-sm font-bold"
                        style={{ color: "#3b82f6" }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Footer */}
              <div className="p-6 pt-4 border-t border-[var(--border-subtle)]">
                <motion.button
                  onClick={onClose}
                  className="w-full py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                    color: "white",
                    fontFamily: "'Rubik', sans-serif",
                    boxShadow: "0 4px 14px rgba(59, 130, 246, 0.35)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>בואו נתחיל לתרגל!</span>
                  <span>✨</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
