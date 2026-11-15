"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type CSSProperties, type KeyboardEvent, type MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import type { NavItem } from "@/resources/navigation";
import s from "./layout.module.scss";

/**
 * Desktop primary navigation with mega menus (docs/website-transformation/08 §7.1).
 *
 * Disclosure pattern, not role="menu". The whole menu, including every panel, is in the
 * server HTML. Each top-level item is a real link to its hub page, so it works without
 * JavaScript; once hydrated it behaves as a button that toggles its panel.
 *
 * Behaviour ported from the reviewed prototype (review findings R-01, R-02):
 * - each panel follows its trigger in the DOM, so Tab goes from a trigger into its panel
 * - click, Enter or Space toggles; hover opens after 150 ms on pointer devices
 * - a click that follows a hover-open keeps the panel open
 * - Esc closes and returns focus; focus or pointer leaving closes; one panel at a time
 */
const HOVER_OPEN_MS = 150;
const HOVER_CLOSE_MS = 250;

export function MegaMenu({ items }: { items: NavItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const openedByHover = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const nav = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const close = useCallback((returnFocus = false) => {
    clearTimeout(timer.current);
    setOpenId((current) => {
      if (current && returnFocus) nav.current?.querySelector<HTMLElement>(`[aria-controls="mega-${current}"]`)?.focus();
      return null;
    });
    openedByHover.current = false;
  }, []);

  useEffect(() => setHydrated(true), []);
  useEffect(() => close(), [pathname, close]); // navigating closes the menu
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && close(true);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openId, close]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const canHover = () => window.matchMedia("(hover: hover) and (min-width: 1024px)").matches;

  const toggle = (id: string) => (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();
    clearTimeout(timer.current);
    if (openId === id) {
      if (openedByHover.current) openedByHover.current = false;
      else close();
    } else {
      openedByHover.current = false;
      setOpenId(id);
    }
  };

  const onHover = (id: string) => () => {
    if (!canHover()) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setOpenId((current) => {
        if (current !== id) openedByHover.current = true;
        return id;
      });
    }, HOVER_OPEN_MS);
  };

  return (
    <>
      <nav
        ref={nav}
        className={s.primaryNav}
        aria-label="Primary"
        onMouseLeave={() => {
          if (!canHover()) return;
          clearTimeout(timer.current);
          timer.current = setTimeout(() => close(), HOVER_CLOSE_MS);
        }}
        onBlur={(e) => {
          if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget as Node)) close();
        }}
      >
        <ul className={s.navList}>
          {items.map((item) => {
            if (!item.columns) {
              return (
                <li key={item.id} onMouseEnter={() => clearTimeout(timer.current)}>
                  <Link className={s.top} href={item.href} onFocus={() => close()}>
                    {item.label}
                  </Link>
                </li>
              );
            }
            const open = openId === item.id;
            const cols = item.columns.length;
            return (
              <li
                key={item.id}
                // Focus moving to another top-level item closes this panel.
                onFocus={() => {
                  if (openId && openId !== item.id) close();
                }}
              >
                <a
                  className={`${s.top} ${s.hasPanel}`}
                  href={item.href}
                  // A link until hydrated, a disclosure button after.
                  role={hydrated ? "button" : undefined}
                  aria-expanded={hydrated ? open : undefined}
                  aria-controls={hydrated ? `mega-${item.id}` : undefined}
                  onClick={toggle(item.id)}
                  onKeyDown={(e) => e.key === " " && toggle(item.id)(e)}
                  onMouseEnter={onHover(item.id)}
                >
                  {item.label}
                </a>
                <div
                  className={s.panel}
                  id={`mega-${item.id}`}
                  hidden={!open}
                  onMouseEnter={() => clearTimeout(timer.current)}
                >
                  <div className={s.panelInner}>
                    <div
                      className={[s.columns, item.feature && cols < 3 ? s.withFeature : "", cols === 5 ? s.cols5 : ""].join(" ")}
                      style={{ "--cols": cols } as CSSProperties}
                    >
                      {item.columns.map((col) => (
                        <div key={col.heading} className={cols === 1 ? s.colWide : undefined}>
                          {col.href ? (
                            <Link className={s.colHeading} href={col.href}>
                              {col.heading}
                            </Link>
                          ) : (
                            <span className={s.colHeading}>{col.heading}</span>
                          )}
                          <ul className={s.colLinks}>
                            {col.links.map((link) => (
                              <li key={link.href + link.label}>
                                <Link className={s.menuLink} href={link.href}>
                                  <strong>{link.label}</strong>
                                  {link.descriptor && <span>{link.descriptor}</span>}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          {col.chips && col.chips.length > 0 && (
                            <p className={s.chipRow}>
                              {col.chips.map((chip) => (
                                <Link key={chip.href} className={s.chip} href={chip.href}>
                                  {chip.label}
                                </Link>
                              ))}
                            </p>
                          )}
                        </div>
                      ))}
                      {item.feature && cols < 3 && (
                        <Link className={s.feature} href={item.feature.href}>
                          <b>{item.feature.label}</b>
                          {item.feature.text}
                        </Link>
                      )}
                    </div>
                    <div className={s.panelFoot}>
                      {item.footerLink && (
                        <Link className={s.footLink} href={item.footerLink.href}>
                          {item.footerLink.label} <span aria-hidden="true">→</span>
                        </Link>
                      )}
                      {item.feature && cols >= 3 && (
                        <Link className={s.feature} href={item.feature.href}>
                          <span>
                            <b>{item.feature.label}</b> {item.feature.text}
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
      <button type="button" className={s.scrim} hidden={!openId} tabIndex={-1} aria-hidden="true" onClick={() => close()} />
    </>
  );
}
