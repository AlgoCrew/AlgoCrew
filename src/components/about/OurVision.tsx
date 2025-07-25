import { Button, Flex, Heading, Row, Media, Background, Column, RevealFx, Particle } from "@once-ui-system/core";

type OurVisionProps = {
  title: string;
  description: any;
  img: any;
};

export const OurVision = ({ commingData }: { commingData: OurVisionProps }) => {
  return (
    <section className="vision-section mt-l">
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
            <Row fillWidth gap="l" marginTop="m" marginBottom="m" mobileDirection="column-reverse" className={`items-center`} align="start">
              <Column maxWidth={50}>
                <Media
                  src={commingData.img}
                  alt={commingData.title}
                  className="vision-img"
                  aspectRatio="16/9"
                  style={{ height: '320px', borderRadius: '8px' }}
                  objectFit="scale-down"
                />
              </Column>

              <Column fillWidth textVariant="body-default-l" gap="m" className="vision-text">
                {commingData.description}
              </Column>
            </Row>
          </RevealFx>
        }
      </Particle>
    </section>
  );
};
