
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface DiagnosticInsight {
  summary: string;
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export const getSmartDiagnosis = async (metrics: any): Promise<DiagnosticInsight | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Perform a diagnostic review of the following engine telemetry: ${JSON.stringify(metrics)}. Provide a brief summary, risk level, and actionable recommendations.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            riskLevel: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary", "riskLevel", "recommendations"]
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as DiagnosticInsight;
    }
    return null;
  } catch (error) {
    console.error("Gemini Diagnosis Error:", error);
    return null;
  }
};
