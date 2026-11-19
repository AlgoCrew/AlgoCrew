import Link from "next/link";
import type { CSSProperties } from "react";
import { type NavOptions, footerNav, legalNav } from "@/resources/navigation";
import { site } from "@/resources/site";
import { CookieSettingsButton } from "./ConsentBanner";
import s from "./layout.module.scss";

/**
 * Site footer (docs/website-transformation/04 §9). Columns come from the gated navigation.
 * Contact details and the legal entity appear only once verified in site.ts; until then
 * the brand name stands alone. No statistics, badges or "accepting projects" claims.
 */
const SOCIAL_LABELS: Record<string, string> = { linkedin: "LinkedIn", github: "GitHub", x: "X" };

export function Footer({ navOptions }: { navOptions?: NavOptions }) {
  const columns = footerNav(navOptions);
  const socials = Object.entries(site.social);
  return (
    <footer className={s.footer}>
      <div className={s.footerInner}>
        <div className={s.footerCols} style={{ "--cols": columns.length } as CSSProperties}>
          <div className={s.footerBrand}>
            <Link className={s.logo} href="/" aria-label={`${site.brand} home`}>
              {site.brand}
              <i aria-hidden="true" />
            </Link>
            <p>Specialist cloud engineering, DevSecOps, security and compliance.</p>
            {(site.email || site.phone || site.city) && (
              <address>
                {site.email && (
                  <a className={s.footerLink} href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                )}
                {site.phone && (
                  <a className={s.footerLink} href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>
                    {site.phone}
                  </a>
                )}
                {site.city && <span>{site.city}</span>}
              </address>
            )}
            {socials.length > 0 && (
              <ul className={s.footerList}>
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a className={s.footerLink} href={url} rel="noopener noreferrer">
                      {name === "linkedin" && (
                        <svg className={s.socialIcon} viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.92 1.3-1.92 2.63V21h-4z" />
                        </svg>
                      )}
                      {SOCIAL_LABELS[name] ?? name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {columns.map((col) => (
            <nav key={col.heading} aria-label={`Footer: ${col.heading}`}>
              <h2 className={s.footerHeading}>{col.heading}</h2>
              <ul className={s.footerList}>
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link className={s.footerLink} href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className={s.footerBottom}>
          <span>
            © {new Date().getFullYear()} {site.legalName ?? site.brand}
          </span>
          {legalNav.map((link) => (
            <Link key={link.href} className={s.footerLink} href={link.href}>
              {link.label}
            </Link>
          ))}
          <CookieSettingsButton className={s.footerButton} />
        </div>
      </div>
    </footer>
  );
}
