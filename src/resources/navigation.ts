import { BOUNDARY_STATEMENT, frameworks, liveFrameworks } from "./frameworks";
import { isServiceLive, servicePath, services } from "./pillars";
import { livePlatforms, platforms } from "./platforms";
import { site } from "./site";

/**
 * Header, drawer and footer menus (docs/website-transformation/04 §8–9).
 *
 * One source for all three, built from the same gated data as the pages and the sitemap,
 * so a menu can never link to a page that is not published.
 */

export type NavLink = { label: string; href: string; descriptor?: string };
export type NavColumn = { heading: string; href?: string; links: NavLink[]; chips?: NavLink[] };
export type NavFeature = { label: string; text: string; href: string };
export type NavItem = {
  id: string;
  label: string;
  /** Hub page. Used as the link when the item has no panel, and as "View all" inside the panel. */
  href: string;
  columns?: NavColumn[];
  feature?: NavFeature;
  footerLink?: NavLink;
};

/**
 * `all: true` ignores every gate and returns the full approved menu (04 §8).
 * It exists only for the internal review page; nothing public may pass it.
 */
export type NavOptions = { all?: boolean };
const pick = ({ all }: NavOptions = {}) => ({
  services: all ? services : services.filter(isServiceLive),
  platforms: all ? platforms : livePlatforms(),
  frameworks: all ? frameworks : liveFrameworks(),
  trust: all || site.trustPageVerified,
});
type Picked = ReturnType<typeof pick>;

export const PRIMARY_CTA: NavLink = { label: "Discuss Your Cloud Strategy", href: "/contact" };
export const PRIMARY_CTA_SHORT: NavLink = { label: "Talk to us", href: "/contact" };

/** Company pages that exist in release 1. /trust is gated on V-14. */
const companyLinks = (p: Picked): NavLink[] => [
  { label: "About", href: "/about", descriptor: "Who we are and where we work from" },
  { label: "Our Approach", href: "/our-approach", descriptor: "Method, engagement models and FAQ" },
  ...(p.trust
    ? [{ label: "Trust & Security", href: "/trust", descriptor: "How we protect your environments and data" }]
    : []),
  { label: "Careers", href: "/careers", descriptor: "Cloud, DevOps and security roles" },
  { label: "Contact", href: "/contact", descriptor: "Talk to the team" },
];

const frameworkLinks = (p: Picked): NavLink[] =>
  p.frameworks.map((f) => ({ label: f.name, href: `/compliance/${f.slug}`, descriptor: f.menuDescriptor }));

const platformLinks = (p: Picked): NavLink[] =>
  p.platforms.map((p) => ({ label: p.name, href: `/cloud-platforms/${p.slug}`, descriptor: p.menuDescriptor }));

/** One mega-menu column per live pillar. Capability links point to a standalone page when one is live, else to the anchor. */
const serviceColumns = (p: Picked): NavColumn[] =>
  p.services
    .filter((s) => s.kind === "pillar")
    .map((pillar) => {
      const path = servicePath(pillar);
      const links = pillar.capabilities
        .filter((c) => c.inMenu)
        .map((c) => {
          const page = c.page ? p.services.find((s) => s.slug === c.page) : undefined;
          return { label: c.title, href: page ? servicePath(page) : `${path}#${c.id}`, descriptor: c.descriptor };
        });
      const column: NavColumn = { heading: pillar.menuTitle ?? pillar.title, href: path, links };
      if (pillar.slug === "compliance") column.chips = frameworkLinks(p).map(({ label, href }) => ({ label, href }));
      return column;
    });

export const headerNav = (options?: NavOptions): NavItem[] => {
  const p = pick(options);
  const items: NavItem[] = [];

  const columns = serviceColumns(p);
  items.push({
    id: "services",
    label: "Services",
    href: "/services",
    columns: columns.length ? columns : undefined,
    feature: {
      label: "How we work",
      text: "Assess → Architect → Implement → Manage → Optimize, with security at every step.",
      href: "/our-approach",
    },
    footerLink: { label: "Explore Our Capabilities", href: "/services" },
  });

  // 04 §8.3: with no verified platform the item is a plain link to the overview page.
  const platformItems = platformLinks(p);
  items.push({
    id: "platforms",
    label: "Cloud Platforms",
    href: "/cloud-platforms",
    columns: platformItems.length
      ? [
          {
            heading: "Platforms",
            links: [
              ...platformItems,
              { label: "Multi-cloud overview", href: "/cloud-platforms", descriptor: "How we choose, combine and govern platforms" },
            ],
          },
        ]
      : undefined,
    // 04 §8.3: partner badges go here only for statuses actually held (V-01). Until then, this fallback.
    feature: p.services.some((sv) => sv.slug === "cloud-consulting")
      ? {
          label: "Hybrid & Multi-Cloud",
          text: "One method and consistent governance across clouds and data centers.",
          href: "/services/cloud-consulting#hybrid-multi-cloud",
        }
      : undefined,
    footerLink: PRIMARY_CTA,
  });

  const compliance = p.services.find((s) => s.slug === "compliance");
  if (compliance) {
    const frameworkItems = frameworkLinks(p);
    const governance: NavColumn = {
      heading: "Governance & Readiness",
      links: compliance.capabilities
        .filter((c) => ["cloud-governance", "policy-controls", "risk-management", "audit-readiness"].includes(c.id))
        .map((c) => ({ label: c.title, href: `/compliance#${c.id}`, descriptor: c.descriptor })),
    };
    items.push({
      id: "compliance",
      label: "Compliance",
      href: "/compliance",
      columns: [...(frameworkItems.length ? [{ heading: "Frameworks", links: frameworkItems }] : []), governance],
      feature: { label: "Our role", text: BOUNDARY_STATEMENT, href: "/compliance#boundaries" },
      footerLink: { label: "View all compliance services", href: "/compliance" },
    });
  }

  items.push({ id: "insights", label: "Insights", href: "/blog" });
  items.push({
    id: "company",
    label: "Company",
    href: "/about",
    columns: [{ heading: "Company", links: companyLinks(p) }],
    footerLink: PRIMARY_CTA,
  });

  return items;
};

/** Footer columns (04 §9). Gated pages that are not live are left out, never shown disabled. */
export const footerNav = (options?: NavOptions): NavColumn[] => {
  const p = pick(options);
  const live = p.services;
  const compliance = live.find((s) => s.slug === "compliance");
  const columns: NavColumn[] = [
    {
      heading: "Services",
      links: [
        ...live.filter((s) => s.slug !== "compliance").map((s) => ({ label: s.title, href: servicePath(s) })),
        { label: "All services", href: "/services" },
      ],
    },
    {
      heading: "Cloud Platforms",
      links: [
        ...platformLinks(p).map(({ label, href }) => ({ label, href })),
        { label: "Multi-cloud overview", href: "/cloud-platforms" },
      ],
    },
  ];
  if (compliance) {
    columns.push({
      heading: "Compliance",
      links: [
        { label: compliance.title, href: "/compliance" },
        ...frameworkLinks(p).map(({ label, href }) => ({ label, href })),
      ],
    });
  }
  columns.push({
    heading: "Company",
    links: [
      ...companyLinks(p).map(({ label, href }) => ({ label, href })),
      { label: "Insights", href: "/blog" },
    ],
  });
  return columns;
};

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];
