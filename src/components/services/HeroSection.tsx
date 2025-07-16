import { Column, Flex, Heading, Text } from "@once-ui-system/core";

export default async function HeroSection({
  service,
}: {
  service: any
}) {
  return (
    <Column maxWidth="l" horizontal="center" gap="m">
      <Flex
        horizontal="center"
        vertical="center"
        style={{
          backgroundImage: `url(${service.image})`, // Overlay + Image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '600px', // Adjust as needed
          width: '100%',
          borderRadius: '8px',
          position: 'relative', // Needed for absolute positioning of text if you go that route
          color: 'white', // Text color for contrast
          textAlign: 'center', // Center text within the flex container
          padding: '2rem' // Add some padding inside
        }}
        data-border="rounded" // Apply border radius to the Flex container
      >
      </Flex>

      <Flex style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        backgroundColor: '#1024399e',
        overflow: 'hidden',
        width: '60%',
        height: '100%',
        transition: '.4s ease',
        borderRadius: '8px 0 50rem 8px',
      }}>
        <Column maxWidth="s" gap="s" align="center" style={{justifyContent: 'center', color: 'white !important'}}>
          <Heading align="center" variant="display-strong-s" style={{color: 'white'}}>
            {service.name}
          </Heading>

          <Text align="center" size="l" style={{maxWidth: '70%', marginLeft: '15%', color: 'white'}}>
            {service.description}
          </Text>
        </Column>
      </Flex>
    </Column>
  );
}