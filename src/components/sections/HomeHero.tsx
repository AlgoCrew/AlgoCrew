import type { ReactNode } from "react";
import { HeroScene } from "@/components/diagrams/HeroScene";
import { Eyebrow, Heading, Lead } from "@/components/ui";
import s from "./home.module.scss";

/**
 * Homepage hero (prototype: index.html section 1): display heading, lead, actions and the
 * layered-infrastructure visual. The CSS stack is the server-rendered visual and remains the
 * fallback when the WebGL scene (roadmap T9.01) is not shown.
 */
export function HomeHero({
  eyebrow,
  title,
  lead,
  actions,
  platformNames,
}: {
  eyebrow: string;
  title: string;
  lead: ReactNode;
  actions: ReactNode;
  /** Short names of verified platforms; with none, the layer label names no vendor. */
  platformNames: readonly string[];
}) {
  return (
    <div className={s.hero}>
      <div className={s.heroInner}>
        <div className={s.heroCopy}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading as="h1" size="display">
            {title}
          </Heading>
          <Lead>{lead}</Lead>
          {actions}
        </div>
        <figure className={s.visual}>
          <HeroScene
            fallback={
              <div className={s.stage} data-ambient>
                <div className={s.stack}>
                  {[0, 1, 2].map((plane) => (
                    <div key={plane} className={s.plane}>
                      <b />
                      <b />
                      <b />
                    </div>
                  ))}
                </div>
              </div>
            }
          />
          <figcaption>
            <ol className={s.layers} aria-label="What we build, top layer first">
              <li>
                <span>03</span> Workloads and delivery pipelines
              </li>
              <li>
                <span>02</span> Platform, identity and network
              </li>
              <li>
                <span>01</span> Cloud foundation{platformNames.length ? `: ${platformNames.join(" · ")}` : ""}
              </li>
              <li className={s.layerSecure}>Security controls and evidence at every layer</li>
            </ol>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

/** Scope, method and role: proof that needs nobody's permission (07 §7, amended). */
export function ScopeStrip() {
  return (
    <div className={s.strip} role="list" aria-label="Scope, method and role">
      <div role="listitem">
        <b>Scope</b>
        <p>Cloud engineering, DevOps and DevSecOps, cloud security, compliance and governance. Nothing else.</p>
      </div>
      <div role="listitem">
        <b>Method</b>
        <p>Assess, architect, implement, manage, optimize, with security applied at every step.</p>
      </div>
      <div role="listitem">
        <b>Our role</b>
        <p>We implement and evidence technical controls. Your auditor or assessor certifies.</p>
      </div>
    </div>
  );
}

/** The prototype's pillar icons: 24px outline, 1.6 stroke. */
const ICONS: Record<string, ReactNode> = {
  "cloud-consulting": <path d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17.2 9.1 4.5 4.5 0 0 1 17 18H7z" />,
  devops: <path d="M4 12a4 4 0 0 1 4-4c4 0 4 8 8 8a4 4 0 0 0 0-8c-4 0-4 8-8 8a4 4 0 0 1-4-4z" />,
  "cloud-security": (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  compliance: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 12h5M10 16h5" />
    </>
  ),
  "managed-cloud-services": <path d="M3 12h4l2-6 4 12 2-6h6" />,
};

export function PillarIcon({ slug }: { slug: string }) {
  const icon = ICONS[slug];
  if (!icon) return null;
  return (
    <svg className={s.icon} viewBox="0 0 24 24" aria-hidden="true">
      {icon}
    </svg>
  );
}

export const pillarsClass = s.pillars;
