"use client"; // This is a client-side component

import { useRouter } from "next/navigation"; // Hook to programmatically navigate

export default function About() {
  const router = useRouter(); // Initialize the router

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>

      {/* Navigation Button */}
      <button
        onClick={() => router.push("/")}
        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition-colors"
      >
        Go Home
      </button>
    </div>
  );
}
