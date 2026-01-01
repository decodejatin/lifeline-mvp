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
    <div className="space-y-4">
      <form className="flex gap-2" onSubmit={doSearch}>
        <input aria-label="Search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search mobiles" className="flex-1 border rounded p-2" />
        <button type="submit" className="px-3 py-2 bg-slate-900 text-white rounded">Search</button>
      </form>

      <div className="flex gap-2">
        <input inputMode="numeric" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Max budget (₹)" className="border rounded p-2 w-48" />
        <button onClick={applyBudget} className="px-3 py-2 bg-amber-500 text-white rounded">Apply Budget</button>
      </div>

      <div className="flex gap-2 items-center">
        <select value={a} onChange={(e) => setA(e.target.value)} className="border rounded p-2">
          <option value="">Select product A</option>
          {products.map((p) => (
            <option key={p.id} value={p.slug}>{p.title}</option>
          ))}
        </select>

        <select value={b} onChange={(e) => setB(e.target.value)} className="border rounded p-2">
          <option value="">Select product B</option>
          {products.map((p) => (
            <option key={p.id} value={p.slug}>{p.title}</option>
          ))}
        </select>

        <button onClick={compare} className="px-3 py-2 bg-slate-900 text-white rounded">Compare</button>
      </div>
    </div>
  )
}
