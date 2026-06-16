"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./WhyChooseUs.module.scss";

const features = [
  { title: "Global Reach",     tag: "North America & EU", desc: "Strategically headquartered in Canada with a global network of elite engineers." },
  { title: "Speed to Market",  tag: "48hr Matching",      desc: "Deploy world-class talent in days, not months. From brief to kickoff in 48 hours." },
  { title: "Top 1% Talent",    tag: "Vetted Quality",     desc: "A rigorous 5-stage vetting process for both technical mastery and soft skills." },
  { title: "AI-First",         tag: "Future-Proof",       desc: "Integrating LLMs and modern cloud infrastructure into every workflow." },
  { title: "Security First",   tag: "Enterprise-Grade",   desc: "Built with SOC 2-aligned practices and secure-by-design architecture." },
];

export function WhyChooseUs() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [visibleRows, setVisibleRows] = useState<boolean[]>(features.map(() => false));

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!rows.length) return;

    const observers = rows.map((row, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIdx(i);
            setVisibleRows(prev => { const next = [...prev]; next[i] = true; return next; });
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(row);
      return obs;
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className={styles.section} id="why">
      <div className={styles.inner}>

        {/* ---- Left sticky ---- */}
        <div className={styles.left}>
          <span className={styles.label}>THE ALGOCREW EDGE</span>
          <h2 className={styles.statement}>
            Why top<br />
            companies<br />
            <span className={styles.accent}>trust us.</span>
          </h2>
          <p className={styles.sub}>
            We blend engineering excellence with business strategy to deliver measurable impact.
          </p>

          <div className={styles.stat}>
            <span className={styles.statNum}>98%</span>
            <span className={styles.statLabel}>Client satisfaction rate</span>
          </div>
        </div>

        {/* ---- Right feature list ---- */}
        <div className={styles.right}>
          {features.map((f, i) => (
            <div
              key={i}
              ref={(el) => { rowRefs.current[i] = el; }}
              className={`${styles.row} ${styles.rowActive} ${styles.rowVisible}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={styles.rowAccent} aria-hidden="true" />
              <div className={styles.rowInner}>
                <div className={styles.rowHead}>
                  <span className={styles.rowTag}>{f.tag}</span>
                  <h3 className={styles.rowTitle}>{f.title}</h3>
                </div>
                <p className={styles.rowDesc}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
