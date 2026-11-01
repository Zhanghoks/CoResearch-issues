"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { githubUrl, issuesUrl } from "../content";

const links = [
  { href: "/#world", label: "Research World" },
  { href: "/docs", label: "文档" },
  { href: githubUrl, label: "GitHub" },
];

export function SiteHeader() {
  const ref = useRef<HTMLElement>(null);
  const [glass, setGlass] = useState(false);

  useEffect(() => {
    const update = () => {
      const header = ref.current;
      if (!header) return;
      const line = header.getBoundingClientRect().bottom;
      const hero = document.querySelector("[data-home-hero]");
      if (hero) {
        setGlass(hero.getBoundingClientRect().top < line - 1);
        return;
      }
      setGlass(window.scrollY > 4);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header
      ref={ref}
      className={`sticky top-0 z-20 border-b transition-[background-color,border-color,backdrop-filter] duration-200 ${
        glass
          ? "border-white/40 bg-[#fdfff7]/40 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4">
        <Link href="/" className="order-1 text-lg font-semibold tracking-tight">
          CoResearch
        </Link>
        <a
          href={issuesUrl}
          className="order-2 shrink-0 whitespace-nowrap rounded-full bg-[#262626] px-4 py-2 text-sm font-medium text-white md:order-3"
        >
          参与讨论
        </a>
        <nav className="order-3 flex w-full flex-wrap gap-x-5 gap-y-2 text-sm font-medium md:order-2 md:w-auto">
          {links.map((link) =>
            link.href.startsWith("http") ? (
              <a key={link.href} href={link.href} className="hover:opacity-70">
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className="hover:opacity-70">
                {link.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
