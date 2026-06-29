"use client";

import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllParents } from "@/lib/db";
import {
  getQuestionAnalytics,
  getQuestionAnalyticsSummary,
  QuestionAnalyticsSummary,
} from "@/lib/question-analytics";
import {
  getQuestionBank,
  resetQuestionBank,
  saveQuestionBank,
} from "@/lib/questions";
import {
  defaultQuestionSkillBySubject,
  getQuestionSkillLabel,
  getQuestionSkillsBySubject,
  isQuestionSkillForSubject,
  questionSkillOptions,
} from "@/lib/question-skills";
import { Child, Parent, Question, QuestionAnalyticsAttempt, QuestionSkill, QuestionType, Subject } from "@/types";

type AdminTab = "parents" | "children" | "problem-set";
type QuestionDraft = Omit<Question, "options"> & { optionsText: string };
type ProblemSetFilters = {
  subjects: Subject[];
  questionTypes: QuestionType[];
  skills: QuestionSkill[];
  difficultyScores: number[];
};
type FilterAnalyticsSummary = {
  questionsCount: number;
  attemptedQuestionsCount: number;
  unansweredQuestionsCount: number;
  attemptsCount: number;
  uniqueChildrenCount: number;
  solvedCount: number;
  solveRate: number;
  gradeBreakdown: FilterAnalyticsLine[];
  childPerformanceBreakdown: FilterAnalyticsLine[];
  subjectBreakdown: FilterAnalyticsLine[];
  questionTypeBreakdown: FilterAnalyticsLine[];
  difficultyBreakdown: FilterAnalyticsLine[];
  skillBreakdown: FilterAnalyticsLine[];
};
type FilterAnalyticsLine = {
  id: string;
  label: string;
  attemptsCount: number;
  uniqueChildrenCount: number;
  solvedCount: number;
  solveRate: number;
};
type DatabaseStatus = {
  configured: boolean;
  provider: string;
  url?: string;
  hasAnonKey?: boolean;
  hasBrowserKey?: boolean;
  hasSecretKey?: boolean;
  hasServiceRoleKey?: boolean;
  canInitializeSchema?: boolean;
};

const subjectOptions: { id: Subject; label: string; emoji: string; color: string }[] = [
  { id: "math", label: "חשבון", emoji: "🧮", color: "var(--accent-math)" },
  { id: "hebrew", label: "עברית", emoji: "📖", color: "var(--accent-hebrew)" },
  { id: "science", label: "מדעים", emoji: "🔬", color: "var(--accent-science)" },
  { id: "knowledge", label: "ידע כללי", emoji: "🌍", color: "var(--accent-knowledge)" },
];

const questionTypeOptions: { id: QuestionType; label: string }[] = [
  { id: "multiple_choice", label: "אמריקאית" },
  { id: "open_input", label: "פתוחה" },
];

const difficultyScoreOptions = Array.from({ length: 10 }, (_, index) => index + 1);

const emptyDraft: QuestionDraft = {
  id: "",
  subject: "math",
  type: "multiple_choice",
  skill: defaultQuestionSkillBySubject.math,
  difficultyScore: 2,
  question: "",
  optionsText: "",
  correctAnswer: "",
  explanation: "",
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("parents");
  const [parents, setParents] = useState<Parent[]>([]);
  const [questionBank, setQuestionBank] = useState<Record<Subject, Question[]> | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<ProblemSetFilters>({
    subjects: [],
    questionTypes: [],
    skills: [],
    difficultyScores: [],
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<QuestionDraft>(emptyDraft);
  const [analyticsAttempts, setAnalyticsAttempts] = useState<QuestionAnalyticsAttempt[]>([]);
  const [databaseStatus, setDatabaseStatus] = useState<DatabaseStatus | null>(null);
  const [databaseMessage, setDatabaseMessage] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setParents(getAllParents());
      setQuestionBank(getQuestionBank());
      setAnalyticsAttempts(getQuestionAnalytics());
      fetch("/api/admin/db/status")
        .then((response) => response.json() as Promise<DatabaseStatus>)
        .then(setDatabaseStatus)
        .catch(() => setDatabaseStatus({ configured: false, provider: "supabase" }));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const children = useMemo(() => {
    return parents.flatMap((parent) =>
      parent.children.map((child) => ({
        parentUsername: parent.username,
        child,
      }))
    );
  }, [parents]);

  const questions = useMemo(() => {
    if (!questionBank) return [];
    return Object.values(questionBank).flat();
  }, [questionBank]);

  const filteredQuestions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return questions.filter((question) => {
      const matchesSubject =
        filters.subjects.length === 0 || filters.subjects.includes(question.subject);
      const matchesQuestionType =
        filters.questionTypes.length === 0 || filters.questionTypes.includes(question.type);
      const matchesSkill = filters.skills.length === 0 || filters.skills.includes(question.skill);
      const matchesDifficulty =
        filters.difficultyScores.length === 0 ||
        filters.difficultyScores.includes(question.difficultyScore);
      const matchesSearch =
        normalizedSearch.length === 0 ||
        question.question.toLowerCase().includes(normalizedSearch) ||
        question.correctAnswer.toLowerCase().includes(normalizedSearch) ||
        question.id.toLowerCase().includes(normalizedSearch) ||
        getQuestionSkillLabel(question.skill).toLowerCase().includes(normalizedSearch);

      return matchesSubject && matchesQuestionType && matchesSkill && matchesDifficulty && matchesSearch;
    });
  }, [filters, questions, search]);

  const totalReports = children.reduce(
    (sum, item) => sum + (item.child.assessmentHistory?.length || 0),
    0
  );

  const startNewQuestion = () => {
    setEditingId(null);
    setDraft({
      ...emptyDraft,
      id: createQuestionId("math"),
    });
    setActiveTab("problem-set");
  };

  const startEditQuestion = (question: Question) => {
    setEditingId(question.id);
    setDraft({
      ...question,
      optionsText: question.options?.join("\n") || "",
      explanation: question.explanation || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(emptyDraft);
  };

  const saveQuestion = () => {
    if (!questionBank) return;
    if (!draft.question.trim() || !draft.correctAnswer.trim()) {
      window.alert("צריך להזין שאלה ותשובה נכונה.");
      return;
    }

    const options = draft.optionsText
      .split("\n")
      .map((option) => option.trim())
      .filter(Boolean);

    if (draft.type === "multiple_choice" && options.length < 2) {
      window.alert("בשאלה אמריקאית צריך להזין לפחות שתי אפשרויות תשובה.");
      return;
    }

    if (draft.type === "multiple_choice" && !options.includes(draft.correctAnswer.trim())) {
      window.alert("בשאלה אמריקאית התשובה הנכונה צריכה להופיע ברשימת האפשרויות.");
      return;
    }

    const nextQuestion: Question = {
      id: draft.id.trim() || createQuestionId(draft.subject),
      subject: draft.subject,
      type: draft.type,
      skill: isQuestionSkillForSubject(draft.skill, draft.subject)
        ? draft.skill
        : defaultQuestionSkillBySubject[draft.subject],
      difficultyScore: clampDifficultyScore(draft.difficultyScore),
      question: draft.question.trim(),
      options: draft.type === "multiple_choice" ? options : undefined,
      correctAnswer: draft.correctAnswer.trim(),
      explanation: draft.explanation?.trim() || undefined,
    };

    const nextBank: Record<Subject, Question[]> = {
      math: questionBank.math.filter((question) => question.id !== editingId && question.id !== nextQuestion.id),
      hebrew: questionBank.hebrew.filter((question) => question.id !== editingId && question.id !== nextQuestion.id),
      science: questionBank.science.filter((question) => question.id !== editingId && question.id !== nextQuestion.id),
      knowledge: questionBank.knowledge.filter((question) => question.id !== editingId && question.id !== nextQuestion.id),
    };

    nextBank[nextQuestion.subject] = [...nextBank[nextQuestion.subject], nextQuestion];
    saveQuestionBank(nextBank);
    setQuestionBank(nextBank);
    cancelEdit();
  };

  const deleteQuestion = (question: Question) => {
    if (!questionBank) return;
    if (!window.confirm(`למחוק את השאלה "${question.question}"?`)) return;

    const nextBank = {
      ...questionBank,
      [question.subject]: questionBank[question.subject].filter((item) => item.id !== question.id),
    };
    saveQuestionBank(nextBank);
    setQuestionBank(nextBank);
    if (editingId === question.id) {
      cancelEdit();
    }
  };

  const restoreDefaultQuestions = () => {
    if (!window.confirm("לאפס את מאגר השאלות לברירת המחדל? כל העריכות המקומיות יימחקו.")) return;
    setQuestionBank(resetQuestionBank());
    cancelEdit();
  };

  const initializeDatabase = async () => {
    setDatabaseMessage("מאתחל סכימה...");
    try {
      const response = await fetch("/api/admin/db/init", { method: "POST" });
      const data = (await response.json()) as {
        initialized?: boolean;
        statements?: number;
        error?: string;
      };
      if (!response.ok || !data.initialized) {
        setDatabaseMessage(data.error || "אתחול בסיס הנתונים נכשל.");
        return;
      }
      setDatabaseMessage(`סכימת בסיס הנתונים מוכנה (${data.statements || 0} פעולות).`);
    } catch {
      setDatabaseMessage("לא ניתן להתחבר לנתיב אתחול בסיס הנתונים.");
    }
  };

  return (
    <main className="relative min-h-screen gradient-mesh grid-pattern">
      <Header />

      <section className="min-h-screen pt-28 pb-12 px-6" dir="rtl">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-4"
              style={{ background: "var(--accent-primary)16", color: "var(--accent-primary)" }}
            >
              🛠️ Admin
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold mb-3"
              style={{ color: "var(--text-primary)", fontFamily: "'Rubik', sans-serif" }}
            >
              לוח ניהול
            </h1>
            <p className="text-lg max-w-3xl" style={{ color: "var(--text-secondary)" }}>
              צפייה בהורים וילדים, וניהול מאגר השאלות המקומי שמשמש את חידוני הילדים.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span
                className="px-3 py-2 rounded-xl text-sm font-semibold"
                style={{
                  background: databaseStatus?.configured
                    ? "rgba(16, 185, 129, 0.12)"
                    : "rgba(245, 158, 11, 0.12)",
                  color: databaseStatus?.configured ? "var(--accent-success)" : "#f59e0b",
                }}
              >
                Supabase: {databaseStatus?.configured ? "מוגדר לשרת" : "חסר מפתח"}
              </span>
              {databaseStatus && !databaseStatus.hasBrowserKey && (
                <span
                  className="px-3 py-2 rounded-xl text-sm"
                  style={{ background: "rgba(245, 158, 11, 0.12)", color: "#f59e0b" }}
                >
                  חסר מפתח דפדפן
                </span>
              )}
              <span
                className="px-3 py-2 rounded-xl text-sm"
                style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}
              >
                {databaseStatus?.url || "https://smyxacjbjdcbtiwkczxe.supabase.co"}
              </span>
              <button
                onClick={initializeDatabase}
                disabled={!databaseStatus?.canInitializeSchema}
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{
                  ...secondaryButtonStyle,
                  opacity: databaseStatus?.canInitializeSchema ? 1 : 0.55,
                  cursor: databaseStatus?.canInitializeSchema ? "pointer" : "not-allowed",
                }}
              >
                אתחל סכימת DB
              </button>
              {!databaseStatus?.canInitializeSchema && (
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                  להרצת סכימה מהכפתור צריך SUPABASE_DATABASE_URL, או להריץ את supabase/schema.sql ידנית.
                </span>
              )}
              {databaseMessage && (
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {databaseMessage}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <Metric label="הורים" value={parents.length.toString()} />
            <Metric label="ילדים" value={children.length.toString()} />
            <Metric label="שאלות" value={questions.length.toString()} />
            <Metric label="דוחות קצב" value={totalReports.toString()} />
            <Metric label="תשובות לשאלות" value={analyticsAttempts.length.toString()} />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <TabButton active={activeTab === "parents"} onClick={() => setActiveTab("parents")}>
              הורים
            </TabButton>
            <TabButton active={activeTab === "children"} onClick={() => setActiveTab("children")}>
              ילדים
            </TabButton>
            <TabButton active={activeTab === "problem-set"} onClick={() => setActiveTab("problem-set")}>
              Problem-set
            </TabButton>
          </div>

          {activeTab === "parents" && <ParentsView parents={parents} />}
          {activeTab === "children" && <ChildrenView kids={children} />}
          {activeTab === "problem-set" && (
            <ProblemSetView
              questions={filteredQuestions}
              totalQuestions={questions.length}
              analyticsAttempts={analyticsAttempts}
              search={search}
              filters={filters}
              draft={draft}
              editingId={editingId}
              onSearchChange={setSearch}
              onFiltersChange={setFilters}
              onDraftChange={setDraft}
              onNewQuestion={startNewQuestion}
              onEditQuestion={startEditQuestion}
              onDeleteQuestion={deleteQuestion}
              onSaveQuestion={saveQuestion}
              onCancelEdit={cancelEdit}
              onRestoreDefaults={restoreDefaultQuestions}
            />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card rounded-2xl p-4">
      <div className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
      <div className="text-3xl font-bold gradient-text" style={{ fontFamily: "'Rubik', sans-serif" }}>
        {value}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-3 rounded-2xl font-semibold transition-all"
      style={{
        background: active ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" : "var(--bg-elevated)",
        color: active ? "white" : "var(--text-secondary)",
        border: active ? "1px solid transparent" : "1px solid var(--border-subtle)",
        fontFamily: "'Rubik', sans-serif",
      }}
    >
      {children}
    </button>
  );
}

function ParentsView({ parents }: { parents: Parent[] }) {
  if (parents.length === 0) {
    return <EmptyState title="אין הורים עדיין" description="ברגע שהורה יתחבר דרך עמוד ההורים, הוא יופיע כאן." />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {parents.map((parent) => {
        const reports = parent.children.reduce((sum, child) => sum + (child.assessmentHistory?.length || 0), 0);
        return (
          <section key={parent.username} className="glass-card rounded-3xl p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)", fontFamily: "'Rubik', sans-serif" }}>
                  {parent.username}
                </h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  נוצר: {formatDate(parent.createdAt)}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm" style={{ background: "var(--accent-primary)16", color: "var(--accent-primary)" }}>
                {parent.children.length} ילדים
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SmallStat label="דוחות קצב" value={reports.toString()} />
              <SmallStat label="התקדמות ממוצעת" value={`${getParentAverageProgress(parent)}%`} />
            </div>
          </section>
        );
      })}
    </div>
  );
}

function ChildrenView({ kids }: { kids: { parentUsername: string; child: Child }[] }) {
  if (kids.length === 0) {
    return <EmptyState title="אין ילדים עדיין" description="ילדים שנוספו דרך דף ההורים יופיעו כאן." />;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {kids.map(({ parentUsername, child }) => {
        const latestReport = child.assessmentHistory?.[0] || null;
        return (
          <section key={child.id} className="glass-card rounded-3xl p-5">
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.16), rgba(6,182,212,0.14))" }}
              >
                {child.avatar}
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)", fontFamily: "'Rubik', sans-serif" }}>
                  {child.name}
                </h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  הורה: {parentUsername} · נוצר: {formatDate(child.createdAt)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {child.subjects.map((subject) => (
                <SmallStat
                  key={subject}
                  label={getSubjectLabel(subject)}
                  value={`${child.progress[subject] || 0}%`}
                />
              ))}
            </div>

            <div className="p-3 rounded-2xl" style={{ background: "var(--bg-elevated)" }}>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                דוח אחרון
              </div>
              <div className="font-semibold" style={{ color: "var(--text-primary)" }}>
                {latestReport
                  ? `${latestReport.overallStatus} · ${latestReport.averageScore}/100 · ${formatDate(latestReport.completedAt)}`
                  : "אין דוח קצב עדיין"}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

function ProblemSetView({
  questions,
  totalQuestions,
  analyticsAttempts,
  search,
  filters,
  draft,
  editingId,
  onSearchChange,
  onFiltersChange,
  onDraftChange,
  onNewQuestion,
  onEditQuestion,
  onDeleteQuestion,
  onSaveQuestion,
  onCancelEdit,
  onRestoreDefaults,
}: {
  questions: Question[];
  totalQuestions: number;
  analyticsAttempts: QuestionAnalyticsAttempt[];
  search: string;
  filters: ProblemSetFilters;
  draft: QuestionDraft;
  editingId: string | null;
  onSearchChange: (value: string) => void;
  onFiltersChange: (value: ProblemSetFilters) => void;
  onDraftChange: (value: QuestionDraft) => void;
  onNewQuestion: () => void;
  onEditQuestion: (question: Question) => void;
  onDeleteQuestion: (question: Question) => void;
  onSaveQuestion: () => void;
  onCancelEdit: () => void;
  onRestoreDefaults: () => void;
}) {
  const availableSkillOptions = questionSkillOptions.filter(
    (skill) => filters.subjects.length === 0 || filters.subjects.includes(skill.subject)
  );
  const filterAnalytics = useMemo(
    () => buildFilterAnalyticsSummary(questions, analyticsAttempts),
    [analyticsAttempts, questions]
  );
  const hasActiveFilters =
    filters.subjects.length > 0 ||
    filters.questionTypes.length > 0 ||
    filters.skills.length > 0 ||
    filters.difficultyScores.length > 0 ||
    search.trim().length > 0;

  const updateFilters = <Key extends keyof ProblemSetFilters>(
    key: Key,
    value: ProblemSetFilters[Key]
  ) => {
    const nextFilters = { ...filters, [key]: value };
    if (key === "subjects") {
      nextFilters.skills = nextFilters.skills.filter((skill) => {
        const option = questionSkillOptions.find((item) => item.id === skill);
        return option && (nextFilters.subjects.length === 0 || nextFilters.subjects.includes(option.subject));
      });
    }
    onFiltersChange(nextFilters);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6">
      <section className="glass-card rounded-3xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)", fontFamily: "'Rubik', sans-serif" }}>
              מאגר שאלות
            </h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              עריכה כאן נשמרת מקומית ומשפיעה על חידוני הילדים בדפדפן הזה.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={onNewQuestion} className="px-4 py-2 rounded-xl font-semibold" style={primaryButtonStyle}>
              הוסף שאלה
            </button>
            <button onClick={onRestoreDefaults} className="px-4 py-2 rounded-xl font-semibold" style={secondaryButtonStyle}>
              אפס לברירת מחדל
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-5">
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="חיפוש לפי שאלה, תשובה, מיומנות או ID..."
            className="px-4 py-3 rounded-xl"
            style={inputStyle}
          />
          <div className="p-4 rounded-2xl" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-bold" style={{ color: "var(--text-primary)", fontFamily: "'Rubik', sans-serif" }}>
                  סינון מתקדם
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {questions.length} מתוך {totalQuestions} שאלות מוצגות
                </p>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    onSearchChange("");
                    onFiltersChange({ subjects: [], questionTypes: [], skills: [], difficultyScores: [] });
                  }}
                  className="px-3 py-2 rounded-xl text-sm font-semibold"
                  style={secondaryButtonStyle}
                >
                  איפוס סינון
                </button>
              )}
            </div>
            <div className="space-y-4">
              <FilterGroup title="תחומים">
                <TogglePillGroup
                  options={subjectOptions.map((subject) => ({
                    id: subject.id,
                    label: `${subject.emoji} ${subject.label}`,
                  }))}
                  selected={filters.subjects}
                  onChange={(value) => updateFilters("subjects", value as Subject[])}
                />
              </FilterGroup>

              <FilterGroup title="סוג מענה">
                <TogglePillGroup
                  options={questionTypeOptions.map((type) => ({ id: type.id, label: type.label }))}
                  selected={filters.questionTypes}
                  onChange={(value) => updateFilters("questionTypes", value as QuestionType[])}
                />
              </FilterGroup>

              <FilterGroup title="דרגת קושי">
                <TogglePillGroup
                  options={difficultyScoreOptions.map((score) => ({ id: score.toString(), label: `${score}/10` }))}
                  selected={filters.difficultyScores.map(String)}
                  onChange={(value) => updateFilters("difficultyScores", value.map(Number))}
                />
              </FilterGroup>

              <FilterGroup title="מיומנויות">
                <TogglePillGroup
                  options={availableSkillOptions.map((skill) => ({
                    id: skill.id,
                    label: `${getSubjectLabel(skill.subject)} · ${skill.label}`,
                  }))}
                  selected={filters.skills}
                  onChange={(value) => updateFilters("skills", value)}
                />
              </FilterGroup>
            </div>
          </div>
          <FilterAnalyticsPanel summary={filterAnalytics} />
        </div>

        <div className="space-y-3">
          {questions.map((question) => (
            <QuestionRow
              key={question.id}
              question={question}
              analytics={getQuestionAnalyticsSummary(question, analyticsAttempts)}
              onEdit={() => onEditQuestion(question)}
              onDelete={() => onDeleteQuestion(question)}
            />
          ))}
          {questions.length === 0 && (
            <EmptyState title="לא נמצאו שאלות" description="נסה לשנות סינון או להוסיף שאלה חדשה." compact />
          )}
        </div>
      </section>

      <QuestionEditor
        draft={draft}
        editingId={editingId}
        onDraftChange={onDraftChange}
        onSave={onSaveQuestion}
        onCancel={onCancelEdit}
      />
    </div>
  );
}

function QuestionRow({
  question,
  analytics,
  onEdit,
  onDelete,
}: {
  question: Question;
  analytics: QuestionAnalyticsSummary;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const subject = subjectOptions.find((item) => item.id === question.subject);
  return (
    <article className="p-4 rounded-2xl" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2 py-1 rounded-lg text-xs" style={{ background: `${subject?.color || "var(--accent-primary)"}18`, color: subject?.color || "var(--accent-primary)" }}>
              {subject?.emoji} {subject?.label}
            </span>
            <span className="px-2 py-1 rounded-lg text-xs" style={{ background: "var(--bg-card)", color: "var(--text-muted)" }}>
              {getQuestionTypeLabel(question.type)}
            </span>
            <span className="px-2 py-1 rounded-lg text-xs" style={{ background: "var(--bg-card)", color: "var(--text-muted)" }}>
              {getQuestionSkillLabel(question.skill)}
            </span>
            <span className="px-2 py-1 rounded-lg text-xs" style={{ background: "var(--bg-card)", color: "var(--text-muted)" }}>
              קושי {question.difficultyScore}/10
            </span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {question.id}
            </span>
          </div>
          <h3 className="font-bold text-lg mb-2" style={{ color: "var(--text-primary)", fontFamily: "'Rubik', sans-serif" }}>
            {question.question}
          </h3>
          {question.options && question.options.length > 0 && (
            <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>
              אפשרויות: {question.options.join(" · ")}
            </p>
          )}
          <p className="text-sm" style={{ color: "var(--accent-success)" }}>
            תשובה: {question.correctAnswer}
          </p>
          {question.explanation && (
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              פתרון: {question.explanation}
            </p>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
            <SmallStat label="ילדים שניסו" value={analytics.uniqueChildrenCount.toString()} />
            <SmallStat label="תשובות" value={analytics.attemptsCount.toString()} />
            <SmallStat label="פתרו נכון" value={`${analytics.solvedCount} (${analytics.solveRate}%)`} />
            <SmallStat label="תשובה פופולרית" value={analytics.mostPopularAnswer || "אין עדיין"} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
            <AnalyticsPanel title="לפי כיתה">
              {analytics.gradeBreakdown.length > 0 ? (
                analytics.gradeBreakdown.map((grade) => (
                  <AnalyticsLine
                    key={grade.label}
                    label={grade.label}
                    value={`${grade.uniqueChildrenCount} ילדים · ${grade.solvedCount}/${grade.attemptsCount} נכון`}
                  />
                ))
              ) : (
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                  אין נתונים עדיין
                </span>
              )}
            </AnalyticsPanel>

            <AnalyticsPanel title="תשובות פופולריות">
              {analytics.answerBreakdown.length > 0 ? (
                analytics.answerBreakdown.slice(0, 4).map((answer) => (
                  <AnalyticsLine
                    key={answer.answer}
                    label={answer.answer}
                    value={`${answer.count} בחירות${answer.isCorrectAnswer ? " · נכונה" : ""}`}
                    highlight={answer.isCorrectAnswer}
                  />
                ))
              ) : (
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                  אין נתונים עדיין
                </span>
              )}
            </AnalyticsPanel>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={onEdit} className="px-3 py-2 rounded-xl text-sm font-semibold" style={secondaryButtonStyle}>
            ערוך
          </button>
          <button onClick={onDelete} className="px-3 py-2 rounded-xl text-sm font-semibold" style={dangerButtonStyle}>
            מחק
          </button>
        </div>
      </div>
    </article>
  );
}

function QuestionEditor({
  draft,
  editingId,
  onDraftChange,
  onSave,
  onCancel,
}: {
  draft: QuestionDraft;
  editingId: string | null;
  onDraftChange: (value: QuestionDraft) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <aside className="glass-card rounded-3xl p-5 xl:sticky xl:top-28 self-start">
      <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)", fontFamily: "'Rubik', sans-serif" }}>
        {editingId ? "עריכת שאלה" : "שאלה חדשה"}
      </h2>
      <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
        בחר סוג שאלה, רמת קושי 1-10, ואז הזן תשובה נכונה ופתרון.
      </p>

      <div className="space-y-3">
        <Field label="ID">
          <input
            value={draft.id}
            onChange={(event) => onDraftChange({ ...draft, id: event.target.value })}
            className="w-full px-4 py-3 rounded-xl"
            style={inputStyle}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="תחום">
            <select
              value={draft.subject}
              onChange={(event) => {
                const nextSubject = event.target.value as Subject;
                onDraftChange({
                  ...draft,
                  subject: nextSubject,
                  skill: isQuestionSkillForSubject(draft.skill, nextSubject)
                    ? draft.skill
                    : defaultQuestionSkillBySubject[nextSubject],
                });
              }}
              className="w-full px-4 py-3 rounded-xl"
              style={inputStyle}
            >
              {subjectOptions.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="סוג">
            <select
              value={draft.type}
              onChange={(event) => onDraftChange({ ...draft, type: event.target.value as QuestionType })}
              className="w-full px-4 py-3 rounded-xl"
              style={inputStyle}
            >
              {questionTypeOptions.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="מיומנות">
          <select
            value={draft.skill}
            onChange={(event) => onDraftChange({ ...draft, skill: event.target.value })}
            className="w-full px-4 py-3 rounded-xl"
            style={inputStyle}
          >
            {getQuestionSkillsBySubject(draft.subject).map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="רמת קושי">
          <select
            value={draft.difficultyScore}
            onChange={(event) =>
              onDraftChange({ ...draft, difficultyScore: Number(event.target.value) })
            }
            className="w-full px-4 py-3 rounded-xl"
            style={inputStyle}
          >
            {difficultyScoreOptions.map((score) => (
              <option key={score} value={score}>
                {score}/10
              </option>
            ))}
          </select>
        </Field>

        <Field label="שאלה">
          <textarea
            value={draft.question}
            onChange={(event) => onDraftChange({ ...draft, question: event.target.value })}
            className="w-full px-4 py-3 rounded-xl min-h-24"
            style={inputStyle}
          />
        </Field>

        <Field label={draft.type === "multiple_choice" ? "אפשרויות" : "אפשרויות (לא נדרש בשאלה פתוחה)"}>
          <textarea
            value={draft.optionsText}
            onChange={(event) => onDraftChange({ ...draft, optionsText: event.target.value })}
            className="w-full px-4 py-3 rounded-xl min-h-24"
            style={inputStyle}
            placeholder="אפשרות א׳&#10;אפשרות ב׳&#10;אפשרות ג׳"
            disabled={draft.type === "open_input"}
          />
        </Field>

        <Field label="תשובה נכונה">
          <input
            value={draft.correctAnswer}
            onChange={(event) => onDraftChange({ ...draft, correctAnswer: event.target.value })}
            className="w-full px-4 py-3 rounded-xl"
            style={inputStyle}
          />
        </Field>

        <Field label="פתרון / הסבר">
          <textarea
            value={draft.explanation || ""}
            onChange={(event) => onDraftChange({ ...draft, explanation: event.target.value })}
            className="w-full px-4 py-3 rounded-xl min-h-24"
            style={inputStyle}
          />
        </Field>

        <div className="flex gap-2 pt-2">
          <button onClick={onSave} className="flex-1 py-3 rounded-xl font-semibold" style={primaryButtonStyle}>
            שמור
          </button>
          <button onClick={onCancel} className="px-4 py-3 rounded-xl font-semibold" style={secondaryButtonStyle}>
            נקה
          </button>
        </div>
      </div>
    </aside>
  );
}

function FilterAnalyticsPanel({ summary }: { summary: FilterAnalyticsSummary }) {
  return (
    <div
      className="p-4 rounded-2xl"
      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-bold" style={{ color: "var(--text-primary)", fontFamily: "'Rubik', sans-serif" }}>
            אנליטיקה לפילטר הנוכחי
          </h3>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            הנתונים מחושבים רק על השאלות שמופיעות כרגע ברשימה.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-sm" style={{ background: "var(--bg-card)", color: "var(--text-muted)" }}>
          {summary.attemptedQuestionsCount}/{summary.questionsCount} שאלות נוסו
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 mb-4">
        <SmallStat label="שאלות בפילטר" value={summary.questionsCount.toString()} />
        <SmallStat label="ניסיונות" value={summary.attemptsCount.toString()} />
        <SmallStat label="ילדים שענו" value={summary.uniqueChildrenCount.toString()} />
        <SmallStat label="פתרו נכון" value={summary.solvedCount.toString()} />
        <SmallStat label="אחוז הצלחה" value={`${summary.solveRate}%`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <AnalyticsPanel title="איזה כיתות ענו">
          <AnalyticsLineList lines={summary.gradeBreakdown} emptyText="אין עדיין תשובות בפילטר הזה" />
        </AnalyticsPanel>

        <AnalyticsPanel title="סוג ילדים לפי ביצועים">
          <AnalyticsLineList lines={summary.childPerformanceBreakdown} emptyText="אין מספיק תשובות לסיווג ילדים" />
        </AnalyticsPanel>

        <AnalyticsPanel title="לפי תחום">
          <AnalyticsLineList lines={summary.subjectBreakdown} emptyText="אין עדיין תשובות לפי תחום" />
        </AnalyticsPanel>

        <AnalyticsPanel title="לפי סוג מענה">
          <AnalyticsLineList lines={summary.questionTypeBreakdown} emptyText="אין עדיין תשובות לפי סוג" />
        </AnalyticsPanel>

        <AnalyticsPanel title="לפי דרגת קושי">
          <AnalyticsLineList lines={summary.difficultyBreakdown} emptyText="אין עדיין תשובות לפי קושי" />
        </AnalyticsPanel>

        <AnalyticsPanel title="מיומנויות מובילות">
          <AnalyticsLineList lines={summary.skillBreakdown.slice(0, 8)} emptyText="אין עדיין תשובות לפי מיומנות" />
        </AnalyticsPanel>
      </div>

      {summary.unansweredQuestionsCount > 0 && (
        <p className="text-sm mt-4" style={{ color: "var(--text-muted)" }}>
          {summary.unansweredQuestionsCount} שאלות בפילטר עדיין לא קיבלו תשובה מאף ילד.
        </p>
      )}
    </div>
  );
}

function AnalyticsLineList({ lines, emptyText }: { lines: FilterAnalyticsLine[]; emptyText: string }) {
  if (lines.length === 0) {
    return (
      <span className="text-sm" style={{ color: "var(--text-muted)" }}>
        {emptyText}
      </span>
    );
  }

  return (
    <>
      {lines.map((line) => (
        <AnalyticsLine
          key={line.id}
          label={line.label}
          value={`${line.uniqueChildrenCount} ילדים · ${line.attemptsCount} תשובות · ${line.solveRate}%`}
          highlight={line.solveRate >= 80}
        />
      ))}
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function TogglePillGroup({
  options,
  selected,
  onChange,
}: {
  options: { id: string; label: string }[];
  selected: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = selected.includes(option.id);
        return (
          <button
            key={option.id}
            type="button"
            onClick={() =>
              onChange(active ? selected.filter((value) => value !== option.id) : [...selected, option.id])
            }
            className="px-3 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: active ? "var(--accent-primary)18" : "var(--bg-card)",
              border: active ? "1px solid var(--accent-primary)" : "1px solid var(--border-subtle)",
              color: active ? "var(--accent-primary)" : "var(--text-secondary)",
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}

function SmallStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-2xl" style={{ background: "var(--bg-elevated)" }}>
      <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
      <div className="font-bold" style={{ color: "var(--text-primary)", fontFamily: "'Rubik', sans-serif" }}>
        {value}
      </div>
    </div>
  );
}

function AnalyticsPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-3 rounded-2xl" style={{ background: "var(--bg-card)" }}>
      <div className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
        {title}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function AnalyticsLine({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="truncate" style={{ color: highlight ? "var(--accent-success)" : "var(--text-primary)" }}>
        {label}
      </span>
      <span className="shrink-0" style={{ color: "var(--text-muted)" }}>
        {value}
      </span>
    </div>
  );
}

function EmptyState({ title, description, compact = false }: { title: string; description: string; compact?: boolean }) {
  return (
    <div className={`glass-card rounded-3xl text-center ${compact ? "p-6" : "p-10"}`}>
      <div className="text-4xl mb-3">🧭</div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)", fontFamily: "'Rubik', sans-serif" }}>
        {title}
      </h2>
      <p style={{ color: "var(--text-secondary)" }}>{description}</p>
    </div>
  );
}

function createQuestionId(subject: Subject): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${subject}-${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${subject}-${Date.now()}`;
}

function getQuestionTypeLabel(type: QuestionType): string {
  return questionTypeOptions.find((item) => item.id === type)?.label || type;
}

function clampDifficultyScore(value: number): number {
  if (!Number.isFinite(value)) return 2;
  return Math.min(10, Math.max(1, Math.round(value)));
}

function buildFilterAnalyticsSummary(
  questions: Question[],
  attempts: QuestionAnalyticsAttempt[]
): FilterAnalyticsSummary {
  const questionsById = new Map(questions.map((question) => [question.id, question]));
  const questionIds = new Set(questions.map((question) => question.id));
  const relevantAttempts = attempts.filter((attempt) => questionIds.has(attempt.questionId));
  const attemptedQuestionIds = new Set(relevantAttempts.map((attempt) => attempt.questionId));
  const uniqueChildren = new Set(relevantAttempts.map((attempt) => attempt.childId));
  const solvedCount = relevantAttempts.filter((attempt) => attempt.isCorrect).length;

  return {
    questionsCount: questions.length,
    attemptedQuestionsCount: attemptedQuestionIds.size,
    unansweredQuestionsCount: Math.max(0, questions.length - attemptedQuestionIds.size),
    attemptsCount: relevantAttempts.length,
    uniqueChildrenCount: uniqueChildren.size,
    solvedCount,
    solveRate: getSolveRate(solvedCount, relevantAttempts.length),
    gradeBreakdown: buildAttemptBreakdown(relevantAttempts, (attempt) => ({
      id: attempt.grade?.toString() || "unknown",
      label: getGradeLabel(attempt.grade),
    })),
    childPerformanceBreakdown: buildChildPerformanceBreakdown(relevantAttempts),
    subjectBreakdown: buildAttemptBreakdown(relevantAttempts, (attempt) => {
      const subject = questionsById.get(attempt.questionId)?.subject || attempt.subject;
      return {
        id: subject,
        label: getSubjectLabel(subject),
      };
    }),
    questionTypeBreakdown: buildAttemptBreakdown(relevantAttempts, (attempt) => {
      const questionType = questionsById.get(attempt.questionId)?.type || attempt.questionType;
      return {
        id: questionType,
        label: getQuestionTypeLabel(questionType),
      };
    }),
    difficultyBreakdown: buildAttemptBreakdown(relevantAttempts, (attempt) => {
      const difficultyScore = questionsById.get(attempt.questionId)?.difficultyScore || attempt.difficultyScore;
      return {
        id: difficultyScore.toString(),
        label: `קושי ${difficultyScore}/10`,
      };
    }),
    skillBreakdown: buildAttemptBreakdown(relevantAttempts, (attempt) => {
      const skill = questionsById.get(attempt.questionId)?.skill || attempt.questionSkill;
      return {
        id: skill,
        label: getQuestionSkillLabel(skill),
      };
    }),
  };
}

function buildAttemptBreakdown(
  attempts: QuestionAnalyticsAttempt[],
  getGroup: (attempt: QuestionAnalyticsAttempt) => { id: string; label: string }
): FilterAnalyticsLine[] {
  const groups = new Map<string, { label: string; attempts: QuestionAnalyticsAttempt[] }>();

  attempts.forEach((attempt) => {
    const group = getGroup(attempt);
    const existing = groups.get(group.id) || { label: group.label, attempts: [] };
    existing.attempts.push(attempt);
    groups.set(group.id, existing);
  });

  return Array.from(groups.entries())
    .map(([id, group]) => buildAnalyticsLine(id, group.label, group.attempts))
    .sort((a, b) => b.attemptsCount - a.attemptsCount || b.solveRate - a.solveRate);
}

function buildChildPerformanceBreakdown(attempts: QuestionAnalyticsAttempt[]): FilterAnalyticsLine[] {
  const byChild = new Map<string, QuestionAnalyticsAttempt[]>();
  attempts.forEach((attempt) => {
    byChild.set(attempt.childId, [...(byChild.get(attempt.childId) || []), attempt]);
  });

  const buckets: Record<string, { label: string; attempts: QuestionAnalyticsAttempt[] }> = {
    strong: { label: "חזקים בפילטר", attempts: [] },
    steady: { label: "באמצע", attempts: [] },
    needs_work: { label: "צריכים חיזוק", attempts: [] },
  };

  byChild.forEach((childAttempts) => {
    const solved = childAttempts.filter((attempt) => attempt.isCorrect).length;
    const solveRate = getSolveRate(solved, childAttempts.length);
    if (solveRate >= 80) {
      buckets.strong.attempts.push(...childAttempts);
    } else if (solveRate >= 50) {
      buckets.steady.attempts.push(...childAttempts);
    } else {
      buckets.needs_work.attempts.push(...childAttempts);
    }
  });

  return Object.entries(buckets)
    .filter(([, bucket]) => bucket.attempts.length > 0)
    .map(([id, bucket]) => buildAnalyticsLine(id, bucket.label, bucket.attempts));
}

function buildAnalyticsLine(
  id: string,
  label: string,
  attempts: QuestionAnalyticsAttempt[]
): FilterAnalyticsLine {
  const solvedCount = attempts.filter((attempt) => attempt.isCorrect).length;
  return {
    id,
    label,
    attemptsCount: attempts.length,
    uniqueChildrenCount: new Set(attempts.map((attempt) => attempt.childId)).size,
    solvedCount,
    solveRate: getSolveRate(solvedCount, attempts.length),
  };
}

function getSolveRate(solvedCount: number, attemptsCount: number): number {
  return attemptsCount === 0 ? 0 : Math.round((solvedCount / attemptsCount) * 100);
}

function getGradeLabel(grade: 1 | 2 | 3 | null): string {
  if (grade === 1) return "כיתה א׳";
  if (grade === 2) return "כיתה ב׳";
  if (grade === 3) return "כיתה ג׳";
  return "לא ידוע";
}

function getSubjectLabel(subject: Subject): string {
  return subjectOptions.find((item) => item.id === subject)?.label || subject;
}

function getParentAverageProgress(parent: Parent): number {
  const values = parent.children.flatMap((child) => child.subjects.map((subject) => child.progress[subject] || 0));
  if (values.length === 0) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

const inputStyle = {
  background: "var(--bg-elevated)",
  border: "1px solid var(--border-subtle)",
  color: "var(--text-primary)",
};

const primaryButtonStyle = {
  background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  color: "white",
  fontFamily: "'Rubik', sans-serif",
};

const secondaryButtonStyle = {
  background: "var(--bg-elevated)",
  border: "1px solid var(--border-subtle)",
  color: "var(--text-secondary)",
  fontFamily: "'Rubik', sans-serif",
};

const dangerButtonStyle = {
  background: "rgba(239, 68, 68, 0.12)",
  border: "1px solid rgba(239, 68, 68, 0.24)",
  color: "var(--accent-error)",
  fontFamily: "'Rubik', sans-serif",
};
