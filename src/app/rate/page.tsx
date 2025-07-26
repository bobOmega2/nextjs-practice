// app/rate/page.tsx
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function RatePage() {
  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Rate an Article</h1>
      <Textarea placeholder="Your thoughts on this article..." />
      <Button>Submit Rating</Button>
    </main>
  )
}
