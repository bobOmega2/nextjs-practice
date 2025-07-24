"use client"; // Tells Next.js this is a client-side component

import Link from "next/link"; // For navigation
import { usePathname } from "next/navigation"; // Hook to get current URL path

export const Navigation = () => {
  const pathname = usePathname(); // Gets the current route (e.g. "/about")

  return (
    <nav>
      {/* Home Link */}
      <Link
        href="/"
        className={pathname === "/" ? "font-bold mr-4" : "text-blue-500 mr-4"}
      >
        Home
      </Link>

      {/* About Link */}
      <Link
        href="/about"
        className={pathname === "/about" ? "font-bold mr-4" : "text-blue-500 mr-4"}
      >
        About
      </Link>

      {/* Product 1 Link */}
      <Link
        href="/products/1"
        className={pathname === "/products/1" ? "font-bold mr-4" : "text-blue-500 mr-4"}
      >
        Product 1
      </Link>
    </nav>
  );
};
