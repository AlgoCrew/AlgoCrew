"use client";

import React, { useEffect, useRef } from 'react';
import styles from './WhyChooseUs.module.scss';
import { Column, Heading, Text, Flex, Background, SpacingToken, opacity } from '@once-ui-system/core';
import { FaGlobeAmericas, FaBolt, FaUsers, FaShieldAlt, FaComments, FaMicrochip, FaLock } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const features = [
    {
        title: "Global Reach",
        tag: "North America & EU",
        description: "Strategically headquartered in Canada with a global network of elite engineers.",
        icon: <FaGlobeAmericas />,
        image: "/images/uplash/global.png",
        size: "large" 
    },
    {
        title: "Speed to Market",
        tag: "48hr Matching",
        description: "Deploy world-class talent in days, not months.",
        icon: <FaBolt />,
        image: "/images/uplash/market.png",
        size: "small"
    },
    {
        title: "Agile Teams",
        tag: "Scalable",
        description: "From staff augmentation to full turnkey product delivery.",
        icon: <FaUsers />,
        image: "/images/uplash/team.png",
        size: "small"
    },
    {
        title: "Vetted Quality",
        tag: "Top 1% Talent",
        description: "A rigorous 5-stage vetting process for technical and soft skills.",
        icon: <FaShieldAlt />,
        image: "/images/uplash/quality.png",
        size: "medium"
    },
    {
        title: "AI-First Approach",
        tag: "Future-Proof",
        description: "Integrating LLMs and modern cloud infra into every workflow.",
        icon: <FaMicrochip />,
        image: "/images/uplash/ai.png",
        size: "medium"
    },
    {
        title: "Security & Compliance",
        tag: "Enterprise-Grade",
        description: "Built with SOC 2–aligned practices, data privacy, and secure-by-design architecture.",
        icon: <FaLock />,
        image: "/images/uplash/security.png",
        size: "medium"
    }
];

export function WhyChooseUs() {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const cards = gsap.utils.toArray(`.${styles.card}`);
        
        // Entrance animation
        gsap.fromTo(cards, 
            { opacity: 0, scale: 0.9, y: 30 },
            {
                opacity: 1, scale: 1, y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            }
        );

        // Subtle Parallax on Mouse Move
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 20;
            const yPos = (clientY / window.innerHeight - 0.5) * 20;

            gsap.to(`.${styles.cardImage}`, {
                x: xPos,
                y: yPos,
                duration: 1,
                ease: "power2.out",
                overwrite: 'auto'
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            <Column fillWidth className="z-2">
                <Column align="start" gap="16" marginBottom="64">
                    <div className={styles.accent}>The AlgoCrew Edge</div>
                    <Heading variant="display-strong-s">
                        Why Top Companies <span className={styles.accent}>Trust Us</span>
                    </Heading>
                    <Text variant="body-default-l" onBackground="neutral-weak" style={{ maxWidth: '600px' }}>
                        We blend high-level engineering strategy with rapid execution to deliver measurable business impact.
                    </Text>
                </Column>

                <div className={styles.bentoGrid}>
                    {features.map((feature, index) => (
                        <div key={index} className={`${styles.card} ${styles[feature.size]}`}>
                            {/* Background Image Layer */}
                            <div 
                                className={styles.cardImage} 
                                style={{ backgroundImage: `url(${feature.image})` }} 
                            />
                            
                            {/* Glass Overlay */}
                            <div className={styles.glassOverlay} />

                            <div className={styles.cardContent}>
                                <Flex direction="column" gap="12" fillWidth>
                                    <Flex horizontal="space-between" vertical="center">
                                        <div className={styles.iconContainer}>
                                            {feature.icon}
                                        </div>
                                        <span className={styles.cardTag}>{feature.tag}</span>
                                    </Flex>
                                    
                                    <Column gap="8" marginTop="20">
                                        <Heading variant="heading-strong-l" className={styles.textWhite}>
                                            {feature.title}
                                        </Heading>
                                        <Text variant="body-default-m" className={styles.textMuted}>
                                            {feature.description}
                                        </Text>
                                    </Column>
                                </Flex>
                            </div>
                        </div>
                    ))}
                </div>
            </Column>

            <Background
                position="absolute"
                mask={{ x: 50, y: 50, radius: 100, cursor: true }}
                dots={{ display: true, opacity: 0.1 as opacity, size: '2' as SpacingToken, color: 'accent' }}
            />
        </section>
    );
}
