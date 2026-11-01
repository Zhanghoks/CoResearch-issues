import { ResearchGraph } from "../research-graph";

const inputs = ["论文与预印本", "综述与报告", "数据与实验", "开源实现"];
const outputs = ["新的研究问题", "新的方法思路", "新的应用方向", "跨领域的结合"];

export function ResearchWorldStory() {
  return (
    <section id="research-world" aria-labelledby="research-world-heading" className="scroll-mt-20 py-8 text-[#262626] md:py-12">
      <header className="mx-auto max-w-3xl px-5 text-center">
        <h2 id="research-world-heading" className="text-2xl font-semibold tracking-tight md:text-4xl">
          研究世界
          <span className="text-[#5C6B7A]"> (Research World)</span>
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#5C6B7A] md:text-base">
          一个领域的文献知识图谱。Literature Space 与 Idea Space 在同一张图里参照。
        </p>
      </header>

      <div className="mx-auto mt-4 w-full max-w-[1800px]">
        <ResearchGraph />
      </div>

      <footer className="mx-auto max-w-6xl px-5">
        <div className="grid gap-6 border-t border-black/10 pt-5 sm:grid-cols-2">
          {[{ title: "研究工作的输入", items: inputs }, { title: "研究世界的产出", items: outputs }].map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold">{group.title}</p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs leading-5 text-[#5C6B7A]">
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-[#8A97A6]">
          演示图谱。节点和关系均为示意，不代表已核实的文献结论。
        </p>
      </footer>
    </section>
  );
}
