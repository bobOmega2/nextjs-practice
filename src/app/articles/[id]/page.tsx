import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // if its running on vercel, use `https://${process.env.VERCEL_URL}`, else use localhost
  const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");


  // Fetch a single article data from your API
  const res = await fetch(`${baseUrl}/api/news/${id}`, {
    cache: "no-store", // ensures we always get the latest data
  });
  
  console.log('Fetching article at:', `${baseUrl}/api/news/${id}`);

  if (!res.ok) {
    return (
      <main className="p-6 max-w-3xl mx-auto text-red-600">
        Failed to load article.
      </main>
    );
  }

  const article = await res.json();

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {article.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-gray-700">
          <p className="text-sm text-gray-500">
            Published on {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <p>{article.content}</p>
        </CardContent>
      </Card>
    </main>
  );
}
