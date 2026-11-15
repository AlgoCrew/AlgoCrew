import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  const links = [
    { href: "/",         label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about",    label: "About" },
    { href: "/contact",  label: "Contact" },
    { href: "/compliance", label: "Compliance" },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.code} aria-hidden="true">404</div>

        <h1 className={styles.title}>
          Page not <span className={styles.accent}>found.</span>
        </h1>
        <p className={styles.sub}>
          Looks like this URL has been deprecated, moved, or never existed.
          Here are some useful places to go instead:
        </p>

        <div className={styles.navGrid}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={styles.navCard}>
              <span className={styles.navLabel}>{l.label}</span>
              <span className={styles.navArrow}>→</span>
            </Link>
          ))}
        </div>

        <Link href="/" className={styles.homeCta}>
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
