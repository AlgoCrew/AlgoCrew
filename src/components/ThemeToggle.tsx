"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@once-ui-system/core";
import styles from "./ThemeToggle.module.scss";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.getAttribute("data-theme") !== "light");
  }, []);

  useEffect(() => {
    setIsDark(document.documentElement.getAttribute("data-theme") !== "light");
  }, [theme]);

  if (!mounted) {
    // Render a placeholder of same size to prevent layout shift
    return <div className={styles.placeholder} aria-hidden="true" />;
  }

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      className={styles.toggle}
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <span className={`${styles.icon} ${styles.sun} ${!isDark ? styles.active : ""}`} aria-hidden="true">
        {/* Sun */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="4"/>
          <line x1="12" y1="2" x2="12" y2="5"/>
          <line x1="12" y1="19" x2="12" y2="22"/>
          <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
          <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
          <line x1="2" y1="12" x2="5" y2="12"/>
          <line x1="19" y1="12" x2="22" y2="12"/>
          <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
          <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
        </svg>
      </span>
      <span className={`${styles.icon} ${styles.moon} ${isDark ? styles.active : ""}`} aria-hidden="true">
        {/* Moon */}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </span>
    </button>
  );
};
