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
        <GradientOrb color1="rgba(59, 130, 246, 0.4)" color2="rgba(147, 51, 234, 0.2)" size={600} top="-10%" left="-10%" delay={0} />
        <GradientOrb color1="rgba(236, 72, 153, 0.3)" color2="rgba(59, 130, 246, 0.2)" size={500} top="20%" right="-10%" delay={0.3} />
        <GradientOrb color1="rgba(147, 51, 234, 0.3)" color2="rgba(59, 130, 246, 0.2)" size={400} bottom="10%" left="10%" delay={0.6} />

        {/* HERO SECTION */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
          <div className="max-w-6xl mx-auto text-center z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20 backdrop-blur-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                AI-Powered Comparison Engine
              </span>
            </div>

            {/* Main Heading with Text Reveal */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 font-heading tracking-tight">
              <TextReveal as="span" className="block mb-4">
                Find Your
              </TextReveal>
              <span className="block bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Perfect Device
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Stop scrolling through endless reviews. Our AI analyzes{' '}
              <span className="text-blue-400 font-semibold">real-time prices</span>,{' '}
              <span className="text-violet-400 font-semibold">deep specs</span>, and{' '}
              <span className="text-pink-400 font-semibold">expert ratings</span>{' '}
              to find your perfect match.
            </p>

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

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-2">
                  500+
                </div>
                <div className="text-sm text-slate-400">Phones Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  10K+
                </div>
                <div className="text-sm text-slate-400">Comparisons Made</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  98%
                </div>
                <div className="text-sm text-slate-400">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="relative py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Why Choose Lifeline?
              </h2>
              <p className="text-xl text-slate-400">
                Powered by cutting-edge technology
              </p>
            </div>

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
                <Link
                  key={index}
                  href={feature.href || '#'}
                  className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 overflow-hidden"
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
              ))}
            </div>
          </div>
        </section>

        {/* TRENDING SECTION */}
        <section id="trending" className="relative py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                Trending Battles
              </h2>
              <p className="text-xl text-slate-400">
                Most compared phones this week
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <FlipCard key={product.id} product={product} index={index} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              >
                View All Phones
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
