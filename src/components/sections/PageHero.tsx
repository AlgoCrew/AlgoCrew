import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout";
import { Heading, Lead } from "@/components/ui";
import s from "./sections.module.scss";

/**
 * Hero for every inner page (docs/website-transformation/08 §6). It renders the page's one H1.
 * Templates differ by what they pass: `aside` (problems list, capability index), `tag`
 * (framework reference), `below` (fact row, diagram) and `tinted` (platform band).
 */
export function PageHero({
  trail,
  tag,
  title,
  lead,
  actions,
  aside,
  below,
  tinted,
  plain,
  titleSize = "h1",
}: {
  trail: readonly { label: string; href: string }[];
  tag?: string;
  title: string;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  below?: ReactNode;
  tinted?: boolean;
  /** White background with no tint: the editorial framework hero. */
  plain?: boolean;
  /** Framework pages use the larger display size, as in the prototype. */
  titleSize?: "h1" | "display";
}) {
  return (
    <div className={[s.hero, tinted ? s.tinted : "", plain ? s.plain : ""].join(" ")}>
      <div className={[s.heroInner, aside ? s.withAside : ""].join(" ")}>
        <div className={[s.heroCopy, titleSize === "display" ? s.bigTitle : ""].join(" ")}>
          <Breadcrumbs trail={trail} />
          {tag && <p className={s.tag}>{tag}</p>}
          <Heading as="h1">
            {title}
          </Heading>
          {lead && <Lead>{lead}</Lead>}
          {actions}
        </div>
        {aside}
      </div>
      {below && <div className={`${s.heroInner} ${s.heroBelow}`}>{below}</div>}
    </div>
  );
}

/** Definition row under a hero. An item marked `role` is highlighted and carries the boundary. */
export function FactRow({ items }: { items: readonly { term: string; value: string; role?: boolean }[] }) {
  const shown = items.filter((i) => i.value);
  if (!shown.length) return null;
  return (
    <dl className={s.facts}>
      {shown.map((item) => (
        <div key={item.term} className={item.role ? s.factRole : undefined}>
          <dt>{item.term}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
