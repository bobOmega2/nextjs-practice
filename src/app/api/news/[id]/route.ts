// api/news/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchArticles, fetchSingleArticleWithScore } from "@/lib/articleHelpers";
import { DATABASE_NAME } from "@/constants/constants";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

  const articleJSON = await fetchSingleArticleWithScore(id, DATABASE_NAME);

    // 4️⃣ Return JSON
    return NextResponse.json(articleJSON);

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}
