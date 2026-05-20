"use client";
import styles from "../blog.module.scss";

export function ShareButton() {
  const copy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
    }
  };
  return (
    <button className={styles.shareBtn} onClick={copy}>
      Copy Link
    </button>
  );
}
