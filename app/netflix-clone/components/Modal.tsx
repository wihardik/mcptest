'use client'
import { useEffect, useRef } from 'react'

export default function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const lastActive = useRef<Element | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      lastActive.current = document.activeElement
      document.addEventListener('keydown', onKey)
      setTimeout(() => ref.current?.focus(), 0)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      ;(lastActive.current as HTMLElement | null)?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        ref={ref}
        tabIndex={-1}
        className="relative z-10 max-w-2xl mx-4 bg-[#141414] rounded shadow-lg p-6 text-white"
      >
        <button aria-label="Close" onClick={onClose} className="absolute top-3 right-3 text-white">×</button>
        <div>{children}</div>
      </div>
    </div>
  )
}
