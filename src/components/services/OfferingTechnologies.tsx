// "use client"

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import styles from './Technologies.module.scss'; // Import the CSS module
// import { Heading, Row, Text, Media } from '@once-ui-system/core'; // Import Media component

// // Removed Font Awesome imports and inline SVG definitions
// // The icons will now be loaded via the Media component using their paths.

// interface TechnologyItem {
//     name: string;
//     iconName: string; // This will now be the path to the SVG/PNG image
// }

// // Dummy data for technologies about the services offered
// // Updated to use image paths
// const technologies: TechnologyItem[] = [
//   { name: "React", iconName: "/images/technologies/react.svg" },
//   { name: "Next.js", iconName: "/images/technologies/next.svg" },
//   { name: "Vue.js", iconName: "/images/technologies/vue.svg" },
//   { name: "Nuxt.js", iconName: "/images/technologies/nuxt.svg" },
//   { name: "Node.js", iconName: "/images/technologies/node.svg" },
//   { name: "Nest.js", iconName: "/images/technologies/nest.svg" },
//   { name: "Angular", iconName: "/images/technologies/angular.svg" },
//   { name: "Amazon Web Services", iconName: "/images/technologies/aws.svg" },
//   { name: "Microsoft Azure", iconName: "/images/technologies/azure.svg" },
//   { name: "Google Cloud Platform", iconName: "/images/technologies/gcp.svg" },
//   { name: "Containerization", iconName: "/images/technologies/docker.svg" },
//   { name: "Virtualization", iconName: "/images/technologies/virtualization.svg" },
//   { name: "Kubernetes", iconName: "/images/technologies/kubernetes.svg" },
//   { name: "Helm", iconName: "/images/technologies/helm.svg" },
//   { name: "Service Mesh", iconName: "/images/technologies/s-m.svg" },
//   { name: "Terraform", iconName: "/images/technologies/terraform.svg" },
//   { name: "Ansible", iconName: "/images/technologies/ansible.svg" },
//   { name: "Chef", iconName: "/images/technologies/chef.png" },
//   { name: "Django", iconName: "/images/technologies/django.svg" },
//   { name: "Ruby on Rails", iconName: "/images/technologies/rails.svg" },
//   { name: "Kotlin", iconName: "/images/technologies/kotlin.svg" },
//   { name: "React Native", iconName: "/images/technologies/react.svg" },
//   { name: "Flutter", iconName: "/images/technologies/flutter.svg" },
//   { name: "Laravel PHP", iconName: "/images/technologies/laravel.svg" },
//   { name: ".NET", iconName: "/images/technologies/dotnet.svg" },
//   { name: "FastAPI", iconName: "/images/technologies/fast.svg" },
//   { name: "GraphQL", iconName: "/images/technologies/graphql.svg" },
//   { name: "Go (Golang)", iconName: "/images/technologies/golang.svg" },
//   { name: "D365", iconName: "/images/technologies/d365.png" },
//   { name: "Microservices", iconName: "/images/technologies/microservices.svg" },
//   { name: "Unity", iconName: "/images/technologies/unity.svg" },
//   { name: "Unreal Engine", iconName: "/images/technologies/unreal.svg" },
//   { name: "Swift", iconName: "/images/technologies/swift.svg" },
//   { name: "Oracle", iconName: "/images/technologies/oracle.svg" },
//   { name: "DigitalOcean", iconName: "/images/technologies/digitalocean.svg" },
//   { name: "IBM", iconName: "/images/technologies/ibm.svg" }
// ];

// export function OfferingTechnologies() {
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const animationFrameId = useRef<number | null>(null);
//   const [scrollSpeed, setScrollSpeed] = useState(1.5); // Default scroll speed
//   const defaultSpeed = 1; // Pixels per frame
//   const slowSpeed = 0.2; // Slower speed on hover

//   const loopedTechnologies = [...technologies, ...technologies, ...technologies];

//   const animateScroll = useCallback(() => {
//     const container = scrollContainerRef.current;
//     if (container) {
//       container.scrollLeft += scrollSpeed; // Left-to-right scroll

//       // Calculate the width of a single set of technologies for looping
//       // This assumes each techItem has a fixed width and margin-right
//       // You might need to adjust '208 + 24' based on your actual CSS for .techItem
//       const itemWidth = 208 + 24; // width + margin-right from Technologies.module.scss
//       const singleSetWidth = technologies.length * itemWidth;

//       if (container.scrollLeft >= singleSetWidth) {
//         // Reset scroll position to create a seamless loop
//         container.style.scrollBehavior = 'auto'; // Disable smooth for instant jump
//         container.scrollLeft = 0;

//         // Re-enable smooth scroll after the jump for subsequent scrolling
//         requestAnimationFrame(() => {
//           container.style.scrollBehavior = 'smooth';
//         });
//       }
//     }

//     animationFrameId.current = requestAnimationFrame(animateScroll);
//   }, [scrollSpeed, technologies.length]); // Add technologies.length to dependencies if it can change

//   useEffect(() => {
//     animationFrameId.current = requestAnimationFrame(animateScroll);

//     return () => {
//       if (animationFrameId.current) {
//         cancelAnimationFrame(animationFrameId.current);
//       }
//     };
//   }, [animateScroll]);

//   const handleMouseEnter = () => {
//     setScrollSpeed(slowSpeed); // Slow down the scroll speed
//   };

//   const handleMouseLeave = () => {
//     setScrollSpeed(defaultSpeed); // Resume normal scroll speed
//   };

//   return (
//     <div className={styles.appContainer}>
//       <Row fillWidth horizontal="start" paddingBottom="16">
//         <Heading wrap="balance" variant="display-strong-m">
//           Our Technologies
//         </Heading>
//       </Row>

//       <div
//         ref={scrollContainerRef}
//         className={styles.scrollContainer}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <div className={styles.itemsWrapper}>
//           {/* Map over the duplicated technologies to create the continuous loop */}
//           {loopedTechnologies.map((tech, index) => {
//             return (
//               <div
//                 key={`${tech.name}-${index}`} // Unique key for each duplicated item
//                 className={styles.techItem}
//               >
//                 {/* Use the Media component to display the SVG/PNG from the path */}
//                 <Media
//                   src={tech.iconName}
//                   alt={tech.name}
//                   className={`${styles.techIcon} w-[240px] h-[240px]`} // Apply existing icon styles if any
//                   objectFit="contain" // Ensure the entire icon is visible
//                 />
//                 <Text onBackground="neutral-weak" variant="body-default-m" className={styles.statDescription}>
//                   {tech.name}
//                 </Text>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }




// OfferingTechnologies.tsx
"use client";

import React from 'react';
import styles from './Technologies.module.scss';
import { Heading, Row, Text, Media } from '@once-ui-system/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

interface TechnologyItem {
    name: string;
    iconName: string; // Path to the SVG/PNG image
}

const technologies: TechnologyItem[] = [
  { name: "React", iconName: "/images/technologies/react.svg" },
  { name: "Next.js", iconName: "/images/technologies/next.svg" },
  { name: "Vue.js", iconName: "/images/technologies/vue.svg" },
  { name: "Nuxt.js", iconName: "/images/technologies/nuxt.svg" },
  { name: "Node.js", iconName: "/images/technologies/node.svg" },
  { name: "Nest.js", iconName: "/images/technologies/nest.svg" },
  { name: "Angular", iconName: "/images/technologies/angular.svg" },
  { name: "Amazon Web Services", iconName: "/images/technologies/aws.svg" },
  { name: "Microsoft Azure", iconName: "/images/technologies/azure.svg" },
  { name: "Google Cloud Platform", iconName: "/images/technologies/gcp.svg" },
  { name: "Containerization", iconName: "/images/technologies/docker.svg" },
  { name: "Virtualization", iconName: "/images/technologies/virtualization.svg" },
  { name: "Kubernetes", iconName: "/images/technologies/kubernetes.svg" },
  { name: "Helm", iconName: "/images/technologies/helm.svg" },
  { name: "Service Mesh", iconName: "/images/technologies/s-m.svg" },
  { name: "Terraform", iconName: "/images/technologies/terraform.svg" },
  { name: "Ansible", iconName: "/images/technologies/ansible.svg" },
  { name: "Chef", iconName: "/images/technologies/chef.png" },
  { name: "Django", iconName: "/images/technologies/django.svg" },
  { name: "Ruby on Rails", iconName: "/images/technologies/rails.svg" },
  { name: "Kotlin", iconName: "/images/technologies/kotlin.svg" },
  { name: "React Native", iconName: "/images/technologies/react.svg" },
  { name: "Flutter", iconName: "/images/technologies/flutter.svg" },
  { name: "Laravel PHP", iconName: "/images/technologies/laravel.svg" },
  { name: ".NET", iconName: "/images/technologies/dotnet.svg" },
  { name: "FastAPI", iconName: "/images/technologies/fast.svg" },
  { name: "GraphQL", iconName: "/images/technologies/graphql.svg" },
  { name: "Go (Golang)", iconName: "/images/technologies/golang.svg" },
  { name: "D365", iconName: "/images/technologies/d365.png" },
  { name: "Microservices", iconName: "/images/technologies/microservices.svg" },
  { name: "Unity", iconName: "/images/technologies/unity.svg" },
  { name: "Unreal Engine", iconName: "/images/technologies/unreal.svg" },
  { name: "Swift", iconName: "/images/technologies/swift.svg" },
  { name: "Oracle", iconName: "/images/technologies/oracle.svg" },
  { name: "DigitalOcean", iconName: "/images/technologies/digitalocean.svg" },
  { name: "IBM", iconName: "/images/technologies/ibm.svg" }
];

export function OfferingTechnologies() {
  // We'll use a single-pass of the array for the loop
  // Swiper's `loop` prop handles the duplication internally
  const allTechnologies = technologies;

  return (
    <div className={styles.appContainer}>
      <Row fillWidth horizontal="start" paddingBottom="16">
        <Heading wrap="balance" variant="display-strong-m">
          Our Technologies
        </Heading>
      </Row>

      <Swiper
        className={styles.swiperContainer}
        modules={[Autoplay, FreeMode, A11y]}
        spaceBetween={24} // A good space between logos
        slidesPerView={'auto'} // Crucial for showing as many as fit
        freeMode={true} // Allows for continuous, non-snapping scroll
        loop={true} // Handles the infinite looping behavior
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={5000} // Speed of the auto-scroll animation
      >
        {allTechnologies.map((tech, index) => (
          <SwiperSlide key={`${tech.name}-${index}`} className={styles.techItem}>
            <Media
              src={tech.iconName}
              alt={tech.name}
              className={`${styles.techIcon} w-[240px] h-[240px]`}
              objectFit="contain"
            />

            <Text onBackground="neutral-weak" variant="body-default-m" className={styles.statDescription}>
              {tech.name}
            </Text>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}