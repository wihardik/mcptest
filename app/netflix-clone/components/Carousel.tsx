'use client'
import { useEffect, useRef, useState } from 'react'
import MediaCard from './MediaCard'
import type { MediaItem } from '../data/sampleMedia'

export default function Carousel({ title, items }: { title: string; items: MediaItem[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setVisible(true)
      })
    }, { threshold: 0.25 })
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    const el = containerRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label={title} className="relative">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <button onClick={() => scroll('left')} aria-label="Scroll left" className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white p-2 rounded-full">‹</button>
      <div ref={containerRef} data-testid={`carousel-${title}`} className="overflow-x-auto scrollbar-hide no-scrollbar scroll-snap-x flex gap-3 py-2 px-6">
        {visible ? items.map((it) => <MediaCard key={it.id} item={it} />) : <div className="h-40" />}
      </div>
      <button onClick={() => scroll('right')} aria-label="Scroll right" className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white p-2 rounded-full">›</button>
    </div>
  )
}
