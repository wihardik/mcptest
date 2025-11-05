"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/next.svg" alt="logo" width={120} height={28} priority />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</Link>
          <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</Link>
          <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-600 hover:underline">Log in</Link>
          <Link href="/signup" className="ml-2 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}
