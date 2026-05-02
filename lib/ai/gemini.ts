import axios from "axios";
import { safeJSONParse } from "../utils";

export const IS_DEBUG = process.env.NEXT_PUBLIC_IS_DEBUG === "true";

const gemini = axios.create({
  baseURL:
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash",
  headers: {
    "x-goog-api-key": process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
    "Content-Type": "application/json",
  },
});

export async function callGemini<T>(prompt: unknown): Promise<T> {
  try {
    const response = await gemini.post(":generateContent", {
      contents: [{ parts: [{ text: JSON.stringify(prompt) }] }],
    });

    const text =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";

    return safeJSONParse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to fetch AI response");
  }
}
