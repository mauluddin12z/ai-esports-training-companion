import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeJSONParse<T>(text: string): T {
  try {
    const cleaned = text
      .replace(/```[\s\S]*?```/g, (match) => match.replace(/```json|```/g, ""))
      .replace(/^[^{[]*/, "")
      .replace(/[^}\]]*$/, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    console.error("JSON parse failed:", text);
    throw new Error("Invalid JSON from AI");
  }
}
