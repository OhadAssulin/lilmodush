"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { SubjectCard } from "@/components/SubjectCard";
import { QuizCard } from "@/components/QuizCard";
import { Footer } from "@/components/Footer";
import { getChildById, updateChildProgress } from "@/lib/db";
import { getQuestions } from "@/lib/questions";
import { Child, Subject, Question } from "@/types";

type PageParams = {
  params: Promise<{ id: string }>;
};

export default function ChildPage({ params }: PageParams) {
  const resolvedParams = use(params);
  const [child, setChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    const data = getChildById(resolvedParams.id);
    if (data) {
      setChild(data.child);
    }
    setLoading(false);
  }, [resolvedParams.id]);

  const startQuiz = (subject: Subject) => {
    setSelectedSubject(subject);
    setQuestions(getQuestions(subject, 5));
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
  };

  const handleAnswer = (answer: string, isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 100);
    } else {
      setTimeout(() => {
        setQuizComplete(true);
        if (child && selectedSubject) {
          const newProgress = Math.min(
            100,
            (child.progress[selectedSubject] || 0) + Math.round((score + (isCorrect ? 1 : 0)) * 4)
          );
          updateChildProgress(child.id, selectedSubject, newProgress);
          setChild((prev) => prev ? {
            ...prev,
            progress: { ...prev.progress, [selectedSubject]: newProgress },
          } : null);
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

  if (loading) {
    return (
      <main className="relative min-h-screen gradient-mesh grid-pattern flex items-center justify-center">
        <motion.div
          className="text-6xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
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
            className="glass-card rounded-3xl p-12 text-center max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              😢
            </motion.div>
            <h1
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
            >
              אופס!
            </h1>
            <p className="text-base mb-6" style={{ color: "var(--text-muted)" }}>
              לא מצאנו את הקישור הזה. אולי הוא נמחק או שיש טעות בכתובת.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 rounded-xl font-medium"
              style={{
                background: "linear-gradient(135deg, var(--accent-primary), #9333ea)",
                color: "white",
              }}
            >
              חזרה לדף הבית
            </a>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen gradient-mesh grid-pattern child-mode">
      <Header />

      <div className="min-h-screen pt-28 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!selectedSubject ? (
              /* Subject selection */
              <motion.div
                key="subjects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Welcome header */}
                <div className="text-center mb-12">
                  <motion.div
                    className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-5xl mb-6"
                    style={{
                      background: "linear-gradient(135deg, var(--accent-primary)20, var(--accent-secondary)20)",
                    }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {child.avatar}
                  </motion.div>
                  <h1
                    className="text-4xl md:text-5xl font-bold mb-4"
                    style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
                  >
                    שלום, {child.name}! 🌟
                  </h1>
                  <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
                    מה בא לך ללמוד היום?
                  </p>
                </div>

                {/* Subject cards */}
                {child.subjects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {child.subjects.map((subject, index) => (
                      <motion.div
                        key={subject}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <SubjectCard
                          subject={subject}
                          onClick={() => startQuiz(subject)}
                          progress={child.progress[subject] || 0}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    className="glass-card rounded-3xl p-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="text-6xl mb-4">📭</div>
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
                    >
                      אין נושאים עדיין
                    </h3>
                    <p className="text-base" style={{ color: "var(--text-muted)" }}>
                      בקש מההורים שלך להוסיף נושאים ללמידה
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ) : !quizComplete ? (
              /* Quiz */
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Back button */}
                <motion.button
                  className="flex items-center gap-2 mb-8 px-4 py-2 rounded-xl transition-all hover:bg-[var(--bg-card)]"
                  style={{ color: "var(--text-muted)" }}
                  onClick={resetQuiz}
                  whileHover={{ x: 4 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: "rotate(180deg)" }}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  חזרה לבחירת נושא
                </motion.button>

                {/* Current question */}
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
              /* Quiz complete */
              <motion.div
                key="complete"
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <motion.div
                  className="glass-card rounded-3xl p-12 max-w-lg mx-auto"
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

                  <h2
                    className="text-4xl font-bold mb-4"
                    style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
                  >
                    {score >= 4 ? "מדהים!" : score >= 2 ? "יפה מאוד!" : "כל הכבוד!"}
                  </h2>

                  <p className="text-xl mb-8" style={{ color: "var(--text-secondary)" }}>
                    ענית נכון על{" "}
                    <span
                      className="font-bold"
                      style={{ color: "var(--accent-primary)" }}
                    >
                      {score}
                    </span>{" "}
                    מתוך {questions.length} שאלות
                  </p>

                  {/* Score visualization */}
                  <div className="flex justify-center gap-3 mb-8">
                    {Array.from({ length: questions.length }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{
                          background: i < score
                            ? "var(--accent-success)"
                            : "var(--bg-elevated)",
                        }}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {i < score ? "⭐" : "○"}
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
                      onClick={() => startQuiz(selectedSubject)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      🔄 שחק שוב
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
                      📚 נושא אחר
                    </motion.button>
                  </div>
                </motion.div>

                {/* Celebration confetti */}
                {score >= 3 && (
                  <div className="fixed inset-0 pointer-events-none z-50">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: "-20px",
                        }}
                        initial={{ y: -20, rotate: 0, opacity: 1 }}
                        animate={{
                          y: window.innerHeight + 20,
                          rotate: 720,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          delay: Math.random(),
                          ease: "easeIn",
                        }}
                      >
                        <span className="text-3xl">
                          {["🎉", "⭐", "🌟", "✨", "🎊", "💫"][i % 6]}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </main>
  );
}
