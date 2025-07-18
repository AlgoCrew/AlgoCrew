// cards.tsx
import { Grid } from '@once-ui-system/core';
import ServiceCard from './Card'; // Renamed import for clarity, but the file is still 'Card.tsx'
import { allServices as initialAllServices } from "@/resources"; // Assuming allServices is imported from your resources file

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

    return (
        <>
            {servicesToDisplay.length > 0 && (
                <Grid
                    columns={columns} mobileColumns="1"
                    fillWidth marginBottom="40" gap="16">
                    {/* Map over the servicesToDisplay array */}
                    {servicesToDisplay.map((service) => (
                        <ServiceCard // Using ServiceCard here
                            key={service.name} // Using service name as a unique key
                            service={service} // Passing the service object as a prop
                            direction={direction}
                        />
                    ))}
                </Grid>
            )}
        </>
    );
}
