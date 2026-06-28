"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { ChildCard } from "@/components/ChildCard";
import { AddChildModal } from "@/components/AddChildModal";
import { Footer } from "@/components/Footer";
import { loginParent, getParent, addChild, updateChild, deleteChild } from "@/lib/db";
import { AssessmentHistoryEntry, Child, Parent } from "@/types";

export default function ParentPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [parent, setParent] = useState<Parent | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedUsername = localStorage.getItem("lilmodush_username");
      if (savedUsername) {
        const parentData = getParent(savedUsername);
        if (parentData) {
          setParent(parentData);
          setUsername(savedUsername);
          setIsLoggedIn(true);
        }
      }
    }, 0);

    return () => window.clearTimeout(timer);
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
    window.setTimeout(() => setCopiedLink(null), 2000);
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
              <Link
                href="/"
                className="text-sm transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                ← חזרה לדף הבית
              </Link>
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

          {parent?.children && parent.children.length > 0 && (
            <ReportHistoryPanel kids={parent.children} />
          )}

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

function ReportHistoryPanel({ kids }: { kids: Child[] }) {
  const reports = kids
    .flatMap((child) =>
      (child.assessmentHistory || []).map((report) => ({
        child,
        report,
      }))
    )
    .sort((a, b) => new Date(b.report.completedAt).getTime() - new Date(a.report.completedAt).getTime());

  const latest = reports[0] || null;
  const previousForLatestChild = latest
    ? [...(latest.child.assessmentHistory || [])]
        .filter((report) => report.id !== latest.report.id)
        .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())[0]
    : null;
  const scoreDelta = latest && previousForLatestChild
    ? latest.report.averageScore - previousForLatestChild.averageScore
    : null;

  return (
    <motion.section
      className="mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.16 }}
      dir="rtl"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-3"
            style={{ background: "var(--accent-primary)16", color: "var(--accent-primary)" }}
          >
            📊 דוחות הורים
          </div>
          <h2
            className="text-3xl font-bold"
            style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
          >
            היסטוריית מדד הקצב
          </h2>
          <p className="text-base mt-2" style={{ color: "var(--text-secondary)" }}>
            תמונת התקדמות לפי מבחני הקצב האדפטיביים שהילדים סיימו.
          </p>
        </div>
        <div className="text-sm" style={{ color: "var(--text-muted)" }}>
          {reports.length > 0 ? `${reports.length} דוחות שמורים` : "עדיין אין דוחות שמורים"}
        </div>
      </div>

      {latest ? (
        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
          <motion.div
            className="glass-card rounded-3xl p-6"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: "linear-gradient(135deg, rgba(16, 185, 129, 0.16), rgba(59, 130, 246, 0.14))" }}
                >
                  {latest.child.avatar}
                </div>
                <div>
                  <div className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>
                    הדוח האחרון · {formatReportDate(latest.report.completedAt)}
                  </div>
                  <h3
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
                  >
                    {latest.child.name} · {latest.report.overallStatus}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                    כיתה {latest.report.grade} · {getReadingSupportLabel(latest.report)}
                  </p>
                </div>
              </div>
              <StatusPill report={latest.report} />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              <MetricTile label="ציון כללי" value={`${latest.report.averageScore}/100`} detail="ממוצע תחומי" color="var(--accent-primary)" />
              <MetricTile label="מיקוד השבוע" value={latest.report.focus.shortLabel} detail={latest.report.focus.status} color={latest.report.focus.color} />
              <MetricTile label="תחום חזק" value={latest.report.strength.shortLabel} detail={latest.report.strength.status} color={latest.report.strength.color} />
              <MetricTile label="מגמה" value={formatScoreDelta(scoreDelta)} detail={scoreDelta === null ? "נדרש דוח נוסף" : "לעומת הדוח הקודם"} color={getDeltaColor(scoreDelta)} />
            </div>

            <div className="space-y-3">
              {latest.report.summaryLines.slice(0, 3).map((line) => (
                <p
                  key={line}
                  className="text-sm leading-relaxed p-3 rounded-2xl"
                  style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-5 p-4 rounded-2xl" style={{ background: "var(--bg-elevated)" }}>
              <div className="text-sm font-bold mb-3" style={{ color: "var(--text-primary)", fontFamily: "'Rubik', sans-serif" }}>
                תרגול מומלץ לימים הקרובים
              </div>
              <div className="grid gap-2">
                {latest.report.weeklyPlan.slice(0, 3).map((item) => (
                  <div key={`${latest.report.id}-${item.day}`} className="flex gap-3 text-sm">
                    <span
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0"
                      style={{ background: "var(--accent-primary)18", color: "var(--accent-primary)" }}
                    >
                      {item.day}
                    </span>
                    <span style={{ color: "var(--text-secondary)" }}>
                      <strong style={{ color: "var(--text-primary)" }}>{item.task}</strong> · {item.goal}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6">
            <div className="glass-card rounded-3xl p-6">
              <h3
                className="text-xl font-bold mb-4"
                style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
              >
                מצב לפי ילד
              </h3>
              <div className="space-y-3">
                {kids.map((child) => {
                  const childLatest = getLatestReport(child);
                  return (
                    <ChildReportRow key={child.id} child={child} report={childLatest} />
                  );
                })}
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6">
              <h3
                className="text-xl font-bold mb-4"
                style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
              >
                דוחות אחרונים
              </h3>
              <div className="space-y-3">
                {reports.slice(0, 5).map(({ child, report }) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-2xl"
                    style={{ background: "var(--bg-elevated)" }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl">{child.avatar}</span>
                      <div className="min-w-0">
                        <div className="font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                          {child.name} · {report.overallStatus}
                        </div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {formatReportDate(report.completedAt)} · {report.focus.shortLabel}: {report.focus.recommendation}
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-bold shrink-0" style={{ color: getStatusColor(report.overallStatus), fontFamily: "'Rubik', sans-serif" }}>
                      {report.averageScore}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-8 text-center">
          <div className="text-5xl mb-4">🧭</div>
          <h3
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
          >
            עדיין אין היסטוריית דוחות
          </h3>
          <p className="text-base max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            אחרי שילד יסיים בדיקת קצב בעמוד הילד, הדוח יישמר כאן עם סטטוס, מגמה, תחום חזק ותוכנית תרגול.
          </p>
        </div>
      )}
    </motion.section>
  );
}

function MetricTile({ label, value, detail, color }: { label: string; value: string; detail: string; color: string }) {
  return (
    <div className="p-4 rounded-2xl" style={{ background: "var(--bg-elevated)" }}>
      <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
      <div className="text-xl font-bold truncate" style={{ color, fontFamily: "'Rubik', sans-serif" }}>
        {value}
      </div>
      <div className="text-xs mt-1 truncate" style={{ color: "var(--text-muted)" }}>
        {detail}
      </div>
    </div>
  );
}

function StatusPill({ report }: { report: AssessmentHistoryEntry }) {
  return (
    <div
      className="px-4 py-2 rounded-full text-sm font-semibold shrink-0"
      style={{ background: `${getStatusColor(report.overallStatus)}20`, color: getStatusColor(report.overallStatus) }}
    >
      {report.confidence} ביטחון · {report.answeredCount} תשובות
    </div>
  );
}

function ChildReportRow({ child, report }: { child: Child; report: AssessmentHistoryEntry | null }) {
  return (
    <div className="p-3 rounded-2xl" style={{ background: "var(--bg-elevated)" }}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl">{child.avatar}</span>
          <div className="min-w-0">
            <div className="font-semibold truncate" style={{ color: "var(--text-primary)" }}>
              {child.name}
            </div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>
              {report ? `${formatReportDate(report.completedAt)} · ${report.focus.shortLabel}` : "אין דוח עדיין"}
            </div>
          </div>
        </div>
        {report ? (
          <div className="text-left shrink-0">
            <div className="font-bold" style={{ color: getStatusColor(report.overallStatus), fontFamily: "'Rubik', sans-serif" }}>
              {report.overallStatus}
            </div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>
              {report.averageScore}/100
            </div>
          </div>
        ) : (
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            ממתין לבדיקה
          </span>
        )}
      </div>
    </div>
  );
}

function getLatestReport(child: Child): AssessmentHistoryEntry | null {
  const history = child.assessmentHistory || [];
  if (history.length === 0) return null;
  return [...history].sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())[0];
}

function formatReportDate(value: string): string {
  return new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getReadingSupportLabel(report: AssessmentHistoryEntry): string {
  return report.readingSupport === "without_nikud" ? "ללא ניקוד" : "עם ניקוד";
}

function formatScoreDelta(delta: number | null): string {
  if (delta === null) return "חדש";
  if (delta === 0) return "ללא שינוי";
  return `${delta > 0 ? "+" : ""}${delta}`;
}

function getDeltaColor(delta: number | null): string {
  if (delta === null || delta === 0) return "var(--text-muted)";
  return delta > 0 ? "var(--accent-success)" : "var(--accent-warning)";
}

function getStatusColor(status: AssessmentHistoryEntry["overallStatus"]): string {
  const colors: Record<AssessmentHistoryEntry["overallStatus"], string> = {
    "מחוננים": "var(--accent-knowledge)",
    "מעל הקצב": "var(--accent-success)",
    "בקצב": "var(--accent-primary)",
    "כמעט בקצב": "var(--accent-warning)",
    "צריך חיזוק": "var(--accent-error)",
  };
  return colors[status];
}
