import { Column, Flex, Heading, Text, Grid, Card, Background } from "@once-ui-system/core";
import { mailchimp } from "@/resources";
import { opacity, SpacingToken } from "@once-ui-system/core";

export default async function Steps({
  service,
}: {
  service: any
}) {
  return (
    <>
      {service.steps && service.steps.length > 0 && (
        <Column maxWidth="m" horizontal="center" gap="xl">

          <Heading variant="display-strong-s" align="center" size="xl">
            How It Works
          </Heading>

          <Flex
            style={{ position: 'relative' }}
            horizontal="center"
            vertical="center"
            fillWidth
            radius="m"
            paddingTop="20"
            paddingBottom="32"
          >
            <Background
              top="0"
              position="absolute"
              radius="m"
              mask={{
                x: mailchimp.effects.mask.x,
                y: mailchimp.effects.mask.y,
                radius: mailchimp.effects.mask.radius,
                cursor: mailchimp.effects.mask.cursor
              }}
              gradient={{
                display: mailchimp.effects.gradient.display,
                opacity: mailchimp.effects.gradient.opacity as opacity,
                x: mailchimp.effects.gradient.x,
                y: mailchimp.effects.gradient.y,
                width: mailchimp.effects.gradient.width,
                height: mailchimp.effects.gradient.height,
                tilt: mailchimp.effects.gradient.tilt,
                colorStart: mailchimp.effects.gradient.colorStart,
                colorEnd: mailchimp.effects.gradient.colorEnd,
              }}
              dots={{
                display: mailchimp.effects.dots.display,
                opacity: mailchimp.effects.dots.opacity as opacity,
                size: mailchimp.effects.dots.size as SpacingToken,
                color: mailchimp.effects.dots.color,
              }}
              grid={{
                display: mailchimp.effects.grid.display,
                opacity: mailchimp.effects.grid.opacity as opacity,
                color: mailchimp.effects.grid.color,
                width: mailchimp.effects.grid.width,
                height: mailchimp.effects.grid.height,
              }}
              lines={{
                display: mailchimp.effects.lines.display,
                opacity: mailchimp.effects.lines.opacity as opacity,
                size: mailchimp.effects.lines.size as SpacingToken,
                thickness: mailchimp.effects.lines.thickness,
                angle: mailchimp.effects.lines.angle,
                color: mailchimp.effects.lines.color,
              }}
            />

            <Column as="ol" style={{ width: '100%', position: 'relative' }} gap="16" className="pl-2 md:p-0 md:pl-0">
              {service.steps.map((step: any, index: number) => {
                const isRight = index % 2 === 0;
                
                return (
                  <Flex 
                    as="li" 
                    key={index} 
                    gap="m"
                    padding="0"
                    className={`sm:ps-2 flex-row-reverse relative ${isRight ? 'md:justify-content-end md:flex-row! md:text-right' : 'md:justify-content-start md:flex-row-reverse md:text-left'}`}
                  >
                    <div style={{ flex: '1 1 0' }}>
                      <Text onBackground="neutral-weak" variant="body-default-s">
                        step {index + 1}
                      </Text>

                      <Column gap="s" paddingTop="8"
                        className={`${isRight ? 'md:items-end' : 'md:items-start'}`}
                      >
                        <Heading as="h3" size="l" >
                          {step.title}
                        </Heading>
                        <Text onBackground="neutral-weak" variant="heading-default-s" style={{width: '90%'}}>
                          {step.description}
                        </Text>
                      </Column>
                    </div>

                    <Flex
                      // className="s-flex-hide"
                      horizontal="center"
                      vertical="center"
                      style={{
                        position: 'relative',
                        height: 'inherit'
                      }}
                    >
                      <div
                        style={{
                          zIndex: 1,
                          width: '12px',
                          height: '12px',
                          borderRadius: '50rem',
                          backgroundColor: 'white',
                          border: '2px solid rgba(16, 36, 57, 0.7)',
                          top: 8,
                          position: 'absolute',
                        }}
                      />

                      <div
                        style={{
                          position: 'relative',
                          height: '100%', // Extend beyond the circle
                          width: '1px', // Line thickness
                          backgroundColor: 'gray',
                          zIndex: -1,
                          top: '26px', // Position the line below the circle
                        }}
                      />
                    </Flex>

                    <div style={{ flex: '1 1 0' }} className="s-flex-hide"></div>
                  </Flex>
                )
              })}
            </Column>
          </Flex>
        </Column>
      )}
    </>
  );
}