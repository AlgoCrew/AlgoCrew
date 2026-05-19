"use client";
import { useState } from "react";
import {
  SiAmazonwebservices,
  SiGooglecloud,
  SiKubernetes,
  SiDocker,
  SiTerraform,
  SiHelm,
  SiIstio,
  SiNodedotjs,
  SiNestjs,
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiKotlin,
  SiFastapi,
  SiGraphql,
  SiGo,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import styles from "./TechShowcase.module.scss";

const capabilities = [
  /* ── Cloud Infrastructure ── */
  { Icon: SiAmazonwebservices, title: "AWS",          category: "Cloud",    color: "#ff9900" },
  { Icon: VscAzure,            title: "Azure",        category: "Cloud",    color: "#0089d6" },
  { Icon: SiGooglecloud,       title: "GCP",          category: "Cloud",    color: "#4285f4" },

  /* ── Container & Orchestration ── */
  { Icon: SiKubernetes,        title: "Kubernetes",   category: "DevOps",   color: "#326ce5" },
  { Icon: SiDocker,            title: "Docker",       category: "DevOps",   color: "#2496ed" },
  { Icon: SiTerraform,         title: "Terraform",    category: "IaC",      color: "#7b42bc" },

  /* ── Platform & Mesh ── */
  { Icon: SiHelm,              title: "Helm",         category: "DevOps",   color: "#0f1689" },
  { Icon: SiIstio,             title: "Service Mesh", category: "Infra",    color: "#466bb0" },

  /* ── Backend & Runtimes ── */
  { Icon: SiNodedotjs,         title: "Node.js",      category: "Runtime",  color: "#339933" },
  { Icon: SiNestjs,            title: "Nest.js",      category: "Backend",  color: "#e0234e" },
  { Icon: SiGo,                title: "Golang",       category: "Backend",  color: "#00add8" },
  { Icon: SiFastapi,           title: "FastAPI",      category: "Backend",  color: "#009688" },

  /* ── Frontend & API ── */
  { Icon: SiReact,             title: "React",        category: "Frontend", color: "#61dafb" },
  { Icon: SiNextdotjs,         title: "Next.js",      category: "Framework",color: "#e2e8f0" },
  { Icon: SiGraphql,           title: "GraphQL",      category: "API",      color: "#e10098" },

  /* ── Mobile ── */
  { Icon: SiFlutter,           title: "Flutter",      category: "Mobile",   color: "#54c5f8" },
  { Icon: SiReact,             title: "React Native", category: "Mobile",   color: "#61dafb" },
  { Icon: SiKotlin,            title: "Kotlin",       category: "Mobile",   color: "#7f52ff" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Cloud":     "#ff9900",
  "DevOps":    "#2496ed",
  "IaC":       "#7b42bc",
  "Infra":     "#466bb0",
  "Runtime":   "#339933",
  "Backend":   "#00add8",
  "Frontend":  "#61dafb",
  "Framework": "#e2e8f0",
  "API":       "#e10098",
  "Mobile":    "#7f52ff",
};

export function TechShowcase() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Left sticky panel */}
        <div className={styles.left}>
          <span className={styles.label}>TECH STACK</span>
          <h2 className={styles.heading}>
            Built with<br />
            <span className={styles.accent}>industry-leading</span><br />
            technology.
          </h2>
          <p className={styles.desc}>
            We use the right tool for the job — modern, battle-tested, and
            chosen for performance and longevity.
          </p>

          {/* Category legend */}
          <div className={styles.legend}>
            {Object.entries(CATEGORY_COLORS).map(([cat, col]) => (
              <span key={cat} className={styles.legendItem} style={{ "--c": col } as React.CSSProperties}>
                <span className={styles.legendDot} />
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Tech grid */}
        <div className={styles.grid}>
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className={`${styles.card} ${hovered === i ? styles.cardActive : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ "--color": cap.color } as React.CSSProperties}
            >
              {/* Corner bracket decorators */}
              <span className={styles.bracketTL} aria-hidden="true" />
              <span className={styles.bracketBR} aria-hidden="true" />

              <span className={styles.cardIcon}>
                <cap.Icon size={26} aria-hidden="true" />
              </span>
              <span className={styles.cardTitle}>{cap.title}</span>
              <span
                className={styles.cardCategory}
                style={{ color: CATEGORY_COLORS[cap.category] ?? "var(--text-muted)" }}
              >
                {cap.category}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
