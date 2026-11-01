import { mkdirSync, writeFileSync } from "node:fs";
import { forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY } from "d3-force";

const NODE_COUNT = 500;
const EDGE_COUNT = 1000;

const communities = [
  { id: "video", label: "视频生成" },
  { id: "identity", label: "身份一致性" },
  { id: "temporal", label: "时序" },
  { id: "multimodal", label: "多模态" },
  { id: "representation", label: "表征学习" },
];

const anchors = {
  video: [0, 0],
  identity: [210, 30],
  temporal: [30, 190],
  multimodal: [-30, -170],
  representation: [70, -50],
};

const core = [
  ["n-domain-video", "视频生成", "domain", ["video", "multimodal"], 0, 0],
  ["n-problem-consistency", "生成一致性", "problem", ["video", "temporal"], 120, 36],
  ["n-problem-identity", "跨镜头身份一致性", "problem", ["video", "identity"], 250, 8],
  ["n-problem-flicker", "时序闪烁", "problem", ["video", "temporal"], 80, 170],
  ["n-problem-multimodal", "多模态条件", "problem", ["video", "multimodal"], 20, -150],
  ["n-paper-id-a", "身份保持工作", "paper", ["identity", "video"], 340, 70],
  ["n-paper-id-b", "后续身份工作", "paper", ["identity"], 430, 24],
  ["n-paper-flicker", "时序一致性工作", "paper", ["temporal", "video"], 170, 240],
  ["n-paper-mm", "条件控制工作", "paper", ["multimodal", "video"], -50, -240],
  ["n-method-ref", "参考注意力", "method", ["identity", "representation"], 370, -36],
  ["n-eval-id", "身份相似度评价", "evaluation", ["identity"], 480, -24],
  ["n-gap-long", "长程身份缺口", "gap", ["identity"], 530, 48, { candidate: true }],
  ["n-idea", "当前 Idea", "idea", ["identity", "video"], 290, 64, { idea: true }],
  ["n-repr-anchor", "表征学习", "domain", ["representation", "identity"], 90, -70],
  ["n-mechanism", "可迁移表征", "method", ["representation", "identity"], 200, -110, { candidate: true }],
  ["n-method-candidate", "候选身份记忆", "method", ["identity", "representation"], 410, 120, { candidate: true }],
  ["n-frontier-a", "局部边界证据", "evaluation", ["identity"], 510, 120, { frontier: true }],
  ["n-frontier-b", "相邻边界工作", "paper", ["identity", "temporal"], 575, 78, { frontier: true }],
  ["n-frontier-c", "边界上的开放问题", "problem", ["identity", "video"], 545, 168, { frontier: true }],
];

const storyEdges = [
  ["n-domain-video", "n-problem-consistency", "scopes"],
  ["n-problem-consistency", "n-problem-identity", "narrows"],
  ["n-problem-consistency", "n-problem-flicker", "narrows"],
  ["n-problem-consistency", "n-problem-multimodal", "narrows"],
  ["n-paper-id-a", "n-problem-identity", "addresses"],
  ["n-paper-id-b", "n-paper-id-a", "cites"],
  ["n-paper-id-a", "n-method-ref", "uses"],
  ["n-eval-id", "n-method-ref", "evaluates"],
  ["n-gap-long", "n-method-ref", "limits"],
  ["n-idea", "n-problem-identity", "located"],
  ["n-idea", "n-gap-long", "intent"],
  ["n-mechanism", "n-repr-anchor", "originates"],
  ["n-mechanism", "n-method-ref", "transfers"],
  ["n-method-candidate", "n-idea", "proposes"],
  ["n-method-candidate", "n-gap-long", "intent"],
  ["n-paper-flicker", "n-problem-flicker", "addresses"],
  ["n-paper-mm", "n-problem-multimodal", "addresses"],
  ["n-frontier-a", "n-gap-long", "bounds"],
  ["n-frontier-b", "n-frontier-a", "bounds"],
  ["n-frontier-c", "n-problem-identity", "bounds"],
  ["n-repr-anchor", "n-domain-video", "overlaps"],
];

const paths = {
  "explore-identity": ["n-domain-video", "n-problem-consistency", "n-problem-identity"],
  "explore-flicker": ["n-domain-video", "n-problem-consistency", "n-problem-flicker"],
  "explore-multimodal": ["n-domain-video", "n-problem-consistency", "n-problem-multimodal"],
  history: ["n-paper-id-b", "n-paper-id-a", "n-method-ref", "n-eval-id"],
  transfer: ["n-repr-anchor", "n-mechanism", "n-method-ref"],
  gap: ["n-method-ref", "n-gap-long", "n-frontier-a"],
  iteration: ["n-idea", "n-method-candidate"],
};

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randn(rng) {
  let u = 0;
  let v = 0;
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(Math.PI * 2 * v);
}

function anchorFor(ids) {
  let x = 0;
  let y = 0;
  for (const id of ids) {
    x += anchors[id][0];
    y += anchors[id][1];
  }
  return [x / ids.length, y / ids.length];
}

const rng = mulberry32(20261101);
const fillerTypes = ["paper", "problem", "method", "evaluation"];
const nodes = core.map(([id, label, type, membership, x, y, flags]) => ({
  id,
  label,
  type,
  communities: membership,
  tier: "core",
  candidate: Boolean(flags?.candidate),
  frontier: Boolean(flags?.frontier),
  idea: Boolean(flags?.idea),
  x,
  y,
  anchorX: anchorFor(membership)[0],
  anchorY: anchorFor(membership)[1],
}));

const fillerCount = NODE_COUNT - nodes.length;
for (let i = 0; i < fillerCount; i += 1) {
  const primary = communities[i % communities.length].id;
  const membership = [primary];
  if (rng() < 0.38) membership.push(communities[(i + 1) % communities.length].id);
  const [ax, ay] = anchorFor(membership);
  const id = `n-ctx-${String(i + 1).padStart(3, "0")}`;
  nodes.push({
    id,
    label: id,
    type: fillerTypes[i % fillerTypes.length],
    communities: membership,
    tier: "context",
    candidate: false,
    frontier: false,
    idea: false,
    x: ax + randn(rng) * 78,
    y: ay + randn(rng) * 78,
    anchorX: ax,
    anchorY: ay,
  });
}

const edges = storyEdges.map(([source, target, type], index) => ({
  id: `e-story-${String(index + 1).padStart(2, "0")}`,
  source,
  target,
  type,
  tier: "story",
}));

const seen = new Set(edges.map((edge) => [edge.source, edge.target].sort().join("|")));
const byCommunity = new Map(communities.map((item) => [item.id, []]));
for (const node of nodes) {
  if (node.tier === "context") byCommunity.get(node.communities[0]).push(node.id);
}
for (const list of byCommunity.values()) list.sort();

let cursor = 0;
while (edges.length < EDGE_COUNT) {
  let added = false;
  for (const list of byCommunity.values()) {
    if (list.length < 2 || edges.length >= EDGE_COUNT) continue;
    const offset = 1 + (cursor % 3);
    for (let index = 0; index < list.length && edges.length < EDGE_COUNT; index += 1) {
      const source = list[index];
      const target = list[(index + offset) % list.length];
      const key = [source, target].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({
        id: `e-ctx-${String(edges.length).padStart(4, "0")}`,
        source,
        target,
        type: "related",
        tier: "context",
      });
      added = true;
    }
  }
  cursor += 1;
  if (!added) break;
}

if (nodes.length !== NODE_COUNT || edges.length !== EDGE_COUNT) {
  throw new Error(`Expected ${NODE_COUNT} nodes and ${EDGE_COUNT} edges, got ${nodes.length} and ${edges.length}`);
}

for (const node of nodes) {
  if (node.tier === "core") {
    node.fx = node.x;
    node.fy = node.y;
  }
}

const linkData = edges.map((edge) => ({ source: edge.source, target: edge.target }));
const simulation = forceSimulation(nodes)
  .force("charge", forceManyBody().strength(-16))
  .force("link", forceLink(linkData).id((node) => node.id).distance(36).strength(0.12))
  .force("x", forceX((node) => node.anchorX).strength(0.14))
  .force("y", forceY((node) => node.anchorY).strength(0.14))
  .force("collide", forceCollide((node) => (node.tier === "core" ? 22 : 7)))
  .stop();

for (let tick = 0; tick < 320; tick += 1) simulation.tick();

const round = (value) => Math.round(value * 100) / 100;
for (const node of nodes) {
  if (!Number.isFinite(node.x) || !Number.isFinite(node.y)) {
    throw new Error(`Unstable coordinate for ${node.id}`);
  }
}

const world = {
  seed: 20261101,
  communities,
  nodes: nodes.map((node) => ({
    id: node.id,
    label: node.label,
    type: node.type,
    communities: node.communities,
    tier: node.tier,
    candidate: node.candidate,
    frontier: node.frontier,
    idea: node.idea,
    x: round(node.x),
    y: round(node.y),
  })),
  edges,
  paths,
  markers: {
    idea: "n-idea",
    intentFrom: "n-idea",
    intentTo: "n-gap-long",
    frontier: ["n-frontier-a", "n-frontier-b", "n-frontier-c"],
    candidateMethod: "n-method-candidate",
    candidateGap: "n-gap-long",
    transfer: "n-mechanism",
    review: "n-eval-id",
  },
};

const target = new URL("../app/graph/world.json", import.meta.url);
mkdirSync(new URL(".", target), { recursive: true });
writeFileSync(target, JSON.stringify(world));
console.log(`wrote ${world.nodes.length} nodes and ${world.edges.length} edges`);
