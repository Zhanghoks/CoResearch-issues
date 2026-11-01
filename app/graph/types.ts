export type NodeType = "domain" | "problem" | "paper" | "method" | "evaluation" | "gap" | "idea";

export type GraphNode = {
  id: string;
  label: string;
  type: NodeType;
  communities: string[];
  tier: "core" | "context";
  candidate: boolean;
  frontier: boolean;
  idea: boolean;
  x: number;
  y: number;
};

export type GraphEdge = {
  id: string;
  source: string;
  target: string;
  type: string;
  tier: "story" | "context";
};

export type GraphWorld = {
  seed: number;
  communities: { id: string; label: string }[];
  nodes: GraphNode[];
  edges: GraphEdge[];
  paths: Record<string, string[]>;
  markers: {
    idea: string;
    intentFrom: string;
    intentTo: string;
    frontier: string[];
    candidateMethod: string;
    candidateGap: string;
    transfer: string;
    review: string;
  };
};
