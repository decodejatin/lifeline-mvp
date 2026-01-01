"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

type Product = { id: string; slug: string; title: string }

export default function CompareSelector({ products, selectedA, selectedB }: { products: Product[]; selectedA?: string; selectedB?: string }) {
  const router = useRouter()
  const [a, setA] = useState<string | undefined>(selectedA)
  const [b, setB] = useState<string | undefined>(selectedB)

  function goCompare() {
    if (a && b && a !== b) {
      router.push(`/compare?productA=${encodeURIComponent(a)}&productB=${encodeURIComponent(b)}`)
    }
  }

  return (
    <div className="flex gap-3">
      <select className="border rounded p-2" value={a} onChange={(e) => setA(e.target.value)}>
        <option value="">Select product A</option>
        {products.map((p) => (
          <option key={p.id} value={p.slug}>{p.title}</option>
        ))}
      </select>

      <select className="border rounded p-2" value={b} onChange={(e) => setB(e.target.value)}>
        <option value="">Select product B</option>
        {products.map((p) => (
          <option key={p.id} value={p.slug}>{p.title}</option>
        ))}
      </select>

      <button onClick={goCompare} className="px-3 py-2 bg-slate-900 text-white rounded">Compare</button>
    </div>
  )
}
