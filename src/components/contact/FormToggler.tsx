"use client";

import { Column, Flex, Button } from "@once-ui-system/core";
import styles from "@/components/about/about.module.scss";
import formStyles from "@/components/contact/formToggler.module.scss";
import HireDeveloperForm from "@/components/contact/HireDeveloperForm";
import ContactForm from "@/components/contact/ContactForm";
import JobApplicationForm from "@/components/contact/JobApplicationForm";
import React, { useState, useRef, useEffect } from 'react';

type ActiveForm = 'hireDeveloper' | 'generalInquiry' | 'jobApplication';

const TABS: { id: ActiveForm; label: string }[] = [
  { id: 'hireDeveloper',  label: 'Hire a Developer' },
  { id: 'generalInquiry', label: 'General Inquiry'  },
  { id: 'jobApplication', label: 'Apply for a Role' },
];

export default function FormTogger() {
  const [activeForm, setActiveForm] = useState<ActiveForm>('hireDeveloper');
  const [animKey, setAnimKey] = useState(0);
  const prevForm = useRef<ActiveForm>(activeForm);

  function handleTab(id: ActiveForm) {
    if (id === activeForm) return;
    prevForm.current = activeForm;
    setActiveForm(id);
    setAnimKey(k => k + 1);
  }

  return (
    <Column fillWidth gap="xl" horizontal="center" paddingTop="m">
      <Flex
        className={styles.toggleContainer}
        radius="full"
        gap="4"
        horizontal="center"
        align="center"
      >
        {TABS.map(tab => (
          <Button
            key={tab.id}
            onClick={() => handleTab(tab.id)}
            className={styles.toggleButton}
            data-active={activeForm === tab.id}
            variant="tertiary"
            size="m"
            data-border="rounded"
          >
            {tab.label}
          </Button>
        ))}
      </Flex>

      <div key={animKey} className={formStyles.formPanel} style={{ width: '100%' }}>
        <Flex fillWidth horizontal="center">
          <Column className={styles.blockAlign} fillWidth>
            {activeForm === 'hireDeveloper'  && <HireDeveloperForm />}
            {activeForm === 'generalInquiry' && <ContactForm />}
            {activeForm === 'jobApplication' && <JobApplicationForm />}
          </Column>
        </Flex>
      </div>
    </Column>
  );
}
