"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, ToggleButton, MegaMenu } from "@once-ui-system/core";

import { routes, display, person, about, blog, contact, projects, services } from "@/resources";
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
                    className={`${styles.servicesButton} s-flex-hide`}
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
                                href: "/services/web-app-development",
                                icon: "code",
                                description: "Custom digital product solutions",
                              },
                              {
                                label: "Cloud & DevOps",
                                href: "/services/cloud-devops",
                                icon: "clouds",
                                description: "Scalable cloud infrastructure services",
                              },
                              {
                                label: "Security & Quality",
                                href: "/services/security-quality",
                                icon: "shield",
                                description: "Protection and performance assurance",
                              },
                              {
                                label: "E-commerce",
                                href: "/services/e-commerce",
                                icon: "cart",
                                description: "E-commerce platforms for business growth.",
                              },
                              {
                                label: "Data, AI & Automation",
                                href: "/services/data-automation",
                                icon: "bulb",
                                description: "Intelligent insights and automation",
                              },
                              {
                                label: "Microsoft Solutions",
                                href: "/services/microsoft-solutions",
                                icon: "server",
                                description: "Enterprise-ready Microsoft platforms",
                              },
                              {
                                label: "Digital Marketing",
                                href: "/services/digital-marketing",
                                icon: "globe",
                                description: "Boost Your Online Presence",
                              },
                              {
                                label: "Team & Support Services",
                                href: "/services/team-services",
                                icon: "users",
                                description: "On-demand tech talent support",
                              },
                              {
                                label: "Emerging Tech",
                                href: "/services/emerging-tech",
                                icon: "sparkle",
                                description: "Next-gen immersive technologies",
                              },
                              {
                                label: "Gaming",
                                href: "/services/gaming",
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
                                href: "/contact",
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
              {routes["/projects"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="collections"
                    href="/projects"
                    label={projects.label}
                    selected={pathname.startsWith("/projects")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="collections"
                    href="/projects"
                    selected={pathname.startsWith("/projects")}
                  />
                </>
              )}
              {routes["/contact"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="phone"
                    href="/contact"
                    label={contact.label}
                    selected={pathname.startsWith("/contact")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="phone"
                    href="/contact"
                    selected={pathname.startsWith("/contact")}
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
