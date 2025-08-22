// NOTE: LINK ORIGINAL URL AT BOTTOM OF PAGE ONCE MAIN ARTICLE TEXT IS CUT OFF


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { Slider } from "@/components/ui/slider"
import { ArticleBiasScore, Article} from "@/app/types";


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


  // Fetch a single article data from API
  const res = await fetch(`${baseUrl}/api/news/${id}`, {
    cache: "no-store", // ensures we always get the latest data
  });
  


  if (!res.ok) {
    return (
      <main className="p-6 max-w-3xl mx-auto text-red-600">
        Failed to load article.
      </main>
    );
  }

  // Retrieving
  const { article, biasScores } = await res.json();
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

          <p>{article.content.replace(/\[\d+ chars\]$/, '')}</p> 
          
{/* ALL BIAS SCALES STUFF BELOW */}

{biasScores.map((scale: ArticleBiasScore, idx: number) => (
  <div key={idx} className="space-y-1">
    <p className="font-semibold">{scale.scaleName}</p>

    <div className="flex items-center gap-2">
      <span>{scale.minLabel}</span>
      <Slider defaultValue={[scale.value]} max={100} step={1} disabled className="flex-1" />
      <span>{scale.maxLabel}</span>
    </div>

    <p className="text-sm text-gray-500">Value: {scale.value}</p>
  </div>
))}

{/* ALL BIAS SCALES STUFF ABOVE */}

          <a
            href={article.url}              // Destination URL from your article data
            target="_blank"                 // Opens in a new browser tab
            rel="noopener noreferrer"       // Security & privacy best practice with target="_blank"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
            >
            Read More 
          </a>

        </CardContent>
      </Card>
    </main>
  );
}
