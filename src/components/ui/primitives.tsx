import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { BOUNDARY_STATEMENT } from "@/resources/frameworks";
import { type ClientLogo, MIN_CLIENT_LOGOS } from "@/resources/site";
import s from "./ui.module.scss";

/**
 * site-v2 design-system primitives (docs/website-transformation/08 §6, 09 §3).
 * All server components. They share one stylesheet (ui.module.scss) instead of one module
 * per component: the set is small and every page uses most of it.
 */

const cx = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(" ");
type HeadingTag = "h1" | "h2" | "h3" | "h4";

/* ---------- Layout ---------- */

/**
 * Root element of every site-v2 page. The root layout places pages inside a flex row,
 * so a page must be one full-width block or its sections would sit side by side.
 */
export function Page({ children }: { children: ReactNode }) {
  return <div className={s.page}>{children}</div>;
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx(s.container, className)}>{children}</div>;
}

export function Section({
  tone = "default",
  tight,
  id,
  labelledBy,
  children,
}: {
  tone?: "default" | "soft" | "dark";
  tight?: boolean;
  id?: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx(s.section, tone === "soft" && s.soft, tone === "dark" && s.dark, tight && s.tight)}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Grid({ cols, children }: { cols: 2 | 3 | 4 | "fit"; children: ReactNode }) {
  const col = { 2: s.cols2, 3: s.cols3, 4: s.cols4, fit: s.colsFit }[cols];
  return <div className={cx(s.grid, col)}>{children}</div>;
}

export function Split({ children }: { children: ReactNode }) {
  return <div className={s.split}>{children}</div>;
}

/* ---------- Type ---------- */

export function Heading({
  as: Tag = "h2",
  size,
  id,
  children,
}: {
  /** The heading level is the page's decision; the size is the design's. */
  as?: HeadingTag;
  size?: "display" | "h1" | "h2" | "h3";
  id?: string;
  children: ReactNode;
}) {
  const sizeClass = { display: s.display, h1: s.h1, h2: s.h2, h3: s.h3 }[size ?? (Tag === "h4" ? "h3" : Tag)];
  return (
    <Tag id={id} className={cx(s.heading, sizeClass)}>
      {children}
    </Tag>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className={s.lead}>{children}</p>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className={s.eyebrow}>{children}</p>;
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  as = "h2",
  id,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  as?: HeadingTag;
  id?: string;
}) {
  return (
    <div className={s.sectionHead} data-reveal="">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading as={as} size="h2" id={id}>
        {title}
      </Heading>
      {lead && <Lead>{lead}</Lead>}
    </div>
  );
}

/* ---------- Actions ---------- */

const Arrow = () => (
  <span className={s.arrow} aria-hidden="true">
    →
  </span>
);

type ButtonProps = {
  variant?: "primary" | "outline";
  size?: "md" | "sm";
  arrow?: boolean;
  children: ReactNode;
} & ({ href: string; type?: never } | { href?: never; type?: "button" | "submit" });

export function Button({ variant = "primary", size = "md", arrow, children, href, type = "button" }: ButtonProps) {
  const className = cx(s.btn, variant === "primary" ? s.primary : s.outline, size === "sm" && s.btnSm);
  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );
  return href ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <button type={type} className={className}>
      {content}
    </button>
  );
}

export function ButtonRow({ children }: { children: ReactNode }) {
  return <div className={s.btns}>{children}</div>;
}

export function TextLink({ href, arrow = true, children }: { href: string; arrow?: boolean; children: ReactNode }) {
  return (
    <Link href={href} className={s.link}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

/* ---------- Card, chips, icon ---------- */

export function Chips({ items }: { items: readonly string[] }) {
  if (!items.length) return null;
  return (
    <ul className={s.chips}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** Pass a 24px outline icon as the child. */
export function IconTile({ children }: { children: ReactNode }) {
  return (
    <span className={s.iconTile} aria-hidden="true">
      {children}
    </span>
  );
}

export function Card({
  href,
  label,
  icon,
  title,
  as = "h3",
  chips,
  more,
  children,
}: {
  /** With href the whole card is one link. */
  href?: string;
  label?: string;
  icon?: ReactNode;
  title: string;
  as?: HeadingTag;
  chips?: readonly string[];
  /** "Go to" text shown at the bottom of a linked card. */
  more?: string;
  children?: ReactNode;
}) {
  const body = (
    <>
      {icon && <IconTile>{icon}</IconTile>}
      {label && <span className={s.cardLabel}>{label}</span>}
      <Heading as={as} size="h3">
        {title}
      </Heading>
      {children}
      {chips && <Chips items={chips} />}
      {href && more && (
        <span className={s.cardMore}>
          {more} <Arrow />
        </span>
      )}
    </>
  );
  return href ? (
    <Link href={href} className={cx(s.card, s.cardLink)} data-reveal="">
      {body}
    </Link>
  ) : (
    <div className={s.card} data-reveal="">
      {body}
    </div>
  );
}

/* ---------- Lists ---------- */

export function Checklist({ items, variant = "tick" }: { items: readonly ReactNode[]; variant?: "tick" | "dash" }) {
  return (
    <ul className={cx(s.checklist, variant === "dash" && s.dash)} data-reveal="">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function DefinitionCard({ items }: { items: readonly { term: string; value: ReactNode }[] }) {
  const shown = items.filter((i) => i.value !== undefined && i.value !== null && i.value !== "");
  if (!shown.length) return null;
  return (
    <dl className={s.definitions}>
      {shown.map((item) => (
        <div key={item.term}>
          <dt>{item.term}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The role boundary (07 §8). One text everywhere unless a page passes its own. */
export function BoundaryStatement({ id, children }: { id?: string; children?: ReactNode }) {
  return (
    <p className={s.boundary} id={id}>
      <b>Our role</b>
      {children ?? BOUNDARY_STATEMENT}
    </p>
  );
}

/* ---------- Steps ---------- */

export function Steps({
  items,
  band,
}: {
  items: readonly { title: string; text: string }[];
  /** Message that applies to every step, e.g. "Secure · applied at every step". */
  band?: string;
}) {
  return (
    <div data-reveal="">
      <ol className={cx(s.steps, band && s.stepsBanded)} style={{ "--steps": items.length } as CSSProperties}>
        {items.map((item) => (
          <li key={item.title}>
            <Heading as="h3" size="h3">
              {item.title}
            </Heading>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>
      {band && <p className={s.band}>{band}</p>}
    </div>
  );
}

/* ---------- Ledger ---------- */

export function Ledger({ children }: { children: ReactNode }) {
  return <div className={s.ledger}>{children}</div>;
}

export function LedgerRow({
  id,
  title,
  as = "h3",
  tools,
  children,
}: {
  /** Anchor id. Menu links point here, so it must match navigation data. */
  id?: string;
  title: string;
  as?: HeadingTag;
  tools?: readonly string[];
  children: ReactNode;
}) {
  return (
    <div className={s.ledgerRow} id={id} data-reveal="">
      <Heading as={as} size="h3">
        {title}
      </Heading>
      <div>{children}</div>
      {tools && tools.length > 0 ? (
        <ul className={s.ledgerTools} aria-label="Tools">
          {tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      ) : (
        <span />
      )}
    </div>
  );
}

/* ---------- Table ---------- */

export function DataTable({
  caption,
  columns,
  rows,
}: {
  caption?: string;
  columns: readonly string[];
  /** First cell of each row is its row header. */
  rows: readonly (readonly ReactNode[])[];
}) {
  return (
    <div className={s.tableWrap} role="region" aria-label={caption ?? "Table"} tabIndex={0}>
      <table className={s.table}>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) =>
                c === 0 ? (
                  <th key={c} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={c}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- FAQ ---------- */

/**
 * Native <details>: works without JavaScript.
 * `schema` adds FAQPage structured data; use it only where these questions are the page's own visible FAQ.
 */
export function Faq({ items, schema }: { items: readonly { q: string; a: string }[]; schema?: boolean }) {
  if (!items.length) return null;
  return (
    <div>
      {items.map((item) => (
        <details key={item.q} className={s.faq}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </div>
  );
}

/* ---------- Logo row ---------- */

/** Renders nothing with fewer than three approved logos (07 §7). No links, no captions. */
export function LogoRow({ logos }: { logos: readonly ClientLogo[] }) {
  if (logos.length < MIN_CLIENT_LOGOS) return null;
  const sorted = [...logos].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <ul className={s.logoRow}>
      {sorted.map((logo) => (
        <li key={logo.name}>
          {/* eslint-disable-next-line @next/next/no-img-element -- small monochrome SVG logos; no optimisation needed */}
          <img src={logo.src} alt={logo.name} width={logo.width} height={logo.height} loading="lazy" />
        </li>
      ))}
    </ul>
  );
}

/* ---------- CTA block ---------- */

export function CtaBlock({
  title,
  text,
  primary,
  secondary,
  as = "h2",
}: {
  title: string;
  text?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  as?: HeadingTag;
}) {
  return (
    <div className={cx(s.cta, s.dark)} data-reveal="">
      <div>
        <Heading as={as} size="h1">
          {title}
        </Heading>
        {text && <p>{text}</p>}
      </div>
      <div className={s.btns}>
        <Button href={primary.href} arrow>
          {primary.label}
        </Button>
        {secondary && (
          <Button href={secondary.href} variant="outline">
            {secondary.label}
          </Button>
        )}
      </div>
    </div>
  );
}
