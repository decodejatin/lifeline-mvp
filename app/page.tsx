import React from 'react'
import Link from 'next/link'
import { PRODUCTS } from '../lib/mockData'
import FlipCard from '../components/ui/flip-card'
import ParticleBackground from '../components/ui/particle-background'
import CustomCursor from '../components/ui/custom-cursor'
import FloatingNav from '../components/ui/floating-nav'
import GradientOrb from '../components/ui/gradient-orb'
import TextReveal from '../components/animations/TextReveal'
import MagneticButton from '../components/ui/magnetic-button'
import ScrollReveal from '../components/ui/scroll-reveal'
import TrustBanner from '../components/ui/trust-banner'
import NewsletterSection from '../components/ui/newsletter-section'

export default async function HomePage() {
  const products = PRODUCTS.slice(0, 6) // Show only 6 products
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

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

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Floating Navigation */}
      <FloatingNav />

      {/* Particle Background */}
      <ParticleBackground />

      <div className="relative min-h-screen">
        {/* Gradient Orbs */}
        <GradientOrb color1="rgba(16, 185, 129, 0.2)" color2="rgba(6, 182, 212, 0.1)" size={600} top="-10%" left="-10%" delay={0} />
        <GradientOrb color1="rgba(14, 165, 233, 0.15)" color2="rgba(16, 185, 129, 0.1)" size={500} top="20%" right="-10%" delay={0.3} />
        <GradientOrb color1="rgba(20, 184, 166, 0.15)" color2="rgba(16, 185, 129, 0.1)" size={400} bottom="10%" left="10%" delay={0.6} />

        {/* HERO SECTION */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
          <div className="max-w-6xl mx-auto text-center z-10">
            <ScrollReveal direction="down" delay={0.1}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-400/80">
                  Precision Price Engine v2.0
                </span>
              </div>
            </ScrollReveal>

            {/* Main Heading with Text Reveal */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 font-heading tracking-tight">
              <TextReveal as="span" className="block mb-4">
                Find Your
              </TextReveal>
              <ScrollReveal direction="up" delay={0.3}>
                <span className="block text-white leading-tight">
                  The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Buying</span>
                </span>
              </ScrollReveal>
            </h1>

            <ScrollReveal direction="up" delay={0.4}>
              {/* Subtitle */}
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                Intelligent data mapping and real-time analysis to help you secure the best value for your next upgrade.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <MagneticButton href="/nexus" strength={0.4}>
                  <span className="flex items-center gap-2">
                    Enter The Nexus (3D)
                    <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </span>
                </MagneticButton>

                <Link
                  href="/compare"
                  className="group px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 backdrop-blur-sm"
                >
                  <span className="flex items-center gap-2">
                    Start Comparing
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-12 max-w-3xl mx-auto pt-8 border-t border-white/5">
                <div className="text-center group">
                  <div className="text-3xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                    1,200+
                  </div>
                  <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Specs Indexed</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    5min
                  </div>
                  <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Update Frequency</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                    24/7
                  </div>
                  <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Price Monitoring</div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        <TrustBanner />

        {/* FEATURES SECTION */}
        <section id="features" className="relative py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Engineered for <span className="text-emerald-500">Precision</span>
              </h2>
              <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full mb-6 opacity-50" />
              <p className="text-lg text-slate-400 font-light">
                Advanced comparison architecture for the discerning buyer
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: '🎮',
                  title: '3D Battle Arena',
                  description: 'Experience gadget comparison like never before in our interactive, real-time 3D Nexus environment.',
                  gradient: 'from-blue-600 to-indigo-600',
                  href: '/nexus'
                },
                {
                  icon: '🤖',
                  title: 'AI Verdicts',
                  description: 'Machine learning algorithms analyze thousands of data points to give you unbiased recommendations.',
                  gradient: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: '⚡',
                  title: 'Real-Time Prices',
                  description: 'Live price tracking across Amazon and Flipkart. Never miss a deal or pay more than you should.',
                  gradient: 'from-violet-500 to-purple-500'
                },
                {
                  icon: '🔬',
                  title: 'Deep Analysis',
                  description: 'From camera sensors to charging speeds, we compare the specs that actually matter to you.',
                  gradient: 'from-pink-500 to-rose-500'
                }
              ].map((feature, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                  <Link
                    href={feature.href || '#'}
                    className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 overflow-hidden h-full block"
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                    {/* Icon */}
                    <div className="text-6xl mb-6">{feature.icon}</div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Hover indicator */}
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* TRENDING SECTION */}
        <section id="trending" className="relative py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal direction="up" className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Trending <span className="text-cyan-500">Analyses</span>
              </h2>
              <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full mb-6 opacity-50" />
              <p className="text-lg text-slate-400 font-light">
                Synthesized insights from the most sought-after devices
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <ScrollReveal key={product.id} direction="up" delay={index * 0.1}>
                  <FlipCard product={product} index={index} />
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="up" className="text-center mt-12">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              >
                View All Phones
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
        </section>

        <NewsletterSection />
      </div>
    </>
  )
}
