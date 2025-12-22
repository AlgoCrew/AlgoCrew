// Hero.tsx
import { Heading, Text, Column, Flex, Button, Row, Badge } from "@once-ui-system/core";
import HeroAnimations from "./HeroAnimations"
import styles from "./Hero.module.scss";

export function Hero() {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.brandGlow} />

      <Flex fillWidth maxWidth="xl" horizontal="center" vertical="center" className={styles.mainFlex}>
        
        <Column maxWidth="m" gap="32" zIndex={1}>
          <Badge background="brand-alpha-weak" className={styles.badge}>
            <span className={styles.liveDot} />
            SYSTEMS ONLINE • ARCHITECTING 2025
          </Badge>

          <Column gap="16">
            <Heading variant="display-strong-xl" onBackground="neutral-strong" className={styles.title}>
              Engineering <br />
              <span className={styles.accentText}>Digital Resilience.</span>
            </Heading>
            <Text variant="body-default-xl" onBackground="neutral-weak" className={styles.subline}>
              We bridge the gap between complex backend architecture and world-class user experiences. Built for Fintech, Health, and Cloud-native pioneers.
            </Text>
          </Column>

          <Row gap="16" vertical="center" mobileDirection="column">
            <Button href='/projects' variant="primary" size="l" weight="strong">
              Explore Archive
            </Button>
            <Button href='/contact' variant="secondary" size="l">
              Start a Project
            </Button>
          </Row>
        </Column>

        <HeroAnimations >
          <div className={`${styles.cardContainer} parallax-layer`}>
            <div className={`${styles.glowOrb} float-element`} />

            <div className={`${styles.miniCardAnalytics} satellite-card`}>
              <Text variant="label-default-xs" style={{opacity: 0.5}}>NODE_TRAFFIC</Text>
              <Text variant="label-strong-s" style={{color: '#00cccc'}}>+240%</Text>
            </div>

            <div className={`${styles.miniCardSecurity} satellite-card`}>
              <div className={styles.securityPulse} />
              <Text variant="label-default-xs">SSL_ACTIVE</Text>
            </div>

            <div className={`${styles.floatingCard} floating-card`}>
              <Column gap="20">
                <Row horizontal="center" vertical="center">
                  <Text variant="label-strong-s" onBackground="neutral-weak">INFRASTRUCTURE STATUS</Text>
                </Row>
                <div className={styles.divider} />
                <Column gap="12">
                  <Flex horizontal="center">
                    <Text variant="label-default-s">Uptime</Text>
                    <Text variant="label-strong-s" style={{color: '#00cccc'}}>99.99%</Text>
                  </Flex>
                  <div className={styles.loadingBar}><div style={{width: '94%'}} /></div>
                  <Flex horizontal="center">
                    <Text variant="label-default-s">Deployment Speed</Text>
                    <Text variant="label-strong-s" style={{color: '#00cccc'}}>2.4ms</Text>
                  </Flex>
                </Column>
                <div className={styles.cardFooter}>
                  <Text variant="label-default-xs">ACTIVE ENCRYPTION: AES-256</Text>
                </div>
              </Column>
            </div>
          </div>
        </HeroAnimations>
      </Flex>

      <div className={styles.scrollZone}>
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
      </div>
    </section>
  );
}
