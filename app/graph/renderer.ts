import { Application, Container, Graphics } from "pixi.js";

const ink = 0x262626;

type Dot = { x: number; y: number; r: number };

const graph = buildGraph();

export async function mountGraph(host: HTMLElement) {
  const app = new Application();
  await app.init({
    backgroundAlpha: 0,
    antialias: true,
    resizeTo: host,
    autoDensity: true,
    resolution: Math.min(window.devicePixelRatio || 1, 2),
    preference: "webgl",
  });
  app.canvas.style.width = "100%";
  app.canvas.style.height = "100%";
  app.canvas.style.background = "transparent";
  app.canvas.style.touchAction = "pan-y";
  app.stage.eventMode = "none";
  host.appendChild(app.canvas);

  const view = new Container();
  view.addChild(drawEdges(), drawNodes());
  app.stage.addChild(view);

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const dot of graph.dots) {
    minX = Math.min(minX, dot.x - dot.r);
    minY = Math.min(minY, dot.y - dot.r);
    maxX = Math.max(maxX, dot.x + dot.r);
    maxY = Math.max(maxY, dot.y + dot.r);
  }

  const fit = () => {
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);
    const pad = width < 640 ? 20 : 48;
    const header = 0;
    const zoom = Math.min((width - pad * 2) / (maxX - minX), (height - pad - header) / (maxY - minY));
    view.scale.set(zoom);
    view.position.set(
      width / 2 - ((minX + maxX) / 2) * zoom,
      header + (height - header) / 2 - ((minY + maxY) / 2) * zoom,
    );
  };

  const observer = new ResizeObserver(fit);
  observer.observe(host);
  fit();

  return {
    destroy() {
      observer.disconnect();
      app.destroy({ removeView: true }, true);
    },
  };
}

function buildGraph() {
  const rand = mulberry32(20261101);
  const main = placeDisk(rand, 210, 390, 500, 280);
  const dots = [...main];
  const links = mesh(main, 280);
  const groups = [
    star(rand, 860, 190, 12, 78),
    star(rand, 990, 390, 8, 48),
    clique(rand, 1040, 560, 8, 34),
    star(rand, 900, 790, 16, 96),
  ];
  for (const group of groups) {
    const offset = dots.length;
    dots.push(...group.nodes);
    for (const [from, to] of group.links) links.push([offset + from, offset + to]);
  }
  dots.push(
    { x: 150, y: 430, r: 2.4 },
    { x: 250, y: 150, r: 2.8 },
    { x: 560, y: 70, r: 3.1 },
    { x: 690, y: 55, r: 2.2 },
    { x: 1120, y: 130, r: 2.6 },
    { x: 1160, y: 70, r: 2.2 },
  );
  return { dots, links };
}

function placeDisk(rand: () => number, count: number, cx: number, cy: number, radius: number) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const nodes: Dot[] = [];
  for (let i = 0; i < count; i += 1) {
    const dist = Math.min(radius, radius * Math.sqrt((i + 0.5) / count) * (0.84 + rand() * 0.32));
    const theta = i * golden + (rand() - 0.5) * 0.7;
    const hub = rand() < 0.045;
    nodes.push({
      x: cx + Math.cos(theta) * dist + (rand() - 0.5) * 16,
      y: cy + Math.sin(theta) * dist + (rand() - 0.5) * 16,
      r: hub ? 5.2 + rand() * 1.6 : 2.15 + rand() * 1.15,
    });
    const dx = nodes[i].x - cx;
    const dy = nodes[i].y - cy;
    const placed = Math.hypot(dx, dy) || 1;
    if (placed > radius) {
      nodes[i].x = cx + (dx / placed) * radius;
      nodes[i].y = cy + (dy / placed) * radius;
    }
  }
  return nodes;
}

function mesh(nodes: Dot[], radius: number) {
  const pairs = knn(nodes, 4, radius * 0.34);
  const seen = new Set(pairs.map(([from, to]) => `${from}:${to}`));
  const add = (from: number, to: number) => {
    if (from === to) return;
    const key = `${Math.min(from, to)}:${Math.max(from, to)}`;
    if (seen.has(key)) return;
    seen.add(key);
    pairs.push([Math.min(from, to), Math.max(from, to)]);
  };
  nodes.forEach((node, index) => {
    if (node.r < 5) return;
    const reach = radius * 0.92;
    const order = nodes
      .map((other, otherIndex) => ({
        otherIndex,
        dist: Math.hypot(other.x - node.x, other.y - node.y),
      }))
      .filter((item) => item.otherIndex !== index && item.dist < reach && item.dist > 18)
      .sort((a, b) => a.dist - b.dist);
    const spokes = 22;
    const step = Math.max(1, Math.floor(order.length / spokes));
    for (let n = 0; n < order.length && n / step < spokes; n += step) add(index, order[n].otherIndex);
  });
  return pairs;
}

function star(rand: () => number, cx: number, cy: number, leaves: number, arm: number) {
  const nodes: Dot[] = [{ x: cx, y: cy, r: 4.6 + rand() * 1.4 }];
  const links: [number, number][] = [];
  for (let i = 0; i < leaves; i += 1) {
    const angle = (i / leaves) * Math.PI * 2 + (rand() - 0.5) * 0.4;
    const dist = arm * (0.58 + rand() * 0.5);
    nodes.push({
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
      r: 2.1 + rand() * 1.5,
    });
    links.push([0, i + 1]);
  }
  const rim = Math.max(2, Math.floor(leaves / 4));
  for (let i = 0; i < rim; i += 1) {
    const from = 1 + Math.floor(rand() * leaves);
    const to = 1 + ((from + 1) % leaves);
    links.push([from, to]);
  }
  return { nodes, links };
}

function clique(rand: () => number, cx: number, cy: number, count: number, spread: number) {
  const nodes: Dot[] = [];
  const links: [number, number][] = [];
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2 + (rand() - 0.5) * 0.2;
    const dist = spread * (0.4 + rand() * 0.6);
    nodes.push({
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
      r: i === 0 ? 4.4 : 2.2 + rand() * 1.3,
    });
  }
  for (let i = 0; i < count; i += 1) {
    for (let j = i + 1; j < count; j += 1) links.push([i, j]);
  }
  return { nodes, links };
}

function knn(nodes: Dot[], k: number, maxDist: number) {
  const pairs: [number, number][] = [];
  const seen = new Set<string>();
  for (let i = 0; i < nodes.length; i += 1) {
    const nearest: { j: number; d: number }[] = [];
    for (let j = 0; j < nodes.length; j += 1) {
      if (i === j) continue;
      nearest.push({
        j,
        d: Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y),
      });
    }
    nearest.sort((a, b) => a.d - b.d);
    const degree = k;
    const reach = maxDist;
    for (let n = 0; n < degree && n < nearest.length; n += 1) {
      if (nearest[n].d > reach) break;
      const j = nearest[n].j;
      const key = `${Math.min(i, j)}:${Math.max(i, j)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      pairs.push([Math.min(i, j), Math.max(i, j)]);
    }
  }
  return pairs;
}

function drawEdges() {
  const graphics = new Graphics();
  const style = { width: 1.05, color: ink, alpha: 0.22, cap: "round" as const };
  for (const [from, to] of graph.links) {
    graphics.moveTo(graph.dots[from].x, graph.dots[from].y).lineTo(graph.dots[to].x, graph.dots[to].y).stroke(style);
  }
  return graphics;
}

function drawNodes() {
  const graphics = new Graphics();
  for (const dot of graph.dots) graphics.circle(dot.x, dot.y, dot.r).fill({ color: ink });
  return graphics;
}

function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}
