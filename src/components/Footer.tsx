"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer
      className="py-12 px-6"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and description */}
          <div className="text-center md:text-right">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                }}
              >
                <span className="text-lg">📚</span>
              </div>
              <span
                className="text-lg font-bold"
                style={{ fontFamily: "'Rubik', sans-serif", color: "var(--text-primary)" }}
              >
                לילמודוש
              </span>
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              20 דקות ביום כדי להישאר בקצב הנכון
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="/"
              className="text-sm transition-colors hover:text-[var(--accent-primary)]"
              style={{ color: "var(--text-secondary)" }}
            >
              דף הבית
            </a>
            <a
              href="/parent"
              className="text-sm transition-colors hover:text-[var(--accent-primary)]"
              style={{ color: "var(--text-secondary)" }}
            >
              אזור הורים
            </a>
          </div>

          {/* Made with love */}
          <motion.div
            className="flex items-center gap-2 text-sm"
            style={{ color: "var(--text-muted)" }}
            whileHover={{ scale: 1.05 }}
          >
            <span>נבנה עם</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ❤️
            </motion.span>
            <span>לילדים שלנו</span>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 text-center" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} לילמודוש. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
}
