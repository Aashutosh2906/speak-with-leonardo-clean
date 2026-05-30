/**
 * Analytics — intentional no-op placeholder.
 * Enable by wiring to a backend table when needed.
 */
import type { ChatTurn } from "./leonardoApi";

export interface ConversationLog {
  sessionId: string;
  startedAt: string;
  endedAt: string;
  durationMs: number;
  turns: ChatTurn[];
  rating?: 1 | 2 | 3 | 4 | 5;
}

export async function logConversation(_log: ConversationLog, enabled: boolean) {
  if (!enabled) return;
  // To enable: POST to your own backend or insert into a DB table here.
}
