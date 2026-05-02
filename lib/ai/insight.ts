import { InsightInput, InsightOutput } from "@/types";
import { callGemini, IS_DEBUG } from "./gemini";
import { buildInsightPrompt } from "./prompts";

export async function generateInsight(
  input: InsightInput,
): Promise<InsightOutput> {
  if (Object.values(input).some((v) => !v)) {
    throw new Error("Missing required fields");
  }

  if (IS_DEBUG) {
    return {
      mistake: "You're hesitating in key fights and not committing.",
      advice: "Commit faster and trust your positioning.",
      motivation: "You're close—just tighten decision-making.",
    };
  }

  const prompt = buildInsightPrompt(input);
  return callGemini<InsightOutput>(prompt);
}
