"use client";

import React, { useEffect, useRef } from "react";
import { Heading, Flex, Text, RevealFx, Column, Icon } from "@once-ui-system/core";
import { services } from "@/resources";
import { CtoCalendar } from "@/components/Calendars/CtoCalendar";
import styles from "./ServicesHero.module.scss";
import gsap from "gsap";

export const ServicesHero = () => {
  const visualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smoother floating animation with staggered start
      gsap.to(".floating-node", {
        y: "random(-30, 30)",
        x: "random(-15, 15)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.4,
          from: "random"
        }
      });

      // Subtle rotation for the nodes
      gsap.to(".floating-node", {
        rotation: "random(-10, 10)",
        duration: "random(4, 6)",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }, visualRef);
    return () => ctx.revert();
  }, []);

  return (
    <Flex 
      fillWidth 
      minHeight="96" 
      paddingY="80" 
      mobileDirection="column" 
      align="center"
      className={styles.heroWrapper}
    >
      {/* LEFT: Text Content */}
      <Column flex={6} gap="24" className={styles.textContent} align="start">
        <RevealFx translateY="8">
            <Text variant="label-strong-s" style={{ color: "#00ccccf0", letterSpacing: '0.3em' }}>
            OUR EXPERTISE
            </Text>
        </RevealFx>

        <Heading wrap="balance" variant="display-strong-l" marginTop="16">
          {services?.headline?.split(' ').map((word, i) => (
            <span key={i} style={word.toLowerCase() === 'digital' || word.toLowerCase() === 'growth' ? {color: '#00ccccf0'} : {}}>
              {word}{' '}
            </span>
          ))}
        </Heading>

        <RevealFx translateY="12" delay={0.3}>
          <Text onBackground="neutral-weak" variant="body-default-l" style={{ maxWidth: '480px' }}>
            {services.subline}
          </Text>
        </RevealFx>

        <Column fillWidth minHeight="80" vertical="center" marginTop="24">
          <CtoCalendar />
        </Column>
      </Column>

      {/* RIGHT: Polished Visual Side */}
      <Flex 
        flex={5} 
        fillWidth 
        position="relative" 
        content="center" 
        align="center"
        ref={visualRef}
        className={styles.visualSide}
      >
        <div className={styles.glowOrb} />
        
        {/* Node 1: Dev */}
        <div className={`${styles.iconNode} floating-node`} style={{ top: '5%', left: '15%' }}>
          <Icon name="code" size="m" style={{ color: "#00ccccf0" }} />
          <span>DEV</span>
        </div>

        {/* Node 2: Launch */}
        <div className={`${styles.iconNode} floating-node`} style={{ bottom: '15%', right: '10%' }}>
          <Icon name="rocket" size="m" />
          <span>SCALE</span>
        </div>

        {/* Node 3: Secure */}
        <div className={`${styles.iconNode} floating-node`} style={{ top: '35%', right: '5%' }}>
          <Icon name="shield" size="s" onBackground="neutral-medium" />
          <span>SECURE</span>
        </div>

        {/* Node 4: Cloud */}
        <div className={`${styles.iconNode} floating-node`} style={{ bottom: '30%', left: '5%' }}>
          <Icon name="grid" size="s" onBackground="neutral-medium" />
          <span>CLOUD</span>
        </div>
        
        {/* Central Core */}
        <Flex 
          className={styles.centralModule}
          padding="40" 
          radius="xl" 
          align="center" 
          content="center"
        >
          <div style={{ opacity: 0.4 }}>
            <Icon name="globe" size="xl" />
          </div>
          <Text variant="label-strong-xs" style={{ position: 'absolute', bottom: '24px' }}>
            ALGO CREW
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
