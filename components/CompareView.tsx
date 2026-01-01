import React from 'react'

type Price = { source: string; price: number; url?: string }

type Product = {
  id: string
  slug: string
  title: string
  description?: string
  currentPrices: Price[]
  priceHistory: { recordedAt: string; price: number }[]
}

export default function CompareView({ a, b }: { a: Product; b: Product }) {
  const bestPrice = (p: Product) => Math.min(...p.currentPrices.map((x) => x.price))
  const priceDiff = bestPrice(a) - bestPrice(b)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-4 bg-white rounded border">
        <h3 className="font-semibold text-lg">{a.title}</h3>
        <p className="text-sm text-slate-600">{a.description}</p>
        <div className="mt-3">
          <div className="text-xs text-slate-500">Best price</div>
          <div className="text-xl font-bold">₹{bestPrice(a)}</div>
        </div>
        <div className="mt-3">
          <div className="text-xs text-slate-500">Prices</div>
          <ul className="mt-1">
            {a.currentPrices.map((p) => (
              <li key={p.source} className="text-sm">{p.source}: ₹{p.price}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 bg-white rounded border">
        <h3 className="font-semibold text-lg">{b.title}</h3>
        <p className="text-sm text-slate-600">{b.description}</p>
        <div className="mt-3">
          <div className="text-xs text-slate-500">Best price</div>
          <div className="text-xl font-bold">₹{bestPrice(b)}</div>
        </div>
        <div className="mt-3">
          <div className="text-xs text-slate-500">Prices</div>
          <ul className="mt-1">
            {b.currentPrices.map((p) => (
              <li key={p.source} className="text-sm">{p.source}: ₹{p.price}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="md:col-span-2 p-4 bg-white rounded border">
        <h4 className="font-semibold">Summary</h4>
        <div className="mt-2 text-sm text-slate-700">
          Price difference: <strong>₹{Math.abs(priceDiff)}</strong> {priceDiff > 0 ? `( ${b.title} is cheaper )` : priceDiff < 0 ? `( ${a.title} is cheaper )` : '( same price )'}
        </div>
        <div className="mt-3 text-xs text-slate-500">Note: Prices are fetched from affiliate APIs or mock data in MVP. TODO: add real-time freshness indicator.</div>
      </div>
    </div>
  )
}
