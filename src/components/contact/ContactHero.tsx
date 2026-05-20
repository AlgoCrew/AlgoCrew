"use client";
import { useEffect, useRef } from "react";
import styles from "./ContactHero.module.scss";

export function ContactHero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(`.${styles.reveal}`);
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) (e.target as HTMLElement).style.opacity = "1",
          (e.target as HTMLElement).style.transform = "translateY(0)";
      }),
      { threshold: 0.1 }
    );
    els.forEach((el, i) => {
      el.style.transitionDelay = `${i * 80}ms`;
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className={styles.section}>
      {/* Background glow */}
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Badge */}
        <div className={`${styles.badge} ${styles.reveal}`}>
          <span className={styles.badgeDot} />
          Responding within 24 hours
        </div>

        <h1 className={`${styles.heading} ${styles.reveal}`}>
          Let&apos;s build something<br />
          <span className={styles.accent}>exceptional together.</span>
        </h1>

        <p className={`${styles.sub} ${styles.reveal}`}>
          Whether you need a dedicated engineering team, a single specialist, or strategic
          advice — we&apos;ll find the right fit fast.
        </p>

        {/* Quick trust row */}
        <div className={`${styles.trustRow} ${styles.reveal}`}>
          {[
            { num: "24h", label: "Response time" },
            { num: "48h", label: "First commit" },
            { num: "NDA", label: "Day one" },
            { num: "0", label: "Lock-in" },
          ].map((t) => (
            <div key={t.label} className={styles.trustItem}>
              <span className={styles.trustNum}>{t.num}</span>
              <span className={styles.trustLabel}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
