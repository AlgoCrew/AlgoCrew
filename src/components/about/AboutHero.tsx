"use client";

import React, { useEffect, useRef } from 'react';
import { Heading, Text, Flex, Button, Column, Row, Background } from "@once-ui-system/core";
import gsap from 'gsap';
import styles from './AboutHero.module.scss';
import { CeoCalendar } from '../Calendars/CeoCalendar';

export default function AboutHero() {
    const heroRef = useRef(null);
    const visualRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            
            // Refined Cinematic Entrance
            tl.from(".reveal-up", {
                y: 40,
                opacity: 0,
                filter: "blur(12px)",
                stagger: 0.15,
                duration: 1,
                ease: "power3.out"
            });

            // Subtle parallax for the abstract elements
            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const moveX = (clientX / window.innerWidth - 0.5) * 25;
                const moveY = (clientY / window.innerHeight - 0.5) * 25;
                
                gsap.to(visualRef.current, {
                    x: moveX,
                    y: moveY,
                    duration: 1.2,
                    ease: "power2.out"
                });
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <Background
                position="absolute"
                gradient={{
                    display: true,
                    opacity: 40,
                    x: 80,
                    y: 20,
                    width: 100,
                    height: 100,
                    tilt: 0,
                    colorStart: 'brand-alpha-strong',
                    colorEnd: 'static-transparent',
                }}
                dots={{
                    display: true,
                    opacity: 40,
                    size: 's',
                    color: 'brand-alpha-strong',
                }}
            />

            <section ref={heroRef} className={`${styles.heroWrapper} px-6 md:px-16 z-2`}>
                {/* Adaptive Background using Once UI system */}
                
                <div className={styles.container}>
                    <Row mobileDirection="column" gap="48" vertical="center">
                        <Column flex={1}>
                            <div className={`${styles.badge} reveal-up`}>
                                Since 2019
                            </div>
                            <Heading 
                                variant="display-strong-l" 
                                className="reveal-up mb-24"
                            >
                                Engineering with <span className={styles.highlight}>Human Purpose.</span>
                            </Heading>
                            <Text 
                                variant="heading-default-m" 
                                onBackground="neutral-weak" 
                                className="reveal-up mb-40"
                            >
                                We are more than a dev shop. AlgoCrew is a dedicated partner that transforms complex business logic into elegant, scalable digital systems.
                            </Text>

                            <Column textVariant="body-default-l" fillWidth>
                                <CeoCalendar />
                            </Column>

                            {/* <Flex gap="16" className="reveal-up">
                                <Button size="l" variant="primary" suffixIcon="chevronRight">
                                    Start Building
                                </Button>
                                <Button size="l" variant="secondary">
                                    View Portfolio
                                </Button>
                            </Flex> */}
                        </Column>

                        <Column flex={1} className={styles.visualColumn}>
                            <div ref={visualRef} className={styles.visualContainer}>
                                {/* Glassmorphic Technical Abstract */}
                                <div className={`${styles.glowOrb} float-element`} />
                                <div className={`${styles.glassCard} float-element`}>
                                    <div className={styles.line} style={{ width: '100%', opacity: 0.4 }} />
                                    <div className={styles.line} style={{ width: '70%', background: 'var(--brand-solid-strong)' }} />
                                    <div className={styles.line} style={{ width: '85%', opacity: 0.2 }} />
                                    <div className={styles.cardHeader}>
                                        <div className={styles.dot} />
                                        <div className={styles.dot} />
                                        <div className={styles.dot} />
                                    </div>
                                </div>
                            </div>
                        </Column>
                    </Row>
                </div>
            </section>
        </>
    );
}
