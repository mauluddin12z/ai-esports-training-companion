import {
   AlertTriangle,
   Lightbulb,
   Dumbbell,
   Flame,
   Trophy,
} from "lucide-react";
import { getDrills, type SessionData } from "@/lib/session";
import { Insight } from "@/types";

const FAREWELLS = [
   "You showed up, you reflected, you grew. That's the captain's mindset!",
   "Every rep today is a frag tomorrow. Keep that fire burning!",
   "You're not the same player who started this session. Onward!",
   "Champions are forged in reflection. You just leveled up. Let's GO!",
];

export function SessionSummary({
   session,
   insights,
}: {
   session: SessionData | null;
   insights: Insight[];
}) {
   const hasData = insights.length > 0;
   const farewell = FAREWELLS[insights.length % FAREWELLS.length];
   const drills = getDrills();
   const focusDrills = drills.slice(0, 3);

   if (!hasData) {
      return (
         <div className="rounded-xl border border-neon-cyan/20 bg-background/40 p-4 text-sm text-muted-foreground">
            No reflections logged this session. Next time, drop a match recap so
            Captain Nova can break it down with you!
         </div>
      );
   }

   return (
      <div className="space-y-4 text-left">
         {session && (
            <div className="rounded-xl border border-neon-cyan/30 bg-neon-cyan/5 p-3">
               <div className="text-[10px] font-bold uppercase tracking-widest text-neon-cyan">
                  Pilot
               </div>
               <div className="font-display text-sm font-bold text-foreground">
                  {session.nickname} · {session.game} · {session.role}
               </div>
               <div className="mt-1 text-xs text-muted-foreground">
                  Goal: {session.goal}
               </div>
            </div>
         )}

         <Block
            icon={<AlertTriangle className="h-3.5 w-3.5" />}
            label="Mistakes Spotted"
            tone="warn"
         >
            <ul className="space-y-1.5 text-sm text-foreground/90">
               {insights.map((i) => (
                  <li key={`m-${i.id}`} className="leading-snug">
                     • {i.mistake}
                  </li>
               ))}
            </ul>
         </Block>

         <Block
            icon={<Lightbulb className="h-3.5 w-3.5" />}
            label="Key Advice"
            tone="info"
         >
            <ul className="space-y-1.5 text-sm text-foreground/90">
               {insights.map((i) => (
                  <li key={`a-${i.id}`} className="leading-snug">
                     • {i.advice}
                  </li>
               ))}
            </ul>
         </Block>

         <Block
            icon={<Dumbbell className="h-3.5 w-3.5" />}
            label="Focus Drills"
            tone="info"
         >
            <ul className="space-y-1.5 text-sm text-foreground/90">
               {focusDrills.map((d) => (
                  <li key={d.id} className="leading-snug">
                     •{" "}
                     <span className="font-bold text-neon-cyan">{d.title}</span>{" "}
                     ({d.time}) — {d.desc}
                  </li>
               ))}
            </ul>
         </Block>

         <div className="rounded-xl border border-neon-purple/40 bg-linear-to-br from-neon-purple/15 via-neon-blue/10 to-neon-cyan/10 p-4">
            <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neon-magenta">
               <Flame className="h-3.5 w-3.5" />
               Captain's Send-Off
            </div>
            <p className="font-display text-base font-bold leading-snug text-gradient-neon text-glow">
               "{farewell}"
            </p>
         </div>

         <div className="flex items-center gap-2 rounded-xl border border-neon-cyan/20 bg-background/40 p-3 text-xs text-muted-foreground">
            <Trophy className="h-4 w-4 text-neon-cyan" />
            Reflections analyzed this session:{" "}
            <span className="font-bold text-foreground">{insights.length}</span>
         </div>
      </div>
   );
}

function Block({
   icon,
   label,
   tone,
   children,
}: {
   icon: React.ReactNode;
   label: string;
   tone: "warn" | "info";
   children: React.ReactNode;
}) {
   const toneClass = tone === "warn" ? "text-neon-magenta" : "text-neon-cyan";
   return (
      <div className="rounded-xl border border-border/40 bg-background/40 p-3">
         <div
            className={`mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] ${toneClass}`}
         >
            {icon} {label}
         </div>
         {children}
      </div>
   );
}
