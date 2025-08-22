
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

export type ArticleSource = {
  id: string;
  name: string;
  url: string;
  country: string;
};


export type ArticleBiasScore = {
  articleId: string;
  scaleName: string;
  minLabel: string;
  maxLabel: string;
  value: number;
};




