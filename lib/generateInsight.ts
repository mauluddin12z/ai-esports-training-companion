import axios from "axios";
import { safeJSONParse } from "./utils";

const IS_DEBUG = process.env.NEXT_PUBLIC_IS_DEBUG === "true";

export type InsightInput = {
   game: string;
   rank: string;
   role: string;
   currentCondition: string;
   goal: string;
   reflection: string;
};

export type InsightOutput = {
   mistake: string;
   advice: string;
   motivation: string;
};

export async function generateInsight(
   input: InsightInput,
): Promise<InsightOutput> {
   const { game, rank, role, currentCondition, goal, reflection } = input;

   if (!game || !rank || !role || !currentCondition || !goal || !reflection) {
      throw new Error("Missing required fields");
   }

   if (IS_DEBUG) {
      return {
         mistake: "You're hesitating in key fights and not committing.",
         advice: "Commit faster and trust your positioning.",
         motivation: "You're close—just tighten decision-making.",
      };
   }

   const prompt = {
      instruction: {
         role: "AI esports coach (Captain Nova)",
         rules: [
            "Return ONLY valid JSON",
            "Do NOT use markdown",
            "No explanations",
         ],
      },
      output_schema: {
         mistake: "",
         advice: "",
         motivation: "",
      },
      input,
   };

   const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
         contents: [{ parts: [{ text: JSON.stringify(prompt) }] }],
      },
      {
         headers: {
            "x-goog-api-key": process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
            "Content-Type": "application/json",
         },
      },
   );

   const text =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";

   return safeJSONParse(text);
}
