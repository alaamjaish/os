import { NextRequest, NextResponse } from "next/server";
import { STYLES } from "@/lib/constants/styles";
import { MOODS } from "@/lib/constants/moods";
import { BACKGROUNDS } from "@/lib/constants/backgrounds";
import { COMPOSITIONS } from "@/lib/constants/compositions";

function buildPrompt(
  concept: string,
  style: string,
  mood: string,
  background: string,
  composition: string,
  textOption: string,
  colorOption: string
): string {
  const parts: string[] = [];

  // 1. Style description
  const styleDesc = STYLES[style]?.description;
  if (styleDesc) parts.push(styleDesc);

  // 2. Subject/concept from AI
  parts.push(concept);

  // 3. Educational context
  parts.push("Educational vocabulary flashcard illustration.");

  // 4. Mood/colors
  const moodDesc = MOODS[mood]?.description;
  if (moodDesc) parts.push(moodDesc);

  // 5. Composition
  const compDesc = COMPOSITIONS[composition]?.description;
  if (compDesc) parts.push(compDesc);

  // 6. Background
  const bgDesc = BACKGROUNDS[background]?.description;
  if (bgDesc) parts.push(bgDesc);

  // 7. Color scheme override
  if (colorOption === "brand-colors") {
    parts.push(
      "Use teal (#00ADB5) as primary color and orange (#FF7E36) as accent color."
    );
  }

  // 8. Text instruction (CRITICAL - last for emphasis)
  if (textOption === "no-text") {
    parts.push(
      "IMPORTANT: Do NOT include any text, letters, words, numbers, or writing in the image."
    );
  } else if (textOption === "english-label") {
    parts.push(
      "Include a clear, readable English text label of the word prominently displayed."
    );
  } else if (textOption === "arabic-label") {
    parts.push(
      "Include a clear, readable Arabic text label using Arabic script."
    );
  }

  return parts.join(" ");
}

export async function POST(request: NextRequest) {
  try {
    const {
      apiKey,
      concept,
      word,
      style,
      mood,
      background,
      composition,
      textOption,
      colorOption,
      aspectRatio,
    } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is required" },
        { status: 400 }
      );
    }

    if (!concept || !word) {
      return NextResponse.json(
        { error: "Concept and word are required" },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(
      concept,
      style,
      mood,
      background,
      composition,
      textOption,
      colorOption
    );

    // Use Nano Banana Pro (gemini-3-pro-image-preview)
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          imageConfig: {
            aspectRatio: aspectRatio || "1:1",
            imageSize: "2K",
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Nano Banana Pro API error:", errorData);
      return NextResponse.json(
        { error: errorData.error?.message || "Image generation failed" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Check if response contains an image
    if (data.candidates && data.candidates[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return NextResponse.json({
            imageBase64: part.inlineData.data,
            prompt,
          });
        }
      }
    }

    // If no image in response, return error with details
    console.error("No image in response:", JSON.stringify(data, null, 2));
    return NextResponse.json(
      { error: "No image generated in response", details: data },
      { status: 500 }
    );
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate image", details: String(error) },
      { status: 500 }
    );
  }
}
