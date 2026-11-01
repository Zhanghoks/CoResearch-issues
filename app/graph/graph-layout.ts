// Fixed world coordinates keep node identity and position stable across scroll frames.
export type GraphDot = { id: string; x: number; y: number; r: number };
type Dot = Omit<GraphDot, "id">;

export function buildGraph() {
  const rand = mulberry32(20261101);
  const dots = placeDisk(rand, 350, 0, 0, 205).map((dot, index) => ({
    ...dot, id: `paper-${index}`,
  }));
  const links = mesh(dots, 125);
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

  // Branches grow from different core anchors, rather than a single central hub.
  // Fixed branch IDs also let future scroll scenes follow a particular frontier.
  const coreCount = dots.length;
  const branchCount = 18;
  for (let branch = 0; branch < branchCount; branch += 1) {
    const angle = (branch / branchCount) * Math.PI * 2 + (rand() - 0.5) * 0.16;
    const reach = 275 + rand() * 45;
    const bend = (rand() - 0.5) * 0.3;
    const steps = 4 + Math.floor(rand() * 2);
    const anchor = { x: Math.cos(angle) * 175, y: Math.sin(angle) * 175 };
    let parent = 0;
    for (let i = 1; i < coreCount; i += 1) {
      if (Math.hypot(dots[i].x - anchor.x, dots[i].y - anchor.y) <
          Math.hypot(dots[parent].x - anchor.x, dots[parent].y - anchor.y)) parent = i;
    }

    for (let step = 0; step < steps; step += 1) {
      const progress = (step + 1) / steps;
      const distance = 185 + (reach - 185) * progress;
      const theta = angle + bend * progress * progress + (rand() - 0.5) * 0.06;
      const index = dots.length;
      dots.push({
        id: `branch-${branch}-${step}`,
        x: Math.cos(theta) * distance,
        y: Math.sin(theta) * distance,
        r: step === 1 ? 3.7 + rand() : 1.8 + rand() * 1.1,
      });
      links.push([parent, index]);

      // Small lateral forks thin out towards the tips; leave open space between arms.
      const forks = step < 2 ? 2 : rand() < 0.6 ? 1 : 0;
      for (let fork = 0; fork < forks; fork += 1) {
        const side = fork === 0 ? -1 : 1;
        const forkAngle = theta + side * (0.055 + rand() * 0.075);
        const forkRadius = Math.min(320, distance + (rand() - 0.3) * 28);
        const leaf = dots.length;
        dots.push({
          id: `branch-${branch}-${step}-leaf-${fork}`,
          x: Math.cos(forkAngle) * forkRadius,
          y: Math.sin(forkAngle) * forkRadius,
          r: 1.6 + rand(),
        });
        links.push([index, leaf]);
        if (step === 0) links.push([parent, leaf]);
      }
      parent = index;
    }
  }
  return { dots, links };
}

function placeDisk(rand: () => number, count: number, cx: number, cy: number, radius: number) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const nodes: Dot[] = [];
  for (let i = 0; i < count; i += 1) {
    const dist = Math.min(radius, radius * Math.pow((i + 0.5) / count, 0.62) * (0.88 + rand() * 0.24));
    const theta = i * golden + (rand() - 0.5) * 0.7;
    const hub = rand() < 0.045;
    nodes.push({
      x: cx + Math.cos(theta) * dist + (rand() - 0.5) * 16,
      y: cy + Math.sin(theta) * dist + (rand() - 0.5) * 16,
      r: hub ? 4.5 + rand() * 1.5 : 1.7 + rand() * 1.1,
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
    const spokes = 18;
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
