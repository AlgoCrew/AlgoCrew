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
      {/* {aboutUs.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s"
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )} */}
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
            {/* {about.calendar.display && (
              <Flex
                fitWidth
                border="brand-alpha-medium"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                <Flex paddingX="8">Schedule a call</Flex>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Flex>
            )} */}
                        {/* {social.length > 0 && (
              <Flex className={styles.blockAlign} paddingTop="20" paddingBottom="8" gap="8" wrap horizontal="center" fitWidth data-border="rounded">
                {social.map(
                  (item) =>
                    item.link && (
                        <React.Fragment key={item.name}>
                            <Button
                                className="s-flex-hide"
                                key={item.name}
                                href={item.link}
                                prefixIcon={item.icon}
                                label={item.name}
                                size="s"
                                weight="default"
                                variant="secondary"
                            />
                            <IconButton
                                className="s-flex-show"
                                size="l"
                                key={`${item.name}-icon`}
                                href={item.link}
                                icon={item.icon}
                                variant="secondary"
                            />
                        </React.Fragment>
                    ),
                )}
              </Flex>
            )} */}
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
            <>
              <RevealFx translateY="16" delay={0.1}>
                {/* <OurMission commingData={aboutUs.ourMission}/> */}
                <Heading as="h2" id={aboutUs.ourMission.title} variant="display-strong-s">
                  {aboutUs.ourMission.title}
                </Heading>
              </RevealFx>

              <RevealFx translateY="16" delay={0.3}>
                <Row fillWidth gap="l" marginTop="m" marginBottom="m" mobileDirection="column" className={styles.alignCenter}>
                  <Column fillWidth textVariant="body-default-l" gap="m">
                    {aboutUs.ourMission.description}
                  </Column>

                  <Column maxWidth={50}>
                    <Media
                      src={aboutUs.ourMission.img} // Ensure this path exists in your data
                      alt={aboutUs.ourMission.title}
                      aspectRatio="16/9"
                      style={{ height: '320px', borderRadius: '8px' }}
                      objectFit='scale-down'
                    />
                  </Column>
                </Row>
              </RevealFx>
            </>
          )}

          {aboutUs.ourVision.display && (
            <>
              <RevealFx translateY="16" delay={0.1}>
                <Heading as="h2" id={aboutUs.ourVision.title} variant="display-strong-s">
                  {aboutUs.ourVision.title}
                </Heading>
              </RevealFx>

              <RevealFx translateY="16" delay={0.3}>
                <Row fillWidth gap="l" marginTop="m" marginBottom="m" mobileDirection="column-reverse" className={styles.alignCenter}>
                  <Column maxWidth={50}>
                    <Media
                      src={aboutUs.ourVision.img} // Ensure this path exists in your data
                      alt={aboutUs.ourVision.title}
                      // aspectRatio="16/9"
                      style={{ height: '320px', borderRadius: '8px' }}
                      // objectFit='fill'
                    />
                  </Column>
                  

                  <Column fillWidth textVariant="body-default-l" gap="m">
                    {aboutUs.ourVision.description}
                  </Column>
                </Row>
              </RevealFx>
            </>
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
