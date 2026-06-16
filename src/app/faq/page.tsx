import Link from "next/link";
import { baseURL } from "@/resources";
import { SendUsEmail } from "@/components/home/SendUsEmail";
import styles from "./faq.module.scss";

export async function generateMetadata() {
  return {
    title: "FAQ, AlgoCrew Software Agency",
    description: "Answers to the most common questions about working with AlgoCrew, pricing, process, contracts, IP ownership, team structure, and timelines.",
    alternates: { canonical: baseURL + "/faq" },
    openGraph: {
      title: "FAQ, AlgoCrew Software Agency",
      description: "Answers to common questions about working with AlgoCrew.",
      url: baseURL + "/faq",
    },
  };
}

const faqs = [
  {
    category: "Getting Started",
    items: [
      {
        q: "How do I start a project with AlgoCrew?",
        a: "Fill out the contact form at algocrew.io/contact or email query@algocrew.io. We respond within 48 hours to schedule a free 30-minute discovery call. On that call we discuss your goals, scope, and recommend a delivery model. No pitch, just conversation.",
      },
      {
        q: "Do you sign an NDA before the discovery call?",
        a: "Yes, always. We sign a mutual NDA before any discovery call or technical discussion. Your ideas are protected from the first conversation.",
      },
      {
        q: "How long does it take to get a proposal?",
        a: "After our discovery call, we deliver a written proposal including scope, timeline, team composition, and cost breakdown within 3-5 business days. For well-defined projects, often sooner.",
      },
      {
        q: "Do you work with early-stage startups?",
        a: "Yes, we work with companies at all stages, from pre-seed founders to publicly traded enterprises. For early-stage startups we offer a focused MVP package that gets you to a live, investor-ready product in 6-10 weeks.",
      },
    ],
  },
  {
    category: "Pricing & Contracts",
    items: [
      {
        q: "How does AlgoCrew charge for projects?",
        a: "We offer milestone-based fixed-scope pricing and monthly retainer models. Milestone billing means you pay when deliverables are approved, no upfront payment for work not yet done. We never send surprise invoices.",
      },
      {
        q: "What is your pricing range?",
        a: "Projects typically start at $4,900 for focused MVP sprints and scale to $25,000+ per month for dedicated senior engineering teams. Our pricing reflects senior-only talent, you pay for experience, not headcount.",
      },
      {
        q: "Is there a lock-in period?",
        a: "No. We operate on 30-day rolling contracts. If we are not delivering value, you can exit with 30 days notice, no penalties, no legal fights. This keeps us accountable to results.",
      },
      {
        q: "Do you offer equity arrangements for startups?",
        a: "In selective cases, yes. For very early-stage startups we occasionally offer a reduced-rate plus equity model. This is decided case-by-case. Reach out and we can discuss if it makes sense for your situation.",
      },
    ],
  },
  {
    category: "Team & Process",
    items: [
      {
        q: "Who exactly will work on my project?",
        a: "Only senior engineers with 5+ years of production experience. We never put juniors on client work. Your core team is typically 1-2 engineers plus a lead. For larger engagements we scale from a dedicated talent pool, all senior.",
      },
      {
        q: "How does communication work?",
        a: "We are async-first, which means you get structured daily updates without needing to attend meetings. We use Slack or Linear for day-to-day communication. Weekly syncs are available and encouraged. You always know exactly what is being built.",
      },
      {
        q: "Which timezones do you cover?",
        a: "Our core team covers Eastern and Central Time (ET/CT). We also have engineers available in PT for West Coast US and Canadian clients, and offer early-morning coverage for UK and European clients. Async delivery means Australian and APAC clients get morning updates ready when they wake.",
      },
      {
        q: "Do you do fixed-scope or agile delivery?",
        a: "Both, depending on what is right for your project. MVPs and well-defined features work well fixed-scope. Ongoing product development works better in two-week agile sprints with a defined backlog. We help you choose the right model in the scoping call.",
      },
    ],
  },
  {
    category: "IP & Legal",
    items: [
      {
        q: "Who owns the code and IP at the end of the project?",
        a: "You do, 100%. Full source code, design files, documentation, and deployment configurations are transferred to you at project completion. We retain no rights, licenses, or residual claims. This is written into every contract.",
      },
      {
        q: "What countries are your contracts governed by?",
        a: "By default our contracts are governed by Ontario, Canada law. For US clients we can offer Delaware or your preferred state. For UK clients we can use English law. We make legal friction as low as possible.",
      },
      {
        q: "Do you have experience with regulated industries?",
        a: "Yes, fintech (PCI-DSS, SOC 2, FCA), healthcare (HIPAA, PHIPA), government (security clearance documentation), and financial services (OSFI, SEC). We design compliance in, not bolt it on afterwards.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        q: "What technologies does AlgoCrew specialize in?",
        a: "Our primary stack is React, Next.js, Node.js, TypeScript, Python, Go, and React Native for frontend and backend. For cloud we specialize in AWS and GCP. For DevOps we work extensively with Kubernetes, Terraform, Docker, and CI/CD pipelines. We choose the right tool for the job, not just our favorite.",
      },
      {
        q: "Can you work on an existing codebase?",
        a: "Yes, in fact, around 40% of our engagements are teams bringing us in to improve or extend existing systems. We start with a thorough technical audit before touching the code.",
      },
      {
        q: "Do you provide post-launch support?",
        a: "All projects come with a 30-day bug warranty after launch. For ongoing support we offer monthly retainer packages that cover maintenance, monitoring, security patches, and feature development. Many clients stay on retainer long-term.",
      },
      {
        q: "What is your approach to security?",
        a: "Security is built in, not added on. We follow OWASP Top 10, implement security headers on every project, conduct dependency audits, and use environment-specific secrets management. For regulated industries we go further with penetration testing and formal audits.",
      },
    ],
  },
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((cat) =>
      cat.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      }))
    ),
  };

  return (
    <main style={{ width: "100%", overflowX: "clip", background: "var(--bg-page)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>FAQ</span>
          <h1 className={styles.title}>
            Answers before<br />
            <span className={styles.accent}>you even ask.</span>
          </h1>
          <p className={styles.sub}>
            Everything you need to know about working with AlgoCrew, process, pricing, contracts, and tech.
            Still have a question? <Link href="/contact" style={{ color: "#06c8e8", fontWeight: 700 }}>Just ask us.</Link>
          </p>
        </div>
      </section>

      {/* ── FAQ SECTIONS ── */}
      <section className={styles.faqSection}>
        <div className={styles.inner}>
          {faqs.map((cat) => (
            <div key={cat.category} className={styles.catBlock}>
              <h2 className={styles.catTitle}>{cat.category}</h2>
              <div className={styles.faqList}>
                {cat.items.map((item) => (
                  <div key={item.q} className={styles.faqItem}>
                    <p className={styles.q}>{item.q}</p>
                    <p className={styles.a}>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STILL HAVE QUESTIONS ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Still have questions?</h2>
          <p className={styles.ctaSub}>Book a free 30-minute call. No pitch, no pressure, just answers.</p>
          <Link href="/contact" className={styles.ctaBtn}>Talk to us &rarr;</Link>
        </div>
      </section>

      <SendUsEmail />
    </main>
  );
}
