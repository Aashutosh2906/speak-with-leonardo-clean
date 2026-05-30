# Speak with Leonardo

A Renaissance museum kiosk experience — chat with Leonardo da Vinci, powered by an LLM.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS with a custom parchment/Renaissance design system
- React Router for navigation
- Vercel serverless function (`/api/chat`) as a secure API proxy

## Running Locally

```bash
npm install
cp .env.example .env   # then add your OpenAI key
npm run dev
```

## Deploying to Vercel

1. Push this repo to GitHub
2. Import into [vercel.com](https://vercel.com)
3. Add environment variable: `LLM_API_KEY` = your OpenAI API key
4. Deploy

## Environment Variables

| Variable | Description |
|---|---|
| `LLM_API_KEY` | Your OpenAI API key (server-only, never sent to browser) |

## Project Structure

```
api/
  chat.js          ← Vercel serverless function (API key lives here)
src/
  config/
    leonardo.ts    ← System prompt, settings, mock responses
  components/
    leonardo/      ← ParchmentBackdrop, TypewriterText, QuillLoader, AdminPanel
  pages/
    Welcome.tsx    ← Landing screen
    Conversation.tsx ← Main chat interface
    Farewell.tsx   ← End screen
  services/
    leonardoApi.ts ← Calls /api/chat (no Supabase)
    analytics.ts   ← No-op placeholder
```
