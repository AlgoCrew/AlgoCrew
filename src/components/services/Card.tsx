// Card.tsx (renamed to ServiceCard conceptually, but file remains Card.tsx)
"use client";

import { Column, Flex, Heading, Text, Card, SmartLink } from '@once-ui-system/core';

import styles from './Cards.module.scss'; // Keeping original styles import

// Import specific icons you plan to use. You might need to add more as you expand.
// For a comprehensive list, refer to the react-icons documentation:
// https://react-icons.github.io/react-icons/
import {
    FaLaptopCode, FaMobileAlt, FaCode, FaPaintBrush, FaBuilding, FaCogs, FaUsers,
    FaPowerOff, FaGlobe, FaCube, FaLink, FaBrain, FaMagic, FaChartBar,
    FaHandshake, FaCheckCircle, FaCloudUploadAlt, FaShieldAlt, FaCloud,
    FaShoppingCart, FaTools, FaRobot, FaPalette, FaEthereum, FaVrCardboard,
    FaCloudMeatball, FaExchangeAlt, FaSyncAlt, FaSellsy, FaUserShield, FaAutoprefixer, FaRegCheckCircle,
    FaShopify, FaShoppingBasket
} from 'react-icons/fa'; // Using Font Awesome icons as an example

// A mapping object to get the React component from its string name
const IconComponents: { [key: string]: React.ElementType } = {
    FaLaptopCode, FaMobileAlt, FaCode, FaPaintBrush, FaBuilding, FaCogs, FaUsers,
    FaPowerOff, FaGlobe, FaCube, FaLink, FaBrain, FaMagic, FaChartBar,
    FaHandshake, FaCheckCircle, FaCloudUploadAlt, FaShieldAlt, FaCloud,
    FaShoppingCart, FaTools, FaRobot, FaPalette, FaEthereum, FaVrCardboard,
    FaCloudMeatball, FaExchangeAlt, FaSyncAlt, FaSellsy, FaUserShield, FaAutoprefixer, FaRegCheckCircle,
    FaShopify, FaShoppingBasket
};

interface ServiceCardProps {
    service: {
        name: string;
        short_description: string;
        path: string;
        iconName?: string; // Changed to iconName
    };
    direction?: "row" | "column";
}

export default function ServiceCard({ service, direction }: ServiceCardProps) {
    // Use service.iconName to get the icon component
    const IconComponent = service.iconName ? IconComponents[service.iconName] : null;

    return (
        <Flex
            position="relative"
            transition="micro-medium"
            direction={direction}
            // radius="l"
            className={`${styles.hover} h-fit`}
            mobileDirection="column"
            fillWidth
            radius="l-4"
            style={{ cursor: 'default', flexDirection: direction === 'row' ? 'row' : 'column', height: '100%' }}
        >
            <Card radius="l-4" fillWidth fillHeight>
                <SmartLink href={service.path}>
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
                            {service.name}
                        </Heading>

                        <Text
                            variant="body-default-s"
                            onBackground="neutral-weak">
                            {service.short_description}
                        </Text>
                    </Column>
                </SmartLink>
            </Card>
        </Flex>
    );
}
