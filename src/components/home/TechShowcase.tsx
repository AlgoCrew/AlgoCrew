"use client";
import { useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiAmazonwebservices,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
} from "react-icons/si";
import { FaBrain } from "react-icons/fa";
import styles from "./TechShowcase.module.scss";

const capabilities = [
  { Icon: SiReact,             title: "React",       category: "Frontend",  color: "#61dafb" },
  { Icon: SiNextdotjs,         title: "Next.js",     category: "Framework", color: "#ffffff" },
  { Icon: SiTypescript,        title: "TypeScript",  category: "Language",  color: "#3178c6" },
  { Icon: SiNodedotjs,         title: "Node.js",     category: "Runtime",   color: "#339933" },
  { Icon: SiTailwindcss,       title: "Tailwind",    category: "Styling",   color: "#06b6d4" },
  { Icon: SiAmazonwebservices, title: "AWS",          category: "Cloud",     color: "#ff9900" },
  { Icon: SiDocker,            title: "Docker",      category: "DevOps",    color: "#2496ed" },
  { Icon: SiKubernetes,        title: "Kubernetes",  category: "DevOps",    color: "#326ce5" },
  { Icon: SiPostgresql,        title: "PostgreSQL",  category: "Database",  color: "#336791" },
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
              <span className={styles.cardIcon}>
                <cap.Icon size={28} />
              </span>
              <span className={styles.cardTitle}>{cap.title}</span>
              <span className={styles.cardCategory}>{cap.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
