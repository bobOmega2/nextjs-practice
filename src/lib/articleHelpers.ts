// src/lib/articleHelpers.ts

import clientPromise from '@/lib/mongodb';
import { DATABASE_NAME, GNEWS_ENDPOINT } from '@/constants';
import { Article, ArticleBiasScore } from '@/app/types';
import { Db, WithId, Document } from "mongodb";

/** 
 * Type representing an article combined with its bias scores 
 */
export type ArticleWithScores = Article & { biasScores: ArticleBiasScore[] };

/**
 * Helper: Generate a random integer between 0 (inclusive) and max (exclusive)
 */
function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

/**
 * Returns default bias scales for an article
 * Currently hardcoded; can later fetch from a DB or config
 */
export function getScales(articleId: string): ArticleBiasScore[] {
  return [
    {
      articleId: articleId,
      scaleName: "Social Issues",
      minLabel: "Progressive",
      maxLabel: "Traditional",
      value: getRandomInt(100),
    },
    {
      articleId: articleId,
      scaleName: "Economic",
      minLabel: "Left-leaning",
      maxLabel: "Right-leaning",
      value: getRandomInt(100),
    },
    {
      articleId: articleId,
      scaleName: "Cultural Perspectives",
      minLabel: "Inclusive",
      maxLabel: "Exclusive",
      value: getRandomInt(100),
    },
    {
      articleId: articleId,
      scaleName: "Technology",
      minLabel: "Progress",
      maxLabel: "Caution",
      value: getRandomInt(100),
    },
  ];
}

/**
 * 1️⃣ Fetch articles from GNews API
 */
export async function fetchArticles(): Promise<Article[]> {
  const res = await fetch(GNEWS_ENDPOINT);
  const data = await res.json();
  return data.articles;
}

/**
 * 2️⃣ Connect to MongoDB
 * @param dbName - Name of the database to connect to
 */
export async function connectToMongoDB(dbName: string): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

/**
 * 3️⃣ Get bias scores for an article, or create default scores if missing
 * @param db - MongoDB database instance
 * @param articleId - ID of the article
 */
export async function getBiasScoresForArticle(
  db: Db,
  articleId: string
): Promise<ArticleBiasScore[]> {
  const existingScores: WithId<Document>[] = await db
    .collection("biasScores")
    .find({ articleId })
    .toArray();

  // If scores exist, map MongoDB documents to ArticleBiasScore type
  if (existingScores.length > 0) {
    return existingScores.map(score => ({
      articleId: score.articleId,
      scaleName: score.scaleName,
      minLabel: score.minLabel,
      maxLabel: score.maxLabel,
      value: score.value,
    }));
  }

  // Otherwise, generate default scores and insert into DB
  const defaultScores = getScales(articleId);
  await db.collection("biasScores").insertMany(
    defaultScores.map(s => ({ ...s, submittedAt: new Date(), userId: null }))
  );

  return defaultScores;
}

/**
 * 4️⃣ Fetch articles and attach their bias scores
 * @param dbName - Name of the MongoDB database
 * @returns Array of articles with their bias scores
 */
export async function updateMongoDB(dbName: string): Promise<ArticleWithScores[]> {
  const db = await connectToMongoDB(dbName);
  const articles = await fetchArticles();

  // Attach bias scores to each article
  const articlesWithScores = await Promise.all(
    articles.map(async article => {
      const biasScores = await getBiasScoresForArticle(db, article.id);
      return { ...article, biasScores };
    })
  );

  return articlesWithScores;
}
