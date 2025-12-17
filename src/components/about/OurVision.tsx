"use client";

import React, { useEffect, useRef } from 'react';
import { Heading, Row, Column, Particle, Flex, Text } from "@once-ui-system/core";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './OurVision.module.scss'; // Note: New SCSS file

export const OurVision = ({ commingData }: { commingData: any }) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // 1. Text reveal (Same as Mission)
      gsap.from(".vision-line", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 80%" }
      });

      // 2. Floating Parallax (Same effect, different elements)
      const cards = visualRef.current.querySelectorAll('.floating-element');
      cards.forEach((card: any, i: number) => {
        // Reverse direction for variety (y: positive value)
        gsap.to(card, {
          y: 30 * (i + 1), 
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
    <section ref={sectionRef} className={styles.visionWrapper}>
      <div className={styles.container}>
        <Row mobileDirection="column-reverse" gap="64" vertical="center">          
          <Column flex={2} className={styles.visualColumn}>
            <div ref={visualRef} className={styles.techVisualContainer}>
              <div className={styles.gridOverlay} />
              
              {/* Abstract Trajectory Visuals */}
              <div className={`${styles.trajectoryLine} floating-element`} />
              
              <div className={`${styles.glassCard} floating-element ${styles.cardnode1}`}>
                 <Flex vertical="center" gap="8">
                    <div className={styles.nodeDot} />
                    <Text variant="body-default-s">Present State</Text>
                 </Flex>
              </div>

              <div className={`${styles.glassCard} floating-element ${styles.cardnode2}`}>
                 <Flex vertical="center" gap="8">
                    <div className={styles.nodeDot} style={{background: 'var(--brand-solid-strong)'}}/>
                    <Text variant="body-default-s" style={{color: 'var(--brand-solid-strong)'}}>Future Horizon</Text>
                 </Flex>
                 <div className={styles.growthArrow}>↑ 240% Growth</div>
              </div>

              <div className={styles.glowOrb} />
            </div>
          </Column>

          <Column flex={3}>
            <div ref={textRef} className={styles.textStack}>
              <div className="vision-line">
                <span className={styles.preTitle}>Our Horizon</span>
              </div>

              <div className="vision-line">
                <Heading variant="display-strong-xs" as='h3' className={styles.mainTitle}>
                  {commingData.title}
                </Heading>
              </div>
              
              {/* Reusing the injected content structure */}
              <div className={`${styles.injectedContent} vision-line`}>
                {commingData.description}
              </div>
            </div>
          </Column>
        </Row>
      </div>
    </section>
  );
};
