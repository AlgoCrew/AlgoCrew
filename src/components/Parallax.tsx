"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Flex, Heading, Text, Row, Column, Media, Particle } from "@once-ui-system/core"; // Added Select
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Parallax({
  service,
}: {
  service: any
}) {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.hero-bg', {
      yPercent: 70,  // Adjust this for desired parallax effect
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

  }, []);

  const headingRef = useRef(null); // Create a ref for the heading

  return (
    <>
      {/* <Flex
        overflow="hidden"
        fillWidth
        // padding="l"
        // paddingY="xl"
        radius="l"
        marginY="l"
        horizontal="center"
        align="center"
        background="surface"
        border="neutral-alpha-weak"
        gap='l'
        mobileDirection='column'
      >
        <section className="hero" style={{
            position: 'relative',
            height: '70vh',
            width: '100vw',
            overflow: 'hidden',
        }}>
          <div className="hero-bg" style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              backgroundImage: `url(${service.image})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              borderRadius: '8px',
          }}>
          </div>
          <Flex style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            backgroundColor: '#1024399e',
            overflow: 'hidden',
            width: '60%',
            height: '100%',
            transition: '.4s ease',
            borderRadius: '8px 0 50rem 8px',
          }}>
            <Column maxWidth="s" gap="s" align="center" style={{justifyContent: 'center', color: 'white !important'}}>
              <Heading align="center" variant="display-strong-s" style={{color: 'white'}}>
                {service.name}
              </Heading>

              <Text align="center" size="l" style={{maxWidth: '70%', marginLeft: '15%', color: 'white'}}>
                {service.description}
              </Text>
            </Column>
          </Flex>
        </section>
      </Flex> */}

      {/* <Particle
        fill
        interactive
        speed={3}
        interactionRadius={30}
        density={300}
        // height={24}
      >
        { */}

          <Flex
            overflow="visible"
            fillWidth
            // padding="l"
            // paddingY="xl"
            radius="l"
            marginY="l"
            horizontal="center"
            align="center"
            // background="surface"
            // border="neutral-alpha-weak"
            gap='l'
            mobileDirection='column'
            className='z-1'
          >
            <Column maxWidth="s" gap="s" align="center" style={{justifyContent: 'center', color: 'white !important'}}>
              <div ref={headingRef} >
                <Heading align="center" variant="display-strong-xl">
                  {service.name}
                </Heading>
              </div>

              <Text align="center" size="xl" wrap="balance" onBackground="accent-strong" variant="heading-default-xl" className='px-5'>
                {service.description}
              </Text>
            </Column>

            <Column overflow="visible" maxWidth="s" gap="s" align="center" style={{justifyContent: 'center', color: 'tranparent !important'}} >
              <Media
                src={service.side_image}
                className='h-[70vh]! object-cover fit-cover'
              >
              </Media>
            </Column>
          </Flex>
        {/* }
      </Particle> */}
    </>
  )
}
