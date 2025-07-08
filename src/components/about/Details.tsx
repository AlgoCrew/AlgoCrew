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
            Our Services
          </Heading>

          <Text wrap="balance" onBackground="neutral-weak" variant="body-default-m">
            At AlgoCrew, we are committed to driving innovation and excellence in the world of IT. As a dynamic and forward-thinking software company, we specialize in providing top-tier IT solutions and services designed to meet the evolving needs of businesses across various sectors.
          </Text>
        </div>

        <div className={styles.statsSection}>
          <div className={styles.statItem}>
            <div className={styles.statNumberContainer}>
              <span className={styles.statNumber}>65<span className={styles.statNumberPlus}>+</span></span>
              <p className={styles.statLabel}>Projects</p>
            </div>

            <Text onBackground="neutral-weak" variant="body-default-m" className={styles.statDescription}>
              Successfully delivered 65+ project to our clients
            </Text>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statNumberContainer}>
              <span className={styles.statNumber}>48<span className={styles.statNumberPlus}>+</span></span>
              <p className={styles.statLabel}>Happy Clients</p>
            </div>

            <Text onBackground="neutral-weak" variant="body-default-m" className={styles.statDescription}>
              Delivered custom designed and tailored solutions to our clients
            </Text>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statNumberContainer}>
              <span className={styles.statNumber}>7<span className={styles.statNumberPlus}>+</span></span>
              <p className={styles.statLabel}>Years of Experience</p>
            </div>

            <Text onBackground="neutral-weak" variant="body-default-m" className={styles.statDescription}>
              A journey of more than 7 years
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}