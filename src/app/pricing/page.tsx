import { Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import Link from "next/link";
import styles from "./pricing.module.scss";
import { CompareTable, FaqAccordion } from "./PricingClient";
import { SendUsEmail } from "@/components/home/SendUsEmail";
import {
  TbCheck, TbBuildingSkyscraper, TbUsers, TbRocket,
  TbShieldCheck, TbCalendarStats, TbHeadset,
} from "react-icons/tb";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: "Pricing — AlgoCrew",
      description: "Transparent, milestone-based pricing for teams that want senior engineering without the guesswork.",
      baseURL,
      path: "/pricing",
      image: "/images/og/pricing.jpg",
    }),
    alternates: { canonical: "/pricing" },
  };
}

const plans = [
  {
    name: "Sprint",
    Icon: TbRocket,
    tag: "MVPs & Feature Builds",
    price: "$8,000",
    unit: "/ project",
    color: "#06c8e8",
    gradient: "linear-gradient(135deg, #06c8e8 0%, #2563eb 100%)",
    desc: "Fixed-price delivery for well-scoped MVPs. A defined scope, a senior team, and a shipped product.",
    features: [
      "1 senior engineer + PM",
      "4–6 week delivery",
      "Daily async updates",
      "3 revision rounds",
      "100% IP transfer",
      "30-day post-launch support",
    ],
    cta: "Start a Sprint",
    highlight: false,
  },
  {
    name: "Studio",
    Icon: TbUsers,
    tag: "Most Popular",
    price: "$14,000",
    unit: "/ month",
    color: "#06c8e8",
    gradient: "linear-gradient(135deg, #06c8e8 0%, #2563eb 100%)",
    desc: "A dedicated product team embedded in your workflow. Agile sprints, weekly demos, 30-day exit — no lock-in.",
    features: [
      "2–3 senior engineers + PM",
      "Agile sprints (2-week cycles)",
      "Dedicated Slack channel",
      "Milestone-based billing",
      "Code reviews & QA included",
      "30-day rolling notice",
      "NDA on day one",
    ],
    cta: "Start with Studio",
    highlight: true,
  },
  {
    name: "Enterprise",
    Icon: TbBuildingSkyscraper,
    tag: "Scale & Infrastructure",
    price: "Custom",
    unit: "",
    color: "#a78bfa",
    gradient: "linear-gradient(135deg, #a78bfa 0%, #2563eb 100%)",
    desc: "A full engineering division — staffing, infrastructure, AI strategy, and long-term partnership.",
    features: [
      "4–12 engineers across disciplines",
      "Dedicated account manager",
      "SLA-backed delivery",
      "Compliance-ready workflows",
      "Cloud + DevOps + AI included",
      "Quarterly strategy reviews",
      "Volume pricing available",
    ],
    cta: "Talk to us",
    highlight: false,
  },
];

const trust = [
  { Icon: TbShieldCheck,    label: "NDA before every call" },
  { Icon: TbCalendarStats,  label: "Milestone-based billing" },
  { Icon: TbHeadset,        label: "48h response guarantee" },
  { Icon: TbCheck,          label: "100% IP transfer" },
];

const pricingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${baseURL}/pricing`,
      url: `${baseURL}/pricing`,
      name: "Pricing — AlgoCrew",
      description: "Transparent, milestone-based pricing for software development. No hidden fees, no lock-in.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseURL },
          { "@type": "ListItem", position: 2, name: "Pricing", item: `${baseURL}/pricing` },
        ],
      },
    },
    {
      "@type": "PriceSpecification",
      name: "Startup Sprint",
      description: "Ideal for MVPs and early-stage startups. Fixed-scope, fast delivery.",
      priceCurrency: "USD",
      minPrice: 4900,
    },
    {
      "@type": "PriceSpecification",
      name: "Growth Team",
      description: "Dedicated senior engineering team for scaling products.",
      priceCurrency: "USD",
      minPrice: 12000,
    },
  ],
};

export default function PricingPage() {
  return (
    <main style={{ width: "100%", overflowX: "clip", background: "var(--bg-page)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }} />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.label}>PRICING</span>
          <h1 className={styles.heroTitle}>
            Transparent pricing.<br />
            <span className={styles.accent}>No surprises.</span>
          </h1>
          <p className={styles.heroSub}>
            Senior-only engineering with milestone-based billing and 30-day rolling exits.
            Pick the model that fits your stage — or talk to us and we&apos;ll recommend one.
          </p>

          {/* Trust strip */}
          <div className={styles.trustStrip}>
            {trust.map(({ Icon, label }) => (
              <div key={label} className={styles.trustItem}>
                <Icon size={15} className={styles.trustIcon} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLANS ── */}
      <section className={styles.plansSection}>
        <div className={styles.sectionInner}>
          <div className={styles.plansGrid}>
            {plans.map((plan) => (
              <div key={plan.name}
                className={`${styles.planCard} ${plan.highlight ? styles.planHighlight : ""}`}
                style={{ "--accent": plan.color } as React.CSSProperties}>

                {/* Top gradient bar */}
                <div className={styles.planBar} style={{ background: plan.gradient }} />

                {plan.highlight && (
                  <div className={styles.popularBadge}
                    style={{ background: plan.gradient }}>
                    Most Popular
                  </div>
                )}

                {/* Plan icon + name */}
                <div className={styles.planTop}>
                  <div className={styles.planIconWrap}
                    style={{ background: `color-mix(in srgb, ${plan.color} 12%, transparent)`,
                             border: `1px solid color-mix(in srgb, ${plan.color} 22%, transparent)`,
                             color: plan.color }}>
                    <plan.Icon size={20} />
                  </div>
                  <div>
                    <span className={styles.planTag} style={{ color: plan.color }}>{plan.tag}</span>
                    <h2 className={styles.planName}>{plan.name}</h2>
                  </div>
                </div>

                {/* Price */}
                <div className={styles.planPriceRow}>
                  <span className={styles.planPriceNum}
                    style={plan.name !== "Enterprise" ? {
                      background: plan.gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    } : {}}>
                    {plan.price}
                  </span>
                  {plan.unit && <span className={styles.planPriceUnit}>{plan.unit}</span>}
                </div>

                <p className={styles.planDesc}>{plan.desc}</p>

                {/* Divider */}
                <div className={styles.planDivider} />

                {/* Features */}
                <ul className={styles.planFeatures}>
                  {plan.features.map((f) => (
                    <li key={f} className={styles.planFeature}>
                      <span className={styles.planCheckIcon} style={{ color: plan.color }}>
                        <TbCheck size={14} strokeWidth={2.5} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href="/contact"
                  className={plan.highlight ? styles.planCtaPrimary : styles.planCtaGhost}
                  style={plan.highlight ? { background: plan.gradient } : {}}>
                  {plan.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALLOUT ── */}
      <section className={styles.calloutSection}>
        <div className={styles.sectionInner}>
          <div className={styles.calloutCard}>
            <div className={styles.calloutLeft}>
              <div className={styles.calloutIconWrap}>
                <TbHeadset size={22} />
              </div>
              <div>
                <h3 className={styles.calloutTitle}>Not sure which plan fits?</h3>
                <p className={styles.calloutText}>
                  Book a free 30-minute strategy call. We&apos;ll scope your project, recommend a model, and give you a written estimate — no pressure, no pitch.
                </p>
              </div>
            </div>
            <Link href="/contact" className={styles.calloutBtn}>
              Book a free call →
            </Link>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <CompareTable />

      {/* ── FAQ ACCORDION ── */}
      <FaqAccordion />

      {/* ── FINAL CTA ── */}
      <SendUsEmail />
    </main>
  );
}
