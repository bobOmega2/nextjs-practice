// Navigation bar shown on all pages

"use client"; // Allows use of client-side features like interactivity
import Link from "next/link"; // Used for internal navigation in Next.js

const Navigation = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex gap-6">
      {/* Link to homepage */}
      <Link href="/" className="hover:underline hover:font-bold">
        Home
      </Link>

      {/* Link to rating page */}
      <Link href="/rate" className="hover:underline hover:font-bold">
        Rate
      </Link>

      {/* Link to a sample article */}
      <Link href="/articles/" className="hover:underline hover:font-bold">
        Explore Articles
      </Link>
    </nav>
  );
};

export default Navigation; // Export so it can be used in layout.tsx
