// src/lib/articleHelpers.ts

import clientPromise from '@/lib/mongodb';
import { DATABASE_NAME, GNEWS_ENDPOINT } from '@/constants/constants';
import { Article, BiasScores, ArticleWithScores } from '@/app/types/types';
import { Db } from "mongodb";

/** ------------------------------ */
/** 🔹 Utilities */
/** ------------------------------ */

const randomScore = (max = 100) => Math.floor(Math.random() * max);

export const getDefaultBiasScores = (articleId: string): BiasScores[] => [
  { articleId, scaleName: "Social Issues", minLabel: "Progressive", maxLabel: "Traditional", value: randomScore(), submittedAt: new Date().toISOString(), userId: null },
  { articleId, scaleName: "Economic", minLabel: "Left-leaning", maxLabel: "Right-leaning", value: randomScore(), submittedAt: new Date().toISOString(), userId: null },
  { articleId, scaleName: "Cultural Perspectives", minLabel: "Inclusive", maxLabel: "Exclusive", value: randomScore(), submittedAt: new Date().toISOString(), userId: null },
  { articleId, scaleName: "Technology", minLabel: "Progress", maxLabel: "Caution", value: randomScore(), submittedAt: new Date().toISOString(), userId: null },
];

/** ------------------------------ */
/** 🔹 MongoDB Helpers */
/** ------------------------------ */

export const getDB = async (dbName: string): Promise<Db> => {
  const client = await clientPromise;
  return client.db(dbName);
};

/** ------------------------------ */
/** 🔹 Main Function to Create Bias Scores for All Articles */
/** ------------------------------ */

export const createBiasScoresForAllArticles = async (dbName: string) => {
  const db = await getDB(dbName);
  const articles: Article[] = await fetchArticles();
  const collection = db.collection("biasScores");

  for (const article of articles) {
    // Check if scores already exist
    const exists = await collection.findOne({ articleId: article.id });
    if (!exists) {
      const scores = getDefaultBiasScores(article.id);
      await collection.insertMany(scores);
    }
  }

  console.log(`Bias scores ensured for ${articles.length} articles.`);
  return articles.map(article => ({
    ...article,
    biasScores: getDefaultBiasScores(article.id)
  }));
};

/** ------------------------------ */
/** 🔹 Helper to Fetch Articles from GNews API */
/** ------------------------------ */

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const res = await fetch(GNEWS_ENDPOINT);
    const data = await res.json();
    return data.articles ?? [];
  } catch {
    return [];
  }
};
