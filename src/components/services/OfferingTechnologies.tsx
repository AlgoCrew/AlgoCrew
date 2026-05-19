"use client";
import styles from "./OfferingTechnologies.module.scss";

/* ---- Tech stack grouped by category ---- */
const TECH = [
  // Cloud
  { name: "AWS", icon: "☁️", color: "#FF9900" },
  { name: "Azure", icon: "⬡", color: "#0078D4" },
  { name: "GCP", icon: "◈", color: "#4285F4" },
  // DevOps
  { name: "Kubernetes", icon: "⎈", color: "#326CE5" },
  { name: "Docker", icon: "🐳", color: "#2496ED" },
  { name: "Terraform", icon: "◇", color: "#7B42BC" },
  { name: "Helm", icon: "⚙", color: "#0F1689" },
  // Backend
  { name: "Node.js", icon: "⬡", color: "#339933" },
  { name: "NestJS", icon: "⬡", color: "#E0234E" },
  { name: "FastAPI", icon: "⚡", color: "#009688" },
  { name: "GraphQL", icon: "◈", color: "#E10098" },
  { name: "Golang", icon: "◎", color: "#00ADD8" },
  // Frontend
  { name: "React", icon: "⚛", color: "#61DAFB" },
  { name: "Next.js", icon: "▲", color: "#FFFFFF" },
  { name: "TypeScript", icon: "TS", color: "#3178C6" },
  // Mobile
  { name: "Flutter", icon: "◈", color: "#02569B" },
  { name: "React Native", icon: "⚛", color: "#61DAFB" },
  { name: "Kotlin", icon: "K", color: "#7F52FF" },
  // Data
  { name: "PostgreSQL", icon: "🐘", color: "#4169E1" },
  { name: "Redis", icon: "◈", color: "#FF4438" },
  { name: "Elasticsearch", icon: "⬡", color: "#FEC514" },
];

/* Duplicate for seamless loop */
const ROW1 = [...TECH.slice(0, 11), ...TECH.slice(0, 11)];
const ROW2 = [...TECH.slice(11), ...TECH.slice(11)];

function TechPill({ t }: { t: typeof TECH[0] }) {
  return (
    <div className={styles.pill} style={{ "--c": t.color } as React.CSSProperties}>
      <span className={styles.pillIcon} aria-hidden="true">{t.icon}</span>
      <span className={styles.pillName}>{t.name}</span>
    </div>
  );
}

export function OfferingTechnologies() {
  return (
    <section className={styles.section} aria-label="Technologies we work with">
      <div className={styles.header}>
        <span className={styles.label}>TECH STACK</span>
        <h2 className={styles.heading}>
          Engineered with <span className={styles.accent}>Industry Leaders</span>
        </h2>
        <p className={styles.sub}>Crafted to evolve, scale, and remain secure over time</p>
      </div>

      <div className={styles.marqueeWrap}>
        {/* Row 1 — left to right */}
        <div className={styles.track}>
          {ROW1.map((t, i) => <TechPill key={i} t={t} />)}
        </div>
        {/* Row 2 — right to left */}
        <div className={`${styles.track} ${styles.trackReverse}`}>
          {ROW2.map((t, i) => <TechPill key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
}
