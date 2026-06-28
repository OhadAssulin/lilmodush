"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  grades,
  getQuestionsByGradeAndTopic,
  getTopicsForGrade,
  checkAnswer,
  MathQuestion,
  GradeInfo,
} from "@/lib/math-questions";

interface MathPracticeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type DialogStep = "grade" | "topic" | "question" | "result";

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export function MathPracticeDialog({ isOpen, onClose }: MathPracticeDialogProps) {
  const [step, setStep] = useState<DialogStep>("grade");
  const [selectedGrade, setSelectedGrade] = useState<GradeInfo | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [questions, setQuestions] = useState<MathQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setStep("grade");
      setSelectedGrade(null);
      setSelectedTopic(null);
      setQuestions([]);
      setCurrentQuestionIndex(0);
      setUserAnswer("");
      setShowResult(false);
      setScore(0);
      setTotalAnswered(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === "question" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [step, currentQuestionIndex]);

  const handleGradeSelect = (grade: GradeInfo) => {
    setSelectedGrade(grade);
    setStep("topic");
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    if (selectedGrade) {
      const topicQuestions = getQuestionsByGradeAndTopic(selectedGrade.grade, topic);
      const shuffled = [...topicQuestions].sort(() => Math.random() - 0.5);
      setQuestions(shuffled);
      setCurrentQuestionIndex(0);
      setScore(0);
      setTotalAnswered(0);
      setStep("question");
    }
  };

  const handleAnswerSubmit = () => {
    if (!userAnswer.trim()) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correct = checkAnswer(currentQuestion, userAnswer);
    setIsCorrect(correct);
    setShowResult(true);
    setTotalAnswered(prev => prev + 1);

    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleMultipleChoiceSelect = (option: string) => {
    setUserAnswer(option);
    const currentQuestion = questions[currentQuestionIndex];
    const correct = option === currentQuestion.answer;
    setIsCorrect(correct);
    setShowResult(true);
    setTotalAnswered(prev => prev + 1);

    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setUserAnswer("");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep("result");
    }
  };

  const handleBack = () => {
    if (step === "topic") {
      setStep("grade");
      setSelectedGrade(null);
    } else if (step === "question" || step === "result") {
      setStep("topic");
      setSelectedTopic(null);
      setQuestions([]);
      setCurrentQuestionIndex(0);
      setScore(0);
      setTotalAnswered(0);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !showResult && userAnswer.trim()) {
      handleAnswerSubmit();
    } else if (e.key === "Enter" && showResult) {
      handleNextQuestion();
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

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
              <div className="flex items-center justify-between p-6 border-b border-[var(--border-subtle)]">
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-[var(--bg-card-hover)]"
                  style={{ border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
                >
                  <CloseIcon />
                </button>
                <h2
                  className="text-2xl font-bold flex-1 text-center"
                  style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
                >
                  {step === "grade" && "בחר כיתה"}
                  {step === "topic" && selectedGrade?.label}
                  {step === "question" && selectedTopic}
                  {step === "result" && "סיום תרגול"}
                </h2>
                {step !== "grade" ? (
                  <button
                    onClick={handleBack}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-[var(--bg-card-hover)]"
                    style={{ border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                ) : (
                  <div className="w-10 h-10" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  {/* Grade Selection */}
                  {step === "grade" && (
                    <motion.div
                      key="grade"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <p className="text-center text-sm mb-6" style={{ color: "var(--text-muted)" }}>
                        באיזו כיתה אתה לומד?
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {grades.map((grade, index) => {
                          const gradeColors = [
                            { bg: "rgba(239, 68, 68, 0.12)", border: "#ef4444", icon: "🎒" },
                            { bg: "rgba(249, 115, 22, 0.12)", border: "#f97316", icon: "📚" },
                            { bg: "rgba(234, 179, 8, 0.12)", border: "#eab308", icon: "✏️" },
                            { bg: "rgba(34, 197, 94, 0.12)", border: "#22c55e", icon: "📐" },
                            { bg: "rgba(59, 130, 246, 0.12)", border: "#3b82f6", icon: "🔢" },
                            { bg: "rgba(139, 92, 246, 0.12)", border: "#8b5cf6", icon: "🧮" },
                          ];
                          const colorScheme = gradeColors[index];

                          return (
                            <motion.button
                              key={grade.grade}
                              className="relative p-5 rounded-2xl text-center transition-all overflow-hidden group"
                              style={{
                                background: colorScheme.bg,
                                border: `2px solid transparent`,
                              }}
                              onClick={() => handleGradeSelect(grade)}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{
                                scale: 1.03,
                                borderColor: colorScheme.border,
                              }}
                              whileTap={{ scale: 0.97 }}
                            >
                              <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{
                                  background: `radial-gradient(circle at center, ${colorScheme.border}20 0%, transparent 70%)`,
                                }}
                              />
                              <div className="relative z-10">
                                <div className="text-3xl mb-2">{colorScheme.icon}</div>
                                <div
                                  className="text-xl font-bold mb-1"
                                  style={{
                                    fontFamily: "'Rubik', sans-serif",
                                    color: colorScheme.border,
                                  }}
                                >
                                  {grade.label}
                                </div>
                                <div
                                  className="text-xs font-medium px-2 py-1 rounded-full inline-block"
                                  style={{
                                    background: "var(--bg-primary)",
                                    color: "var(--text-muted)",
                                  }}
                                >
                                  גילאי {grade.ageRange}
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Topic Selection */}
                  {step === "topic" && selectedGrade && (
                    <motion.div
                      key="topic"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <div className="text-center mb-6">
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                          מה תרצה לתרגל היום?
                        </p>
                      </div>
                      <div className="grid gap-3">
                        {getTopicsForGrade(selectedGrade.grade).map((topic, index) => {
                          const topicIcons = ["➕", "➖", "✖️", "➗", "🔢", "📊", "📐", "💰", "🧩", "📈"];
                          const icon = topicIcons[index % topicIcons.length];

                          return (
                            <motion.button
                              key={topic}
                              className="w-full p-4 rounded-2xl flex items-center gap-4 transition-all group"
                              style={{
                                background: "var(--bg-elevated)",
                                border: "2px solid var(--border-subtle)",
                              }}
                              onClick={() => handleTopicSelect(topic)}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{
                                scale: 1.01,
                                borderColor: "#3b82f6",
                                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(6, 182, 212, 0.08))",
                              }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110"
                                style={{
                                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.15))",
                                }}
                              >
                                {icon}
                              </div>
                              <div className="flex-1 text-right">
                                <span
                                  className="font-semibold text-base block"
                                  style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
                                >
                                  {topic}
                                </span>
                                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                                  לחץ להתחלת תרגול
                                </span>
                              </div>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-50 group-hover:opacity-100 transition-all group-hover:-translate-x-1"
                              >
                                <polyline points="15 18 9 12 15 6" />
                              </svg>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Question */}
                  {step === "question" && currentQuestion && (
                    <motion.div
                      key={`question-${currentQuestionIndex}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      {/* Progress */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                          שאלה {currentQuestionIndex + 1} מתוך {questions.length}
                        </span>
                        <span className="text-sm font-medium" style={{ color: "#3b82f6" }}>
                          ניקוד: {score}/{totalAnswered}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div
                        className="h-2 rounded-full overflow-hidden mb-6"
                        style={{ background: "var(--bg-elevated)" }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: "linear-gradient(90deg, #3b82f6, #06b6d4)" }}
                          initial={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
                          animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      {/* Question text */}
                      <div
                        className="p-6 rounded-2xl text-center"
                        style={{ background: "var(--bg-elevated)" }}
                      >
                        <h3
                          className="text-2xl md:text-3xl font-bold leading-relaxed"
                          style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
                        >
                          {currentQuestion.question}
                        </h3>
                      </div>

                      {/* Answer input */}
                      {!showResult && (
                        <>
                          {currentQuestion.type === "open_input" ? (
                            <div className="space-y-4">
                              <input
                                ref={inputRef}
                                type="text"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="הקלד את התשובה..."
                                className="w-full px-6 py-4 rounded-2xl text-xl text-center"
                                style={{
                                  background: "var(--bg-elevated)",
                                  border: "2px solid var(--border-subtle)",
                                  color: "var(--text-primary)",
                                  fontFamily: "'Rubik', sans-serif",
                                }}
                                dir="auto"
                              />
                              <motion.button
                                onClick={handleAnswerSubmit}
                                disabled={!userAnswer.trim()}
                                className="w-full py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2"
                                style={{
                                  background: userAnswer.trim()
                                    ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                                    : "var(--bg-elevated)",
                                  color: userAnswer.trim() ? "white" : "var(--text-muted)",
                                  fontFamily: "'Rubik', sans-serif",
                                  boxShadow: userAnswer.trim() ? "0 4px 14px rgba(59, 130, 246, 0.35)" : "none",
                                }}
                                whileHover={userAnswer.trim() ? { scale: 1.02 } : {}}
                                whileTap={userAnswer.trim() ? { scale: 0.98 } : {}}
                              >
                                <CheckIcon />
                                בדוק תשובה
                              </motion.button>
                            </div>
                          ) : (
                            <div className="grid gap-3">
                              {currentQuestion.options?.map((option, index) => (
                                <motion.button
                                  key={option}
                                  className="w-full p-4 rounded-2xl flex items-center gap-4 text-lg font-medium group"
                                  style={{
                                    background: "var(--bg-elevated)",
                                    border: "2px solid var(--border-subtle)",
                                    color: "var(--text-primary)",
                                    fontFamily: "'Assistant', sans-serif",
                                  }}
                                  onClick={() => handleMultipleChoiceSelect(option)}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  whileHover={{
                                    scale: 1.02,
                                    borderColor: "#3b82f6",
                                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))",
                                  }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <span
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-transform group-hover:scale-110"
                                    style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", color: "white" }}
                                  >
                                    {String.fromCharCode(1488 + index)}
                                  </span>
                                  <span className="flex-1 text-right">{option}</span>
                                </motion.button>
                              ))}
                            </div>
                          )}
                        </>
                      )}

                      {/* Result feedback */}
                      {showResult && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4"
                        >
                          <div
                            className="p-6 rounded-2xl text-center"
                            style={{
                              background: isCorrect
                                ? "rgba(16, 185, 129, 0.15)"
                                : "rgba(239, 68, 68, 0.15)",
                              border: `2px solid ${isCorrect ? "var(--accent-success)" : "var(--accent-error)"}`,
                            }}
                          >
                            <div className="text-5xl mb-3">{isCorrect ? "🎉" : "😊"}</div>
                            <h4
                              className="text-2xl font-bold mb-2"
                              style={{
                                fontFamily: "'Rubik', sans-serif",
                                color: isCorrect ? "var(--accent-success)" : "var(--accent-error)",
                              }}
                            >
                              {isCorrect ? "כל הכבוד!" : "לא נורא!"}
                            </h4>
                            {!isCorrect && (
                              <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
                                התשובה הנכונה היא: <strong>{currentQuestion.answer}</strong>
                              </p>
                            )}
                          </div>

                          <motion.button
                            onClick={handleNextQuestion}
                            className="w-full py-4 rounded-2xl font-semibold text-lg"
                            style={{
                              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                              color: "white",
                              fontFamily: "'Rubik', sans-serif",
                              boxShadow: "0 4px 14px rgba(59, 130, 246, 0.35)",
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {currentQuestionIndex < questions.length - 1 ? "שאלה הבאה" : "סיום"}
                          </motion.button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Final Result */}
                  {step === "result" && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        className="text-8xl mb-6"
                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: 2 }}
                      >
                        {score >= questions.length * 0.8 ? "🏆" : score >= questions.length * 0.5 ? "🌟" : "💪"}
                      </motion.div>

                      <h3
                        className="text-4xl font-bold mb-4"
                        style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
                      >
                        {score >= questions.length * 0.8
                          ? "מדהים!"
                          : score >= questions.length * 0.5
                          ? "יפה מאוד!"
                          : "כל הכבוד על הניסיון!"}
                      </h3>

                      <p className="text-xl mb-8" style={{ color: "var(--text-secondary)" }}>
                        ענית נכון על{" "}
                        <span className="font-bold" style={{ color: "#3b82f6" }}>
                          {score}
                        </span>{" "}
                        מתוך {questions.length} שאלות
                      </p>

                      {/* Score visualization */}
                      <div className="flex justify-center gap-2 mb-8">
                        {Array.from({ length: questions.length }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                            style={{
                              background: i < score ? "var(--accent-success)" : "var(--bg-elevated)",
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
                          onClick={() => {
                            setCurrentQuestionIndex(0);
                            setScore(0);
                            setTotalAnswered(0);
                            setUserAnswer("");
                            setShowResult(false);
                            const shuffled = [...questions].sort(() => Math.random() - 0.5);
                            setQuestions(shuffled);
                            setStep("question");
                          }}
                          className="px-8 py-4 rounded-2xl font-semibold text-lg"
                          style={{
                            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                            color: "white",
                            fontFamily: "'Rubik', sans-serif",
                            boxShadow: "0 4px 14px rgba(59, 130, 246, 0.35)",
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          🔄 תרגל שוב
                        </motion.button>

                        <motion.button
                          onClick={handleBack}
                          className="px-8 py-4 rounded-2xl font-semibold text-lg"
                          style={{
                            background: "var(--bg-elevated)",
                            color: "var(--text-primary)",
                            border: "2px solid var(--border-subtle)",
                            fontFamily: "'Rubik', sans-serif",
                          }}
                          whileHover={{ scale: 1.05, borderColor: "#3b82f6" }}
                          whileTap={{ scale: 0.98 }}
                        >
                          📚 נושא אחר
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* Confetti for good score */}
          {step === "result" && score >= questions.length * 0.6 && (
            <div className="fixed inset-0 pointer-events-none z-[60]">
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
                    y: typeof window !== "undefined" ? window.innerHeight + 20 : 1000,
                    rotate: 720,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    delay: Math.random(),
                    ease: "easeIn",
                  }}
                >
                  <span className="text-2xl">
                    {["🎉", "⭐", "🌟", "✨", "🎊", "💫", "🧮"][i % 7]}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
