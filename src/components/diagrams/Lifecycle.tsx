"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import s from "./lifecycle.module.scss";

/**
 * DevSecOps lifecycle (roadmap T4.02; prototype: index.html section 5).
 * Server HTML is an ordered list of the seven stages with their controls, which is complete
 * without JavaScript. After hydration it becomes a tabs pattern: arrow keys, Home and End,
 * roving tabindex, one labelled tab panel (review finding R-03).
 */
const LIFECYCLE = [
  { name: "Plan", controls: ["Threat modeling for new services", "Security and compliance requirements in the backlog", "Framework controls mapped to the design", "Environments and access defined up front"] },
  { name: "Develop", controls: ["Secret scanning before commit", "Static analysis on every pull request", "Protected branches and required reviews", "Signed commits where the platform supports it"] },
  { name: "Build", controls: ["Dependency and license scanning", "Software bill of materials generated per build", "Container image scanning", "Signed, traceable build artifacts"] },
  { name: "Test", controls: ["Infrastructure-as-code scanning", "Policy-as-code checks against your guardrails", "Dynamic testing of running services", "Results recorded as release evidence"] },
  { name: "Deploy", controls: ["Least-privilege, short-lived deployment identities", "Only signed artifacts admitted", "Approvals captured with the change", "Tested rollback path"] },
  { name: "Operate", controls: ["Secrets held in a managed vault", "Patching and posture management", "Backups restored on a schedule, not just taken", "Access reviewed and expired"] },
  { name: "Monitor", controls: ["Centralized, tamper-resistant logs", "Native threat detection, tuned and routed", "Alerts tied to an owner and a runbook", "Evidence retained for your assessor"] },
];

export function Lifecycle() {
  const [hydrated, setHydrated] = useState(false);
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => setHydrated(true), []);

  const band = <p className={s.secBand}>Security controls and evidence across all seven stages</p>;

  if (!hydrated) {
    return (
      <div>
        <ol className={s.life}>
        {LIFECYCLE.map((stage, i) => (
          <li key={stage.name}>
            <h3 className={s.stageName}>
              <span>{`0${i + 1}`}</span> {stage.name}
            </h3>
            <ul className={s.controls}>
              {stage.controls.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </li>
        ))}
        </ol>
        {band}
      </div>
    );
  }

  const select = (i: number) => {
    setSelected(i);
    tabs.current[i]?.focus();
  };
  const onKey = (i: number) => (e: KeyboardEvent) => {
    const last = LIFECYCLE.length - 1;
    const next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next);
  };
  const stage = LIFECYCLE[selected];

  return (
    <div>
      <div className={s.tabs} role="tablist" aria-label="Delivery stages">
        {LIFECYCLE.map((st, i) => (
          <button
            key={st.name}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            id={`life-tab-${i}`}
            type="button"
            role="tab"
            className={s.tab}
            aria-selected={i === selected}
            aria-controls="life-panel"
            tabIndex={i === selected ? 0 : -1}
            onClick={() => setSelected(i)}
            onKeyDown={onKey(i)}
          >
            <span>{`0${i + 1}`}</span> {st.name}
          </button>
        ))}
      </div>
      <div className={s.panel} id="life-panel" role="tabpanel" aria-labelledby={`life-tab-${selected}`} tabIndex={0}>
        <div>
          <p>{`Stage 0${selected + 1} of 07`}</p>
          <h3>{stage.name}</h3>
        </div>
        <ul>
          {stage.controls.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
      {band}
    </div>
  );
}
