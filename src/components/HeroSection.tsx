"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MathPracticeDialog } from "./MathPracticeDialog";
import { GiftedInfoDialog } from "./GiftedInfoDialog";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const BookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const CalculatorIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="8" y2="10.01" />
    <line x1="12" y1="10" x2="12" y2="10.01" />
    <line x1="16" y1="10" x2="16" y2="10.01" />
    <line x1="8" y1="14" x2="8" y2="14.01" />
    <line x1="12" y1="14" x2="12" y2="14.01" />
    <line x1="16" y1="14" x2="16" y2="14.01" />
    <line x1="8" y1="18" x2="8" y2="18.01" />
    <line x1="12" y1="18" x2="12" y2="18.01" />
    <line x1="16" y1="18" x2="16" y2="18.01" />
  </svg>
);

const FlaskIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6v7l5 9a1 1 0 0 1-.9 1.4H4.9A1 1 0 0 1 4 19l5-9V3z" />
    <path d="M9 3h6" />
    <path d="M8 14h8" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ComingSoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const [isMathDialogOpen, setIsMathDialogOpen] = useState(false);
  const [isGiftedDialogOpen, setIsGiftedDialogOpen] = useState(false);

  const subjects = [
    { icon: <CalculatorIcon />, label: "חשבון", color: "var(--accent-math)", id: "math" },
    { icon: <BookIcon />, label: "עברית", color: "var(--accent-hebrew)", id: "hebrew" },
    { icon: <FlaskIcon />, label: "מדעים", color: "var(--accent-science)", id: "science", soon: true },
    { icon: <GlobeIcon />, label: "ידע כללי", color: "var(--accent-knowledge)", id: "knowledge", soon: true },
  ];

  const handleSubjectClick = (subjectId: string) => {
    if (subjectId === "math") {
      setIsMathDialogOpen(true);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh grid-pattern">
      {/* Floating gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
            right: "-10%",
            top: "10%",
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)",
            left: "-5%",
            bottom: "20%",
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
            left: "40%",
            top: "60%",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge - Clickable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <motion.button
            onClick={() => setIsGiftedDialogOpen(true)}
            className="group relative px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer border-0"
            style={{
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.15))",
              color: "#3b82f6",
              fontFamily: "'Assistant', sans-serif",
            }}
            whileHover={{
              scale: 1.05,
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(6, 182, 212, 0.25))",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>🌟</span>
              <span>
                הדרך האמיתית להשגים ועד תוכניות מצטיינים/מחוננים
              </span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ←
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))",
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
              }}
            />
          </motion.button>
        </motion.div>

        {/* Main title */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6"
          style={{
            fontFamily: "'Rubik', sans-serif",
            fontWeight: 800,
            lineHeight: 1.1,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span style={{ color: "var(--text-primary)" }}>חשבון, קריאה, הבנה </span>
          <span className="gradient-text">20 דק׳ ביום</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
          style={{
            fontFamily: "'Assistant', sans-serif",
            fontWeight: 400,
            color: "var(--text-secondary)",
            lineHeight: 1.8,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          מוודאים שהילדים שלנו עומדים בקצב הנכון.
          <br />
          <strong>מדרישות משרד החינוך</strong> ועד <strong>קבלה לתוכנית מחוננים</strong> - וכן, זה עניין של 20 דקות תרגול ביום.
        </motion.p>

        {/* Subject icons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {subjects.map((subject, i) => (
            <motion.button
              key={subject.label}
              className="glass-card rounded-2xl px-4 md:px-5 py-3 flex items-center gap-2 md:gap-3 card-lift cursor-pointer border-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSubjectClick(subject.id)}
            >
              <span style={{ color: subject.color }}>{subject.icon}</span>
              <span
                className="font-medium text-sm md:text-base"
                style={{ color: subject.color }}
              >
                {subject.label}
              </span>
              {subject.soon && (
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background: `${subject.color}18`,
                    color: subject.color,
                    border: `1px solid ${subject.color}40`,
                  }}
                  title="Coming Soon"
                  aria-label="Coming Soon"
                >
                  <ComingSoonIcon />
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.button
            className="group relative px-10 py-4 rounded-2xl text-lg font-semibold overflow-hidden flex items-center gap-3"
            style={{
              fontFamily: "'Rubik', sans-serif",
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              color: "white",
              boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)",
            }}
            onClick={onGetStarted}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">התחל עכשיו</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRightIcon />
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%", opacity: 0 }}
              whileHover={{ x: "100%", opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {[
            { value: "4", label: "תחומי יסוד" },
            { value: "20", label: "דקות ביום" },
            { value: "יעד", label: "מחוננים" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl md:text-4xl font-bold gradient-text mb-1"
                style={{ fontFamily: "'Rubik', sans-serif" }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-7 h-11 rounded-full flex items-start justify-center p-2"
            style={{ border: "2px solid var(--border-subtle)" }}
          >
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--accent-primary)" }}
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent, var(--border-subtle) 20%, var(--border-subtle) 80%, transparent)",
        }}
      />

      {/* Math Practice Dialog */}
      <MathPracticeDialog
        isOpen={isMathDialogOpen}
        onClose={() => setIsMathDialogOpen(false)}
      />

      {/* Gifted Info Dialog */}
      <GiftedInfoDialog
        isOpen={isGiftedDialogOpen}
        onClose={() => setIsGiftedDialogOpen(false)}
      />

    </section>
  );
}
