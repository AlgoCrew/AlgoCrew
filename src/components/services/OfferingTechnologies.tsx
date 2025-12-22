import React from 'react';
import styles from './Technologies.module.scss';
import { Column, Heading, Text } from "@once-ui-system/core";
import { MarqueeController } from "./MarqueeController";
import { offeringTechnologies } from "@/resources";

export function OfferingTechnologies() {
  return (
    <section className={styles.section}>
      <Column fillWidth horizontal="center" gap="48" className="z-2">
        <Column align="center" gap="16" className="px-6 text-center">
          <Heading variant="display-strong-s">
            Engineered with <span className={styles.accent}>Industry Leaders</span>
          </Heading>

          <Text className={styles.sectionDescription} variant="heading-default-s">
             Crafted to evolve, scale, and remain secure over time
          </Text>
        </Column>

        <div className={styles.marqueeWrapper}>
          <MarqueeController direction={1} speed={80}>
            <div className={styles.marqueeContent}>
              {offeringTechnologies.map((tech, i) => (
                <TechCard key={`row1-${i}`} tech={tech} />
              ))}
            </div>
          </MarqueeController>

          <MarqueeController direction={-1} speed={100}>
            <div className={styles.marqueeContent}>
              {[...offeringTechnologies].reverse().map((tech, i) => (
                <TechCard key={`row2-${i}`} tech={tech} />
              ))}
            </div>
          </MarqueeController>
        </div>
      </Column>
    </section>
  );
}

const TechCard = ({ tech }: { tech: any }) => (
  <div className={styles.techCard}>
    <img 
      src={tech.iconName} 
      alt={tech.name} 
      className={styles.techIcon} 
      loading="lazy" 
    />
    <Text variant="label-strong-s" className={styles.techName}>{tech.name}</Text>
  </div>
);
