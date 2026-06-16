export const dynamic = "force-static";

import { Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { categorizedServices } from "@/resources";
import Link from "next/link";
import styles from "./Services.module.scss";
import AnimatedTestimonials from "@/components/home/Testimonals";
import { ProcessSteps } from "@/components/home/ProcessStep";
import { FAQ } from "@/components/home/FAQ";
import { SendUsEmail } from "@/components/home/SendUsEmail";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: "Services - AlgoCrew",
      description: "From staff augmentation to AI solutions, explore our full range of digital services.",
      baseURL,
      path: "/services",
      image: `/api/og/generate?title=${encodeURIComponent("Services - AlgoCrew")}`,
    }),
    alternates: { canonical: "/services" },
  };
}

const accentColors: Record<string, string> = {
  "web-app-development":  "#06c8e8",
  "cloud-devops":         "#a78bfa",
  "e-commerce":           "#f472b6",
  "security-quality":     "#ef4444",
  "data-automation":      "#34d399",
  "microsoft-solutions":  "#3b82f6",
  "digital-marketing":    "#fb923c",
  "team-services":        "#fbbf24",
  "emerging-tech":        "#c084fc",
  "gaming":               "#4ade80",
};

const services = categorizedServices as any[];

export default function ServicesPage() {
  return (
    <main style={{ width: "100%", overflowX: "clip", background: "var(--bg-page)" }}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <span className={styles.heroLabel}>WHAT WE DO</span>
        <h1 className={styles.heroTitle}>
          Our{" "}
          <span className={styles.heroAccent}>Capabilities</span>
        </h1>
        <p className={styles.heroSub}>
          End-to-end digital solutions from a team of elite engineers.
          {" "}10 practice areas. 30+ sub-services. One crew.
        </p>
        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <span className={styles.heroStatNum}>10</span>
            <span className={styles.heroStatLabel}>Service Areas</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatNum}>30+</span>
            <span className={styles.heroStatLabel}>Sub-services</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatNum}>8+</span>
            <span className={styles.heroStatLabel}>Countries Served</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatNum}>Top 1%</span>
            <span className={styles.heroStatLabel}>Talent Only</span>
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className={styles.gridSection}>
        <span className={styles.sectionLabel}>ALL SERVICES</span>
        <div className={styles.grid}>
          {services.map((s) => {
            const accent = accentColors[s.slug] ?? "#06c8e8";
            const tags: string[] = (s.includes ?? []).slice(0, 3).map((i: any) => i.name);
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={styles.card}
                style={{ "--accent": accent } as React.CSSProperties}
              >
                <div className={styles.cardAccentLine} />
                <div className={styles.cardHeader}>
                  <span className={styles.cardCat}>{s.category}</span>
                  <span className={styles.cardArrow}>↗</span>
                </div>
                <h2 className={styles.cardName}>{s.name}</h2>
                <p className={styles.cardDesc}>{s.description}</p>
                <div className={styles.cardTags}>
                  {tags.map((t: string) => (
                    <span key={t} className={styles.cardTag}>{t}</span>
                  ))}
                  {(s.includes?.length ?? 0) > 3 && (
                    <span className={styles.cardTag}>+{s.includes.length - 3} more</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── How we work ── */}
      <ProcessSteps />

      {/* ── Testimonials ── */}
      <AnimatedTestimonials />

      {/* ── FAQ ── */}
      <FAQ />

      {/* ── SendUsEmail CTA ── */}
      <SendUsEmail />

    </main>
  );
}
