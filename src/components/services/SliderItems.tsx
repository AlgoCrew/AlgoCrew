"use client";

import { Heading, Row, Text, Column, SmartLink, Media, Card, Button } from '@once-ui-system/core';
import React, { useState } from 'react';
import styles from './Technologies.module.scss';
import { allSliderServices as initialAllServices } from "@/resources";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

interface Service {
    name: string;
    iconName?: string;
    path?: string;
    img?: any;
}

const allServicesWithIcons: Service[] = initialAllServices as Service[];

const INITIAL_VISIBLE_COUNT = 4;

export function SliderItems() {
  const [showAll, setShowAll] = useState(false);

  const initialServices = allServicesWithIcons.slice(0, INITIAL_VISIBLE_COUNT);
  
  const allServices = allServicesWithIcons;

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  // const ServiceCard = ({ tech }: { tech: Service }) => (
  //   <SmartLink href={tech.path} unstyled>
  //     <Card radius="l-4" direction="column" border="neutral-alpha-medium" background="brand-alpha-weak" className='aa'>
  //       <Media
  //         border="neutral-alpha-weak"
  //         sizes="s:300px"
  //         fillWidth
  //         // width={21}
  //         height={15}
  //         radius="l"
  //         alt={tech.name}
  //         src={tech.img}
  //         className={styles.swiperImage}
  //         unoptimized
  //       />
  //       <Column fillWidth paddingLeft="20" paddingY="24" gap="8" >
  //         <Text onBackground="neutral-strong" variant="heading-default-s" className={styles.statDescription}>
  //           {tech.name}
  //         </Text>
  //       </Column>
  //     </Card>
  //   </SmartLink>
  // );
  const ServiceCard = ({ tech }: { tech: Service }) => (
  <SmartLink href={tech.path} unstyled fillWidth>
    <Card 
      radius="l-4" 
      direction="column" 
      // border="neutral-alpha-medium" 
      // background="brand-alpha-medium"
      style={{ overflow: 'hidden', minWidth: '100%', }} 
      className={styles.imageContainer}
    >
      <Media
        border="neutral-alpha-weak"
        sizes="s:300px"
        fillWidth
        // KEEPING these props, but the issue is likely their implementation
        // width={20} 
        height={15}
        radius="l"
        alt={tech.name}
        src={tech.img}
        className={styles.swiperImage}
        // unoptimized
      />
      <Column fillWidth paddingLeft="20" paddingY="24" gap="8" >
        <Text onBackground="neutral-strong" variant="heading-default-s" className={styles.statDescription}>
          {tech.name}
        </Text>
      </Column>
    </Card>
  </SmartLink>
);

  return (
    <div className={styles.appContainer}>
      <Row fillWidth horizontal="start" className='mx-0' paddingBottom="48">
        <SmartLink href="/services">
          <Column gap="xs" horizontal="start">
            <Text wrap="balance" variant="body-strong-l">
              Our Services
            </Text>
            <Heading wrap="balance" variant="display-strong-m">
              Comprehensive IT Solutions for Modern Business
            </Heading>
          </Column>
        </SmartLink>
      </Row>

      {/* <Row className='mx-0' fillWidth paddingBottom="48" horizontal="start">
        <Text wrap="balance" variant="body-default-l">
          Whether you need one specialist or an entire dedicated team, we deliver flexible, scalable solutions
          tailored to your business needs
        </Text>
      </Row> */}

      {!showAll && (
        <>
          <div className={styles.blockGrid}>
            {initialServices.map((tech, index) => (
              <div key={`${tech.name}-${index}`} className={styles.blockItem}>
                <ServiceCard tech={tech} />
              </div>
            ))}
          </div>

          {allServices.length > INITIAL_VISIBLE_COUNT && (
            <Row fillWidth horizontal="center" paddingTop="32">
              <Button onClick={handleShowAll} variant="primary">
                Show All Services
              </Button>
            </Row>
          )}
        </>
      )}

      {showAll && (
        <>
          <div className={styles.blockGrid}>
            {allServices.map((tech, index) => (
              <div key={`${tech.name}-${index}`} className={styles.blockItem}>
                <ServiceCard tech={tech} />
              </div>
            ))}
          </div>

          <Row fillWidth horizontal="center" paddingTop="32">
            <Button onClick={handleShowLess} variant="secondary">
              Show Less
            </Button>
          </Row>
        </>
      )}
    </div>
  );
}
