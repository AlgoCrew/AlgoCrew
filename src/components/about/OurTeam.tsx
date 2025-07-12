// Card.tsx (renamed to ValueCard conceptually, but file remains Card.tsx)
"use client";

import { Scroller, Card, Row, Media, Column, Text, RevealFx, Heading, Flex } from '@once-ui-system/core';
import styles from './Cards.module.scss'; // Keeping original styles import
import { ourProjects } from "@/resources";

export default function OurTeam() {
    return (
				<>
					<Flex fillWidth horizontal="start">
						<Heading wrap="balance" variant="display-strong-s" marginBottom='16'>
							About Our team
						</Heading>
					</Flex>

					<Scroller fadeColor="transparent">
						<Row gap="16">
							{ourProjects?.map((project, index) => (
								<Card minWidth={30} radius="l-4" direction="column" border="neutral-alpha-medium" key={index}>
									<Media
										border="neutral-alpha-weak"
										sizes="400px"
										fillWidth
										aspectRatio="4 / 3"
										radius="l"
										alt="Proxima b"
										src="/images/projects/project-01/placeholder.png"
									/>

									<Column fillWidth paddingX="20" paddingY="24" gap="8">
										<Text variant="body-default-xl">Muhammad Arqam</Text>
										<Text onBackground="neutral-weak" variant="body-default-s">
											A planet so cruel on the surface, but once you explore what is underneath, you will question
											everything you know. Yet, you vibe with it.
										</Text>
									</Column>
								</Card>
							))}
						</Row>
					</Scroller>
				</>
    );
}
