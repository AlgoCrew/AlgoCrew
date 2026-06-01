import Link from "next/link";
import styles from "./Footer.module.scss";
import {
  TbBrandLinkedin, TbBrandGithub, TbBrandX, TbMail,
  TbMapPin, TbPhone, TbArrowUpRight,
} from "react-icons/tb";

const stats = [
  { n: "Top 1%", l: "Engineers only"   },
  { n: "8+",     l: "Countries served" },
  { n: "48h",    l: "First commit"     },
  { n: "30-day", l: "Rolling exit"     },
];

const services = [
  { href: "/services/web-app-development",           label: "Product Engineering"  },
  { href: "/services/cloud-devops",                  label: "Cloud & DevOps"       },
  { href: "/services/data-automation",               label: "Data & AI"            },
  { href: "/services/team-services",                 label: "Strategic Staffing"   },
  { href: "/services/fintech-software-development",  label: "Fintech Development"  },
  { href: "/services/saas-development",              label: "SaaS Development"     },
  { href: "/services/startup-mvp-development",       label: "MVP Development"      },
  { href: "/services/ecommerce-development",         label: "E-Commerce"           },
];

const company = [
  { href: "/about",     label: "About Us"     },
  { href: "/work",      label: "Case Studies" },
  { href: "/pricing",   label: "Pricing"      },
  { href: "/careers",   label: "Careers", badge: true },
  { href: "/blog",      label: "Blog"         },
  { href: "/faq",       label: "FAQ"          },
  { href: "/locations", label: "Locations"    },
  { href: "/contact",   label: "Contact"      },
];

const socials = [
  { href: "https://www.linkedin.com/company/algocrew", Icon: TbBrandLinkedin, label: "LinkedIn"   },
  { href: "https://github.com/algocrew",               Icon: TbBrandGithub,   label: "GitHub"     },
  { href: "https://x.com/algocrew",                    Icon: TbBrandX,        label: "X"          },
  { href: "mailto:query@algocrew.io",                  Icon: TbMail,          label: "Email"      },
];

export function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.inner}>

        {/* ── Stats strip ── */}
        <div className={styles.statsStrip}>
          {stats.map(s => (
            <div key={s.l} className={styles.statItem}>
              <span className={styles.statNum}>{s.n}</span>
              <span className={styles.statLabel}>{s.l}</span>
            </div>
          ))}
        </div>

        {/* ── Main grid ── */}
        <div className={styles.grid}>

          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoDot} />
              AlgoCrew
            </Link>
            <p className={styles.tagline}>
              Elite engineering for ambitious teams.
              Senior-only, async-first, globally distributed.
            </p>
            <div className={styles.availBadge}>
              <span className={styles.availDot} />
              Accepting new projects
            </div>
            <div className={styles.contactBlock}>
              <a href="mailto:query@algocrew.io" className={styles.contactRow}>
                <TbMail size={12} /><span>query@algocrew.io</span>
              </a>
              <a href="tel:+14374509656" className={styles.contactRow}>
                <TbPhone size={12} /><span>+1 (437) 450-9656</span>
              </a>
              <div className={styles.contactRow}>
                <TbMapPin size={12} /><span>Brampton, Canada 🇨🇦</span>
              </div>
            </div>
            <div className={styles.socials}>
              {socials.map(({ href, Icon, label }) => (
                <a key={label} href={href} aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={styles.social}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <p className={styles.colHeading}>Services</p>
            <ul className={styles.colList}>
              {services.map(l => (
                <li key={l.href}><Link href={l.href} className={styles.colLink}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <p className={styles.colHeading}>Company</p>
            <ul className={styles.colList}>
              {company.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.colLink}>
                    {l.label}
                    {l.badge && <span className={styles.hiringPip} />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <div className={styles.ctaCol}>
            <p className={styles.colHeading}>Let&apos;s build together</p>
            <p className={styles.ctaText}>
              From first commit to production — senior team, no lock-in, 100% your IP.
            </p>
            <Link href="/contact" className={styles.ctaBtn}>
              Start a Project <TbArrowUpRight size={14} />
            </Link>
            <Link href="/careers" className={styles.ctaSecondary}>
              Join the Crew →
            </Link>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className={styles.bottom}>
          <span className={styles.copy}>© {new Date().getFullYear()} AlgoCrew Inc.</span>
          <span className={styles.builtBy}>Built with precision. Delivered with pride.</span>
          <div className={styles.legal}>
            <Link href="/privacy-policy" className={styles.legalLink}>Privacy</Link>
            <span className={styles.sep} />
            <Link href="/terms" className={styles.legalLink}>Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
