"use client";

import { useState } from "react";
import { spaces } from "../content";

export function SpaceSwitcher() {
  const [active, setActive] = useState(0);
  const current = spaces[active];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="研究空间">
        {spaces.map((space, index) => {
          const selected = index === active;
          return (
            <button
              key={space.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(index)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selected
                  ? "bg-[#262626] text-white"
                  : "bg-white text-[#262626] ring-1 ring-black/10 hover:bg-[#f4f6ee]"
              }`}
            >
              {space.title}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] bg-[#262626] p-8 text-[#fdfff7] md:p-10">
          <p className="text-sm text-[#a9ff63]">{current.question}</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight">{current.title}</h3>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/80">{current.body}</p>
        </div>
        <ResearchCanvas active={current.id} />
      </div>
    </div>
  );
}

function ResearchCanvas({ active }: { active: (typeof spaces)[number]["id"] }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white">
      <div className="flex items-center gap-2 border-b border-black/8 px-5 py-3">
        <span className="size-2.5 rounded-full bg-[#eceee4]" />
        <span className="size-2.5 rounded-full bg-[#eceee4]" />
        <span className="size-2.5 rounded-full bg-[#eceee4]" />
        <span className="ml-3 text-xs text-[#8a8c84]">Research World</span>
      </div>
      <div className="grid min-h-[280px] grid-cols-[140px_minmax(0,1fr)]">
        <div className="border-r border-black/8 p-4 text-xs leading-6 text-[#6b6d66]">
          <p className="font-medium text-[#262626]">Domain</p>
          <p>Subfield</p>
          <p>Direction</p>
          <p className="mt-4 font-medium text-[#262626]">Evidence</p>
          <p>Paper</p>
          <p>Method</p>
        </div>
        <div className="relative p-6">
          <Node className="left-6 top-8" label="Problem" active={active !== "idea"} />
          <Node className="left-[42%] top-16" label="Method" active={active === "literature"} />
          <Node className="right-6 bottom-16" label="Limitation" active={active !== "idea"} />
          <Node className="bottom-8 left-10" label="Idea State" active={active !== "literature"} />
          <svg className="absolute inset-0 size-full" aria-hidden="true">
            <path
              d="M90 70 C 150 80, 180 110, 230 120"
              fill="none"
              stroke="#d7dec8"
              strokeWidth="1.5"
            />
            <path
              d="M250 140 C 280 180, 250 210, 210 230"
              fill="none"
              stroke="#d7dec8"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Node({
  className,
  label,
  active,
}: {
  className: string;
  label: string;
  active: boolean;
}) {
  return (
    <span
      className={`absolute rounded-full px-3 py-1.5 text-xs font-medium ${className} ${
        active ? "bg-[#a9ff63] text-[#262626]" : "bg-[#f3f5ec] text-[#6b6d66]"
      }`}
    >
      {label}
    </span>
  );
}
