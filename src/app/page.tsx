import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

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
    href: "#scores" // Update with actual path
  }
];

export default function HomePage() {
  return (
    <main className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Welcome to Tech News Bias Tracker</h1>
      <p className="text-gray-700">This app helps you explore tech news with awareness of bias.</p>
      <p className="text-gray-600">Use the navigation to rate articles or read sample articles.</p>

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
    </main>
  );
}