"use client";
import { useEffect, useRef } from "react";
import { TbPhone, TbMail, TbBrandLinkedin, TbCalendar, TbMapPin, TbBrandSlack } from "react-icons/tb";
import styles from "./ContactOptions.module.scss";

const options = [
  {
    Icon: TbCalendar,
    title: "Book a strategy call",
    desc: "30-minute discovery call with our solutions team. No pitch, just a real conversation about your needs.",
    cta: "Schedule now →",
    href: "https://cal.com/info-algocrew/30min",
    accent: "#06c8e8",
  },
  {
    Icon: TbMail,
    title: "Email us directly",
    desc: "Prefer async? Drop us a line. We respond to every inquiry within one business day.",
    cta: "query@algocrew.io",
    href: "mailto:query@algocrew.io",
    accent: "#a78bfa",
  },
  {
    Icon: TbPhone,
    title: "Call us",
    desc: "Speak directly with our team. Available Mon–Fri, 9am–6pm EST.",
    cta: "+1 (437) 450-9656",
    href: "tel:+14374509656",
    accent: "#34d399",
  },
  {
    Icon: TbBrandLinkedin,
    title: "Connect on LinkedIn",
    desc: "Follow our latest work, case studies and engineering insights.",
    cta: "Visit our page →",
    href: "https://linkedin.com/company/algocrew",
    accent: "#fbbf24",
  },
  {
    Icon: TbMapPin,
    title: "Our office",
    desc: "Brampton, Ontario, Canada, L6V 2E7. Drop by or send us mail.",
    cta: "View on maps →",
    href: "https://maps.google.com/?q=Brampton+Ontario+L6V2E7",
    accent: "#fb923c",
  },
  {
    Icon: TbBrandSlack,
    title: "Dedicated Slack channel",
    desc: "Once engaged, we set up a private Slack channel so you always have a direct line to your team.",
    cta: "Ask us about it →",
    href: "mailto:query@algocrew.io?subject=Slack Channel",
    accent: "#06c8e8",
  },
];

export function ContactOptions() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(`.${styles.card}`);
    if (!cards) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
        }
      }),
      { threshold: 0.1 }
    );
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 70}ms`;
      obs.observe(card);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.label}>OTHER WAYS TO REACH US</span>
          <h2 className={styles.heading}>
            Prefer a different{" "}
            <span className={styles.accent}>channel?</span>
          </h2>
        </header>

        <div className={styles.grid}>
          {options.map((o) => {
            const Icon = o.Icon;
            return (
              <a
                key={o.title}
                href={o.href}
                target={o.href.startsWith("http") ? "_blank" : undefined}
                rel={o.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={styles.card}
                style={{ "--accent": o.accent } as React.CSSProperties}
              >
                <div className={styles.iconWrap}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className={styles.cardTitle}>{o.title}</h3>
                <p className={styles.cardDesc}>{o.desc}</p>
                <span className={styles.cardCta}>{o.cta}</span>
                <div className={styles.cardLine} aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
