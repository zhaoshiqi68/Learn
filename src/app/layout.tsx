import type { Metadata } from "next";
import { Newsreader, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ui",
  display: "swap",
  preload: false,
});

const serif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-reading",
  display: "swap",
  preload: false,
});

const display = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harness Engineering 导读",
  description:
    "按 arXiv:2609.00006 原文拆开的中文导读：十一套编程 Agent 的架构、两个缺席、29 个模式和 18 条建议。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hans"
      className={`${sans.variable} ${serif.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
        <noscript>
          <p className="mx-auto max-w-xl px-6 py-16 text-lg leading-8">
            这份导读需要在浏览器里运行脚本，才能切换章节。你也可以直接读原文：
            https://arxiv.org/html/2609.00006
          </p>
        </noscript>
      </body>
    </html>
  );
}
