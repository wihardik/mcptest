'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EmailForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const router = useRouter()

  function validateEmail(e: string) {
    return /\S+@\S+\.\S+/.test(e)
  }

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    setError('')
    setSent(true)
    // small delay then navigate to mock signup
    setTimeout(() => router.push('/netflix-clone/signup'), 800)
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center justify-center gap-2 max-w-xl mx-auto">
      <label className="sr-only">Email address</label>
      <input
        aria-invalid={!!error}
        aria-label="Email address"
        className="min-w-0 flex-1 px-4 py-3 rounded bg-white/10 placeholder:text-gray-300 text-white outline-none"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="bg-[#E50914] text-white px-5 py-3 rounded font-semibold" type="submit">
        {sent ? 'Continue' : 'Get Started'}
      </button>
      {error && <span className="text-red-400 ml-2">{error}</span>}
    </form>
  )
}
