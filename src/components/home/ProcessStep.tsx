"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./ProcessStep.module.scss";

const steps = [
  {
    num: "01",
    title: "Discover",
    phase: "Understanding",
    desc: "Deep discovery sessions to understand your market, users, and technical landscape. We document everything, challenge assumptions, and align on a north star before writing a single line of code.",
    details: ["Stakeholder interviews", "Technical audit", "Competitive analysis", "Architecture planning"],
  },
  {
    num: "02",
    title: "Build",
    phase: "Execution",
    desc: "Precision engineering with full transparency. Weekly demos, real-time progress, and zero surprises. We ship in cycles so you see value from week one.",
    details: ["Agile sprints", "Daily standups", "CI/CD pipelines", "Code reviews"],
  },
  {
    num: "03",
    title: "Evolve",
    phase: "Growth",
    desc: "We don't disappear at launch. Continuous improvement, performance monitoring, and iterative enhancement based on real user data and market feedback.",
    details: ["Analytics integration", "A/B testing", "Performance monitoring", "Feature iteration"],
  },
];

export function ProcessSteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progressPct, setProgressPct] = useState(0);

  // Entrance animation for step cards
  useEffect(() => {
    const stepEls = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!stepEls.length) return;

    const observers = stepEls.map((el, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateX(0)";
            setActiveIdx(i);
            setProgressPct(((i + 1) / steps.length) * 100);
          }
        },
        { threshold: 0.45 }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="process">
      <div className={styles.inner}>

        {/* ---- Sticky left panel ---- */}
        <div className={styles.left}>
          {/* Glass card */}
          <div className={styles.glassCard}>
            <span className={styles.label}>HOW WE WORK</span>
            <h2 className={styles.heading}>
              Our<br />
              <span className={styles.accent}>Engineering</span><br />
              Cycle
            </h2>
            <p className={styles.leftDesc}>
              A systematic approach to solving complex problems through modular design and rapid deployment.
            </p>

            {/* Step nav with progress line */}
            <nav className={styles.stepNav} aria-label="Process steps">
              {/* Progress bar */}
              <div className={styles.progressTrack} aria-hidden="true">
                <div
                  className={styles.progressFill}
                  style={{ height: `${progressPct}%` }}
                />
              </div>

              {steps.map((s, i) => (
                <div
                  key={s.num}
                  className={`${styles.stepNavItem} ${i === activeIdx ? styles.stepNavActive : ""}`}
                >
                  <div className={styles.stepNavDot}>
                    {i === activeIdx ? (
                      <span className={styles.stepNavDotActive} aria-hidden="true" />
                    ) : (
                      <span className={styles.stepNavDotIdle} aria-hidden="true" />
                    )}
                  </div>
                  <div className={styles.stepNavContent}>
                    <span className={styles.stepNavNum}>{s.num}</span>
                    <span className={styles.stepNavTitle}>{s.title}</span>
                    <span className={styles.stepNavPhase}>{s.phase}</span>
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* ---- Right: step cards ---- */}
        <div className={styles.right}>
          {steps.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => { stepRefs.current[i] = el; }}
              className={`${styles.step} ${i === activeIdx ? styles.stepActive : ""}`}
            >
              <div className={styles.stepHeader}>
                <span className={styles.stepNum}>{step.num}</span>
                <span className={styles.stepPhase}>{step.phase}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
              <ul className={styles.stepDetails}>
                {step.details.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
