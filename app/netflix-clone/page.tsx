import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Carousel from './components/Carousel'
import Footer from './components/Footer'
import { rows } from './data/sampleMedia'

export default function NetflixClonePage(){
  return (
    <div className="min-h-screen bg-[var(--netflix-bg)] text-white">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <section className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {rows.map((row) => (
            <Carousel key={row.title} title={row.title} items={row.items} />
          ))}
        </section>
        <Footer />
      </main>
    </div>
  )
}
