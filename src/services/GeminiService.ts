import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const DEMO_RESPONSES: Record<string, string> = {
  "default": "I am your Election Assistant. I can help you with voter registration, understanding your rights, and finding polling stations. How can I assist you today?",
  "registration": "To register as a voter in India, you need to be 18+ and a resident of the constituency. You can apply online through the NVSP portal (voterportal.eci.gov.in) using Form 6.",
  "id": "Besides the Voter ID (EPIC), you can use 12 alternative photo identity documents like Aadhar Card, PAN Card, Driving License, or Passport to cast your vote.",
  "station": "Polling stations are usually within 2km of your residence. You can find yours on the Voter Helpline app or the ECI website using your EPIC number."
};

/**
 * Interacts with the @google/generative-ai SDK to provide intelligent responses.
 * Uses the 'gemini-1.5-flash' model for fast, context-aware answers.
 * 
 * @param {string} prompt - The user's query regarding elections.
 * @returns {Promise<string>} The AI-generated response.
 */
export const chatWithGemini = async (prompt: string): Promise<string> => {
  if (!genAI) {
    // Security: Explicit logging for missing credentials (Fail-safe)
    console.warn("SECURITY WARNING: VITE_GEMINI_API_KEY is not defined in environment variables. Falling back to Demo Mode.");
    // Demo Mode logic: search for keywords
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes("regis")) return DEMO_RESPONSES.registration;
    if (lowerPrompt.includes("id") || lowerPrompt.includes("card")) return DEMO_RESPONSES.id;
    if (lowerPrompt.includes("station") || lowerPrompt.includes("where")) return DEMO_RESPONSES.station;
    return "I'm in Demo Mode (No API Key). Try asking about 'registration', 'ID cards', or 'polling stations'!";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `You are a helpful and authoritative Election Assistant for India. Answer the following user query accurately and concisely: ${prompt}` }] }],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });
    const response = await result.response;
    return response.text();
  } catch (error: unknown) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my brain. Please try again or check your connection.";
  }
};
