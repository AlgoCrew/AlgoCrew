"use client";

import * as Icons from 'react-icons/fa';
import { FaLaptopCode, FaMobileAlt, FaCode, FaPaintBrush, FaBuilding, FaCogs, FaUsers,    FaPowerOff, FaGlobe, FaCube, FaLink, FaBrain, FaMagic, FaChartBar,    FaHandshake, FaCheckCircle, FaCloudUploadAlt, FaShieldAlt, FaCloud,    FaShoppingCart, FaTools, FaRobot, FaPalette, FaEthereum, FaVrCardboard,    FaCloudMeatball, FaExchangeAlt, FaSyncAlt, FaSellsy, FaUserShield, FaAutoprefixer, FaRegCheckCircle,    FaShopify, FaShoppingBasket, FaWordpressSimple, FaRocket} from 'react-icons/fa';
const IconComponents: { [key: string]: React.ElementType } = {    FaLaptopCode, FaMobileAlt, FaCode, FaPaintBrush, FaBuilding, FaCogs, FaUsers,    FaPowerOff, FaGlobe, FaCube, FaLink, FaBrain, FaMagic, FaChartBar,    FaHandshake, FaCheckCircle, FaCloudUploadAlt, FaShieldAlt, FaCloud,    FaShoppingCart, FaTools, FaRobot, FaPalette, FaEthereum, FaVrCardboard,    FaCloudMeatball, FaExchangeAlt, FaSyncAlt, FaSellsy, FaUserShield, FaAutoprefixer, FaRegCheckCircle,    FaShopify, FaShoppingBasket, FaWordpressSimple, FaRocket};

import { useRef, useState } from 'react';
import { Column, Heading, Text, Icon, Flex, SmartLink } from '@once-ui-system/core';
import styles from "./Cards.module.scss";

export default function ServiceCard({ service }: { service: any }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({});
    const IconComponent = service.iconName ? IconComponents[service.iconName] : Icons.FaStar;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        

        const x = e.clientX - left;
        const y = e.clientY - top;
        
        const rotateX = ((y - height / 2) / (height / 2)) * -5;
        const rotateY = ((x - width / 2) / (width / 2)) * 5;

        cardRef.current.style.setProperty("--mouse-x", `${x}px`);
        cardRef.current.style.setProperty("--mouse-y", `${y}px`);
        
        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: `perspective(1000px) rotateX(0deg) rotateY(0deg)`,
        });
    };

    return (
        <div 
            ref={cardRef} 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={style}
            className={styles.premiumCard}
        >
            <div className={styles.lightLeak} />

            <Column padding="40" gap="32" className={styles.innerContent}>
                <Flex align="center" content="center" className={styles.iconPortal}>
                    {IconComponent && (
                        <IconComponent size={24} />
                    )}
                </Flex>
                
                <Column gap="12" marginBottom="20">
                    <Heading variant="heading-strong-l">
                        {service.name}
                    </Heading>

                    <Text variant="body-default-m" onBackground="neutral-medium" style={{ opacity: 0.8, fontWeight: 300 }}>
                        {service.short_description}
                    </Text>
                </Column>
                
                <SmartLink className={styles.footerLink} href={service.path}>
                    <div className={styles.line} />
                    <Text variant="label-strong-s" className={styles.linkText}>
                        EXPLORE SERVICE
                    </Text>
                </SmartLink>
            </Column>
        </div>
    );
}
