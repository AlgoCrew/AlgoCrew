// "use client"

// import React, {useEffect} from 'react';
// import styles from './ProcessStep.module.scss'; // Keeping original styles import
// import { Column, Flex, Heading, Text, RevealFx } from '@once-ui-system/core';
// import {
//     FaRegLightbulb, FaCogs, FaSyncAlt
// } from 'react-icons/fa'; // Using Font Awesome icons as an example
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// const IconComponents: { [key: string]: React.ElementType } = {
//     FaRegLightbulb, FaCogs, FaSyncAlt
// };

// export function ProcessSteps() {

//     useEffect(() => {
//         // Register GSAP plugins
//         gsap.registerPlugin(ScrollTrigger);

//         gsap.matchMedia().add(
//             {
//                 // Desktop and larger screens
//                 isDesktop: '(min-width: 768px)',
//                 // Small screens
//                 isMobile: '(max-width: 767px)',
//             },
//             (context) => {
//                 let { isDesktop, isMobile } = context.conditions || {};

//                 for (let i = 1; i <= 3; i++) {
//                     gsap.fromTo(
//                         `.processStep-${i}`,
//                         {
//                             opacity: 0,
//                             // Set y based on screen size
//                             y: isDesktop ? 30 * i * 2 : 30,
//                         },
//                         {
//                             opacity: 1,
//                             y: 0,
//                             duration: 4 * i,
//                             delay: i * 1,
//                             scrollTrigger: {
//                                 trigger: `.processStep-${i}`,
//                                 start: 'top 100%',
//                                 end: 'top 40%',
//                                 scrub: true,
//                                 toggleActions: 'play none none none',
//                             },
//                         }
//                     );
//                 }
//             }
//         );
//     }, []);

//       return (
//     <>
//       <div className={styles.processSectionContainer}>
//         <div className={styles.processContentWrapper}>
//           {/* Section Header */}
//           <div className={`${styles.sectionHeader}`}>
//             {/* <Heading
//               as="h2"
//               variant="heading-strong-l"
//               wrap="balance"
//               className='mb-3'
//             >
//               Our Process
//             </Heading> */}

//             <Heading
//               wrap="balance"
//               variant="display-strong-s"
//               className={`mb-3 ${styles.stepTitle}`}
//             >
//               Our Engineering Process
//             </Heading>

//             <div className={styles.processHeaderUnderline}></div>

//             <Text className={styles.sectionDescription} onBackground="neutral-weak" variant="heading-default-s">
//               Great creations begin with thoughtful planning. Our process is precise, ensuring we deliver only the highest quality.
//             </Text>
//           </div>

//           {/* Process Steps Container */}
//           <div className={styles.processStepsContainer}>

//             <ProcessStep
//               number="1"
//               title="Think"
//               description="We prioritize understanding user requirements to ensure that the system architecture blueprint perfectly aligns with their needs."
//               icon={'FaRegLightbulb'}
//             />

//             <ProcessStep
//               number="2"
//               title="Create"
//               description="We meticulously translate user requirements into solutions, executing each step with precision while keeping progress transparent and visible."
//               icon={'FaCogs'}
//             />

//             <ProcessStep
//               number="3"
//               title="Iterate"
//               description="We continuously evolve the design through rapid iterations, fostering a quick feedback loop while prioritizing thorough testing and optimal performance."
//               icon={'FaSyncAlt'}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // Reusable ProcessStep component
// const ProcessStep = ({
//   number,
//   title,
//   description,
//   icon,
// }: {
//   number: string;
//   title: string;
//   description: string;
//   icon: string;
// }) => {

//   const IconComponent = icon ? IconComponents[icon] : null;

//   return (
//     <div className={`${styles.processStep} processStep-${number}`}>
//       <div className={styles.processStepIconWrapper}>
//         <div className={`${styles.stepCircleBase} ${styles.glowingBorder}`}>
//           {IconComponent && (
//             <IconComponent size={48} className={styles.faIcon}/> // Render the icon
//           )}
//         </div>

//         <Text className={`${styles.numberOverlayDefault}`}>
//           {number}
//         </Text>
//       </div>

//       <Flex>
//         {/* <Heading
//           wrap="balance"
//           className={`mb-3 ${styles.stepNumberLarge}`}
//         >
//           {number}
//         </Heading> */}

//         <div>
//           <Heading
//             wrap="balance"
//             className={`mb-3 ${styles.stepTitle}`}
//           >
//             {title}
//           </Heading>

//           <p className={styles.stepDescription}>
//             {description}
//           </p>
//         </div>
//       </Flex>
//     </div>
//   );
// };


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
                        Our Engineering Process
                    </Heading>
                    <div className={styles.processHeaderUnderline}></div>
                    <Text className={styles.sectionDescription} variant="heading-default-s">
                        Great creations begin with thoughtful planning. Our process is precise and iterative.
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