"use client";

import { useState } from "react";
import { Crosshair, Brain, Eye, Flame, Check } from "lucide-react";

const drills = [
  {
    id: "aim",
    icon: Crosshair,
    title: "Aim Training",
    time: "20 min",
    desc: "Kovaak's gridshot + tracking",
    color: "neon-cyan",
  },
  {
    id: "sense",
    icon: Eye,
    title: "Game Sense Review",
    time: "30 min",
    desc: "VOD review with timestamps",
    color: "neon-blue",
  },
  {
    id: "focus",
    icon: Brain,
    title: "Mental Focus",
    time: "10 min",
    desc: "Box breathing + visualization",
    color: "neon-purple",
  },
  {
    id: "scrim",
    icon: Flame,
    title: "Ranked Warmup",
    time: "1 match",
    desc: "Low-stakes, high-intent play",
    color: "neon-magenta",
  },
] as const;

export function TrainingPlan() {
  const [done, setDone] = useState<Record<string, boolean>>({ aim: true });
  const completed = Object.values(done).filter(Boolean).length;
  const pct = Math.round((completed / drills.length) * 100);

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Today's Loadout
          </div>
          <div className="font-display text-base font-bold">Training Plan</div>
        </div>
        <div className="text-right">
          <div className="font-display text-xl font-bold text-gradient-neon">
            {pct}%
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {completed}/{drills.length} done
          </div>
        </div>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-background/60">
        <div
          className="h-full rounded-full bg-linear-to-r from-neon-cyan via-neon-blue to-neon-purple transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="mt-4 space-y-2">
        {drills.map((d) => {
          const isDone = done[d.id];
          const Icon = d.icon;
          return (
            <li key={d.id}>
              <button
                onClick={() => setDone((p) => ({ ...p, [d.id]: !p[d.id] }))}
                className={`group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                  isDone
                    ? "border-neon-cyan/40 bg-neon-cyan/5"
                    : "border-border/50 bg-background/30 hover:border-neon-blue/40 hover:bg-background/50"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition ${
                    isDone
                      ? "border-neon-cyan/60 bg-neon-cyan/15 text-neon-cyan"
                      : "border-border/60 bg-background/60 text-muted-foreground group-hover:text-neon-blue"
                  }`}
                >
                  {isDone ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    className={`font-display text-sm font-bold ${isDone ? "line-through opacity-60" : ""}`}
                  >
                    {d.title}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {d.desc}
                  </div>
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {d.time}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
