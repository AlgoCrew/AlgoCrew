import React from 'react';
import styles from './ProcessStep.module.scss'; // Keeping original styles import
import { Column, Flex, Heading, Text } from '@once-ui-system/core';

export function ProcessSteps() {
  return (
    <>
      <div className={styles.processSectionContainer}>
        <div className={styles.processContentWrapper}>
          {/* Section Header */}
          <div className={styles.sectionHeader}>
            <Heading
              as="h2"
              variant="heading-strong-l"
              wrap="balance"
              className='mb-3'
            >
              Our Process
            </Heading>

            <div className={styles.processHeaderUnderline}></div>

            <Text className={styles.sectionDescription} onBackground="neutral-weak" variant="heading-default-s">
              Before creation, there is thinking. Our process is sharp and let
              us craft the best quality.
            </Text>
          </div>

          {/* Process Steps Container */}
          <div className={styles.processStepsContainer}>

            <ProcessStep
              number="1"
              title="Think"
              description="We try to understand the user requirements to ensure that the blueprint of system architecture meet user needs."
              icon={<i className={`fa-regular fa-lightbulb  ${styles.faIcon}`}></i>}
            />

            <ProcessStep
              number="2"
              title="Create"
              description="We carefully translate the user requirements to a solution in a step-by-step fashion while maintaining the visibility of our progress."
              icon={<i className={`fa-solid fa-cogs ${styles.faIcon}`}></i>}
            />

            <ProcessStep
              number="3"
              title="Iterate"
              description="We Try to evolve the desing in quick iterations to complete rapid-feedback-loop, while focusing on better testing and performance."
              icon={<i className={`fa-solid fa-sync-alt  ${styles.faIcon}`}></i>}
            />
          </div>
        </div>
      </div>
    </>
  );
}

// Reusable ProcessStep component
const ProcessStep = ({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className={styles.processStep}>
      <div className={styles.processStepIconWrapper}>
        <div className={styles.stepCircleBase}>
          {icon}
        </div>

        <div className={`${styles.numberOverlayDefault}`}>
          {number}
        </div>
      </div>

      <Flex>
        {/* <Heading
          wrap="balance"
          className={`mb-3 ${styles.stepNumberLarge}`}
        >
          {number}
        </Heading> */}

        <div>
          <Heading
            wrap="balance"
            className={`mb-3 ${styles.stepTitle}`}
          >
            {title}
          </Heading>

          <p className={styles.stepDescription}>
            {description}
          </p>
        </div>
      </Flex>
    </div>
  );
};