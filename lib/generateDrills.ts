import { Drill, DrillInput } from "@/types";
import axios from "axios";
import { safeJSONParse } from "./utils";

const IS_DEBUG = process.env.NEXT_PUBLIC_IS_DEBUG === "true";

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

   const prompt = {
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
      input: {
         game,
         role,
         mistake,
         advice,
      },
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
