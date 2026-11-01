import type { ResearchWorldDemo } from "./types";
import { validateWorld } from "./validate";
import worldData from "./world-demo.json";

export const world = worldData as ResearchWorldDemo;

validateWorld(world);

export const nodeById = new Map(world.nodes.map((node) => [node.id, node]));

export const exploreRoute = ["dir-video-gen", "problem-consistency", "dir-consistency", "dir-multishot", "idea-current"]
  .map((id) => nodeById.get(id))
  .filter((node) => node != null);
