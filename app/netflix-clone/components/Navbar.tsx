import Link from "next/link";

export default function Navbar() {
  return (
    <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-40 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/netflix-clone" aria-label="Home" className="text-white font-bold text-xl">
              MyFlix
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <label className="sr-only">Language</label>
            <select
              aria-label="Language selector"
              className="bg-transparent text-sm text-[#B3B3B3] border border-transparent focus:outline-none"
              defaultValue="EN"
            >
              <option value="EN">EN</option>
              <option value="HI">HI</option>
            </select>

            <Link
              href="/netflix-clone/signin"
              className="bg-[#E50914] text-white px-4 py-1 rounded text-sm font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
