// "use client";

// import { useEffect, useRef } from "react";
// import { Media, Text, Column, Heading, Flex, SmartLink, Button, Icon } from "@once-ui-system/core";
// import styles from "./Card.module.scss";
// import gsap from "gsap";

// interface CardsProp {
//     project: any;
// }

// export default function ProjectCard({ project }: CardsProp) {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

//       tl.from(".reveal-title", { y: 40, opacity: 0, duration: 1 })
//         .from(".reveal-hero", { scale: 0.9, opacity: 0, duration: 1.2 }, "-=0.6")
//         .from(".reveal-meta", { x: 20, opacity: 0, stagger: 0.1, duration: 0.8 }, "-=0.8");
//     }, containerRef);
    
//     return () => ctx.revert();
//   }, []);

//   return (
//     <Column ref={containerRef} fillWidth gap="xl">
//       {/* HEADER SECTION */}
//       <Flex direction="column" gap="16" className="reveal-title">
//         <Text variant="label-strong-s" style={{ color: "#00ccccf0", letterSpacing: '0.3em' }}>
//             {project.category.toUpperCase()} — {project.year}
//         </Text>
//         <Heading variant="display-strong-l">
//             {project.title}
//         </Heading>
//       </Flex>

//       {/* MAIN CONTENT GRID */}
//       <div className={styles.projectSection}>
        
//         {/* LEFT: Visual & Description */}
//         <Column gap="40">
//           <div className={`${styles.imageHero} reveal-hero`}>
//             {project.img && (
//               <Media
//                 priority
//                 aspectRatio="16 / 9"
//                 alt={project.title}
//                 src={project.img}
//               />
//             )}
//           </div>

//           <Column gap="24" className="reveal-meta">
//             <Heading variant="heading-strong-l">About the project</Heading>
//             <Text variant="body-default-l" onBackground="neutral-weak" style={{ lineHeight: '1.8' }}>
//                 {project.description}
//             </Text>
//           </Column>

//           <Flex fillWidth direction="column" gap="48" paddingY="20" borderTop="neutral-alpha-weak">
//               <Flex mobileDirection="column" gap="40">
//                   <Column flex={1} gap="16">
//                       <Heading variant="heading-strong-m" style={{ color: "#00ccccf0" }}>The Challenge</Heading>
//                       <Text variant="body-default-m" onBackground="neutral-weak">
//                           Explain the technical hurdles or business limitations the client faced. 
//                           This builds empathy and shows you understand business needs.
//                       </Text>
//                   </Column>
//                   <Column flex={1} gap="16">
//                       <Heading variant="heading-strong-m" style={{ color: "#00ccccf0" }}>Our Solution</Heading>
//                       <Text variant="body-default-m" onBackground="neutral-weak">
//                           Detail how your specific tech stack choices (React, GSAP, Node) 
//                           directly solved those problems.
//                       </Text>
//                   </Column>
//               </Flex>
//           </Flex>
//         </Column>

//         {/* RIGHT: Sticky Meta Info */}
//         <aside className={`${styles.stickySidebar} reveal-meta`}>
//           <Column className={styles.metaItem}>
//             <Text variant="label-strong-xs" onBackground="neutral-medium">CLIENT</Text>
//             <Heading variant="body-strong-m">{project.name}</Heading>
//           </Column>

//           {project.link && (
//             <Column className={styles.metaItem}>
//               <Text variant="label-strong-xs" onBackground="neutral-medium">LIVE PREVIEW</Text>
//               <SmartLink href={project.link} className={styles.brandLink}>
//                 Visit Website <Icon name="chevronRight" size="xs" />
//               </SmartLink>
//             </Column>
//           )}

//           <Column className={styles.metaItem}>
//             <Text variant="label-strong-xs" onBackground="neutral-medium">TECH STACK</Text>
//             <div className={styles.techGrid}>
//               {project.techStack.map((tech: string, index: number) => (
//                 <span key={index} className={styles.techTag}>{tech}</span>
//               ))}
//             </div>
//           </Column>

//           <Column className={styles.metaItem} style={{ border: 'none' }}>
//              <Button 
//                 href="/projects" 
//                 variant="secondary" 
//                 fillWidth 
//                 suffixIcon="arrowRight"
//                 style={{ marginTop: '24px' }}
//              >
//                 View all projects
//              </Button>
//           </Column>
//         </aside>
//       </div>
//     </Column>
//   );
// }





"use client";

import { useEffect, useRef } from "react";
import { Media, Text, Column, Heading, Flex, SmartLink, Button, Icon } from "@once-ui-system/core";
import styles from "./Card.module.scss";
import gsap from "gsap";
import { ourProjects } from "@/resources";

interface CardsProp {
    project: any;
}

export default function ProjectCard({ project }: CardsProp) {
  const containerRef = useRef(null);
  
  // Logic to find the next project in the array
  const currentIndex = ourProjects.findIndex(p => p.slug === project.slug);
  const nextProject = ourProjects[(currentIndex + 1) % ourProjects.length];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".reveal-title", { y: 40, opacity: 0, duration: 1 })
        .from(".reveal-hero", { scale: 1.1, opacity: 0, duration: 1.4 }, "-=0.8")
        .from(".reveal-meta", { x: 20, opacity: 0, stagger: 0.1, duration: 0.8 }, "-=1");
    }, containerRef);
    
    return () => ctx.revert();
  }, [project.slug]);

  return (
    <Column ref={containerRef} fillWidth gap="xl">
      {/* HEADER SECTION */}
      <Flex direction="column" gap="16" className="reveal-title">
        <Text variant="label-strong-s" style={{ color: "#00ccccf0", letterSpacing: '0.3em' }}>
            {project.category.toUpperCase()} — {project.year}
        </Text>
        <Heading variant="display-strong-l">
            {project.title}
        </Heading>
      </Flex>

      <div className={styles.projectSection}>
        <Column gap="40">
          <div className={`${styles.imageHero} reveal-hero`}>
            {project.img && (
              <Media priority aspectRatio="16 / 9" alt={project.title} src={project.img} />
            )}
          </div>

          <Column gap="64" className="reveal-meta">
            <Column gap="24">
                <Heading variant="heading-strong-l">The Overview</Heading>
                <Text variant="body-default-l" onBackground="neutral-weak" style={{ lineHeight: '1.8' }}>
                    {project.description}
                </Text>
            </Column>

            <Flex mobileDirection="column" gap="40" paddingY="40" borderTop="neutral-alpha-weak">
                <Column flex={1} gap="16">
                    <Heading variant="heading-strong-m" style={{ color: "#00ccccf0" }}>The Challenge</Heading>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                        {project.challenge || "We identified key technical bottlenecks that were hindering growth and user engagement, requiring a scalable, high-performance architecture."}
                    </Text>
                </Column>
                <Column flex={1} gap="16">
                    <Heading variant="heading-strong-m" style={{ color: "#00ccccf0" }}>The Solution</Heading>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                        {project.solution || "Leveraging modern frameworks and custom animations, we built a seamless experience that prioritizes speed, security, and intuitive user flows."}
                    </Text>
                </Column>
            </Flex>
          </Column>
        </Column>

        {/* RIGHT: Sticky Sidebar */}
        <aside className={`${styles.stickySidebar} reveal-meta`}>
          <Column className={styles.metaItem}>
            <Text variant="label-strong-xs" onBackground="neutral-medium">CLIENT</Text>
            <Heading variant="body-strong-m">{project.name}</Heading>
          </Column>

          {project.link && (
            <Column className={styles.metaItem}>
              <Text variant="label-strong-xs" onBackground="neutral-medium">LIVE PREVIEW</Text>
              <SmartLink href={project.link} className={styles.brandLink}>
                Visit Website <Icon name="chevronRight" size="xs" />
              </SmartLink>
            </Column>
          )}

          <Column className={styles.metaItem}>
            <Text variant="label-strong-xs" onBackground="neutral-medium">TECH STACK</Text>
            <div className={styles.techGrid}>
              {project.techStack.map((tech: string, index: number) => (
                <span key={index} className={styles.techTag}>{tech}</span>
              ))}
            </div>
          </Column>

          <Button href="/projects" variant="tertiary" fillWidth prefixIcon="chevronLeft" style={{ marginTop: '24px' }}>
            Back to Portfolio
          </Button>
        </aside>
      </div>

      <div className={`${styles.nextProjectSection} reveal-meta`}>
        <SmartLink href={nextProject.path} className={styles.nextProjectLink} unstyled>
          <div className={styles.nextProjectContainer}>
            {/* Background Image Preview that appears on hover */}
            <div className={styles.previewImage}>
              <Media src={nextProject.img} alt="" style={{ objectFit: 'cover', height: '100%' }} />
            </div>

            <Column gap="12" style={{ position: 'relative', zIndex: 1 }}>
              <Text variant="label-strong-s" style={{ color: "#00ccccf0", letterSpacing: '0.3em' }}>
                NEXT PROJECT
              </Text>
              <Heading variant="display-strong-m">
                {nextProject.title}
              </Heading>
              <Flex align="center" gap="8">
                <Text variant="body-default-m" onBackground="neutral-weak">
                  View Case Study
                </Text>
              </Flex>
            </Column>

            <div className={styles.arrowIcon}>
              <Icon name="arrowRight" size="l" />
            </div>
          </div>
        </SmartLink>
        
        <Flex fillWidth content="center" marginTop="80">
            <Button 
              href="/contact" 
              variant="secondary" 
              size="l"
              suffixIcon="chevronRight"
              style={{ color: "#00ccccf0" }}
            >
              Have a similar project? Let's talk
            </Button>
        </Flex>
      </div>
    </Column>
  );
}