"use client";

import React, { useEffect, useRef } from 'react';
import { Heading, Text, Row, Column, Particle, Flex } from "@once-ui-system/core";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './OurMission.module.scss';

export const OurMission = ({ commingData }: { commingData: any }) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const visualRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // 1. Text reveal
      gsap.from(".mission-line", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 80%" }
      });

      const container = visualRef.current;
      if (!container) return;
      const cards = container?.querySelectorAll('.floating-card');
      cards.forEach((card: any, i: number) => {
        gsap.to(card, {
          y: -40 * (i + 1),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.missionWrapper}>
      <div className={styles.container}>
        <Row mobileDirection="column" gap="64" vertical="center">
        
          <Column flex={3}>
            <div ref={textRef} className={styles.textStack}>
              <div className="mission-line">
                <span className={styles.preTitle}>Our Purpose</span>
              </div>

              <div className="mission-line py-3">
                <Heading variant="display-strong-xs" as="h3" className={styles.mainTitle}>
                  {commingData.title}
                </Heading>
              </div>
              
              <div className={`${styles.injectedContent} mission-line`}>
                {commingData.description}
              </div>
            </div>
          </Column>

          <Column flex={2} className={styles.visualColumn}>
            <div ref={visualRef} className={styles.techVisualContainer}>
              <div className={styles.gridOverlay} />
              
              {/* Floating Glass Cards */}
              <div className={`${styles.glassCard} floating-card ${styles.card1}`}>
                <div className={styles.cardHeader}><div className={styles.dot} /><span>System Architecture</span></div>
                <div className={styles.bar} style={{width: '90%'}} />
                <div className={styles.bar} style={{width: '60%'}} />
              </div>

              <div className={`${styles.glassCard} floating-card ${styles.card2}`}>
                <Flex vertical="center" gap="12">
                   <div className={styles.pulseDot} />
                   <Text variant="body-default-s">Live Deployment</Text>
                </Flex>
              </div>

              <div className={`${styles.glassCard} floating-card ${styles.card3}`}>
                 <Heading variant="display-strong-xs" style={{color: 'var(--brand-solid-strong)'}}>99.9%</Heading>
                 <Text variant="body-default-xs">Scalability Index</Text>
              </div>

              <div className={styles.glowOrb} />
            </div>
          </Column>
        </Row>
      </div>
    </section>
  );
};
