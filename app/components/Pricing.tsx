import Link from "next/link";

export default function Pricing() {
  const tiers = [
    { title: 'Starter', price: '$0', features: ['Basic search', 'Community support'] },
    { title: 'Growth', price: '$49', features: ['Everything in Starter', 'Team collaboration'] , recommended: true},
    { title: 'Enterprise', price: 'Contact', features: ['SLA', 'Dedicated support'] },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold">Pricing</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((t) => (
          <div key={t.title} className={`p-6 border rounded-lg ${t.recommended ? 'border-blue-600 bg-blue-50' : 'bg-white'}`}>
            {t.recommended && <div className="text-xs uppercase text-blue-700 font-semibold">Recommended</div>}
            <h3 className="text-xl font-bold mt-2">{t.title}</h3>
            <div className="mt-4 text-2xl font-semibold">{t.price}</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              {t.features.map((f) => <li key={f}>• {f}</li>)}
            </ul>
            <div className="mt-6">
              <Link href="/signup" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md">Choose</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
