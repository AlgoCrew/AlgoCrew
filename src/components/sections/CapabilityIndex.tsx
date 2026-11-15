import s from "./sections.module.scss";

/** Numbered list of in-page anchors, shown beside a platform hero (prototype: platform-azure.html). */
export function CapabilityIndex({ label, items }: { label: string; items: readonly { id: string; title: string }[] }) {
  return (
    <nav className={s.index} aria-label={label}>
      <p>{label}</p>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
