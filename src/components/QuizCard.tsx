"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Question, Subject } from "@/types";

interface QuizCardProps {
  question: Question;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

const subjectColors: Record<Subject, string> = {
  math: "var(--accent-math)",
  hebrew: "var(--accent-hebrew)",
  science: "var(--accent-science)",
  knowledge: "var(--accent-knowledge)",
};

const confettiPieces = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  color: ["#7c3aed", "#22d3ee", "#f472b6", "#fbbf24", "#10b981"][index % 5],
  left: `${(index * 37) % 100}%`,
  duration: 2 + (index % 4) * 0.2,
  delay: (index % 5) * 0.08,
}));

export function QuizCard({ question, onAnswer, questionNumber, totalQuestions }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [inputAnswer, setInputAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const subjectColor = subjectColors[question.subject];
  const isPracticeOnly = question.type === "oral_reading" || question.type === "writing_prompt";
  const answerPlaceholder =
    question.type === "ordering"
      ? "לדוגמה: 9, 12, 15"
      : question.type === "writing_prompt"
        ? "כתבו כאן..."
        : question.type === "oral_reading"
          ? "כתבו שסיימתם לקרוא"
          : "כתבו תשובה...";

  const handleSelect = (answer: string) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    const correct =
      isPracticeOnly ||
      getAcceptedAnswers(question).some(
        (acceptedAnswer) => normalizeAnswer(answer) === normalizeAnswer(acceptedAnswer)
      );
    setIsCorrect(correct);
    setShowResult(true);

    window.setTimeout(() => {
      onAnswer(answer, correct);
      setSelectedAnswer(null);
      setInputAnswer("");
      setShowResult(false);
    }, 2000);
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            שאלה {questionNumber} מתוך {totalQuestions}
          </span>
          <span
            className="text-sm font-medium px-3 py-1 rounded-full"
            style={{ background: `${subjectColor}20`, color: subjectColor }}
          >
            רמת קושי {question.difficultyScore}/10
          </span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ background: "var(--bg-elevated)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: subjectColor }}
            initial={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question card */}
      <div
        className="glass-card rounded-3xl p-8 mb-6"
        style={{ borderColor: `${subjectColor}30` }}
      >
        <h2
          className="text-2xl md:text-3xl font-bold mb-8 text-center leading-relaxed"
          style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
        >
          {question.question}
        </h2>

        {/* Answer options */}
        {question.type === "multiple_choice" && question.options && question.options.length > 0 ? (
          <div className="grid gap-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption =
                getAcceptedAnswers(question).some(
                  (acceptedAnswer) => normalizeAnswer(option) === normalizeAnswer(acceptedAnswer)
                );
              const showCorrectness = showResult && (isSelected || isCorrectOption);

              let bgColor = "var(--bg-card)";
              let borderColor = "var(--border-subtle)";

              if (showCorrectness) {
                if (isCorrectOption) {
                  bgColor = "rgba(16, 185, 129, 0.15)";
                  borderColor = "var(--accent-success)";
                } else if (isSelected && !isCorrectOption) {
                  bgColor = "rgba(239, 68, 68, 0.15)";
                  borderColor = "var(--accent-error)";
                }
              } else if (isSelected) {
                bgColor = `${subjectColor}15`;
                borderColor = subjectColor;
              }

              return (
                <motion.button
                  key={option}
                  className="w-full p-5 rounded-2xl text-right text-lg font-medium transition-all"
                  style={{
                    background: bgColor,
                    border: `2px solid ${borderColor}`,
                    color: "var(--text-primary)",
                    fontFamily: "'Assistant', sans-serif",
                  }}
                  onClick={() => handleSelect(option)}
                  disabled={showResult}
                  whileHover={!showResult ? { scale: 1.02, x: -4 } : undefined}
                  whileTap={!showResult ? { scale: 0.98 } : undefined}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{
                        background: showCorrectness
                          ? isCorrectOption
                            ? "var(--accent-success)"
                            : isSelected
                              ? "var(--accent-error)"
                              : `${subjectColor}20`
                          : `${subjectColor}20`,
                        color: showCorrectness
                          ? isCorrectOption || isSelected
                            ? "white"
                            : subjectColor
                          : subjectColor,
                      }}
                    >
                      {showCorrectness && isCorrectOption
                        ? "✓"
                        : showCorrectness && isSelected && !isCorrectOption
                          ? "✗"
                          : String.fromCharCode(1488 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {question.rubric && (
              <p className="text-sm text-center" style={{ color: "var(--text-muted)" }}>
                {question.rubric}
              </p>
            )}
            <textarea
              value={inputAnswer}
              onChange={(event) => setInputAnswer(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey && inputAnswer.trim()) {
                  event.preventDefault();
                  handleSelect(inputAnswer.trim());
                }
              }}
              disabled={showResult}
              className="w-full px-5 py-4 rounded-2xl text-xl text-center min-h-24"
              style={{
                background: "var(--bg-card)",
                border: `2px solid ${selectedAnswer ? subjectColor : "var(--border-subtle)"}`,
                color: "var(--text-primary)",
                fontFamily: "'Rubik', sans-serif",
              }}
              placeholder={answerPlaceholder}
              dir="auto"
            />
            <motion.button
              onClick={() => handleSelect(inputAnswer.trim())}
              disabled={!inputAnswer.trim() || showResult}
              className="w-full py-4 rounded-2xl text-lg font-semibold"
              style={{
                background: inputAnswer.trim()
                  ? `linear-gradient(135deg, ${subjectColor}, #1d4ed8)`
                  : "var(--bg-card)",
                color: inputAnswer.trim() ? "white" : "var(--text-muted)",
                fontFamily: "'Rubik', sans-serif",
              }}
              whileHover={inputAnswer.trim() && !showResult ? { scale: 1.02 } : undefined}
              whileTap={inputAnswer.trim() && !showResult ? { scale: 0.98 } : undefined}
            >
              בדוק תשובה
            </motion.button>
          </div>
        )}
      </div>

      {/* Result feedback */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            className="p-6 rounded-2xl text-center"
            style={{
              background: isCorrect
                ? "rgba(16, 185, 129, 0.1)"
                : "rgba(239, 68, 68, 0.1)",
              border: `2px solid ${isCorrect ? "var(--accent-success)" : "var(--accent-error)"}`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="text-4xl mb-3">
              {isCorrect ? "🎉" : "😊"}
            </div>
            <h3
              className="text-xl font-bold mb-2"
              style={{
                color: isCorrect ? "var(--accent-success)" : "var(--accent-error)",
                fontFamily: "'Rubik', sans-serif",
              }}
            >
              {isPracticeOnly ? "נרשם לתרגול!" : isCorrect ? "כל הכבוד!" : "לא נורא, ננסה שוב!"}
            </h3>
            {question.explanation && (
              <p
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {question.explanation}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti for correct answers */}
      <AnimatePresence>
        {showResult && isCorrect && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {confettiPieces.map((piece) => (
              <motion.div
                key={piece.id}
                className="absolute w-3 h-3 rounded-sm"
                style={{
                  background: piece.color,
                  left: piece.left,
                  top: "-20px",
                }}
                initial={{ y: -20, rotate: 0, opacity: 1 }}
                animate={{
                  y: typeof window !== "undefined" ? window.innerHeight + 20 : 900,
                  rotate: 720,
                  opacity: 0,
                }}
                transition={{
                  duration: piece.duration,
                  delay: piece.delay,
                  ease: "easeIn",
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase().replace(/\s*,\s*/g, ", ");
}

function getAcceptedAnswers(question: Question): string[] {
  return [question.correctAnswer, ...(question.acceptableAnswers || [])];
}
