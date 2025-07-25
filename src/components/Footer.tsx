import { Flex, IconButton, Text, Heading, Avatar } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Flex
        as="footer"
        fillWidth
        padding="8"
        horizontal="center"
        mobileDirection="column"
        paddingBottom="20"
        paddingTop="48"
      >
        <Flex
          className={styles.mobile}
          maxWidth="m"
          paddingY="8"
          paddingX="16"
          gap="64"
          horizontal="start"
          vertical="start"
        >
          <Flex gap="8" vertical="center" direction="column" maxWidth={20}>
            <Flex gap="16" vertical="center" horizontal="start">
              <Heading variant="body-default-xl">
                Canada
              </Heading>
              <Text variant="body-default-xs">(Global Delivery Center)</Text>
              <Avatar
                marginRight="8"
                style={{ marginLeft: "-0.75rem" }}
                src={"/images/countries/canada1.webp"}
                size="m"
              />
            </Flex>

            <Flex gap="16" vertical="start" horizontal="start">
              <Text variant="body-default-s" className="text-left">
                35 herkley dr Brampton Ontario  L6v 2e7 Canada
              </Text>
            </Flex>

            <Flex gap="16" vertical="center">
              <Text variant="body-default-s">
                +1 (437) 383‑6794
              </Text>
            </Flex>
          </Flex>

          {/* <Flex gap="8" vertical="center" direction="column" maxWidth={20}>
            <Flex gap="16" vertical="center" horizontal="start">
              <Heading variant="body-default-xl">
                Pakistan
              </Heading>
              <Text variant="body-default-xs">(Regional office)</Text>
              <Avatar
                marginRight="8"
                style={{ marginLeft: "-0.75rem" }}
                src={"/images/countries/pk1.webp"}
                size="m"
              />
            </Flex>

            <Flex gap="16" vertical="center">
              <Text variant="body-default-s">
                135 h1, WAPDA Town, Lahore, 54000
              </Text>
            </Flex>

            <Flex gap="16" vertical="center">
              <Text variant="body-default-s">
                +92 300 6161806
              </Text>
            </Flex>
          </Flex> */}
        </Flex>

        <Flex height="80" show="s"></Flex>
      </Flex>

      <Flex
        as="footer"
        fillWidth
        padding="8"
        horizontal="center"
        mobileDirection="column"
      >
        <Flex
          className={styles.mobile}
          maxWidth="m"
          paddingY="8"
          paddingX="16"
          gap="16"
          horizontal="space-between"
          vertical="center"
        >
          <Text variant="body-default-s" onBackground="neutral-strong">
            <Text onBackground="neutral-weak">© {currentYear} /</Text>
            <Text paddingX="4">AlgoCrew</Text>
          </Text>

          <Flex gap="16">
            {social.map(
              (item) =>
                item.link && (
                  <IconButton
                    key={item.name}
                    href={item.link}
                    icon={item.icon}
                    tooltip={item.name}
                    size="s"
                    variant="ghost"
                  />
                ),
            )}
          </Flex>
        </Flex>
        <Flex height="80" show="s"></Flex>
      </Flex>
    </>
  );
};
