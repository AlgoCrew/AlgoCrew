export const dynamic = "force-static";

import { Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { AboutWhyUs } from "@/components/about/AboutWhyUs";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutVision } from "@/components/about/AboutVision";
import { SendUsEmail } from "@/components/home/SendUsEmail";
import styles from "./about-page.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: "About — AlgoCrew",
    description: "AlgoCrew is a software company headquartered in Canada, delivering elite engineering solutions globally.",
    baseURL,
    path: "/about",
    image: "/images/og/about.jpg",
  });
}

function StatCard({ num, label, desc }: { num: string; label: string; desc: string }) {
  return (
    <div className={styles.statCard}>
      <div style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--text-primary)", marginBottom: "8px" }}>
        {num}
      </div>
      <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 6px" }}>{label}</p>
      <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

const aboutSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${baseURL}/about`,
      url: `${baseURL}/about`,
      name: "About AlgoCrew",
      description: "AlgoCrew is a software company headquartered in Canada, delivering elite engineering solutions globally.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseURL },
          { "@type": "ListItem", position: 2, name: "About", item: `${baseURL}/about` },
        ],
      },
      mainEntity: { "@id": `${baseURL}/#organization` },
    },
  ],
};

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-page)", paddingTop: "100px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />

      {/* Hero */}
      <section className={styles.heroSection}>
        <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--text-muted)", display: "block", marginBottom: "20px" }}>
          ABOUT ALGOCREW
        </span>
        <h1 style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--text-primary)", margin: "0 0 32px", lineHeight: 0.95 }}>
          We are<br />
          <span style={{ background: "linear-gradient(135deg, #06c8e8, #2563eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            AlgoCrew.
          </span>
        </h1>
        <p style={{ fontSize: "1.15rem", color: "var(--text-muted)", maxWidth: "560px", lineHeight: 1.7, margin: 0 }}>
          A software company headquartered in Canada, delivering elite engineering solutions for startups and enterprises across North America and Europe.
        </p>
      </section>

      {/* Mission */}
      <section className={styles.section} style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className={styles.grid2col}>
          <div>
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#06c8e8", display: "block", marginBottom: "20px" }}>OUR MISSION</span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--text-primary)", margin: "0 0 24px", lineHeight: 1 }}>
              Engineering digital products that change industries.
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.75, margin: 0 }}>
              At AlgoCrew, we&apos;re not just developers — we&apos;re architects of the digital future. We specialize in delivering top-tier solutions tailored to the high-stakes needs of modern enterprise. Our approach combines deep technical expertise with strategic business thinking to create products that don&apos;t just work — they win.
            </p>
          </div>
          <div className={styles.missionRight}>
            {[
              "AI-first engineering approach",
              "Transparent communication at every step",
              "Security and performance by default",
              "Long-term partnerships, not one-off projects",
            ].map(v => (
              <div key={v} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 0", borderBottom: "1px solid var(--border-subtle)" }}>
                <span style={{ color: "#06c8e8", fontSize: "12px" }}>→</span>
                <span style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.section} style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className={styles.grid4col}>
          <StatCard num="50+" label="Projects Delivered" desc="Across 12+ industry verticals" />
          <StatCard num="30+" label="Happy Clients" desc="From startups to global enterprises" />
          <StatCard num="5+" label="Years of Mastery" desc="Deep technical expertise" />
          <StatCard num="98%" label="Satisfaction Rate" desc="Measured by NPS and retention" />
        </div>
      </section>

      {/* Why AlgoCrew */}
      <AboutWhyUs />

      {/* Our Values */}
      <AboutValues />

      {/* Vision + Timeline */}
      <AboutVision />

      {/* CTA */}
      <SendUsEmail />
    </main>
  );
}
