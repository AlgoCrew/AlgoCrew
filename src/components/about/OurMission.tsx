import { Button, Flex, Heading, Row, Media, Background, Text, Column, RevealFx, Particle } from "@once-ui-system/core";

type OurMissionProps = {
  title: string;
  description: any;
  img: any;
};

export const OurMission = ({ commingData }: { commingData: OurMissionProps }) => {
  return (
    <section className="mission-section">
      <RevealFx translateY="16" delay={0.1}>
        <Heading as="h2" id={commingData.title} variant="display-strong-s">
          {commingData.title}
        </Heading>
      </RevealFx>

      {/* The Row container will be what GSAP pins and holds in place */}
      <Particle
        fill
        interactive
        speed={3}
        interactionRadius={30}
        density={200}
        // height={24}
      >{
        <RevealFx translateY="16" delay={0.3} className="z-1">
          <Row fillWidth gap="l" marginTop="m" marginBottom="m" mobileDirection="column" className={`items-center`} align="start">
            <Column fillWidth >
              <Text variant="body-default-l" >
                {commingData.description}
              </Text>
            </Column>

            <Column maxWidth={50}>
              <Media
                src={commingData.img}
                alt={commingData.title}
                className="mission-img"
                aspectRatio="16/9"
                style={{ height: '320px', borderRadius: '8px' }}
                objectFit="scale-down"
              />
            </Column>
          </Row>
        </RevealFx>
        }
      </Particle>
    </section>
  );
};
