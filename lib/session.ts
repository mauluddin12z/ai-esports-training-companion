import { useEffect, useState } from "react";

export interface SessionData {
  nickname: string;
  game: string;
  role: string;
  currentCondition: string;
  goal: string;
  createdAt: number;
}

const KEY = "novaforge.session.v1";
const EVT = "novaforge:session-change";

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
  const [session, setSession] = useState<SessionData | null>(() => getSession());
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
