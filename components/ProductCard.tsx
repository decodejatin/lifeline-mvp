import React from 'react'

type Price = { source: string; price: number; url: string }

type Product = {
  id: string
  slug: string
  title: string
  description: string
  thumbnail?: string
  currentPrices: Price[]
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="p-4 bg-white rounded shadow-sm">
      <a href={`/products/${product.slug}`}>
        <div className="h-40 bg-slate-100 rounded mb-3 flex items-center justify-center">{product.thumbnail || 'Image'}</div>
        <h3 className="font-semibold text-lg">{product.title}</h3>
      </a>
      <p className="text-sm text-slate-600 mt-1">{product.description}</p>
      <div className="mt-3 text-sm text-slate-700">
        Best: <strong>₹{Math.min(...product.currentPrices.map((p) => p.price))}</strong>
      </div>
    </article>
  )
}
