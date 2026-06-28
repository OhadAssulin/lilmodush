"use client";

import { motion } from "framer-motion";
import { Child, Subject } from "@/types";

interface ChildCardProps {
  child: Child;
  onEdit: () => void;
  onDelete: () => void;
  onCopyLink: () => void;
}

const avatars = ["🧒", "👧", "👦", "🧒🏻", "👧🏽", "👦🏾", "🧒🏿", "👧🏼"];

const subjectEmojis: Record<Subject, string> = {
  math: "🧮",
  hebrew: "📖",
  science: "🔬",
  knowledge: "🌍",
};

export function ChildCard({ child, onEdit, onDelete, onCopyLink }: ChildCardProps) {
  const totalProgress = child.subjects.length > 0
    ? Math.round(
        child.subjects.reduce((sum, subject) => sum + (child.progress[subject] || 0), 0) /
        child.subjects.length
      )
    : 0;

  return (
    <motion.div
      className="glass-card rounded-3xl p-6 card-lift"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
            style={{ background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.15))" }}
          >
            {child.avatar || avatars[0]}
          </div>
          <div>
            <h3
              className="text-xl font-bold"
              style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
            >
              {child.name}
            </h3>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              התקדמות כללית: {totalProgress}%
            </p>
          </div>
        </div>

        {/* Actions dropdown */}
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-[var(--bg-card-hover)]"
            style={{ border: "1px solid var(--border-subtle)" }}
            title="ערוך"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-red-500/10"
            style={{ border: "1px solid var(--border-subtle)" }}
            title="מחק"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-error)" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Subjects */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3" style={{ color: "var(--text-muted)" }}>
          נושאי לימוד
        </h4>
        <div className="flex flex-wrap gap-2">
          {child.subjects.map((subject) => (
            <div
              key={subject}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
              style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}
            >
              <span>{subjectEmojis[subject]}</span>
              <span>
                {subject === "math" ? "חשבון" :
                 subject === "hebrew" ? "עברית" :
                 subject === "science" ? "מדעים" : "ידע כללי"}
              </span>
            </div>
          ))}
          {child.subjects.length === 0 && (
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
              לא נבחרו נושאים
            </span>
          )}
        </div>
      </div>

      {/* Progress bars */}
      <div className="space-y-3 mb-6">
        {child.subjects.map((subject) => {
          const progress = child.progress[subject] || 0;
          const colors: Record<Subject, string> = {
            math: "var(--accent-math)",
            hebrew: "var(--accent-hebrew)",
            science: "var(--accent-science)",
            knowledge: "var(--accent-knowledge)",
          };
          return (
            <div key={subject}>
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: "var(--text-muted)" }}>
                  {subjectEmojis[subject]}{" "}
                  {subject === "math" ? "חשבון" :
                   subject === "hebrew" ? "עברית" :
                   subject === "science" ? "מדעים" : "ידע כללי"}
                </span>
                <span style={{ color: colors[subject] }}>{progress}%</span>
              </div>
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ background: "var(--bg-elevated)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: colors[subject] }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Copy link button */}
      <motion.button
        className="w-full py-4 rounded-2xl font-medium text-base flex items-center justify-center gap-2"
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          color: "white",
          fontFamily: "'Rubik', sans-serif",
          boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
        }}
        onClick={onCopyLink}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        העתק קישור ללמידה
      </motion.button>
    </motion.div>
  );
}
