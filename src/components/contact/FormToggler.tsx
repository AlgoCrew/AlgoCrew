"use client"
import {
  Column,
  Flex,
  Schema,
  Button,
} from "@once-ui-system/core";
import { baseURL, aboutUs, person } from "@/resources";
import styles from "@/components/about/about.module.scss";
import HireDeveloperForm from "@/components/contact/HireDeveloperForm";
import React, { useState } from 'react';
import ContactForm from "@/components/contact/ContactForm";

type ActiveForm = 'hireDeveloper' | 'generalInquiry';

export default function FormTogger() {
  const [activeForm, setActiveForm] = useState<ActiveForm>('hireDeveloper');

  return (
    <Column maxWidth="m" gap="s" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={aboutUs.title}
        description={aboutUs.description}
        path={aboutUs.path}
        image="/images/og/about.jpg"
        author={{
          name: person.name,
          url: `${baseURL}${aboutUs.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Flex gap="s" horizontal="center" align="center" padding="s" radius="l">
        <Button
          onClick={() => setActiveForm('hireDeveloper')}
          variant={activeForm === 'hireDeveloper' ? 'primary' : 'secondary'}
          size="m"
        >
          Hire a Developer
        </Button>
        <Button
          onClick={() => setActiveForm('generalInquiry')}
          variant={activeForm === 'generalInquiry' ? 'primary' : 'secondary'}
          size="m"
        >
          General Inquiry
        </Button>
      </Flex>
 
      {activeForm === 'hireDeveloper' && (
        <Flex fillWidth mobileDirection="column" horizontal="center">
          <Column className={styles.blockAlign} flex={12} fillWidth>
            <HireDeveloperForm />
          </Column>
        </Flex>
      )}

      {activeForm === 'generalInquiry' && (
        <Flex fillWidth mobileDirection="column" horizontal="center">
          <Column className={styles.blockAlign} flex={12} fillWidth>
            <ContactForm />
          </Column>
        </Flex>
      )}
    </Column>
  );
}
