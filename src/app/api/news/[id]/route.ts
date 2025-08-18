import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getScales } from '@/constants/biasScales';

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
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const apiKey = process.env.GNEWS_API_KEY;
  const endpoint = `https://gnews.io/api/v4/top-headlines?lang=en&topic=technology&token=${apiKey}`;

  try {
    // 1️⃣ Fetch the article from the API
    const res = await fetch(endpoint);
    const data: { articles: Article[] } = await res.json();
    const article = data.articles.find((a) => a.id === id);

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // 2️⃣ Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('TechNewsBiasTrackerDB');

    // 3️⃣ Check if bias scores exist
    const existingScores = await db.collection('biasScores').find({ articleId: id }).toArray();

    // 4️⃣ If not, insert default bias scores
    let scores;
    if (existingScores.length === 0) {
      const defaultScores = getScales(id); // from biasScales.ts
      const insertResult = await db.collection('biasScores').insertMany(
        defaultScores.map((scale) => ({
          articleId: id,
          scaleName: scale.name,
          value: scale.value,
          submittedAt: new Date(),
          userId: null, // default, not submitted by a user yet
        }))
      );
      scores = defaultScores.map((scale) => ({
        articleId: id,
        scaleName: scale.name,
        value: scale.value,
      }));
    } else {
      scores = existingScores.map((score) => ({
        articleId: score.articleId,
        scaleName: score.scaleName,
        value: score.value,
      }));
    }

    // 5️⃣ Return the article along with bias scores
    return NextResponse.json({ article, biasScores: scores });
  } catch (error) {
    console.error('Error fetching news or connecting to DB:', error);
    return NextResponse.json({ error: 'Failed to fetch news or connect to DB' }, { status: 500 });
  }
}
