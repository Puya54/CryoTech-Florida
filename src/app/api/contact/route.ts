import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Basic server-side validation (in a real app, you could run Zod again here)
    if (!data) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    // Only forward to webhook if it exists
    if (siteConfig.webhookUrl) {
      const response = await fetch(siteConfig.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "CryoTech Florida Website" }),
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with status ${response.status}`);
      }
    } else {
      console.log("No webhook configured. Received data:", data);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
