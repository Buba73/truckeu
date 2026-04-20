import { GoogleGenerativeAI } from "@google/generative-ai";

let client: GoogleGenerativeAI | null = null;

function getClient() {
  if (!process.env.GEMINI_API_KEY) return null;
  if (!client) client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return client;
}

export async function translateToCzech(text: string): Promise<string> {
  const ai = getClient();
  if (!ai) return text; // bez klíče vrátí originál

  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Přelož následující německý dopravní text do češtiny. Odpověz POUZE přeloženým textem, bez vysvětlení:\n\n${text}`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}
