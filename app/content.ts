export const issuesUrl = "https://github.com/Zhanghoks/CoResearch-Community/issues";
export const newIssueUrl = "https://github.com/Zhanghoks/CoResearch-Community/issues/new";
export const spaceDocUrl =
  "https://github.com/Zhanghoks/CoResearch-Community/blob/main/docs/space.md";

export const steps = [
  {
    id: "explore",
    index: "01",
    title: "Explore",
    summary: "从兴趣定位到细分方向",
    body: "从一个宽泛的兴趣、一篇论文或已有想法开始。沿着 Domain、Subfield、Research Direction 比较候选方向，先找到适合自己的位置。",
  },
  {
    id: "dive",
    index: "02",
    title: "Deep Dive",
    summary: "看清脉络、方法与局限",
    body: "进入细分方向后，梳理问题如何被提出、方法如何演进、实验能否比较，以及现有结论停在哪里。",
  },
  {
    id: "frontier",
    index: "03",
    title: "Frontier",
    summary: "在证据边界上寻找突破",
    body: "Gap Finder 检查目标领域里的具体缺陷，Innovator 寻找其他领域可迁移的机制。候选方案仍需近邻工作核查。",
  },
  {
    id: "revision",
    index: "04",
    title: "Revision",
    summary: "由你确认下一步",
    body: "研究带来的判断写入 Idea State。下一步 Intent 只是建议，关键取舍和核心修改由研究者决定。",
  },
] as const;

export const spaces = [
  {
    id: "literature",
    title: "Literature Space",
    question: "前人研究了什么？",
    body: "领域、论文、问题、方法、实验、结果和局限连成可追溯的证据关系。一篇论文可以关联多个问题，一个方法也可以跨领域迁移。",
  },
  {
    id: "idea",
    title: "Idea Space",
    question: "你正在研究什么？",
    body: "记录当前兴趣、已知与未知、研究判断和修订历史。Idea 可以引用文献证据，新的探索也会修正已经掌握的知识。",
  },
  {
    id: "loop",
    title: "Research Loop",
    question: "下一步做什么？",
    body: "从 Seed 到 Explore，再到 Deep Research 和候选方法。每一轮都保留理由、证据和用户确认，而不是覆盖掉历史。",
  },
] as const;

export const roles = [
  {
    title: "Research Lead",
    body: "结合当前研究状态选择问题、协调任务，并解释结果。",
  },
  {
    title: "Gap Finder",
    body: "在目标领域内部检查最相关的工作，找出方法缺陷和证据不足。",
  },
  {
    title: "Innovator",
    body: "到相邻问题里寻找相似挑战，带回可能迁移的机制和研究直觉。",
  },
  {
    title: "Reviewer",
    body: "检查候选思路是否已被覆盖，以及新颖性、可行性和迁移前提。",
  },
] as const;

export const principles = [
  "先帮助研究者找到合适的方向，再决定如何深化。",
  "重要判断尽量连到真实论文、实验条件和可追溯证据。",
  "不只指出 Gap，也探索可能的机制与跨领域迁移。",
  "区分论文陈述、Agent 推断和用户假设。",
  "保留 State、Intent、反馈和修订历史。",
  "Agent 整理信息，研究者决定目标并验证贡献。",
] as const;

export const faqs = [
  {
    q: "CoResearch 是什么？",
    a: "它是一个面向科研探索和 Idea 发展的多智能体研究协作设想。目标是帮助研究者从模糊兴趣出发，定位细分方向，理解前人做到了哪里，再设计有依据、可验证的下一步。",
  },
  {
    q: "页面上的能力现在都能用吗？",
    a: "不能直接这么理解。这里介绍的是持续演进的产品愿景和工作流。涉及 Gap Finder、Innovator 等角色的内容是目标机制，不代表公开版本已经完整实现。",
  },
  {
    q: "Research World 是一个完整的论文库吗？",
    a: "不是。它应随着检索、阅读和研究反馈逐步长出来。没有检索到，不能直接当成前人没有研究过。",
  },
  {
    q: "Agent 会替我决定研究方向吗？",
    a: "不会。Agent 可以协助检索、分析和提出候选方案。研究方向的关键取舍，以及核心 Idea 的修改，由研究者掌控。下一步 Intent 需要你授权后才会变成实际研究动作。",
  },
  {
    q: "如何反馈问题或建议？",
    a: "在 CoResearch-Community 仓库提交 Issue。反馈 Bug 时写清复现步骤；提建议时描述真实科研场景。分享材料前请去掉密钥、账号和私人研究数据。",
  },
] as const;
