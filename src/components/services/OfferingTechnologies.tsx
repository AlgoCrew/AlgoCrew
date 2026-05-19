"use client";
import type { IconType } from "react-icons";
import {
  SiAmazonwebservices, SiGooglecloud,
  SiDocker, SiKubernetes, SiTerraform, SiHelm,
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiNestjs, SiFastapi, SiGraphql, SiGo,
  SiFlutter, SiKotlin,
  SiPostgresql, SiRedis,
  SiVercel, SiCloudflare, SiSupabase, SiOpenai, SiPrisma,
  SiFramer, SiBun, SiTurborepo,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import styles from "./OfferingTechnologies.module.scss";

type Tech = { name: string; Icon: IconType; color: string; category: string };

const TECH: Tech[] = [
  // Cloud / DevOps
  { name: "AWS",          Icon: SiAmazonwebservices, color: "#FF9900", category: "Cloud" },
  { name: "Azure",        Icon: VscAzure,             color: "#0078D4", category: "Cloud" },
  { name: "GCP",          Icon: SiGooglecloud,       color: "#4285F4", category: "Cloud" },
  { name: "Docker",       Icon: SiDocker,            color: "#2496ED", category: "DevOps" },
  { name: "Kubernetes",   Icon: SiKubernetes,        color: "#326CE5", category: "DevOps" },
  { name: "Terraform",    Icon: SiTerraform,         color: "#7B42BC", category: "DevOps" },
  { name: "Helm",         Icon: SiHelm,              color: "#0F1689", category: "DevOps" },
  { name: "Vercel",       Icon: SiVercel,            color: "#FFFFFF", category: "Infra" },
  { name: "Cloudflare",   Icon: SiCloudflare,        color: "#F48120", category: "Infra" },
  { name: "Supabase",     Icon: SiSupabase,          color: "#3ECF8E", category: "Infra" },
  // Backend / AI
  { name: "Node.js",      Icon: SiNodedotjs,         color: "#339933", category: "Backend" },
  { name: "NestJS",       Icon: SiNestjs,            color: "#E0234E", category: "Backend" },
  { name: "FastAPI",      Icon: SiFastapi,           color: "#009688", category: "Backend" },
  { name: "GraphQL",      Icon: SiGraphql,           color: "#E10098", category: "Backend" },
  { name: "Go",           Icon: SiGo,                color: "#00ADD8", category: "Backend" },
  { name: "OpenAI",       Icon: SiOpenai,            color: "#FFFFFF", category: "AI" },
  { name: "Prisma",       Icon: SiPrisma,            color: "#2D3748", category: "Backend" },
  // Frontend / Mobile
  { name: "React",        Icon: SiReact,             color: "#61DAFB", category: "Frontend" },
  { name: "Next.js",      Icon: SiNextdotjs,         color: "#FFFFFF", category: "Frontend" },
  { name: "TypeScript",   Icon: SiTypescript,        color: "#3178C6", category: "Frontend" },
  { name: "Tailwind",     Icon: SiTailwindcss,       color: "#06B6D4", category: "Frontend" },
  { name: "Framer",       Icon: SiFramer,            color: "#0055FF", category: "Frontend" },
  { name: "Flutter",      Icon: SiFlutter,           color: "#02569B", category: "Mobile" },
  { name: "Kotlin",       Icon: SiKotlin,            color: "#7F52FF", category: "Mobile" },
  // Data / Tooling
  { name: "PostgreSQL",   Icon: SiPostgresql,        color: "#4169E1", category: "Data" },
  { name: "Redis",        Icon: SiRedis,             color: "#FF4438", category: "Data" },
  { name: "Bun",          Icon: SiBun,               color: "#FBF0DF", category: "Tooling" },
  { name: "Turborepo",    Icon: SiTurborepo,         color: "#EF4444", category: "Tooling" },
];

/* Two rows — staggered start for visual interest */
const ROW1 = [...TECH.slice(0, 14), ...TECH.slice(0, 14)];
const ROW2 = [...TECH.slice(14), ...TECH.slice(14)];

function TechPill({ t }: { t: Tech }) {
  return (
    <div
      className={styles.pill}
      style={{ "--c": t.color } as React.CSSProperties}
      title={t.name}
    >
      <span className={styles.pillIconWrap}>
        <t.Icon className={styles.pillIcon} aria-hidden="true" />
      </span>
      <span className={styles.pillName}>{t.name}</span>
      <span className={styles.pillCategory}>{t.category}</span>
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
        <p className={styles.sub}>
          Crafted to evolve, scale, and remain secure over time
        </p>
      </div>

      <div className={styles.marqueeWrap}>
        {/* Row 1 → */}
        <div className={styles.trackOuter}>
          <div className={styles.track}>
            {ROW1.map((t, i) => <TechPill key={`r1-${i}`} t={t} />)}
          </div>
        </div>
        {/* Row 2 ← */}
        <div className={styles.trackOuter}>
          <div className={`${styles.track} ${styles.trackReverse}`}>
            {ROW2.map((t, i) => <TechPill key={`r2-${i}`} t={t} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
