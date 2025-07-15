"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, ToggleButton, MegaMenu, MobileMegaMenu } from "@once-ui-system/core";

import { routes, display, person, about, blog, work, projects, services } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <>
      <Fade hide="s" fillWidth position="fixed" height="80" zIndex={9} />
      <Fade show="s" fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9} />
      <Flex
        fitHeight
        position="unset"
        className={styles.position}
        as="header"
        zIndex={9}
        fillWidth
        paddingTop="8"
        paddingBottom="8"
        horizontal="center"
        data-border="rounded"
      >
        <Flex fillWidth horizontal="center">
          <Flex
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Flex gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/services"] && (
                <>
                  {/* <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="rocket"
                    // href="/services"
                    // label={services.label}
                    selected={pathname === "/services"}
                  /> */}
                  <MegaMenu
                    className="s-flex-hide"
                    menuGroups={[
                      {
                        id: "services",
                        label: "Services",
                        suffixIcon: "chevronDown",
                        sections: [
                          {
                            // title: "Offering",
                            links: [
                              {
                                label: "Web & App Development",
                                href: "services/web-app",
                                icon: "code",
                                description: "Custom digital product solutions",
                              },
                              {
                                label: "Cloud & DevOps",
                                href: "services/cloud",
                                icon: "clouds",
                                description: "Scalable cloud infrastructure services",
                              },
                              {
                                label: "Security & Quality",
                                href: "services/quality",
                                icon: "shield",
                                description: "Protection and performance assurance",
                              },
                              {
                                label: "Data, AI & Automation",
                                href: "services/automation",
                                icon: "bulb",
                                description: "Intelligent insights and automation",
                              },
                              {
                                label: "Microsoft Solutions",
                                href: "services/microsoft",
                                icon: "server",
                                description: "Enterprise-ready Microsoft platforms",
                              },
                              {
                                label: "Team & Support Services",
                                href: "services/team",
                                icon: "users",
                                description: "On-demand tech talent support",
                              },
                              {
                                label: "Emerging Tech",
                                href: "services/emerging",
                                icon: "sparkle",
                                description: "Next-gen immersive technologies",
                              },
                              {
                                label: "Gaming",
                                href: "services/gaming",
                                icon: "game",
                                description: "Creative and immersive gaming",
                              },
                            ],
                          },
                          {
                            // title: "All services",
                            links: [
                              {
                                label: "Services",
                                href: "/services",
                                icon: "rocket",
                                description: "see all our services",
                              },
                              {
                                label: "Hire a Developer",
                                href: "/hire",
                                icon: "email",
                                description: "Hire our dedicated team",
                              },
                            ],
                          },
                        ],
                      },
                    ]}
                  />
                  
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="rocket"
                    href="/services"
                    selected={pathname === "/services"}
                  />
                </>
              )}

              {routes["/about"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="person"
                    href="/about"
                    label={about.label}
                    selected={pathname === "/about"}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="person"
                    href="/about"
                    selected={pathname === "/about"}
                  />
                </>
              )}
              {routes["/work"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="grid"
                    href="/work"
                    label={work.label}
                    selected={pathname.startsWith("/work")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="grid"
                    href="/work"
                    selected={pathname.startsWith("/work")}
                  />
                </>
              )}
              {/* {routes["/blog"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="book"
                    href="/blog"
                    label={blog.label}
                    selected={pathname.startsWith("/blog")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="book"
                    href="/blog"
                    selected={pathname.startsWith("/blog")}
                  />
                </>
              )} */}
              {routes["/projects"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="gallery"
                    href="/projects"
                    label={projects.label}
                    selected={pathname.startsWith("/projects")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="gallery"
                    href="/projects"
                    selected={pathname.startsWith("/projects")}
                  />
                </>
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
