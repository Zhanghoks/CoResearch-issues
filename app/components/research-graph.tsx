"use client";

import { useEffect, useRef } from "react";

export function ResearchGraph() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let dead = false;
    let destroy = () => {
      dead = true;
    };

    void (async () => {
      const { mountGraph } = await import("../graph/renderer");
      if (dead) return;
      const mounted = await mountGraph(host);
      if (dead) {
        mounted.destroy();
        return;
      }
      destroy = () => mounted.destroy();
    })();

    return () => {
      dead = true;
      destroy();
    };
  }, []);

  return (
    <div role="img" aria-label="研究世界演示图谱：密集的文献节点与相互关联的研究群落，节点及连线均为示意。">
      <div className="relative h-[72svh] min-h-[420px] max-h-[900px] overflow-hidden md:h-[80svh] md:min-h-[600px]">
        <div ref={hostRef} className="absolute inset-0" />
      </div>
    </div>
  );
}
