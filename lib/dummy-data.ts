export interface SessionInsight {
  id: string;
  reflection: string;
  mistake: string;
  advice: string;
  motivation: string;
}

const motivations = [
  "Champions don't chase frags — they architect them. Own the tempo!",
  "Every loss is data. You just leveled up your awareness — keep stacking!",
  "The mind that reflects is the mind that climbs. You're already winning.",
  "Sharper than yesterday. Slower than tomorrow. Lock in!",
  "You showed up. That's already top 1% behavior. Now finish the rep!",
];

const mistakeTemplates = [
  "You over-extended after a successful trade — that adrenaline peek cost your team utility and tempo.",
  "Your crosshair placement dropped under pressure. You were aiming where enemies WERE, not where they'd appear.",
  "You took a fight without confirming your trade buddy's position — that's a coin-flip duel, not a strategic engagement.",
  "Comms went quiet right when info mattered most. Silence in a clutch = lost rounds.",
];

const adviceTemplates = [
  "Force a 3-second reset after every kill: minimap, utility check, then re-engage. Bind a calm-breath cue.",
  "Run 10 minutes of pre-aim drills daily. Walk the map and pre-aim every common angle until it's muscle memory.",
  "Before any peek, ask out loud: 'Who trades me?' If the answer isn't a name in 2s, don't take the fight.",
  "Set a comms minimum: one callout per round, even just 'rotating B' or 'one mid'. Build the habit.",
];

export function generateInsight(
  reflection: string,
): Omit<SessionInsight, "id"> {
  const seed = reflection.length;
  return {
    reflection,
    mistake: mistakeTemplates[seed % mistakeTemplates.length],
    advice: adviceTemplates[seed % adviceTemplates.length],
    motivation: motivations[seed % motivations.length],
  };
}

export const DAILY_DRILLS = [
  {
    id: "aim",
    title: "Aim Training",
    time: "20 min",
    desc: "Kovaak's gridshot + tracking",
    category: "Mechanics",
  },
  {
    id: "vod",
    title: "VOD Review",
    time: "30 min",
    desc: "Last loss with timestamps",
    category: "Game Sense",
  },
  {
    id: "focus",
    title: "Mental Focus",
    time: "10 min",
    desc: "Box breathing + visualization",
    category: "Mind",
  },
  {
    id: "warmup",
    title: "Ranked Warmup",
    time: "1 match",
    desc: "Low-stakes, high-intent play",
    category: "Performance",
  },
  {
    id: "stretch",
    title: "Wrist & Posture",
    time: "5 min",
    desc: "Stay sharp, stay healthy",
    category: "Body",
  },
] as const;
