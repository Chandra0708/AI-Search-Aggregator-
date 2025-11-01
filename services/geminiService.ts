import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";
import { type AIResult, type Source, type AIModel, type UploadedFile } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const cleanResponseText = (text: string): string => {
  return text.replace(/[*#]/g, '');
};

async function getSingleResponse(prompt: string, systemInstruction: string, file: UploadedFile | null): Promise<{ text: string, sources: Source[] }> {
  try {
    const parts: any[] = [{ text: prompt }];
    if (file) {
      parts.unshift({
        inlineData: {
          mimeType: file.mimeType,
          data: file.data,
        },
      });
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: parts },
        tools: [{googleSearch: {}}],
        config: {
            systemInstruction: systemInstruction,
        }
    });

    const text = cleanResponseText(response.text);
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const sources: Source[] = groundingChunks
      .filter(chunk => chunk.web && chunk.web.uri && chunk.web.title)
      .map(chunk => ({ uri: chunk.web.uri, title: chunk.web.title }))
      .filter((source, index, self) => index === self.findIndex(s => s.uri === source.uri));
      
    return { text, sources };

  } catch (error) {
    console.error("Error fetching response from Gemini API:", error);
    const errorMessage = `Error: Could not generate a response. ${error instanceof Error ? error.message : 'Unknown error'}`;
    return { text: errorMessage, sources: [] };
  }
}

export const getAiResponses = async (userPrompt: string, modelsToQuery: AIModel[], file: UploadedFile | null): Promise<AIResult[]> => {
  const promises = modelsToQuery.map(model => 
    getSingleResponse(userPrompt, model.systemPrompt, file)
      .then(({ text, sources }) => ({ ...model, response: text, sources, isLoading: false }))
  );

  return Promise.all(promises);
};

async function getSingleImage(prompt: string, model: AIModel): Promise<Partial<AIResult>> {
    try {
        const fullPrompt = `${prompt}. Style influenced by ${model.name}.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: fullPrompt }],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const base64ImageBytes: string = part.inlineData.data;
              const mimeType = part.inlineData.mimeType || 'image/png';
              return { imageUrl: `data:${mimeType};base64,${base64ImageBytes}` };
            }
        }
        throw new Error('Image data not found in response.');

    } catch (error) {
        console.error(`Error generating image for ${model.name}:`, error);
        return { response: `Could not generate image. ${error instanceof Error ? error.message : ''}`, imageUrl: '' };
    }
}

export const getAiImages = async (userPrompt: string, modelsToQuery: AIModel[]): Promise<AIResult[]> => {
    const promises = modelsToQuery.map(model =>
        getSingleImage(userPrompt, model)
            .then(result => ({ ...model, ...result, sources:[], isLoading: false }))
    );
    return Promise.all(promises);
};


export async function getSummary(combinedText: string): Promise<string> {
  const systemInstruction = `You are an expert summarizer. Your task is to read the following text which contains responses from multiple AI models, separated by '---'. Create a single, collated summary of all the information. Your summary should be well-structured, coherent, and easy to read. Crucially, you must cite the source AI model for each piece of information in your summary. For example, "(Source: Gemini)" or "According to ChatGPT, ...".`;
  const prompt = `Here are the responses to summarize:\n\n${combinedText}`;
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
        }
    });
    return cleanResponseText(response.text);
  } catch (error) {
    console.error("Error fetching summary from Gemini API:", error);
    throw new Error(`Could not generate a summary. ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
