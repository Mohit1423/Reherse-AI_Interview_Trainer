import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API });

async function create_content(content,use_model) {
  const response = await ai.models.generateContent({
    model: use_model || "gemini-2.0-flash",
    contents: content,
  });
  return response.text
}

export default create_content