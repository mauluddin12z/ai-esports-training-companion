"use client";

import { useEffect, useRef, useState } from "react";
import { CoachInsight } from "./CoachInsight";
import { MatchReflection } from "./MatchReflection";
import { TrainingGoalCard } from "./TrainingGoalCard";
import { TrainingPlan } from "./TrainingPlan";
import { Radio, Sparkles } from "lucide-react";

import CaptainAvatar from "./CaptainAvatar";
import { getDrills, getSession, saveDrills } from "@/lib/session";
import { getInsights, saveInsights } from "@/lib/session";
import { Drill, Insight } from "@/types";
import { generateInsight } from "@/lib/ai/insight";
import { generateDrills } from "@/lib/ai/drills";

const FLOATING_LINES = [
  "Every loss is a lesson.",
  "Mind clear. Aim sharp.",
  "One more rep. Let's go!",
  "You're built for this.",
];

export function TrainingConsole() {
  const [insights, setInsights] = useState<Insight[]>(() => getInsights());
  const [drills, setDrills] = useState<Drill[]>(() => getDrills());
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "Analyzing your gameplay",
  );
  const [floatIdx, setFloatIdx] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);
  const session = getSession();

  useEffect(() => {
    const t = setInterval(
      () => setFloatIdx((i) => (i + 1) % FLOATING_LINES.length),
      4500,
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [insights.length, loading]);

  useEffect(() => {
    saveInsights(insights);
  }, [insights]);
  useEffect(() => {
    saveInsights(insights);
  }, [insights]);

  useEffect(() => {
    saveDrills(drills);
  }, [drills]);

  async function handleSubmit(reflection: string) {
    setLoading(true);
    setLoadingMessage("Analyzing your gameplay");

    try {
      setLoadingMessage("Identifying mistakes...");

      const gen = await generateInsight({
        reflection,
        game: session?.game || "",
        rank: session?.rank || "",
        role: session?.role || "",
        currentCondition: session?.currentCondition || "",
        goal: session?.goal || "",
      });

      setInsights((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          mistake: gen.mistake,
          advice: gen.advice,
          motivation: gen.motivation,
        },
      ]);

      setLoadingMessage("Building personalized drills...");

      const drills = await generateDrills({
        game: session?.game || "",
        role: session?.role || "",
        mistake: gen.mistake,
        advice: gen.advice,
      });

      setDrills(drills);

      setLoadingMessage("Finalizing your training plan...");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="console"
      className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-20"
    >
      <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-neon-cyan">
            <Radio className="h-3 w-3" /> Training Console
          </div>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            Step into the <span className="text-gradient-neon">arena</span>.
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Captain Nova adapts to every match you log.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* LEFT: Captain panel */}
        <aside className="lg:col-span-4 xl:col-span-3 space-y-5">
          <div className="glass-strong relative overflow-hidden rounded-2xl p-6 text-center">
            <div
              aria-hidden
              className="absolute inset-x-0 -top-20 h-40 bg-linear-to-b from-neon-purple/30 via-neon-blue/20 to-transparent blur-2xl"
            />
            <div className="relative">
              <CaptainAvatar size="lg" />
              <h3 className="mt-4 font-display text-xl font-extrabold text-gradient-neon">
                Captain Nova
              </h3>
              <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neon-cyan">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-cyan" />
                </span>
                Ready to train
              </div>

              <div
                key={floatIdx}
                className="mt-5 animate-fade-up rounded-xl border border-neon-purple/30 bg-background/40 px-3 py-2.5"
              >
                <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-neon-purple">
                  <Sparkles className="h-3 w-3" /> Captain says
                </div>
                <p className="mt-1 font-display text-sm font-semibold leading-snug text-foreground">
                  {FLOATING_LINES[floatIdx]}
                </p>
              </div>
            </div>
          </div>

          <TrainingGoalCard />
          <div className="hidden lg:block">
            <TrainingPlan drills={drills} />
          </div>
        </aside>

        {/* RIGHT: Console */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-5">
          <div className="glass-strong rounded-2xl p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between border-b border-border/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-neon-magenta" />
                <span className="h-2 w-2 rounded-full bg-neon-cyan" />
                <span className="h-2 w-2 rounded-full bg-neon-purple" />
                <span className="ml-3 font-display text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
                  Coach Console // Session 01
                </span>
              </div>
              <span className="font-display text-[10px] font-bold uppercase tracking-widest text-neon-cyan">
                LIVE
              </span>
            </div>

            <div className="max-h-130 space-y-6 overflow-y-auto pr-1">
              {insights.map((i) => (
                <CoachInsight key={i.id} insight={i} />
              ))}
              {loading && (
                <div className="flex items-center gap-3 animate-fade-up">
                  <CaptainAvatar size="sm" pulse={false} />
                  <div className="glass rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-neon-cyan">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neon-cyan" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neon-blue [animation-delay:0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neon-purple [animation-delay:0.3s]" />
                      <span className="ml-2 font-display text-xs font-bold uppercase tracking-widest">
                        {loadingMessage}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
          </div>

          <MatchReflection onSubmit={handleSubmit} loading={loading} />

          <div className="lg:hidden">
            <TrainingPlan drills={drills} />
          </div>
        </div>
      </div>
    </section>
  );
}
