"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./careers.module.scss";

const openRoles = [
  { title: "Senior Full-Stack Engineer", dept: "Engineering", type: "Full-time", location: "Remote", stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"], exp: "5+ years", color: "#06c8e8" },
  { title: "DevOps / SRE Engineer",      dept: "Infrastructure", type: "Full-time", location: "Remote", stack: ["AWS", "Kubernetes", "Terraform", "CI/CD"],        exp: "4+ years", color: "#a78bfa" },
  { title: "AI / ML Engineer",           dept: "AI",          type: "Full-time", location: "Remote", stack: ["Python", "LangChain", "PyTorch", "FastAPI"],         exp: "3+ years", color: "#34d399" },
  { title: "UX / UI Designer",           dept: "Design",      type: "Full-time", location: "Remote", stack: ["Figma", "Framer", "Design Systems", "Prototyping"],  exp: "4+ years", color: "#f472b6" },
  { title: "Technical Project Manager",  dept: "Delivery",    type: "Full-time", location: "Remote", stack: ["Agile", "Jira", "Risk management", "Stakeholders"],  exp: "5+ years", color: "#fbbf24" },
  { title: "Backend Engineer (Go/Rust)", dept: "Engineering", type: "Contract",  location: "Remote", stack: ["Go", "Rust", "gRPC", "Kafka"],                       exp: "5+ years", color: "#06c8e8" },
  { title: "Mobile Engineer (React Native)", dept: "Engineering", type: "Full-time", location: "Remote", stack: ["React Native", "Expo", "Swift", "Kotlin"],       exp: "4+ years", color: "#06c8e8" },
  { title: "Cloud Security Architect",   dept: "Infrastructure", type: "Full-time", location: "Remote", stack: ["AWS", "GCP", "Zero-trust", "SOC 2"],              exp: "6+ years", color: "#a78bfa" },
];

const depts = ["All", "Engineering", "Infrastructure", "AI", "Design", "Delivery"];

export function RolesSection() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? openRoles : openRoles.filter(r => r.dept === active);

  return (
    <section className={styles.rolesSection}>
      <div className={styles.sectionInner}>
        <div className={styles.rolesHeader}>
          <div>
            <span className={styles.label}>OPEN POSITIONS</span>
            <h2 className={styles.sectionTitle}>Current openings</h2>
          </div>
          <div className={styles.deptFilter}>
            {depts.map(d => (
              <button key={d}
                className={`${styles.filterBtn} ${active === d ? styles.filterBtnActive : ""}`}
                onClick={() => setActive(d)}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.rolesGrid}>
          {filtered.map((r) => (
            <div key={r.title} className={styles.roleCard}
              style={{ "--accent": r.color } as React.CSSProperties}>
              <div className={styles.roleCardAccent} />
              <div className={styles.roleCardTop}>
                <span className={styles.roleDept} style={{ color: r.color,
                  background: `color-mix(in srgb, ${r.color} 10%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${r.color} 20%, transparent)` }}>
                  {r.dept}
                </span>
                <span className={`${styles.roleType} ${r.type === "Contract" ? styles.roleTypeContract : ""}`}>
                  {r.type}
                </span>
              </div>
              <h3 className={styles.roleCardTitle}>{r.title}</h3>
              <div className={styles.roleCardMeta}>
                <span>🌍 {r.location}</span>
                <span>⏱ {r.exp}</span>
              </div>
              <div className={styles.roleCardStack}>
                {r.stack.map(t => <span key={t} className={styles.roleTag}>{t}</span>)}
              </div>
              <Link href="/contact" className={styles.roleApply}
                style={{ background: `linear-gradient(135deg, ${r.color} 0%, #2563eb 100%)` }}>
                Apply now →
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.rolesFooter}>
          <div className={styles.openAppCard}>
            <div>
              <p className={styles.openAppTitle}>Don&apos;t see your role?</p>
              <p className={styles.openAppSub}>We hire on potential. Send us your best work and tell us what you&apos;d build.</p>
            </div>
            <Link href="/contact" className={styles.openApp}>Send an open application →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
