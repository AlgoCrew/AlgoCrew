"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';

// A mapping object to get the React component from its string name
// We will now use inline SVGs instead of react-icons to avoid resolution issues.
const IconComponents: { [key: string]: React.ElementType } = {
    FaLaptopCode: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path fill="currentColor" d="M632 448H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h624c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM592 0H48C21.5 0 0 21.5 0 48v336c0 26.5 21.5 48 48 48h544c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM48 352V48h544v304H48z"/>
        </svg>
    ),
    FaMobileAlt: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path fill="currentColor" d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-64H48V64h224v352z"/>
        </svg>
    ),
    FaCode: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path fill="currentColor" d="M278.9 511.5c-7.9 0-15.7-3.6-20.7-10.9L1.8 288.8c-7.5-10.8-7.5-25.2 0-36L258.2 11.4c5-7.3 12.8-10.9 20.7-10.9s15.7 3.6 20.7 10.9l256.4 239.5c7.5 10.8 7.5 25.2 0 36L299.6 500.6c-5 7.3-12.8 10.9-20.7 10.9zM584.2 256L327.8 16.5 65.6 256l262.2 239.5L584.2 256z"/>
        </svg>
    ),
    FaPaintBrush: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464c-114.7 0-208-93.3-208-208S141.3 48 256 48s208 93.3 208 208-93.3 208-208 208zm-48-240v-64h96v64h-96zm0 96v-64h96v64h-96z"/>
        </svg>
    ),
    FaBuilding: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M448 0H64C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zM224 416h-32V192h32v224zm64 0h-32V192h32v224zm64 0h-32V192h32v224z"/>
        </svg>
    ),
    FaCogs: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M487.4 315.7l-42.6-28.3c4.2-12.7 6.6-26 6.6-39.4s-2.4-26.7-6.6-39.4l42.6-28.3c7.5-5 10.6-14.4 8.2-23.4l-43.2-74.8c-2.3-9-11.6-14.7-21-12.2l-52.6 13.9c-11.2-8.6-23.7-15.4-37.1-20.5l-13.9-52.6c-2.5-9.4-10.9-15.1-20.3-12.6L256 0l-74.8 43.2c-9 2.3-14.7 11.6-12.2 21l13.9 52.6c-8.6 11.2-15.4 23.7-20.5 37.1l-52.6-13.9c-9.4-2.5-15.1 5.9-12.6 15.3l43.2 74.8c2.3 9-4.5 18.3-13.5 20.6l-42.6 28.3c-7.5 5-10.6 14.4-8.2 23.4l43.2 74.8c2.3 9 11.6 14.7 21 12.2l52.6-13.9c11.2 8.6 23.7 15.4 37.1 20.5l13.9 52.6c2.5 9.4 10.9 15.1 20.3 12.6L256 512l74.8-43.2c9-2.3 14.7-11.6 12.2-21l-13.9-52.6c8.6-11.2 15.4-23.7 20.5-37.1l52.6 13.9c9.4 2.5 15.1-5.9 12.6-15.3l-43.2-74.8c-2.3-9 4.5-18.3 13.5-20.6zM256 352c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z"/>
        </svg>
    ),
    FaUsers: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zM0 480c0 17.7 14.3 32 32 32h576c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM48 320h544c17.7 0 32-14.3 32-32s-14.3-32-32-32H48c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/>
        </svg>
    ),
    FaPowerOff: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-320h64v160h-64V144z"/>
        </svg>
    ),
    FaGlobe: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-320h64v160h-64V144z"/>
        </svg>
    ),
    FaCube: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-320h64v160h-64V144z"/>
        </svg>
    ),
    FaLink: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M326.6 211.3c-2.4-2.4-5.2-4.5-8.2-6.3L256 160l-62.4 45c-3 1.8-5.8 3.9-8.2 6.3-18.4 18.4-18.4 48.3 0 66.7l62.4 45 62.4-45c18.4-18.4 18.4-48.3 0-66.7zM496 256c0 132.5-107.5 240-240 240S16 388.5 16 256 123.5 16 256 16s240 107.5 240 240zm-240 32c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/>
        </svg>
    ),
    FaBrain: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-320h64v160h-64V144z"/>
        </svg>
    ),
    FaMagic: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-320h64v160h-64V144z"/>
        </svg>
    ),
    FaChartBar: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M32 32h448c17.7 0 32 14.3 32 32v384c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32zm32 384h384V64H64v352zm64-288h32v224h-32V128zm96 0h32v224h-32V128zm96 0h32v224h-32V128z"/>
        </svg>
    ),
    FaHandshake: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path fill="currentColor" d="M320 320c-17.7 0-32 14.3-32 32s14.3 32 32 32h224c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm-128-64c-17.7 0-32 14.3-32 32s14.3 32 32 32h224c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm-64-64c-17.7 0-32 14.3-32 32s14.3 32 32 32h224c17.7 0 32-14.3 32-32s-14.3-32-32-32H128zM64 64c-17.7 0-32 14.3-32 32s14.3 32 32 32h224c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM0 448c0 17.7 14.3 32 32 32h576c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32z"/>
        </svg>
    ),
    FaCheckCircle: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-320h64v160h-64V144z"/>
        </svg>
    ),
    FaCloudUploadAlt: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path fill="currentColor" d="M537.6 226.6c-4.1-4.1-10.7-4.1-14.8 0L336 413.4V32c0-17.7-14.3-32-32-32s-32 14.3-32 32v381.4L117.2 226.6c-4.1-4.1-10.7-4.1-14.8 0s-4.1 10.7 0 14.8l208 208c4.1 4.1 10.7 4.1 14.8 0l208-208c4.1-4.1 4.1-10.7 0-14.8z"/>
        </svg>
    ),
    FaShieldAlt: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-320h64v160h-64V144z"/>
        </svg>
    ),
    FaCloud: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path fill="currentColor" d="M537.6 226.6c-4.1-4.1-10.7-4.1-14.8 0L336 413.4V32c0-17.7-14.3-32-32-32s-32 14.3-32 32v381.4L117.2 226.6c-4.1-4.1-10.7-4.1-14.8 0s-4.1 10.7 0 14.8l208 208c4.1 4.1 10.7 4.1 14.8 0l208-208c4.1-4.1 4.1-10.7 0-14.8z"/>
        </svg>
    ),
    FaShoppingCart: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path fill="currentColor" d="M528.12 301.31L480 236.8a50 50 0 0 0-39.72-20.88h-117c-26.6 0-48.5 21.9-48.5 48.5s21.9 48.5 48.5 48.5h117c12 0 23.3-4.8 31.8-13.3l48.12-64.51c4.2-5.6 4.2-13.2 0-18.8zM240 320c-44.18 0-80-35.82-80-80s35.82-80 80-80 80 35.82 80 80-35.82 80-80 80zm288-160h-160c-17.7 0-32 14.3-32 32s14.3 32 32 32h160c17.7 0 32-14.3 32-32s-14.3-32-32-32zm-160 0h-160c-17.7 0-32 14.3-32 32s14.3 32 32 32h160c17.7 0 32-14.3 32-32s-14.3-32-32-32z"/>
        </svg>
    ),
    FaTools: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-320h64v160h-64V144z"/>
        </svg>
    ),
    FaRobot: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path fill="currentColor" d="M32 32h448c17.7 0 32 14.3 32 32v384c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32zm32 384h384V64H64v352zm64-288h32v224h-32V128zm96 0h32v224h-32V128zm96 0h32v224h-32V128z"/>
        </svg>
    ),
    FaPalette: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-320h64v160h-64V144z"/>
        </svg>
    ),
    FaEthereum: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path fill="currentColor" d="M317.8 256l-159.9-256L0 256l157.9 256 159.9-256zm-159.9 192L48 256l112-192 112 192-112 192z"/>
        </svg>
    ),
    FaVrCardboard: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-320h64v160h-64V144z"/>
        </svg>
    ),
    FaCloudMeatball: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path fill="currentColor" d="M537.6 226.6c-4.1-4.1-10.7-4.1-14.8 0L336 413.4V32c0-17.7-14.3-32-32-32s-32 14.3-32 32v381.4L117.2 226.6c-4.1-4.1-10.7-4.1-14.8 0s-4.1 10.7 0 14.8l208 208c4.1 4.1 10.7 4.1 14.8 0l208-208c4.1-4.1 4.1-10.7 0-14.8z"/>
        </svg>
    ),
    FaExchangeAlt: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-320h64v160h-64V144z"/>
        </svg>
    ),
    FaSyncAlt: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-320h64v160h-64V144z"/>
        </svg>
    ),
    FaGamepad: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M512 144v224c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h416c26.5 0 48 21.5 48 48zM256 240c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-96 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm192 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z"/>
        </svg>
    ),
    // Add more SVG paths here for other icons if needed
};

// Define the type for a technology item
interface TechnologyItem {
    name: string;
    iconName: string;
}

// Dummy data for technologies about the services offered
const technologies: TechnologyItem[] = [
    { name: "Web Development", iconName: "FaLaptopCode" },
    { name: "App Development", iconName: "FaMobileAlt" },
    { name: "Custom Software", iconName: "FaCode" },
    { name: "UX/UI Design", iconName: "FaPaintBrush" },
    { name: "Business Apps", iconName: "FaBuilding" },
    { name: "D365 ERP", iconName: "FaCogs" },
    { name: "D365 CRM", iconName: "FaUsers" },
    { name: "Power Apps", iconName: "FaPowerOff" },
    { name: "Metaverse", iconName: "FaGlobe" },
    { name: "Augmented Reality", iconName: "FaCube" },
    { name: "Blockchain", iconName: "FaLink" },
    { name: "Data & AI", iconName: "FaBrain" },
    { name: "Generative AI", iconName: "FaMagic" },
    { name: "Data Analytics", iconName: "FaChartBar" },
    { name: "Staff Augmentation", iconName: "FaHandshake" },
    { name: "Quality Assurance", iconName: "FaCheckCircle" },
    { name: "DevOps", iconName: "FaCloudUploadAlt" },
    { name: "Cybersecurity", "iconName": "FaShieldAlt" },
    { name: "SaaS", iconName: "FaCloud" },
    { name: "E-commerce", iconName: "FaShoppingCart" },
    { name: "Gaming", iconName: "FaGamepad" },
    { name: "Cloud", iconName: "FaCloudMeatball" }
];

export function Technologies() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [scrollSpeed, setScrollSpeed] = useState(1); // Default scroll speed
  const defaultSpeed = 1; // Pixels per frame
  const slowSpeed = 0.2; // Slower speed on hover

  // Duplicate the technologies array multiple times to create a seamless loop
  // Duplicating it 3 times ensures enough content to scroll smoothly before resetting
  const loopedTechnologies = [...technologies, ...technologies, ...technologies];

  // Function to animate the horizontal scroll
  const animateScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollLeft += scrollSpeed;

      // If scrolled past the first set of duplicated items, reset to the beginning
      // This creates the continuous loop effect
      // We calculate the width of one set of items dynamically
      const itemWidth = 208 + 24; // Item min-width (208px) + margin-right (24px for space-x-6)
      const singleSetWidth = technologies.length * itemWidth;

      if (container.scrollLeft >= singleSetWidth) {
        container.scrollLeft = 0;
      }
    }
    // Request the next animation frame
    animationFrameId.current = requestAnimationFrame(animateScroll);
  }, [scrollSpeed]); // Re-create animateScroll if scrollSpeed changes

  // Effect to start and stop the animation loop
  useEffect(() => {
    // Start the animation when the component mounts
    animationFrameId.current = requestAnimationFrame(animateScroll);

    // Cleanup function: cancel the animation frame when the component unmounts
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animateScroll]); // Dependency on animateScroll ensures it restarts if speed changes

  // Event handler for mouse entering the scroll area
  const handleMouseEnter = () => {
    setScrollSpeed(slowSpeed); // Slow down the scroll speed
  };

  // Event handler for mouse leaving the scroll area
  const handleMouseLeave = () => {
    setScrollSpeed(defaultSpeed); // Resume normal scroll speed
  };

  return (
    <div className="app-container">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        .scroll-container {
          width: 100%; /* w-full */
          max-width: 960px; /* max-w-6xl */
          overflow-x: scroll; /* overflow-x-scroll */
          white-space: nowrap; /* whitespace-nowrap */
          padding: 16px 8px; /* py-4 px-2 */
          // background-color: #ffffff; /* bg-white */
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
          border-radius: 12px; /* rounded-xl */
          /* Custom scrollbar styling */
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none;  /* IE and Edge */
        }

        .scroll-container::-webkit-scrollbar {
          display: none; /* Hide scrollbar for Webkit browsers */
        }

        .items-wrapper {
          display: inline-flex; /* inline-flex */
          gap: 24px; /* space-x-6 */
          padding: 8px; /* p-2 */
        }

        .tech-item {
          flex-shrink: 0; /* flex-none */
          min-width: 208px; /* w-52 */
          height: 160px; /* h-40 */
          // background: linear-gradient(to bottom right, #3b82f6, #4f46e5); /* bg-gradient-to-br from-blue-500 to-indigo-600 */
          // color: #ffffff; /* text-white */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 12px; /* rounded-xl */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-lg */
          padding: 16px; /* p-4 */
          transform: scale(1); /* initial transform */
          transition: transform 0.3s ease-in-out; /* transition-transform duration-300 */
        }

        .tech-item:hover {
          transform: scale(1.05); /* hover:scale-105 */
        }

        .tech-icon {
          margin-bottom: 12px; /* mb-3 */
        }

        .tech-name {
          font-size: 1.125rem; /* text-lg */
          font-weight: 600; /* font-semibold */
          text-align: center;
          line-height: 1.25; /* leading-tight */
        }
        `}
      </style>

      <h1 className="main-heading">Our Technologies</h1>

      <div
        ref={scrollContainerRef}
        className="scroll-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="items-wrapper">
          {/* Map over the duplicated technologies to create the continuous loop */}
          {loopedTechnologies.map((tech, index) => {
            // Get the SVG component from the mapping
            const IconComponent = IconComponents[tech.iconName];
            return (
              <div
                key={`${tech.name}-${index}`} // Unique key for each duplicated item
                className="tech-item"
              >
                {IconComponent && (
                  // Render the SVG component directly
                  <IconComponent size={48} className="tech-icon" />
                )}
                <h3 className="tech-name">
                  {tech.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
