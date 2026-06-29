"use client";

import Link from "next/link";
import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { QuizCard } from "@/components/QuizCard";
import { Footer } from "@/components/Footer";
import { AdaptiveAssessmentDialog } from "@/components/AdaptiveAssessmentDialog";
import { addChildAssessmentReport, getChildById, updateChildProgress } from "@/lib/db";
import { recordQuestionAttempt } from "@/lib/question-analytics";
import { getQuestions } from "@/lib/questions";
import { AssessmentHistoryEntry, Child, Subject, Question } from "@/types";

type PageParams = {
  params: Promise<{ id: string }>;
};

type SubjectMeta = {
  emoji: string;
  label: string;
  action: string;
  color: string;
  gradient: string;
};

const subjectMeta: Record<Subject, SubjectMeta> = {
  math: {
    emoji: "🧮",
    label: "חשבון",
    action: "פותרים מספרים",
    color: "var(--accent-math)",
    gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(59, 130, 246, 0.08))",
  },
  hebrew: {
    emoji: "📖",
    label: "עברית",
    action: "קוראים ומבינים",
    color: "var(--accent-hebrew)",
    gradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.22), rgba(6, 182, 212, 0.08))",
  },
  science: {
    emoji: "🔬",
    label: "מדעים",
    action: "מגלים ניסויים",
    color: "var(--accent-science)",
    gradient: "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(16, 185, 129, 0.08))",
  },
  knowledge: {
    emoji: "🌍",
    label: "ידע כללי",
    action: "יוצאים למסע",
    color: "var(--accent-knowledge)",
    gradient: "linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(245, 158, 11, 0.08))",
  },
};

const celebrationPieces = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: (index % 7) * 0.12,
  duration: 2.8 + (index % 5) * 0.22,
  symbol: ["🎉", "⭐", "🌟", "✨", "🎊", "💫", "🏅"][index % 7],
}));

const RocketIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1 1.7-1.2 3.2-.8 3.8s2.1.2 3.8-.8" />
    <path d="M9 15 5.5 11.5c-.7-.7-.4-1.8.6-2.1l3.2-.9" />
    <path d="m15 9 .9-3.2c.3-1 1.4-1.3 2.1-.6L21.5 9" />
    <path d="M9 15c3.6-.8 7.1-4.3 8-8" />
    <path d="m14.5 9.5-5 5" />
  </svg>
);

const GaugeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 0-18 0" />
    <path d="M12 12l4-4" />
    <path d="M7 12h.01" />
    <path d="M12 7h.01" />
    <path d="M17 12h.01" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function ChildPage({ params }: PageParams) {
  const resolvedParams = use(params);
  const [child, setChild] = useState<Child | null>(null);
  const [parentUsername, setParentUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [isAssessmentDialogOpen, setIsAssessmentDialogOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const data = getChildById(resolvedParams.id);
      setChild(data?.child || null);
      setParentUsername(data?.parentUsername || null);
      setLoading(false);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [resolvedParams.id]);

  const totalProgress = child
    ? Math.round(
        child.subjects.reduce((sum, subject) => sum + (child.progress[subject] || 0), 0) /
          Math.max(1, child.subjects.length)
      )
    : 0;

  const strongestSubject = child?.subjects.reduce<Subject | null>((bestSubject, subject) => {
    if (!bestSubject) return subject;
    return (child.progress[subject] || 0) > (child.progress[bestSubject] || 0) ? subject : bestSubject;
  }, null);

  const startQuiz = (subject: Subject) => {
    setSelectedSubject(subject);
    setQuestions(getQuestions(subject, 5));
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
  };

  const handleAnswer = (answer: string, isCorrect: boolean) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (child && currentQuestion) {
      recordQuestionAttempt({
        question: currentQuestion,
        child,
        parentUsername,
        answer,
        isCorrect,
      });
    }

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      window.setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 100);
    } else {
      window.setTimeout(() => {
        setQuizComplete(true);
        if (child && selectedSubject) {
          const finalScore = score + (isCorrect ? 1 : 0);
          const newProgress = Math.min(
            100,
            (child.progress[selectedSubject] || 0) + Math.round(finalScore * 4)
          );
          updateChildProgress(child.id, selectedSubject, newProgress);
          setChild((prev) =>
            prev
              ? {
                  ...prev,
                  progress: { ...prev.progress, [selectedSubject]: newProgress },
                }
              : null
          );
        }
      }, 100);
    }
  };

  const resetQuiz = () => {
    setSelectedSubject(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
  };

  const handleAssessmentComplete = (entry: AssessmentHistoryEntry) => {
    if (!child) return;
    addChildAssessmentReport(child.id, entry);
    const latestData = getChildById(child.id);
    if (latestData) {
      setChild(latestData.child);
    }
  };

  if (loading) {
    return (
      <main className="relative min-h-screen gradient-mesh grid-pattern flex items-center justify-center">
        <motion.div
          className="w-28 h-28 rounded-[2rem] flex items-center justify-center text-6xl"
          style={{
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.18), rgba(236, 72, 153, 0.16))",
            border: "1px solid var(--border-subtle)",
          }}
          animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          📚
        </motion.div>
      </main>
    );
  }

  if (!child) {
    return (
      <main className="relative min-h-screen gradient-mesh grid-pattern">
        <Header />
        <div className="min-h-screen flex items-center justify-center px-6">
          <motion.div
            className="glass-card rounded-3xl p-10 text-center max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🧭
            </motion.div>
            <h1
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
            >
              לא מצאנו את המסע הזה
            </h1>
            <p className="text-base mb-6" style={{ color: "var(--text-muted)" }}>
              אולי הקישור השתנה. אפשר לחזור לדף הבית ולבחור ילד מחדש.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-xl font-medium"
              style={{
                background: "linear-gradient(135deg, var(--accent-primary), #9333ea)",
                color: "white",
              }}
            >
              חזרה לדף הבית
            </Link>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen gradient-mesh grid-pattern child-mode overflow-hidden">
      <Header />

      <div className="min-h-screen pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {!selectedSubject ? (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <section
                  className="relative overflow-hidden rounded-[2rem] p-6 md:p-8"
                  style={{
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.18), rgba(236, 72, 153, 0.12), rgba(6, 182, 212, 0.12))",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-sm" style={{ background: "var(--bg-card)", color: "var(--accent-primary)" }}>
                        <RocketIcon />
                        משימת הלמידה של היום
                      </div>
                      <h1
                        className="text-4xl md:text-6xl font-bold mb-4"
                        style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)", lineHeight: 1.05 }}
                      >
                        שלום, {child.name}! מוכנים להמריא?
                      </h1>
                      <p className="text-lg md:text-xl max-w-2xl" style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                        בוחרים משימה קצרה, צוברים כוכבים, ומגלים איפה כבר קל ומה כדאי לתרגל השבוע.
                      </p>
                    </div>

                    <motion.div
                      className="relative mx-auto w-64 h-64 rounded-[2rem] flex flex-col items-center justify-center text-center"
                      style={{
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border-subtle)",
                        boxShadow: "0 24px 80px rgba(0, 0, 0, 0.22)",
                      }}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="text-8xl mb-4">{child.avatar}</div>
                      <div className="text-sm" style={{ color: "var(--text-muted)" }}>התקדמות כללית</div>
                      <div className="text-4xl font-bold gradient-text" style={{ fontFamily: "'Rubik', sans-serif" }}>
                        {totalProgress}%
                      </div>
                    </motion.div>
                  </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-5">
                  <motion.button
                    className="relative overflow-hidden rounded-[2rem] p-6 md:p-7 text-right"
                    style={{
                      background: "linear-gradient(135deg, rgba(59, 130, 246, 0.22), rgba(6, 182, 212, 0.12))",
                      border: "2px solid rgba(59, 130, 246, 0.28)",
                      color: "var(--text-primary)",
                    }}
                    onClick={() => setIsAssessmentDialogOpen(true)}
                    whileHover={{ scale: 1.015, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <span className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(59, 130, 246, 0.18)", color: "var(--accent-primary)" }}>
                          <GaugeIcon />
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>
                          בדיקת קצב
                        </h2>
                        <p className="text-base md:text-lg max-w-xl" style={{ color: "var(--text-secondary)", lineHeight: 1.65 }}>
                          מסע קצר שמגלה את הרמה הנוכחית בקריאה, חשבון וחשיבה.
                        </p>
                      </div>
                      <span className="text-6xl md:text-7xl">🚀</span>
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold" style={{ background: "var(--accent-primary)", color: "white" }}>
                      מתחילים
                      <span style={{ transform: "rotate(180deg)" }}>
                        <ArrowIcon />
                      </span>
                    </div>
                  </motion.button>

                  <div
                    className="rounded-[2rem] p-6 md:p-7"
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                  >
                    <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--text-primary)", fontFamily: "'Rubik', sans-serif" }}>
                      לוח הכוכבים שלי
                    </h2>
                    <div className="space-y-4">
                      <ProgressRow label="משימות שהושלמו" value={`${child.subjects.length} תחומים`} color="var(--accent-primary)" />
                      <ProgressRow label="כוח למידה" value={`${totalProgress}%`} color="var(--accent-success)" />
                      <ProgressRow
                        label="התחום החזק"
                        value={strongestSubject ? subjectMeta[strongestSubject].label : "מתחילים היום"}
                        color={strongestSubject ? subjectMeta[strongestSubject].color : "var(--accent-warning)"}
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
                    <div>
                      <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)", fontFamily: "'Rubik', sans-serif" }}>
                        בוחרים הרפתקה
                      </h2>
                      <p className="text-base mt-1" style={{ color: "var(--text-muted)" }}>
                        כל משימה קצרה, צבעונית, ומוסיפה התקדמות.
                      </p>
                    </div>
                  </div>

                  {child.subjects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                      {child.subjects.map((subject, index) => (
                        <LearningCard
                          key={subject}
                          subject={subject}
                          progress={child.progress[subject] || 0}
                          index={index}
                          onClick={() => startQuiz(subject)}
                        />
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      className="rounded-[2rem] p-10 text-center"
                      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="text-6xl mb-4">🎒</div>
                      <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}>
                        עוד לא נבחרו נושאים
                      </h3>
                      <p className="text-base" style={{ color: "var(--text-muted)" }}>
                        ההורים יכולים להוסיף תחומי למידה מהמסך שלהם.
                      </p>
                    </motion.div>
                  )}
                </section>
              </motion.div>
            ) : !quizComplete ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <motion.button
                  className="flex items-center gap-2 mb-8 px-4 py-2 rounded-xl transition-all hover:bg-[var(--bg-card)]"
                  style={{ color: "var(--text-muted)" }}
                  onClick={resetQuiz}
                  whileHover={{ x: 4 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: "rotate(180deg)" }}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  חזרה למשימות
                </motion.button>

                {questions[currentQuestionIndex] && (
                  <QuizCard
                    question={questions[currentQuestionIndex]}
                    onAnswer={handleAnswer}
                    questionNumber={currentQuestionIndex + 1}
                    totalQuestions={questions.length}
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="complete"
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <motion.div
                  className="rounded-[2rem] p-8 md:p-12 max-w-xl mx-auto"
                  style={{
                    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.16), rgba(59, 130, 246, 0.12))",
                    border: "1px solid var(--border-subtle)",
                  }}
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                >
                  <motion.div
                    className="text-8xl mb-6"
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: 3 }}
                  >
                    {score >= 4 ? "🏆" : score >= 2 ? "🌟" : "💪"}
                  </motion.div>

                  <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}>
                    {score >= 4 ? "ניצחון יפה!" : score >= 2 ? "עבודה טובה!" : "מתאמנים ומתחזקים!"}
                  </h2>

                  <p className="text-xl mb-8" style={{ color: "var(--text-secondary)" }}>
                    אספת{" "}
                    <span className="font-bold" style={{ color: "var(--accent-primary)" }}>
                      {score}
                    </span>{" "}
                    מתוך {questions.length} כוכבים
                  </p>

                  <div className="flex justify-center gap-3 mb-8">
                    {Array.from({ length: questions.length }).map((_, index) => (
                      <motion.div
                        key={index}
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{
                          background: index < score ? "var(--accent-success)" : "var(--bg-elevated)",
                        }}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {index < score ? "⭐" : "○"}
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      className="px-8 py-4 rounded-2xl font-semibold text-lg"
                      style={{
                        background: "linear-gradient(135deg, var(--accent-primary), #9333ea)",
                        color: "white",
                        fontFamily: "'Rubik', sans-serif",
                      }}
                      onClick={() => selectedSubject && startQuiz(selectedSubject)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      שחק שוב
                    </motion.button>

                    <motion.button
                      className="px-8 py-4 rounded-2xl font-semibold text-lg"
                      style={{
                        background: "var(--bg-card)",
                        color: "var(--text-primary)",
                        border: "2px solid var(--border-subtle)",
                        fontFamily: "'Rubik', sans-serif",
                      }}
                      onClick={resetQuiz}
                      whileHover={{ scale: 1.05, borderColor: "var(--accent-primary)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      משימה אחרת
                    </motion.button>
                  </div>
                </motion.div>

                {score >= 3 && (
                  <div className="fixed inset-0 pointer-events-none z-50">
                    {celebrationPieces.map((piece) => (
                      <motion.div
                        key={piece.id}
                        className="absolute"
                        style={{ left: piece.left, top: "-20px" }}
                        initial={{ y: -20, rotate: 0, opacity: 1 }}
                        animate={{ y: "110vh", rotate: 720, opacity: 0 }}
                        transition={{
                          duration: piece.duration,
                          delay: piece.delay,
                          ease: "easeIn",
                        }}
                      >
                        <span className="text-3xl">{piece.symbol}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AdaptiveAssessmentDialog
        isOpen={isAssessmentDialogOpen}
        onClose={() => setIsAssessmentDialogOpen(false)}
        onAssessmentComplete={handleAssessmentComplete}
      />

      <Footer />
    </main>
  );
}

function ProgressRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className="text-sm" style={{ color: "var(--text-muted)" }}>
          {label}
        </div>
        <div className="text-lg font-bold" style={{ color: "var(--text-primary)", fontFamily: "'Rubik', sans-serif" }}>
          {value}
        </div>
      </div>
      <span className="w-3 h-10 rounded-full" style={{ background: color }} />
    </div>
  );
}

function LearningCard({
  subject,
  progress,
  index,
  onClick,
}: {
  subject: Subject;
  progress: number;
  index: number;
  onClick: () => void;
}) {
  const meta = subjectMeta[subject];

  return (
    <motion.button
      className="relative overflow-hidden rounded-[2rem] p-5 text-right min-h-64 flex flex-col justify-between"
      style={{
        background: meta.gradient,
        border: `2px solid ${meta.color}30`,
        color: "var(--text-primary)",
      }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div>
        <div className="flex items-start justify-between mb-5">
          <motion.span
            className="text-6xl"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
          >
            {meta.emoji}
          </motion.span>
          <span
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: `${meta.color}20`, color: meta.color }}
          >
            <span style={{ transform: "rotate(180deg)" }}>
              <ArrowIcon />
            </span>
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-1" style={{ color: meta.color, fontFamily: "'Rubik', sans-serif" }}>
          {meta.label}
        </h3>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {meta.action}
        </p>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span style={{ color: "var(--text-muted)" }}>התקדמות</span>
          <span style={{ color: meta.color }}>{progress}%</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: `${meta.color}20` }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: meta.color }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.button>
  );
}
