export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>© {new Date().getFullYear()} Relevance AI (clone)</div>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="/terms" className="hover:underline">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
