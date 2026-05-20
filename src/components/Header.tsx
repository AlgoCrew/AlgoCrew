"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/",         label: "Home"     },
  { href: "/services", label: "Services" },
  { href: "/work",     label: "Work"     },
  { href: "/pricing",  label: "Pricing"  },
  { href: "/careers",  label: "Careers", badge: "Hiring" },
  { href: "/about",    label: "About"    },
  { href: "/contact",  label: "Contact"  },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Magnetic CTA
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      el.style.transform = dist < 100 ? `translate(${dx * 0.25}px,${dy * 0.25}px)` : "";
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.island}>

          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="AlgoCrew home">
            <span className={styles.logoDot} />
            <span className={styles.logoText}>AlgoCrew</span>
          </Link>

          <div className={styles.divider} aria-hidden="true" />

          {/* Desktop nav */}
          <ul className={styles.navLinks} role="list">
            {navLinks.map((link) => {
              const isActive = pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    {link.badge && (
                      <span className={styles.navBadge}>{link.badge}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right cluster */}
          <div className={styles.rightCluster}>
            <div className={styles.themeToggleWrap}>
              <ThemeToggle />
            </div>

            <Link href="/contact" className={styles.cta} ref={ctaRef}>
              <span className={styles.ctaShimmer} aria-hidden="true" />
              <span className={styles.ctaText}>Get Started</span>
              <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </Link>

            <button
              className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className={styles.mobileMenuBg} onClick={() => setMenuOpen(false)} />

        <div className={styles.mobileMenuInner}>
          <div className={styles.mobileMenuHeader}>
            <Link href="/" className={styles.mobileLogo} onClick={() => setMenuOpen(false)}>
              <span className={styles.logoDot} />
              AlgoCrew
            </Link>
            <button
              className={styles.mobileClose}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <ul className={styles.mobileLinks} role="list">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ""}`}
                    onClick={() => setMenuOpen(false)}
                    style={{ transitionDelay: menuOpen ? `${i * 45 + 60}ms` : "0ms" }}
                  >
                    <span className={styles.mobileLinkNum}>0{i + 1}</span>
                    <span className={styles.mobileLinkLabel}>
                      {link.label}
                      {link.badge && (
                        <span className={styles.mobileBadge}>{link.badge}</span>
                      )}
                    </span>
                    <span className={styles.mobileLinkArrow}>→</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles.mobileFooter}>
            <Link
              href="/contact"
              className={styles.mobileCta}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: menuOpen ? "380ms" : "0ms" }}
            >
              Book a Strategy Call →
            </Link>
            <Link
              href="/careers"
              className={styles.mobileCtaGhost}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: menuOpen ? "420ms" : "0ms" }}
            >
              <span className={styles.mobileCtaGhostDot} />
              We&apos;re hiring — View open roles
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
