"use client";
import { useEffect, useRef } from "react";
import styles from "./WorkHero.module.scss";

const stats = [
  { num: "9+", label: "Projects shipped" },
  { num: "12+", label: "Industry verticals" },
  { num: "8", label: "Countries" },
  { num: "0", label: "Critical incidents" },
];

export function WorkHero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(`.${styles.reveal}`);
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
        }
      }),
      { threshold: 0.1 }
    );
    els.forEach((el, i) => { el.style.transitionDelay = `${i * 80}ms`; obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <span className={`${styles.label} ${styles.reveal}`}>OUR WORK</span>
        <h1 className={`${styles.heading} ${styles.reveal}`}>
          Projects that{" "}
          <span className={styles.accent}>move industries.</span>
        </h1>
        <p className={`${styles.sub} ${styles.reveal}`}>
          From fintech infrastructure to AI-driven platforms — every engagement is
          a long-term commitment to quality, security, and outcomes that compound.
        </p>

        <div className={`${styles.statsRow} ${styles.reveal}`}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
