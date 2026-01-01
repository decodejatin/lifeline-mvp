'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function SortSelector({ defaultValue }: { defaultValue: string }) {
  const router = useRouter()

  function handleSort(e: React.ChangeEvent<HTMLSelectElement>) {
    router.push(`/products?sort=${encodeURIComponent(e.target.value)}`)
  }

  return (
    <select defaultValue={defaultValue} onChange={handleSort} className="w-full border rounded p-2 text-sm">
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name">Name A-Z</option>
    </select>
  )
}
