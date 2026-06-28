"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { ChildCard } from "@/components/ChildCard";
import { AddChildModal } from "@/components/AddChildModal";
import { Footer } from "@/components/Footer";
import { loginParent, getParent, addChild, updateChild, deleteChild } from "@/lib/db";
import { Child, Parent } from "@/types";

export default function ParentPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [parent, setParent] = useState<Parent | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem("lilmodush_username");
    if (savedUsername) {
      const parentData = getParent(savedUsername);
      if (parentData) {
        setParent(parentData);
        setUsername(savedUsername);
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && username === password) {
      const parentData = loginParent(username);
      setParent(parentData);
      setIsLoggedIn(true);
      localStorage.setItem("lilmodush_username", username);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("lilmodush_username");
    setIsLoggedIn(false);
    setParent(null);
    setUsername("");
    setPassword("");
  };

  const handleAddChild = (child: Child) => {
    if (!parent) return;
    if (editingChild) {
      updateChild(username, child.id, child);
    } else {
      addChild(username, child);
    }
    setParent(getParent(username));
    setEditingChild(null);
  };

  const handleDeleteChild = (childId: string) => {
    if (!parent) return;
    if (confirm("האם אתה בטוח שברצונך למחוק את הילד?")) {
      deleteChild(username, childId);
      setParent(getParent(username));
    }
  };

  const handleCopyLink = (childId: string) => {
    const link = `${window.location.origin}/child/${childId}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(childId);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  if (!isLoggedIn) {
    return (
      <main className="relative min-h-screen gradient-mesh grid-pattern">
        <Header />
        <div className="min-h-screen flex items-center justify-center px-6 pt-20">
          <motion.div
            className="glass-card rounded-3xl p-8 w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-4"
                style={{
                  background: "linear-gradient(135deg, var(--accent-primary)20, var(--accent-secondary)20)",
                }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👨‍👩‍👧
              </motion.div>
              <h1
                className="text-3xl font-bold mb-2"
                style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
              >
                כניסת הורים
              </h1>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                התחבר כדי לנהל את הילדים שלך
              </p>
            </div>

            {/* Login form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  שם משתמש
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="הכנס שם משתמש..."
                  className="w-full px-4 py-3 rounded-xl text-base"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "2px solid var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  סיסמה
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="הכנס סיסמה (זהה לשם המשתמש)..."
                  className="w-full px-4 py-3 rounded-xl text-base"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "2px solid var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                  required
                />
              </div>

              <div
                className="p-3 rounded-xl text-sm"
                style={{ background: "var(--accent-warning)15", color: "var(--accent-warning)" }}
              >
                💡 טיפ: הסיסמה צריכה להיות זהה לשם המשתמש
              </div>

              <motion.button
                type="submit"
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
                התחבר
              </motion.button>
            </form>

            {/* Back link */}
            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-sm transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                ← חזרה לדף הבית
              </a>
            </div>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen gradient-mesh grid-pattern">
      <Header username={username} onLogout={handleLogout} />

      <div className="min-h-screen pt-28 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
            >
              שלום, {username}! 👋
            </h1>
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              כאן תוכל לנהל את הילדים שלך וליצור להם קישורים ללמידה
            </p>
          </motion.div>

          {/* Add child button */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.button
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                color: "white",
                fontFamily: "'Rubik', sans-serif",
                boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)",
              }}
              onClick={() => setShowAddModal(true)}
              whileHover={{ scale: 1.05, boxShadow: "0 6px 30px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              הוסף ילד חדש
            </motion.button>
          </motion.div>

          {/* Children grid */}
          {parent?.children && parent.children.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parent.children.map((child, index) => (
                <motion.div
                  key={child.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <ChildCard
                    child={child}
                    onEdit={() => {
                      setEditingChild(child);
                      setShowAddModal(true);
                    }}
                    onDelete={() => handleDeleteChild(child.id)}
                    onCopyLink={() => handleCopyLink(child.id)}
                  />
                  <AnimatePresence>
                    {copiedLink === child.id && (
                      <motion.div
                        className="mt-2 p-3 rounded-xl text-center text-sm"
                        style={{
                          background: "var(--accent-success)20",
                          color: "var(--accent-success)",
                        }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        ✓ הקישור הועתק!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="glass-card rounded-3xl p-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👶
              </motion.div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
              >
                אין עדיין ילדים
              </h3>
              <p className="text-base mb-6" style={{ color: "var(--text-muted)" }}>
                לחץ על הכפתור למעלה כדי להוסיף ילד ראשון
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Add/Edit child modal */}
      <AddChildModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingChild(null);
        }}
        onSave={handleAddChild}
        editChild={editingChild}
      />

      <Footer />
    </main>
  );
}
