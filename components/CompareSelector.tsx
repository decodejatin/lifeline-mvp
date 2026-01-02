"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

type Product = { id: string; slug: string; title: string; thumbnail?: string | null }

export default function CompareSelector({ products, selectedA, selectedB }: { products: Product[]; selectedA?: string; selectedB?: string }) {
  const router = useRouter()
  const [a, setA] = useState<string | undefined>(selectedA)
  const [b, setB] = useState<string | undefined>(selectedB)

  function goCompare() {
    if (a && b && a !== b) {
      router.push(`/compare?productA=${encodeURIComponent(a)}&productB=${encodeURIComponent(b)}`)
    }
  }

  // Helper to find title
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getProduct = (slug?: string) => products.find(p => p.slug === slug)

  return (
    <div className="bg-white p-6 rounded-3xl shadow-soft border border-slate-100">
      <div className="flex flex-col md:flex-row items-center gap-4">

        {/* Product A Selector */}
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Phone 1</label>
          <div className="relative">
            <select
              className="w-full p-4 bg-slate-50 border-r-[16px] border-transparent outline-none rounded-xl font-semibold text-slate-700 focus:ring-2 focus:ring-blue-100 appearance-none cursor-pointer"
              value={a || ''}
              onChange={(e) => setA(e.target.value)}
            >
              <option value="">Select a phone...</option>
              {products.map((p) => (
                <option key={p.id} value={p.slug}>{p.title}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              ▼
            </div>
          </div>
        </div>

        {/* VS Badge */}
        <div className="shrink-0 w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-black italic text-lg shadow-lg z-10 -my-2 md:my-0">
          VS
        </div>

        {/* Product B Selector */}
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Phone 2</label>
          <div className="relative">
            <select
              className="w-full p-4 bg-slate-50 border-r-[16px] border-transparent outline-none rounded-xl font-semibold text-slate-700 focus:ring-2 focus:ring-blue-100 appearance-none cursor-pointer"
              value={b || ''}
              onChange={(e) => setB(e.target.value)}
            >
              <option value="">Select a phone...</option>
              {products.map((p) => (
                <option key={p.id} value={p.slug}>{p.title}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              ▼
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={goCompare}
          disabled={!a || !b || a === b}
          className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/30"
        >
          Compare Now
        </button>
      </div>
    </div>
  )
}
