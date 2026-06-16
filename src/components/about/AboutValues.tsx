"use client";
import { useEffect, useRef } from "react";
import { FaHandshake, FaShieldAlt, FaUserTie, FaFire, FaPeopleCarry, FaLightbulb } from "react-icons/fa";
import styles from "./AboutValues.module.scss";

const values = [
  {
    Icon: FaHandshake,
    name: "Integrity",
    description: "We are honest and truthful in every interaction, with clients, teammates, and ourselves. No spin, no shortcuts.",
    accent: "#06c8e8",
  },
  {
    Icon: FaShieldAlt,
    name: "Trust",
    description: "We act in good faith, deliver on our word, and hold each other to the standards we'd expect from any world-class team.",
    accent: "#a78bfa",
  },
  {
    Icon: FaUserTie,
    name: "Ownership",
    description: "We don't wait for follow-ups. Every engineer owns their domain, quality, timelines, and client outcomes.",
    accent: "#fbbf24",
  },
  {
    Icon: FaFire,
    name: "Passion",
    description: "We are laser-focused on client success. That drive is what pushes us past good enough into genuinely exceptional.",
    accent: "#fb923c",
  },
  {
    Icon: FaPeopleCarry,
    name: "Collaboration",
    description: "Software is a team sport. We hold peers to high standards while lifting them up, no one is left behind on a deadline.",
    accent: "#34d399",
  },
  {
    Icon: FaLightbulb,
    name: "Initiative",
    description: "We don't wait to be assigned a problem worth solving. We see it, own it, and drive it, trailblazers by default.",
    accent: "#06c8e8",
  },
];

export function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(`.${styles.card}`);
    if (!cards) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 80}ms`;
      obs.observe(card);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.label}>OUR VALUES</span>
          <h2 className={styles.heading}>
            Principles we{" "}
            <span className={styles.accent}>never compromise on.</span>
          </h2>
        </header>

        <div className={styles.grid}>
          {values.map((v) => {
            const Icon = v.Icon;
            return (
              <div
                key={v.name}
                className={styles.card}
                style={{ "--accent": v.accent } as React.CSSProperties}
              >
                <div className={styles.iconWrap}>
                  <Icon size={18} aria-hidden="true" />
                </div>
                <h3 className={styles.cardName}>{v.name}</h3>
                <p className={styles.cardDesc}>{v.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
