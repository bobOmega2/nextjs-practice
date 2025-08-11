import { NextResponse } from "next/server";

type ArticleSource = {
  id: string;
  name: string;
  url: string;
};

type Article = {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: ArticleSource;
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const apiKey = process.env.GNEWS_API_KEY;
  const endpoint = `https://gnews.io/api/v4/top-headlines?lang=en&topic=technology&token=${apiKey}`;

  try {
    const res = await fetch(endpoint);
    const data: { articles: Article[] } = await res.json();

    // Find article with matching id
    const article = data.articles.find((a) => a.id === id);

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
