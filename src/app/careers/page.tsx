export const dynamic = "force-static";

import { Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import Link from "next/link";
import styles from "./careers.module.scss";
import { RolesSection } from "./CareersClient";
import { PerksSection, ProcessSection } from "./CareersSections";
import { SendUsEmail } from "@/components/home/SendUsEmail";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: "Careers — AlgoCrew",
      description: "Join a team of elite engineers building the future of software. Remote-first, async-friendly, top 1% talent only.",
      baseURL,
      path: "/careers",
      image: "/images/og/careers.jpg",
    }),
    alternates: { canonical: "/careers" },
  };
}

const teamQuotes = [
  { quote: "I've worked at big tech and agencies — AlgoCrew is the only place where I'm trusted to make architectural decisions from day one. No committees, no red tape.", name: "Huzaifa K.", role: "Senior Full-Stack Engineer", initials: "HK", color: "#06c8e8" },
  { quote: "The async-first culture is real. I do my best work between 10pm and 2am — nobody cares, as long as the sprint ships. That freedom is worth more than any perk.", name: "Irfan N.", role: "DevOps Engineer", initials: "IN", color: "#a78bfa" },
  { quote: "What sold me was the calibre of the clients. I'm solving infrastructure problems at a scale most engineers only read about in SRE books.", name: "Muhammad A.", role: "Full-Stack Engineer", initials: "MA", color: "#34d399" },
];

const marqueeItems = [
  "Remote-first", "Async culture", "Senior-only", "Top 1% talent",
  "AI-first delivery", "Zero micromanagement", "Equity available",
  "8+ countries", "100% IP transfer", "30-day exit", "NDA day one",
  "Real projects", "No CRUD apps", "$1,500 learn budget",
];

const careersSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${baseURL}/careers`,
      url: `${baseURL}/careers`,
      name: "Careers — AlgoCrew",
      description: "Join a team of elite engineers building the future of software. Remote-first, async-friendly, top 1% talent only.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseURL },
          { "@type": "ListItem", position: 2, name: "Careers", item: `${baseURL}/careers` },
        ],
      },
    },
    {
      "@type": "JobPosting",
      title: "Senior Software Engineer",
      description: "AlgoCrew is hiring senior engineers (frontend, backend, full-stack, mobile, DevOps, AI/ML). Remote-first, async culture, equity options.",
      datePosted: "2024-01-01",
      validThrough: "2026-12-31",
      employmentType: "FULL_TIME",
      hiringOrganization: {
        "@type": "Organization",
        name: "AlgoCrew",
        sameAs: baseURL,
        logo: `${baseURL}/images/LogoDark.png`,
      },
      jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "CA" } },
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: { "@type": "Country", name: "Worldwide" },
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: { "@type": "QuantitativeValue", minValue: 80000, maxValue: 180000, unitText: "YEAR" },
      },
    },
  ],
};

export default function CareersPage() {
  return (
    <main style={{ width: "100%", overflowX: "clip", background: "var(--bg-page)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(careersSchema) }} />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow1} aria-hidden="true" />
        <div className={styles.heroGlow2} aria-hidden="true" />

        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div className={styles.hiringBadge}>
              <span className={styles.hiringDot} />
              We&apos;re hiring
            </div>
            <h1 className={styles.heroTitle}>
              Build things<br />
              that <span className={styles.accent}>matter.</span>
            </h1>
            <p className={styles.heroSub}>
              A remote-first crew of senior engineers, designers, and strategists.
              We work on ambitious products with clients who trust us fully.
              If you&apos;re in the top 1% of your craft — we need to talk.
            </p>
            <div className={styles.heroCtas}>
              <a href="#roles" className={styles.heroPrimary}>See open roles →</a>
              <Link href="/work" className={styles.heroGhost}>View our work</Link>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.floatGrid}>
              {[
                { num: "Top 1%", label: "Engineers only" },
                { num: "100%",   label: "Remote" },
                { num: "8+",     label: "Countries" },
                { num: "48h",    label: "To first commit" },
                { num: "$1.5k",  label: "Learn budget/yr" },
                { num: "30d",    label: "Exit notice" },
              ].map((s) => (
                <div key={s.label} className={styles.floatCard}>
                  <span className={styles.floatNum}>{s.num}</span>
                  <span className={styles.floatLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className={styles.marqueeWrap} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeDot} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── PERKS — icon-based, no emojis ── */}
      <PerksSection />

      {/* ── TEAM QUOTES ── */}
      <section className={styles.quotesSection}>
        <div className={styles.sectionInner}>
          <span className={styles.label}>FROM THE CREW</span>
          <h2 className={styles.sectionTitle}>Hear it from the team</h2>
          <div className={styles.quotesGrid}>
            {teamQuotes.map((q) => (
              <div key={q.name} className={styles.quoteCard}>
                <div className={styles.quoteGlyph}>&ldquo;</div>
                <p className={styles.quoteText}>{q.quote}</p>
                <div className={styles.quoteAuthor}>
                  <div className={styles.quoteAvatar}
                    style={{ background: `linear-gradient(135deg, ${q.color}, #2563eb)` }}>
                    {q.initials}
                  </div>
                  <div>
                    <p className={styles.quoteName}>{q.name}</p>
                    <p className={styles.quoteRole}>{q.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN ROLES — filterable ── */}
      <div id="roles">
        <RolesSection />
      </div>

      {/* ── HIRING PROCESS — icon-based, no emojis ── */}
      <ProcessSection />

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaGlow} aria-hidden="true" />
          <span className={styles.label}>READY?</span>
          <h2 className={styles.ctaTitle}>
            Your next chapter<br />
            <span className={styles.accent}>starts here.</span>
          </h2>
          <p className={styles.ctaSub}>
            We review every application personally. You&apos;ll hear back within 48 hours — always.
          </p>
          <div className={styles.ctaBtns}>
            <Link href="/contact" className={styles.ctaPrimary}>Apply now →</Link>
            <Link href="/work" className={styles.ctaGhost}>See what we build</Link>
          </div>
        </div>
      </section>

      <SendUsEmail />
    </main>
  );
}
