import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { PRODUCTS } from "../constants";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are the "Master Builder" AI assistant for "Bricks Toy", a premium toy store in Bangladesh.
Your goal is to help parents and collectors find the perfect product from our catalog.
Be enthusiastic, playful, and helpful. Use emojis! 🧱🚀

Here is our current product catalog:
${JSON.stringify(PRODUCTS.map(p => `${p.name} (৳${p.price}, Ages ${p.age}, ${p.category})`))}

Rules:
1. ONLY recommend products from the list above.
2. ALWAYS use Bangladeshi Taka (৳) for prices. Never use USD ($).
3. If asked about a product we don't have, politely suggest a similar category we do have.
4. Keep responses concise (under 100 words) unless asked for a detailed comparison.
5. Ask follow-up questions to narrow down the perfect gift (e.g., "Is this for a toddler or a big kid?", "Do they like Space or Superheroes?").
`;

export const initializeChat = async () => {
  try {
    // Fix: Use process.env.API_KEY directly in the constructor as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to init chat", error);
    return null;
  }
};

export const sendMessageToGemini = async function* (message: string) {
  if (!chatSession) {
    await initializeChat();
  }

  if (!chatSession) {
    yield "I'm having trouble connecting to the Master Builder network right now. Please try again later! 🛠️";
    return;
  }

  try {
    const result = await chatSession.sendMessageStream({ message });
    for await (const chunk of result) {
      // Fix: Cast chunk to GenerateContentResponse and use .text property safely
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        yield c.text;
      }
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    yield "Oops! A piece went missing. Please try asking again. 🧩";
    // Re-initialize for next time in case of session error
    chatSession = null;
  }
};