// api/news/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB, getBiasScoresForArticle, fetchArticles } from "@/lib/articleHelpers";
import { DATABASE_NAME } from "@/constants";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    // 1️⃣ Connect to MongoDB
    const db = await connectToMongoDB(DATABASE_NAME);

    // 2️⃣ Try to get the article from MongoDB first
    // If you don't store articles separately, fetch all from GNews and pick one
    const allArticles = await fetchArticles();
    const article = allArticles.find(a => a.id === id);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // 3️⃣ Get bias scores for this article
    const biasScores = await getBiasScoresForArticle(db, id);

    // 4️⃣ Return JSON
    return NextResponse.json({ article, biasScores });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}
