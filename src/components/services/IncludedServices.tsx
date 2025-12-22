"use client";

import { Column, Flex, Heading, Text, Grid, RevealFx } from "@once-ui-system/core";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ServicesCard.module.scss';

export default function IncludedServices({ service }: { service: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const cards = gsap.utils.toArray(`.${styles.cardItem}`);
    
    // Staggered reveal animation
    gsap.fromTo(cards, 
      { 
        opacity: 0, 
        y: 60,
        rotateX: -15 
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [service]);

  return (
    <>
      {service.includes && service.includes.length > 0 && (
        <Column 
          ref={containerRef}
          maxWidth="m" 
          horizontal="center" 
          gap="64" 
          paddingY="20"
          className={styles.sectionWrapper}
        >
          <Column align="center" gap="16">
            <Text variant="label-strong-s" className={styles.accentTag}>
              SOLUTIONS ECOSYSTEM
            </Text>
            <Heading variant="display-strong-s" align="center">
              Included Services
            </Heading>
            <Text 
              style={{ maxWidth: '600px' }} 
              align="center" 
              onBackground="neutral-weak" 
              variant="body-default-l"
            >
              A comprehensive suite of capabilities designed to empower <strong>{service.name}</strong> from start to finish.
            </Text>
          </Column>

          <Grid
            columns={3} 
            mobileColumns="1"
            fillWidth 
            gap="24"
            className={styles.mainGrid}
          >
            {service.includes.map((childService: any, index: number) => (
              <div 
                key={childService.slug} 
                className={styles.cardItem}
              >
                <div className={styles.cardGlow} />
                <Column 
                  fillWidth 
                  gap="24" 
                  padding="32" 
                  className={styles.cardContent}
                >
                  <Flex fillWidth horizontal="space-between" align="center">
                    <Text variant="label-strong-xs" style={{ opacity: 0.2 }}>
                      0{index + 1}
                    </Text>
                    <div className={styles.cardDot} />
                  </Flex>

                  <Column gap="12">
                    <Heading as="h3" variant="heading-strong-s">
                      {childService.name}
                    </Heading>
                    <Text 
                      variant="body-default-m" 
                      onBackground="neutral-weak"
                      className={styles.cardDescription}
                    >
                      {childService.description}
                    </Text>
                  </Column>

                  <div className={styles.cardFooter}>
                    <div className={styles.line} />
                  </div>
                </Column>
              </div>
            ))}
          </Grid>
        </Column>
      )}
    </>
  );
}