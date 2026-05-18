"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(`.${styles.step}`).forEach((step) => {
        gsap.fromTo(step,
          { opacity: 0, x: 60 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 80%", toggleActions: "play none none reverse" }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="process">
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.label}>HOW WE WORK</span>
          <h2 className={styles.heading}>
            Our<br />
            <span className={styles.accent}>Engineering</span><br />
            Cycle
          </h2>
          <p className={styles.leftDesc}>
            A systematic approach to solving complex problems through modular design and rapid deployment.
          </p>
          <div className={styles.stepIndicators}>
            {steps.map((s) => (
              <div key={s.num} className={styles.indicator}>
                <span className={styles.indicatorNum}>{s.num}</span>
                <span className={styles.indicatorTitle}>{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          {steps.map((step, i) => (
            <div key={step.num} className={styles.step}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNum}>{step.num}</span>
                <span className={styles.stepPhase}>{step.phase}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
              <ul className={styles.stepDetails}>
                {step.details.map(d => <li key={d}>{d}</li>)}
              </ul>
              {i < steps.length - 1 && <div className={styles.connector} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
