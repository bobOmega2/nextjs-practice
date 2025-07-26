// Dynamic article page showing full content for a given article ID
// This uses a dynamic route ([id]) to display specific article content

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // shadcn UI components for styling

// Define the expected props from Next.js for dynamic routing
interface Props {
  params: {
    id: string; // This comes from the URL segment like /article/3 → id = "3"
  };
}

// Page component for individual articles
export default function ArticlePage({ params }: Props) {
  const { id } = params; // Extract the dynamic article ID from the URL

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Article is wrapped in a card for clean layout and spacing */}
      <Card>
        {/* Header section of the card with the article title */}
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Article #{id}
          </CardTitle>
        </CardHeader>

        {/* Main article content section */}
        <CardContent className="space-y-4 text-gray-700">
          <p>
            This is a placeholder article for ID <strong>{id}</strong>.
            You can use this route to display detailed content for each article.
          </p>

          <p>
            Later, you'll fetch article content dynamically from an API or a database.
            For now, this helps visualize what the layout might look like.
          </p>

          <p>
            This page will eventually include sentiment analysis, bias ratings,
            tags, and other rich content about the article.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
