import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are the virtual assistant for CryoTech Florida, a premier HVAC, refrigeration, and automotive AC company in Miami-Dade County.

Key facts:
- Services: Residential AC repair & installation, Commercial refrigeration (walk-in coolers/freezers), Automotive AC (R-134a and R-1234yf), 24/7 emergency service.
- Phone: (305) 555-0100
- Address: 1234 NW 36th St, Miami, FL 33142
- Certifications: EPA 608, NATE Certified, ACCA member, Miami-Dade Licensed
- Guarantee: "Cold Air. Guaranteed." — all work backed by written warranty.
- Response times: Same-day for residential, under 4 hours for commercial emergencies.

Rules:
- Always respond in the same language the user is writing in (Spanish or English).
- Keep answers concise (under 80 words).
- If the user asks to schedule or needs urgent help, always provide the phone number.
- Be friendly, professional, and helpful.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Filter to only user/assistant messages (skip the welcome message if role is unrecognized)
    // Gemini expects alternating user/model turns
    const chatHistory = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(0, -1) // all but last (last is the new user message)
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== "user") {
      return NextResponse.json({ error: "Last message must be from user" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Graceful fallback when no key is configured
      return NextResponse.json({
        reply: "Para hablar con un especialista, llámanos al (305) 555-0100 o escríbenos por WhatsApp. ¡Estamos disponibles 24/7!",
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(lastMessage.content);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "Lo siento, tuve un problema al procesar tu consulta. Llámanos directamente al (305) 555-0100." },
      { status: 200 } // return 200 so the UI shows the fallback message
    );
  }
}
