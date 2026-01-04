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
  title: 'Elite Hardware Matrix — Compare Prices | Lifeline',
  description: 'Surgical price analysis and spec deep-dives. Filter your target budget and deployment needs in the Lifeline mobile matrix.',
  keywords: 'high-end mobiles, smartphone matrix, elite price comparison, tech deep dive'
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
      <div className="fixed inset-0 pointer-events-none -z-10 bg-black" />
      <div className="fixed inset-0 pointer-events-none -z-10">
        <GradientOrb color1="rgba(249, 115, 22, 0.15)" color2="rgba(0, 0, 0, 0)" size={700} top="-10%" left="-10%" />
        <GradientOrb color1="rgba(71, 85, 105, 0.1)" color2="rgba(0, 0, 0, 0)" size={600} bottom="10%" right="-10%" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <section className="space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em]">Global Product Matrix</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-6 text-white uppercase tracking-tighter">
              <TextReveal as="span">Explore</TextReveal>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                <TextReveal as="span">Mobiles</TextReveal>
              </span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Surgical speculation on the latest hardware. Filter by tactical budget and analyze market shifts.
            </p>
          </div>

          {/* Premium Filter Bar */}
          <div className="p-1 rounded-[40px] bg-gradient-to-br from-orange-500/20 to-slate-500/10 backdrop-blur-3xl border border-white/5 shadow-2xl">
            <div className="p-8 md:p-10 rounded-[38px] bg-black/60">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Search */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Device Search</label>
                  <form method="get" className="relative group">
                    <input
                      name="q"
                      defaultValue={q}
                      placeholder="e.g. iPhone 15 Pro..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all font-bold"
                    />
                    <button type="submit" className="absolute right-2 top-2 p-2.5 bg-white text-black hover:bg-orange-600 hover:text-white rounded-xl transition-all shadow-lg active:scale-95">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </form>
                </div>

                {/* Budget */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tactical Budget</label>
                  <form method="get" className="relative group">
                    <span className="absolute left-6 top-4 text-orange-500 font-black">₹</span>
                    <input
                      name="maxPrice"
                      defaultValue={maxPrice}
                      inputMode="numeric"
                      placeholder="e.g. 80000"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all font-black"
                    />
                  </form>
                </div>

                {/* Sort */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Priority Order</label>
                  <SortSelector defaultValue={sort} />
                </div>

                {/* Clear */}
                <div className="flex items-end">
                  <a
                    href="/products"
                    className="w-full py-4.5 text-center bg-white/5 hover:bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] border border-white/10 transition-all active:scale-95 flex items-center justify-center h-[58px]"
                  >
                    Reset Parameters
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="space-y-8">
            <div className="flex justify-between items-center px-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black text-white">{filtered.length}</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Hardware Units Detected</span>
              </div>
              {filtered.length > 0 && (
                <div className="h-px flex-1 mx-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="py-32 text-center rounded-[40px] bg-white/5 border border-dashed border-white/10 backdrop-blur-xl">
                <div className="text-8xl mb-8 animate-float">🔍</div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">No Contenders Identified</h3>
                <p className="text-slate-500 font-medium text-lg">Adjust your tactical parameters or units search query.</p>
                <a href="/products" className="mt-8 inline-block px-10 py-4 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-orange-600 hover:text-white transition-all">Show All Matrix</a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
