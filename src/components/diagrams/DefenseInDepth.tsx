import s from "./diagrams.module.scss";

/**
 * Data at the center, with identity, network and workload controls around it
 * (docs/website-transformation/08 §10, concept 3; prototype: pillar-cloud-security.html).
 * HTML and CSS only, for a dark section. The list order is outermost first, so a
 * screen reader hears the layers in the order an attacker would meet them.
 */
export function DefenseInDepth() {
  return (
    <ol className={s.rings} aria-label="Security layers, outermost first" data-ambient>
      <li>Identity</li>
      <li>Network</li>
      <li>Workload</li>
      <li>Data</li>
    </ol>
  );
}
