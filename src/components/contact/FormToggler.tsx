"use client";

import { Column, Flex, Button } from "@once-ui-system/core";
import styles from "@/components/about/about.module.scss";
import HireDeveloperForm from "@/components/contact/HireDeveloperForm";
import ContactForm from "@/components/contact/ContactForm";
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"; // Highly recommended for professional tab switching

type ActiveForm = 'hireDeveloper' | 'generalInquiry';

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
        <Button
          onClick={() => setActiveForm('hireDeveloper')}
          className={styles.toggleButton}
          data-active={activeForm === 'hireDeveloper'}
          variant="tertiary" // We override styles in SCSS
          size="m"
          data-border="rounded"
        >
          Hire a Developer
        </Button>

        <Button
          onClick={() => setActiveForm('generalInquiry')}
          className={styles.toggleButton}
          data-active={activeForm === 'generalInquiry'}
          variant="tertiary"
          size="m"
          data-border="rounded"
        >
          General Inquiry
        </Button>
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
          {activeForm === 'hireDeveloper' ? (
            <Flex fillWidth horizontal="center">
              <Column className={styles.blockAlign} fillWidth>
                <HireDeveloperForm />
              </Column>
            </Flex>
          ) : (
            <Flex fillWidth horizontal="center">
              <Column className={styles.blockAlign} fillWidth>
                <ContactForm />
              </Column>
            </Flex>
          )}
        </motion.div>
      </AnimatePresence>
    </Column>
  );
}
