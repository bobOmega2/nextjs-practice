// Homepage showing a welcome message and app intro with sample Card components

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";

export default function HomePage() {
  return (
    <main className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Main heading */}
      <h1 className="text-3xl font-bold">Welcome to the Tech News Bias Tracker</h1>
      
      {/* Intro paragraph */}
      <p className="text-gray-700">
        This app helps you explore tech news with awareness of bias.
      </p>
      
      {/* Guidance text */}
      <p className="text-gray-600">
        Use the navigation above to rate articles or read sample articles.
      </p>

      {/* Card: Latest Tech News */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Tech News</CardTitle>
          <CardDescription>Stay updated with the newest articles</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Discover the most recent tech headlines, handpicked for you.</p>
        </CardContent>
        <CardFooter>
          <CardAction>View News</CardAction>
        </CardFooter>
      </Card>

      {/* Card: Rate Articles */}
      <Card>
        <CardHeader>
          <CardTitle>Rate Articles</CardTitle>
          <CardDescription>Help us track bias by rating news pieces</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Your feedback shapes better, balanced content recommendations.</p>
        </CardContent>
        <CardFooter>
          <CardAction>Start Rating</CardAction>
        </CardFooter>
      </Card>

      {/* Card: Explore Bias Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Explore Bias Scores</CardTitle>
          <CardDescription>Understand the bias metrics of articles</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Dive into bias ratings across economic, social, and tech dimensions.</p>
        </CardContent>
        <CardFooter>
          <CardAction>Explore</CardAction>
        </CardFooter>
      </Card>
    </main>
  );
}
