"use client";

import Link from "next/link";
import { Home, Swords, Dumbbell, Zap, RotateCw } from "lucide-react";
import { clearSession, useInsights, useSession } from "@/lib/session";
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
import { usePathname, useRouter } from "next/navigation";
import { SessionSummary } from "./SessionSummary";
import Image from "next/image";

const links = [
   { to: "/", label: "Home", icon: Home },
   { to: "/console", label: "Console", icon: Swords },
   { to: "/drills", label: "Drills", icon: Dumbbell },
] as const;

export function NavBar() {
   const pathname = usePathname();
   const router = useRouter();
   const session = useSession();
   const insights = useInsights();
   const [confirmOpen, setConfirmOpen] = useState(false);

   function handleNewSessionClick() {
      if (session) {
         setConfirmOpen(true);
         return;
      }
      clearSession();
      router.push("/onboarding");
   }

   function confirmNewSession() {
      clearSession();
      setConfirmOpen(false);
      router.push("/onboarding");
   }

   return (
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
         <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <Link href="/" passHref className="group flex items-center gap-2">
               <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-neon-cyan via-neon-blue to-neon-purple text-background">
                  <Image src="/logo.svg" alt="Logo" width={32} height={32} />
               </span>
               <span className="font-display text-base font-extrabold uppercase tracking-[0.2em] text-gradient-neon">
                  Captain Nova
               </span>
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
               className="btn-neon inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider cursor-pointer"
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
            <AlertDialogContent className="max-h-[85vh] overflow-y-auto border-neon-cyan/30 bg-background/95 backdrop-blur-xl sm:max-w-2xl animate-dialog-in-left">
               <AlertDialogHeader>
                  <AlertDialogTitle className="font-display uppercase tracking-wider text-gradient-neon">
                     Session Recap
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                     Here's how you trained today. Review your recap before
                     forging a new session — all current data will be cleared.
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <SessionSummary session={session} insights={insights} />
               <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">
                     Stay in Session
                  </AlertDialogCancel>
                  <AlertDialogAction
                     onClick={confirmNewSession}
                     className="bg-linear-to-r from-neon-cyan to-neon-blue text-background hover:opacity-90 cursor-pointer"
                  >
                     End & Start New
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </header>
   );
}
