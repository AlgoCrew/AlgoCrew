"use client";

import { useState } from "react";
import Link from "next/link";
import { TbCheck, TbMinus, TbChevronDown, TbCalendar, TbMessageCircle } from "react-icons/tb";
import styles from "./pricing.module.scss";

/* ── Comparison table ── */
const rows = [
  { feature: "Senior engineers",           sprint: "1",           studio: "2–3",         enterprise: "4–12" },
  { feature: "Project Manager",            sprint: true,          studio: true,           enterprise: true },
  { feature: "Delivery timeline",          sprint: "4–6 weeks",   studio: "Rolling",      enterprise: "Custom" },
  { feature: "Billing model",              sprint: "Fixed price", studio: "Milestone",    enterprise: "Custom" },
  { feature: "Daily async updates",        sprint: true,          studio: true,           enterprise: true },
  { feature: "Dedicated Slack channel",    sprint: false,         studio: true,           enterprise: true },
  { feature: "Code reviews & QA",         sprint: false,         studio: true,           enterprise: true },
  { feature: "SLA-backed delivery",        sprint: false,         studio: false,          enterprise: true },
  { feature: "Compliance workflows",       sprint: false,         studio: false,          enterprise: true },
  { feature: "Quarterly strategy reviews", sprint: false,         studio: false,          enterprise: true },
  { feature: "100% IP transfer",           sprint: true,          studio: true,           enterprise: true },
  { feature: "NDA on day one",             sprint: true,          studio: true,           enterprise: true },
  { feature: "Exit notice",                sprint: "N/A",         studio: "30 days",      enterprise: "Negotiated" },
  { feature: "Post-launch support",        sprint: "30 days",     studio: "Ongoing",      enterprise: "Dedicated" },
];

function Cell({ val, accent }: { val: boolean | string; accent?: string }) {
  if (typeof val === "boolean") {
    return val
      ? <span className={styles.cellCheck} style={accent ? { color: accent } : {}}><TbCheck size={16} strokeWidth={2.5} /></span>
      : <span className={styles.cellMinus}><TbMinus size={14} /></span>;
  }
  return <span className={styles.cellText}>{val}</span>;
}

export function CompareTable() {
  return (
    <section className={styles.compareSection}>
      <div className={styles.sectionInner}>
        <span className={styles.label}>COMPARE</span>
        <h2 className={styles.sectionTitle}>Everything side by side</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thFeature}>Feature</th>
                <th className={styles.th}>Sprint</th>
                <th className={`${styles.th} ${styles.thHighlight}`}>Studio</th>
                <th className={styles.th}>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? styles.trEven : ""}>
                  <td className={styles.tdFeature}>{row.feature}</td>
                  <td className={styles.td}><Cell val={row.sprint} /></td>
                  <td className={`${styles.td} ${styles.tdHighlight}`}><Cell val={row.studio} accent="#06c8e8" /></td>
                  <td className={styles.td}><Cell val={row.enterprise} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ accordion ── */
const faqs = [
  { q: "Do you offer fixed-price projects?",          a: "Yes, the Sprint plan is always fixed price with a defined scope and delivery date. For Studio and Enterprise we use milestone-based billing with a monthly retainer." },
  { q: "What's included in post-launch support?",     a: "Bug fixes, performance monitoring, minor feature tweaks, and deployment support for 30 days (Sprint) or ongoing (Studio/Enterprise). New feature development requires a new sprint or scope extension." },
  { q: "Can I scale the team mid-project?",           a: "Yes. Studio clients can add or remove engineers with 2-week notice. Enterprise clients have dedicated capacity planning and dedicated account management." },
  { q: "Who owns the code and IP?",                   a: "You do, 100%. All IP transfers fully on final payment. No licence back, no residual claims, no strings attached." },
  { q: "Is there a minimum commitment?",              a: "Sprint: no minimum beyond the agreed scope. Studio: 1-month minimum, then 30-day rolling. Enterprise: negotiated per engagement based on scope." },
  { q: "How do milestone payments work?",             a: "We break each engagement into 2–3 milestones tied to concrete deliverables. You pay on milestone completion, not on time. If we miss a milestone, you don't pay until we do." },
  { q: "Do you sign NDAs before discovery?",          a: "Yes, NDAs are signed before any discovery call, requirements discussion, or code review. Confidentiality is default, not optional." },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqInner}>
        <div className={styles.faqSplit}>
          <div className={styles.faqLeft}>
            <span className={styles.label}>FAQ</span>
            <h2 className={styles.sectionTitle}>Pricing questions<br />answered.</h2>
            <p className={styles.faqLeftSub}>
              Still have questions? We respond to every enquiry within 24 hours.
            </p>
            <div className={styles.faqCtaGroup}>
              <Link href="/contact" className={styles.faqCtaBtn}>
                <TbMessageCircle size={16} />
                Ask us directly
              </Link>
              <Link href="/contact" className={styles.faqCtaGhost}>
                <TbCalendar size={16} />
                Book a call
              </Link>
            </div>
          </div>

          <div className={styles.accordion}>
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className={`${styles.accordionItem} ${isOpen ? styles.accordionOpen : ""}`}>
                  <button className={styles.accordionTrigger}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}>
                    <span className={styles.accordionQ}>{faq.q}</span>
                    <span className={`${styles.accordionIcon} ${isOpen ? styles.accordionIconOpen : ""}`}>
                      <TbChevronDown size={18} />
                    </span>
                  </button>
                  {isOpen && (
                    <div className={styles.accordionBody}>
                      <p className={styles.accordionA}>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
