# Space | Research World 中的 Literature Space 与 Idea Space

> **Research World 是 CoResearch 的统一研究世界；Literature Space 描述前人研究，Idea Space 描述用户在其中的研究位置、判断和探索路径。** 两者相互关联，让研究者能够从已有知识出发，定位方向、逼近 Frontier，并尝试设计新的 Method。

[返回社区 README](../README.md) · [Explore](actions/01-explore.md) · [Deep Dive / Deep Research](actions/02-deep-dive-deep-research.md)

> **文档性质**：这是一份面向社区的产品心智模型与目标交互说明，不是数据库迁移方案，也不代表完整的知识图谱、Gap Finder 或 Innovator 已在公开版本上线。文中示例节点、连线和研究结论均为概念示意；真实科学判断必须以实际文献证据为准。

## 1. 为什么需要 Research World？

传统的论文管理工具通常以“文件和标签”组织资料；一次性的 Deep Research 往往产生一份报告，随后研究过程又回到新的会话。

CoResearch 想要的是另一个连续过程：

**用户进入前人研究构成的世界 → 找到感兴趣的具体研究位置 → 理解周围的研究关系 → 识别可能的知识边界 → 寻找方法上的突破机会 → 继续修正自己的研究构想。**

它不是将每篇论文简单挂到一棵分类树上，也不是在用户每次提问时都生成一个互不关联的新 Idea。已有研究的知识结构与用户的探索轨迹，需要能够相互参照，并随证据持续演化。

因此，**Research World 同时包含 Literature Space 与 Idea Space**。它是一个概念上的研究环境，不要求物理上必须有一个“存放所有人类知识”的单体数据库。

~~~text
+------------------------------------------------------------------------------------------------+
| RESEARCH WORLD  [one conceptual research environment]                                          |
|                                                                                                |
|   Prior evidence meets user-specific research decisions                                        |
|                                                                                                |
|   +----------------------------------------+     +----------------------------------------+    |
|   | LITERATURE SPACE  [prior research]     |     | IDEA SPACE  [user research path]       |    |
|   |                                        |     |                                        |    |
|   | Domains / subfields / directions       |     | Focus / stable Idea                    |    |
|   | Papers / PaperCards / evidence         | <-> | State: formulation / knowledge         |    |
|   | Problems / methods / mechanisms        |     | Agenda / next Intent                   |    |
|   | Evaluation / results / limitations     |     | Candidate methods / proposals          |    |
|   | Versioned relations and coverage       |     | Revision and action history            |    |
|   +----------------------------------------+     +----------------------------------------+    |
|                                                                                                |
|   Explore: locate a direction    Deep research: test a boundary                                |
|   Frontier: evidence-based hypothesis, not a proven fact                                       |
|   Innovation: grounded gap + transferable mechanism -> proposal                                |
+------------------------------------------------------------------------------------------------+
~~~

上图中的双向关联主要意味着：文献证据影响用户的研究认识；用户新的 Intent 又决定接下来需要在 Literature Space 中检索、核查或扩展哪些内容。

## 2. 三个层次：Research World、两个知识空间、产品界面

这里的 **Space** 容易与现有产品里的 Canvas Space 混淆，必须分开理解。

| 名称 | 它是什么 | 不是什么 |
| --- | --- | --- |
| **Research World** | 统一的研究语义世界，包含 Literature Space 与 Idea Space | 一个额外的 UI 页面或宣称完整收录全人类科研的数据库 |
| **Literature Space** | 在可访问研究范围内持续积累的论文知识、证据、关系与覆盖情况 | 只按标题分类的 PDF 文件夹 |
| **Idea Space** | 用户围绕一个或多个 Idea 形成的研究认识、候选方法、Intent 与修订轨迹 | 文献空间的拷贝或单份自动覆盖的聊天摘要 |
| **Product Space / Canvas** | 项目内用来摆放 Paper、Direction、Idea、Note 等节点的可视化工作区域 | Literature 或 Idea 知识的独立真相来源 |
| **Conversation** | 用户向 Research Lead 提问、下达 Research Action、讨论和审阅结果的交互入口 | 自动拥有所有相关项目的私有研究记录 |
| **Research Scope** | 数据访问、写入和复用的权限边界 | Research World 中的学科分类 |
| **Workspace** | Agent 执行命令及使用文件的运行目录（工程术语） | 前述研究知识空间 |

**Canvas 是一种投影，Conversation 是一种入口，Research World 是研究的语义组织方式。** 它们不应分别维护互相矛盾的论文事实或当前 Idea 正文。

## 3. Literature Space：前人研究的知识图谱式表示

### 3.1 它要回答什么？

Literature Space 不只是回答“有哪些论文”，还要回答：

- 研究领域如何分化成 Subfield 和 Direction？不同方向有什么交叉？
- 某个 **Problem** 已被哪些论文研究？
- 哪些 **Method / Mechanism** 被用来解决它？它们如何比较或改进？
- 哪些 **Benchmark / Metric / Protocol** 被用于评估？结果的可比范围是什么？
- 哪些研究报告了 **Limitation、失败条件或未解决问题**？
- 这些关系是否足以提出可复查的 **Gap / Frontier Candidate**？

知识单位既包括 Paper，也包括论文内部提取的研究问题、方法、评价、结果、限制，以及由多份证据支持的关系。

### 3.2 它的连接不是只有 Citation

下面是**虚构的关系示意**，不是关于 Agent Memory 真实文献的事实断言：

~~~text
[DOMAIN: Agent Systems]
          |
          v
[SUBFIELD: Memory] ------ related_to ------> [SUBFIELD: Planning]
          |
          v
[DIRECTION: Memory Updating]
          |
          +----- studies ----> [PROBLEM: outdated/conflicting memory]
          |                                 |
          +----- includes ----> [PAPER A]   |  analogous challenge
          |                      |          |             |
          |                      v          v             v
          |                  [METHOD A]  [CHALLENGE]  [OTHER DOMAIN]
          |                      |                        |
          |                      v                        v
          |                [EVALUATION A]           [MECHANISM B]
          |                      |                        |
          |                      v                        |
          +----------------> [LIMITATION L] <--- transfer candidate
                                    |
                                    v
                            [GAP HYPOTHESIS]
                                    |
                                    v
                            [FRONTIER CANDIDATE]
~~~

相较于 Paper A 引用 Paper B，CoResearch 更关心为什么它们有研究上的关系。例如：

| 关系（示意语义） | 含义 |
| --- | --- |
| Direction — contains / overlaps — Direction | 研究方向之间有层级或交叉 |
| Paper — studies — Problem | 论文研究了哪个问题 |
| Paper — proposes — Method | 论文提出了何种方法 |
| Method — addresses — Challenge | 方法试图解决什么困难 |
| Method — evaluated_on — Benchmark | 方法在什么条件下被评价 |
| Result — reported_in — Paper | 某项结果来自何篇文献 |
| Method — limited_by — Limitation | 哪些条件限制了方法有效性 |
| Method B — extends / contrasts — Method A | 两种方法有哪些改进或差异 |
| Challenge A — analogous_to — Challenge B | 两个领域是否存在可迁移的相似困难 |

这些是**知识图谱的目标关系语义**，不代表已有相同名称的数据库边类型或接口。图谱可以逐步构建，不必在第一版把所有关系结构化。

### 3.3 PaperCard、Evidence 与版本

**PaperCard** 是论文研究内容的结构化知识表示，而非 Canvas 上的小卡片外观。它的内容包括元数据、Problem、Challenge、Method、Evaluation、Results、Limitations 和原文证据等。

重要边界：

1. 论文内容必须来自实际可读取的材料；全文、部分全文、摘要级阅读需要明确区分。
2. 一条关系可能是“论文报告”“Agent 推断”或“用户假设”，不能混为同一种确定事实。
3. 来源应能固定到具体论文、Card 版本、字段及证据锚点。
4. PaperCard 重新阅读生成新版本后，旧引用仍保持指向旧版本；相关判断可以标记需要复查。
5. 检索未命中、来源失败和文献尚未覆盖，不代表研究问题不存在。

**Research World 是增量可探索的图，而不是预先构建完成的全域知识图谱。** 未检索区域、阅读深度与来源限制应始终可见。

## 4. Idea Space：用户在知识世界中的探索轨迹

Idea Space 不是“再保存一份文献”。它描述：**对这个用户而言，当前研究焦点在哪里、已有证据意味着什么、下一步应该研究什么。**

### 4.1 Idea、Idea State、Agenda 与 Intent

| 对象 | 核心问题 | 更新方式 |
| --- | --- | --- |
| **Idea** | 用户持续发展的研究主体是什么？ | 保持稳定身份，不因问题收窄就自动新建 |
| **Formulation** | 当前 Problem、Hypothesis、Approach 等构想写成什么？ | 沿用 Living Idea 12 Sections；核心修改由用户确认 |
| **Epistemic State** | 目前知道什么、存在哪些冲突、哪些证据不足？ | 通过研究结果解释和受控 State Transition 更新 |
| **Agenda** | 尚有什么值得研究？哪些问题更紧迫？ | 保存候选研究问题及优先级理由 |
| **Research Intent** | 根据当前 State，下一步最值得减少什么不确定性？ | 关联特定 State Revision、用户目标和完成标准 |
| **Research Action** | 本轮实际获授权研究什么？ | 由用户发起的有界任务，而非自动执行的建议 |
| **Idea Revision** | 研究认识或核心构想改变了什么、为什么？ | 保存版本、原因、证据与用户决定 |

从用户心智模型看，**Idea State 就是当前对话或项目中的“研究进展与位置”**。但在正式版本化数据中，应明确它属于哪个 Idea：同一 Research Scope 可以包含多个 Idea，同一 Conversation 可以显式选定当前 Idea。不能把整个项目的所有 Idea 强行合并成一个 State，也不能把聊天记录本身当作权威 State。

普通学术问答也可以只收集私有材料，而**不必隐式创建一个长期 Idea**。

### 4.2 探索轨迹不是一条不可逆直线

用户可以从 Agent Memory 开始，先探索 Retrieval，再转到 Updating，也可以在新的证据出现后返回早期 Direction、修改假设或放弃不合适的 Method。

状态历史需要保留：

- 当前位置和已确认的 Research Focus；
- 曾经探索过的 Direction 以及当时选择或放弃的理由；
- 支持与挑战原有判断的 Finding / Assessment；
- 尚未解决的 Unknown、备选方案与研究 Agenda；
- 已提交的 Revision、未审阅的 Proposal，以及下一步 Intent。

用户不必看到“State、Intent、Revision”这些内部词汇。界面可以表达成：**当前构想 / 已知与未知 / 下一步探索 / 研究历史**。

## 5. 两个 Space 之间如何建立关系？

最重要的不是简单地将 Paper 添加到 Idea 节点下面，而是保存“**这份研究证据为什么与当前 Idea 有关系**”。

~~~text
LITERATURE SPACE                   IDEA SPACE
+----------------------+           +------------------------+
| Paper P @ version v3 |           | Idea I @ revision r8   |
| Problem / Method     |           | Focus / Hypothesis     |
| Result / Limitation  |           | Findings / Unknowns    |
| Evidence anchor A    |           | Agenda / Next Intent   |
+----------------------+           +------------------------+
           |                                    ^
           | fixed reference + relation role    |
           +------------------------------------+
                          |
              +------------------------+
              | "supports / challenges"|
              | "baseline / inspiration"|
              | "reported vs inferred" |
              +------------------------+

New PaperCard version v4 DOES NOT replace citations pinned to v3.
New evidence can trigger a review mark; core Idea text changes by
member edit or accepted Proposal, not by silent overwriting.
~~~

例如，同一篇 PaperCard 可以同时作为：

- Direction A 的代表论文；
- Direction B 的对照方法；
- 某个 Idea Hypothesis 的支持证据；
- 另一个候选 Method 的 Baseline；
- 一次跨领域 Innovator 搜索的机制启发。

因此，**论文事实与“论文对某个 Idea 的意义”要分开存储**。

概念上的关联记录至少应说明：

| 关联信息 | 作用 |
| --- | --- |
| Source reference | 关联哪篇论文、哪个 Card 版本及什么证据位置 |
| Target reference | 关联哪个 Direction、Idea Section、Finding 或候选 Method |
| Relation role | 支持、挑战、比较、Baseline、启发等 |
| Relevance reason | 为什么这份材料对目标重要 |
| Interpretation origin | 论文作者陈述、Agent 推断还是用户假设 |
| Review status | 是否因新增证据或来源版本变化需要重新判断 |

这些关联需要可追溯、可撤回错误解释，但不能因此删除不可变的原始证据和历史。

**Literature Space 记录论文报告了什么；Idea Space 记录这些报告对当前研究意味着什么。** 由 Research Lead 解释影响，Host 执行权限、版本与正式提交校验。

## 6. Space 如何承载完整研究 Workflow？

~~~text
[User Seed / Paper / Existing Idea]
                 |
                 v
         [EXPLORE: navigation]
                 |
        +--------+---------+
        |                  |
        v                  v
[Literature Space]   [Idea State: current position]
  papers + directions       |
        |                   v
        |          [Next Intent suggestion]
        |                   |
        +----- (user starts Action) ----+
                            |
                            v
               [DEEP DIVE / DEEP RESEARCH]
                            |
                  +---------+---------+
                  |                   |
                  v                   v
          [Evidence / history]   [Gap / Frontier]
                  |                   |
                  |            +------+------+
                  |            |             |
                  |            v             v
                  |      [Gap Finder]   [Innovator]
                  |            |             |
                  |            +------+------+
                  |                   |
                  |                   v
                  |          [Method candidate]
                  |                   |
                  +---------+---------+
                            |
                            v
                   [Review / Interpret]
                            |
                +-----------+-----------+
                |                       |
                v                       v
         [Literature update]     [Idea State revision
                                  or pending Proposal]
                                        |
                                        v
                                [Next Research Intent]
                                        |
                              (user authorizes next run)
~~~

### 6.1 Explore：定位

用户以 Seed、论文或已有 Idea 进入，Explore 根据目标与现有文献知识比较 Domain / Subfield / Direction。

- **Literature Space 更新**：搜索记录、实际阅读的 PaperCards、有依据的 Direction Group 和关系。
- **Idea Space 更新**：用户当前认识、候选定位和 Agenda；不自动更改已确认的核心 Focus。
- **下一步**：用户可以继续沿方向 Explore，也可以进入 Deep Dive 或 Deep Research。

### 6.2 Deep Dive / Deep Research：逼近 Frontier

进入明确的细分方向后，系统关注历史发展、Method、Evaluation、Limitations、最近邻研究及反证。

- **Deep Dive** 偏向解决一个窄问题：具体机制、近邻方法、评价比较、假设支持或挑战。
- **Deep Research** 偏向方向级研究综合：发展脉络、方法地图、评价范围与阶段性报告。
- **Literature Space 更新**：更多可核验证据、比较关系、阅读覆盖与候选 Frontier 的依据。
- **Idea Space 更新**：有依据的 Finding、Assessment、Unknown 和下一步 Agenda；核心 Idea 文字如需改动，则提出 Proposal。

### 6.3 Gap Finder × Innovator：寻找候选突破路径

Frontier Exploration 以 [IdeaScientist](https://arxiv.org/abs/2610.04074) 为启发，包含两个互补方向：

**Gap Finder（纵向）**：在目标 Direction 内核查最接近的已有 Method，找到具体的机制缺陷、限制与反证，判断 Gap 是否真的存在。

**Innovator（横向）**：在其他 Domain 或 Direction 中寻找解决类似 Challenge 的机制，解释可迁移的核心 Intuition、迁移前提与失败风险。

两者产出经 Method Synthesis 与 Reviewer 审查，形成**候选 Method / Research Proposal**。这不是已被实验证实的突破。

> Gap Finder、Innovator、Reviewer 是目标协作机制，不代表公开版本里已具备这些独立 Agent。当前产品可以先借助 Research Lead、Searcher 和受限分析子任务逐步实现对应能力。

### 6.4 Idea Iteration：更新认识并决定下一步

每轮研究应回答：

1. 新材料实际证明或报告了什么？
2. 与当前 Idea 的已知判断有何关系？
3. 哪些判断需要改变、需要复查，或有依据地维持？
4. 是否需要用户审阅 Hypothesis、Approach、Focus 等核心 Section 修改？
5. 哪个剩余 Unknown 最值得成为下一 Research Intent？

**Intent 是下一次探索的倾向和理由，不是自动执行权限。** 用户没有明确开始新的 Action 时，研究在当前轮结束。没有新信息的合法研究可以留下“维持现状及原因”的回执，而不是虚构一个 Revision。

## 7. 用户实际在哪个界面看到 Space？

| 用户看到的入口 | 应看到什么 | 数据一致性要求 |
| --- | --- | --- |
| **Project / Space / Canvas** | Paper、Direction、Idea、研究成果之间的可视化联系 | Canvas 节点只是正式对象的投影；移动、展开、删除布局节点不改写研究事实 |
| **Conversation** | 对 Research Lead 的消息、目标 Chip、引用、研究过程与结果回执 | 发起研究 Action 的入口；不根据 UI 选择偷偷启动任务 |
| **Paper details / Literature view** | PaperCard、实际阅读深度、固定证据和相关研究关系 | 论文内容和来源版本与其他界面一致 |
| **Idea details** | 当前 Living Idea、研究认识、Agenda、Next Intent、Proposal 和历史 | 同一个 ideaId、同一个正式 State head |
| **Tasks / Outputs** | 一轮研究做了什么、哪些材料已保存、Report 和待完成工作 | 执行状态与知识状态分开；结果没提交就不能宣称已更新 Idea |

产品层的 Space 可以是用户放置和组织知识的地方；**它不应变成第二套平行维护的论文库或 Idea 数据库**。跨 Conversation 和 Canvas 打开相同 Idea，应显示一致的版本和证据引用。

### 7.1 多个 Idea、共享材料与权限

一个合法 Research Scope 内可以有多个 Idea，并在有权限时复用同一篇 PaperCard；**每个 Idea 的 State、Intent 和 Revision 分开维护**。

一个被分享的 Canvas 并不自动授权他人读取创建者的私有 Idea State、反馈、Conversation 历史或本地 Workspace 文件。权限检查属于 Research Scope / Host 层，不由可视化连线决定。

当用户从 Conversation 切换到另一 Space 或另一个 Idea，已经开始的 Research Action 仍然属于启动时的原目标；用户界面的切换不能转移正在执行的任务或其结果归属。

## 8. 一个从 Space 出发的示例

下面是**虚构的研究路径**，仅用于说明对象与空间如何协作，不代表已验证的 Agent Memory 学术事实。

用户输入：“我对 LLM Agent 的长期记忆感兴趣。”

1. **Explore** 在 Literature Space 中收集并组织相关研究方向，用户沿 Memory → Updating → Conflict-aware Updating 逐层深入。
2. **Idea Space** 记录该用户为什么关注这个分支、已经了解什么、仍不知道什么，并推荐下一步研究问题。
3. **Deep Research** 建立该 Direction 的方法演进与评价地图；Deep Dive 进一步比较一个具体机制是否已被前人解决。
4. **Gap Finder** 尝试核实“某种现有冲突处理机制存在特定失败条件”这一候选 Gap；有反证则纠正它。
5. **Innovator** 从其他研究方向寻找处理相似 Challenge 的机制，分析是否具备迁移条件。
6. **Reviewer / Method Synthesis** 组织候选方案、最接近的 Prior Art、假设的突破点及可证伪评价设计。
7. **Idea Space** 保留新发现、尚未解决的问题及候选 Method；核心 Hypothesis 或 Approach 的正式改变等待用户确认。
8. **Next Intent** 指出下一次最值得验证的具体问题，但不会未经用户授权自动开始新研究。

整条路径中，前人知识的图谱逐渐扩展，用户的 Idea State 也持续更新。**这就是 CoResearch 所说的在 Research World 中探索并寻求 Frontier Breakthrough。**

## 9. 必须守住的设计原则

1. **双空间属于一个 World**：不要把 Research World 错画成与 Literature Space、Idea Space 并列的第三个平行空间。
2. **图谱不等于文件夹**：核心是 Problem、Method、Evaluation、Limitation 与跨论文、跨领域的可解释关系。
3. **知识不是无条件确定的**：论文报告、Agent 推断、用户假设、未覆盖区域和 Frontier Candidate 必须区分。
4. **Idea 是用户研究的连续对象**：同一个 Idea 可以收窄 Focus、修订 Hypothesis 和更换方法，不因为每轮探索而自动新建。
5. **State 和 Intent 不等于任务状态机**：State 表示研究认识，Intent 表示下一步倾向，Action 才承载执行授权。
6. **一篇论文多处关联，但不重复制造知识副本**：论文事实保存在 Literature Space，针对 Idea 的解释保存在关系与 Idea State 中。
7. **前端只投影正式结果**：Conversation 与 Canvas 不各自持有不一致的当前研究事实。
8. **候选突破必须经得起核验**：提出 Gap 或 Method 不是已经突破 Frontier；需要近邻工作核查与后续实验。
9. **持续研究不等于无限后台执行**：每轮有明确权限、终止条件和结果；下一轮由用户主动授权。

---

**延伸阅读**：[Explore：研究方向导航](actions/01-explore.md) · [Deep Dive / Deep Research：研究边界与方法创新](actions/02-deep-dive-deep-research.md)

**社区讨论**：[提出关于 Research World、Literature Space 或 Idea Space 的建议](https://github.com/Zhanghoks/CoResearch-Community/issues/new)。
