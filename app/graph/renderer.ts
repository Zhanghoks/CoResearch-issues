import { Application, Container, Graphics } from "pixi.js";
import { buildGraph } from "./graph-layout";

const ink = 0x262626;
const graph = buildGraph();

export type GraphPose = {
  /** Focus in world coordinates, independent of viewport size. */
  x: number;
  y: number;
  zoom: number;
  rotation: number;
  nodesOpacity: number;
  edgesOpacity: number;
  /** Stable node id; null restores the overview. */
  focusId: string | null;
};

export async function mountGraph(host: HTMLElement) {
  const app = new Application();
  await app.init({
    backgroundAlpha: 0,
    antialias: true,
    resizeTo: host,
    autoDensity: true,
    resolution: Math.min(window.devicePixelRatio || 1, 2),
    preference: "webgl",
    autoStart: false,
  });
  app.canvas.style.width = "100%";
  app.canvas.style.height = "100%";
  app.canvas.style.background = "transparent";
  app.canvas.style.touchAction = "pan-y";
  app.canvas.setAttribute("aria-hidden", "true");
  app.stage.eventMode = "none";
  host.appendChild(app.canvas);

  const view = new Container();
  const edges = new Graphics();
  const nodes = new Container();
  const nodeViews = new Map(graph.dots.map((dot) => {
    const graphic = new Graphics().circle(0, 0, dot.r).fill({ color: ink });
    graphic.position.set(dot.x, dot.y);
    nodes.addChild(graphic);
    return [dot.id, graphic] as const;
  }));
  for (const [from, to] of graph.links) {
    edges.moveTo(graph.dots[from].x, graph.dots[from].y)
      .lineTo(graph.dots[to].x, graph.dots[to].y)
      .stroke({ width: 0.85, color: ink, alpha: 0.19 });
  }
  view.addChild(edges, nodes);
  app.stage.addChild(view);

  // GSAP animates this plain object; no React renders or layout simulation per frame.
  const pose: GraphPose = {
    x: 0, y: 0, zoom: 1, rotation: 0,
    nodesOpacity: 1, edgesOpacity: 1, focusId: null,
  };
  let destroyed = false;
  let lastWidth = 0;
  let lastHeight = 0;
  const render = () => {
    if (destroyed) return;
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);
    const pad = width < 640 ? 20 : 36;
    const fit = Math.max(0.01, Math.min(width - pad * 2, height - pad * 2) / 656);
    const zoom = fit * pose.zoom;
    const cos = Math.cos(pose.rotation);
    const sin = Math.sin(pose.rotation);
    view.scale.set(zoom);
    view.rotation = pose.rotation;
    view.position.set(
      width / 2 - (pose.x * cos - pose.y * sin) * zoom,
      height / 2 - (pose.x * sin + pose.y * cos) * zoom,
    );
    edges.alpha = pose.edgesOpacity;
    nodes.alpha = pose.nodesOpacity;
    for (const [id, graphic] of nodeViews) {
      graphic.alpha = pose.focusId && id !== pose.focusId ? 0.25 : 1;
      graphic.scale.set(id === pose.focusId ? 1.8 : 1);
    }
    if (width !== lastWidth || height !== lastHeight) {
      app.renderer.resize(width, height);
      lastWidth = width;
      lastHeight = height;
    }
    app.render();
  };
  const observer = new ResizeObserver(render);
  observer.observe(host);
  render();

  return {
    pose,
    render,
    nodePosition(id: string) {
      const node = graph.dots.find((dot) => dot.id === id);
      if (!node) throw new Error(`Unknown graph node: ${id}`);
      return { x: node.x, y: node.y };
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      observer.disconnect();
      app.destroy({ removeView: true }, { children: true });
    },
  };
}

export type GraphController = Awaited<ReturnType<typeof mountGraph>>;
