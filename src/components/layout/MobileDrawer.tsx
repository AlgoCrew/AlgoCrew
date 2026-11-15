"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type CSSProperties, type KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import type { NavItem, NavLink } from "@/resources/navigation";
import s from "./layout.module.scss";

/**
 * Menu button and drawer for widths below 1024 px (docs/website-transformation/08 §7.2).
 * Accordion with one section open at a time. While open: page scroll is locked, the rest of
 * the page is inert, focus cycles inside the drawer, and Esc closes and returns focus.
 * Lists pages only, never in-page anchors (04 §8.8).
 */
const pagesOf = (item: NavItem): NavLink[] => {
  const columns = item.columns ?? [];
  const seen = new Set<string>();
  const links =
    columns.length > 2
      ? columns.flatMap((c) => (c.href ? [{ label: c.heading, href: c.href }] : []))
      : columns.flatMap((c) => c.links.filter((l) => !l.href.includes("#")).map(({ label, href }) => ({ label, href })));
  return [{ label: `All ${item.label.toLowerCase()}`, href: item.href }, ...links].filter(
    (l) => !seen.has(l.href) && seen.add(l.href),
  );
};

export function MobileDrawer({ items, cta }: { items: NavItem[]; cta: NavLink }) {
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(68);
  const button = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) button.current?.focus();
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const header = button.current?.closest("header");
    const outside = [...document.body.querySelectorAll<HTMLElement>("main, footer, #main-content")].filter(
      (el) => !header?.contains(el) && !el.contains(header ?? null),
    );
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    outside.forEach((el) => el.setAttribute("inert", ""));
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && close();
    const onResize = () => window.innerWidth >= 1024 && close(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = overflow;
      outside.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  // Keep Tab inside the menu button plus the drawer.
  const trap = (e: KeyboardEvent) => {
    if (e.key !== "Tab" || !drawer.current || !button.current) return;
    const focusable = [button.current, ...drawer.current.querySelectorAll<HTMLElement>("a, summary")].filter(
      (el) => el.offsetParent !== null,
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <button
        ref={button}
        type="button"
        className={s.burger}
        aria-expanded={open}
        aria-controls="site-drawer"
        aria-label={open ? "Close menu" : "Open menu"}
        onKeyDown={open ? trap : undefined}
        onClick={() => {
          setTop(button.current?.closest("header")?.getBoundingClientRect().bottom ?? 68);
          setOpen((v) => !v);
        }}
      >
        <span />
      </button>
      <div
        ref={drawer}
        id="site-drawer"
        className={s.drawer}
        hidden={!open}
        style={{ "--drawer-top": `${top}px` } as CSSProperties}
        onKeyDown={trap}
      >
        <nav className={s.drawerNav} aria-label="Mobile">
          {items.map((item) =>
            item.columns ? (
              // `name` gives a native exclusive accordion: opening one section closes the others.
              <details key={item.id} className={s.drawerSection} name="site-drawer">
                <summary>{item.label}</summary>
                <div className={s.drawerItems}>
                  {pagesOf(item).map((link) => (
                    <Link key={link.href} className={s.drawerItem} href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link key={item.id} className={s.drawerLink} href={item.href}>
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className={s.drawerFoot}>
          <Link className={s.cta} href={cta.href}>
            {cta.label}
          </Link>
        </div>
      </div>
    </>
  );
}
