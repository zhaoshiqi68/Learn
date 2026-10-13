"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Widget } from "@/components/widgets";
import { chapters, type Block, type Chapter } from "@/lib/chapters";

const STORAGE_KEY = "harness-reader-v1";
const STORE_EVENT = "harness-reader-store";

type Store = {
  seen: string[];
  checked: number[];
};

const emptyStore: Store = { seen: [], checked: [] };

function parseStore(raw: string): Store {
  if (!raw) return emptyStore;
  try {
    const parsed = JSON.parse(raw) as Partial<Store>;
    return {
      seen: Array.isArray(parsed.seen) ? parsed.seen.filter((item) => typeof item === "string") : [],
      checked: Array.isArray(parsed.checked)
        ? parsed.checked.filter((item) => typeof item === "number")
        : [],
    };
  } catch {
    return emptyStore;
  }
}

let storeSnapshot = emptyStore;
let storeSnapshotKey = "";

function getStoreSnapshot(): Store {
  let raw = "";
  try {
    raw = localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    raw = "";
  }
  if (raw === storeSnapshotKey) return storeSnapshot;
  storeSnapshotKey = raw;
  storeSnapshot = parseStore(raw);
  return storeSnapshot;
}

function commitStore(next: Store) {
  const raw = JSON.stringify(next);
  try {
    localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    /* private mode: the session still toggles until reload */
  }
  storeSnapshot = next;
  storeSnapshotKey = raw;
  window.dispatchEvent(new Event(STORE_EVENT));
}

function subscribeStore(onStore: () => void) {
  window.addEventListener(STORE_EVENT, onStore);
  window.addEventListener("storage", onStore);
  return () => {
    window.removeEventListener(STORE_EVENT, onStore);
    window.removeEventListener("storage", onStore);
  };
}

function chapterFromHash() {
  const hash = window.location.hash.replace("#", "");
  return chapters.some((chapter) => chapter.id === hash) ? hash : chapters[0].id;
}

function subscribeChapter(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function plainText(chapter: Chapter) {
  const bits = [chapter.title, chapter.kicker, chapter.lead, chapter.section];
  for (const block of chapter.blocks) {
    if (block.type === "p" || block.type === "h") bits.push(block.text);
    if (block.type === "quote") bits.push(block.text, block.cite);
    if (block.type === "note") bits.push(block.title, block.text);
    if (block.type === "list") bits.push(...block.items);
  }
  return bits.join("\n");
}

export function Reader() {
  const chapterId = useSyncExternalStore(subscribeChapter, chapterFromHash, () => chapters[0].id);
  const store = useSyncExternalStore(subscribeStore, getStoreSnapshot, () => emptyStore);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const current = getStoreSnapshot();
    if (current.seen.includes(chapterId)) return;
    commitStore({ ...current, seen: [...current.seen, chapterId] });
  }, [chapterId]);

  const chapter = chapters.find((item) => item.id === chapterId) ?? chapters[0];
  const index = chapters.findIndex((item) => item.id === chapter.id);
  const needle = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!needle) return chapters;
    return chapters.filter((item) => plainText(item).toLowerCase().includes(needle));
  }, [needle]);

  function open(id: string) {
    if (window.location.hash !== `#${id}`) {
      history.pushState(null, "", `#${id}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleRec(n: number) {
    const current = getStoreSnapshot();
    const checked = current.checked.includes(n)
      ? current.checked.filter((item) => item !== n)
      : [...current.checked, n];
    commitStore({ ...current, checked });
  }

  const progress = Math.round((store.seen.length / chapters.length) * 100);

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm italic text-muted-foreground">Harness Engineering</p>
            <p className="truncate text-sm font-medium">十一套编程 Agent 的源码导读</p>
          </div>
          <p className="hidden text-xs text-muted-foreground sm:block">{progress}% 读过</p>
          <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-muted sm:block" aria-hidden>
            <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-6 md:grid-cols-[16rem_minmax(0,1fr)] md:py-10">
        <aside className="md:sticky md:top-20 md:max-h-[calc(100vh-6rem)] md:overflow-auto">
          <label className="mb-3 block text-xs tracking-wide text-muted-foreground" htmlFor="chapter-search">
            在导读里搜索
          </label>
          <Input
            id="chapter-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="框架、沙箱、skill…"
          />
          <nav className="mt-4 max-h-52 overflow-auto md:max-h-[calc(100vh-12rem)]" aria-label="章节">
            {matches.length === 0 ? (
              <p className="rounded-lg border border-dashed px-3 py-6 text-sm leading-6 text-muted-foreground">
                导读里没有这句。试试「向量」「Codex」或「九十行」。
              </p>
            ) : (
              <ol className="space-y-1">
                {matches.map((item) => {
                  const active = item.id === chapter.id;
                  const seen = store.seen.includes(item.id);
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => open(item.id)}
                        aria-current={active ? "page" : undefined}
                        className={`flex w-full items-baseline gap-2 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-muted ${
                          active ? "bg-muted font-medium" : ""
                        }`}
                      >
                        <span className="w-5 shrink-0 font-mono text-[0.7rem] text-muted-foreground">{item.index}</span>
                        <span className="min-w-0 flex-1">{item.title}</span>
                        {seen ? <span className="text-[0.65rem] text-primary">读过</span> : null}
                      </button>
                    </li>
                  );
                })}
              </ol>
            )}
          </nav>
        </aside>

        <article className="min-w-0">
          <p className="font-mono text-xs tracking-wide text-muted-foreground">
            {chapter.section} · 约 {chapter.minutes} 分钟
          </p>
          <h1 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">{chapter.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">{chapter.lead}</p>
          <div className="reading mt-8 max-w-2xl">
            {chapter.blocks.map((block, blockIndex) => (
              <BlockView
                key={`${chapter.id}-${blockIndex}`}
                block={block}
                checked={store.checked}
                onToggle={toggleRec}
              />
            ))}
          </div>

          <Separator className="my-10 max-w-2xl" />

          <div className="flex max-w-2xl flex-wrap items-center justify-between gap-3">
            {index > 0 ? (
              <Button type="button" variant="outline" onClick={() => open(chapters[index - 1].id)}>
                上一章 · {chapters[index - 1].title}
              </Button>
            ) : (
              <span />
            )}
            {index < chapters.length - 1 ? (
              <Button type="button" onClick={() => open(chapters[index + 1].id)}>
                下一章 · {chapters[index + 1].title}
              </Button>
            ) : (
              <Button type="button" variant="outline" onClick={() => open(chapters[0].id)}>
                回到开头
              </Button>
            )}
          </div>

          <footer className="mt-10 max-w-2xl space-y-2 text-sm leading-7 text-muted-foreground">
            <p>
              原文：
              <a className="mx-2 underline underline-offset-4" href="https://arxiv.org/abs/2609.00006">
                摘要页
              </a>
              <a className="mx-2 underline underline-offset-4" href="https://arxiv.org/html/2609.00006">
                HTML
              </a>
              <a className="mx-2 underline underline-offset-4" href="https://arxiv.org/pdf/2609.00006">
                PDF
              </a>
            </p>
            <p>
              导读依据 arXiv HTML 版复述，不替代论文。Barbaste、Darrigol、Vu、Wiltberger，2026。流通摘要里的 CC BY 4.0
              未在正文提取中核对，引用请以 arXiv 条目为准。
            </p>
          </footer>
        </article>
      </div>
    </div>
  );
}

function BlockView({
  block,
  checked,
  onToggle,
}: {
  block: Block;
  checked: number[];
  onToggle: (n: number) => void;
}) {
  if (block.type === "p") return <p className="mb-5 text-[1.05rem] leading-8">{block.text}</p>;
  if (block.type === "h") return <h2 className="mt-10 mb-3 font-serif text-2xl">{block.text}</h2>;
  if (block.type === "quote") {
    return (
      <blockquote className="my-8 border-l-2 border-primary pl-4">
        <p className="font-display text-xl leading-8 italic">{block.text}</p>
        <footer className="mt-2 font-mono text-xs text-muted-foreground">{block.cite}</footer>
      </blockquote>
    );
  }
  if (block.type === "list") {
    return (
      <ul className="mb-5 list-disc space-y-2 pl-5 text-[1.02rem] leading-8">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "note") {
    const label = block.tone === "fix" ? "和摘要不一致" : block.tone === "limit" ? "证据边界" : "读的时候抓住";
    return (
      <aside className="my-6 rounded-xl border bg-card px-4 py-3">
        <p className="font-mono text-[0.7rem] tracking-wide text-primary">{label}</p>
        <h3 className="mt-1 font-medium">{block.title}</h3>
        <p className="mt-1 text-sm leading-7 text-muted-foreground">{block.text}</p>
      </aside>
    );
  }
  return <Widget id={block.id} checked={checked} onToggle={onToggle} />;
}
