"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WhyChooseUs.module.scss";

const features = [
  { title: "Global Reach", tag: "North America & EU", desc: "Strategically headquartered in Canada with a global network of elite engineers." },
  { title: "Speed to Market", tag: "48hr Matching", desc: "Deploy world-class talent in days, not months. From brief to kickoff in 48 hours." },
  { title: "Top 1% Talent", tag: "Vetted Quality", desc: "A rigorous 5-stage vetting process for both technical mastery and soft skills." },
  { title: "AI-First", tag: "Future-Proof", desc: "Integrating LLMs and modern cloud infrastructure into every workflow." },
  { title: "Security First", tag: "Enterprise-Grade", desc: "Built with SOC 2–aligned practices and secure-by-design architecture." },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(`.${styles.featureRow}`).forEach((row) => {
        gsap.fromTo(row,
          { opacity: 0, x: 40 },
          {
            opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="why">
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.label}>THE ALGOCREW EDGE</span>
          <h2 className={styles.statement}>
            Why top<br />
            companies<br />
            <span className={styles.accent}>trust us.</span>
          </h2>
          <p className={styles.leftSub}>
            We blend engineering excellence with business strategy to deliver measurable impact.
          </p>
          <div className={styles.stat}>
            <span className={styles.statNum}>98%</span>
            <span className={styles.statLabel}>Client satisfaction rate</span>
          </div>
        </div>

        <div className={styles.right}>
          {features.map((f, i) => (
            <div key={i} className={styles.featureRow}>
              <div className={styles.featureLeft}>
                <span className={styles.featureTag}>{f.tag}</span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
              </div>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
