"use client";

import { Column, Flex, Button } from "@once-ui-system/core";
import styles from "@/components/about/about.module.scss";
import HireDeveloperForm from "@/components/contact/HireDeveloperForm";
import ContactForm from "@/components/contact/ContactForm";
import JobApplicationForm from "@/components/contact/JobApplicationForm";
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

type ActiveForm = 'hireDeveloper' | 'generalInquiry' | 'jobApplication';

const TABS: { id: ActiveForm; label: string }[] = [
  { id: 'hireDeveloper',  label: 'Hire a Developer' },
  { id: 'generalInquiry', label: 'General Inquiry'  },
  { id: 'jobApplication', label: 'Apply for a Role' },
];

export default function FormTogger() {
  const [activeForm, setActiveForm] = useState<ActiveForm>('hireDeveloper');

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
            onClick={() => setActiveForm(tab.id)}
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

      {/* Animated Content Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeForm}
          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
          transition={{ duration: 0.4, ease: "circOut" }}
          style={{ width: '100%' }}
        >
          <Flex fillWidth horizontal="center">
            <Column className={styles.blockAlign} fillWidth>
              {activeForm === 'hireDeveloper'  && <HireDeveloperForm />}
              {activeForm === 'generalInquiry' && <ContactForm />}
              {activeForm === 'jobApplication' && <JobApplicationForm />}
            </Column>
          </Flex>
        </motion.div>
      </AnimatePresence>
    </Column>
  );
}
