import React from 'react'
import { PRODUCTS } from '../../../lib/mockData'
import PriceComparison from '../../../components/PriceComparison'
import PriceHistoryChart from '../../../components/PriceHistoryChart'
import { Metadata } from 'next'

type Props = { params: { slug: string } }

// Dynamic SEO metadata with Open Graph and Twitter cards
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = PRODUCTS.find((p) => p.slug === params.slug)

  if (!product) {
    return {
      title: 'Product not found',
      description: 'This product does not exist.'
    }
  }

  const bestPrice = Math.min(...product.currentPrices.map((p) => p.price))
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonicalUrl = `${siteUrl}/products/${product.slug}`

  return {
    title: `${product.title} — Best Price ₹${bestPrice} | Lifeline`,
    description: `${product.description} Compare prices on ${product.title} across Amazon and Flipkart. Best price: ₹${bestPrice}. Check price history and buy via affiliate links.`,
    keywords: `${product.title}, mobile price, compare ${product.title}, ${product.title} price in India, buy ${product.title}`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.title} — Best Price ₹${bestPrice}`,
      description: `Compare ${product.title} prices across stores. Best: ₹${bestPrice}`,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: `${siteUrl}/products/${product.slug}/og-image.png`,
          width: 1200,
          height: 630,
          alt: product.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} — Best Price ₹${bestPrice}`,
      description: `Compare prices across Amazon & Flipkart. Best: ₹${bestPrice}`
    }
  }
}

export default async function ProductPage({ params }: Props) {
  const product = PRODUCTS.find((p) => p.slug === params.slug)

  if (!product) {
    return (
      <div className="p-6 bg-white rounded border text-center">
        <h1 className="text-xl font-semibold text-red-600">Product not found</h1>
        <p className="text-slate-600 mt-2">Sorry, this product doesn't exist.</p>
      </div>
    )
  }

  const affiliateAmazon = product.affiliates.amazon
  const affiliateFlipkart = product.affiliates.flipkart
  const bestPrice = Math.min(...product.currentPrices.map((p) => p.price))
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // JSON-LD schema.org markup for rich snippets
  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: `${siteUrl}/products/${product.slug}/og-image.png`,
    brand: {
      '@type': 'Brand',
      name: product.title.split(' ')[0]
    },
    offers: product.currentPrices.map((p) => ({
      '@type': 'Offer',
      url: `${siteUrl}/api/affiliate?productId=${product.id}&source=${p.source.toLowerCase()}&url=${encodeURIComponent(p.url || '')}`,
      priceCurrency: 'INR',
      price: p.price,
      seller: {
        '@type': 'Organization',
        name: p.source
      },
      availability: 'https://schema.org/InStock'
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '128'
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <article className="max-w-4xl">
        <div className="mb-4">
          <a href="/products" className="text-sm text-slate-600 hover:text-slate-900">← Back to products</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-lg text-slate-600 mb-4">{product.description}</p>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
              <div className="text-sm text-slate-600">Best Price Available</div>
              <div className="text-3xl font-bold text-amber-600">₹{bestPrice.toLocaleString('en-IN')}</div>
            </div>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Price Comparison</h2>
              <PriceComparison prices={product.currentPrices} />
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Price History</h2>
              <PriceHistoryChart history={product.priceHistory} />
            </section>
          </div>

          <aside className="bg-white rounded border p-4 h-fit">
            <h3 className="font-semibold mb-4">Buy Now</h3>
            <div className="space-y-3">
              <a
                href={`/api/affiliate?productId=${product.id}&source=amazon&url=${encodeURIComponent(affiliateAmazon)}`}
                className="block w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white text-center rounded font-semibold transition"
              >
                Buy on Amazon
              </a>
              <a
                href={`/api/affiliate?productId=${product.id}&source=flipkart&url=${encodeURIComponent(affiliateFlipkart)}`}
                className="block w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-center rounded font-semibold transition"
              >
                Buy on Flipkart
              </a>
            </div>
            <p className="text-xs text-slate-500 mt-4">We earn a commission from affiliate links at no extra cost to you.</p>
          </aside>
        </div>
      </article>
    </>
  )
}
