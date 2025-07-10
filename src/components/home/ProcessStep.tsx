import React from 'react';
import styles from './ProcessStep.module.scss'; // Keeping original styles import
import { Column, Flex, Heading, Text } from '@once-ui-system/core';
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
              icon={'FaRegLightbulb'}
            />

            <ProcessStep
              number="2"
              title="Create"
              description="We carefully translate the user requirements to a solution in a step-by-step fashion while maintaining the visibility of our progress."
              icon={'FaCogs'}
            />

            <ProcessStep
              number="3"
              title="Iterate"
              description="We Try to evolve the desing in quick iterations to complete rapid-feedback-loop, while focusing on better testing and performance."
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