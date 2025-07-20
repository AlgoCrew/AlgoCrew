// // Card.tsx (renamed to ValueCard conceptually, but file remains Card.tsx)
// "use client";

// import { Scroller, Card, Row, Media, Column, Text, RevealFx, Heading, Flex, IconButton } from '@once-ui-system/core';
// import styles from './Cards.module.scss'; // Keeping original styles import
// import { ourTeam } from "@/resources";
// import { FaLinkedin, FaGithub } from "react-icons/fa";
// import gsap from 'gsap';
// import SplitText from 'gsap/SplitText';
// import { useEffect } from "react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// export default function OurTeam() {
// 	useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     gsap.utils.toArray(".name-text").forEach((textElement: any) => {
//       const split = new SplitText(textElement, { type: "chars" });

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: textElement,
//           onEnter: () => {
//             tl.restart(); // Restart the animation every time it enters the screen
//           },
//         },
//       });

//       tl.from(split.chars, {
//         x: 20,
//         opacity: 0,
//         duration: 0.2,
//         // ease: "power4",
//         stagger: 0.04,
//         y: 10,
//       });
//     });
//   }, []);

// 	return (
// 				<>
// 					<Flex fillWidth horizontal="start">
// 						<Heading wrap="balance" variant="display-strong-s" marginY='20'>
// 							About Our team
// 						</Heading>
// 					</Flex>

// 					<Scroller fadeColor="transparent" marginTop='12'>
// 						<Row gap="16" className={styles.teamCard}>
// 							{ourTeam?.map((member, index) => (
// 								<Card radius="l-4" direction="column" border="neutral-alpha-medium" key={member?.social?.linkedin} >
// 									<Media
// 										border="neutral-alpha-weak"
// 										sizes="(max-width: 420px) 280px, 300px"
// 										fillWidth
// 										aspectRatio="1/1"
// 										radius="l"
// 										alt="Proxima b"
// 										src={member.photo}
// 									/>

// 									<Column fillWidth paddingX="20" paddingY="24" gap="8">
// 										<Text variant="body-default-xl" className="name-text">
// 											{member.name}
// 										</Text>

// 										<Text onBackground="neutral-weak" variant="body-default-s">
// 											{member.bio}
// 										</Text>

// 										<Flex gap='8'>
// 											<IconButton href={member.social.linkedin}>
// 												<FaLinkedin />
// 											</IconButton>

// 											<IconButton href={member.social.github}>
// 												<FaGithub />
// 											</IconButton>
// 										</Flex>
// 									</Column>
// 								</Card>
// 							))}
// 						</Row>
// 					</Scroller>
// 				</>
//     );
// }


"use client";

import { useEffect } from "react";
import { Scroller, Card, Row, Media, Column, Text, RevealFx, Heading, Flex, IconButton } from '@once-ui-system/core';
import styles from './Cards.module.scss'; // Keeping original styles import
import { ourTeam } from "@/resources";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function OurTeam() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate text letter by letter
    gsap.utils.toArray(".name-text").forEach((textElement: any, index: any) => {
      const split = new SplitText(textElement, { type: "chars" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textElement,
          onEnter: () => {
            tl.restart(); // Restart the animation every time it enters the screen
          },
        },
      });

      tl.from(split.chars, {
        x: 20,
        opacity: 0,
        duration: index * 0.3,
        stagger: 0.04,
        y: 10,
      });
    });

		gsap.utils.toArray(".social-icon").forEach((button: any) => {
      gsap.fromTo(
        button,
        { scale: 0.8 }, // Start slightly smaller
        {
          scale: 1, // Scale up to 110%
          duration: 1.5, // Duration for one full bounce (scale up and down)
          yoyo: true, // Go back to the start value (scale 0.9)
          repeat: -1, // Repeat indefinitely
          ease: "power1.inOut", // Smooth easing for a bouncy feel
        }
      );
    });

  }, []);

  return (
    <>
      <Flex fillWidth horizontal="start">
        <Heading wrap="balance" variant="display-strong-s" marginY='20'>
          About Our team
        </Heading>
      </Flex>

      <Scroller fadeColor="transparent" marginTop='12'>
        <Row gap="16" className={styles.teamCard}>
          {ourTeam?.map((member, index) => (
            <Card radius="l-4" direction="column" border="neutral-alpha-medium" key={member?.social?.linkedin}>
              <Media
                border="neutral-alpha-weak"
                sizes="(max-width: 420px) 280px, 300px"
                fillWidth
                aspectRatio="1/1"
                radius="l"
                alt="Proxima b"
                src={member.photo}
              />

              <Column fillWidth paddingX="20" paddingY="24" gap="8">
                <Text variant="body-default-xl" className="name-text">
                  {member.name}
                </Text>

                <Text onBackground="neutral-weak" variant="body-default-s">
                  {member.bio}
                </Text>

                <Flex gap='8'>
                  {/* Apply class for bouncy animation */}
                  <IconButton href={member.social.linkedin} className="social-icon">
                    <FaLinkedin />
                  </IconButton>

                  <IconButton href={member.social.github} className="social-icon">
                    <FaGithub />
                  </IconButton>
                </Flex>
              </Column>
            </Card>
          ))}
        </Row>
      </Scroller>
    </>
  );
}

