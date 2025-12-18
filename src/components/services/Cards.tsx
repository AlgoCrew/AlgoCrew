"use client";

import { useEffect, useRef } from 'react';
import { Grid, Column } from '@once-ui-system/core';
import ServiceCard from './Card';
import { allServices as initialAllServices } from "@/resources";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from "./Cards.module.scss";

interface Service {
    name: string;
    path: string;
    short_description: string;
    iconName?: string;
}

const allServicesWithIcons: Service[] = initialAllServices as Service[];

export function Cards({ columns = '3' }: { columns?: '1' | '2' | '3' | '4' }) {
    const gridRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const cards = gsap.utils.toArray('.service-card-anim');
        
        gsap.fromTo(cards, 
            { 
                opacity: 0, 
                y: 60,
                rotateX: -15,
                scale: 0.9
            }, 
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, []);

    return (
        <div ref={gridRef} className={styles.gridContainer}>
            <Grid
                columns={columns} 
                mobileColumns="1"
                fillWidth 
                gap="24"
            >
                {allServicesWithIcons.map((service, index) => (
                    <div key={service.name} className="service-card-anim">
                        <ServiceCard service={service} />
                    </div>
                ))}
            </Grid>
        </div>
    );
}
