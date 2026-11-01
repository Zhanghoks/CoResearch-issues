// Fixed world coordinates keep node identity and position stable across scroll frames.
export type GraphDot = { id: string; x: number; y: number; r: number };
type Dot = Omit<GraphDot, "id">;

export function buildGraph() {
  const rand = mulberry32(20261101);
  const dots = placeDisk(rand, 250, 0, 0, 320).map((dot, index) => ({
    ...dot, id: `paper-${index}`,
  }));
  const links = mesh(dots, 160);
  const seen = new Set(links.map(([a, b]) => `${a}:${b}`));
  // A nearest-parent backbone prevents detached communities without a central star.
  for (let i = 1; i < dots.length; i += 1) {
    let nearest = 0;
    for (let j = 1; j < i; j += 1) {
      if (Math.hypot(dots[j].x - dots[i].x, dots[j].y - dots[i].y) <
          Math.hypot(dots[nearest].x - dots[i].x, dots[nearest].y - dots[i].y)) nearest = j;
    }
    if (!seen.has(`${nearest}:${i}`)) links.push([nearest, i]);
  }
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

function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}
