"use client";

import React, { useEffect } from 'react';
import styles from './ProcessStep1.module.scss'; // Keeping original styles import

import { Column, Heading, Text, Flex, Background, SpacingToken, opacity, ToggleButton } from '@once-ui-system/core';
import { FaUserShield, FaChartLine, FaCloud, FaRocket, FaHandshake, FaSyncAlt } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { effects } from '@/resources';
import { usePathname } from "next/navigation";
import { ThemeLogo } from '../ThemeLogo';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const features = [
    {
        title: "Global Reach, Local Expertise",
        description: "Headquartered in Canada with delivery capabilities across North America and internationally.",
        icon: <FaUserShield />,
        image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=800&auto=format&fit=crop",
        size: "large" 
    },
    {
        title: "Rapid Deployment",
        description: "Access qualified IT professionals in days, not months.",
        icon: <FaRocket />,
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
        size: "small"
    },
    {
        title: "Flexible Engagement",
        description: "Staff augmentation, dedicated teams, or turnkey project delivery.",
        icon: <FaHandshake />,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
        size: "small"
    },
    {
        title: "Quality Guaranteed",
        description: "Rigorous vetting processes ensure you get top-tier talent every time.",
        icon: <FaChartLine />,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        size: "medium"
    },
    {
        title: "Transparent Communication",
        description: "Regular updates, clear milestones, and responsive support.",
        icon: <FaCloud />,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
        size: "medium"
    },
    {
        title: "Future-Ready Solutions",
        description: "Leveraging AI and modern cloud architectures to keep your business ahead of the curve.",
        icon: <FaSyncAlt />, // Consider importing FaBrain or FaLightbulb for this
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
        size: "medium"
    }
];

export function WhyChooseUs() {
    const pathname = usePathname() ?? "";

    useEffect(() => {
        const cards = document.querySelectorAll(`.${styles.card}`);
        
        cards.forEach((card, i) => {
            gsap.fromTo(card, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, []);

    return (
        <>
            <section className={`${styles.section} z-2`}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <Heading variant="display-strong-s" className={styles.title}>
                            Why Top Companies Choose <span className={styles.gradientText}>AlgoCrew</span>
                        </Heading>
                        <Text variant="body-default-l" onBackground="neutral-weak" className={styles.subtitle}>
                            Our principles are built around your success. We guarantee performance, transparency, and future-proof technology.
                        </Text>
                    </div>

                    <div className={styles.grid}>
                        {features.map((feature, index) => (
                            <div 
                                key={index} 
                                className={`${styles.card} ${styles[feature.size]}`}
                                style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${feature.image})` }}
                            >
                                <div className={styles.cardContent}>
                                    <div className={styles.iconWrapper}>
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <Heading variant="heading-strong-m" className={styles.cardTitle}>
                                            {feature.title}
                                        </Heading>
                                        <Text variant="body-default-m" className={styles.cardDescription}>
                                            {feature.description}
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Background
                position="absolute"
                mask={{
                x: 100,
                y: 50,
                radius: 120,
                cursor: effects.mask.cursor,
                }}
                dots={{
                display: effects.dots.display,
                opacity: effects.dots.opacity as opacity,
                size: effects.dots.size as SpacingToken,
                color: effects.dots.color,
                }}
            />
        </>
    );
}