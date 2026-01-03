'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function SortSelector({ defaultValue }: { defaultValue: string }) {
  const router = useRouter()

  function handleSort(e: React.ChangeEvent<HTMLSelectElement>) {
    router.push(`/products?sort=${encodeURIComponent(e.target.value)}`)
  }

  return (
    <div className="relative">
      <select
        defaultValue={defaultValue}
        onChange={handleSort}
        className="w-full bg-slate-800/50 border border-white/5 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all appearance-none cursor-pointer"
      >
        <option value="price-asc" className="bg-slate-900">Price: Low to High</option>
        <option value="price-desc" className="bg-slate-900">Price: High to Low</option>
        <option value="name" className="bg-slate-900">Name A-Z</option>
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
