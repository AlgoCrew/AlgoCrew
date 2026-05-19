import Link from "next/link";
import styles from "./Footer.module.scss";

const services = [
  { href: "/services/team-services", label: "Strategic Staffing" },
  { href: "/services/web-app-development", label: "Product Engineering" },
  { href: "/services/cloud-devops", label: "Cloud & DevOps" },
  { href: "/services/data-automation", label: "Data & AI" },
];

const company = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Top grid */}
        <div className={styles.grid}>
          {/* Brand column */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoDot} />
              AlgoCrew
            </Link>
            <p className={styles.tagline}>
              Elite software engineering for ambitious teams. Headquartered in Canada, operating globally.
            </p>
            <div className={styles.socials}>
              <a
                href="https://www.linkedin.com/company/algocrew"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
                aria-label="LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="mailto:hello@algocrew.io" className={styles.social} aria-label="Email">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services column */}
          <div className={styles.col}>
            <h4 className={styles.colHeading}>Services</h4>
            <ul className={styles.colLinks}>
              {services.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.colLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className={styles.col}>
            <h4 className={styles.colHeading}>Company</h4>
            <ul className={styles.colLinks}>
              {company.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.colLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div className={styles.col}>
            <h4 className={styles.colHeading}>Ready to build?</h4>
            <p className={styles.ctaDesc}>Let&apos;s talk about your next project.</p>
            <Link href="/contact" className={styles.ctaBtn}>
              Start a Project →
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} AlgoCrew Inc. · Canada 🇨🇦
          </p>
          <p className={styles.copy} style={{ opacity: 0.4 }}>
            Built with precision. Delivered with pride.
          </p>
        </div>
      </div>
    </footer>
  );
}
