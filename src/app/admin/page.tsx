"use client";

import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllParents } from "@/lib/db";
import {
  getQuestionBank,
  resetQuestionBank,
  saveQuestionBank,
} from "@/lib/questions";
import { Child, Parent, Question, Subject } from "@/types";

type AdminTab = "parents" | "children" | "problem-set";
type QuestionDraft = Omit<Question, "options"> & { optionsText: string };

const subjectOptions: { id: Subject; label: string; emoji: string; color: string }[] = [
  { id: "math", label: "חשבון", emoji: "🧮", color: "var(--accent-math)" },
  { id: "hebrew", label: "עברית", emoji: "📖", color: "var(--accent-hebrew)" },
  { id: "science", label: "מדעים", emoji: "🔬", color: "var(--accent-science)" },
  { id: "knowledge", label: "ידע כללי", emoji: "🌍", color: "var(--accent-knowledge)" },
];

const difficultyOptions: Question["difficulty"][] = ["easy", "medium", "hard"];

const emptyDraft: QuestionDraft = {
  id: "",
  subject: "math",
  difficulty: "easy",
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
  const [subjectFilter, setSubjectFilter] = useState<Subject | "all">("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<QuestionDraft>(emptyDraft);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setParents(getAllParents());
      setQuestionBank(getQuestionBank());
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
      const matchesSubject = subjectFilter === "all" || question.subject === subjectFilter;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        question.question.toLowerCase().includes(normalizedSearch) ||
        question.correctAnswer.toLowerCase().includes(normalizedSearch) ||
        question.id.toLowerCase().includes(normalizedSearch);

      return matchesSubject && matchesSearch;
    });
  }, [questions, search, subjectFilter]);

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
    const nextQuestion: Question = {
      id: draft.id.trim() || createQuestionId(draft.subject),
      subject: draft.subject,
      difficulty: draft.difficulty,
      question: draft.question.trim(),
      options: options.length > 0 ? options : undefined,
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
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Metric label="הורים" value={parents.length.toString()} />
            <Metric label="ילדים" value={children.length.toString()} />
            <Metric label="שאלות" value={questions.length.toString()} />
            <Metric label="דוחות קצב" value={totalReports.toString()} />
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
              search={search}
              subjectFilter={subjectFilter}
              draft={draft}
              editingId={editingId}
              onSearchChange={setSearch}
              onSubjectFilterChange={setSubjectFilter}
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
  search,
  subjectFilter,
  draft,
  editingId,
  onSearchChange,
  onSubjectFilterChange,
  onDraftChange,
  onNewQuestion,
  onEditQuestion,
  onDeleteQuestion,
  onSaveQuestion,
  onCancelEdit,
  onRestoreDefaults,
}: {
  questions: Question[];
  search: string;
  subjectFilter: Subject | "all";
  draft: QuestionDraft;
  editingId: string | null;
  onSearchChange: (value: string) => void;
  onSubjectFilterChange: (value: Subject | "all") => void;
  onDraftChange: (value: QuestionDraft) => void;
  onNewQuestion: () => void;
  onEditQuestion: (question: Question) => void;
  onDeleteQuestion: (question: Question) => void;
  onSaveQuestion: () => void;
  onCancelEdit: () => void;
  onRestoreDefaults: () => void;
}) {
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

        <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-3 mb-5">
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="חיפוש לפי שאלה, תשובה או ID..."
            className="px-4 py-3 rounded-xl"
            style={inputStyle}
          />
          <select
            value={subjectFilter}
            onChange={(event) => onSubjectFilterChange(event.target.value as Subject | "all")}
            className="px-4 py-3 rounded-xl"
            style={inputStyle}
          >
            <option value="all">כל התחומים</option>
            {subjectOptions.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          {questions.map((question) => (
            <QuestionRow
              key={question.id}
              question={question}
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
  onEdit,
  onDelete,
}: {
  question: Question;
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
              {question.difficulty}
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
        אפשרויות תשובה נכתבות בשורות נפרדות. אם משאירים ריק, זו שאלה פתוחה.
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
              onChange={(event) => onDraftChange({ ...draft, subject: event.target.value as Subject })}
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
          <Field label="רמה">
            <select
              value={draft.difficulty}
              onChange={(event) => onDraftChange({ ...draft, difficulty: event.target.value as Question["difficulty"] })}
              className="w-full px-4 py-3 rounded-xl"
              style={inputStyle}
            >
              {difficultyOptions.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="שאלה">
          <textarea
            value={draft.question}
            onChange={(event) => onDraftChange({ ...draft, question: event.target.value })}
            className="w-full px-4 py-3 rounded-xl min-h-24"
            style={inputStyle}
          />
        </Field>

        <Field label="אפשרויות">
          <textarea
            value={draft.optionsText}
            onChange={(event) => onDraftChange({ ...draft, optionsText: event.target.value })}
            className="w-full px-4 py-3 rounded-xl min-h-24"
            style={inputStyle}
            placeholder="אפשרות א׳&#10;אפשרות ב׳&#10;אפשרות ג׳"
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
