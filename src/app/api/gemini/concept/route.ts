import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const CONCEPT_SYSTEM_PROMPT = `You are a visual concept generator for educational vocabulary flashcards.
Your task is to create a 1-2 sentence visual description of how to represent a vocabulary word as an image.

Rules:
1. Focus ONLY on the visual concept - what should be shown in the image
2. Do NOT include any style information (colors, art style, etc.)
3. Make the concept clear, simple, and instantly recognizable
4. For concrete nouns: describe the object in its most recognizable form
5. For action verbs: describe a person performing the action mid-motion
6. For abstract concepts: use a visual metaphor with a person experiencing it
7. For adjectives: show comparison or contrast
8. For prepositions: show two simple objects demonstrating the spatial relationship

Output ONLY the visual concept, nothing else.`;

export async function POST(request: NextRequest) {
  try {
    const { apiKey, word, contextHint } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is required" },
        { status: 400 }
      );
    }

    if (!word) {
      return NextResponse.json(
        { error: "Word is required" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: CONCEPT_SYSTEM_PROMPT,
    });

    let prompt = `Generate a visual concept for the vocabulary word: "${word}"`;
    if (contextHint) {
      prompt += `\nContext hint: ${contextHint}`;
    }

    const result = await model.generateContent(prompt);
    const concept = result.response.text().trim();

    return NextResponse.json({ concept });
  } catch (error) {
    console.error("Concept generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate concept" },
      { status: 500 }
    );
  }
}
