import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is required" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Simple test prompt
    const result = await model.generateContent("Say 'API key is valid' in 3 words or less.");
    const response = result.response.text();

    if (response) {
      return NextResponse.json({ success: true, message: response });
    } else {
      return NextResponse.json(
        { error: "No response from API" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API key test error:", error);
    return NextResponse.json(
      { error: "API key is invalid or not working" },
      { status: 401 }
    );
  }
}
