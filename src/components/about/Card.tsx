"use client";
import { Column, Flex, Heading, Text } from '@once-ui-system/core';
import * as Icons from 'react-icons/fa';
import styles from './Cards.module.scss';

export default function ValueCard({ ourValue }: { ourValue: any }) {
    const IconComponent = (Icons as any)[ourValue.iconName] || Icons.FaStar;

    return (
        <div className={styles.livingCard}>
            <Flex direction="column" padding="32" fillWidth className={styles.cardContent}>
                <div className={styles.iconBox}>
                    <IconComponent size={20} />
                </div>
                
                <Column gap="8">
                    <Heading as="h4" variant="heading-strong-m">
                        {ourValue.name}
                    </Heading>
                    <Text 
                        variant="body-default-s" 
                        onBackground="neutral-weak" 
                        style={{ lineHeight: '1.6' }}
                    >
                        {ourValue.description}
                    </Text>
                </Column>
            </Flex>
        </div>
    );
}
