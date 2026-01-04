"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

type Product = { id: string; slug: string; title: string; currentPrices: { source: string; price: number }[] }

export default function HomeControls({ products }: { products: Product[] }) {
  const router = useRouter()
  const [budget, setBudget] = useState<string>('')
  const [a, setA] = useState<string>('')
  const [b, setB] = useState<string>('')
  const [q, setQ] = useState<string>('')

  function applyBudget() {
    if (!budget) return
    router.push(`/products?maxPrice=${encodeURIComponent(budget)}`)
  }

  function doSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push(`/products?q=${encodeURIComponent(q)}`)
  }

  function compare() {
    if (a && b && a !== b) router.push(`/compare?productA=${encodeURIComponent(a)}&productB=${encodeURIComponent(b)}`)
  }

  return (
    <div className="space-y-6">
      <form className="flex gap-2" onSubmit={doSearch}>
        <input
          aria-label="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search mobiles..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
        />
        <button type="submit" className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-orange-600 hover:border-orange-600 transition-all uppercase tracking-widest text-xs">Search</button>
      </form>

      <div className="flex gap-2">
        <input
          inputMode="numeric"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Max budget (₹)"
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all w-48"
        />
        <button onClick={applyBudget} className="px-6 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-all uppercase tracking-widest text-xs shadow-lg shadow-orange-600/20">Apply Budget</button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-white/5 p-4 rounded-2xl border border-white/10">
        <div className="flex gap-2 flex-1 w-full">
          <select value={a} onChange={(e) => setA(e.target.value)} className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all">
            <option value="" className="bg-black">Select product A</option>
            {products.map((p) => (
              <option key={p.id} value={p.slug} className="bg-black">{p.title}</option>
            ))}
          </select>

          <select value={b} onChange={(e) => setB(e.target.value)} className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all">
            <option value="" className="bg-black">Select product B</option>
            {products.map((p) => (
              <option key={p.id} value={p.slug} className="bg-black">{p.title}</option>
            ))}
          </select>
        </div>

        <button onClick={compare} className="w-full md:w-auto px-8 py-3 bg-white text-black font-black rounded-xl hover:bg-orange-500 hover:text-white transition-all uppercase tracking-widest text-xs">Compare</button>
      </div>
    </div>
  )
}
