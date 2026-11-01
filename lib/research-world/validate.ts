import type { ResearchWorldDemo } from "./types";

export function validateWorld(world: ResearchWorldDemo) {
  const nodeIds = new Set<string>();
  for (const node of world.nodes) {
    if (nodeIds.has(node.id)) throw new Error(`Duplicate node ${node.id}`);
    nodeIds.add(node.id);
  }

  const linkIds = new Set<string>();
  for (const link of world.links) {
    if (linkIds.has(link.id)) throw new Error(`Duplicate link ${link.id}`);
    linkIds.add(link.id);
    if (!nodeIds.has(link.source) || !nodeIds.has(link.target)) {
      throw new Error(`Link ${link.id} points at a missing node`);
    }
    if (!link.isMock && link.evidenceRefs.length === 0) {
      throw new Error(`Link ${link.id} needs evidence`);
    }
  }

  for (const region of world.regions) {
    if (!region.pathD.trim()) throw new Error(`Region ${region.id} is missing a path`);
  }

  const regionIds = new Set(world.regions.map((region) => region.id));
  for (const chapter of world.chapters) {
    for (const id of chapter.focusNodeIds ?? []) {
      if (!nodeIds.has(id)) throw new Error(`Chapter ${chapter.id} cites missing node ${id}`);
    }
    for (const id of chapter.focusLinkIds ?? []) {
      if (!linkIds.has(id)) throw new Error(`Chapter ${chapter.id} cites missing link ${id}`);
    }
    for (const id of chapter.regionIds ?? []) {
      if (!regionIds.has(id)) throw new Error(`Chapter ${chapter.id} cites missing region ${id}`);
    }
  }
}
