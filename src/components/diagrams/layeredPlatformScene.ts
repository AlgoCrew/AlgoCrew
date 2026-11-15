/**
 * Layered multi-cloud platform in plain three.js (docs/website-transformation/08 §10, concept 1;
 * prototype: prototypes/concept-3d.html). Three slabs (cloud foundation, platform, workloads),
 * nodes on each, pulses travelling between layers, and a security outline around every layer.
 *
 * Plain three.js with named imports, not React Three Fiber: measured 130 KB vs 244 KB gzip
 * (08 §10.2). Loaded with a dynamic import only on wide screens with motion allowed.
 * Colours come from the CSS design tokens, so the scene follows the design system.
 */
import {
  BoxGeometry, BufferGeometry, Color, EdgesGeometry, GridHelper, Group, Line, LineBasicMaterial, LineSegments, Mesh,
  MeshBasicMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from "three";

const token = (name: string) =>
  new Color(getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#1d4ed8");

export type SceneHandle = { dispose: () => void };

export function mountLayeredPlatform(canvas: HTMLCanvasElement, host: HTMLElement): SceneHandle {
  const BRAND = token("--brand");
  const CYAN = token("--cyan");
  const LINE = token("--line-strong");
  const SURFACE = token("--bg");
  const TINT = token("--bg-tint");

  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(7.5, 6.2, 7.5);
  camera.lookAt(0, 0.1, 0);
  const rig = new Group();
  scene.add(rig);

  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(x: T) => (disposables.push(x), x);

  const layerY = [-1.5, 0, 1.5];
  const spots: [number, number][][] = [
    [[-1.2, -1], [0.2, 0.9], [1.3, -0.6]],
    [[-1.1, 0.8], [0.9, 1.1], [0.3, -1.1], [-0.6, -0.3]],
    [[-1, -1.1], [1.1, 0.2], [-0.2, 1], [0.9, -1.2]],
  ];
  const nodes: Vector3[][] = [[], [], []];

  layerY.forEach((y, i) => {
    const slabGeo = track(new BoxGeometry(4, 0.08, 4));
    const slab = new Mesh(slabGeo, track(new MeshBasicMaterial({ color: i === 2 ? TINT : SURFACE, transparent: true, opacity: 0.9 })));
    slab.position.y = y;
    rig.add(slab);

    const edge = new LineSegments(track(new EdgesGeometry(slabGeo)), track(new LineBasicMaterial({ color: i === 0 ? LINE : BRAND })));
    edge.position.y = y;
    rig.add(edge);

    const grid = new GridHelper(4, 10, BRAND, BRAND);
    const gridMat = grid.material as LineBasicMaterial;
    gridMat.transparent = true;
    gridMat.opacity = 0.1;
    grid.position.y = y + 0.045;
    track(grid.geometry);
    track(gridMat);
    rig.add(grid);

    // The security outline on every layer.
    const ring = new LineSegments(
      track(new EdgesGeometry(track(new BoxGeometry(4.36, 0.02, 4.36)))),
      track(new LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.55 })),
    );
    ring.position.y = y;
    rig.add(ring);

    const nodeGeo = track(new BoxGeometry(0.34, 0.2, 0.34));
    spots[i].forEach(([x, z], n) => {
      const node = new Mesh(nodeGeo, track(new MeshBasicMaterial({ color: n === 1 ? CYAN : BRAND })));
      node.position.set(x, y + 0.14, z);
      rig.add(node);
      nodes[i].push(node.position);
    });
  });

  // Connections between layers, each with a pulse travelling along it.
  const pulseGeo = track(new SphereGeometry(0.06, 12, 12));
  const pulseMat = track(new MeshBasicMaterial({ color: CYAN }));
  const linkMat = track(new LineBasicMaterial({ color: BRAND, transparent: true, opacity: 0.35 }));
  const pulses = (
    [
      [0, 0, 1, 0], [0, 1, 1, 1], [0, 2, 1, 2], [1, 0, 2, 2], [1, 1, 2, 1], [1, 3, 2, 0],
    ] as const
  ).map(([la, a, lb, b], n) => {
    const from = nodes[la][a];
    const to = nodes[lb][b];
    rig.add(new Line(track(new BufferGeometry().setFromPoints([from, to])), linkMat));
    const dot = new Mesh(pulseGeo, pulseMat);
    rig.add(dot);
    return { dot, from, to, offset: n / 6 };
  });

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = host;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  let tx = 0;
  let ty = 0;
  let visible = true;
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width - 0.5) * 0.5;
    ty = ((e.clientY - r.top) / r.height - 0.5) * 0.25;
  };
  const onLeave = () => {
    tx = 0;
    ty = 0;
  };
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", onLeave);
  // Nothing renders while the hero is off screen.
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  io.observe(host);

  renderer.setAnimationLoop((t: number) => {
    if (!visible) return;
    const s = t / 1000;
    rig.rotation.y += (Math.sin(s * 0.25) * 0.18 + tx - rig.rotation.y) * 0.06;
    rig.rotation.x += (ty - rig.rotation.x) * 0.06;
    for (const p of pulses) p.dot.position.lerpVectors(p.from, p.to, (s * 0.35 + p.offset) % 1);
    renderer.render(scene, camera);
  });

  return {
    dispose() {
      renderer.setAnimationLoop(null);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    },
  };
}
