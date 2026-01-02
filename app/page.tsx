import React from 'react'
import Link from 'next/link'
import HomeControls from '../components/HomeControls'
import { PRODUCTS } from '../lib/mockData'
import ProductCard from '../components/ProductCard'

export default async function HomePage() {
  const products = PRODUCTS
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // FAQ schema for SEO (kept from before, good practice)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I compare mobile prices?',
        acceptedAnswer: { '@type': 'Answer', text: 'Select two mobile models using the dropdown selectors and click Compare...' }
      }
    ]
  }

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lifeline',
    url: siteUrl,
    description: 'Compare mobile prices across Amazon and Flipkart.'
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Background Gradients */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
          <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
        </div>

        <div className="space-y-20">
          {/* HERO SECTION */}
          <section className="text-center py-20 px-4 relative">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase">
              🚀 The Ultimate Mobile Buying Guide
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-heading tracking-tight text-slate-900 animate-fade-in-up">
              Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Perfect Phone</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animate-delay-100">
              Stop guessing. Start comparing. real-time prices, deep specs analysis, and AI-driven verdicts to help you choose the best device.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animate-delay-200">
              <Link
                href="/compare"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition shadow-lg shadow-blue-500/30 flex items-center gap-2 animate-pulse-slow"
              >
                Start Comparison
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
              <Link
                href="/products"
                className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-semibold text-lg transition shadow-sm"
              >
                Browse Phones
              </Link>
            </div>
          </section>

          {/* FEATURES GRID */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 animate-fade-in-up animate-delay-300">
            <div className="glass p-8 rounded-2xl relative overflow-hidden group hover:scale-[1.02] transition duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-blue-500/20 transition"></div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">AI Verdicts</h3>
              <p className="text-slate-600 leading-relaxed">
                Our algorithm analyzes processor, camera, and battery specs to give you a clear winner.
              </p>
            </div>

            <div className="glass p-8 rounded-2xl relative overflow-hidden group hover:scale-[1.02] transition duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-purple-500/20 transition"></div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">Live Prices</h3>
              <p className="text-slate-600 leading-relaxed">
                Real-time price tracking from Amazon and Flipkart. Never pay more than you need to.
              </p>
            </div>

            <div className="glass p-8 rounded-2xl relative overflow-hidden group hover:scale-[1.02] transition duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-amber-500/20 transition"></div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">Deep Specs</h3>
              <p className="text-slate-600 leading-relaxed">
                From sensor sizes to charging wattage, we compare the details that actually matter.
              </p>
            </div>
          </section>

          {/* TRENDING SECTION */}
          <section className="py-12">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold mb-2 font-heading">Trending Now</h2>
              <p className="text-slate-600">Poplular models currently being compared</p>
            </div>

            {/* Reuse existing controls for filtering, but style them nicer? For MVP, standard is fine */}
            <div className="mb-8">
              <HomeControls products={products} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
