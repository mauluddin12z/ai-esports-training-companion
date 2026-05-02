import { Drill, DrillInput } from "@/types";
import { callGemini, IS_DEBUG } from "./gemini";
import { buildDrillPrompt } from "./prompts";

type DrillResponse = {
  drills: Drill[];
};

export async function generateDrills(input: DrillInput): Promise<Drill[]> {
  const { game, role, mistake, advice } = input;

  if (IS_DEBUG) {
    return [
      {
        id: "aim1",
        title: "Controlled Engagement Drill",
        desc: "Play 3 matches focusing only on disciplined fights.",
        time: "15 min",
        category: "Decision Making",
      },
      {
        id: "aim2",
        title: "Angle Discipline",
        desc: "Hold positions without peeking first.",
        time: "10 min",
        category: "Game Sense",
      },
    ];
  }

  const prompt = buildDrillPrompt({ game, role, mistake, advice });
  const res = await callGemini<DrillResponse>(prompt);

  return res?.drills ?? [];
}
