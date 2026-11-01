# Explore | 在 Research World 中定位研究方向

> **从模糊研究兴趣到有证据支撑的细分 Direction。** Explore 的主要任务是帮助研究者找到适合继续深入的研究位置，而不是提前生成 Hypothesis、Method 或完整的论文 Proposal。

[返回社区主页](../../README.md) | [继续阅读：Deep Dive / Deep Research](02-deep-dive-deep-research.md)

> **文档性质**：本文件描述 CoResearch 的用户动作与目标产品行为。它结合现有研究任务机制与长期产品愿景；涉及未来研究知识图谱、细分方向导航和 Idea State 的完整闭环，不能理解为已全部公开上线。

## 1. Explore 在 Research World 中的位置

Research World 同时包含 **Literature Space**（前人研究及其关系）和 **Idea Space**（用户自己的研究位置、判断、状态与探索轨迹）。

Explore 在这两个 Space 之间工作：

- **Literature Space** 提供领域、子领域、研究问题、相关论文、已有方法、评估结果和研究限制。
- **Idea Space** 提供用户的研究目标、偏好、已知/未知、当前 Focus 和探索历史。
- **Explore** 将二者结合，组织有证据支持的候选 Directions，并引导用户向某个细分方向继续定位。

~~~text
+--------------------------------------------------------------------+
| RESEARCH WORLD                                                     |
|                                                                    |
|  +------------------------+      +-----------------------------+    |
|  | LITERATURE SPACE       |      | IDEA SPACE                  |    |
|  | Domain / Subfield      |<---->| User goal / Idea State      |    |
|  | Problem / Method       |      | Unknowns / Next Intent     |    |
|  | Paper / Evidence       |      | Exploration history        |    |
|  +------------------------+      +-----------------------------+    |
|               |                              |                     |
|               +--------------+---------------+                     |
|                              v                                     |
|                      +----------------+                            |
|                      | EXPLORE        |                            |
|                      | Find + Compare |                            |
|                      +----------------+                            |
|                              |                                     |
|                              v                                     |
|                 +--------------------------+                       |
|                 | EVIDENCE-BASED DIRECTIONS|                       |
|                 +--------------------------+                       |
|                              |                                     |
|                   choose direction / continue                      |
|                              v                                     |
|                 [MORE SPECIFIC DIRECTION]                           |
+--------------------------------------------------------------------+
~~~

## 2. 用户什么时候使用 Explore？

Explore 支持不同的起点，而不强制用户先完成 Idea 表单：

| 起点 | 用户可能说什么 | 期望结果 |
| --- | --- | --- |
| 宽泛兴趣 / Seed | “我对 AI Agent Memory 感兴趣。” | 找到主要子方向，理解差异与代表性证据 |
| 已知领域 | “Memory Updating 下面还有哪些研究问题？” | 在指定方向下再展开一层 |
| 已有 Paper | “这篇论文所属方向还有哪些不同路线？” | 从已知材料定位相关方向并补充上下文 |
| 已有 Idea | “我的方案最接近哪些研究分支？” | 对照已有 Idea 的 Focus 与文献，找出候选定位 |
| 原方向不合适 | “我想换个切入点。” | 保留旧路径，另起一轮对比，不静默覆盖原 Focus |

**普通论文问答** 可以使用研究材料，不必自动建立长期 Idea。只有用户明确发起持续研究，才建立或关联相应 Idea State。

## 3. 用户的实际操作

### 3.1 发起一次 Explore

用户输入一个 Seed，或从 Conversation / Canvas 的 Direction、Paper、Idea 入口选择 **Explore**。

Research Task 属于当前消息，可以包含一个目标对象以及明确附加的参考材料；**查看节点、点击论文、展开方向本身不会自动开始研究**。用户发送后，Action 才开始执行。

有关键范围歧义时，Lead 询问必要决定；已有目标清楚时直接开始，不额外要求预算卡、阶段计划或固定论文篇数。

### 3.2 本轮只展开一个层次

首次面对宽题时，系统整理主要研究方向；用户选定一个 Direction 再次 Explore 时，只沿该 Direction 的一个层次继续展开。

~~~text
[User Seed: AI Agents]
         |
         v
[Explore: broad directions]
         |
         +----> Tool Use
         |
         +----> Planning
         |
         +----> Memory
                    |
                    | User selects Memory
                    v
            [Explore: Memory]
                    |
                    +----> Retrieval
                    |
                    +----> Updating
                    |
                    +----> Sharing
                               |
                               | User selects Sharing
                               v
                       [Next Explore]
                       - specific problems
                       - methods and gaps
                       - representative papers
~~~

**图是说明导航层级的示例，并非真实领域检索结论。** Research World 的实际知识关系不只是树：不同 Directions 还可以共享论文、问题、方法和评估；层级结构只是 Explore 对用户呈现的一条导航路径。

同一轮结果可以只有一个方向，也可以没有充分依据支持进一步拆分。**不为凑数量强行生成方向**。当前仓库的 Explore 机制允许一轮 1–10 个有依据的 Directions，并保留父子组与历史版本；再次拆分会保存新的一轮，而不是修改旧结果。

### 3.3 比较候选方向

Explore 的输出不应只有标签和论文数量。每个候选 Direction 至少应回答：

| 字段 | 用户需要知道的内容 |
| --- | --- |
| Research Problem | 这个方向主要想解决什么？ |
| Methods / Approaches | 已有哪些主要方法或机制？ |
| Representative Papers | 哪些真实论文构成依据？实际读到了什么深度？ |
| Challenges / Limitations | 当前材料揭示了什么难点或条件限制？ |
| Distinction | 它与同一轮其他 Directions 的关键差异是什么？ |
| Relevance | 为什么它可能符合用户当前兴趣、目标或 Idea？ |
| Unknowns | 还有哪些问题需要 Deep Dive 或进一步 Explore？ |

方向之间可以有方法、问题、评估或跨领域连接；**Direction 是带证据的研究组织结果，不是独立的科学事实，也不是新建 Idea 的指令**。

### 3.4 用户决定往哪里走

用户可以执行不同操作：

- **继续 Explore**：选择一个 Direction 后再细分一层，保留当前层与历史路径。
- **Deep Dive**：已经有明确问题，准备比较其机制、最接近方法与反例。
- **Deep Research**：希望把一个方向的发展历史、路线、评估与 Frontier 综合成阶段性报告。
- **暂不选择 / 返回其他分支**：保留探索记录；不强行“完成方向选择”。
- **明确修改当前 Research Focus**：作为独立的用户决定，不能因为点击方向卡就自动采纳。

进入详情或展示下一步建议都不等于已经授权新的 Research Action。

## 4. Research Lead 与内部材料处理

Explore 是面向用户的 Action，而不是固定的多阶段流水线。

~~~text
[User request + current context]
                |
                v
      [Research Lead]
      - read goal and bounds
      - choose current uncertainty
      - identify next Intent
                |
                v
      [Existing evidence enough?]
          |                |
         yes               no
          |                |
          |                v
          |          [Searcher(s)]
          |          - find papers
          |          - read / reuse
          |          - report coverage
          |                |
          +----------------+
                |
                v
      [Organise Directions]
      - compare evidence
      - distinguish methods
      - note missing coverage
                |
                v
      [Lead interprets for user]
                |
                v
      [Direction Group + findings]
                |
                v
      [Next Intent suggestion]
                |
          (stop; no auto-run)
~~~

面向用户应呈现研究问题、来源、方向差异和材料覆盖，而不是让用户处理底层工具日志。

材料层尽可能复用已收集的 PaperCards；需要新材料时再进行检索与阅读。若全文不可达，必须标注摘要级或未读状态，不凭标题和搜索摘要推断完整方法、结果或局限。

## 5. Explore 对 Idea State / Intent 的作用

Explore 同时可以影响 **Literature Space** 和 **Idea Space**，但不同对象的写入边界不同。

| 研究结果 | 适合存在哪里 | 是否需要用户确认？ |
| --- | --- | --- |
| 查到并真实读过的论文 | Literature Space / PaperCard | 依合法材料写权限保存 |
| 有依据的 Direction Group | 研究成果 / Direction | 作为候选结果保存 |
| 对现有研究的新增理解 | Idea State / Epistemic（存在关联 Idea 时） | 在合法授权内记录 |
| 新发现的 Unknown / 下一步问题 | Idea State / Agenda | 可记录候选，不自动执行 |
| 建议下一轮展开某个方向 | Research Intent | 是建议，不是授权 |
| 修改既有核心 Focus / Hypothesis | Living Idea Formulation | Agent 提 Proposal；用户确认后生效 |

**重要区分**：Explore 找到了一个有价值的方向，并不表示用户已经正式改变 Research Focus。即使用户当前没有关联长期 Idea，也可以得到方向与论文研究结果，而不会隐式创建一个新的长期研究主体。

若已经关联 Idea，有证据的新认识、未知和候选定位可以在 Explore 执行过程中写入同一个 Idea State，不必等本轮回执才第一次出现。正在检索或阅读，先作为执行进度展示。只有认识、未知或判断实际变化时，才形成正式 State 增量。原则见 [Idea State：实时演化的研究状态](../space.md#live-idea-state)。

## 6. 研究完成后的结果卡

一张 Explore 结果回执应当清楚展示：

1. **本轮发现**：有哪些有根据的 Directions、代表论文、已读深度和未覆盖内容。
2. **与当前研究的关系**：哪些认识新增、哪些未知被缩小，哪些判断保持不变；若没有关联 Idea，则不宣称 State 已推进。
3. **建议下一步**：为什么值得继续 Explore、Deep Dive 或 Deep Research，用户可以选择是否启动。

一个可理解的示例：

> 本轮发现三种不同的 Agent Memory 研究切入角度。针对你关注的“共享时机”，相关评估证据仍不足。建议下一步 Deep Dive：比较不同共享策略在相同评价条件下的效果。

这只是结果文案示例，不暗示系统已完成相关真实文献检索。

## 7. 结束条件与常见误区

- **完成条件**：提供可比较的有据候选方向，或清楚说明为什么现有证据不足以进一步划分，并给出合理下一步。
- **未搜到论文** 不代表方向不存在；应记录检索范围与失败来源。
- **找到相似主题** 不意味着发现了新颖的研究 Gap。
- **论文多** 不自动意味着方向更重要；用户匹配度、方法实质和证据质量同样关键。
- **已有研究结果** 可以直接复用；不能为了显示活动而重复检索。
- **Research Action** 是有界的：结束、取消或部分完成均保留合法已保存材料，不自动启动下一轮，也不把建议当执行权限。

## 8. 最小验收场景

假设用户只输入“Agent Memory”并明确发起持续探索：

1. 不需要填写 Hypothesis、Approach 或 Evaluation。
2. 一轮 Explore 返回有真实依据的候选 Direction，不凭空凑足数量。
3. 用户可以沿其中一个 Direction 再展开一层，之前的选择和证据仍可回看。
4. Paper、Direction 与当前 Idea 之间有明确来源关联。
5. 查看 Direction 不会自动改变当前 Focus；真正采纳时有独立用户操作。
6. 本轮发现的有效认知可以在执行过程中推进同一个 Idea State；没有关联 Idea 时不伪称已更新。检索进度本身不构成 State 版本。
7. 下一步 Intent 是可解释的建议，不会未经授权执行。

---

**下一步阅读：[Deep Dive / Deep Research：如何从选定方向逼近研究边界并探索候选突破方法](02-deep-dive-deep-research.md)。**
