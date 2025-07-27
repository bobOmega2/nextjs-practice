// src/app/api/news/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GNEWS_API_KEY;
  const endpoint = `https://gnews.io/api/v4/top-headlines?lang=en&topic=technology&token=${apiKey}`;

  try {
    const res = await fetch(endpoint);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
