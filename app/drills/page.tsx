"use client";

import { useEffect, useState } from "react";
import { getDrills, useSession } from "@/lib/session";
import { useRouter } from "next/navigation";
import { Check, Play, Pause, RotateCcw, Flame } from "lucide-react";
import CaptainAvatar from "@/components/CaptainAvatar";

export default function DrillsPage() {
   const session = useSession();
   const router = useRouter();
   const drills = getDrills() ?? [];

   // Redirect if not authenticated
   useEffect(() => {
      if (!session) router.push("/onboarding");
   }, [session, router]);

   const [done, setDone] = useState<Record<string, boolean>>(
      drills.reduce(
         (acc, drill) => {
            acc[drill.id] = false; // Initialize all drills as not done
            return acc;
         },
         {} as Record<string, boolean>,
      ),
   );

   const [active, setActive] = useState<string | null>(null);
   const [seconds, setSeconds] = useState(0);
   const [running, setRunning] = useState(false);

   useEffect(() => {
      if (!running) return;
      const id = setInterval(() => setSeconds((s) => s + 1), 1000);
      return () => clearInterval(id);
   }, [running]);

   if (!session) return null;

   const completed = drills.filter((d) => done[d.id]).length;
   const pct = Math.round((completed / drills.length) * 100);

   function startDrill(id: string) {
      setActive(id);
      setSeconds(0);
      setRunning(true);
   }

   function complete(id: string) {
      setDone((p) => ({ ...p, [id]: true }));
      setActive(null);
      setRunning(false);
      setSeconds(0);
   }

   if (drills.length === 0) {
      return (
         <main className="mx-auto max-w-7xl px-4 py-16 text-center">
            <div className="glass-strong rounded-2xl p-10">
               <div className="font-display text-2xl font-bold">
                  No drills assigned yet
               </div>

               <p className="mt-2 text-sm text-muted-foreground">
                  Captain Nova is still preparing your training loadout.
               </p>

               <div className="mt-6 rounded-xl border border-neon-cyan/30 bg-neon-cyan/5 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neon-cyan">
                     While you wait
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                     Fill out your{" "}
                     <span className="text-neon-cyan font-semibold">
                        Match Reflection
                     </span>{" "}
                     in the console to analyze your last game and sharpen your
                     focus for the next session.
                  </p>
               </div>

               <button
                  onClick={() => router.push("/console")}
                  className="mt-4 btn-neon inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
               >
                  Go to Console
               </button>
            </div>
         </main>
      );
   }

   return (
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
         <header className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
               <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-neon-cyan">
                  Today's Loadout
               </div>
               <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
                  Drill the <span className="text-gradient-neon">grind</span>.
               </h1>
               <p className="mt-2 text-sm text-muted-foreground">
                  Captain Nova picked these for you. Crush them in any order.
               </p>
            </div>
            <div className="glass rounded-xl px-5 py-3 text-right">
               <div className="font-display text-3xl font-extrabold text-gradient-neon">
                  {pct}%
               </div>
               <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {completed}/{drills.length} complete
               </div>
            </div>
         </header>

         <div className="mb-6 h-2 overflow-hidden rounded-full bg-background/60">
            <div
               className="h-full rounded-full bg-linear-to-r from-neon-cyan via-neon-blue to-neon-purple transition-all duration-500"
               style={{ width: `${pct}%` }}
            />
         </div>

         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {drills.map((d) => {
               const isDone = done[d.id];
               const isActive = active === d.id;
               return (
                  <article
                     key={d.id}
                     className={`glass-strong relative overflow-hidden rounded-2xl p-5 transition ${isDone ? "opacity-70" : ""}`}
                  >
                     <div className="mb-3 flex items-center justify-between">
                        <span className="rounded-full border border-neon-purple/40 bg-neon-purple/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-neon-purple">
                           {d.category}
                        </span>
                        {isDone && (
                           <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-neon-cyan">
                              <Check className="h-3 w-3" /> Done
                           </span>
                        )}
                     </div>
                     <h3 className="font-display text-xl font-extrabold">
                        {d.title}
                     </h3>
                     <p className="mt-1 text-sm text-muted-foreground">
                        {d.desc}
                     </p>
                     <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neon-cyan">
                        ⏱ {d.time}
                     </div>

                     {isActive && (
                        <div className="mt-4 rounded-xl border border-neon-cyan/40 bg-background/40 p-3">
                           <div className="text-center font-display text-3xl font-extrabold text-gradient-neon">
                              {formatTime(seconds)}
                           </div>
                           <div className="mt-2 flex justify-center gap-2">
                              <button
                                 onClick={() => setRunning((r) => !r)}
                                 className="rounded-full border border-border/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider hover:border-neon-cyan/50 hover:text-neon-cyan"
                              >
                                 {running ? (
                                    <Pause className="h-3 w-3" />
                                 ) : (
                                    <Play className="h-3 w-3" />
                                 )}
                              </button>
                              <button
                                 onClick={() => setSeconds(0)}
                                 className="rounded-full border border-border/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider hover:border-neon-blue/50 hover:text-neon-blue"
                              >
                                 <RotateCcw className="h-3 w-3" />
                              </button>
                           </div>
                        </div>
                     )}

                     <div className="mt-4 flex gap-2">
                        {!isDone && !isActive && (
                           <button
                              onClick={() => startDrill(d.id)}
                              className="btn-neon flex-1 rounded-full py-2 text-[11px] font-bold uppercase tracking-wider"
                           >
                              Start
                           </button>
                        )}
                        {isActive && (
                           <button
                              onClick={() => complete(d.id)}
                              className="btn-neon flex-1 rounded-full py-2 text-[11px] font-bold uppercase tracking-wider"
                           >
                              Complete
                           </button>
                        )}
                        {isDone && (
                           <button
                              onClick={() =>
                                 setDone((p) => ({ ...p, [d.id]: false }))
                              }
                              className="flex-1 rounded-full border border-border/60 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:border-neon-magenta/40 hover:text-neon-magenta"
                           >
                              Reset
                           </button>
                        )}
                     </div>
                  </article>
               );
            })}
         </div>

         {pct === 100 && (
            <div className="glass-strong mt-8 flex items-center gap-4 rounded-2xl p-6">
               <CaptainAvatar size="md" />
               <div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-neon-magenta">
                     <Flame className="h-3 w-3" /> Captain Nova
                  </div>
                  <p className="mt-1 font-display text-lg font-bold text-gradient-neon">
                     "ALL DRILLS DOWN! That's a champion's day. Now go ranked
                     and SHOW it!"
                  </p>
               </div>
            </div>
         )}
      </main>
   );
}

function formatTime(s: number) {
   const m = Math.floor(s / 60);
   const r = s % 60;
   return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
