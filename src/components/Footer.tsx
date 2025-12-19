"use client";

import { Flex, IconButton, Text, Heading, Avatar, Grid, Column, Line, Background, opacity, SpacingToken } from "@once-ui-system/core";
import { person, social, services, routes, effects } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Column as="footer" fillWidth horizontal="center" paddingTop="80" paddingBottom="40" className="px-3 md:px-16">
      {/* Main Footer Content */}
      <Grid columns={4} mobileColumns="1" fillWidth maxWidth="xl" gap="48" marginBottom="64" className="z-2">
        
        {/* Column 1: Brand & Headquarters */}
        <Column gap="16">
            <Heading variant="display-strong-xs" marginBottom="8">
                AlgoCrew<span style={{ color: 'var(--brand-primary, #00cccc)' }}>.</span>
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak" marginBottom="16">
                Pioneering digital excellence through custom software, cloud infrastructure, and emerging technologies.
            </Text>
            <Flex vertical="center" gap="12">
                <Avatar src="/images/countries/canada1.webp" size="s" />
                <Column>
                    <Text variant="label-strong-s">Canada HQ</Text>
                    <Text variant="body-default-xs" onBackground="neutral-weak">Global Delivery Center</Text>
                </Column>
            </Flex>
        </Column>

        {/* Column 2: Quick Links */}
        <Column gap="12">
          <Text variant="label-strong-m" marginBottom="8">Navigation</Text>
          <a href="/about" className={styles.footerLink}>About Us</a>
          <a href="/projects" className={styles.footerLink}>Our Work</a>
          <a href="/services" className={styles.footerLink}>Services</a>
          <a href="/contact" className={styles.footerLink}>Hire a Developer</a>
        </Column>

        {/* Column 3: Contact Details */}
        <Column gap="12">
          <Text variant="label-strong-m" marginBottom="8">Get in Touch</Text>
          <Text variant="body-default-s" onBackground="neutral-weak">
            35 Herkley Dr, Brampton,<br /> Ontario L6V 2E7, Canada
          </Text>
          <Text variant="body-default-s" className={styles.accentText}>
            +1 (437) 450-9656
          </Text>
          <Text variant="body-default-s" onBackground="neutral-weak">
            info@algocrew.com
          </Text>
          <Text variant="body-default-s" onBackground="neutral-weak">
            hr@algocrew.com
          </Text>
        </Column>

        {/* Column 4: Newsletter/CTA */}
        <Column gap="16">
          <Text variant="label-strong-m" marginBottom="8">Compliance</Text>
          <Flex direction="column" gap="8">
            <Text variant="body-default-xs" onBackground="neutral-weak">Registered Corporation</Text>
            <Text variant="body-default-s">1717701-1</Text>
            <Line background="neutral-alpha-medium" fillWidth marginTop="8" />
            <Text variant="body-default-xs" onBackground="neutral-weak" marginTop="8">
                Operating globally with dedicated teams in multiple timezones.
            </Text>
          </Flex>
        </Column>
      </Grid>

      {/* Sub-Footer: Copyright & Socials */}
      <Column fillWidth maxWidth="xl" className="z-2">
        <Line background="neutral-alpha-medium" fillWidth marginBottom="32" />
        <Flex fillWidth horizontal="space-between" vertical="center" mobileDirection="column" gap="24">
          <Flex gap="4" vertical="center">
            <Text variant="body-default-s" onBackground="neutral-weak">
              © {currentYear} AlgoCrew Inc.
            </Text>
            <Text variant="body-default-s" onBackground="neutral-medium" paddingX="8">|</Text>
            <a 
                href="https://ised-isde.canada.ca/cc/lgcy/fdrlCrpDtls.html?lang=eng&corpId=17177011" 
                target="_blank" 
                className={styles.legalLink}
            >
              <Text variant="body-default-xs">Federal Corporation Details</Text>
            </a>
          </Flex>

          <Flex gap="8">
            {social.map((item) => item.link && (
              <IconButton
                key={item.name}
                href={item.link}
                icon={item.icon}
                tooltip={item.name}
                size="m"
                variant="ghost"
                className={styles.socialIcon}
              />
            ))}
          </Flex>
        </Flex>
      </Column>

      <Background
        position="absolute"
        className="bottom-0"
        mask={{
          x: 90,
          y: 100,
          radius: 40,
          cursor: effects.mask.cursor,
        }}
        dots={{
          display: effects.dots.display,
          opacity: effects.dots.opacity as opacity,
          size: effects.dots.size as SpacingToken,
          color: effects.dots.color,
        }}
        grid={{
          display: true,
          opacity: 100,
          color: "brand-alpha-medium",
          width: effects.grid.width,
          height: effects.grid.height,
        }}
      />
    </Column>
  );
};
