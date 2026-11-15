import Link from "next/link";
import type { Framework } from "@/resources/frameworks";
import { Grid } from "@/components/ui";
import s from "./sections.module.scss";

/** Cards for the frameworks passed in. Callers pass live frameworks only; nothing renders for an empty list. */
export function FrameworkCards({ frameworks }: { frameworks: readonly Framework[] }) {
  if (!frameworks.length) return null;
  return (
    <Grid cols="fit">
      {frameworks.map((f) => (
        <Link key={f.slug} className={s.fw} href={`/compliance/${f.slug}`} data-reveal="">
          <span>{f.region}</span>
          <strong>{f.name}</strong>
          <p>{f.cardLine}</p>
        </Link>
      ))}
    </Grid>
  );
}

/** Large chip links to framework pages, used in heroes. */
export function FrameworkQuickLinks({ frameworks }: { frameworks: readonly Framework[] }) {
  if (!frameworks.length) return null;
  return (
    <ul className={s.quick} aria-label="Frameworks">
      {frameworks.map((f) => (
        <li key={f.slug}>
          <Link href={`/compliance/${f.slug}`}>{f.name}</Link>
        </li>
      ))}
    </ul>
  );
}
