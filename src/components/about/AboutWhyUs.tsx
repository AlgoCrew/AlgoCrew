"use client";
import { useEffect, useRef } from "react";
import {
  TbShieldCheck, TbUsers, TbRocket, TbBrain,
  TbCode, TbHeartHandshake,
} from "react-icons/tb";
import styles from "./AboutWhyUs.module.scss";

const reasons = [
  {
    Icon: TbBrain,
    title: "Senior-only bench",
    body: "Every engineer on your project has 6+ years of production experience. No juniors learning on your dime, ever.",
    accent: "#06c8e8",
  },
  {
    Icon: TbRocket,
    title: "48-hour ramp-up",
    body: "From signed contract to first commit in two days. We've engineered our onboarding to eliminate the typical 2–4 week delay.",
    accent: "#fbbf24",
  },
  {
    Icon: TbCode,
    title: "AI-first by default",
    body: "We don't bolt AI on, we architect for intelligence from day one. Every system is designed to learn and compound.",
    accent: "#a78bfa",
  },
  {
    Icon: TbShieldCheck,
    title: "Security baked in",
    body: "SOC 2 aligned, GDPR compliant, ISO 27001 aligned. Secure-by-design means no retrofitting after the fact.",
    accent: "#34d399",
  },
  {
    Icon: TbHeartHandshake,
    title: "100% IP transfer",
    body: "Everything we build is yours. Full source code, all credentials, zero lock-in. NDA on day one, no exceptions.",
    accent: "#fb923c",
  },
  {
    Icon: TbUsers,
    title: "Embedded, not outsourced",
    body: "We operate as your engineering team, daily standups, Slack, sprint demos. You lead; we execute with full ownership.",
    accent: "#06c8e8",
  },
];

export function AboutWhyUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(`.${styles.card}`);
    if (!cards) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 80}ms`;
      obs.observe(card);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.label}>WHY ALGOCREW</span>
          <h2 className={styles.heading}>
            Built different,<br />
            <span className={styles.accent}>by design.</span>
          </h2>
          <p className={styles.sub}>
            We made deliberate choices about how we hire, how we work, and what we never compromise on.
          </p>
        </header>

        <div className={styles.grid}>
          {reasons.map((r) => {
            const Icon = r.Icon;
            return (
              <div
                key={r.title}
                className={styles.card}
                style={{ "--accent": r.accent } as React.CSSProperties}
              >
                <div className={styles.iconWrap}>
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3 className={styles.cardTitle}>{r.title}</h3>
                <p className={styles.cardBody}>{r.body}</p>
                <div className={styles.cardLine} aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
