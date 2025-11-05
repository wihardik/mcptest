import Image from "next/image";
import Link from "next/link";

export default function Hero({ className = "" }: { className?: string }) {
  return (
    <section className={`max-w-6xl mx-auto px-6 py-16 sm:py-24 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">Build your AI workforce</h1>
          <p className="mt-4 text-lg text-gray-600">Enable anyone to build autonomous AI teams and put processes on autopilot.</p>

          <div className="mt-6 flex gap-3 items-center">
            <Link href="/signup" className="inline-flex items-center px-5 py-3 bg-blue-600 text-white rounded-md">Get started</Link>
            <Link href="/contact" className="text-sm text-gray-700">Request demo</Link>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full h-56 sm:h-72 md:h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            <Image src="/next.svg" alt="hero" width={300} height={120} />
          </div>
        </div>
      </div>
    </section>
  );
}
