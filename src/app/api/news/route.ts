// api/news/route.ts
import { DATABASE_NAME } from "@/constants/constants";
import { createBiasScoresForAllArticles } from "@/lib/articleHelpers";
import { NextResponse } from "next/server";

export async function GET() {
    const articlesWithScores = await createBiasScoresForAllArticles(DATABASE_NAME);
    return NextResponse.json(articlesWithScores);
}
