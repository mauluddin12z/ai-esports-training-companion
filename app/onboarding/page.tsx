"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSession, clearSession } from "@/lib/session";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import CaptainAvatar from "@/components/CaptainAvatar";

const STEPS = [
   {
      key: "nickname",
      label: "Pilot Callsign",
      placeholder: "e.g. ShadowStrike",
      hint: "What should Captain Nova call you?",
   },
   {
      key: "game",
      label: "Game",
      placeholder: "e.g. Valorant, Dota 2, League, CS2",
      hint: "Pick the battlefield for this session.",
   },
   {
      key: "rank",
      label: "Rank",
      placeholder: "e.g. Gold 2, Diamond, Immortal",
      hint: "Your current competitive rank.",
   },
   {
      key: "role",
      label: "Role",
      placeholder: "e.g. Duelist, Mid Lane, Entry",
      hint: "Where do you fight on the team?",
   },
   {
      key: "currentCondition",
      label: "Current Condition",
      placeholder: "e.g. Tilted, Focused, Tired",
      hint: "Be honest. Mind first.",
   },
   {
      key: "goal",
      label: "Goal",
      placeholder: "e.g. Stop forcing 1v1s",
      hint: "One clear, focused mission.",
   },
] as const;

type FieldKey = (typeof STEPS)[number]["key"];

export default function OnboardingPage() {
   const router = useRouter();

   const [step, setStep] = useState(0);
   const [data, setData] = useState<Record<FieldKey, string>>({
      nickname: "",
      game: "",
      rank: "",
      role: "",
      currentCondition: "",
      goal: "",
   });

   const current = STEPS[step];
   const value = data[current.key];
   const last = step === STEPS.length - 1;

   function next() {
      if (!value.trim()) return;
      if (last) {
         saveSession(data);
         router.push("/console");
      } else {
         setStep((s) => s + 1);
      }
   }

   function startOver() {
      clearSession();
      setStep(0);
      setData({
         nickname: "",
         game: "",
         rank: "",
         role: "",
         currentCondition: "",
         goal: "",
      });
   }

   return (
      <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
         <div aria-hidden className="absolute inset-0 grid-bg" />
         <div
            aria-hidden
            className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-neon-blue/30 blur-[120px]"
         />
         <div
            aria-hidden
            className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-neon-purple/30 blur-[120px]"
         />

         <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-neon-cyan">
               <Sparkles className="h-3.5 w-3.5" />
               New Session • Step {step + 1} / {STEPS.length}
            </div>

            <div className="mb-6 flex items-center gap-4">
               <CaptainAvatar size="md" />
               <div className="glass max-w-md rounded-2xl px-4 py-3">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neon-purple">
                     Captain Nova
                  </div>
                  <p className="mt-1 font-display text-sm font-semibold leading-snug">
                     {current.hint}
                  </p>
               </div>
            </div>

            <div className="glass-strong w-full rounded-2xl p-6 sm:p-8 animate-fade-up">
               <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neon-cyan">
                  {current.label}
               </label>

               <input
                  autoFocus
                  value={value}
                  onChange={(e) =>
                     setData({ ...data, [current.key]: e.target.value })
                  }
                  onKeyDown={(e) => {
                     if (e.key === "Enter") next();
                  }}
                  placeholder={current.placeholder}
                  className="mt-3 w-full rounded-lg border border-border/60 bg-input/40 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-neon-cyan/60 focus:outline-none focus:ring-2 focus:ring-neon-cyan/25"
               />

               <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-background/60">
                  <div
                     className="h-full rounded-full bg-linear-to-r from-neon-cyan via-neon-blue to-neon-purple transition-all duration-500"
                     style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                  />
               </div>

               <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                     onClick={() =>
                        step === 0 ? startOver() : setStep((s) => s - 1)
                     }
                     className="rounded-full border border-border/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground transition hover:border-neon-magenta/40 hover:text-neon-magenta cursor-pointer"
                  >
                     {step === 0 ? "Reset" : "Back"}
                  </button>

                  <button
                     onClick={next}
                     disabled={!value.trim()}
                     className="btn-neon inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  >
                     {last ? <Zap className="h-3.5 w-3.5" /> : null}
                     {last ? "Enter Arena" : "Next"}
                     {!last && <ArrowRight className="h-3.5 w-3.5" />}
                  </button>
               </div>
            </div>
         </div>
      </main>
   );
}
