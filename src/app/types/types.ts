
export type Article = {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: ArticleSource;
};

// purpose is to be used in type Article, not much use on its own
export type ArticleSource = {
  id: string;
  name: string;
  url: string;
  country: string;
};


export type BiasScores = {
  articleId: string;
  scaleName: string;
  minLabel: string;
  maxLabel: string;
  value: number;
  submittedAt: string;
  userId: string | null;
};

/** 
 * Type representing an article combined with its bias scores 
 */
export type ArticleWithScores = Article & { biasScores: BiasScores[] };


