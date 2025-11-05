export default function Testimonials() {
  const quotes = [
    { quote: 'Relevance AI saved us countless hours.', who: 'CEO, Acme' },
    { quote: 'The platform scales with our needs.', who: 'CTO, Beta' },
    { quote: 'Amazing support and integrations.', who: 'Head of Data, Gamma' },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold">What customers say</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {quotes.map((q, i) => (
          <blockquote key={i} className="p-6 border rounded-lg bg-white">
            <p className="text-gray-800">“{q.quote}”</p>
            <footer className="mt-4 text-sm text-gray-600">— {q.who}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
