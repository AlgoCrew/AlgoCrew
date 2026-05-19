"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./FAQ.module.scss";

const faqs = [
  {
    q: "How quickly can you onboard engineering talent?",
    a: "From signed brief to first standup in 48 hours. Our pre-vetted bench means we match you with engineers who have already passed our 5-stage screening — technical assessment, system design, culture fit, security clearance check, and reference verification. No cold sourcing, no delays.",
    tag: "Onboarding",
  },
  {
    q: "What does your vetting process actually look like?",
    a: "Every engineer goes through: (1) async coding challenge in their primary stack, (2) live system-design interview with a senior AlgoCrew architect, (3) behavioural & communication screen, (4) background and reference checks, and (5) a paid trial sprint with an existing client. Less than 1% of applicants make it through.",
    tag: "Quality",
  },
  {
    q: "Do you work on fixed-price or time-and-materials basis?",
    a: "Both. For well-scoped MVPs and product sprints we offer fixed-price delivery with milestone-based payments and full IP transfer on completion. For ongoing product teams we work on a monthly retainer (time-and-materials) with 30-day rolling notice. We can blend both models for larger engagements.",
    tag: "Pricing",
  },
  {
    q: "Which industries do you specialise in?",
    a: "Our deepest expertise is in Fintech (payments, trading, compliance), HealthTech (HIPAA-compliant platforms, EHR integrations), Cloud-native SaaS, and AI/ML product development. We've also shipped projects in EdTech, Logistics, and Developer Tooling.",
    tag: "Industries",
  },
  {
    q: "What does 'AI-First' delivery mean in practice?",
    a: "Every project we ship is evaluated for LLM-augmentation opportunities — whether that's embedding a co-pilot feature, building an internal RAG pipeline for your ops team, or instrumenting observability so your models stay healthy in production. We don't bolt AI on; we architect for it from day one.",
    tag: "AI",
  },
  {
    q: "How do you handle NDA, IP ownership, and data security?",
    a: "IP transfers 100% to you on payment — no license back, no residual claims. NDAs are signed before any discovery call. All engineers operate under strict confidentiality agreements. For enterprise clients we support SOC 2–aligned workflows, zero-trust access patterns, and your preferred secret-management toolchain.",
    tag: "Legal",
  },
  {
    q: "Can you integrate with our existing team?",
    a: "Yes — and that's how most engagements start. Our engineers slot into your Slack, stand-ups, sprint ceremonies, and code-review culture. We've worked inside monorepos at 200-person scale and as the entire technical team for seed-stage startups. We adapt, not the other way around.",
    tag: "Process",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={styles.section} id="faq">
      <div className={styles.inner}>

        {/* Left panel */}
        <div className={styles.left}>
          <span className={styles.label}>FAQ</span>
          <h2 className={styles.heading}>
            Questions<br />
            <span className={styles.accent}>answered.</span>
          </h2>
          <p className={styles.sub}>
            Everything you need to know before your first call.
            Still curious? We&apos;re one message away.
          </p>
          <Link href="/contact" className={styles.ctaLink}>
            Ask us directly
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>

          {/* Decorative index pills */}
          <div className={styles.indexPills}>
            {faqs.map((f, i) => (
              <button
                key={i}
                className={`${styles.pill} ${open === i ? styles.pillActive : ""}`}
                onClick={() => setOpen(open === i ? null : i)}
                aria-label={`Jump to: ${f.q}`}
              >
                <span className={styles.pillNum}>0{i + 1}</span>
                <span className={styles.pillTag}>{f.tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Accordion */}
        <div className={styles.accordion} role="list">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
                role="listitem"
              >
                <button
                  className={styles.trigger}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-body-${i}`}
                  id={`faq-trigger-${i}`}
                >
                  <span className={styles.triggerNum}>0{i + 1}</span>
                  <span className={styles.triggerQ}>{faq.q}</span>
                  <span className={styles.triggerTag}>{faq.tag}</span>
                  <span className={styles.triggerIcon} aria-hidden="true">
                    <span className={styles.iconH} />
                    <span className={`${styles.iconV} ${isOpen ? styles.iconVOpen : ""}`} />
                  </span>
                </button>

                <div
                  id={`faq-body-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  className={styles.body}
                  style={{ "--h": isOpen ? "auto" : "0px" } as React.CSSProperties}
                  hidden={!isOpen}
                >
                  <p className={styles.answer}>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
