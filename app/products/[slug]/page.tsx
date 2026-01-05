import React from 'react'
import { notFound } from 'next/navigation'
import { PRODUCTS } from '@/lib/mockData'
import PriceHistoryChart from '@/components/PriceHistoryChart'
import CustomCursor from '@/components/ui/custom-cursor'
import FloatingNav from '@/components/ui/floating-nav'
import ScrollReveal from '@/components/ui/scroll-reveal'
import Link from 'next/link'
import {
  ArrowLeft,
  ExternalLink,
  Zap,
  Camera,
  Battery,
  Smartphone,
  Cpu,
  ShieldCheck,
  Wifi,
  Activity,
  Award,
  BarChart3,
  ArrowRight
} from 'lucide-react'
import ReviewMatrix from '@/components/ReviewMatrix'
import DetailedSpecs from '@/components/DetailedSpecs'
import ExpertVerdict from '@/components/ExpertVerdict'
import { SentimentItem } from '@/lib/mockData'

interface PageProps {
  params: { slug: string }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = params
  const product = PRODUCTS.find(p => p.slug === slug)

  if (!product) {
    notFound()
  }

  const bestPrice = Math.min(...product.currentPrices.map(p => p.price))

  // Intelligence: High-impact competitor logic
  const competitor = PRODUCTS.find(p => p.category === product.category && p.id !== product.id) || PRODUCTS[0]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <FloatingNav />

      {/* Header / Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Abstract background blur */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-7xl mx-auto">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest mb-12 border border-white/5 hover:border-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft size={14} /> Back to Catalog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left: Image & Badge */}
            <ScrollReveal direction="left">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-1000"
                  />
                  {/* Floating Specs Overlay */}
                  <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4">
                    <div className="glass-dark p-6 rounded-3xl border border-white/10 backdrop-blur-xl">
                      <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Display Rank</div>
                      <div className="text-xl font-black text-white italic">AA+ LEVEL</div>
                    </div>
                    <div className="glass-dark p-6 rounded-3xl border border-white/10 backdrop-blur-xl">
                      <div className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-1">Efficiency</div>
                      <div className="text-xl font-black text-white italic">TOP 3%</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Info */}
            <ScrollReveal direction="right" className="space-y-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-6 backdrop-blur-md">
                  Device Analysis Hub / {product.category}
                </div>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.85] mb-6">
                  {product.title.split(' ').slice(0, -1).join(' ')} <span className="text-emerald-500">{product.title.split(' ').pop()}</span>
                </h1>
                <p className="text-xl text-slate-400 font-light leading-relaxed max-w-xl italic">
                  "{product.description}"
                </p>
              </div>

              {/* Price Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.currentPrices.map((price) => (
                  <div key={price.source} className="p-8 glass-dark rounded-3xl border border-white/5 hover:border-emerald-500/20 transition-all flex justify-between items-center group">
                    <div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{price.source}</div>
                      <div className="text-3xl font-black text-white italic group-hover:text-emerald-400 transition-colors">₹{price.price.toLocaleString()}</div>
                    </div>
                    <a href={price.url} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                ))}
              </div>

              {/* Specification Grid Quick View */}
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <Cpu size={12} /> Processor
                  </div>
                  <div className="text-sm font-bold text-white uppercase leading-tight">{product.specs.processor.name}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <Battery size={12} /> Endurance
                  </div>
                  <div className="text-sm font-bold text-white uppercase leading-tight">{product.specs.battery.capacity}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <Award size={12} /> Score
                  </div>
                  <div className="text-sm font-bold text-white uppercase leading-tight">{product.specs.processor.antutuScore}</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-32 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Price Chart */}
            <div className="lg:col-span-8 space-y-8">
              <ScrollReveal direction="up">
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tight">Market <span className="text-emerald-500">Volatility</span></h2>
                    <p className="text-slate-500 font-medium uppercase tracking-widest text-xs mt-2">60-Day Intelligence Feed</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Best Recorded Value</div>
                    <div className="text-2xl font-black text-white italic">₹{Math.min(...product.priceHistory.map(h => h.price)).toLocaleString()}</div>
                  </div>
                </div>
                <div className="glass-dark p-8 rounded-[3rem] border border-white/5 min-h-[400px]">
                  <PriceHistoryChart data={product.priceHistory} />
                </div>
              </ScrollReveal>

              {/* Review Synthesis - Real-time Sentiment Array */}
              <ScrollReveal direction="up" delay={0.1}>
                <div className="mb-12 text-center md:text-left">
                  <h2 className="text-4xl font-black text-white uppercase italic tracking-tight">Experience <span className="text-emerald-500">Synthesis</span></h2>
                  <p className="text-slate-500 font-medium uppercase tracking-widest text-xs mt-2">Aggregated Expert & User Intelligence Feed</p>
                </div>
                <ReviewMatrix positive={product.sentiment.positive} negative={product.sentiment.negative} />
              </ScrollReveal>
            </div>

            {/* Spec Matrix Hub */}
            <div className="lg:col-span-4 space-y-8">
              <ScrollReveal direction="up" delay={0.2}>
                <div className="mb-10">
                  <h2 className="text-4xl font-black text-white uppercase italic tracking-tight">Tech <span className="text-cyan-500">Signature</span></h2>
                  <p className="text-slate-500 font-medium uppercase tracking-widest text-xs mt-2">Core Component Matrix</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Display Logic', value: `${product.specs.display.size} / ${product.specs.display.refreshRate}`, icon: BarChart3 },
                    { label: 'Imaging Array', value: product.specs.camera.main.split(' ')[0], icon: Camera },
                    { label: 'Energy Node', value: product.specs.battery.charging, icon: Zap },
                    { label: 'Material Science', value: product.specs.build.material.split(',')[0], icon: ShieldCheck },
                    { label: 'Network Class', value: product.specs.connectivity.fiveG ? '5G EXTREME' : '4G LTE', icon: Wifi },
                    { label: 'Kernel Version', value: product.specs.software.os, icon: Activity }
                  ].map((spec, i) => (
                    <div key={i} className="flex items-center justify-between p-6 glass-dark rounded-2xl border border-white/5 hover:border-white/10 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-slate-900 text-slate-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                          <spec.icon size={18} />
                        </div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{spec.label}</span>
                      </div>
                      <span className="text-sm font-black text-white uppercase italic">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Competitor Analysis Node */}
                <div className="mt-12 p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-black border border-white/5 relative overflow-hidden group/comp">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Activity size={12} className="text-emerald-500" /> Direct Competitor Found
                  </div>
                  <Link href={`/products/${competitor.slug}`} className="flex items-center gap-5 group">
                    <div className="relative">
                      <img src={competitor.thumbnail} className="w-20 h-20 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-95 group-hover:scale-100" />
                      <div className="absolute inset-0 border border-white/10 rounded-2xl" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg font-black text-white uppercase italic tracking-tighter leading-none">{competitor.title}</div>
                      <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.1em] flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Intelligence <ArrowRight size={10} />
                      </div>
                    </div>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <ExpertVerdict
          score={88}
          summary="A tour-de-force of engineering that manages to balance experimental imaging tech with rock-solid daily reliability. It's the most cohesive flagship of the year."
          verdict="Buy"
          subScores={[
            { label: 'Optics', value: 92 },
            { label: 'Compute', value: 96 },
            { label: 'Panel', value: 94 },
            { label: 'Thermal', value: 82 }
          ]}
        />
        <DetailedSpecs specs={product.specs} />
      </div>

      {/* SEO Intelligence: JSON-LD Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.title,
            image: product.thumbnail,
            description: product.description,
            brand: { '@type': 'Brand', name: product.category },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'INR',
              lowPrice: bestPrice,
              highPrice: Math.max(...product.currentPrices.map(p => p.price)),
              offerCount: product.currentPrices.length,
              offers: product.currentPrices.map(p => ({
                '@type': 'Offer',
                price: p.price,
                url: p.url,
                seller: { '@type': 'Organization', name: p.source }
              }))
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '1240'
            }
          })
        }}
      />

      {/* Extreme Comparison Banner */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto glass-dark p-16 rounded-[4rem] border border-white/5 text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <ScrollReveal direction="up">
            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-8 max-w-4xl mx-auto leading-none">
              How Does It Stack Up Against The <span className="text-emerald-500">Elite Competition?</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/compare"
                className="px-12 py-5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-black uppercase tracking-widest rounded-2xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105"
              >
                Initiate Comparison Engine
              </Link>
              <Link
                href="/nexus"
                className="px-12 py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-black uppercase tracking-widest rounded-2xl transition-all"
              >
                View in 3D Nexus Arena
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
