import {
  Column,
  Flex,
  Heading,
  RevealFx,
  Meta,
  Schema
} from "@once-ui-system/core";
import { baseURL, contact, aboutUs, person } from "@/resources";
import styles from "@/components/about/about.module.scss";
import React from "react";
import { Calendar } from "@/components/services/Calendar";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata() {
  return Meta.generate({
    title: contact.title,
    description: contact.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(contact.title)}`,
    path: contact.path,
  });
}

export default function Contact() {

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
          {/* <Column
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
          </Column> */}

          <ContactForm />
        </Column>
      </Flex>
    </Column>
  );
}
