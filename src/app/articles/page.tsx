import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";

// Mock data - will be replaced with API data later
const ARTICLES = [
  {
    id: "1",
    title: "The Future of AI in Tech",
    description: "Exploring AI's impact on industries",
    imageUrl: "/placeholder-ai.jpg" // Replace with real images later
  },
  {
    id: "2", 
    title: "Web3: Revolution or Hype?",
    description: "Decentralized tech analysis",
    imageUrl: "/placeholder-web3.jpg"
  },
  {
    id: "3",
    title: "Sustainable Tech Solutions",
    description: "Tech addressing climate change", 
    imageUrl: "/placeholder-green.jpg"
  }
];

export default function ArticlesPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Page header */}
      <h1 className="text-3xl font-bold mb-8">Tech News Articles</h1>
      
      {/* Responsive card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTICLES.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

// Extracted card component for better readability
function ArticleCard({ article }: { article: typeof ARTICLES[0] }) {
  return (
    <Link href={`/articles/${article.id}`} className="group">
      <Card className="h-full flex flex-col transition-all hover:shadow-lg">
        
        {/* Article image */}
        <div className="relative h-48 bg-gray-100">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Article content */}
        <CardHeader>
          <CardTitle className="text-xl">{article.title}</CardTitle>
          <CardDescription>{article.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-600">Click to read and rate bias</p>
        </CardContent>
        
        <CardFooter>
          <div className="text-sm text-primary font-medium">Read Article →</div>
        </CardFooter>
      </Card>
    </Link>
  );
}