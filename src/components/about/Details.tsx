"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./details.module.scss";

const stats = [
  { num: 98, suffix: "%", label: "Client Retention Rate",        desc: "Clients stay — because results compound over time." },
  { num: 8,  suffix: " yrs", label: "Avg. Engineer Experience",  desc: "Senior-only bench. No juniors on production code." },
  { num: 0,  suffix: "",     label: "Critical Incidents in Prod", desc: "SOC 2–aligned, secure-by-design. Zero P0s ever." },
  { num: 120, suffix: "+",   label: "Production Deployments",    desc: "Shipped, scaled, and battle-tested globally." },
];

export default function Details() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const nums = gsap.utils.toArray<HTMLElement>(`.${styles.num}`);
      nums.forEach((el) => {
        const target = parseInt(el.dataset.target || "0");
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(el,
              { innerText: 0 },
              {
                innerText: target, duration: 2, snap: { innerText: 1 }, ease: "power2.out",
                onUpdate: function() { el.innerText = Math.round(+el.innerText).toString(); }
              }
            );
          },
          once: true,
        });
      });

      gsap.fromTo(`.${styles.statCard}`,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="stats">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>BY THE NUMBERS</span>
          <h2 className={styles.heading}>Quality you can<br /><span className={styles.accent}>count on.</span></h2>
        </div>
        <div className={styles.grid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <div className={styles.numRow}>
                {s.num === 0
                  ? <span className={styles.num} style={{ fontSize: "clamp(3rem,5vw,5rem)" }}>Zero</span>
                  : <><span className={styles.num} data-target={s.num}>0</span>
                     <span className={styles.suffix}>{s.suffix}</span></>
                }
              </div>
              <p className={styles.statLabel}>{s.label}</p>
              <p className={styles.statDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
