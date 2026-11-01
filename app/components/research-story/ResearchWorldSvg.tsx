import { exploreRoute, nodeById, world } from "../../../lib/research-world/story";

const regionFill = {
  core: "#DBEAF8",
  frontier: "#EEE7F9",
  margin: "#FFF3D8",
} as const;

const beyondIds = new Set(["beyond-q1", "beyond-q2", "beyond-q3"]);
const nodeKindLabel = {
  paper: "论文",
  problem: "研究问题",
  method: "研究方法",
  direction: "研究方向",
  benchmark: "评价基准",
  idea: "当前 Idea",
  gap_candidate: "候选缺口",
} as const;

export function ResearchWorldSvg() {
  const papers = world.nodes.filter((node) => node.kind === "paper");
  const circles = world.nodes.filter((node) => node.kind !== "paper");
  const route = exploreRoute.map((node) => `${node.x} ${node.y}`).join(" L ");
  const idea = nodeById.get("idea-current");
  const gap = nodeById.get("gap-long");
  const candidate = nodeById.get("method-candidate");

  return (
    <svg
      className="world-svg block aspect-[3/2] h-auto w-full lg:max-h-[540px]"
      viewBox="0 0 1536 1024"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="research-world-svg-title research-world-svg-desc"
    >
      <title id="research-world-svg-title">研究世界示意图</title>
      <desc id="research-world-svg-desc">
        演示用的文献知识图谱。核心区、研究前沿和边缘区域互相重叠。虚线边界只表示当前证据覆盖，不代表无人研究。
      </desc>
      <defs>
        <symbol id="paper-glyph" viewBox="0 0 28 36">
          <rect width="28" height="36" rx="3" fill="#fff" stroke="#73849B" strokeWidth="1.4" />
          <path d="M6 10h16M6 16h16M6 22h10" stroke="#C5D0DC" strokeWidth="1.3" />
        </symbol>
        <marker id="intent-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8" fill="none" stroke="#3578C9" strokeWidth="1.2" />
        </marker>
      </defs>

      <g data-camera="">
        <g data-layer="world-base">
          <ellipse cx="768" cy="512" rx="620" ry="360" fill="#F7FAFC" stroke="#C5D0DC" strokeWidth="1.5" />
        </g>

        <g data-layer="regions">
          {world.regions.map((region) => (
            <path
              key={region.id}
              id={region.id}
              d={region.pathD}
              fill={regionFill[region.kind]}
              fillOpacity="0.28"
            />
          ))}
        </g>

        <g data-layer="edges" stroke="#8A97A6" strokeWidth="1.25" fill="none" opacity="0.42">
          {world.links.map((link) => {
            const source = nodeById.get(link.source);
            const target = nodeById.get(link.target);
            if (!source || !target) return null;
            return <line key={link.id} id={link.id} x1={source.x} y1={source.y} x2={target.x} y2={target.y} />;
          })}
        </g>

        <g data-layer="papers">
          {papers.map((paper) => (
            <use
              key={paper.id}
              id={paper.id}
              href="#paper-glyph"
              x={paper.x - 14}
              y={paper.y - 18}
              width="28"
              height="36"
            >
              <title>论文节点（演示）</title>
            </use>
          ))}
        </g>

        <g data-layer="nodes">
          {circles.map((node) => {
            const hub = node.kind === "direction";
            const ideaNode = node.kind === "idea";
            const gapNode = node.kind === "gap_candidate" || node.verified === false;
            const beyond = beyondIds.has(node.id);
            const radius = ideaNode ? 8 : hub ? 7.5 : 4.2;
            return (
              <circle
                key={node.id}
                id={node.id}
                data-node={node.id}
                cx={node.x}
                cy={node.y}
                r={radius}
                fill={ideaNode ? "#E9AA29" : "#fff"}
                stroke={gapNode && !ideaNode ? "#8D74B8" : ideaNode ? "#C48A16" : "#73849B"}
                strokeWidth={ideaNode || hub ? 2 : 1.7}
                strokeDasharray={gapNode && !ideaNode ? "3 2.5" : undefined}
                opacity={beyond ? 0.45 : 1}
              >
                <title>{`${node.shortLabel ?? nodeKindLabel[node.kind]}${gapNode ? "（演示，尚未验证）" : "（演示节点）"}`}</title>
              </circle>
            );
          })}
        </g>

        <g data-layer="routes">
          <path
            data-route="explore"
            d={`M ${route}`}
            fill="none"
            stroke="#3578C9"
            strokeWidth="2.4"
            opacity="0"
          />
        </g>

        <g data-layer="frontier" fill="none" stroke="#8D74B8" strokeWidth="2" strokeDasharray="7 6">
          <path d="M1080 240C1160 380 1100 560 1200 780" />
        </g>

        <g data-layer="idea">
          {idea && gap ? (
            <line
              data-intent="next"
              x1={idea.x + 10}
              y1={idea.y}
              x2={gap.x - 12}
              y2={gap.y}
              stroke="#3578C9"
              strokeWidth="1.8"
              strokeDasharray="6 5"
              markerEnd="url(#intent-arrow)"
            />
          ) : null}
        </g>

        <g data-layer="labels" fill="#5C6B7A" fontSize="30" fontFamily="Albert Sans, PingFang SC, sans-serif" paintOrder="stroke" stroke="#FAFBFC" strokeWidth="6" strokeLinejoin="round">
          <text x="470" y="230" textAnchor="middle">
            核心区域
          </text>
          <text x="820" y="190" textAnchor="middle">
            研究前沿
          </text>
          <text x="1160" y="230" textAnchor="middle">
            边缘区域
          </text>
          <text x="1250" y="300" textAnchor="middle" fontSize="26">
            研究边界
          </text>
          <text x="1250" y="334" textAnchor="middle" fontSize="20">
            基于当前证据覆盖
          </text>
          <text x="1280" y="760" textAnchor="middle">
            未知空间
          </text>
          {idea && (
            <text x={idea.x} y={idea.y + 40} textAnchor="middle" fontSize="26" fill="#956710">
              当前 Idea
            </text>
          )}
          {gap && (
            <text x={gap.x + 20} y={gap.y - 18} fontSize="24" fill="#785C9F">
              候选缺口 · 未验证
            </text>
          )}
          {candidate && (
            <text x={candidate.x + 24} y={candidate.y + 33} fontSize="24" fill="#785C9F">
              候选方法 · 未验证
            </text>
          )}
        </g>
      </g>
    </svg>
  );
}
