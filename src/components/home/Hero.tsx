"use client";

import { useEffect, useRef } from "react";
import { Heading, Text, Column, Flex, Button, Row, RevealFx, Badge } from "@once-ui-system/core";
import { routes } from "@/resources";
import gsap from "gsap";
import styles from "./Hero.module.scss";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main card float
      gsap.to(".floating-card", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Satellite cards counter-float (moves opposite to main card)
      gsap.to(".satellite-card", {
        y: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });

      const moveHandler = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20;
        const y = (clientY / window.innerHeight - 0.5) * 20;
        gsap.to(".parallax-layer", { x, y, duration: 1, ease: "power2.out" });
      };
      window.addEventListener("mousemove", moveHandler);
      return () => window.removeEventListener("mousemove", moveHandler);
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.heroWrapper}>
      <div className={styles.brandGlow} />
      
      <Flex fillWidth maxWidth="xl" horizontal="center" vertical="center" className={styles.mainFlex}>
        
        {/* LEFT: Content */}
        <Column maxWidth="m" gap="32" zIndex={1}>
          <RevealFx translateY="12">
            <Badge background="brand-alpha-weak" className={styles.badge}>
              <span className={styles.liveDot} />
              SYSTEMS ONLINE • ARCHITECTING 2025
            </Badge>
          </RevealFx>

          <Column gap="16">
            <RevealFx translateY="20" delay={0.2}>
              <Heading variant="display-strong-xl" onBackground="neutral-strong" className={styles.title}>
                Engineering <br />
                <span className={styles.accentText}>Digital Resilience.</span>
              </Heading>
            </RevealFx>
            <RevealFx translateY="20" delay={0.4}>
              <Text variant="body-default-xl" onBackground="neutral-weak" className={styles.subline}>
                We bridge the gap between complex backend architecture and world-class user experiences. Built for Fintech, Health, and Cloud-native pioneers.
              </Text>
            </RevealFx>
          </Column>

          <RevealFx translateY="20" delay={0.6}>
            <Row gap="16" vertical="center">
              <Button href='/projects' variant="primary" size="l" weight="strong">
                Explore Archive
              </Button>
              <Button href='/contact' variant="secondary" size="l">
                Start a Project
              </Button>
            </Row>
          </RevealFx>
        </Column>

        {/* RIGHT: Floating System Card + Satellites */}
        <div className={`${styles.cardContainer} parallax-layer`}>
          <div className={`${styles.glowOrb} float-element`} />

          {/* Satellite Card 1: Analytics */}
          <div className={`${styles.miniCardAnalytics} satellite-card`}>
             <Text variant="label-default-xs" style={{opacity: 0.5}}>NODE_TRAFFIC</Text>
             <Text variant="label-strong-s" style={{color: '#00cccc'}}>+240%</Text>
          </div>

          {/* Satellite Card 2: Security */}
          <div className={`${styles.miniCardSecurity} satellite-card`}>
             <div className={styles.securityPulse} />
             <Text variant="label-default-xs">SSL_ACTIVE</Text>
          </div>

          {/* Main Card */}
          <div className={`${styles.floatingCard} floating-card`}>
            <Column gap="20">
              <Row horizontal="center" vertical="center">
                <Text variant="label-strong-s" onBackground="neutral-weak">INFRASTRUCTURE STATUS</Text>
              </Row>
              <div className={styles.divider} />
              <Column gap="12">
                <Flex horizontal="center">
                  <Text variant="label-default-s">Uptime</Text>
                  <Text variant="label-strong-s" style={{color: '#00cccc'}}>99.99%</Text>
                </Flex>
                <div className={styles.loadingBar}><div style={{width: '94%'}} /></div>
                <Flex horizontal="center">
                  <Text variant="label-default-s">Deployment Speed</Text>
                  <Text variant="label-strong-s" style={{color: '#00cccc'}}>2.4ms</Text>
                </Flex>
              </Column>
              <div className={styles.cardFooter}>
                <Text variant="label-default-xs">ACTIVE ENCRYPTION: AES-256</Text>
              </div>
            </Column>
          </div>
        </div>
      </Flex>

      <div className={styles.scrollZone}>
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
      </div>
    </section>
  );
}
