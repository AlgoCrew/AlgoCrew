import React from "react";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Column, Badge, Row, Meta, Schema } from "@once-ui-system/core";
import { home, about, person, newsletter, baseURL, routes } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { SliderItems } from "@/components/services/SliderItems";
import { ProcessSteps } from "@/components/home/ProcessStep";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { OfferingTechnologies } from "@/components/services/OfferingTechnologies";
import Details from "@/components/about/Details";
import { InfoCalendar } from "@/components/Calendars/InfoCalendar";
import AnimatedTestimonials from "@/components/home/Testimonals";
import { SendUsEmail } from "@/components/home/SendUsEmail";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {  
  return (
    <Column maxWidth="xl" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={encodeURIComponent(home.image)}
        author={{
          name: 'Arqam',
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* <Column fillWidth paddingY="24" gap="m">
        <Column maxWidth="s">
          {home.featured.display && (
          <RevealFx fillWidth horizontal="start" paddingTop="16" paddingBottom="32" paddingLeft="12">
            <Badge background="brand-alpha-weak" paddingX="12" paddingY="4" onBackground="neutral-strong" textVariant="label-default-s" arrow={false}
              href={home.featured.href}>
              <Row paddingY="2">{home.featured.title}</Row>
            </Badge>
          </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="body-default-l">
              {home.subline}
            </Text>
          </RevealFx>

          <RevealFx translateY="8" delay={0.3} fillWidth horizontal="start">
            <Column
              id={about.intro.title}
              fillWidth
              minHeight="80"
              vertical="center"
              style={{isolation: "isolate"}}
            >
              <InfoCalendar />
            </Column>
          </RevealFx>
        </Column>
      </Column> */}

      <Column
        fillWidth
        paddingY="64"
        gap="m"
        style={{
          backgroundImage: `url('/images/hero.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgba(0, 0, 0, .6)',
          backgroundBlendMode: 'color',
          minHeight: '700px',
        }}
        horizontal="end"
      >
        <Column maxWidth="s" paddingRight="48" className="px-5">
          {home.featured.display && (
            <RevealFx fillWidth horizontal="start" paddingTop="16" paddingBottom="32" paddingLeft="12">
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong" // Keep the background interaction logic if needed
                style={{ color: 'white' }} // Explicitly set text color to white
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="16">
            <Heading
              wrap="balance"
              variant="display-strong-l"
              color="white"
              style={{ color: 'white' }}
            >
              {home.headline}
            </Heading>
          </RevealFx>

          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="32">
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              style={{ color: 'white' }}
              variant="body-default-l"
            >
              {home.subline}
            </Text>
          </RevealFx>

          <RevealFx translateY="8" delay={0.3} fillWidth horizontal="start">
            <Column
              id={about.intro.title}
              fillWidth
              minHeight="80"
              vertical="center"
              style={{isolation: "isolate"}}
            >
              <InfoCalendar />
            </Column>
          </RevealFx>
        </Column>
      </Column>

      <RevealFx translateY="16" delay={1} fillWidth className="px-6 md:px-16">
        <SliderItems />
      </RevealFx>

      <RevealFx translateY="16" delay={1.3} paddingY="64">
        <OfferingTechnologies />
      </RevealFx>

      <RevealFx translateY="16" delay={1} fillWidth horizontal="center">
        <ProcessSteps />
      </RevealFx>

      <RevealFx translateY="16" delay={0.6} fillWidth className="px-6 md:px-16">
        <Projects range={[0]} />
      </RevealFx>

      <RevealFx translateY="16" delay={1} fillWidth horizontal="center">
        <WhyChooseUs />
      </RevealFx>

      <RevealFx translateY="16" delay={1.6} horizontal="center">
        <Details />
      </RevealFx>

      <RevealFx translateY="16" delay={1} fillWidth>
        <AnimatedTestimonials />
      </RevealFx>

      <Column
        maxWidth="xl"
        minHeight="80"
        vertical="center"
        className="px-3 md:px-16"
        // marginBottom="8"
      >
        <SendUsEmail />
      </Column>
    </Column>
  );
}
