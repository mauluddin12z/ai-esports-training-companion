"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

interface Props {
  onSubmit: (text: string) => void;
  loading: boolean;
}

export function MatchReflection({ onSubmit, loading }: Props) {
  const [text, setText] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!text.trim() || loading) return;
        onSubmit(text.trim());
        setText("");
      }}
      className="glass-strong relative overflow-hidden rounded-2xl p-4"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linar-to-r from-transparent via-neon-blue to-transparent"
      />
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-neon-cyan">
        Match Reflection
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Describe your last match or what went wrong..."
        className="w-full resize-none rounded-lg border border-border/60 bg-input/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-neon-cyan/60 focus:outline-none focus:ring-2 focus:ring-neon-cyan/25"
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          {loading ? (
            <span className="inline-flex items-center gap-2 text-neon-cyan">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Captain Nova is analyzing your gameplay
              <span className="inline-block w-3 after:content-[''] after:animate-dots" />
            </span>
          ) : (
            "Be honest. Specific = better feedback."
          )}
        </p>
        <button
          type="submit"
          disabled={!text.trim() || loading}
          className="btn-neon inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-3.5 w-3.5" />
          Analyze My Game
        </button>
      </div>
    </form>
  );
}
