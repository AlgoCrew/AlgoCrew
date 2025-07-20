// Card.tsx (renamed to ValueCard conceptually, but file remains Card.tsx)
"use client";

import { Column, Flex, Heading, Text } from '@once-ui-system/core';
import styles from './Cards.module.scss'; // Keeping original styles import

// Import specific icons you plan to use. You might need to add more as you expand.
// For a comprehensive list, refer to the react-icons documentation:
// https://react-icons.github.io/react-icons/
import {
    FaHandshake,
    FaShieldAlt,
    FaUserTie,
    FaFire,
    FaPeopleCarry,
    FaLightbulb,
    FaStar,
} from 'react-icons/fa'; // Using Font Awesome icons as an example

// A mapping object to get the React component from its string name
const IconComponents: { [key: string]: React.ElementType } = {
    FaHandshake,
    FaShieldAlt,
    FaUserTie,
    FaFire,
    FaPeopleCarry,
    FaLightbulb,
    FaStar,
};

interface ValueCardProps {
    ourValue: {
        name: string;
        description: string;
        iconName?: string; // Changed to iconName
    };
    direction?: "row" | "column";
}

export default function Card({ ourValue, direction }: ValueCardProps) {
    // Use ourValue.iconName to get the icon component
    const IconComponent = ourValue.iconName ? IconComponents[ourValue.iconName] : null;

    return (
        <Flex
            position="relative"
            transition="micro-medium"
            direction={direction}
            radius="l"
            className={styles.hover}
            mobileDirection="column"
            fillWidth
            style={{ borderRadius: 'var(--radius-l)', cursor: 'default', flexDirection: direction === 'row' ? 'row' : 'column', height: '100%' }}
        >
            <Column
                position="relative"
                fillWidth gap="8"
                padding="24"
                vertical="center"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }} // Center content for column layout
            >
                {IconComponent && (
                    <IconComponent size={48} style={{ marginBottom: '16px' }} className={styles.iconColor}/> // Render the icon
                )}
                <Heading
                    as="h2"
                    variant="heading-strong-l"
                    wrap="balance"
                    className='mb-3'
                >
                    {ourValue.name}
                </Heading>
                <Text
                    variant="body-default-s"
                    onBackground="neutral-weak">
                    {ourValue.description}
                </Text>
            </Column>
        </Flex>
    );
}
