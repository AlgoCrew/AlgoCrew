import figure from "../sections/sections.module.scss";
import s from "./diagrams.module.scss";

/**
 * Seven delivery stages with a security gate between each, and an evidence band underneath
 * (docs/website-transformation/08 §10, concept 2; prototype: service-devsecops.html hero).
 * Static SVG. The flowing dash stops under reduced motion; the meaning does not depend on it.
 */
const STAGES = ["Plan", "Develop", "Build", "Test", "Deploy", "Operate", "Monitor"];
const STEP = 560 / 6;
const gate = (m: number) => `M${m} 108l8 3.5v6c0 5-3.5 9-8 10.5-4.5-1.5-8-5.5-8-10.5v-6z`;

export function PipelineGates() {
  return (
    <figure className={figure.diagram} data-ambient data-reveal="">
      <svg
        className={s.pipe}
        viewBox="0 60 640 180"
        role="img"
        aria-label="Seven delivery stages in a line: plan, develop, build, test, deploy, operate, monitor. A security gate sits between each pair of stages, and every gate adds to an evidence record."
      >
        <line className={s.pipeTrack} x1={40} y1={120} x2={600} y2={120} />
        <line className={s.pipeFlow} x1={40} y1={120} x2={600} y2={120} />
        {STAGES.map((name, i) => {
          const x = 40 + i * STEP;
          const m = x + STEP / 2;
          return (
            <g key={name}>
              <circle className={s.pipeStage} cx={x} cy={120} r={9} />
              <text className={s.pipeName} x={x} y={92}>
                {name}
              </text>
              <text x={x} y={148}>{`0${i + 1}`}</text>
              {i < STAGES.length - 1 && (
                <>
                  <path className={s.pipeGate} d={gate(m)} />
                  <line className={s.pipeDrop} x1={m} y1={131} x2={m} y2={196} />
                </>
              )}
            </g>
          );
        })}
        <rect className={s.pipeBand} x={40} y={196} width={560} height={30} rx={15} />
        <text className={s.pipeBandText} x={320} y={215}>
          EVIDENCE COLLECTED AT EVERY GATE
        </text>
      </svg>
    </figure>
  );
}
