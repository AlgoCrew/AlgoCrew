import { Flex, Meta, Schema, Column, RevealFx, Heading, Text } from "@once-ui-system/core";
import { baseURL, projects, person } from "@/resources";
import ProjectCards from "@/components/projects/ProjectCards";
import { Calendar } from "@/components/services/Calendar";

export async function generateMetadata() {
  return Meta.generate({
    title: projects.title,
    description: projects.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(projects.title)}`,
    path: projects.path,
  });
}

export default function gallery() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={projects.title}
        description={projects.description}
        path={projects.path}
        image='images/og/home.jpg'
        author={{
          name: person.name,
          url: `${baseURL}${projects.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth paddingY="24" gap="m">
        <Column maxWidth="s">
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              Some of our Projects
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="32">
          <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
            We create new quality valued digital products everyday. Check it out!
          </Text>
          </RevealFx>

          <Column
            fillWidth
            minHeight="80"
            vertical="center"
          >
            <Calendar />
          </Column>
        </Column>
      </Column>

      {/* <Column>
      </Column> */}
      <ProjectCards />
    </Column>
  );
}
