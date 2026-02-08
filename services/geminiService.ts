
import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI client with the API key from environment variables.
// The API_KEY is provided via the execution context.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a heartfelt love message based on a specific mood.
 * Uses gemini-3-flash-preview for quick and evocative text generation.
 */
export async function generateLoveMessage(mood: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, beautiful, and ${mood} love message for my partner. Keep it poetic, heartfelt, and sincere.`,
    });
    return response.text || "My love for you is beyond words.";
  } catch (error) {
    console.error("Error generating love message:", error);
    return "Even when words fail, my heart still beats for you.";
  }
}

/**
 * Vividly describes a future scenario based on a prompt or idea.
 * Uses gemini-3-pro-preview for more complex, creative, and detailed storytelling.
 */
export async function imagineFuture(idea: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Imagine a future scenario for a couple based on this idea: "${idea}". Describe it in a romantic, detailed, and vivid way, painting a beautiful picture of their life and shared happiness.`,
    });
    return response.text || "The future we build together will be our greatest adventure.";
  } catch (error) {
    console.error("Error imagining future:", error);
    return "Every dream I have for the future features you by my side.";
  }
}
