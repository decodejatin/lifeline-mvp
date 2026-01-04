import React from 'react'
import { PRODUCTS } from '../../../lib/mockData'
import PriceComparison from '../../../components/PriceComparison'
import PriceHistoryChart from '../../../components/PriceHistoryChart'
import SpecSection from '../../../components/SpecSection'
import { Metadata } from 'next'
import GradientOrb from '../../../components/ui/gradient-orb'
import ParticleBackground from '../../../components/ui/particle-background'
import SEOHeader from '../../../components/SEOHeader'
import ExpertVerdict from '../../../components/ExpertVerdict'
import ReviewMatrix from '../../../components/ReviewMatrix'
import PriceAlert from '../../../components/PriceAlert'
import { calculateScores } from '../../../lib/scoring'

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
          <h1 className="text-4xl font-black text-red-500 uppercase tracking-tighter">Device Redacted</h1>
          <p className="text-slate-400 font-medium">This identifier does not exist in our central matrix.</p>
          <a href="/products" className="inline-block px-10 py-4 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-orange-600 hover:text-white transition-all">Re-enter Grid</a>
        </div>
      </div>
    )
  }

  const s = product.specs || {}
  const bestPrice = Math.min(...product.currentPrices.map((p) => p.price))
  const scores = calculateScores(s)

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": product.thumbnail,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": bestPrice,
      "offerCount": product.currentPrices.length
    }
  }

  return (
    <div className="relative min-h-screen pb-24 bg-black">
      <SEOHeader title={product.title} description={product.description} jsonLd={jsonLd} />
      <ParticleBackground />

      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <GradientOrb color1="rgba(249, 115, 22, 0.1)" color2="rgba(0,0,0,0)" size={800} top="-10%" left="-10%" />
        <GradientOrb color1="rgba(71, 85, 105, 0.05)" color2="rgba(0,0,0,0)" size={600} bottom="10%" right="-10%" />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-16 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-16">
          <a href="/products" className="inline-flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] hover:text-orange-500 transition-colors group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Matrix / Products / {product.slug}
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-24">

            {/* Hero Section */}
            <section className="relative p-1 rounded-[48px] bg-gradient-to-br from-orange-500/20 to-slate-500/10">
              <div className="relative bg-black/60 backdrop-blur-3xl rounded-[46px] p-8 md:p-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full -mr-32 -mt-32" />

                <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center">
                  {/* Product Image */}
                  <div className="relative group w-full md:w-2/5 aspect-[3/4] rounded-[32px] overflow-hidden border border-white/10 bg-black/50 shadow-2xl">
                    {product.thumbnail ? (
                      <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-black text-8xl text-slate-800 uppercase tracking-tighter">
                        {product.title[0]}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="flex-1 space-y-10">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest">
                        High Priority Asset
                      </div>
                      <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                        {product.title}
                      </h1>
                      <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                        {product.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-8 py-10 border-y border-white/5">
                      <div className="space-y-2">
                        <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Efficiency</div>
                        <div className="text-xl font-black text-white uppercase">{s.processor?.name.split(' ')[0] || 'N/A'}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Sensor</div>
                        <div className="text-xl font-black text-white uppercase">{s.camera?.main.split(' ')[0] || 'N/A'}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Matrix</div>
                        <div className="text-xl font-black text-white uppercase">{s.display?.size.split(' ')[0] || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Expert Verdict */}
            <ExpertVerdict scores={scores} />

            {/* Price Battle Section */}
            <section className="space-y-12">
              <div className="flex items-center gap-8">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter whitespace-nowrap">Market Intelligence</h2>
                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              <PriceComparison prices={product.currentPrices} />
            </section>

            {/* History Section */}
            <section className="space-y-12">
              <div className="flex items-center gap-8">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter whitespace-nowrap">Value Trajectory</h2>
                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              <PriceHistoryChart history={product.priceHistory} />
            </section>

            {/* Review Matrix & Sentinel */}
            <section className="grid md:grid-cols-2 gap-12">
              <ReviewMatrix />
              <PriceAlert productTitle={product.title} />
            </section>

            {/* Specs Breakdown */}
            <section className="space-y-12 pb-12">
              <div className="flex items-center gap-8">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter whitespace-nowrap">Technical Manifest</h2>
                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              <div className="grid grid-cols-1 gap-8">
                <SpecSection title="Visual Output" iconKey="display" dataA={s.display} />
                <SpecSection title="Neural Processor" iconKey="processor" dataA={s.processor} />
                <SpecSection title="Optical Array" iconKey="camera" dataA={s.camera} />
                <SpecSection title="Memory Module" iconKey="memory" dataA={s.memory} />
                <SpecSection title="Power Core" iconKey="battery" dataA={s.battery} />
                <SpecSection title="Structural Frame" iconKey="build" dataA={s.build} />
              </div>
            </section>
          </div>

          {/* Right Sidebar (Buy Actions) */}
          <aside className="lg:col-span-4 lg:block">
            <div className="sticky top-32 space-y-8">
              <div className="p-10 rounded-[48px] bg-white text-black shadow-2xl overflow-hidden relative group">
                <div className="relative z-10 space-y-10">
                  <div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Elite Market Price</div>
                    <div className="text-7xl font-black tracking-tighter">
                      ₹{bestPrice.toLocaleString()}
                    </div>
                    <p className="text-xs font-black text-green-600 uppercase tracking-[0.2em] mt-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                      Optimum Entry Point
                    </p>
                  </div>

                  <div className="space-y-4">
                    <a
                      href={`/api/affiliate?productId=${product.id}&source=amazon&url=${encodeURIComponent(product.affiliates.amazon)}`}
                      className="group flex items-center justify-between w-full px-8 py-6 bg-black text-white font-black uppercase tracking-widest text-xs rounded-[24px] transition-all hover:bg-orange-600 active:scale-95 shadow-xl"
                    >
                      Deploy to Amazon
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                    <a
                      href={`/api/affiliate?productId=${product.id}&source=flipkart&url=${encodeURIComponent(product.affiliates.flipkart)}`}
                      className="group flex items-center justify-between w-full px-8 py-6 bg-white border-2 border-black text-black font-black uppercase tracking-widest text-xs rounded-[24px] transition-all hover:bg-black hover:text-white active:scale-95 shadow-xl"
                    >
                      Extract Flipkart
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>

                  <div className="pt-8 border-t border-black/5">
                    <div className="flex gap-4 items-start mb-8 opacity-60">
                      <div className="text-2xl mt-1">🛡️</div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                        Secure Link: Encryption active. We may receive tactical commission at zero cost.
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Asset ID: {product.id}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary CTA: Comparison */}
              <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 text-center backdrop-blur-xl">
                <h4 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6">Strategic Conflict?</h4>
                <a href={`/compare?productA=${product.slug}`} className="inline-block w-full py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl border border-white/10 transition-all">
                  Measure against Rival
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
