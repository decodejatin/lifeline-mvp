import React from 'react'
import { PRODUCTS } from '../../lib/mockData'
import ProductCard from '../../components/ProductCard'
import { Metadata } from 'next'
import SortSelector from '../../components/SortSelector'

type Props = {
  searchParams?: {
    q?: string
    maxPrice?: string
    sort?: 'price-asc' | 'price-desc' | 'name'
  }
}

export const metadata: Metadata = {
  title: 'Browse Mobiles — Compare Prices | Lifeline',
  description: 'Browse and compare latest mobile phones. Filter by budget, search by name, and compare prices across Amazon and Flipkart.',
  keywords: 'mobile phones, smartphones, mobile price comparison, buy mobiles online'
}

export default async function ProductsPage({ searchParams }: Props) {
  const { q = '', maxPrice = '', sort = 'price-asc' } = searchParams || {}

  // Filter products
  let filtered = PRODUCTS

  // Search filter (by title)
  if (q) {
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase()))
  }

  // Budget filter (by minimum price)
  if (maxPrice) {
    const budget = parseInt(maxPrice, 10)
    filtered = filtered.filter((p) => Math.min(...p.currentPrices.map((x) => x.price)) <= budget)
  }

  // Sort
  if (sort === 'price-asc') {
    filtered = filtered.sort((a, b) => Math.min(...a.currentPrices.map((x) => x.price)) - Math.min(...b.currentPrices.map((x) => x.price)))
  } else if (sort === 'price-desc') {
    filtered = filtered.sort((a, b) => Math.min(...b.currentPrices.map((x) => x.price)) - Math.min(...a.currentPrices.map((x) => x.price)))
  } else if (sort === 'name') {
    filtered = filtered.sort((a, b) => a.title.localeCompare(b.title))
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Browse Mobiles</h1>
      <p className="text-slate-600 mb-6">Filter and compare mobile phones across all stores.</p>

      <div className="mb-6 p-4 bg-white rounded border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-sm font-semibold mb-1">Search</label>
            <form method="get" className="flex gap-2">
              <input name="q" defaultValue={q} placeholder="Mobile name..." className="flex-1 border rounded p-2 text-sm" />
              <button type="submit" className="px-3 py-2 bg-slate-900 text-white rounded text-sm">Search</button>
            </form>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Max Budget (₹)</label>
            <form method="get" className="flex gap-2">
              <input name="maxPrice" defaultValue={maxPrice} inputMode="numeric" placeholder="50000" className="flex-1 border rounded p-2 text-sm" />
              <button type="submit" className="px-3 py-2 bg-amber-500 text-white rounded text-sm">Filter</button>
            </form>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Sort</label>
            <SortSelector defaultValue={sort} />
          </div>
          <div className="flex items-end">
            <a href="/products" className="px-3 py-2 bg-slate-200 text-slate-900 rounded text-sm">Clear Filters</a>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="p-6 text-center bg-slate-50 rounded">
          <p className="text-slate-600">No products match your criteria. Try adjusting your filters.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-600 mb-4">Showing {filtered.length} of {PRODUCTS.length} products</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
