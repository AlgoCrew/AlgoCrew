"use client"
import React, { useEffect, useState } from 'react';
import styles from './details.module.scss'; // Importing the CSS Module
import { Heading, Row, Text } from '@once-ui-system/core';

export default function Details() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.aboutUsContainer}>
      <div
        className={`${styles.contentWrapper} ${
          isVisible ? styles.fadeInVisible : styles.fadeInHidden
        }`}
      >
        <div className={styles.textSection}>
          <p className={styles.aboutUsSubtitle}>About Us</p>
          <Heading wrap="balance" variant="display-strong-s" paddingBottom="16">
            Driving Innovation
          </Heading>

          <Text wrap="balance" onBackground="neutral-weak" variant="body-default-m">
            At AlgoCrew, we are dedicated to driving innovation and excellence in the IT industry. As a dynamic and forward-thinking technology partner, we specialize in delivering top-tier IT solutions and services tailored to address the ever-changing needs of businesses across diverse sectors.
          </Text>
        </div>

        <div className={styles.statsSection}>
          <div className={styles.statItem}>
            <div className={styles.statNumberContainer}>
              <span className={styles.statNumber}>20<span className={styles.statNumberPlus}>+</span></span>
              <p className={styles.statLabel}>Projects</p>
            </div>

            <Text onBackground="neutral-weak" variant="body-default-m" className={styles.statDescription}>
              Successfully delivered 20+ project to our clients
            </Text>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statNumberContainer}>
              <span className={styles.statNumber}>8<span className={styles.statNumberPlus}>+</span></span>
              <p className={styles.statLabel}>Happy Clients</p>
            </div>

            <Text onBackground="neutral-weak" variant="body-default-m" className={styles.statDescription}>
              Delivered custom designed and tailored solutions to our clients
            </Text>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statNumberContainer}>
              <span className={styles.statNumber}>5<span className={styles.statNumberPlus}>+</span></span>
              <p className={styles.statLabel}>Years of Experience</p>
            </div>

            <Text onBackground="neutral-weak" variant="body-default-m" className={styles.statDescription}>
              A journey of more than 5 years
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}