import { GoogleGenAI } from "@google/genai";

async function findBrands() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "List real brands and partnerships associated with the Rwandan content creator and streamer YungKaalen (Inezaye Hirwa Savior). Also mention his own brand KAYN.",
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  console.log(response.text);
}

findBrands();
