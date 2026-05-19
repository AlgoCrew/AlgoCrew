"use client";
import Link from "next/link";
import styles from "./SendUsEmail.module.scss";

export function SendUsEmail() {
  return (
    <section className={styles.section} id="cta">
      <div className={styles.glow} />
      <div className={styles.inner}>
        <span className={styles.label}>GET STARTED</span>
        <h2 className={styles.heading}>
          Ready to build<br />
          <span className={styles.accent}>something exceptional?</span>
        </h2>
        <p className={styles.sub}>
          From idea to launch in weeks, not months. Let&apos;s talk about your project.
        </p>
        <div className={styles.actions}>
          <Link href="/contact" className={styles.btnPrimary}>
            Build Something Exceptional →
          </Link>
          <Link href="/hire" className={styles.btnGhost}>
            Book a Strategy Call
          </Link>
        </div>
      </div>
    </section>
  );
}
