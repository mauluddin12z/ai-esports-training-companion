"use client";

import Link from "next/link";
import { Home, Swords, Dumbbell, Zap, RotateCw } from "lucide-react";
import { clearSession, useSession } from "@/lib/session";
import { useState } from "react";
import {
   AlertDialog,
   AlertDialogContent,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogCancel,
   AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { usePathname } from "next/navigation";

const links = [
   { to: "/", label: "Home", icon: Home },
   { to: "/dashboard", label: "Console", icon: Swords },
   { to: "/drills", label: "Drills", icon: Dumbbell },
] as const;

export function NavBar() {
   const pathname = usePathname();
   const session = useSession();
   const [confirmOpen, setConfirmOpen] = useState(false);

   function handleNewSessionClick() {
      if (session) {
         setConfirmOpen(true);
         return;
      }
      clearSession();
      // Use Next.js navigate for routing
      window.location.href = "/onboarding";
   }

   function confirmNewSession() {
      clearSession();
      setConfirmOpen(false);
      // Use Next.js navigate for routing
      window.location.href = "/onboarding";
   }

   return (
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
         <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <Link href="/" passHref>
               <div className="group flex items-center gap-2">
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-neon-cyan via-neon-blue to-neon-purple text-background">
                     <Zap className="h-4 w-4" />
                  </span>
                  <span className="font-display text-base font-extrabold uppercase tracking-[0.2em] text-gradient-neon">
                     NovaForge
                  </span>
               </div>
            </Link>
            <ul className="hidden items-center gap-1 md:flex">
               {links.map((l) => {
                  const Icon = l.icon;
                  const active = pathname === l.to;
                  return (
                     <li key={l.to}>
                        <Link href={l.to} passHref>
                           <div
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                                 active
                                    ? "border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan"
                                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                              }`}
                           >
                              <Icon className="h-3.5 w-3.5" />
                              {l.label}
                           </div>
                        </Link>
                     </li>
                  );
               })}
            </ul>
            <button
               onClick={handleNewSessionClick}
               className="btn-neon inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider"
            >
               <RotateCw className="h-3.5 w-3.5" />
               New Session
            </button>
         </nav>
         <ul className="flex items-center justify-around border-t border-border/40 bg-background/40 px-2 py-1.5 md:hidden">
            {links.map((l) => {
               const Icon = l.icon;
               const active = pathname === l.to;
               return (
                  <li key={l.to}>
                     <Link href={l.to} passHref>
                        <div
                           className={`flex flex-col items-center gap-0.5 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                              active
                                 ? "text-neon-cyan"
                                 : "text-muted-foreground"
                           }`}
                        >
                           <Icon className="h-4 w-4" />
                           {l.label}
                        </div>
                     </Link>
                  </li>
               );
            })}
         </ul>
         <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <AlertDialogContent className="border-neon-cyan/30 bg-background/95 backdrop-blur-xl">
               <AlertDialogHeader>
                  <AlertDialogTitle className="font-display uppercase tracking-wider text-gradient-neon">
                     Forge a new session?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                     This will clear your current pilot data, reflections, and
                     drill progress. Captain Nova will greet you fresh from the
                     onboarding deck.
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel>Stay in Session</AlertDialogCancel>
                  <AlertDialogAction
                     onClick={confirmNewSession}
                     className="bg-linear-to-r from-neon-cyan to-neon-blue text-background hover:opacity-90"
                  >
                     Reset & Restart
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </header>
   );
}
