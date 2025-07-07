// cards.tsx
import { Grid } from '@once-ui-system/core';
import ValueCard from './Card'; // Renamed import for clarity, but the file is still 'Card.tsx'
import { ourValues } from "@/resources"; // Assuming allourValues is imported from your resources file

interface ourValue {
    name: string;
    description: string;
    iconName?: string; // Changed to iconName
}


interface CardsProps {
    columns?: '1' | '2' | '3' | '4';
    direction?: 'row' | 'column';
}

export function Cards({
    columns = '1',
    direction
}: CardsProps) {

    return (
        <>
            {ourValues.length > 0 && (
                <Grid
                    columns={columns} mobileColumns="1"
                    fillWidth marginBottom="40" gap="12">
                    {/* Map over the ourValues array */}
                    {ourValues.map((ourValue) => (
                        <ValueCard // Using ValueCard here
                            key={ourValue.name} // Using ourValue name as a unique key
                            ourValue={ourValue} // Passing the ourValue object as a prop
                            direction={direction}
                        />
                    ))}
                </Grid>
            )}
        </>
    );
}
