"use client";

import React, { useEffect, useRef } from 'react';
import { Flex, Heading, Text, Column, Media, Icon, Button, RevealFx } from "@once-ui-system/core";
import gsap from 'gsap';
import styles from "./ServiceHero.module.scss";
import { InfoCalendar } from '../Calendars/InfoCalendar';

export default function ServiceHero({ service }: { service: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualStageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5);
        const yPos = (clientY / window.innerHeight - 0.5);

        // Tilt the main stage
        gsap.to(visualStageRef.current, {
          rotateY: xPos * 10,
          rotateX: yPos * -10,
          duration: 1.2,
          ease: "power2.out"
        });

        // Dynamic floating movement for the glass cards
        gsap.to(".glass-float-top", {
          x: xPos * 40,
          y: yPos * 20,
          duration: 1.5,
          ease: "power3.out"
        });

        gsap.to(".glass-float-bottom", {
          x: xPos * -30,
          y: yPos * -40,
          duration: 2,
          ease: "power3.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <Flex 
      ref={containerRef}
      fillWidth 
      minHeight="104" 
      paddingY="104"
      className={styles.heroWrapper}
      horizontal="center"
    >
      <Flex fillWidth maxWidth="m" mobileDirection="column" align="center" gap="64">
        
        <Column flex={6} gap="48" className={styles.textStack} align='start'>
          <Column gap="16">
              <Text variant="label-strong-s" className={styles.tagline}>
                  {service.category || 'PREMIUN SERVICE'}
              </Text>
              <Heading variant="display-strong-l" className={styles.mainTitle}>
                  {service.name}
              </Heading>
          </Column>

          <Text variant="body-default-xl" onBackground="neutral-weak" className={styles.description}>
              {service.description}
          </Text>

          <Column gap="24">
            {service.highlights?.map((text: string, index: number) => (
                <Flex key={index} align="center" gap="16" className={styles.alignItems}>
                    <div className={styles.iconCircle}>
                        <Icon name={index === 0 ? "rocket" : "globe"} size="s" />
                    </div>
                    <Text variant="body-default-m" onBackground="neutral-weak">{text}</Text>
                </Flex>
            )) || (
                <>
                    <Flex align="center" gap="16">
                        <div className={styles.iconCircle}><Icon name="bolt" size="s" /></div>
                        <Text variant="body-default-m" onBackground="neutral-weak">Optimized for high-performance delivery</Text>
                    </Flex>
                    <Flex align="center" gap="16">
                        <div className={styles.iconCircle}><Icon name="layers" size="s" /></div>
                        <Text variant="body-default-m" onBackground="neutral-weak">Modular & Scalable architecture</Text>
                    </Flex>
                </>
            )}
          </Column>

          <Flex gap="16" marginTop="24">
              <Button 
                  href="/contact" 
                  variant="primary" 
                  size="l" 
                  weight="strong">
                  Start a Project
              </Button>

              <Button 
                  href="/projects" 
                  variant="secondary" 
                  size="l">
                  View Case Studies
              </Button>              
          </Flex>
        </Column>

        <Column flex={6} className={styles.visualSide}>
          <div className={styles.perspectiveWrapper}>
            <div ref={visualStageRef} className={styles.mainStage}>
              
              <div className={styles.imageWindow}>
                <Media
                  alt={service.name}
                  src={service.side_image}
                  className={styles.heroImage}
                />
                <div className={styles.glassFinish} />
              </div>

              <div className={`${styles.glassCard} glass-float-top`}>
                <Flex direction="column" gap="4">
                    <Text variant="label-strong-xs" className={styles.cardLabel}>AVAILABILITY</Text>
                    <Heading variant="heading-strong-m" style={{color: '#00ccccf0'}}>
                        {service.metric_value || "99.9%"}
                    </Heading>
                </Flex>
              </div>

              <div className={`${styles.glassCard} glass-float-bottom`}>
                <Flex align="center" gap="12">
                   <div className={styles.statusPulse} />
                   <Column>
                        <Text variant="label-strong-xs" className={styles.cardLabel}>STATUS</Text>
                        <Text variant="body-default-s" weight="strong">{service.status}</Text>
                   </Column>
                </Flex>
              </div>
            </div>
          </div>
        </Column>
      </Flex>
    </Flex>
  );
}
