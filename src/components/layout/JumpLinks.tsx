import s from "./layout.module.scss";

/**
 * Sticky in-page navigation for long pages. Sits under the header.
 * Target sections need `scroll-margin-top` (LedgerRow has it) so a focused or
 * linked heading is not hidden behind the header and this bar (WCAG 2.2, 2.4.11).
 */
export function JumpLinks({ items }: { items: readonly { id: string; label: string }[] }) {
  if (items.length < 2) return null;
  return (
    <nav className={s.jump} aria-label="On this page">
      <ul className={s.jumpList}>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
