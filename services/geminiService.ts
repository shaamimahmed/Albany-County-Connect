
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

interface AnalysisResult {
    description: string;
    department: string;
}

export const analyzeIssueImage = async (base64Image: string, mimeType: string): Promise<AnalysisResult> => {
  try {
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    };

    const textPart = {
        text: `Analyze the issue in this image from a citizen of Albany County, NY. 
        1. Briefly describe the issue in one sentence (e.g., "Large pothole on a residential street.").
        2. Suggest the most relevant municipal department to handle this issue (e.g., "Public Works", "Traffic Engineering", "Parks and Recreation").
        Provide the response in the specified JSON format.`
    };
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    description: {
                        type: Type.STRING,
                        description: 'A brief description of the issue shown in the image.',
                    },
                    department: {
                        type: Type.STRING,
                        description: 'The suggested municipal department to handle the issue.',
                    },
                },
                required: ["description", "department"],
            }
        }
    });

    const jsonString = response.text;
    const result: AnalysisResult = JSON.parse(jsonString);
    
    return result;

  } catch (error) {
    console.error("Error analyzing image with Gemini API:", error);
    throw new Error("Failed to analyze image. The AI service may be unavailable.");
  }
};
