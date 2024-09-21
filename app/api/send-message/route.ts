import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (typeof message !== "string" || message.trim() === "") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ response: text }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/send-message:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}