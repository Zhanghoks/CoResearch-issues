"use client";

import { useState } from "react";
import { faqs } from "../content";

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-black/10">
      {faqs.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q} className="border-b border-black/10">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : index)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium"
            >
              {item.q}
              <span className="text-2xl font-light leading-none text-[#6b6d66]">
                {expanded ? "–" : "+"}
              </span>
            </button>
            {expanded ? (
              <p className="max-w-3xl pb-6 text-base leading-7 text-[#3f413c]">{item.a}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
