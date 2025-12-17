"use client"

import React, { useEffect, useRef } from 'react';
import styles from './details.module.scss';
import { Heading, Text, Flex } from '@once-ui-system/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Details() {
  const containerRef = useRef(null);

  const stats = [
    { number: "20", label: "Projects", desc: "Successfully delivered precision-engineered digital products." },
    { number: "8", label: "Happy Clients", desc: "Partnering with global brands to solve complex problems." },
    { number: "5", label: "Years Exp.", desc: "Over half a decade of technical mastery and innovation." }
  ];

  return (
    <section ref={containerRef} className={styles.aboutUsContainer}>
      <div className={styles.contentWrapper}>
        
        <div className={`${styles.textSection} reveal-text`}>
          <div className={styles.badge}>About Us</div>
          <Heading wrap="balance" variant="display-strong-s" className="mb-4">
            Driving Innovation Through <span className={styles.highlight}>Technical Mastery</span>
          </Heading>
          <Text wrap="balance" onBackground="neutral-weak" variant="body-default-l">
            At AlgoCrew, we aren't just developers; we are architects of the digital future. We specialize in delivering top-tier solutions tailored to the high-stakes needs of modern enterprise.
          </Text>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={`${styles.statCard} stat-card`}>
              <div className={styles.statHeader}>
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.plus}>+</span>
              </div>
              <p className={styles.statLabel}>{stat.label}</p>
              <Text variant="body-default-s" onBackground="neutral-weak" className="mt-2">
                {stat.desc}
              </Text>
              <div className={styles.cardGradient} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
