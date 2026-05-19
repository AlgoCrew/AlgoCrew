"use client";
import { useState } from "react";
import styles from "./TechShowcase.module.scss";

const capabilities = [
  { icon: "⚡", title: "React / Next.js", category: "Frontend", color: "#61dafb" },
  { icon: "🔷", title: "TypeScript", category: "Language", color: "#3178c6" },
  { icon: "☁️", title: "AWS / GCP", category: "Cloud", color: "#ff9900" },
  { icon: "🐳", title: "Docker / K8s", category: "DevOps", color: "#2496ed" },
  { icon: "🤖", title: "LLM / AI APIs", category: "AI", color: "#00cccc" },
  { icon: "🗄️", title: "PostgreSQL", category: "Database", color: "#336791" },
  { icon: "📱", title: "React Native", category: "Mobile", color: "#61dafb" },
  { icon: "🔒", title: "Cybersecurity", category: "Security", color: "#7c3aed" },
  { icon: "📊", title: "Data Pipelines", category: "Data", color: "#f59e0b" },
];

export function TechShowcase() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.label}>TECH STACK</span>
          <h2 className={styles.heading}>
            Built with<br />
            <span className={styles.accent}>industry-leading</span><br />
            technology.
          </h2>
          <p className={styles.desc}>
            We use the right tool for the job — modern, battle-tested, and chosen for performance and longevity.
          </p>
        </div>

        <div className={styles.grid}>
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className={`${styles.card} ${hovered === i ? styles.cardActive : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ "--color": cap.color } as React.CSSProperties}
            >
              <span className={styles.cardIcon}>{cap.icon}</span>
              <span className={styles.cardTitle}>{cap.title}</span>
              <span className={styles.cardCategory}>{cap.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
