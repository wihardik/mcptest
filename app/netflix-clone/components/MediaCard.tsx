'use client'
import Image from 'next/image'
import { useState } from 'react'
import Modal from './Modal'
import type { MediaItem } from '../data/sampleMedia'

export default function MediaCard({ item }: { item: MediaItem }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="group relative w-40 sm:w-44 md:w-56 flex-shrink-0">
      <div className="relative rounded overflow-hidden">
        <Image src={item.poster} alt={item.title} width={220} height={330} className="block" loading="lazy" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end p-3">
          <div className="text-white text-sm">{item.title}</div>
        </div>
      </div>

      <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition flex gap-2">
        <button className="bg-white/10 text-white rounded-full p-2">▶</button>
        <button className="bg-white/10 text-white rounded-full p-2">＋</button>
        <button onClick={() => setOpen(true)} className="bg-white/10 text-white rounded-full p-2">i</button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h3 className="text-xl font-bold">{item.title}</h3>
        <p className="text-gray-300 mt-2">{item.description}</p>
      </Modal>
    </div>
  )
}
