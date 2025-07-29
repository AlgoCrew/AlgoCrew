import { Flex, Meta, Schema, Column, RevealFx, Heading, Text } from "@once-ui-system/core";
import { baseURL, projects, person } from "@/resources";
import ProjectCards from "@/components/projects/ProjectCards";
import { Calendar } from "@/components/services/Calendar";

export async function generateMetadata() {
  return Meta.generate({
    title: projects.title,
    description: projects.metaDescription,
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
        description={projects.metaDescription}
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
              Showcase of Excellence
            </Heading>
          </RevealFx>

          <RevealFx translateY="16" delay={0.3}>
            <Column textVariant="body-default-l" fillWidth marginBottom="l">
              {projects.description}
            </Column>
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
