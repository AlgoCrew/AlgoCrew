"use client";
import styles from "./AchievementsStrip.module.scss";

const items = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "48hr", label: "Team Matching" },
  { value: "5+", label: "Years Expertise" },
  { value: "30+", label: "Happy Clients" },
  { value: "$10M+", label: "Value Delivered" },
  { value: "12+", label: "Industry Verticals" },
  { value: "Top 1%", label: "Vetted Talent" },
];

export function AchievementsStrip() {
  const doubled = [...items, ...items]; // duplicate for seamless loop

  return (
    <div className={styles.strip}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <div key={i} className={styles.item}>
            <span className={styles.value}>{item.value}</span>
            <span className={styles.divider}>·</span>
            <span className={styles.label}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
