"use client";

import { Flex, Column, RevealFx, Heading, Text } from "@once-ui-system/core";
import { projects } from "@/resources";
import ProjectCards from "@/components/projects/ProjectCards";
import { SendUsEmail } from "@/components/projects/SendUsEmail";
import styles from "@/components/projects/Gallery.module.scss";

export default function Gallery() {
  return (
    <Column maxWidth="l" horizontal="center" fillWidth className="px-6 px-lg-0">
      <Flex 
        fillWidth 
        className={styles.splitLayout} 
        mobileDirection="column" 
        gap="64"
        paddingY="80"
      >
        <Column className={styles.stickyLeft} flex={5}>
          <Text variant="label-strong-s" style={{ color: "#00ccccf0", letterSpacing: '0.2em' }}>
            PORTFOLIO
          </Text>

          <Heading wrap="balance" variant="display-strong-l" marginTop="16" align="start">
            Showcase of <br />
            <span className={styles.highlight}>Excellence</span>
          </Heading>

          <RevealFx translateY="16" delay={0.4}>
            <Text 
                variant="body-default-l" 
                onBackground="neutral-weak" 
                marginTop="32"
                style={{ maxWidth: '400px' }}
            >
              {projects.description}
            </Text>
          </RevealFx>
        </Column>

        <Column flex={7} fillWidth>
          <ProjectCards />
        </Column>
      </Flex>

      <Column
        maxWidth="m"
        minHeight="80"
        vertical="center"
        // marginBottom="8"
      >
        <SendUsEmail />
      </Column>
    </Column>
  );
}
