import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getScales } from '@/constants/biasScales';

// importing helper functions 
import { fetchArticleFromGNews, connectToMongoDB, getBiasScoresForArticle } from '@/lib/articleHelpers';

// TODO: Understand this file, and test it 

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
  try {
    const { id } = await context.params;

    // 1️⃣ Fetch the article from the API
    const article = await fetchArticleFromGNews(id);

    // 2️⃣ Connect to MongoDB
    const db = await connectToMongoDB("TechNewsBiasTrackerDB");

    // 3️⃣ Check if bias scores exist
    const scores = await getBiasScoresForArticle(db, id);

    // 5️⃣ Return the article along with bias scores
    return NextResponse.json({ article, biasScores: scores });
  } catch (error) {
    console.error('Error fetching news or connecting to DB:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news or connect to DB' },
      { status: 500 }
    );
  }
}

