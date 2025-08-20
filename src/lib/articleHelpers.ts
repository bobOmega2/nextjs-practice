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


export async function fetchArticleFromGNews(id: string) { // id is the article ID
        const apiKey = process.env.GNEWS_API_KEY;
      const endpoint = `https://gnews.io/api/v4/top-headlines?lang=en&topic=technology&token=${apiKey}`;

        // 1️⃣ Fetch the article from the API
        const res = await fetch(endpoint); // waiting the endpoint
        const data: { articles: Article[] } = await res.json(); // getting it as a json of article objects, type Article is definded at top for typescript
        const article = data.articles.find((a) => a.id === id); // getting each id

        return article ?? null; // if article does not exist, return null 
   
}

// take in a database name as a string, and connect to it in mongoDB
export async function connectToMongoDB(dbName: string){
    const client = await clientPromise;
    const db = client.db(dbName);
    return db;
}

import { Db } from "mongodb";

export async function getBiasScoresForArticle(db: Db, id: string) {
  const existingScores = await db
    .collection("biasScores")
    .find({ articleId: id })
    .toArray();

  let scores;
  if (existingScores.length === 0) {
    const defaultScores = getScales(id); // from biasScales.ts
    await db.collection("biasScores").insertMany(
      defaultScores.map((scale) => ({
        articleId: id,
        name: scale.name,
        value: scale.value,
        submittedAt: new Date(),
        userId: null, // default, not submitted by a user yet
      }))
    );

    scores = defaultScores.map((scale) => ({
      articleId: id,
      name: scale.name,
      value: scale.value,
    }));
  } else {
    scores = existingScores.map((score) => ({
      articleId: score.articleId,
      scaleName: score.scaleName,
      value: score.value,
    }));
  }

  return scores;
}
