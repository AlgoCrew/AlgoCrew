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
                      {name === "x" ? "X" : name[0].toUpperCase() + name.slice(1)}
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
