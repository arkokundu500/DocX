import { OpenRouter } from "@openrouter/sdk";

const DEFAULT_MODEL = "deepseek/deepseek-v4-flash-0731";

function getClient() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not configured");
  return new OpenRouter({
    apiKey,
    appTitle: "DocX Healthcare",
    httpReferer: process.env.NEXT_PUBLIC_APP_URL || undefined,
  });
}

function contentToText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => (typeof part === "string" ? part : typeof part === "object" && part && "text" in part ? String(part.text) : ""))
      .join("")
      .trim();
  }
  return "";
}

export async function askDocxAssistant(message: string) {
  const client = getClient();
  const stream = await client.chat.send({
    chatRequest: {
      model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
      stream: true,
      messages: [
      {
        role: "system",
        content: "You are DocX Assistant, a calm healthcare navigation assistant. Help users find the right specialty, hospital, or next booking step. Never diagnose, prescribe, interpret emergencies, or invent hospital availability. Ask for city and broad care need when needed. For urgent symptoms, advise the user to contact local emergency services immediately. Keep responses under 120 words and make next steps concrete.",
      },
      { role: "user", content: message },
      ],
    },
  });

  let responseText = "";
  let usage: { completionTokensDetails?: { reasoningTokens?: number } } | undefined;
  for await (const chunk of stream as AsyncIterable<{ choices?: Array<{ delta?: { content?: unknown } }>; usage?: typeof usage }>) {
    responseText += contentToText(chunk.choices?.[0]?.delta?.content);
    if (chunk.usage) usage = chunk.usage;
  }
  const text = responseText.trim();
  return {
    text: text || "I can help you compare hospitals, specialties, and available appointment paths. What kind of care are you looking for, and which city should I search?",
    model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
    reasoningTokens: usage?.completionTokensDetails?.reasoningTokens ?? null,
  };
}
