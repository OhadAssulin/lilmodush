"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { Child, Subject } from "@/types";

interface AddChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (child: Child) => void;
  editChild?: Child | null;
}

const avatars = ["🧒", "👧", "👦", "🧒🏻", "👧🏽", "👦🏾", "🧒🏿", "👧🏼", "🦸", "🦸‍♀️", "🧙", "🧚"];

const subjects: { id: Subject; emoji: string; label: string }[] = [
  { id: "math", emoji: "🧮", label: "חשבון" },
  { id: "hebrew", emoji: "📖", label: "עברית" },
  { id: "science", emoji: "🔬", label: "מדעים" },
  { id: "knowledge", emoji: "🌍", label: "ידע כללי" },
];

export function AddChildModal({ isOpen, onClose, onSave, editChild }: AddChildModalProps) {
  const [name, setName] = useState(editChild?.name || "");
  const [avatar, setAvatar] = useState(editChild?.avatar || avatars[0]);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>(editChild?.subjects || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const child: Child = {
      id: editChild?.id || uuidv4(),
      name: name.trim(),
      avatar,
      subjects: selectedSubjects,
      progress: editChild?.progress || {
        math: 0,
        hebrew: 0,
        science: 0,
        knowledge: 0,
      },
      createdAt: editChild?.createdAt || new Date().toISOString(),
    };

    onSave(child);
    setName("");
    setAvatar(avatars[0]);
    setSelectedSubjects([]);
    onClose();
  };

  const toggleSubject = (subject: Subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

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

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-card rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
                >
                  {editChild ? "עריכת ילד" : "הוספת ילד חדש"}
                </h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-[var(--bg-card-hover)]"
                  style={{ border: "1px solid var(--border-subtle)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name input */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    שם הילד
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="הכנס שם..."
                    className="w-full px-4 py-3 rounded-xl text-base"
                    style={{
                      background: "var(--bg-elevated)",
                      border: "2px solid var(--border-subtle)",
                      color: "var(--text-primary)",
                    }}
                    required
                  />
                </div>

                {/* Avatar selection */}
                <div>
                  <label
                    className="block text-sm font-medium mb-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    בחר אווטאר
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {avatars.map((av) => (
                      <motion.button
                        key={av}
                        type="button"
                        className="w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all"
                        style={{
                          background: avatar === av ? "#3b82f6" : "var(--bg-elevated)",
                          border: `2px solid ${avatar === av ? "#3b82f6" : "var(--border-subtle)"}`,
                        }}
                        onClick={() => setAvatar(av)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {av}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Subject selection */}
                <div>
                  <label
                    className="block text-sm font-medium mb-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    נושאי לימוד (ניתן לבחור כמה שרוצים)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {subjects.map((subject) => {
                      const isSelected = selectedSubjects.includes(subject.id);
                      return (
                        <motion.button
                          key={subject.id}
                          type="button"
                          className="p-4 rounded-2xl text-right flex items-center gap-3 transition-all"
                          style={{
                            background: isSelected
                              ? "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.15))"
                              : "var(--bg-elevated)",
                            border: `2px solid ${isSelected ? "#3b82f6" : "var(--border-subtle)"}`,
                          }}
                          onClick={() => toggleSubject(subject.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-2xl">{subject.emoji}</span>
                          <span
                            className="font-medium"
                            style={{ color: isSelected ? "#3b82f6" : "var(--text-secondary)" }}
                          >
                            {subject.label}
                          </span>
                          {isSelected && (
                            <motion.div
                              className="mr-auto"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="#3b82f6">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                              </svg>
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-4 rounded-2xl font-medium text-base transition-all"
                    style={{
                      background: "var(--bg-elevated)",
                      border: "2px solid var(--border-subtle)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    ביטול
                  </button>
                  <motion.button
                    type="submit"
                    className="flex-1 py-4 rounded-2xl font-medium text-base"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                      color: "white",
                      fontFamily: "'Rubik', sans-serif",
                      boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!name.trim() || selectedSubjects.length === 0}
                  >
                    {editChild ? "שמור שינויים" : "הוסף ילד"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
