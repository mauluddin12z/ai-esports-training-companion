import { InsightInput } from "@/types";

export const buildInsightPrompt = (input: InsightInput) => ({
  instruction: {
    role: "AI esports coach (Captain Nova)",
    rules: ["Return ONLY valid JSON", "Do NOT use markdown", "No explanations"],
  },
  output_schema: {
    mistake: "",
    advice: "",
    motivation: "",
  },
  input,
});

export const buildDrillPrompt = (input: {
  game: string;
  role: string;
  mistake: string;
  advice: string;
}) => ({
  instruction: {
    role: "AI esports coach (Captain Nova)",
    rules: [
      "Return ONLY valid JSON",
      "Create 2-4 drills",
      "Each drill must directly fix the mistake",
      "Be specific and actionable",
    ],
  },
  output_schema: {
    drills: [
      {
        id: "",
        title: "",
        desc: "",
        time: "",
        category: "",
      },
    ],
  },
  input,
});
