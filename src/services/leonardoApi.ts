/**
 * Clean API service — calls our own Vercel serverless function at /api/chat.
 * The OpenAI key never touches the browser; it lives only in Vercel env vars.
 */
import { LEONARDO_SYSTEM_PROMPT, pickMockResponse } from "@/config/leonardo";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface LeonardoResponse {
  reply: string;
  mocked?: boolean;
}

export async function askLeonardo(
  messages: ChatTurn[],
  opts: { devMode: boolean }
): Promise<LeonardoResponse> {
  // Dev mode: return a canned response instantly, no API call.
  if (opts.devMode) {
    await new Promise((r) => setTimeout(r, 900 + Math.random() * 700));
    const userCount = messages.filter((m) => m.role === "user").length;
    return { reply: pickMockResponse(userCount), mocked: true };
  }

  // Production: call our own serverless proxy at /api/chat
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages,
      systemPrompt: LEONARDO_SYSTEM_PROMPT,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Leonardo is momentarily silent.");
  }

  const data = await res.json();
  if (!data?.reply) throw new Error("Leonardo's quill paused without writing.");
  return { reply: data.reply as string };
}
