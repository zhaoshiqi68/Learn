"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { audits, observations, patterns, recommendations } from "@/lib/catalog";
import { omnigent, subsystems, systems, type Lang } from "@/lib/corpus";
import type { WidgetId } from "@/lib/widgets";

const tone: Record<string, string> = {
  准确: "bg-primary text-primary-foreground",
  要补边界: "bg-secondary text-secondary-foreground",
  说满了: "bg-destructive/15 text-destructive",
};

export function Widget({
  id,
  checked,
  onToggle,
}: {
  id: WidgetId;
  checked: number[];
  onToggle: (n: number) => void;
}) {
  if (id === "subsystems") return <Subsystems />;
  if (id === "systems") return <Systems />;
  if (id === "patterns") return <Patterns />;
  if (id === "advice") return <Advice checked={checked} onToggle={onToggle} />;
  return <Audit />;
}

function Subsystems() {
  const [current, setCurrent] = useState<(typeof subsystems)[number]["id"]>(subsystems[0].id);
  const item = subsystems.find((entry) => entry.id === current) ?? subsystems[0];

  return (
    <div className="my-8 grid gap-3 sm:grid-cols-[12rem_1fr]">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-1" role="tablist" aria-label="七个子系统">
        {subsystems.map((entry) => (
          <Button
            key={entry.id}
            type="button"
            role="tab"
            aria-selected={entry.id === item.id}
            variant={entry.id === item.id ? "default" : "outline"}
            className="h-auto justify-start whitespace-normal px-3 py-2 text-left"
            onClick={() => setCurrent(entry.id)}
          >
            <span>
              <span className="block text-[0.7rem] tracking-wide opacity-70">{entry.section}</span>
              {entry.zh}
            </span>
          </Button>
        ))}
      </div>
      <div className="rounded-xl border bg-card p-4" role="tabpanel">
        <p className="font-mono text-xs text-muted-foreground">{item.name}</p>
        <h3 className="mt-1 font-serif text-xl">{item.zh}</h3>
        <p className="mt-3 text-sm leading-7">{item.role}</p>
        <dl className="mt-4 space-y-3 text-sm leading-6">
          <div>
            <dt className="text-xs tracking-wide text-muted-foreground">最小</dt>
            <dd>{item.min}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-wide text-muted-foreground">最大</dt>
            <dd>{item.max}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function Systems() {
  const [lang, setLang] = useState<Lang | "全部">("全部");
  const [multi, setMulti] = useState("全部");
  const [box, setBox] = useState("全部");
  const langs: Array<Lang | "全部"> = ["全部", "Python", "TypeScript", "Rust"];
  const multis = ["全部", "核心里有", "没有", "只在扩展里"];
  const boxes = ["全部", "操作系统级", "容器或远程", "可选", "没有"];

  const shown = systems.filter((system) => {
    if (lang !== "全部" && system.lang !== lang) return false;
    if (multi !== "全部" && system.multi !== multi) return false;
    if (box !== "全部" && system.sandbox !== box) return false;
    return true;
  });

  return (
    <div className="my-8 space-y-4">
      <FilterRow label="语言" values={langs} current={lang} onChange={setLang} />
      <FilterRow label="多 Agent" values={multis} current={multi} onChange={setMulti} />
      <FilterRow label="沙箱" values={boxes} current={box} onChange={setBox} />
      {shown.length === 0 ? (
        <p className="rounded-xl border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
          没有系统同时满足这些条件。放宽一档就能看到样本怎么分布。
        </p>
      ) : (
        <ul className="grid gap-3">
          {shown.map((system) => (
            <li key={system.id} className="rounded-xl border bg-card p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-serif text-lg">{system.name}</h3>
                <p className="text-xs text-muted-foreground">{system.vendor}</p>
              </div>
              <p className="mt-2 text-sm leading-7">{system.signature}</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{system.role}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge variant="outline">{system.lang}</Badge>
                <Badge variant="outline">{system.scale}</Badge>
                <Badge variant="outline">工具 {system.tools}</Badge>
                <Badge variant="outline">编排 {system.multi}</Badge>
                <Badge variant="outline">沙箱 {system.sandbox}</Badge>
              </div>
              <p className="mt-3 font-mono text-[0.72rem] text-muted-foreground">{system.version}</p>
            </li>
          ))}
        </ul>
      )}
      <p className="rounded-xl bg-muted px-4 py-3 text-sm leading-7">
        <span className="font-medium">{omnigent.name}</span>（{omnigent.vendor}，{omnigent.version}）
        {omnigent.note}
      </p>
    </div>
  );
}

function FilterRow<T extends string>({
  label,
  values,
  current,
  onChange,
}: {
  label: string;
  values: T[];
  current: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <p className="w-16 shrink-0 pt-1 text-xs tracking-wide text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {values.map((value) => (
          <Button
            key={value}
            type="button"
            size="sm"
            variant={value === current ? "default" : "outline"}
            aria-pressed={value === current}
            onClick={() => onChange(value)}
          >
            {value}
          </Button>
        ))}
      </div>
    </div>
  );
}

function Patterns() {
  const [wave, setWave] = useState<"全部" | "四月就有" | "七月新出现">("全部");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"模式" | "观察">("模式");
  const needle = query.trim().toLowerCase();

  const shown = useMemo(
    () =>
      patterns.filter((pattern) => {
        if (wave !== "全部" && pattern.wave !== wave) return false;
        if (!needle) return true;
        return `${pattern.name} ${pattern.zh} ${pattern.what} ${pattern.who}`.toLowerCase().includes(needle);
      }),
    [needle, wave],
  );

  const observed = observations.filter((item) => {
    if (!needle) return true;
    return `${item.n} ${item.title} ${item.text}`.toLowerCase().includes(needle);
  });

  return (
    <div className="my-8 space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {(["模式", "观察"] as const).map((item) => (
          <Button
            key={item}
            type="button"
            size="sm"
            variant={tab === item ? "default" : "outline"}
            aria-pressed={tab === item}
            onClick={() => setTab(item)}
          >
            {item === "模式" ? "29 个模式" : "13 条观察"}
          </Button>
        ))}
      </div>
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={tab === "模式" ? "搜模式、系统或机制" : "搜观察"}
        aria-label={tab === "模式" ? "搜索模式" : "搜索观察"}
      />
      {tab === "模式" ? (
        <>
          <FilterRow
            label="批次"
            values={["全部", "四月就有", "七月新出现"]}
            current={wave}
            onChange={setWave}
          />
          {shown.length === 0 ? (
            <Empty />
          ) : (
            <ul className="grid gap-2">
              {shown.map((pattern) => (
                <li key={pattern.name} className="rounded-xl border bg-card px-4 py-3">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="font-medium">{pattern.zh}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{pattern.name}</span>
                    <Badge variant="secondary">{pattern.wave}</Badge>
                  </div>
                  <p className="mt-1 text-sm leading-7">{pattern.what}</p>
                  <p className="text-sm leading-7 text-muted-foreground">{pattern.who}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : observed.length === 0 ? (
        <Empty />
      ) : (
        <ol className="grid gap-2">
          {observed.map((item) => (
            <li key={item.n} className="rounded-xl border bg-card px-4 py-3">
              <p className="font-mono text-xs text-muted-foreground">
                观察 {item.n} · {item.section}
              </p>
              <h3 className="mt-1 font-medium">{item.title}</h3>
              <p className="mt-1 text-sm leading-7">{item.text}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function Advice({ checked, onToggle }: { checked: number[]; onToggle: (n: number) => void }) {
  const done = recommendations.filter((item) => checked.includes(item.n)).length;
  return (
    <div className="my-8 space-y-3">
      <p className="text-sm text-muted-foreground">
        已勾 {done} / {recommendations.length}。这只记在本地，用来对照你自己的 harness，不是论文的评分。
      </p>
      <ul className="grid gap-2">
        {recommendations.map((item) => {
          const on = checked.includes(item.n);
          return (
            <li key={item.n}>
              <label className="flex cursor-pointer gap-3 rounded-xl border bg-card px-4 py-3 has-focus-visible:ring-3 has-focus-visible:ring-ring/50">
                <input
                  type="checkbox"
                  className="mt-1 size-4 accent-[var(--primary)]"
                  checked={on}
                  onChange={() => onToggle(item.n)}
                />
                <span>
                  <span className="flex flex-wrap items-baseline gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {item.n.toString().padStart(2, "0")} · {item.group}
                    </span>
                  </span>
                  <span className="mt-1 block font-medium">{item.title}</span>
                  <span className="mt-1 block text-sm leading-7 text-muted-foreground">{item.text}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Audit() {
  return (
    <ul className="my-8 grid gap-3">
      {audits.map((item) => (
        <li key={item.claim} className="rounded-xl border bg-card p-4">
          <Badge className={tone[item.verdict]}>{item.verdict}</Badge>
          <h3 className="mt-2 font-medium leading-7">{item.claim}</h3>
          <p className="mt-2 text-sm leading-7">{item.detail}</p>
        </li>
      ))}
    </ul>
  );
}

function Empty() {
  return (
    <p className="rounded-xl border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
      没有匹配。换一个系统名，或者清空搜索。
    </p>
  );
}
