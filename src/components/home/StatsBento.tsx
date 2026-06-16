"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./StatsBento.module.scss";

/* ── animated counter ── */
function Counter({ to, duration = 1800 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(ease * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{val}</span>;
}

const stats = [
  {
    id: "delivery",
    size: "featured",
    num: 48,
    suffix: "hrs",
    label: "Brief to first commit",
    sub: "Fastest talent deployment in the industry, no cold sourcing, no delays.",
    accent: "#06c8e8",
    gradient: "linear-gradient(135deg, rgba(6,200,232,0.12) 0%, rgba(37,99,235,0.06) 100%)",
  },
  {
    id: "revenue",
    size: "tall",
    num: 50,
    suffix: "M+",
    prefix: "$",
    label: "Client revenue generated",
    sub: "Real business outcomes, not just shipped code.",
    accent: "#fbbf24",
    gradient: "linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(6,200,232,0.04) 100%)",
  },
  {
    id: "countries",
    size: "wide",
    num: 18,
    suffix: "+",
    label: "Countries we operate in",
    sub: "North America, EU, APAC and growing, follow-the-sun delivery.",
    accent: "#06c8e8",
    gradient: "linear-gradient(135deg, rgba(6,200,232,0.08) 0%, rgba(99,102,241,0.06) 100%)",
  },
  {
    id: "verticals",
    size: "medium",
    num: 12,
    suffix: "+",
    label: "Industry verticals",
    sub: "Fintech, health, cloud, AI & more.",
    accent: "#fb923c",
    gradient: "linear-gradient(135deg, rgba(251,146,60,0.1) 0%, rgba(6,200,232,0.04) 100%)",
  },
  {
    id: "sprints",
    size: "medium",
    num: 3,
    suffix: " days",
    label: "Avg. sprint ramp-up",
    sub: "Engineers in flow from day one.",
    accent: "#34d399",
    gradient: "linear-gradient(135deg, rgba(52,211,153,0.1) 0%, rgba(6,200,232,0.04) 100%)",
  },
  {
    id: "talent",
    size: "wide",
    num: 1,
    suffix: "%",
    prefix: "Top ",
    label: "Of applicants make our bench",
    sub: "5-stage vetting: code, design, culture, background & trial sprint.",
    accent: "#a78bfa",
    gradient: "linear-gradient(135deg, rgba(167,139,250,0.1) 0%, rgba(37,99,235,0.05) 100%)",
  },
];

export function StatsBento() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.label}>BY THE NUMBERS</span>
          <h2 className={styles.heading}>
            Impact you can<br />
            <span className={styles.accent}>measure.</span>
          </h2>
        </header>

        <div className={styles.bento}>
          {stats.map((s) => (
            <div
              key={s.id}
              className={`${styles.cell} ${styles[`cell_${s.size}`]}`}
              style={{
                "--accent": s.accent,
                "--gradient": s.gradient,
              } as React.CSSProperties}
            >
              {/* Background tint */}
              <div className={styles.cellBg} aria-hidden="true" />

              {/* Corner glow */}
              <div className={styles.cellGlow} aria-hidden="true" />

              <div className={styles.cellContent}>
                <div className={styles.numWrap}>
                  {s.prefix && <span className={styles.prefix}>{s.prefix}</span>}
                  <span className={styles.num}>
                    <Counter to={s.num} />
                  </span>
                  {s.suffix && <span className={styles.suffix}>{s.suffix}</span>}
                </div>
                <p className={styles.cellLabel}>{s.label}</p>
                {s.sub && <p className={styles.cellSub}>{s.sub}</p>}
              </div>

              {/* Bottom accent line */}
              <div className={styles.cellLine} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
