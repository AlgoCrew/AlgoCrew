import Link from "next/link";
import type { ReactNode } from "react";
import { Chips, Eyebrow, Heading } from "@/components/ui";
import { PillarIcon } from "./HomeHero";
import s from "./home.module.scss";

/**
 * Homepage sections of the design refresh (docs/website-transformation/17-design-refresh.md).
 * Each section has its own layout so the page is not one card row after another.
 * All drawings are decorative (aria-hidden); the text beside them carries the meaning.
 */
const Arrow = () => (
  <span className={s.arrow} aria-hidden="true">
    →
  </span>
);

/* ---------- Capabilities: one featured card, the rest smaller ---------- */

export type Practice = { slug: string; href: string; title: string; text: string; chips?: readonly string[] };

/** Three stacked layers with a guardrail line: the featured card's drawing. */
const FoundationArt = () => (
  <svg className={s.art} viewBox="0 0 320 132" aria-hidden="true">
    <path className={s.artGuard} d="M20 16v100M300 16v100" />
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(0 ${i * 38})`}>
        <rect className={i === 0 ? s.artFillStrong : s.artFill} x="36" y="12" width="248" height="28" rx="7" />
        <rect className={s.artChip} x="48" y="21" width={[64, 92, 48][i]} height="10" rx="5" />
        <rect className={s.artChipSoft} x={[124, 152, 108][i]} y="21" width={[40, 56, 84][i]} height="10" rx="5" />
        <circle className={s.artDot} cx="268" cy="26" r="4" />
      </g>
    ))}
  </svg>
);

export function PracticeBento({ practices }: { practices: readonly Practice[] }) {
  return (
    <div className={s.bento}>
      {practices.map((p, i) => (
        <Link key={p.slug} href={p.href} className={s.bentoCard} data-reveal="">
          <span className={s.bentoTop}>
            <span className={s.bentoIcon}>
              <PillarIcon slug={p.slug} />
            </span>
            <span className={s.index}>{`0${i + 1}`}</span>
          </span>
          <Heading as="h3" size="h3">
            {p.title}
          </Heading>
          <p>{p.text}</p>
          {p.chips && <Chips items={p.chips} />}
          {i === 0 && <FoundationArt />}
          <span className={s.more}>
            Explore the practice <Arrow />
          </span>
        </Link>
      ))}
    </div>
  );
}

/* ---------- Compliance: links as rows, and how a requirement becomes evidence ---------- */

const FLOW = [
  { label: "Requirement", text: "Access to regulated data is restricted and logged." },
  { label: "Control", text: "Identity policy and logging, defined as code." },
  { label: "Check", text: "Policy evaluated on every change, and continuously after." },
  { label: "Evidence", text: "A dated record your assessor can open." },
];

export function ComplianceSplit({
  head,
  links,
  foot,
}: {
  head: ReactNode;
  links: readonly { href: string; title: string; text: string }[];
  foot?: ReactNode;
}) {
  return (
    <div className={s.splitWide}>
      <div>
        {head}
        <ul className={s.rows}>
          {links.map((l) => (
            <li key={l.href} data-reveal="">
              <Link href={l.href} className={s.row}>
                <span>
                  <b>{l.title}</b>
                  <span>{l.text}</span>
                </span>
                <Arrow />
              </Link>
            </li>
          ))}
        </ul>
        {foot}
      </div>
      <figure className={s.flow} data-reveal="">
        <figcaption>How one requirement is handled</figcaption>
        <ol>
          {FLOW.map((f, i) => (
            <li key={f.label}>
              <span className={s.flowNode}>{`0${i + 1}`}</span>
              <span>
                <b>{f.label}</b>
                {f.text}
              </span>
            </li>
          ))}
        </ol>
      </figure>
    </div>
  );
}

/* ---------- Outputs: each with a small drawing of the artifact ---------- */

const ARTIFACT_ART: Record<string, ReactNode> = {
  Design: (
    <>
      <rect className={s.artFill} x="14" y="12" width="132" height="22" rx="5" />
      <rect className={s.artFillStrong} x="14" y="44" width="60" height="34" rx="5" />
      <rect className={s.artFill} x="86" y="44" width="60" height="34" rx="5" />
      <path className={s.artLine} d="M44 34v10M116 34v10" />
    </>
  ),
  Controls: (
    <>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(0 ${i * 17})`}>
          <rect className={s.artChipSoft} x="14" y="14" width="46" height="9" rx="4.5" />
          <path className={s.artLine} d="M66 18.500h22" />
          <rect className={i === 1 ? s.artChip : s.artFillStrong} x="94" y="14" width="52" height="9" rx="4.5" />
        </g>
      ))}
    </>
  ),
  Evidence: (
    <>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(0 ${i * 17})`}>
          <rect className={s.artFillStrong} x="14" y="13" width="11" height="11" rx="3" />
          <path className={s.artTick} d="M16.500 18.500l2.200 2.200 4-4.400" />
          <rect className={s.artChipSoft} x="34" y="14" width={[96, 72, 104, 60][i]} height="9" rx="4.500" />
        </g>
      ))}
    </>
  ),
  Operations: (
    <>
      <path className={s.artLine} d="M14 78h132" />
      {[30, 46, 24, 54, 38, 60, 44].map((h, i) => (
        <rect key={i} className={i === 5 ? s.artChip : s.artFillStrong} x={18 + i * 18} y={76 - h} width="11" height={h} rx="3" />
      ))}
    </>
  ),
};

export function OutputArtifacts({ items }: { items: readonly { label: string; title: string; text: string }[] }) {
  return (
    <ul className={s.artifacts}>
      {items.map((item) => (
        <li key={item.title} data-reveal="">
          <svg className={s.artifactArt} viewBox="0 0 160 90" aria-hidden="true">
            {ARTIFACT_ART[item.label]}
          </svg>
          <span className={s.index}>{item.label}</span>
          <Heading as="h3" size="h3">
            {item.title}
          </Heading>
          <p>{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Engagement models: two panels ---------- */

export function EngagementPanels({ items }: { items: readonly { label: string; title: string; text: string }[] }) {
  return (
    <div className={s.panels}>
      {items.map((item, i) => (
        <div key={item.label} className={s.panelCard} data-reveal="">
          <span className={s.panelMark} aria-hidden="true">
            {/* A closed shape for work with an end, a loop for ongoing operation. */}
            <svg viewBox="0 0 24 24">
              {i === 0 ? (
                <path d="M5 5h14v14H5zM9 12l2 2 4-4" />
              ) : (
                <path d="M4 12a8 8 0 0 1 14-5.300M20 12a8 8 0 0 1-14 5.300M18 3v4h-4M6 21v-4h4" />
              )}
            </svg>
          </span>
          <Eyebrow>{item.label}</Eyebrow>
          <Heading as="h3" size="h3">
            {item.title}
          </Heading>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- Insights: one featured post, the rest as rows ---------- */

export function InsightsFeature({ posts }: { posts: readonly { href: string; category: string; title: string }[] }) {
  const [first, ...rest] = posts;
  if (!first) return null;
  return (
    <div className={s.insights}>
      <Link href={first.href} className={s.insightLead} data-reveal="">
        <span className={s.index}>{first.category}</span>
        <Heading as="h3" size="h2">
          {first.title}
        </Heading>
        <span className={s.more}>
          Read the article <Arrow />
        </span>
      </Link>
      <ul className={s.rows}>
        {rest.map((p) => (
          <li key={p.href} data-reveal="">
            <Link href={p.href} className={s.row}>
              <span>
                <span className={s.index}>{p.category}</span>
                <b>{p.title}</b>
              </span>
              <Arrow />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
