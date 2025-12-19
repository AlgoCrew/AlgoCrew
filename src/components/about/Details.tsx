"use client";

import React, { useEffect, useRef } from 'react';
import styles from './details.module.scss';
import { Heading, Text, Column, Flex } from '@once-ui-system/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Details() {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const ctx = gsap.context(() => {
            // Smooth reveal for the text side
            gsap.from(".reveal-content", {
                x: -30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".reveal-content",
                    start: "top 85%",
                }
            });

            // Count-up animation for the numbers
            const numbers = gsap.utils.toArray(".stat-num");
            numbers.forEach((num: any) => {
                const target = parseInt(num.innerText);
                gsap.fromTo(num, 
                    { innerText: 0 }, 
                    { 
                        innerText: target, 
                        duration: 2, 
                        snap: { innerText: 1 },
                        scrollTrigger: {
                            trigger: num,
                            start: "top 90%",
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const stats = [
        { number: "20", label: "Projects", desc: "Successfully delivered precision-engineered digital products." },
        { number: "8", label: "Happy Clients", desc: "Partnering with global brands to solve complex problems." },
        { number: "5", label: "Years Exp.", desc: "Over half a decade of technical mastery and innovation." }
    ];

    return (
        <section ref={containerRef} className={styles.aboutUsContainer}>
            <div className={styles.contentWrapper}>
                
                {/* Keep your original text layout */}
                <div className={`${styles.textSection} reveal-content`}>
                    <div className={styles.badge}>About Us</div>
                    <Heading wrap="balance" variant="display-strong-s" className="mb-4">
                        Driving Innovation Through <br/>
                        <span className={styles.highlight}>Technical Mastery</span>
                    </Heading>
                    <Text wrap="balance" onBackground="neutral-weak" variant="body-default-l" className={styles.maxText}>
                        At AlgoCrew, we aren't just developers; we are architects of the digital future. We specialize in delivering top-tier solutions tailored to the high-stakes needs of modern enterprise.
                    </Text>
                </div>

                {/* Keep your original vertical stack layout */}
                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statCard}>
                            <div className={styles.statHeader}>
                                <span className={`${styles.statNumber} stat-num`}>{stat.number}</span>
                                <span className={styles.plus}>+</span>
                            </div>
                            <p className={styles.statLabel}>{stat.label}</p>
                            <Text variant="body-default-s" onBackground="neutral-weak" className="mt-2">
                                {stat.desc}
                            </Text>
                            {/* Subtle tech-line decoration */}
                            <div className={styles.accentBar} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
