import React from 'react'
import { PRODUCTS } from '../../../lib/mockData'
import PriceComparison from '../../../components/PriceComparison'
import PriceHistoryChart from '../../../components/PriceHistoryChart'
import SpecSection from '../../../components/SpecSection'
import { Metadata } from 'next'
import GradientOrb from '../../../components/ui/gradient-orb'
import ParticleBackground from '../../../components/ui/particle-background'
import { motion } from 'framer-motion'

type Props = { params: { slug: string } }

// Dynamic SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = PRODUCTS.find((p) => p.slug === params.slug)
  if (!product) return { title: 'Product not found' }

  const bestPrice = Math.min(...product.currentPrices.map((p) => p.price))
  return {
    title: `${product.title} — Raw Specs & Best Pricing | Lifeline`,
    description: `Deep dive into ${product.title}. Best price detected: ₹${bestPrice.toLocaleString()}. Compare live deals across top elite stores.`,
  }
}

export default async function ProductPage({ params }: Props) {
  const product = PRODUCTS.find((p) => p.slug === params.slug)

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-red-500 uppercase tracking-tighter">Device Not Found</h1>
          <p className="text-slate-400 font-medium">This product has been redacted or does not exist.</p>
          <a href="/products" className="inline-block px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Back to Grid</a>
        </div>
      </div>
    )
  }

  const s = product.specs || {}
  const bestPrice = Math.min(...product.currentPrices.map((p) => p.price))

  return (
    <div className="relative min-h-screen pb-24">
      <ParticleBackground />

      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <GradientOrb color1="rgba(59, 130, 246, 0.2)" color2="rgba(147, 51, 234, 0.1)" size={600} top="-10%" left="-10%" />
        <GradientOrb color1="rgba(236, 72, 153, 0.1)" color2="rgba(59, 130, 246, 0.1)" size={500} bottom="10%" right="-10%" />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-12 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-12">
          <a href="/products" className="inline-flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Terminal / Products / {product.slug}
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-16">

            {/* Hero Section */}
            <section className="relative p-1 rounded-[40px] bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-pink-500/20">
              <div className="relative bg-slate-950/80 backdrop-blur-3xl rounded-[38px] p-8 md:p-12 overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                  {/* Product Image Placeholder/Hero */}
                  <div className="relative group w-full md:w-1/3 aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-violet-600/20 group-hover:opacity-0 transition-opacity duration-700" />
                    <div className="w-full h-full flex items-center justify-center font-black text-6xl text-slate-800 uppercase tracking-tighter">
                      {product.thumbnail ? (
                        <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
                      ) : (
                        product.title[0]
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div>
                      <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4">
                        Premium Listing
                      </div>
                      <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                        {product.title}
                      </h1>
                      <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-xl">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-8 py-6 border-y border-white/5">
                      <div className="space-y-1">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Efficiency</div>
                        <div className="text-xl font-bold text-white uppercase">{s.processor?.name || 'N/A'}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Optics</div>
                        <div className="text-xl font-bold text-white uppercase">{s.camera?.main || 'N/A'}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Display</div>
                        <div className="text-xl font-bold text-white uppercase">{s.display?.size || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Price Battle Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-6">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter whitespace-nowrap">Live Market Quotes</h2>
                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              <PriceComparison prices={product.currentPrices} />
            </section>

            {/* History Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-6">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter whitespace-nowrap">Price Trajectory</h2>
                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              <PriceHistoryChart history={product.priceHistory} />
            </section>

            {/* Specs Breakdown */}
            <section className="space-y-8 pb-12">
              <div className="flex items-center gap-6">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter whitespace-nowrap">Full Technical Spec</h2>
                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              <div className="grid grid-cols-1 gap-6">
                <SpecSection title="Display" iconKey="display" dataA={s.display} />
                <SpecSection title="Performance" iconKey="processor" dataA={s.processor} />
                <SpecSection title="Camera System" iconKey="camera" dataA={s.camera} />
                <SpecSection title="Memory & Matrix" iconKey="memory" dataA={s.memory} />
                <SpecSection title="Power Unit" iconKey="battery" dataA={s.battery} />
                <SpecSection title="Build & Frame" iconKey="build" dataA={s.build} />
              </div>
            </section>
          </div>

          {/* Right Sidebar (Buy Actions) */}
          <aside className="lg:col-span-4 lg:block">
            <div className="sticky top-32 space-y-8">
              <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 space-y-8">
                  <div>
                    <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Exclusive Offer</div>
                    <div className="text-6xl font-black text-white tracking-tighter">
                      ₹{bestPrice.toLocaleString()}
                    </div>
                    <p className="text-sm text-green-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Best Price Detected
                    </p>
                  </div>

                  <div className="space-y-4">
                    <a
                      href={`/api/affiliate?productId=${product.id}&source=amazon&url=${encodeURIComponent(product.affiliates.amazon)}`}
                      className="block w-full py-4 bg-[#FF9900] hover:bg-[#FF8800] text-black font-black uppercase tracking-widest text-sm rounded-2xl text-center shadow-[0_0_20px_rgba(255,153,0,0.2)] hover:shadow-[0_0_25px_rgba(255,153,0,0.4)] transition-all active:scale-95"
                    >
                      Get on Amazon
                    </a>
                    <a
                      href={`/api/affiliate?productId=${product.id}&source=flipkart&url=${encodeURIComponent(product.affiliates.flipkart)}`}
                      className="block w-full py-4 bg-[#2874F0] hover:bg-[#1E6BFF] text-white font-black uppercase tracking-widest text-sm rounded-2xl text-center shadow-[0_0_20px_rgba(40,116,240,0.2)] hover:shadow-[0_0_25px_rgba(40,116,240,0.4)] transition-all active:scale-95"
                    >
                      Get on Flipkart
                    </a>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <div className="flex gap-4 items-center mb-6">
                      <div className="text-2xl opacity-50">🛡️</div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                        Tracked Link: We may receive an elite commission at zero extra cost to you.
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Verified Listing</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary CTA: Comparison */}
              <div className="p-6 rounded-[32px] bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 text-center">
                <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4">Unsure?</h4>
                <a href={`/compare?productA=${product.slug}`} className="text-xs font-bold text-blue-400 hover:text-white transition-colors uppercase tracking-[0.2em]">
                  Battle this Device →
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
