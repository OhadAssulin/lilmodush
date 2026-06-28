"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

interface HeaderProps {
  showLogin?: boolean;
  username?: string;
  onLogout?: () => void;
}

const BookOpenIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const LogOutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export function Header({ showLogin = false, username, onLogout }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled ? "var(--bg-base)" : "transparent",
        borderBottom: isScrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
      }}
    >
      <div className="relative max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <motion.a
          href="/"
          className="flex items-center gap-3 group"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <div className="relative w-10 h-10">
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
              }}
            />
            <div
              className="absolute inset-[2px] rounded-[10px] flex items-center justify-center"
              style={{ background: "var(--bg-base)", color: "#3b82f6" }}
            >
              <BookOpenIcon />
            </div>
          </div>

          <span
            className="text-xl font-bold tracking-tight group-hover:text-[var(--accent-primary)] transition-colors"
            style={{
              fontFamily: "'Rubik', sans-serif",
              color: "var(--text-primary)",
            }}
          >
            לילמודוש
          </span>
        </motion.a>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {username && (
            <div className="flex items-center gap-3">
              <span
                className="hidden sm:flex items-center gap-2 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <UserIcon />
                {username}
              </span>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-[var(--bg-card)]"
                  style={{
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <LogOutIcon />
                  <span className="hidden sm:inline">התנתק</span>
                </button>
              )}
            </div>
          )}

          {showLogin && !username && (
            <a
              href="/parent"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                color: "white",
                boxShadow: "0 4px 14px rgba(59, 130, 246, 0.35)",
              }}
            >
              <UserIcon />
              כניסת הורים
            </a>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-[var(--bg-card)]"
            style={{
              border: "1px solid var(--border-subtle)",
              color: "var(--text-secondary)"
            }}
            aria-label="החלף ערכת נושא"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </motion.div>
      </div>
    </header>
  );
}
