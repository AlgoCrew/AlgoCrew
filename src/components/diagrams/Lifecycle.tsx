"use client";

import { type CSSProperties, type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from "react";
import s from "./lifecycle.module.scss";

/**
 * DevSecOps lifecycle (roadmap T4.02; design refresh, docs/website-transformation/17).
 *
 * Two views of the same seven stages:
 * - Timeline: a vertical list with icon rings and every stage's controls visible. The server HTML,
 *   the view without JavaScript, and the view below 1024px.
 * - Loop (1024px and wider, after hydration): the stages on a ring, because DevSecOps repeats.
 *   An auto-advancing tabbed carousel per the WAI-ARIA APG carousel pattern: play/pause first
 *   in the tab order; hover pauses; keyboard focus or choosing a stage stops rotation until Play;
 *   the arc to the next stage draws over ADVANCE_MS and its animationend advances, so the
 *   animation and the timing cannot drift; only runs on screen; starts stopped with reduced
 *   motion; the panel is announced only while stopped.
 * Only one view is displayed at a time (CSS), so assistive technology sees one.
 */
type Stage = { name: string; purpose: string; icon: ReactNode; controls: string[] };

const LIFECYCLE: Stage[] = [
  {
    name: "Plan",
    purpose: "Risks and requirements are settled before any code is written.",
    icon: <path d="M9 3.5h6v3H9zM7.5 5H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-1.5M9 12h6M9 16h4" />,
    controls: ["Threat modeling for new services", "Security and compliance requirements in the backlog", "Framework controls mapped to the design", "Environments and access defined up front"],
  },
  {
    name: "Develop",
    purpose: "Problems are caught in the editor and the pull request.",
    icon: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
    controls: ["Secret scanning before commit", "Static analysis on every pull request", "Protected branches and required reviews", "Signed commits where the platform supports it"],
  },
  {
    name: "Build",
    purpose: "Every artifact is scanned, described and signed.",
    icon: <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12 4 7.5" />,
    controls: ["Dependency and license scanning", "Software bill of materials generated per build", "Container image scanning", "Signed, traceable build artifacts"],
  },
  {
    name: "Test",
    purpose: "Infrastructure and running services are checked against your rules.",
    icon: <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3M7.5 15h9" />,
    controls: ["Infrastructure-as-code scanning", "Policy-as-code checks against your guardrails", "Dynamic testing of running services", "Results recorded as release evidence"],
  },
  {
    name: "Deploy",
    purpose: "Only verified artifacts reach production, with a way back.",
    icon: <path d="M12 15V4M7 9l5-5 5 5M5 15v4a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4" />,
    controls: ["Least-privilege, short-lived deployment identities", "Only signed artifacts admitted", "Approvals captured with the change", "Tested rollback path"],
  },
  {
    name: "Operate",
    purpose: "The running platform stays patched, backed up and least-privilege.",
    icon: <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />,
    controls: ["Secrets held in a managed vault", "Patching and posture management", "Backups restored on a schedule, not just taken", "Access reviewed and expired"],
  },
  {
    name: "Monitor",
    purpose: "Signals reach an owner, and evidence is kept.",
    icon: <path d="M3 12h4l2.5-6 5 12 2.5-6h4" />,
    controls: ["Centralized, tamper-resistant logs", "Native threat detection, tuned and routed", "Alerts tied to an owner and a runbook", "Evidence retained for your assessor"],
  },
];
const N = LIFECYCLE.length;
const LAST = N - 1;
const ADVANCE_MS = 6000;
const pad = (n: number) => String(n).padStart(2, "0");

/* Ring geometry in a 100×100 box: nodes on a circle, clockwise from the top. */
const R = 39;
const NODE = 19; // node diameter, % of the ring box
const TRIM = (Math.asin((NODE / 2 + 2) / R) * 180) / Math.PI; // arcs stop short of the nodes
const angle = (i: number) => -90 + (360 / N) * i;
const point = (deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return { x: 50 + R * Math.cos(rad), y: 50 + R * Math.sin(rad) };
};
const arc = (i: number) => {
  const a = point(angle(i) + TRIM);
  const b = point(angle(i + 1) - TRIM);
  return `M${a.x.toFixed(2)} ${a.y.toFixed(2)}A${R} ${R} 0 0 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
};
/** Each stage gets its own step on a blue-to-cyan scale. */
const tone = (i: number) => ({ "--t": `${Math.round((i / LAST) * 100)}%` }) as CSSProperties;

const Icon = ({ stage, className }: { stage: Stage; className: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    {stage.icon}
  </svg>
);

function Timeline() {
  return (
    <ol className={s.timeline}>
      {LIFECYCLE.map((stage, i) => (
        <li key={stage.name} style={tone(i)}>
          <span className={s.ring} aria-hidden="true">
            <Icon stage={stage} className={s.icon} />
          </span>
          <div>
            <h3 className={s.stageName}>
              <span>{pad(i + 1)}</span> {stage.name}
            </h3>
            <p className={s.purpose}>{stage.purpose}</p>
            <ul className={s.checks}>
              {stage.controls.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Lifecycle() {
  const [hydrated, setHydrated] = useState(false);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const loop = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (!hydrated || !loop.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
    // Below 1024px the loop is display:none, so it never intersects and never rotates.
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(loop.current);
    return () => io.disconnect();
  }, [hydrated]);

  const band = <p className={s.secBand}>Security controls and evidence across all seven stages</p>;

  if (!hydrated) {
    return (
      <div>
        <Timeline />
        {band}
      </div>
    );
  }

  const running = playing && !hovered && inView;
  /** A visitor's own choice stops rotation (APG): they are reading now. */
  const choose = (i: number, focus = false) => {
    setPlaying(false);
    setSelected(i);
    if (focus) tabs.current[i]?.focus();
  };
  const onKey = (i: number) => (e: KeyboardEvent) => {
    const next = { ArrowRight: i === LAST ? 0 : i + 1, ArrowDown: i === LAST ? 0 : i + 1, ArrowLeft: i === 0 ? LAST : i - 1, ArrowUp: i === 0 ? LAST : i - 1, Home: 0, End: LAST }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    choose(next, true);
  };
  const stage = LIFECYCLE[selected];

  return (
    <div>
      <div className={s.mobileOnly}>
        <Timeline />
      </div>

      <div
        ref={loop}
        className={s.loop}
        role="group"
        aria-roledescription="carousel"
        aria-label="DevSecOps delivery stages"
        data-running={running || undefined}
        style={{ "--advance": `${ADVANCE_MS}ms` } as CSSProperties}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        // Keyboard focus on any control except Play stops rotation until Play is pressed.
        onFocus={(e) => {
          if (!(e.target as HTMLElement).dataset.rotation) setPlaying(false);
        }}
      >
        <div className={s.ringBox}>
          <svg className={s.arcs} viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <marker id="life-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M1 1l7 4-7 4" className={s.arrowHead} />
              </marker>
            </defs>
            {LIFECYCLE.map((_, i) => (
              <path key={i} d={arc(i)} className={s.arcBase} data-done={i < selected || undefined} markerEnd="url(#life-arrow)" />
            ))}
            {/* The arc to the next stage draws itself; when it finishes, the loop advances. */}
            <path
              key={selected}
              d={arc(selected)}
              pathLength={1}
              className={s.arcLive}
              onAnimationEnd={() => setSelected((n) => (n === LAST ? 0 : n + 1))}
            />
          </svg>

          <div className={s.hub} aria-hidden="true">
            <svg viewBox="0 0 24 24" className={s.hubIcon}>
              <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <b>Security</b>
            <span>at every stage</span>
          </div>

          <div role="tablist" aria-label="Delivery stages" aria-orientation="horizontal">
            {LIFECYCLE.map((st, i) => {
              const p = point(angle(i));
              return (
                <button
                  key={st.name}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  id={`life-tab-${i}`}
                  type="button"
                  role="tab"
                  className={s.node}
                  style={{ ...tone(i), left: `${p.x}%`, top: `${p.y}%`, width: `${NODE}%` }}
                  aria-selected={i === selected}
                  aria-controls="life-panel"
                  tabIndex={i === selected ? 0 : -1}
                  data-done={i < selected || undefined}
                  onClick={() => choose(i)}
                  onKeyDown={onKey(i)}
                >
                  <span className={s.badge}>{pad(i + 1)}</span>
                  <Icon stage={st} className={s.nodeIcon} />
                  <span className={s.nodeName}>{st.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={s.side}>
          <div className={s.bar}>
            <button
              type="button"
              className={s.ctrl}
              data-rotation="true"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Stop automatic stage rotation" : "Start automatic stage rotation"}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                {playing ? <path d="M4.5 3h2.5v10H4.5zM9 3h2.5v10H9z" /> : <path d="M5 2.8v10.4L13.2 8z" />}
              </svg>
              <span>{playing ? "Pause" : "Play"}</span>
            </button>
            <p className={s.count} aria-hidden="true">
              <b>{pad(selected + 1)}</b> / {pad(N)}
            </p>
            <div className={s.arrows}>
              <button type="button" className={s.ctrl} onClick={() => choose(selected === 0 ? LAST : selected - 1)} aria-label="Previous stage">
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M10 3 5 8l5 5" />
                </svg>
              </button>
              <button type="button" className={s.ctrl} onClick={() => choose(selected === LAST ? 0 : selected + 1)} aria-label="Next stage">
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="m6 3 5 5-5 5" />
                </svg>
              </button>
            </div>
          </div>

          <div
            className={s.panel}
            id="life-panel"
            role="tabpanel"
            aria-labelledby={`life-tab-${selected}`}
            aria-live={running ? "off" : "polite"}
            tabIndex={0}
            style={tone(selected)}
          >
            {/* Re-keyed so the new stage slides in. */}
            <div key={selected} className={s.panelBody}>
              <div className={s.panelHead}>
                <span className={s.ring} aria-hidden="true">
                  <Icon stage={stage} className={s.icon} />
                </span>
                <div>
                  <p className={s.kicker}>{`Stage ${pad(selected + 1)} of ${pad(N)}`}</p>
                  <h3>{stage.name}</h3>
                </div>
              </div>
              <p className={s.purpose}>{stage.purpose}</p>
              <ul className={s.checks}>
                {stage.controls.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {band}
    </div>
  );
}
