import {
  Column,
  Flex,
  Heading,
  RevealFx,
  Meta,
  Row,
  Media,
  Schema
} from "@once-ui-system/core";
import { baseURL, about, aboutUs, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";
import { Cards } from "@/components/about/Cards";
import OurTeam from "@/components/about/OurTeam";
import { Calendar } from "@/components/services/Calendar";
import { OurMission } from "@/components/about/OurMission";
import ContactForm from "@/components/ContactForm";
import { OurVision } from "@/components/about/OurVision";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: aboutUs.intro.title,
      display: aboutUs.intro.display,
      items: [],
    },
    {
      title: aboutUs.ourMission.title,
      display: aboutUs.ourMission.display,
      items: [],
    },
    {
      title: aboutUs.ourVision.title,
      display: aboutUs.ourVision.display,
      items: [],
    },
    {
      title: aboutUs.ourValues.title,
      display: aboutUs.ourValues.display,
      items: [],
    },
  ];

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={aboutUs.title}
        description={aboutUs.description}
        path={aboutUs.path}
        image={`/api/og/generate?title=${encodeURIComponent(aboutUs.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${aboutUs.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
 
      <Flex fillWidth mobileDirection="column" horizontal="center">
        <Column className={styles.blockAlign} flex={12} fillWidth>
          <Column
            id={aboutUs.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
            marginTop="32"
          >
            <RevealFx translateY="16" delay={0.1}>
              <Heading className={styles.textAlign}  variant="display-strong-xl">
                {aboutUs.title}
              </Heading>
            </RevealFx>

            <RevealFx translateY="16" delay={0.3}>
              <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="l" marginTop="l">
                {aboutUs.description}
              </Column>
            </RevealFx>

            <Calendar />
          </Column>


          {aboutUs.ourMission.display && (
            <OurMission commingData={aboutUs.ourMission}/>
          )}

          {aboutUs.ourVision.display && (
            <OurVision commingData={aboutUs.ourVision}/>
          )}

          <OurTeam />

          {aboutUs.ourValues.display && (
            <>
              <Heading as="h2" id={aboutUs.ourValues.title} variant="display-strong-s" marginBottom="m" marginTop="l">
                {aboutUs.ourValues.title}
              </Heading>

              <RevealFx translateY="16" delay={0.6}>
                <Flex fillWidth gap="24" mobileDirection="column">
                  <Flex flex={3} paddingX="20">
                    <Cards columns="2" />
                  </Flex>
                </Flex>
              </RevealFx>
            </>
          )}
        </Column>
      </Flex>
    </Column>
  );
}
