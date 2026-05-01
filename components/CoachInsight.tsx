"use client";

import { AlertTriangle, Lightbulb, Flame } from "lucide-react";
import CaptainAvatar from "./CaptainAvatar";
import { Insight } from "@/types";

export function CoachInsight({ insight }: { insight: Insight }) {
   return (
      <article className="animate-fade-up">
         <div className="flex items-start gap-3">
            <CaptainAvatar size="sm" pulse={false} />
            <div className="flex-1">
               <div className="mb-1 flex items-center gap-2">
                  <span className="font-display text-sm font-bold text-neon-cyan">
                     Captain Nova
                  </span>
                  <span className="rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-neon-cyan">
                     Coach Insight
                  </span>
               </div>

               <div className="glass-strong relative overflow-hidden rounded-2xl p-5">
                  <div
                     aria-hidden
                     className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-neon-cyan to-transparent"
                  />

                  <Section
                     icon={<AlertTriangle className="h-4 w-4" />}
                     label="Mistake Analysis"
                     tone="warn"
                     text={insight.mistake}
                  />
                  <Section
                     icon={<Lightbulb className="h-4 w-4" />}
                     label="Actionable Advice"
                     tone="info"
                     text={insight.advice}
                  />

                  <div className="mt-4 rounded-xl border border-neon-purple/40 bg-linear-to-br from-neon-purple/15 via-neon-blue/10 to-neon-cyan/10 p-4">
                     <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neon-magenta">
                        <Flame className="h-3.5 w-3.5" />
                        Captain's Words
                     </div>
                     <p className="font-display text-base font-bold leading-snug text-gradient-neon text-glow">
                        "{insight.motivation}"
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </article>
   );
}

function Section({
   icon,
   label,
   text,
   tone,
}: {
   icon: React.ReactNode;
   label: string;
   text: string;
   tone: "warn" | "info";
}) {
   const toneClass = tone === "warn" ? "text-neon-magenta" : "text-neon-cyan";
   return (
      <div className="mb-3 last:mb-0">
         <div
            className={`mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] ${toneClass}`}
         >
            {icon} {label}
         </div>
         <p className="text-sm leading-relaxed text-foreground/90">{text}</p>
      </div>
   );
}
