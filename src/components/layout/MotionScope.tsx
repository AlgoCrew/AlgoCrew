"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Site-wide motion (docs/website-transformation/08 §8, roadmap T9.03 and T9.04). One observer
 * for the whole page instead of a client wrapper around every block:
 * - [data-reveal] blocks below the fold fade and rise once as they enter the viewport;
 *   siblings stagger by 60 ms, capped at four. Nothing already on screen is hidden.
 * - [data-ambient] loops (pipeline dash, security rings, hero float) pause while off screen.
 * With reduced motion nothing is hidden and CSS stops the loops. Without JavaScript all
 * content is simply visible, because the hidden state is only ever added here.
 */
export function MotionScope() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window)) return;

    const ambient = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.toggleAttribute("data-offscreen", !e.isIntersecting);
    });
    document.querySelectorAll("[data-ambient]").forEach((el) => ambient.observe(el));

    let reveal: IntersectionObserver | undefined;
    if (!reduced) {
      reveal = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            e.target.setAttribute("data-reveal", "in");
            reveal?.unobserve(e.target);
          }
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.getAttribute("data-reveal") !== "" || el.getBoundingClientRect().top < window.innerHeight) return;
        const siblings = el.parentElement ? [...el.parentElement.children].filter((c) => c.hasAttribute("data-reveal")) : [];
        el.style.setProperty("--reveal-delay", `${Math.min(siblings.indexOf(el), 4) * 60}ms`);
        el.setAttribute("data-reveal", "wait");
        reveal?.observe(el);
      });
    }

    return () => {
      ambient.disconnect();
      reveal?.disconnect();
      // On navigation, never leave a block hidden.
      document.querySelectorAll('[data-reveal="wait"]').forEach((el) => el.setAttribute("data-reveal", ""));
    };
  }, [pathname]);

  return null;
}
