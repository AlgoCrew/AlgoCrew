
"use client";

import React, { useEffect } from 'react';
import styles from './ProcessStep1.module.scss'; // Keeping original styles import
import { Column, Heading, Text, RevealFx } from '@once-ui-system/core';
import {
    FaUserShield, FaChartLine, FaCloud
} from 'react-icons/fa'; // Using new Font Awesome icons for features/values
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Background, opacity, SpacingToken  } from "@once-ui-system/core";
import { effects} from '@/resources';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const IconComponents: { [key: string]: React.ElementType } = {
    FaUserShield, // Security/Trust
    FaChartLine,  // Growth/Performance
    FaCloud       // Modern/Cloud Solutions
};

export function WhyChooseUs() {
    useEffect(() => {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        gsap.matchMedia().add(
            {
                // Desktop and larger screens
                isDesktop: '(min-width: 768px)',
                // Small screens
                isMobile: '(max-width: 767px)',
            },
            (context) => {
                let { isDesktop, isMobile } = context.conditions || {};

                for (let i = 1; i <= 3; i++) {
                    gsap.fromTo(
                        `.processStep-${i}`,
                        {
                            opacity: 0,
                            // Set y based on screen size
                            y: isDesktop ? 30 * i * 2 : 30,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 4 * i,
                            delay: i * 1,
                            scrollTrigger: {
                                trigger: `.processStep-${i}`,
                                start: 'top 100%',
                                end: 'top 40%',
                                scrub: true,
                                toggleActions: 'play none none none',
                            },
                        }
                    );
                }
            }
        );
    }, []);

    return (
        <>
            <div className={`z-10 ${styles.processSectionContainer}`}>
                <div className={styles.processContentWrapper}>
                    <div className={`${styles.sectionHeader} pt-32 md:pt-0`}>
                        <Heading
                            wrap="balance"
                            variant="display-strong-s"
                            className={`mb-3 ${styles.stepTitle}`}
                        >
                            Why Choose AlgoCrew?
                        </Heading>

                        <div className={styles.processHeaderUnderline}></div>

                        <Text className={styles.sectionDescription} onBackground="neutral-weak" variant="heading-default-s">
                            Our principles are built around your success. We guarantee performance, transparency, and future-proof technology.
                        </Text>
                    </div>

                    <div className={styles.processStepsContainer}>
                        <ContentItem
                            index="1"
                            title="Unwavering Reliability"
                            description="We build robust, scalable, and secure applications designed for mission-critical operations, ensuring maximum uptime and data integrity."
                            icon={'FaUserShield'}
                        />

                        <ContentItem
                            index="2"
                            title="Focus on Growth"
                            description="Every solution is engineered for peak performance and optimized to reduce long-term operational costs, driving measurable business growth."
                            icon={'FaChartLine'}
                        />

                        <ContentItem
                            index="3"
                            title="Future-Proof Technology"
                            description="We specialize in modern cloud-native architectures, ensuring your software is adaptable, easily maintained, and ready for tomorrow's challenges."
                            icon={'FaCloud'}
                        />
                    </div>
                </div>
            </div>

            <Background
                position="fixed"
                mask={{
                    x: 100,
                    y: 0,
                    radius: effects.mask.radius,
                    cursor: effects.mask.cursor,
                }}

                dots={{
                    display: effects.dots.display,
                    opacity: 0 as opacity,
                    size: effects.dots.size as SpacingToken,
                    color: effects.dots.color,
                }}
            />
        </>
    );
}

const ContentItem = ({
    index, // Changed 'number' to 'index' for semantic clarity
    title,
    description,
    icon,
}: {
    index: string;
    title: string;
    description: string;
    icon: string;
}) => {

    const IconComponent = icon ? IconComponents[icon] : null;

    return (
        // Use a new class name 'contentStep' and the index for animation targeting
        <div className={`${styles.contentStep} contentStep-${index}`}>
            <div className={styles.processStepIconWrapper}>
                <div className={`${styles.stepCircleBase} ${styles.glowingBorder}`}>
                    {IconComponent && (
                        <IconComponent size={48} className={styles.faIcon} /> // Render the icon
                    )}
                </div>
            </div>

            <div className={styles.stepContent}>
                <Heading
                    wrap="balance"
                    className={`mb-3 ${styles.stepTitle}`}
                >
                    {title}
                </Heading>

                <p className={styles.stepDescription}>
                    {description}
                </p>
            </div>
        </div>
    );
};