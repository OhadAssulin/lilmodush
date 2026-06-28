"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AdaptiveGrade,
  AdaptiveItem,
  AdaptiveReadingSupport,
  AdaptiveSession,
  buildAssessmentHistoryEntry,
  buildAssessmentProgress,
  buildAdaptiveReport,
  buildParentReport,
  createAdaptiveSession,
  formatAssessmentText,
  getNextAdaptiveItem,
  getOverallStatus,
  isAdaptiveSessionComplete,
  levelLabels,
  recordAdaptiveAnswer,
} from "@/lib/adaptive-assessment";
import { AssessmentHistoryEntry } from "@/types";

interface AdaptiveAssessmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAssessmentComplete?: (entry: AssessmentHistoryEntry) => void;
}

type AssessmentStep = "intro" | "question" | "result";

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ResetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
    <path d="M21 3v6h-6" />
  </svg>
);

export function AdaptiveAssessmentDialog({ isOpen, onClose, onAssessmentComplete }: AdaptiveAssessmentDialogProps) {
  const [step, setStep] = useState<AssessmentStep>("intro");
  const [session, setSession] = useState<AdaptiveSession | null>(null);
  const [currentItem, setCurrentItem] = useState<AdaptiveItem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [lastResult, setLastResult] = useState<"correct" | "incorrect" | null>(null);
  const [questionStartedAt, setQuestionStartedAt] = useState(0);

  const reports = useMemo(() => (session ? buildAdaptiveReport(session) : []), [session]);
  const parentReport = useMemo(
    () => (session && reports.length > 0 ? buildParentReport(session, reports) : null),
    [session, reports]
  );
  const progress = useMemo(
    () => (session ? buildAssessmentProgress(session, currentItem) : null),
    [session, currentItem]
  );
  const overallStatus = reports.length > 0 ? getOverallStatus(reports) : "כמעט בקצב";
  const answeredCount = session?.answers.length || 0;

  const handleClose = () => {
    setStep("intro");
    setSession(null);
    setCurrentItem(null);
    setSelectedAnswer("");
    setLastResult(null);
    setQuestionStartedAt(0);
    onClose();
  };

  const startAssessment = (
    grade: AdaptiveGrade,
    readingSupport: AdaptiveReadingSupport = "with_nikud",
    startedAt = 0
  ) => {
    const nextSession = createAdaptiveSession(grade, readingSupport);
    setSession(nextSession);
    setCurrentItem(getNextAdaptiveItem(nextSession));
    setSelectedAnswer("");
    setLastResult(null);
    setQuestionStartedAt(startedAt);
    setStep("question");
  };

  const submitAnswer = (answer: string, answeredAt = 0) => {
    if (!session || !currentItem || !answer.trim()) return;

    const responseTimeMs = questionStartedAt > 0 && answeredAt > 0 ? Math.max(0, answeredAt - questionStartedAt) : 0;
    const nextSession = recordAdaptiveAnswer(session, currentItem, answer, responseTimeMs);
    const wasCorrect = nextSession.answers[nextSession.answers.length - 1]?.isCorrect;
    const nextItem = getNextAdaptiveItem(nextSession);

    setSession(nextSession);
    setLastResult(wasCorrect ? "correct" : "incorrect");
    setSelectedAnswer("");

    window.setTimeout(() => {
      if (isAdaptiveSessionComplete(nextSession) || !nextItem) {
        const completedReports = buildAdaptiveReport(nextSession);
        const completedParentReport = buildParentReport(nextSession, completedReports);
        onAssessmentComplete?.(
          buildAssessmentHistoryEntry(nextSession, completedReports, completedParentReport)
        );
        setCurrentItem(null);
        setStep("result");
      } else {
        setCurrentItem(nextItem);
        setLastResult(null);
        setQuestionStartedAt(answeredAt > 0 ? answeredAt + 650 : 0);
      }
    }, 650);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submitAnswer(selectedAnswer, event.timeStamp);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="adaptive-assessment-backdrop"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      />

      <motion.div
        key="adaptive-assessment-modal"
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        dir="rtl"
      >
        <motion.div
          className="glass-card rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col"
          initial={{ scale: 0.94, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.94, y: 20 }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-[var(--border-subtle)]">
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-[var(--bg-card-hover)]"
              style={{ border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
              aria-label="סגור"
            >
              <CloseIcon />
            </button>
            <div className="text-center">
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
              >
                בדיקת קצב אדפטיבית
              </h2>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                מיפוי קצר לכיתה א׳-ג׳, כולל רמות מצוינות ומחוננים
              </p>
            </div>
            <div className="w-10 h-10" />
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {step === "intro" && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className="p-5 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(6, 182, 212, 0.1))",
                    border: "1px solid rgba(59, 130, 246, 0.22)",
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
                  >
                    המבחן מחפש את נקודת הגבול הנוכחית
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    מתחילים ברמה נוחה, עולים אחרי הצלחות, ועוצרים תחום אחרי שתי טעויות באותה רמה.
                    הילד רואה חוויה קצרה ונעימה; ההורה מקבל דוח עם סטטוס, רמת שליטה ותרגול לשבוע הקרוב.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: "7", label: "צירי מדידה" },
                    { value: "28", label: "שאלות לכל היותר" },
                    { value: "3", label: "תרגולים בדוח" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-4 rounded-2xl text-center"
                      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                    >
                      <div className="text-3xl font-bold gradient-text" style={{ fontFamily: "'Rubik', sans-serif" }}>
                        {item.value}
                      </div>
                      <div className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                    באיזו כיתה הילד כרגע?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div
                      className="p-4 rounded-2xl"
                      style={{
                        background: "var(--bg-elevated)",
                        border: "2px solid var(--border-subtle)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <motion.button
                        onClick={(event) => startAssessment(1, "with_nikud", event.timeStamp)}
                        className="w-full text-right"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-3xl block mb-2">🎒</span>
                        <span className="text-xl font-bold block" style={{ fontFamily: "'Rubik', sans-serif" }}>
                          כיתה א׳
                        </span>
                        <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                          נתחיל סביב מיומנויות סוף א׳
                        </span>
                      </motion.button>
                    </div>

                    <div
                      className="p-4 rounded-2xl space-y-3"
                      style={{
                        background: "var(--bg-elevated)",
                        border: "2px solid var(--border-subtle)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <motion.button
                        onClick={(event) => startAssessment(2, "with_nikud", event.timeStamp)}
                        className="w-full text-right"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-3xl block mb-2">📚</span>
                        <span className="text-xl font-bold block" style={{ fontFamily: "'Rubik', sans-serif" }}>
                          כיתה ב׳
                        </span>
                        <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                          נתחיל סביב מיומנויות אמצע ב׳
                        </span>
                      </motion.button>
                      <button
                        type="button"
                        onClick={(event) => startAssessment(2, "without_nikud", event.timeStamp)}
                        className="w-full py-2 px-3 rounded-xl text-sm font-semibold"
                        style={{
                          background: "var(--bg-card)",
                          border: "1px solid var(--border-subtle)",
                          color: "var(--accent-primary)",
                          fontFamily: "'Rubik', sans-serif",
                        }}
                      >
                        אין צורך בניקוד
                      </button>
                    </div>

                    <div
                      className="p-4 rounded-2xl space-y-3"
                      style={{
                        background: "var(--bg-elevated)",
                        border: "2px solid var(--border-subtle)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <motion.button
                        onClick={(event) => startAssessment(3, "with_nikud", event.timeStamp)}
                        className="w-full text-right"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-3xl block mb-2">🧭</span>
                        <span className="text-xl font-bold block" style={{ fontFamily: "'Rubik', sans-serif" }}>
                          כיתה ג׳
                        </span>
                        <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                          נתחיל סביב סוף ג׳ ונעלה למצוינות
                        </span>
                      </motion.button>
                      <button
                        type="button"
                        onClick={(event) => startAssessment(3, "without_nikud", event.timeStamp)}
                        className="w-full py-2 px-3 rounded-xl text-sm font-semibold"
                        style={{
                          background: "var(--bg-card)",
                          border: "1px solid var(--border-subtle)",
                          color: "var(--accent-primary)",
                          fontFamily: "'Rubik', sans-serif",
                        }}
                      >
                        אין צורך בניקוד
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  זה כלי מיפוי ותרגול להורים. הוא אינו אבחון קליני, אינו מחליף מורה או מאבחן,
                  ואינו מבטיח קבלה לתוכנית מחוננים.
                </p>
              </motion.div>
            )}

            {step === "question" && currentItem && session && (
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {progress && (
                  <div
                    className="p-4 rounded-2xl space-y-3"
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                  >
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                        התקדמות המיפוי
                      </span>
                      <span style={{ color: "var(--text-muted)" }}>
                        {progress.answeredCount}/{progress.maxQuestions} שאלות · {progress.completedDomains}/{progress.totalDomains} תחומים הושלמו
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-card)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, var(--accent-primary), var(--accent-hebrew))" }}
                        initial={false}
                        animate={{ width: `${progress.progressPercent}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div>
                        <div style={{ color: "var(--text-muted)" }}>תחום נוכחי</div>
                        <strong style={{ color: "var(--text-primary)" }}>{progress.currentDomainLabel}</strong>
                      </div>
                      <div>
                        <div style={{ color: "var(--text-muted)" }}>רמה עכשיו</div>
                        <strong style={{ color: "var(--text-primary)" }}>{progress.currentLevelLabel}</strong>
                      </div>
                      <div>
                        <div style={{ color: "var(--text-muted)" }}>עצמאות קריאה</div>
                        <strong style={{ color: "var(--text-primary)" }}>{progress.readingIndependence}</strong>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {progress.nextSignal}
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>
                      שאלה {answeredCount + 1} מתוך עד 28
                    </div>
                    <div
                      className="text-lg font-semibold"
                      style={{ color: "var(--text-primary)", fontFamily: "'Rubik', sans-serif" }}
                    >
                      {formatAssessmentText(currentItem.skill, session.readingSupport)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-3 py-1 rounded-full text-sm"
                      style={{ background: "var(--accent-primary)20", color: "var(--accent-primary)" }}
                    >
                      רמה {currentItem.level} · {levelLabels[currentItem.level]}
                    </span>
                  </div>
                </div>

                <div
                  className="p-6 rounded-3xl text-center"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                >
                  <h3
                    className="text-2xl md:text-3xl font-bold leading-relaxed"
                    style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
                  >
                    {formatAssessmentText(currentItem.prompt, session.readingSupport)}
                  </h3>
                </div>

                {currentItem.type === "multiple_choice" ? (
                  <div className="grid gap-3">
                    {currentItem.options?.map((option, index) => (
                      <motion.button
                        key={`${currentItem.id}-${index}`}
                        onClick={(event) => submitAnswer(option, event.timeStamp)}
                        className="w-full p-4 rounded-2xl flex items-center gap-4 text-lg font-medium"
                        style={{
                          background: "var(--bg-elevated)",
                          border: "2px solid var(--border-subtle)",
                          color: "var(--text-primary)",
                          fontFamily: "'Assistant', sans-serif",
                        }}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                        whileHover={{ scale: 1.01, borderColor: "var(--accent-primary)" }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <span
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                          style={{ background: "var(--accent-primary)20", color: "var(--accent-primary)" }}
                        >
                          {String.fromCharCode(1488 + index)}
                        </span>
                        <span className="flex-1 text-right">
                          {formatAssessmentText(option, session.readingSupport)}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={selectedAnswer}
                      onChange={(event) => setSelectedAnswer(event.target.value)}
                      onKeyDown={handleInputKeyDown}
                      placeholder="הקלד תשובה..."
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
                      onClick={(event) => submitAnswer(selectedAnswer, event.timeStamp)}
                      disabled={!selectedAnswer.trim()}
                      className="w-full py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2"
                      style={{
                        background: selectedAnswer.trim()
                          ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                          : "var(--bg-elevated)",
                        color: selectedAnswer.trim() ? "white" : "var(--text-muted)",
                        fontFamily: "'Rubik', sans-serif",
                      }}
                      whileHover={selectedAnswer.trim() ? { scale: 1.01 } : {}}
                      whileTap={selectedAnswer.trim() ? { scale: 0.99 } : {}}
                    >
                      <CheckIcon />
                      בדוק תשובה
                    </motion.button>
                  </div>
                )}

                <AnimatePresence>
                  {lastResult && (
                    <motion.div
                      className="p-4 rounded-2xl text-center"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      style={{
                        background: lastResult === "correct" ? "rgba(16, 185, 129, 0.14)" : "rgba(245, 158, 11, 0.14)",
                        border: `1px solid ${lastResult === "correct" ? "var(--accent-success)" : "var(--accent-warning)"}`,
                        color: lastResult === "correct" ? "var(--accent-success)" : "var(--accent-warning)",
                      }}
                    >
                      {lastResult === "correct" ? "מעולה, נעלה או נייצב את הרמה." : "בסדר גמור, ננסה משהו מתאים יותר."}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {step === "result" && session && parentReport && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div
                  className="p-6 rounded-3xl text-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(59, 130, 246, 0.1))",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div className="text-5xl mb-3">📊</div>
                  <div className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
                    {parentReport.title} · {parentReport.monthLabel}
                  </div>
                  <h3
                    className="text-3xl font-bold mb-2"
                    style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
                  >
                    סטטוס כללי: {overallStatus}
                  </h3>
                  <p className="text-base" style={{ color: "var(--text-secondary)" }}>
                    זו תמונת מצב ראשונית לפי {session.answers.length} תשובות. הדוח נועד לכוון תרגול, לא לתת אבחון.
                  </p>
                  {session.readingSupport === "without_nikud" && (
                    <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
                      הבדיקה בוצעה ללא ניקוד. תחומי הקריאה והשפה חושבו כרמת קושי גבוהה יותר.
                    </p>
                  )}
                </div>

                <div
                  className="p-5 rounded-2xl"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                >
                  <h4
                    className="text-xl font-bold mb-3"
                    style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
                  >
                    סיכום להורה
                  </h4>
                  <div className="space-y-2">
                    {parentReport.summaryLines.map((line) => (
                      <p key={line} className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {parentReport.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="p-4 rounded-2xl"
                      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                    >
                      <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
                        {metric.label}
                      </div>
                      <div className="text-xl font-bold" style={{ color: "var(--text-primary)", fontFamily: "'Rubik', sans-serif" }}>
                        {metric.value}
                      </div>
                      <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {metric.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3">
                  {reports.map((report) => (
                    <div
                      key={report.domain.id}
                      className="p-4 rounded-2xl"
                      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{report.domain.emoji}</span>
                          <div>
                            <h4
                              className="font-bold text-lg"
                              style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
                            >
                              {report.domain.label}
                            </h4>
                            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                              {report.correctCount}/{report.answeredCount} נכונות · ציון {report.skillScore}/100 · ביטחון {report.confidence}
                            </p>
                          </div>
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{ background: `${report.domain.color}20`, color: report.domain.color }}
                        >
                          {report.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span style={{ color: "var(--text-muted)" }}>רמת שליטה מחושבת: </span>
                          <strong style={{ color: "var(--text-primary)" }}>
                            {report.adjustedLevel} · {levelLabels[report.adjustedLevel]}
                          </strong>
                          {report.adjustedLevel !== report.stableLevel && (
                            <span style={{ color: "var(--text-muted)" }}>
                              {" "}
                              (נמדד {report.stableLevel} ללא ניקוד)
                            </span>
                          )}
                        </div>
                        <div>
                          <span style={{ color: "var(--text-muted)" }}>נקודת גבול: </span>
                          <strong style={{ color: "var(--text-primary)" }}>
                            {report.boundaryLevel === null ? "לא זוהתה עדיין" : `${report.boundaryLevel} · ${levelLabels[report.boundaryLevel]}`}
                          </strong>
                        </div>
                        <div>
                          <span style={{ color: "var(--text-muted)" }}>תמיכה בקריאה: </span>
                          <strong style={{ color: "var(--text-primary)" }}>{report.supportProfile}</strong>
                        </div>
                        <div>
                          <span style={{ color: "var(--text-muted)" }}>זמן ממוצע: </span>
                          <strong style={{ color: "var(--text-primary)" }}>
                            {report.avgResponseSeconds === null ? "לא נמדד" : `${report.avgResponseSeconds} שניות`}
                          </strong>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                        {[
                          { label: "רמת מיומנות", value: report.levelScore },
                          { label: "דיוק ברמה האחרונה", value: report.lastLevelAccuracy },
                          { label: "יעילות/שטף", value: report.fluencyScore },
                        ].map((scorePart) => (
                          <div key={scorePart.label} className="text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span style={{ color: "var(--text-muted)" }}>{scorePart.label}</span>
                              <strong style={{ color: "var(--text-primary)" }}>{scorePart.value}</strong>
                            </div>
                            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-card)" }}>
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${scorePart.value}%`, background: report.domain.color }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="text-sm leading-relaxed mt-3" style={{ color: "var(--text-secondary)" }}>
                        {report.interpretation}
                      </p>
                      <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                        {report.stopText}
                      </p>

                      <div className="mt-3 p-3 rounded-xl" style={{ background: "var(--bg-card)" }}>
                        <span className="text-sm font-semibold" style={{ color: report.domain.color }}>
                          לתרגל השבוע:{" "}
                        </span>
                        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                          {report.recommendation}
                        </span>
                        {report.supportNote && (
                          <div className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                            {report.supportNote}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="p-5 rounded-2xl"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                >
                  <h4
                    className="text-xl font-bold mb-3"
                    style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
                  >
                    תוכנית 7 דקות ביום — השבוע הקרוב
                  </h4>
                  <div className="grid gap-2">
                    {parentReport.weeklyPlan.map((item) => (
                      <div
                        key={item.day}
                        className="grid grid-cols-[44px_1fr] gap-3 p-3 rounded-xl"
                        style={{ background: "var(--bg-card)" }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                          style={{ background: "var(--accent-primary)20", color: "var(--accent-primary)" }}
                        >
                          {item.day}
                        </div>
                        <div>
                          <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                            {item.task}
                          </div>
                          <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                            {item.goal}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={() => setStep("intro")}
                    className="flex-1 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2"
                    style={{
                      background: "var(--bg-elevated)",
                      border: "2px solid var(--border-subtle)",
                      color: "var(--text-primary)",
                      fontFamily: "'Rubik', sans-serif",
                    }}
                    whileHover={{ scale: 1.02, borderColor: "var(--accent-primary)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ResetIcon />
                    בדיקה חדשה
                  </motion.button>
                  <motion.button
                    onClick={handleClose}
                    className="flex-1 py-4 rounded-2xl font-semibold text-lg"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                      color: "white",
                      fontFamily: "'Rubik', sans-serif",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    סגור דוח
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
