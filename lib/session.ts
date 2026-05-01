import { Drill, Insight } from "@/types";
import { useEffect, useState } from "react";

export interface SessionData {
   nickname: string;
   game: string;
   rank: string;
   role: string;
   currentCondition: string;
   goal: string;
   createdAt: number;
}

const KEY = "novaforge.session.v1";
const INSIGHTS_KEY = "novaforge.insights.v1";
const DRILLS_KEY = "novaforge.drills.v1";
const EVT = "novaforge:session-change";
const INSIGHTS_EVT = "novaforge:insights-change";
const DRILLS_EVT = "novaforge:drills-change";

export function getSession(): SessionData | null {
   if (typeof window === "undefined") return null;
   try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as SessionData) : null;
   } catch {
      return null;
   }
}

export function saveSession(data: Omit<SessionData, "createdAt">) {
   if (typeof window === "undefined") return;
   const full: SessionData = { ...data, createdAt: Date.now() };
   localStorage.setItem(KEY, JSON.stringify(full));
   window.dispatchEvent(new Event(EVT));
}

export function clearSession() {
   if (typeof window === "undefined") return;
   // Clear everything namespaced to the app, not just the session blob.
   Object.keys(localStorage)
      .filter((k) => k.startsWith("novaforge."))
      .forEach((k) => localStorage.removeItem(k));
   window.dispatchEvent(new Event(EVT));
}

export function useSession() {
   const [session, setSession] = useState<SessionData | null>(() =>
      getSession(),
   );
   useEffect(() => {
      const update = () => setSession(getSession());
      update();
      window.addEventListener(EVT, update);
      window.addEventListener("storage", update);
      return () => {
         window.removeEventListener(EVT, update);
         window.removeEventListener("storage", update);
      };
   }, []);
   return session;
}

export function getInsights(): Insight[] {
   if (typeof window === "undefined") return [];
   try {
      const raw = localStorage.getItem(INSIGHTS_KEY);
      return raw ? (JSON.parse(raw) as Insight[]) : [];
   } catch {
      return [];
   }
}

export function saveInsights(insights: Insight[]) {
   if (typeof window === "undefined") return;
   localStorage.setItem(INSIGHTS_KEY, JSON.stringify(insights));
   window.dispatchEvent(new Event(INSIGHTS_EVT));
}

export function useInsights() {
   const [insights, setInsights] = useState<Insight[]>(() => getInsights());
   useEffect(() => {
      const update = () => setInsights(getInsights());
      update();
      window.addEventListener(INSIGHTS_EVT, update);
      window.addEventListener("storage", update);
      return () => {
         window.removeEventListener(INSIGHTS_EVT, update);
         window.removeEventListener("storage", update);
      };
   }, []);
   return insights;
}

export function getDrills(): Drill[] {
   if (typeof window === "undefined") return [];
   try {
      const raw = localStorage.getItem(DRILLS_KEY);
      return raw ? (JSON.parse(raw) as Drill[]) : [];
   } catch {
      return [];
   }
}

export function saveDrills(drills: Drill[]) {
   if (typeof window === "undefined") return;
   localStorage.setItem(DRILLS_KEY, JSON.stringify(drills));
   window.dispatchEvent(new Event(DRILLS_EVT));
}

export function useDrills() {
   const [drills, setDrills] = useState<Drill[]>(() => getDrills());
   useEffect(() => {
      const update = () => setDrills(getDrills());
      update();
      window.addEventListener(DRILLS_EVT, update);
      window.addEventListener("storage", update);
      return () => {
         window.removeEventListener(DRILLS_EVT, update);
         window.removeEventListener("storage", update);
      };
   }, []);
   return drills;
}
