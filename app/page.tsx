import React from 'react'
import HomeControls from '../components/HomeControls'
import { PRODUCTS } from '../lib/mockData'
import ProductCard from '../components/ProductCard'

export default async function HomePage() {
  const products = PRODUCTS
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // FAQ schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I compare mobile prices?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select two mobile models using the dropdown selectors and click Compare to see a side-by-side comparison of features, prices, and history.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you earn commission from affiliate links?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we earn a commission from Amazon and Flipkart affiliate links at no extra cost to you. We are transparent about this.'
        }
      },
      {
        '@type': 'Question',
        name: 'How often are prices updated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Prices are updated regularly through our API integrations with affiliate platforms. Check price history to see trends.'
        }
      }
    ]
  }

  // Organization schema
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lifeline',
    url: siteUrl,
    description: 'Compare mobile prices across Amazon and Flipkart with real-time data and price history.',
    sameAs: []
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <section>
        <h1 className="text-4xl font-bold mb-4">Find and Compare Mobiles</h1>
        <p className="text-lg text-slate-600 mb-8">
          Compare mobile phone prices across Amazon and Flipkart. Track price history, read comparisons, and save on your next purchase with verified affiliate links.
        </p>

        <HomeControls products={products} />

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Latest Mobile Comparisons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        <div className="mt-12 bg-slate-50 p-6 rounded">
          <h3 className="text-lg font-semibold mb-3">Why Choose Lifeline?</h3>
          <ul className="space-y-2 text-slate-700">
            <li>✓ Real-time price comparison across top retailers</li>
            <li>✓ Detailed price history and trends for each product</li>
            <li>✓ Transparent affiliate links — no hidden markups</li>
            <li>✓ Mobile-first, fast-loading experience</li>
            <li>✓ SEO-optimized product pages for easy discovery</li>
          </ul>
        </div>
      </section>
    </>
  )
}
