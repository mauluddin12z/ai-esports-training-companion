"use client";

import Image from "next/image";
import captainNova from "@/assets/captain-nova.png";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

interface HeroProps {
   onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
   return (
      <section className="relative overflow-hidden">
         <div aria-hidden className="absolute inset-0 grid-bg" />
         <div
            aria-hidden
            className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-neon-blue/30 blur-[120px]"
         />
         <div
            aria-hidden
            className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-neon-purple/30 blur-[120px]"
         />

         <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col-reverse items-center gap-12 px-6 py-16 lg:flex-row lg:gap-16 lg:py-24">
            {/* TEXT */}
            <div className="flex-1 text-center lg:text-left animate-fade-up">
               <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-neon-cyan">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI Esports Captain
               </div>

               <h1 className="font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
                  Forge the
                  <span className="text-gradient-neon text-glow"> mind </span>
                  of a
                  <br className="hidden sm:block" />
                  champion.
               </h1>

               <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                  Train your mindset. Master your game.
               </p>

               <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground/80 lg:mx-0">
                  Meet Captain Nova — your relentless, never-negative AI coach.
                  Reflect on your matches, drill your weaknesses, and unlock the
                  next rank.
               </p>

               <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <button
                     onClick={onStart}
                     className="btn-neon group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wider"
                  >
                     <Zap className="h-4 w-4" />
                     Start Training
                     <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                     <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
                     </span>
                     Captain Nova is online
                  </div>
               </div>

               <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                  {[
                     { v: "AI-powered", l: "Match analysis" },
                     { v: "Instant", l: "Performance feedback" },
                     { v: "24/7", l: "Coach availability" },
                  ].map((s) => (
                     <div
                        key={s.l}
                        className="glass rounded-xl px-3 py-3 text-center"
                     >
                        <div className="font-display text-xl font-bold text-gradient-neon">
                           {s.v}
                        </div>
                        <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                           {s.l}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* CHARACTER */}
            <div className="flex-1 flex justify-center lg:justify-end">
               <div className="relative">
                  <div
                     aria-hidden
                     className="absolute inset-0 -z-10 animate-pulse-glow rounded-[40%] bg-linear-to-br from-neon-cyan/40 via-neon-blue/30 to-neon-purple/40 blur-3xl"
                  />

                  <div className="absolute -top-4 -left-6 z-10 hidden -rotate-6 rounded-lg border border-neon-cyan/40 bg-background/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-neon-cyan backdrop-blur-md sm:block animate-float">
                     "Let's go win this!"
                  </div>

                  <div className="absolute -bottom-2 -right-2 z-10 hidden rotate-[4deg] rounded-lg border border-neon-purple/40 bg-background/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-neon-purple backdrop-blur-md sm:block animate-float [animation-delay:1.5s]">
                     Mind &gt; Mechanics
                  </div>

                  <Image
                     src={captainNova}
                     alt="Captain Nova esports coach"
                     width={1024}
                     height={1280}
                     className="relative h-105 w-auto object-contain drop-shadow-[0_20px_60px_oklch(0.7_0.22_250/0.5)] sm:h-130 lg:h-150"
                     priority
                  />
               </div>
            </div>
         </div>
      </section>
   );
}
