"use client";
import { useEffect, useRef } from "react";
import styles from "./AboutVision.module.scss";

const milestones = [
  { year: "2019", event: "Founded in Canada", detail: "Two engineers, one mission — elite software without the agency overhead." },
  { year: "2021", event: "First enterprise client", detail: "Scaled to a 6-figure fintech engagement. Zero critical incidents." },
  { year: "2022", event: "Went global", detail: "Expanded to EU and APAC. Follow-the-sun delivery across 18+ countries." },
  { year: "2023", event: "AI-first pivot", detail: "Restructured every practice around LLM integration and intelligence-native architecture." },
  { year: "2025", event: "Top 1% engineers", detail: "5-stage vetting. The most rigorous talent pipeline in the industry." },
  { year: "2026+", event: "What's next", detail: "Becoming the most trusted engineering partner for the next generation of category-defining companies.", highlight: true },
];

export function AboutVision() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll<HTMLElement>(`.${styles.item}`);
    if (!items) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateX(0)";
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el, i) => {
      el.style.transitionDelay = `${i * 90}ms`;
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          {/* Left — heading */}
          <div className={styles.leftCol}>
            <span className={styles.label}>OUR VISION</span>
            <h2 className={styles.heading}>
              Where we&apos;ve been.<br />
              <span className={styles.accent}>Where we&apos;re going.</span>
            </h2>
            <p className={styles.body}>
              Every chapter of AlgoCrew&apos;s story is built on the same conviction: elite engineering
              should be accessible to every ambitious company, not just the Fortune 500.
            </p>

            {/* Vision statement card */}
            <div className={styles.visionBox}>
              <span className={styles.visionQuote}>&ldquo;</span>
              <p className={styles.visionText}>
                To be the most trusted engineering partner for companies
                that are building the future — from first commit to global scale.
              </p>
            </div>
          </div>

          {/* Right — timeline */}
          <div className={styles.rightCol}>
            <div className={styles.timeline}>
              {milestones.map((m) => (
                <div
                  key={m.year}
                  className={`${styles.item} ${m.highlight ? styles.itemHighlight : ""}`}
                >
                  <div className={styles.dot} aria-hidden="true" />
                  <div className={styles.itemContent}>
                    <span className={styles.year}>{m.year}</span>
                    <p className={styles.event}>{m.event}</p>
                    <p className={styles.detail}>{m.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
