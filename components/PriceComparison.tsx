import React from 'react'

type Price = { source: string; price: number; url?: string }

export default function PriceComparison({ prices }: { prices: Price[] }) {
  if (!prices || prices.length === 0) {
    return <div className="p-3 text-slate-500 bg-slate-50 rounded">No prices available</div>
  }

  const bestPrice = Math.min(...prices.map((p) => p.price))
  const pricesPercentDiff = (p: number) => ((p - bestPrice) / bestPrice * 100).toFixed(0)

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-slate-100 text-left">
            <th className="px-4 py-3 font-semibold">Store</th>
            <th className="px-4 py-3 font-semibold">Price</th>
            <th className="px-4 py-3 font-semibold">Diff</th>
            <th className="px-4 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((p) => (
            <tr key={p.source} className="border-t hover:bg-slate-50 transition">
              <td className="px-4 py-3 font-medium">{p.source}</td>
              <td className="px-4 py-3">
                <span className={p.price === bestPrice ? 'text-green-600 font-bold' : ''}>
                  ₹{p.price.toLocaleString('en-IN')}
                </span>
              </td>
              <td className="px-4 py-3">
                {p.price === bestPrice ? (
                  <span className="text-green-600 font-semibold">Best</span>
                ) : (
                  <span className="text-red-600">+{pricesPercentDiff(p.price)}%</span>
                )}
              </td>
              <td className="px-4 py-3">
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
                    View
                  </a>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
