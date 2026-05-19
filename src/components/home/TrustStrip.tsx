"use client";
import { HiShieldCheck, HiLockClosed } from "react-icons/hi2";
import {
  TbBolt, TbInfinity, TbCertificate,
  TbRocket, TbCalendarCheck, TbCode, TbBrandSlack,
  TbReportAnalytics, TbChecklist, TbReceipt2, TbMessages,
  TbMailFast, TbClockHour4,
} from "react-icons/tb";
import styles from "./TrustStrip.module.scss";

type Item = { Icon?: React.ElementType; label: string; accent?: string };

/* Row 1 — Standards & Compliance */
const ROW1: Item[] = [
  { Icon: HiShieldCheck,        label: "SOC 2 Aligned",        accent: "#06c8e8" },
  { Icon: HiLockClosed,         label: "NDA on Day 1",         accent: "#a78bfa" },
  { Icon: HiShieldCheck,        label: "HIPAA Ready",          accent: "#34d399" },
  { Icon: TbCertificate,        label: "100% IP Transfer",     accent: "#fbbf24" },
  { Icon: TbInfinity,           label: "Zero Lock-in",         accent: "#06c8e8" },
  { Icon: HiShieldCheck,        label: "ISO 27001 Aligned",    accent: "#fb923c" },
  { Icon: TbBolt,               label: "Follow-the-sun",       accent: "#06c8e8" },
  { Icon: HiLockClosed,         label: "Secure by Design",     accent: "#a78bfa" },
  { Icon: TbCertificate,        label: "GDPR Compliant",       accent: "#34d399" },
  { Icon: TbBolt,               label: "24 / 7 On-call",       accent: "#fbbf24" },
];

/* Row 2 — Delivery Process & Client Experience (scrolls opposite direction) */
const ROW2: Item[] = [
  { Icon: TbRocket,           label: "Agile Native",            accent: "#06c8e8" },
  { Icon: TbCalendarCheck,    label: "Daily Standups",          accent: "#34d399" },
  { Icon: TbCode,             label: "Code Reviews Included",   accent: "#a78bfa" },
  { Icon: TbBrandSlack,       label: "Dedicated Slack Channel", accent: "#7c3aed" },
  { Icon: TbReportAnalytics,  label: "Weekly Reports",          accent: "#fbbf24" },
  { Icon: TbChecklist,        label: "Sprint Demos",            accent: "#06c8e8" },
  { Icon: TbReceipt2,         label: "Milestone Billing",       accent: "#34d399" },
  { Icon: TbMessages,         label: "Async-First Comms",       accent: "#a78bfa" },
  { Icon: TbMailFast,         label: "Post-launch Support",     accent: "#fbbf24" },
  { Icon: TbClockHour4,       label: "30-day Notice Period",    accent: "#06c8e8" },
];

function MarqueeRow({ items, reverse = false }: { items: Item[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className={styles.row}>
      <div className={`${styles.track} ${reverse ? styles.trackReverse : ""}`}>
        {doubled.map((item, i) => {
          const Icon = item.Icon;
          return (
            <div key={i} className={styles.item}>
              {Icon && (
                <span className={styles.iconWrap} style={{ color: item.accent }}>
                  <Icon size={13} aria-hidden="true" />
                </span>
              )}
              <span className={styles.label}>{item.label}</span>
              <span className={styles.sep} aria-hidden="true" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TrustStrip() {
  return (
    <div className={styles.strip} aria-label="Standards and certifications">
      <MarqueeRow items={ROW1} />
      <MarqueeRow items={ROW2} reverse />
    </div>
  );
}
