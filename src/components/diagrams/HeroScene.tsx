"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import s from "./heroScene.module.scss";

/**
 * Wraps the CSS layer stack and swaps in the WebGL scene when it is worth it
 * (roadmap T9.01, 08 §10.3). Gating kept from the original HeroCanvas wrapper:
 * - only at 860 px and wider,
 * - never with reduced motion (the CSS stack is already static then),
 * - only when WebGL is available,
 * - the three.js code is a separate chunk, fetched after first paint.
 * Until the scene is ready, and whenever any check fails, the CSS stack stays.
 */
const MIN_WIDTH = 860;

function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroScene({ fallback }: { fallback: ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia(`(min-width: ${MIN_WIDTH}px)`);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let handle: { dispose: () => void } | undefined;
    let cancelled = false;

    const stop = () => {
      handle?.dispose();
      handle = undefined;
      setReady(false);
    };
    const start = async () => {
      if (handle || !wide.matches || reduced.matches || !webglAvailable()) return;
      const { mountLayeredPlatform } = await import("./layeredPlatformScene");
      if (cancelled || !canvas.current || !host.current || !wide.matches || reduced.matches) return;
      handle = mountLayeredPlatform(canvas.current, host.current);
      setReady(true);
    };
    const sync = () => (wide.matches && !reduced.matches ? start() : stop());

    // Wait for the browser to be idle so the scene never competes with first paint.
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    idle(() => void sync());
    wide.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      cancelled = true;
      wide.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return (
    <div ref={host} className={s.host} aria-hidden="true">
      <div className={ready ? s.hidden : undefined}>{fallback}</div>
      <canvas ref={canvas} className={ready ? s.canvas : s.hidden} />
    </div>
  );
}
