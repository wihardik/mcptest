export default function Features() {
  const items = [
    { title: 'Autonomous agents', desc: 'Orchestrate AI agents to perform tasks and processes.' },
    { title: 'Search & insights', desc: 'Powerful vector search and analytics for your data.' },
    { title: 'Integrations', desc: 'Connect to tools and automate workflows.' },
  ];

  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold">Platform features</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((it) => (
          <div key={it.title} className="p-6 border rounded-lg bg-white">
            <h3 className="font-medium text-lg">{it.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
