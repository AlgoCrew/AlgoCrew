// HeroAnimations.tsx
"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function HeroAnimations({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // We use a context to ensure clean cleanup and prevent memory leaks
    const ctx = gsap.context(() => {
      // 1. Floating Animation
      gsap.to(".floating-card", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 2. Satellite Stagger
      gsap.to(".satellite-card", {
        y: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });

      // 3. Mouse Parallax
      const moveHandler = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20;
        const y = (clientY / window.innerHeight - 0.5) * 20;
        gsap.to(".parallax-layer", { x, y, duration: 1, ease: "power2.out" });
      };

      window.addEventListener("mousemove", moveHandler);
      return () => window.removeEventListener("mousemove", moveHandler);
    });

    return () => ctx.revert();
  }, []);

  return <>{children}</>;
}