// Card.tsx (renamed to ValueCard conceptually, but file remains Card.tsx)
"use client";

import { Scroller, Card, Row, Media, Column, Text, RevealFx, Heading, Flex, IconButton } from '@once-ui-system/core';
import styles from './Cards.module.scss'; // Keeping original styles import
import { ourTeam } from "@/resources";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function OurTeam() {
    return (
				<>
					<Flex fillWidth horizontal="start">
						<Heading wrap="balance" variant="display-strong-s" marginY='20'>
							About Our team
						</Heading>
					</Flex>

					<Scroller fadeColor="transparent">
						<Row gap="16">
							{ourTeam?.map((member, index) => (
								<Card minWidth={22} radius="l-4" direction="column" border="neutral-alpha-medium" key={member?.social?.linkedin} >
									<Media
										border="neutral-alpha-weak"
										sizes="300px"
										fillWidth
										aspectRatio="1/1"
										radius="l"
										alt="Proxima b"
										src={member.photo}
									/>

									<Column fillWidth paddingX="20" paddingY="24" gap="8">
										<Text variant="body-default-xl">{member.name}</Text>
										<Text onBackground="neutral-weak" variant="body-default-s">
											{member.bio}
										</Text>

										<Flex gap='8'>
											<IconButton href={member.social.linkedin}>
												<FaLinkedin />
											</IconButton>

											<IconButton href={member.social.github}>
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
