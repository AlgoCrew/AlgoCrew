import type { ReactNode } from "react";
import s from "./sections.module.scss";

/** "Problems we solve" beside a pillar hero. */
export function ProblemsList({ items }: { items: readonly string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <p className={s.problemsLabel} id="problems-label">
        Problems we solve
      </p>
      <ul className={s.problems} aria-labelledby="problems-label">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/** Thin definition row under a capability hero. Items with no value are left out. */
export function GlanceRow({ items }: { items: readonly { term: string; value?: ReactNode }[] }) {
  const shown = items.filter((i) => i.value);
  if (!shown.length) return null;
  return (
    <dl className={s.glance}>
      {shown.map((item) => (
        <div key={item.term}>
          <dt>{item.term}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
