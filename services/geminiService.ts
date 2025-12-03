import { GoogleGenAI, Type } from "@google/genai";
import { GardenPreferences, GardenDesign, GenerationResult } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateGarden = async (prefs: GardenPreferences): Promise<GenerationResult> => {
  const ai = getAiClient();

  // 1. Prepare Prompts
  const baseContext = `
    Design a garden with the following specifications:
    Style: ${prefs.style}
    Size: ${prefs.size}
    Sunlight Condition: ${prefs.sunlight}
    Climate/Location: ${prefs.climateZone}
    User Notes: ${prefs.notes}
  `;

  // 2. Define Schema for structured text output
  const designSchema = {
    type: Type.OBJECT,
    properties: {
      layoutTitle: { type: Type.STRING, description: "A creative and evocative title for this garden design" },
      layoutDescription: { type: Type.STRING, description: "A detailed paragraph describing the layout, features, and flow of the garden." },
      atmosphere: { type: Type.STRING, description: "A short phrase describing the mood (e.g., 'Serene and meditative')." },
      colorPalette: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "List of 3-5 dominant colors in this design (e.g. 'Sage Green', 'Lavender')."
      },
      maintenanceTips: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "3-5 key maintenance tips specific to this design and plant selection."
      },
      plants: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            scientificName: { type: Type.STRING },
            description: { type: Type.STRING, description: "Why this plant fits the design." },
            careLevel: { type: Type.STRING, enum: ['Easy', 'Moderate', 'Difficult'] },
            sunNeeds: { type: Type.STRING },
            waterNeeds: { type: Type.STRING }
          },
          required: ["name", "description", "careLevel"]
        }
      }
    },
    required: ["layoutTitle", "layoutDescription", "atmosphere", "plants", "maintenanceTips", "colorPalette"]
  };

  // 3. Execute parallel requests: Text Data & Image Generation
  
  // Task A: Generate Data
  const textPromise = ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `You are an expert landscape architect. ${baseContext}. Please provide a detailed design plan in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: designSchema,
      temperature: 0.7,
    }
  });

  // Task B: Generate Image
  // Construct a vivid prompt for the image model
  const imagePrompt = `
    A professional, photorealistic architectural visualization of a ${prefs.style} garden.
    Viewpoint: Eye-level or slightly elevated perspective looking into the garden.
    Conditions: ${prefs.sunlight} lighting, ${prefs.climateZone} environment.
    Features: ${prefs.notes}.
    The garden size is ${prefs.size}.
    High resolution, lush vegetation, detailed textures, cinematic lighting.
    The image should perfectly capture the essence of a ${prefs.style} garden.
  `;

  const imagePromise = ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: imagePrompt }]
    }
  });

  try {
    const [textResponse, imageResponse] = await Promise.all([textPromise, imagePromise]);

    // Parse Text
    const designJson = textResponse.text;
    if (!designJson) throw new Error("No text response received from Gemini.");
    const designData = JSON.parse(designJson) as GardenDesign;

    // Parse Image
    let imageUrl = "";
    // We expect the image model to return data inline. 
    // We iterate to find the inlineData or check generatedImages if using imagen (but we are using flash-image here)
    // Flash-image returns base64 in inlineData typically.
    const imagePart = imageResponse.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    
    if (imagePart && imagePart.inlineData) {
        imageUrl = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
    } else {
        // Fallback placeholder if generation fails but text succeeds
        imageUrl = "https://picsum.photos/800/600?garden"; 
        console.warn("Image generation failed to provide inline data, using placeholder.");
    }

    return {
      design: designData,
      imageUrl: imageUrl
    };

  } catch (error) {
    console.error("Error generating garden design:", error);
    throw error;
  }
};
