# Deep Dive / Deep Research | 逼近 Research Frontier 与寻找突破方法

> **从一个已定位的研究方向，重建前人研究脉络、确认能力边界，再从具体 Gap 和跨领域机制中提出可验证的候选方法。**

[返回社区主页](../../README.md) | [上一步：Explore](01-explore.md)

> **文档性质**：本文件描述两种面向用户的 Research Actions，以及我们希望逐步构建的 Frontier Exploration 能力。Deep Dive / Deep Research 是已有研究任务名称；Gap Finder、Innovator、Reviewer、Method Synthesis 是目标中的协作机制，不代表这些角色已在现有版本中作为独立 Agent 全部实现。

## 1. 在 Research World 中解决什么问题？

当 **Explore** 帮助用户定位某个细分 Direction 后，下一步不应该只是“再找更多论文”。用户真正需要理解的是：

- **History**：当前研究问题为何出现？哪些工作构成关键发展节点？
- **Prior Art**：最接近的已有方法是什么？分别依赖什么机制？
- **Evaluation**：前人实际证明了什么？在哪些数据、实验协议和条件下有效？
- **Limitation**：方法有哪些失败情况、成本、前提条件或覆盖不足？
- **Frontier / Margin**：依据当前掌握的证据，该方向的知识与能力边界在哪里？
- **Innovation Opportunity**：有哪些具体、可信、值得尝试的突破机会？能否迁移其他领域的方法？

这些问题发生在同一个 **Research World** 中：

~~~text
+------------------------------------------------------------------------+
| RESEARCH WORLD                                                         |
|                                                                        |
| +-------------------------------+   +--------------------------------+ |
| | LITERATURE SPACE              |   | IDEA SPACE                     | |
| | Prior work                    |<->| Current Focus                  | |
| | Problem -> Method             |   | Known / Unknown                | |
| | Evaluation -> Results         |   | Hypothesis / Candidate Method  | |
| | Limitations / Connections     |   | Intent / Revision History      | |
| +-------------------------------+   +--------------------------------+ |
|                |                              |                          |
|                +---------------+--------------+                          |
|                                v                                         |
|                   [DEEP DIVE / DEEP RESEARCH]                            |
|                                |                                         |
|                                v                                         |
|                       [GROUNDED FRONTIER]                               |
|                                |                                         |
|                      +---------+---------+                               |
|                      |                   |                               |
|                      v                   v                               |
|                 [GAP FINDER]        [INNOVATOR]                           |
|                      |                   |                               |
|                      +---------+---------+                               |
|                                |                                         |
|                                v                                         |
|                      [METHOD SYNTHESIS]                                 |
|                                |                                         |
|                                v                                         |
|                    [REVIEW -> TESTABLE IDEA]                             |
|                                |                                         |
|                                v                                         |
|                 [IDEA STATE + NEXT RESEARCH INTENT]                      |
+------------------------------------------------------------------------+
~~~

**Frontier 不能仅根据“搜索不到某论文”推断。** 这里的边界是对已阅读证据、最近邻工作、实验可比性与缺失覆盖作出的、可被后续研究修正的判断。

## 2. Deep Dive 与 Deep Research 是两个不同的 Action

二者可以互相跳转，不是必须依次通过的关卡，也不是旧版 Fast / Medium / Deep 研究模式。

| | **Deep Dive** | **Deep Research** |
| --- | --- | --- |
| 核心问题 | **一个具体机制、假设或 Gap 究竟成立吗？** | **这个方向从何而来、发展到哪里、下一步值得研究什么？** |
| 研究尺度 | 窄、聚焦；围绕一个关键问题 | 较宽；覆盖一组相关问题、方法及历史 |
| 主要工作 | 近邻方法比较、反例、机制分析、评价条件核查 | 历史演进、代表工作、方法路线、实验与当前边界综合 |
| 主要产物 | 有证据的对照、Assessment、待复查假设与后续问题 | 有范围说明的 Report、方法地图、Timeline 与 Frontier 候选 |
| 常见后续 | 深入某个 Gap、验证假设、尝试方法迁移 | 选一个关键 Gap 再 Deep Dive、进行创新探索 |
| 不应该做 | 自动把用户 Hypothesis 判为真；为凑流程扩展到整个领域 | 宣称穷尽所有论文；按发表时间臆造学术继承关系 |

### 2.1 Deep Dive：把一个问题研究透

用户可以从 Direction、Paper、Report、Idea 或一条具体 Unknown 发起 Deep Dive。例如：

> “记忆冲突检测能否解决长期 Agent Memory 的更新问题？请比较与我的假设最接近的方法，以及有力反例。”

一次 Deep Dive 的目标是**把一个模糊判断变成有证据条件的分析**。

~~~text
[Target question / hypothesis]
             |
             v
     [Closest prior work]
             |
             v
     [Method comparison]
     - input and assumptions
     - core mechanism
     - evaluation and cost
     - failure and limitations
             |
             v
     [Evidence assessment]
     SUPPORTS / CHALLENGES
     MIXED / INSUFFICIENT
             |
             v
     [Gap or remaining Unknown]
             |
             v
[Idea State update / Proposal / Next Intent]
~~~

Deep Dive 的成功**不等于支持用户的原假设**。发现已有方法做过同样的事情、证据相互矛盾，或者当前还无法验证，也可以是重要研究进展。

### 2.2 Deep Research：形成方向级研究地图

用户也可以明确提出：

> “系统梳理 Memory Updating 的研究历史、主要技术路线、Benchmark 与尚未解决的研究边界。”

Deep Research 关注方向级的研究综合：

~~~text
[Selected research Direction]
             |
             v
   [History + current work]
             |
             v
   [Evidence-backed timeline]
             |
             v
   [Method and evaluation map]
             |
             v
   [Limitations and disputed claims]
             |
             v
   [Frontier candidates + coverage]
             |
             v
 [Research Report + next questions]
~~~

输出的报告应区分 **论文报告了什么**、**Agent 根据多篇研究推断了什么**、**尚不能确认什么**。历史时间线中的“先后发生”也不必然代表“技术继承”；需要有具体论文依据才能建立改进或影响关系。

一个有边界说明的阶段性报告，比笼统声称“覆盖全部前沿”的综述更有研究价值。

## 3. 如何从已有研究推导 Frontier？

Frontier 是对一组已有研究及其限制的综合判断，不能简单等同于单篇论文的 Limitations 或 Future Work。

建议把关键知识关系组织为：

~~~text
[Research Problem]
        |
        v
[Challenge / Assumptions]
        |
        v
[Prior Methods] -------> [Evaluation Protocol]
        |                          |
        v                          v
[Mechanisms] ----------> [Results / Evidence]
        |                          |
        +-------------+------------+
                      |
                      v
           [Observed Limitations]
                      |
                      v
           [Candidate Research Gap]
                      |
                      v
      [Frontier: grounded + uncertain]
~~~

一个 **Frontier Candidate** 应尽可能回答：

| 内容 | 必须说明的问题 |
| --- | --- |
| Target Problem | 要突破的具体研究问题是什么？ |
| Current Boundary | 现有方法的能力边界及适用条件是什么？ |
| Closest Methods | 哪些是最接近的已有工作，而非只有主题相似？ |
| Evidence | 支撑判断的论文版本、实验结果和原文依据是什么？ |
| Limitation Type | 是方法机制缺陷、评价缺口、数据覆盖不足，还是研究结论冲突？ |
| Uncertainty | 哪些研究没有检索或没有读到？什么可能推翻这个 Gap？ |
| Opportunity | 若边界成立，可以向哪里突破？ |

这是建议的**研究结果表示方式**，不意味着当前产品已有一个叫 FrontierCandidate 的正式数据库类型。

### Limitation、Gap 和 Frontier 的区别

- **Limitation**：某项方法的局限，可来自作者报告、实验观察或经标注的推断。
- **Gap**：已有研究尚未充分解决的具体问题，必须经过最近邻工作与反证核查。
- **Frontier**：根据可获得证据综合识别出的研究边界，可能同时包含已证实的能力限制和仍有争议的候选缺口。
- **Breakthrough**：新的方法在明确条件下通过实验超越已有边界；提出候选机制本身不等于取得突破。

## 4. Frontier Exploration：Gap Finder × Innovator

这里借鉴 [IdeaScientist](https://arxiv.org/abs/2610.04074) 的多 Agent 科研构想生成思路，但将其扩展到 CoResearch 的长期 Research World 导航之中。

### 4.1 Gap Finder：纵向寻找目标领域内的缺陷

**目标**：不是收集“未来值得研究什么”的漂亮句子，而是比较实际最接近的 Method，发现具体研究缺陷及其成立条件。

它应重点寻找：

- 已有方法在哪个机制、假设或场景下失效？
- 是单篇研究的局限，还是多条技术路线共同存在的限制？
- 是否已有近期工作解决了这个问题？
- 是否存在相反证据、不同实验协议，或尚未阅读的关键论文？
- 如果要检验 Gap，还缺哪个最关键的实验或证据？

**交付**：带依据的 Grounded Gap，以及明确的反证检查与未解决事项。

### 4.2 Innovator：横向寻找跨领域的可迁移机制

**目标**：从 Research World 的其他方向寻找解决类似 Challenge 的方法，而不局限于同一主题或相同关键词。

~~~text
[TARGET DOMAIN]                            [SOURCE DOMAIN]
  Problem P                                  Problem Q
      |                                          |
      v                                          v
  Challenge C <------ analogous challenge ------+
      |                                          |
      v                                          v
  Existing Method A                         Mechanism B
      |                                          |
      v                                          v
  Limitation L  <----- proposed transfer --- [Core Intuition]
      |                                          |
      +----------------------+-------------------+
                             |
                             v
                   [CANDIDATE METHOD]
                             |
                             v
                [Transfer preconditions]
                [Potential failure modes]
                [Validation requirements]
~~~

一个方法可以在来源领域有效，却未必能迁移到目标领域。Innovator 必须解释**为什么相似、迁移什么、需要改变什么、可能在哪里失败**，而不只是推荐组合名称。

### 4.3 Method Synthesis 与 Reviewer

当 Gap Finder 找到有依据的缺陷，Innovator 找到可能可迁移的机制时，才进入候选方法构造：

~~~text
      [GROUNDED GAP]       [TRANSFERABLE MECHANISM]
             |                      |
             +-----------+----------+
                         |
                         v
                  [METHOD SYNTHESIS]
                  - problem and assumptions
                  - adapted mechanism
                  - proposed workflow
                  - expected contribution
                         |
                         v
                     [REVIEWER]
                  - closest prior art
                  - novelty risk
                  - feasibility
                  - alternative explanations
                  - falsifiable evaluation
                         |
            +------------+--------------+
            |                           |
            v                           v
    [INSUFFICIENT EVIDENCE]      [CANDIDATE PROPOSAL]
            |                           |
            v                           v
      [NEXT INTENT]          [USER REVIEW / IDEA REVISION]
~~~

Reviewer 的工作不仅是挑错，还要判断下一步应该**验证 Gap、替换迁移机制、完善 Evaluation，还是保留原研究判断**。所有创新结论都是候选，不能在没有实验时声称实现了 Frontier Breakthrough。

> **关于 Agent 实现**：Gap Finder、Innovator、Reviewer 是目标研究能力的角色划分。具体工程实现可以先通过现有 Research Lead、Searcher 和受限分析子任务组合实现；未来是否独立成多个长期存在的 Agent，应由实验质量、时延和上下文隔离收益决定，而非仅由概念图决定。

## 5. 一轮 Action 如何运行？

用户发起的是 **Deep Dive 或 Deep Research 任务**，不是“运行五个 Agent”的技术命令。

1. **确定当前目标**：读取用户指定 Direction、问题、参考材料和相关 Idea State，明确一轮应回答什么。
2. **复用已有研究**：先检查已保存的 PaperCards、Report、Timeline 和相关证据；仅针对缺口补查。
3. **寻找并读取证据**：按需并行检索相近方法、反例、实验、历史转折及新的工作；无法阅读的材料要明确标记。
4. **执行适合当前动作的分析**：Deep Dive 侧重具体机制对照；Deep Research 侧重方向综合；有明确创新需求时进一步分析 Gap 和跨领域机制。
5. **审查结果**：区分论文原话、交叉推断、用户假设与仍有争议的结论；对于无法回答的问题留下 Unknown。
6. **解释对 Idea 的影响**：由 Research Lead 判断哪些认识可以增加、哪些核心判断需要复查、哪些 Section 应维持或提 Proposal。
7. **交付并停止**：保存合规的材料与阶段成果，展示下一步 Intent；**不自动连续启动新 Action**。

~~~text
[User-authorized Research Action]
                |
                v
[Read State / Goal / Pinned References]
                |
                v
        [Reuse available evidence]
           |                |
        sufficient         missing
           |                |
           |                v
           |          [Find / Read]
           |                |
           +--------+-------+
                    |
                    v
        [Comparative analysis]
        Deep Dive / Deep Research
                    |
                    v
       [Frontier / Gap assessment]
                    |
           [If justified by task]
                    |
                    v
      [Transfer / Method candidate]
                    |
                    v
       [Lead interpretation]
                    |
                    v
 [Evidence + State update + Proposal]
                    |
                    v
       [Next Intent suggestion]
                    |
             (user decides)
~~~

不是每轮都要完整执行到 Method Synthesis。若当前证据还不足以确认 Frontier，合理交付可以是“当前边界判断尚不充分，建议下一轮检验某项关键条件”。

## 6. Idea State、Intent 与用户决策

研究不会自动改写用户已经确认的核心 Hypothesis、Approach 或 Focus。

| 研究中发生的事 | 正确的 State 行为 |
| --- | --- |
| 发现可定位的新论文 | 保存/复用 Literature Space 的 PaperCard |
| 新证据支持或挑战已有判断 | 记录有来源的 Finding / Assessment，保留冲突与历史 |
| 发现关键证据不足 | 加入 Unknown / Agenda |
| 提出候选 Gap 或 Method | 保存有证据和不确定性说明的研究结果；不当成已验证突破 |
| 需要修改核心 Idea Section | Lead 提出 Proposal，成员 Keep 后才更新正文 |
| 用户想沿新方向深入研究 | 生成/选择下一 Intent，经过新的用户授权才执行 |
| 没有实质新认识 | 记录核查范围和“维持判断”的原因，不制造伪 Revision |

请把 **“接受报告”** 与 **“接受 Hypothesis 修改”** 区分开：报告作为研究材料可以保存，核心研究构想的变化是另一项明确决定。

## 7. 面向用户的结果交付

### Deep Dive 的理想结果

围绕一个具体问题，显示：

- **Comparison**：最接近方法的机制、前提、成本、实验条件和限制。
- **Assessment**：哪些判断得到支持、受到挑战，或由于证据不充分而不能确定。
- **Grounded Gap**：目前可成立的具体缺口及其反例。
- **Idea Impact**：应改、应复查、维持的当前构想 Sections。
- **Next Intent**：下一次最有价值的验证或方法探索问题。

### Deep Research 的理想结果

围绕一个较完整方向，显示：

- **Research Scope & Coverage**：本轮覆盖范围与未覆盖内容。
- **Research History**：有来源的 Timeline、关键转折和方法演进。
- **Method Landscape**：主流路线、代表论文、Baseline 与评价协议。
- **Frontier Map**：已有能力边界、争议问题、可能的 Gap。
- **Method Opportunities**：在有足够证据时，给出可能迁移和整合的机制。
- **Next Research Questions**：下一轮可以明确选择的具体研究问题。

**以上均为目标结果结构**，不能把未验证的概念图、历史关系或机制迁移自动发布为事实。

## 8. 一个贯穿三种动作的例子

以下全部是**假设性说明**，不是关于 Agent Memory 研究前沿的真实结论。

**Explore**

用户从 “LLM Agent Memory” 进入，逐步选择 “Memory Updating” 下的 “Conflict-aware Updating” 方向。

**Deep Research**

系统调查这一方向的历史、已有方法和评价，发现论文之间的实验协议存在差异，现有证据还不足以断言谁在冲突场景下最有效。

**Deep Dive**

用户收窄问题：“某些方法是否依赖静态冲突阈值？这种机制是否存在可以复现的失败条件？” 系统比较最近邻方法和实验，确认或否定这一候选 Gap。

**Innovator / Method Synthesis**

如果 Gap 获得足够依据，进一步检索其他方向的状态变化检测、置信度估计或版本控制机制，研究这些机制在记忆更新任务中的可迁移性。

**Reviewer / Next Intent**

系统检查类似方法是否已经存在、迁移前提是否成立，并建议用户设计消融实验与更严格的 Baseline 对照。用户决定是否将该方案纳入当前 Idea。

真正的突破必须通过后续验证，不在提出候选方法时宣告成功。

## 9. 失败、边界与验收

对于这两种 Action，产品至少应该保证：

1. **Deep Dive 与 Deep Research 的产物明显不同**：窄问题证据对照 vs. 方向级研究报告，而不是同一个回答换标题。
2. **结论可追溯**：引用能定位到真实论文及已保存版本；摘要级阅读不冒充全文。
3. **时间线有证据**：论文先后发表不自动等于影响或改进关系。
4. **Gap 可反驳**：没有搜到论文不算证明；最近邻和可能的反例需要检查。
5. **机制迁移可解释**：指出来源、相似挑战、变更条件和潜在失败模式。
6. **核心 Idea 受保护**：挑战用户假设可以更新 Assessment；正文改动需 Proposal / 用户确认。
7. **结果允许部分完成**：来源失败、证据不足、未完成分析都如实展示，不伪称全面覆盖。
8. **长期记录可复用**：Report、PaperCards、Idea Revision 与上一轮 Intent 可以作为下一轮基础。
9. **单轮授权有界**：新的探索问题只产生下一 Intent 建议；不会绕过用户授权继续运行。
10. **候选创新不是实验结论**：Idea Proposal 和 Frontier Breakthrough 在状态与措辞上必须明确区分。

---

**相关文档**：[Explore：如何在 Research World 中逐层定位研究方向](01-explore.md) · [CoResearch Community](../../README.md)

**相关研究**：[IdeaScientist](https://arxiv.org/abs/2610.04074) — 作为 Gap Finding 与跨领域研究机制迁移的概念参考；本文是面向 CoResearch 用户工作流的设计映射，并非该论文实现的逐项复现。
