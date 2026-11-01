import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = path.resolve(import.meta.dirname, "..");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "coresearch-story-"));
try {
  for (const filename of ["types", "mock-world", "story", "scene"]) {
    const result = ts.transpileModule(fs.readFileSync(path.join(root, `app/graph-svg/${filename}.ts`), "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
      reportDiagnostics: true,
    });
    assert.equal((result.diagnostics ?? []).filter((d) => d.category === ts.DiagnosticCategory.Error).length, 0, `${filename} syntax`);
    fs.writeFileSync(path.join(tmp, `${filename}.js`), result.outputText);
  }
  const { world, nodeAt } = require(path.join(tmp, "mock-world.js"));
  const { chapters, sampleStory, cameraTransform } = require(path.join(tmp, "story.js"));
  const { createSceneRenderer } = require(path.join(tmp, "scene.js"));
  const ids = new Set(world.nodes.map((n) => n.id));
  assert.equal(ids.size, world.nodes.length);
  for (const n of world.nodes) assert.ok(Number.isFinite(n.x) && Number.isFinite(n.y) && n.radius > 0);
  for (const e of world.edges) { assert.ok(ids.has(e.source) && ids.has(e.target)); assert.equal(e.verified, false); }
  for (const route of [world.routes.explore, world.routes.lineage]) {
    for (let i = 1; i < route.length; i++) assert.ok(world.edges.some((e) => e.source === route[i - 1] && e.target === route[i]), "semantic path follows defined edges");
  }
  assert.equal(new Set(chapters.map((c) => c.id)).size, chapters.length);
  const samples = new Map();
  for (let i = 0; i <= 240; i++) {
    const p = i / 20, state = sampleStory(p);
    assert.ok(Object.values(state.pose).every(Number.isFinite));
    assert.ok(state.active >= 0 && state.active < chapters.length);
    samples.set(p, JSON.stringify(state));
  }
  for (const [p, state] of [...samples].reverse()) assert.equal(JSON.stringify(sampleStory(p)), state, "reverse seeking is deterministic");
  for (let i = 0; i < chapters.length; i++) {
    assert.deepEqual(sampleStory(i).pose, chapters[i].pose);
    assert.equal(sampleStory(i).active, i);
  }
  assert.equal(sampleStory(NaN).active, 0);
  assert.equal(sampleStory(-5).active, 0);
  assert.equal(sampleStory(1000).active, chapters.length - 1);
  for (let i = 0; i < 10; i++) assert.equal(sampleStory(i).pose.gap, 0, "gap must not pre-exist discovery");
  for (let i = 0; i < 12; i++) assert.equal(sampleStory(i).pose.candidate, 0, "candidate must not pre-exist synthesis");
  assert.equal(sampleStory(7).pose.markerX, nodeAt("subject").x);
  assert.equal(sampleStory(8).pose.markerX, nodeAt("motion").x);
  assert.ok(cameraTransform(sampleStory(12).pose).startsWith("translate("));
  const make = (dataset = {}) => ({ dataset, style: {}, attributes: {}, setAttribute(k, v) { this.attributes[k] = v; } });
  const camera = make(), marker = make(), bar = make();
  const layers = ["base", "ring", "idea", "gap", "candidate"].map((name) => make({ rwLayer: name }));
  const draws = ["lineage", "explore", "transfer", "candidate"].map((name) => make({ rwDraw: name }));
  const stops = Array.from({ length: 5 }, (_, i) => make({ rwStop: String(i) }));
  const render = createSceneRenderer({
    querySelector: (q) => q.includes("camera") ? camera : q.includes("marker") ? marker : bar,
    querySelectorAll: (q) => q.includes("layer") ? layers : q.includes("draw") ? draws : stops,
  });
  render(12, chapters.length);
  assert.equal(layers.at(-1).style.visibility, "visible");
  render(0, chapters.length);
  assert.equal(layers.at(-1).style.visibility, "hidden");
  assert.equal(layers.find((e) => e.dataset.rwLayer === "idea").style.visibility, "hidden");
  assert.equal(draws.at(-1).style.strokeDashoffset, "1");
  assert.equal(bar.style.transform, "scaleX(0)");
  console.log(`PASS: ${world.nodes.length} nodes, ${world.edges.length} edges, ${chapters.length} chapters; graph references, semantic paths, finite poses, reverse seeks, phase visibility and DOM resets.`);
} finally { fs.rmSync(tmp, { recursive: true, force: true }); }
