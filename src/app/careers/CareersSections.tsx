"use client";

import { useEffect, useRef } from "react";
import {
  TbWorld, TbBolt, TbTrendingUp, TbBook, TbHeartbeat,
  TbRocket, TbUsers, TbShieldLock, TbCalendarOff,
  TbFileDescription, TbCode, TbTargetArrow, TbPlayerPlay,
} from "react-icons/tb";
import styles from "./careers.module.scss";

/* ── PERKS bento with parallax ── */
export function PerksSection() {
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const section = col1Ref.current?.closest("section");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const progress = -rect.top / window.innerHeight;
      if (col1Ref.current) col1Ref.current.style.transform = `translateY(${progress * 28}px)`;
      if (col2Ref.current) col2Ref.current.style.transform = `translateY(${progress * -20}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={styles.perksSection}>
      <div className={styles.sectionInner}>
        <div className={styles.perksSplit}>

          {/* ── Sticky left ── */}
          <div className={styles.perksLeft}>
            <span className={styles.label}>BENEFITS</span>
            <h2 className={styles.sectionTitle}>Why engineers<br />choose AlgoCrew</h2>
            <p className={styles.perksLeftSub}>
              We built the environment we wished existed when we were senior
              engineers tired of bureaucracy, bad code, and clients who didn&apos;t trust us.
            </p>
            <div className={styles.perksLeftStats}>
              {[
                { n: "Top 1%", l: "Engineers" },
                { n: "8+",     l: "Countries" },
                { n: "48h",    l: "First commit" },
              ].map(s => (
                <div key={s.l} className={styles.perksLeftStat}>
                  <span className={styles.perksLeftStatNum}>{s.n}</span>
                  <span className={styles.perksLeftStatLabel}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bento right ── */}
          <div className={styles.bentoCols}>

            {/* Column 1 — moves down on scroll */}
            <div ref={col1Ref} className={styles.bentoCol}>

              {/* Hero card — Remote */}
              <div className={`${styles.bentoCard} ${styles.bentoHero}`}>
                <div className={styles.bentoHeroBg} aria-hidden="true" />
                <div className={styles.bentoHeroIcon}><TbWorld size={28} /></div>
                <div className={styles.bentoHeroNum}>100%</div>
                <h3 className={styles.bentoHeroTitle}>Remote</h3>
                <p className={styles.bentoHeroDesc}>Work from anywhere on Earth. Outcomes matter, not timezones or office hours.</p>
                <div className={styles.bentoHeroDots} aria-hidden="true">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <span key={i} className={styles.bentoHeroDot}
                      style={{ animationDelay: `${i * 0.15}s`, opacity: Math.random() * 0.4 + 0.1 }} />
                  ))}
                </div>
              </div>

              {/* Equity */}
              <div className={styles.bentoCard}>
                <div className={styles.bentoIconWrap}><TbTrendingUp size={18} /></div>
                <h3 className={styles.bentoTitle}>Equity Options</h3>
                <p className={styles.bentoDesc}>Senior engineers receive equity packages. You build it, you own a piece of it.</p>
              </div>

              {/* Health */}
              <div className={`${styles.bentoCard} ${styles.bentoWide}`}>
                <div className={styles.bentoIconWrap}><TbHeartbeat size={18} /></div>
                <div className={styles.bentoWideInner}>
                  <div>
                    <h3 className={styles.bentoTitle}>Health Coverage</h3>
                    <p className={styles.bentoDesc}>Full medical, dental, and vision for you and your dependants.</p>
                  </div>
                  <div className={styles.bentoWidePulse} aria-hidden="true">
                    <span /><span /><span />
                  </div>
                </div>
              </div>

              {/* NDA */}
              <div className={styles.bentoCard}>
                <div className={styles.bentoIconWrap}><TbShieldLock size={18} /></div>
                <h3 className={styles.bentoTitle}>NDA Day One</h3>
                <p className={styles.bentoDesc}>Full confidentiality from the first conversation.</p>
              </div>

            </div>

            {/* Column 2 — moves up on scroll */}
            <div ref={col2Ref} className={styles.bentoCol}>

              {/* Async */}
              <div className={styles.bentoCard}>
                <div className={styles.bentoIconWrap}><TbBolt size={18} /></div>
                <h3 className={styles.bentoTitle}>Async-First</h3>
                <p className={styles.bentoDesc}>Deep work over meetings. Slack, Notion, Loom — not a 9am standup culture.</p>
              </div>

              {/* Elite Projects — tall feature card */}
              <div className={`${styles.bentoCard} ${styles.bentoFeature}`}>
                <div className={styles.bentoFeatureBg} aria-hidden="true" />
                <div className={styles.bentoIconWrap} style={{ position: "relative", zIndex: 1 }}>
                  <TbRocket size={18} />
                </div>
                <h3 className={styles.bentoFeatureTitle}>Elite<br />Projects</h3>
                <p className={styles.bentoFeatureDesc}>Funded startups, enterprise infra, AI-first platforms — not CRUD apps.</p>
                <div className={styles.bentoFeatureTags}>
                  {["Fintech", "AI", "SaaS", "DevOps", "HealthTech"].map(t => (
                    <span key={t} className={styles.bentoFeatureTag}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Learn Budget */}
              <div className={styles.bentoCard}>
                <div className={styles.bentoIconWrap}><TbBook size={18} /></div>
                <h3 className={styles.bentoTitle}>$1,500 / year</h3>
                <p className={styles.bentoDesc}>Annual learning budget for courses, conferences, books, and certs.</p>
              </div>

              {/* Senior-Only + Exit — small pair */}
              <div className={styles.bentoPair}>
                <div className={`${styles.bentoCard} ${styles.bentoPairCard}`}>
                  <div className={styles.bentoIconWrap}><TbUsers size={16} /></div>
                  <h3 className={styles.bentoMiniTitle}>Senior-Only</h3>
                  <p className={styles.bentoMiniDesc}>Top 1% engineers only.</p>
                </div>
                <div className={`${styles.bentoCard} ${styles.bentoPairCard}`}>
                  <div className={styles.bentoIconWrap}><TbCalendarOff size={16} /></div>
                  <h3 className={styles.bentoMiniTitle}>30-Day Exit</h3>
                  <p className={styles.bentoMiniDesc}>Rolling notice, no lock-in.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PROCESS timeline ── */
const process = [
  { Icon: TbFileDescription, n: "01", title: "Apply",            desc: "Send your CV and a short note on the best thing you've shipped. Links beat buzzwords every time." },
  { Icon: TbCode,            n: "02", title: "Async challenge",   desc: "A real-world task in your primary stack. 48–72 hours window, no artificial time pressure." },
  { Icon: TbTargetArrow,     n: "03", title: "Live interview",    desc: "60 minutes with a senior engineer — system design, craft conversation, and culture fit." },
  { Icon: TbPlayerPlay,      n: "04", title: "Paid trial sprint", desc: "One week on a real project, fully compensated. If it clicks, you're officially in the crew." },
];

export function ProcessSection() {
  return (
    <section className={styles.processSection}>
      <div className={styles.sectionInner}>
        <span className={styles.label}>HIRING PROCESS</span>
        <h2 className={styles.sectionTitle}>How we hire</h2>
        <p className={styles.processSub}>
          No recruiters, no HR maze, no ghosting. Four steps from application to offer.
        </p>

        <div className={styles.processTimeline}>
          {process.map(({ Icon, n, title, desc }, i) => (
            <div key={n} className={styles.processStep}>
              {i < process.length - 1 && (
                <div className={styles.processConnector} aria-hidden="true">
                  <div className={styles.processConnectorLine} />
                  <div className={styles.processConnectorArrow} />
                </div>
              )}
              <div className={styles.processIconWrap}>
                <Icon size={22} />
              </div>
              <div className={styles.processContent}>
                <span className={styles.processNum}>{n}</span>
                <h3 className={styles.processTitle}>{title}</h3>
                <p className={styles.processDesc}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
