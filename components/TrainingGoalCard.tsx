"use client";

import { Target, Gamepad2, Trophy, User, Activity } from "lucide-react";
import { useSession } from "@/lib/session";

export function TrainingGoalCard() {
  const session = useSession();
  if (!session) return null;

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-5">
      <div
        aria-hidden
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neon-cyan/20 blur-2xl"
      />
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg border border-neon-cyan/30 bg-neon-cyan/10 p-2 text-neon-cyan">
            <Target className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Pilot
            </div>
            <div className="font-display text-sm font-bold">
              {session.nickname}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Stat
          icon={<Gamepad2 className="h-3.5 w-3.5" />}
          label="Game"
          value={session.game}
        />
        <Stat
          icon={<User className="h-3.5 w-3.5" />}
          label="Role"
          value={session.role}
        />
        <Stat
          icon={<Activity className="h-3.5 w-3.5" />}
          label="Condition"
          value={session.currentCondition}
        />
        <Stat
          icon={<Trophy className="h-3.5 w-3.5" />}
          label="Goal"
          value={session.goal}
          accent
        />
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-2.5 ${accent ? "border-neon-purple/40 bg-neon-purple/10" : "border-border/50 bg-background/30"}`}
    >
      <div className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <div
        className={`mt-1 font-display text-sm font-bold ${accent ? "text-neon-purple" : "text-foreground"}`}
      >
        {value}
      </div>
    </div>
  );
}
