import React from 'react';
import styles from './ProcessStep.module.scss'; // Keeping original styles import
import { Column, Flex, Heading, Text, RevealFx } from '@once-ui-system/core';
import {
    FaRegLightbulb, FaCogs, FaSyncAlt
} from 'react-icons/fa'; // Using Font Awesome icons as an example

const IconComponents: { [key: string]: React.ElementType } = {
    FaRegLightbulb, FaCogs, FaSyncAlt
};

export function ProcessSteps() {
  return (
    <>
      <div className={styles.processSectionContainer}>
        <div className={styles.processContentWrapper}>
          {/* Section Header */}
          <div className={styles.sectionHeader}>
            {/* <Heading
              as="h2"
              variant="heading-strong-l"
              wrap="balance"
              className='mb-3'
            >
              Our Process
            </Heading> */}

            <Heading
              wrap="balance"
              variant="display-strong-s"
              className={`mb-3 ${styles.stepTitle}`}
            >
              Our Process
            </Heading>

            <div className={styles.processHeaderUnderline}></div>

            <Text className={styles.sectionDescription} onBackground="neutral-weak" variant="heading-default-s">
              Great creations begin with thoughtful planning. Our process is precise, ensuring we deliver only the highest quality.
            </Text>
          </div>

          {/* Process Steps Container */}
          <div className={styles.processStepsContainer}>

            <ProcessStep
              number="1"
              title="Think"
              description="We prioritize understanding user requirements to ensure that the system architecture blueprint perfectly aligns with their needs."
              icon={'FaRegLightbulb'}
            />

            <ProcessStep
              number="2"
              title="Create"
              description="We meticulously translate user requirements into solutions, executing each step with precision while keeping progress transparent and visible."
              icon={'FaCogs'}
            />

            <ProcessStep
              number="3"
              title="Iterate"
              description="We continuously evolve the design through rapid iterations, fostering a quick feedback loop while prioritizing thorough testing and optimal performance."
              icon={'FaSyncAlt'}
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
  icon: string;
}) => {

  const IconComponent = icon ? IconComponents[icon] : null;

  return (
    <div className={styles.processStep}>
      <div className={styles.processStepIconWrapper}>
        <div className={styles.stepCircleBase}>
          {IconComponent && (
            <IconComponent size={48} className={styles.faIcon}/> // Render the icon
          )}
        </div>

        <Text className={`${styles.numberOverlayDefault}`}>
          {number}
        </Text>
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