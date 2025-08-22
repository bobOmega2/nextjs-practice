// api/news/route.ts
import { DATABASE_NAME } from "@/constants";
import { updateMongoDB } from "@/lib/articleHelpers";
import { NextResponse } from "next/server";

export async function GET() {
  const articlesWithScores = await updateMongoDB(DATABASE_NAME);
  return NextResponse.json(articlesWithScores);
}
