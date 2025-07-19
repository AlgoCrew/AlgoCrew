"use client"

import { useEffect } from 'react';
import { Grid } from '@once-ui-system/core';
import ServiceCard from './Card'; // Renamed import for clarity, but the file is still 'Card.tsx'
import { allServices as initialAllServices } from "@/resources"; // Assuming allServices is imported from your resources file
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Column} from "@once-ui-system/core";

// Define the type for a Service, now using 'iconName'
interface Service {
    name: string;
    path: string;
    short_description: string;
    iconName?: string; // Changed to iconNameservice
}

// Now, we directly use the initialAllServices, assuming it already contains the 'iconName' field.
const allServicesWithIcons: Service[] = initialAllServices as Service[];

interface CardsProps {
    columns?: '1' | '2' | '3' | '4';
    direction?: 'row' | 'column';
}

export function Cards({
    columns = '1',
    direction
}: CardsProps) {
    // Using the allServicesWithIcons data
    const servicesToDisplay = allServicesWithIcons;

    useEffect(() => {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // Loop over each service to animate it as it comes into the viewport
        servicesToDisplay.forEach((_ :any, index :any) => {
            gsap.fromTo(
                `.service-card-${index}`,
                { opacity: 0, y: 30 }, // Initial state (invisible and moved down)
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: index * 0.1, // Delay each card by 0.1s more than the last one
                    scrollTrigger: {
                        trigger: `.service-card-${index}`,
                        start: 'top 80%', // Trigger when the card is 80% in the viewport
                        end: 'top 60%', // End trigger when the card is 60% in the viewport
                        scrub: true,
                        toggleActions: 'play none none none', // Controls the animation flow
                    },
                }
            );
        });
    }, [servicesToDisplay]);

    return (
        <>
            {servicesToDisplay.length > 0 && (
                <Grid
                    columns={columns} mobileColumns="1"
                    fillWidth marginBottom="40" gap="16">
                    {/* Map over the servicesToDisplay array */}
                    {servicesToDisplay.map((service, index) => (
                        <Column key={service.name} className={`service-card-${index}`}>
                            <ServiceCard // Using ServiceCard here
                                service={service} // Passing the service object as a prop
                                direction={direction}
                            />
                        </Column>
                    ))}
                </Grid>
            )}
        </>
    );
}
