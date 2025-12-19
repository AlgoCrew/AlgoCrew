"use client"

import React, { useEffect, useRef } from 'react';
import styles from './ProcessStep.module.scss';
import { Flex, Heading, Text } from '@once-ui-system/core';
import { FaRegLightbulb, FaCogs, FaSyncAlt } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const IconComponents: { [key: string]: React.ElementType } = {
    FaRegLightbulb, FaCogs, FaSyncAlt
};

export function ProcessSteps() {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const ctx = gsap.context(() => {
            // Animating the header first
            gsap.from(".section-content", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: ".section-content",
                    start: "top 85%",
                }
            });

            // Improved staggered entrance for steps
            gsap.from(".process-card", {
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".process-card",
                    start: "top 90%",
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const steps = [
        { id: "1", title: "Think", icon: 'FaRegLightbulb', desc: "We prioritize understanding user requirements to align system architecture perfectly." },
        { id: "2", title: "Create", icon: 'FaCogs', desc: "We translate requirements into solutions with precision and transparent progress." },
        { id: "3", title: "Iterate", icon: 'FaSyncAlt', desc: "We evolve designs through rapid feedback loops and rigorous performance testing." }
    ];

    return (
        <section ref={containerRef} className={styles.processSectionContainer}>
            <div className={styles.processContentWrapper}>
                <div className={`${styles.sectionHeader} section-content`}>
                    <Heading wrap="balance" variant="display-strong-s" className="mb-3">
                        Our <span className={styles.accent}>Engineering</span> Cycle
                    </Heading>
                    <Text variant="body-default-l" onBackground="neutral-weak" className="text-center mt-3 mx-auto" style={{ maxWidth: '500px' }}>
                        A systematic approach to solving complex problems through modular design and rapid deployment.
                    </Text>
                </div>

                <div className={styles.processStepsGrid}>
                    {steps.map((step, index) => (
                        <div key={step.id} className={`${styles.processCard} process-card`}>
                            <div className={styles.iconContainer}>
                                <div className={styles.stepCircle}>
                                    {React.createElement(IconComponents[step.icon], { size: 32 })}
                                </div>
                                <span className={styles.stepNumber}>{step.id}</span>
                                {index < steps.length - 1 && <div className={styles.desktopConnector} />}
                            </div>
                            <Heading variant="heading-strong-m" className="mt-4 mb-2">
                                {step.title}
                            </Heading>
                            <Text variant="body-default-m" onBackground="neutral-weak">
                                {step.desc}
                            </Text>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}