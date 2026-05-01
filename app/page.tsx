"use client";

import { useRouter } from "next/navigation";
import { Hero } from "@/components/Hero";
import { getSession } from "@/lib/session";

export default function Page() {
  const router = useRouter();

  const handleStart = () => {
    const session = getSession();
    router.push(session ? "/console" : "/onboarding");
  };

  return (
    <main>
      <Hero onStart={handleStart} />
      <footer className="border-t border-border/40 py-8 text-center text-xs text-muted-foreground">
        <span className="font-display uppercase tracking-[0.3em]">
          NovaForge
        </span>{" "}
        — Train the mind. Win the game.
      </footer>
    </main>
  );
}
