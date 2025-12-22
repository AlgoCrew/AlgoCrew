"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Flex, Line, ToggleButton, MegaMenu, Background } from "@once-ui-system/core";

import { routes, display, about, contact, projects, effects } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeLogo } from "./ThemeLogo";
import styles from "./Header.module.scss";
import { opacity, SpacingToken } from "@once-ui-system/core";

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Flex
      as="header"
      position="fixed"
      top="0"
      left="0"
      right="0"
      height="80"
      zIndex={9}
      fillWidth
      horizontal="center"
      vertical="center"
      background="page"
      paddingTop="4"
      paddingBottom="4"
      className={`${scrolled ? styles.hasShadow : ""} ${styles.headerBg} px-3 md:px-12 headerBg`}
    >
      <Flex fillWidth horizontal="space-between" vertical="center" maxWidth="xl">
        <ToggleButton href="/" selected={pathname === "/"} className="m-0 p-0 bg-transparent!">
          <ThemeLogo />
        </ToggleButton>

        <Flex 
          padding="4"
          horizontal="center"
          zIndex={1}
        >
          <Flex gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
            {routes["/services"] && (
              <>
                <MegaMenu
                  className={`${styles.servicesButton} s-flex-hide`}
                  menuGroups={[
                    {
                      id: "services",
                      label: "Services",
                      suffixIcon: "chevronDown",
                      sections: [
                        {
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
  );
};
