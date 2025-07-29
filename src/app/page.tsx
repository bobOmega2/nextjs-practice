import Link from "next/link";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";

// Type definition for articles
type Article = {
  id?: string;
  title: string;
  description?: string;
  url: string;
  source?: {
    name?: string;
  };
};

// Fetches articles from the API
async function fetchNewsArticles(): Promise<Article[]> {

  // if its running on vercel, use `https://${process.env.VERCEL_URL}`, else use localhost
  const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const res = await fetch(`${baseUrl}/api/news`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }
  const data = await res.json();
  return data.articles;
}

// Cards for the homepage navigation section
const cards = [
  {
    title: "Latest Tech News",
    description: "Stay updated with the newest articles",
    content: "Discover the most recent tech headlines, handpicked for you.",
    action: "View News",
    href: "/article"
  },
  {
    title: "Rate Articles",
    description: "Help us track bias by rating news pieces",
    content: "Your feedback shapes better, balanced content recommendations.",
    action: "Start Rating",
    href: "/rate"
  },
  {
    title: "Explore Bias Scores",
    description: "Understand the bias metrics of articles",
    content: "Dive into bias ratings across economic, social, and tech dimensions.",
    action: "Explore",
    href: "#scores"
  }
];

export default async function HomePage() {
  let articles: Article[] = [];

  try {
    articles = await fetchNewsArticles();
  } catch (error) {
    console.error("Error fetching articles:", error);
  }

  const limitedArticles = articles.slice(0, 3); // Only show 3 articles

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold mb-6">Welcome to Tech News Bias Tracker</h1>
      <p className="text-gray-700 mb-2">This app helps you explore tech news with awareness of bias.</p>
      <p className="text-gray-600 mb-8">Use the navigation to rate articles or read sample articles.</p>

      {/* Navigation cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{card.content}</p>
            </CardContent>
            <CardFooter>
              <Link href={card.href} className="text-primary hover:underline">
                {card.action}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* News articles section */}
      {limitedArticles.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-6">Latest Technology Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {limitedArticles.map((article, idx) => (
              <ArticleCard key={article.url || idx} article={article} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

// Card for a single article
function ArticleCard({ article }: { article: Article }) {
  const articleId = article.id || encodeURIComponent(article.url);

  return (
    <Link href={`/articles/${articleId}`} className="group">
      <Card className="h-full flex flex-col transition-all hover:shadow-lg cursor-pointer">
        {/* No image for now */}
        <div className="flex items-center justify-center h-48 bg-gray-100 text-gray-500 font-semibold">
          No Image Available
        </div>

        <CardHeader>
          <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
          <CardDescription>{article.source?.name || "Unknown Source"}</CardDescription>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-sm text-gray-600 line-clamp-3">
            {article.description || "No description available."}
          </p>
        </CardContent>

        <CardFooter>
          <div className="text-sm text-primary font-medium">Read Article →</div>
        </CardFooter>
      </Card>
    </Link>
  );
}
