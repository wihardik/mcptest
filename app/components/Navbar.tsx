"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "./ui/Button";
import Container from "./ui/Container";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <Container className="py-4 flex items-center justify-between">
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
          <Button href="/signup" variant="primary">Sign up</Button>
        </div>
      </Container>
    </nav>
  );
}
