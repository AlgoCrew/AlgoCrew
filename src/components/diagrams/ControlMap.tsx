import { SHARED_CONTROLS, type SharedControlId } from "@/resources/frameworks";
import { DataTable } from "@/components/ui";
import figure from "../sections/sections.module.scss";
import s from "./diagrams.module.scss";

/**
 * Requirement -> shared control -> evidence (docs/website-transformation/08 §10, concept 4).
 * Server-rendered SVG driven by data. The same content is offered as a table underneath,
 * so the diagram is never the only way to read it.
 */
export function ControlMap({
  requirements,
  caption,
}: {
  requirements: readonly { label: string; maps: readonly SharedControlId[] }[];
  caption: string;
}) {
  const controls = SHARED_CONTROLS.filter((c) => requirements.some((r) => r.maps.includes(c.id)));
  if (!requirements.length || !controls.length) return null;

  const rows = Math.max(requirements.length, controls.length);
  const height = Math.max(200, rows * 46 + 40);
  const y = (i: number, n: number) => (n < 2 ? height / 2 + 10 : 50 + i * ((height - 70) / (n - 1)));
  const controlY = (id: SharedControlId) => y(controls.findIndex((c) => c.id === id), controls.length);
  const box = (x: number, cy: number, w: number, label: string, className: string) => (
    <g key={`${x}-${label}`}>
      <rect className={`${s.mapBox} ${className}`} x={x} y={cy - 14} width={w} height={28} rx={6} />
      <text x={x + 10} y={cy + 4}>
        {label}
      </text>
    </g>
  );

  const summary = `${requirements.length} requirements map to ${controls.length} shared controls: ${controls
    .map((c) => c.label)
    .join(", ")}. Each control produces its own evidence record.`;

  return (
    <figure className={figure.diagram} data-reveal="">
      <svg className={s.map} viewBox={`0 0 640 ${height}`} role="img" aria-label={summary}>
        {requirements.flatMap((r, i) =>
          r.maps.map((id) => {
            const a = y(i, requirements.length);
            const b = controlY(id);
            return <path key={`${r.label}-${id}`} className={s.mapLink} d={`M170 ${a}C216 ${a},216 ${b},262 ${b}`} />;
          }),
        )}
        {controls.map((c) => {
          const cy = controlY(c.id);
          return <path key={c.id} className={`${s.mapLink} ${s.mapLinkEvidence}`} d={`M442 ${cy}L474 ${cy}`} />;
        })}
        {requirements.map((r, i) => box(20, y(i, requirements.length), 150, r.label, ""))}
        {controls.map((c) => box(262, controlY(c.id), 180, c.label, s.mapBoxControl))}
        {controls.map((c) => box(474, controlY(c.id), 162, c.evidence, s.mapBoxEvidence))}
        <text className={s.mapHead} x={20} y={20}>REQUIREMENTS</text>
        <text className={s.mapHead} x={262} y={20}>CONTROLS</text>
        <text className={s.mapHead} x={474} y={20}>EVIDENCE</text>
      </svg>
      <figcaption>{caption}</figcaption>
      <details>
        <summary>View this map as a table</summary>
        <DataTable
          caption="Requirements, the shared controls that meet them, and the evidence each control produces"
          columns={["Requirement", "Shared controls", "Evidence"]}
          rows={requirements.map((r) => {
            const mapped = SHARED_CONTROLS.filter((c) => r.maps.includes(c.id));
            return [r.label, mapped.map((c) => c.label).join("; "), mapped.map((c) => c.evidence).join("; ")];
          })}
        />
      </details>
    </figure>
  );
}
