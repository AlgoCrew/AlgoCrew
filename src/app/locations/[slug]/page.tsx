import { notFound } from "next/navigation";
import Link from "next/link";
import { baseURL } from "@/resources";
import { locations, getLocation } from "@/resources/locations";
import { SendUsEmail } from "@/components/home/SendUsEmail";
import styles from "./location.module.scss";

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};
  return {
    title: `${loc.headline} | AlgoCrew`,
    description: loc.metaDescription,
    alternates: { canonical: `${baseURL}/locations/${slug}` },
    openGraph: {
      title: `${loc.headline} | AlgoCrew`,
      description: loc.metaDescription,
      url: `${baseURL}/locations/${slug}`,
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "AlgoCrew",
    description: loc.metaDescription,
    url: baseURL + "/locations/" + slug,
    areaServed: loc.country,
    address: { "@type": "PostalAddress", addressCountry: loc.country === "Canada" ? "CA" : loc.country === "United States" ? "US" : loc.country === "United Kingdom" ? "GB" : "AU" },
    serviceType: loc.services.join(", "),
  };

  return (
    <main style={{ width: "100%", overflowX: "clip", background: "var(--bg-page)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <Link href="/locations" className={styles.backLink}>
            <span>&#8592;</span> All Locations
          </Link>
          <div className={styles.flag}>{loc.flag}</div>
          <span className={styles.eyebrow}>SOFTWARE AGENCY IN {loc.country.toUpperCase()}</span>
          <h1 className={styles.title}>{loc.headline}</h1>
          <p className={styles.sub}>{loc.description}</p>
          <div className={styles.heroCtas}>
            <Link href="/contact" className={styles.ctaPrimary}>Start a Project &rarr;</Link>
            <Link href="/work" className={styles.ctaGhost}>View Our Work</Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className={styles.statsStrip}>
        {loc.stats.map((s) => (
          <div key={s.label} className={styles.statItem}>
            <span className={styles.statMetric}>{s.metric}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── SERVICES ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionEye}>WHAT WE BUILD</span>
          <h2 className={styles.sectionTitle}>
            Services we deliver in {loc.city !== loc.country ? loc.city + "," : ""} {loc.country}
          </h2>
          <div className={styles.servicesGrid}>
            {loc.services.map((s) => (
              <div key={s} className={styles.serviceCard}>
                <span className={styles.serviceDot} />
                <span>{s}</span>
              </div>
            ))}
          </div>
          <Link href="/services" className={styles.servicesLink}>
            View all services &rarr;
          </Link>
        </div>
      </section>

      {/* ── WHY ALGOCREW ── */}
      <section className={styles.whySection}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionEye}>WHY ALGOCREW</span>
          <h2 className={styles.sectionTitle}>
            Why {loc.country} companies choose us
          </h2>
          <div className={styles.whyGrid}>
            {[
              { title: "Senior engineers only", desc: "8+ years average experience. No juniors on your project, ever. Your codebase stays clean." },
              { title: "No lock-in contracts", desc: "30-day rolling exit. If we're not delivering, you can leave without penalty. That keeps us accountable." },
              { title: "100% IP transfer", desc: "Everything we build is yours. Full source code, documentation, and deployment scripts transferred at completion." },
              { title: "48h response guarantee", desc: "We respond to all client messages within 48 hours — usually much faster. No ghosting, ever." },
              { title: "Milestone billing", desc: "You pay when milestones are delivered and approved. No open-ended retainers or surprise invoices." },
              { title: "NDA on day one", desc: "We sign a mutual NDA before any discovery call. Your ideas are protected from the first conversation." },
            ].map((item) => (
              <div key={item.title} className={styles.whyCard}>
                <span className={styles.whyCheck}>&#10003;</span>
                <div>
                  <p className={styles.whyTitle}>{item.title}</p>
                  <p className={styles.whyDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className={styles.faqSection}>
        <div className={styles.sectionInner}>
          <span className={styles.sectionEye}>FAQ</span>
          <h2 className={styles.sectionTitle}>Common questions from {loc.country} clients</h2>
          <div className={styles.faqList}>
            {loc.faqs.map((faq) => (
              <div key={faq.q} className={styles.faqItem}>
                <p className={styles.faqQ}>{faq.q}</p>
                <p className={styles.faqA}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SendUsEmail />
    </main>
  );
}
