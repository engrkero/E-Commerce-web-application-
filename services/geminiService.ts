import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { PRODUCTS } from '../constants';

const SYSTEM_INSTRUCTION = `
You are Kero, the expert fashion stylist and sales assistant for KEROLUXE ONLINE STORE. 
Your goal is to help customers find clothes, perfumes, or wholesale bales from our specific inventory.
Always be polite, trendy, and helpful.

Here is our current Product Inventory:
${JSON.stringify(PRODUCTS.map(p => ({ 
  id: p.id, 
  name: p.name, 
  category: p.category, 
  price: p.price, 
  desc: p.description,
  sizes: p.sizes,
  colors: p.colors
})))}

Rules:
1. ONLY suggest items from the inventory list above.
2. If a user asks for something we don't have, politely suggest a similar alternative from our inventory.
3. Mention prices in Naira (₦).
4. Highlights that we sell both retail and wholesale bales.
5. Keep responses concise (under 100 words) unless asked for detailed advice.
6. If asked about shipping, remind them: ₦3,000 within Calabar, ₦5,000-₦10,000 outside Calabar. Shipping is paid on delivery.
7. Use the provided user context (cart items, wishlist) to make personalized recommendations.
`;

let chatSession: Chat | null = null;

export const initializeChat = () => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  } catch (error) {
    console.error("Failed to initialize Gemini:", error);
  }
};

export const sendMessageToGemini = async (message: string, context?: string): Promise<string> => {
  if (!chatSession) {
    initializeChat();
  }
  
  if (!chatSession) {
    return "I'm having trouble connecting to the styling service right now. Please check your internet connection and try again.";
  }

  try {
    // Inject context into the message if provided
    const prompt = context 
      ? `CONTEXT INFO:\n${context}\n\nUSER MESSAGE:\n${message}`
      : message;

    const response: GenerateContentResponse = await chatSession.sendMessage({ message: prompt });
    return response.text || "I didn't catch that. Could you rephrase?";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    
    // Improved Error Handling
    const errStr = error.toString().toLowerCase();
    
    if (errStr.includes("api key")) {
        return "I'm currently undergoing maintenance (API Key Issue). Please try again later.";
    } else if (errStr.includes("quota") || errStr.includes("429")) {
        return "I'm extremely popular right now! Please give me a minute to catch my breath and try again.";
    } else if (errStr.includes("network") || errStr.includes("fetch")) {
        return "I'm having trouble reaching the server. Please check your internet connection.";
    } else if (errStr.includes("safety") || errStr.includes("blocked")) {
        return "I can't respond to that specific request due to my safety guidelines. Can we discuss something else about fashion?";
    }

    return "I encountered a glitch in my system. Please try asking your question again.";
  }
};