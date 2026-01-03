import React, { Suspense } from 'react'
import { PRODUCTS } from '../../lib/mockData'
import FlipCard from '../../components/ui/flip-card'
import { Metadata } from 'next'
import SortSelector from '../../components/SortSelector'
import GradientOrb from '../../components/ui/gradient-orb'
import TextReveal from '../../components/animations/TextReveal'

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
  let filtered = [...PRODUCTS]

  // Search filter (by title)
  if (q) {
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.description.toLowerCase().includes(q.toLowerCase())
    )
  }

  // Budget filter (by minimum price)
  if (maxPrice) {
    const budget = parseInt(maxPrice, 10)
    filtered = filtered.filter((p) =>
      Math.min(...p.currentPrices.map((x) => x.price)) <= budget
    )
  }

  // Sort
  if (sort === 'price-asc') {
    filtered = filtered.sort((a, b) =>
      Math.min(...a.currentPrices.map((x) => x.price)) - Math.min(...b.currentPrices.map((x) => x.price))
    )
  } else if (sort === 'price-desc') {
    filtered = filtered.sort((a, b) =>
      Math.min(...b.currentPrices.map((x) => x.price)) - Math.min(...a.currentPrices.map((x) => x.price))
    )
  } else if (sort === 'name') {
    filtered = filtered.sort((a, b) => a.title.localeCompare(b.title))
  }

  return (
    <div className="relative min-h-screen">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <GradientOrb color1="rgba(59, 130, 246, 0.2)" color2="rgba(147, 51, 234, 0.1)" size={600} top="-10%" left="-10%" />
        <GradientOrb color1="rgba(236, 72, 153, 0.1)" color2="rgba(59, 130, 246, 0.1)" size={500} bottom="10%" right="-10%" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <TextReveal as="h1" className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Explore Mobiles
            </TextReveal>
            <p className="text-slate-400 text-lg">
              Find and compare the latest devices across top retailers. Use our AI-powered filters to narrow down your search.
            </p>
          </div>

          {/* Premium Filter Bar */}
          <div className="p-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10">
            <div className="p-6 md:p-8 rounded-[22px] bg-slate-900/80">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Search Device</label>
                  <form method="get" className="relative group">
                    <input
                      name="q"
                      defaultValue={q}
                      placeholder="e.g. iPhone 15 Pro..."
                      className="w-full bg-slate-800/50 border border-white/5 rounded-2xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                    <button type="submit" className="absolute right-2 top-1.5 p-2 bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </form>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Max Budget</label>
                  <form method="get" className="relative group">
                    <span className="absolute left-4 top-3.5 text-slate-500 font-semibold">₹</span>
                    <input
                      name="maxPrice"
                      defaultValue={maxPrice}
                      inputMode="numeric"
                      placeholder="e.g. 80000"
                      className="w-full bg-slate-800/50 border border-white/5 rounded-2xl pl-8 pr-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                    />
                  </form>
                </div>

                {/* Sort */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Sort By</label>
                  <SortSelector defaultValue={sort} />
                </div>

                {/* Clear */}
                <div className="flex items-end">
                  <a
                    href="/products"
                    className="w-full py-3.5 text-center bg-white/5 hover:bg-white/10 text-white rounded-2xl font-semibold border border-white/10 transition-all hover:border-white/20"
                  >
                    Reset Filters
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <p className="text-slate-400 font-medium">
                Showing <span className="text-white font-bold">{filtered.length}</span> devices
              </p>
              {filtered.length > 0 && (
                <div className="h-px flex-1 mx-8 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="py-20 text-center rounded-3xl bg-white/5 border border-dashed border-white/10">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">No matching devices found</h3>
                <p className="text-slate-400">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((p, index) => (
                  <FlipCard key={p.id} product={p as any} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
