import { Column, Flex, Heading, Text, Grid, Card } from "@once-ui-system/core";

export default async function IncludedServices({
  service,
}: {
  service: any
}) {
  return (
    <>
      {service.includes && service.includes.length > 0 && (
        <Column maxWidth="m" horizontal="center" gap="xl" paddingTop="xl">
          <div>
            <Heading variant="display-strong-s" align="center" size="xl">
              Services Include
            </Heading>

            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-s">
              Included services for the {service.name} are lisited below
            </Text>
          </div>

          <Flex fillWidth gap="24" mobileDirection="column">
              <Grid
                columns={3} mobileColumns="1"
                fillWidth marginBottom="40" gap="20">
                {service.includes.map((childService: any) => (
                  <Card key={childService.name} fillWidth radius="l-4" direction="column" border="neutral-alpha-medium">
                    <Column key={childService.slug} gap="s" align="center" paddingY="32" paddingX="8">
                      <Heading as="h3" size="m">
                        {childService.name}
                      </Heading>

                      <Text align="center" color="muted" onBackground="neutral-weak" variant="body-default-m">
                        {childService.description}
                      </Text>
                    </Column>
                  </Card>
                ))}
              </Grid>
          </Flex>
        </Column>
      )}
    </>
  );
}