export type NodeKind =
  | "paper"
  | "problem"
  | "method"
  | "direction"
  | "benchmark"
  | "idea"
  | "gap_candidate";

export type LinkRelation =
  | "cites"
  | "studies"
  | "proposes"
  | "extends"
  | "compares"
  | "evaluates"
  | "supports"
  | "challenges"
  | "inspires"
  | "related";

export type GraphNode = {
  id: string;
  kind: NodeKind;
  x: number;
  y: number;
  shortLabel?: string;
  communityIds: string[];
  evidenceRefs?: string[];
  verified?: boolean;
};

export type GraphLink = {
  id: string;
  source: string;
  target: string;
  relation: LinkRelation;
  evidenceRefs: string[];
  isMock?: boolean;
};

export type GraphRegion = {
  id: string;
  label: string;
  kind: "core" | "frontier" | "margin";
  pathD: string;
  scopeId?: string;
};

export type StoryChapter = {
  id: string;
  title: string;
  narration: string;
  camera: { focusX: number; focusY: number; scale: number };
  focusNodeIds?: string[];
  focusLinkIds?: string[];
  regionIds?: string[];
  routeIds?: string[];
  showIdeaMarker?: boolean;
  showFrontier?: boolean;
};

export type ResearchWorldDemo = {
  nodes: GraphNode[];
  links: GraphLink[];
  regions: GraphRegion[];
  chapters: StoryChapter[];
};
