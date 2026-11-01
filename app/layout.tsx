import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import { SiteHeader } from "./components/site-header";
import "./globals.css";

const albert = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CoResearch",
  description:
    "在前人研究构成的知识世界中探索、定位研究方向，并设计有依据、可验证的下一步。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className={`${albert.variable} scroll-smooth`}>
      <body
        className="bg-[#fdfff7] text-[#262626] antialiased"
        style={{
          fontFamily:
            'var(--font-albert), "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
        }}
      >
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
