"use client";

import { useEffect, useRef, useState } from "react";
import { Heading, Text, Column, Button, SmartLink, Flex } from "@once-ui-system/core";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Projects.module.scss";

const projects = [
    { 
        title: "Scalable Fintech Ecosystems", 
        company: "Global Finance Corp", 
        tags: ["Payments", "Security", "Real-time"],
        // High-end digital finance/data visualization image
        image: "/images/uplash/fintech.png"
    },
    { 
        title: "Precision HealthTech Platforms", 
        company: "Nexus Health", 
        tags: ["HIPAA", "Data Viz", "AI"],
        // Professional medical research/tech laboratory image
        image: "/images/uplash/health.png"
    },
    { 
        title: "Hybrid Cloud Orchestration", 
        company: "VCloud Systems", 
        tags: ["DevOps", "Kubernetes", "AWS"],
        image: "/images/uplash/global.png"
    },
    { 
        title: "Automated Supply Chain AI", 
        company: "LogiTech Solutions", 
        tags: ["Automation", "IoT", "SaaS"],
        image: "/images/uplash/industry.png"
    },
];


export function Projects() {
    const triggerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // We use a GSAP Context for easy cleanup
        let ctx = gsap.context(() => {
            if (!isMobile && scrollRef.current && triggerRef.current) {
                const track = scrollRef.current;
                
                // Calculate the actual distance the track needs to move
                // We move it until the LAST card is fully visible
                const horizontalDistance = track.scrollWidth - window.innerWidth;

                gsap.to(track, {
                    x: -horizontalDistance,
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        // CRITICAL: This 'end' defines the scroll "length"
                        // Making it the track width ensures the pin lasts long enough
                        end: () => `+=${track.scrollWidth}`, 
                        pin: true,
                        scrub: 1,
                        pinSpacing: true, // This adds the physical padding to keep next section away
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                    }
                });
            }
        });

        return () => {
            ctx.revert();
            window.removeEventListener('resize', checkMobile);
        };
    }, [isMobile]);

    return (
        <section ref={triggerRef} className={isMobile ? styles.mobileWrapper : styles.desktopWrapper}>
            <div className={styles.viewport}>
                <div ref={scrollRef} className={isMobile ? styles.mobileTrack : styles.projectTrack}>
                    <div className={styles.introSlide}>
                      <Column gap="16">
                          <Flex gap="8" align="center">
                              <div className={styles.dot} />
                              <Text variant="label-strong-s" onBackground="accent-strong" style={{ letterSpacing: '2px' }}>
                                  INDUSTRY SOLUTIONS
                              </Text>
                          </Flex>
                          <Heading variant="display-strong-l">
                              Transforming <br/> 
                              <span className={styles.gradientText}>Complex Sectors.</span>
                          </Heading>
                          <Text variant="body-default-l" onBackground="neutral-weak" style={{ maxWidth: '440px' }}>
                              From secure Fintech gateways to high-availability HealthTech systems, we architect solutions for every vertical.
                          </Text>
                      </Column>
                  </div>

                    {projects.map((project, i) => (
                        <div key={i} className={styles.projectSlide}>
                            <div className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <img src={project.image} alt={project.title} loading="lazy" />
                                    <div className={styles.tagOverlay}>
                                        {project.tags.map(tag => (
                                            <span key={tag} className={styles.miniTag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <Column gap="8" paddingTop="24">
                                    <Text variant="label-strong-s" onBackground="accent-medium" style={{ opacity: 0.8 }}>
                                        {project.company}
                                    </Text>
                                    <Heading variant="heading-strong-m" style={{ letterSpacing: '-0.5px' }}>
                                        {project.title}
                                    </Heading>
                                </Column>
                            </div>
                        </div>
                    ))}
                    
                    {isMobile && (
                         <div className={styles.mobileFooter}>
                            <Button href="/projects" variant="primary" size="l" suffixIcon="arrowRight">View All Work</Button>
                         </div>
                    )}
                </div>

                {!isMobile && (
                    <div className={styles.stickyExplore}>
                        <div className={styles.smokyOverlay} />
                        <Column gap="16" horizontal="center" className={styles.exploreContent}>
                            <div className={styles.verticalLine} />
                            <SmartLink href="/projects" className={styles.rotatedText} aria-label="explore latest projects">
                                <Text variant="label-strong-s">VIEW ALL</Text>
                            </SmartLink>
                            <Button href="/projects" variant="primary" size="l" suffixIcon="arrowRight" aria-label="explore our projects" className={styles.buttonStyle} />
                        </Column>
                    </div>
                )}
            </div>
        </section>
    );
}
