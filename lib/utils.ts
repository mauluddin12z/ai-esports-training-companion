import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function safeJSONParse(text: string) {
   try {
      const cleaned = text
         .replace(/```json/g, "")
         .replace(/```/g, "")
         .trim();

      return JSON.parse(cleaned);
   } catch (err) {
      console.error("JSON parse failed:", text);
      return null;
   }
}
