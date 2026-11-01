# Research World 滚动分镜接入

当前页面显示静态、完整圆形图谱；尚未启用 pin 或滚动分镜，等待叙事内容确定。
背景始终透明，使用整页底色。

- `app/graph/graph-layout.ts`：固定种子，350 个核心节点在半径 205 内密集交织，18 条弯曲分支向四周逐渐疏散，全部在半径 320 的同一圆盘内。连接骨架保证没有分离的岛。核心保留 `paper-*` ID，外围使用 `branch-分支序号-层级` 和 `branch-分支序号-层级-leaf-序号`，方便后续分镜沿分支推进。
- `app/graph/renderer.ts`：数据、连线层、节点层、镜头分开。`mountGraph()` 返回 `pose`、`render()`、`nodePosition(id)`、`destroy()`。节点独立绘制，支持聚焦和淡化；渲染按需执行，不持续运行布局模拟。
- `app/graph/scroll-story.ts`：已准备可选的 GSAP ScrollTrigger 适配器，支持带名称的分镜、镜头平移/缩放/旋转、节点聚焦、节点/连线透明度、滚动倒放和 resize。系统开启减少动态效果时保留静态图谱。

后续在 `ResearchGraph` 的 effect 内，图谱挂载成功且确认组件仍在时，动态导入适配器：

```ts
const { createGraphScrollStory } = await import("../graph/scroll-story");
// 再次检查 effect 是否已清理，避免异步挂载泄漏。
const point = mounted.nodePosition("paper-100");
const disposeStory = createGraphScrollStory(mounted, section, stage, [
  { label: "overview", pose: { x: 0, y: 0, zoom: 1 } },
  { label: "locate", focusId: "paper-100", pose: { ...point, zoom: 1.6, edgesOpacity: 0.45 } },
  { label: "return", focusId: null, pose: { x: 0, y: 0, zoom: 1, edgesOpacity: 1 } },
]);
// effect 清理顺序：先 disposeStory()，后 mounted.destroy()。
```

`section` 为完整滚动故事的容器，`stage` 为内部固定展示区，两者需来自 React ref；避免固定包含后续正文的整页。文字、标注、节点路线可以继续加入同一时间轴；不要为每一页创建互相竞争的镜头 ScrollTrigger。

适配器只使用稳定的世界坐标，不把像素坐标写进分镜。要修改布局，保留节点 ID 的语义，并更新分镜引用。

API 参考：[GSAP Timeline](https://gsap.com/docs/v3/GSAP/Timeline/)、[ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)。
