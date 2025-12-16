"use client";

import { useEffect, useRef } from "react";
import { getPosts } from "@/utils/utils";
import { Column, Button, Flex, Heading, Text, Background, SpacingToken, opacity } from "@once-ui-system/core";
import { ProjectCard } from "@/components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Projects.module.scss";
import { effects } from '@/resources';

const allProjects = [
  {
    title: "Cloud & DevOps Architecture: Scaling Global Infrastructure",
    publishedAt: "2025-01-10",
    tags: ["Kubernetes", "Terraform", "AWS/GCP"],
    summary:
      "Specializing in high-availability infrastructure for global platforms like Boxo (Singapore) and Psych Plus (USA). We engineer automated CI/CD pipelines, container orchestration via Kubernetes, and security compliance (SOC2/ISO 27001) that reduces deployment friction by 60%.",
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop", // Modern Server/Code aesthetic
    ]
  },
  {
    title: "Premium Web Ecosystems: High-Performance Hospitality & Retail",
    publishedAt: "2025-02-15",
    tags: ["Next.js", "TypeScript", "UI/UX"],
    summary:
      "Crafting immersive digital storefronts and booking platforms like StayWithLumina (UK) and Nice2stay (Netherlands). By leveraging Next.js and headless architectures, we achieve perfect 100 SEO scores and sub-second LCP, directly impacting bottom-line growth for luxury brands.",
    images: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1955&auto=format&fit=crop", // Clean Luxury Web Design aesthetic
    ]
  },
  {
    title: "SaaS & Enterprise Solutions: Intelligent Business Automation",
    publishedAt: "2025-03-01",
    tags: ["SaaS", "Fintech", "Security"],
    summary:
      "Architecting complex internal systems and SaaS platforms like Get Cash Cloud and Deeplawn. We focus on observability (Grafana/Loki), secure vendor transaction management, and automated lawn care logic, bridging the gap between legacy operations and modern efficiency.",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop", // Fintech/SaaS Dashboard aesthetic
    ]
  }
];

export function Projects({ range }: { range?: [number, number?] }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Optional: Add a section fade-in
    gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, []);

  return (
    <>
      <section ref={sectionRef} className={`${styles.mainWrapper} px-6 z-2`}>
        <div className={styles.stickyLayout}>
          
          {/* LEFT SIDE: Fixed Content */}
          <div className={styles.leftContent}>
            <Column gap="24">
              <Text variant="label-strong-m" onBackground="accent-strong">
                OUR EXPERTISE
              </Text>
              <Heading variant="display-strong-s">
                Empowering Brands <br/> through Tech.
              </Heading>
              <Text variant="body-default-l" onBackground="neutral-weak">
                We don&apos;t just build apps; we engineer digital growth. Explore our latest featured case studies.              </Text>
              <div style={{ marginTop: '24px' }}>
                <Button href="/projects" variant="primary" size="l">
                  Explore All Work
                </Button>
              </div>
            </Column>
          </div>

          {/* RIGHT SIDE: Parallax Scrolling Images */}
          <div className={styles.rightGallery}>
            {allProjects.map((post, index) => (
              <div key={index} className="project-item">
                <ProjectCard
                  href={`work/${post.title}`}
                  image={post.images[0]}
                  title={post.title}
                  description={post.summary}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      <Background
        position="absolute"
        mask={{
        x: 0,
        y: 50,
        radius: 200,
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
