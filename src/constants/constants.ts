// src/constants/news.ts
// TODO: Move MongoDB logic from api/news/[id]/route.ts to a NEW FILE (e.g., lib/articleService.ts)
// TODO: Consider renaming this folder from "constants" to "config" or "services" if more than static constants


// Environment / API config
export const API_KEY = process.env.GNEWS_API_KEY;
export const GNEWS_ENDPOINT = `https://gnews.io/api/v4/top-headlines?lang=en&topic=technology&token=${API_KEY}`;

export const DATABASE_NAME = "TechNewsBiasTrackerDB"; // The name of my current MongoDB database

  // if its running on vercel, use `https://${process.env.VERCEL_URL}`, else use localhost
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
