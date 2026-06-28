"use client";

import { motion } from "framer-motion";
import { Subject } from "@/types";

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
  progress?: number;
  disabled?: boolean;
}

const subjectConfig: Record<Subject, { emoji: string; label: string; color: string; bgGradient: string }> = {
  math: {
    emoji: "🧮",
    label: "חשבון",
    color: "var(--accent-math)",
    bgGradient: "linear-gradient(135deg, rgba(244, 114, 182, 0.15) 0%, rgba(244, 114, 182, 0.05) 100%)",
  },
  hebrew: {
    emoji: "📖",
    label: "עברית",
    color: "var(--accent-hebrew)",
    bgGradient: "linear-gradient(135deg, rgba(96, 165, 250, 0.15) 0%, rgba(96, 165, 250, 0.05) 100%)",
  },
  science: {
    emoji: "🔬",
    label: "מדעים",
    color: "var(--accent-science)",
    bgGradient: "linear-gradient(135deg, rgba(52, 211, 153, 0.15) 0%, rgba(52, 211, 153, 0.05) 100%)",
  },
  knowledge: {
    emoji: "🌍",
    label: "ידע כללי",
    color: "var(--accent-knowledge)",
    bgGradient: "linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 100%)",
  },
};

export function SubjectCard({ subject, onClick, progress = 0, disabled = false }: SubjectCardProps) {
  const config = subjectConfig[subject];

  return (
    <motion.button
      className={`relative w-full p-6 rounded-3xl text-right overflow-hidden ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      style={{
        background: config.bgGradient,
        border: `2px solid ${config.color}20`,
      }}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? undefined : { scale: 1.02, y: -4 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-1 rounded-3xl opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${config.color}30 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <motion.span
            className="text-5xl"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {config.emoji}
          </motion.span>
          {!disabled && (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: `${config.color}20` }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={config.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transform: "rotate(180deg)" }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>

        <h3
          className="text-2xl font-bold mb-2"
          style={{ color: config.color, fontFamily: "'Rubik', sans-serif" }}
        >
          {config.label}
        </h3>

        {/* Progress bar */}
        {progress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span style={{ color: "var(--text-muted)" }}>התקדמות</span>
              <span style={{ color: config.color }}>{progress}%</span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: `${config.color}20` }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: config.color }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Decorative corner */}
      <div
        className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-30"
        style={{ background: config.color }}
      />
    </motion.button>
  );
}
