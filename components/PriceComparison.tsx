import React from 'react'
import { motion } from 'framer-motion'

type Price = { source: string; price: number; url?: string }

export default function PriceComparison({ prices }: { prices: Price[] }) {
  if (!prices || prices.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white/5 rounded-3xl border border-dashed border-white/10">
        No live prices detected in the dimension.
      </div>
    )
  }

  const bestPrice = Math.min(...prices.map((p) => p.price))
  const pricesPercentDiff = (p: number) => ((p - bestPrice) / bestPrice * 100).toFixed(0)

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/5 text-slate-400 border-b border-white/10">
              <th className="px-6 py-4 font-black uppercase tracking-widest text-left">Elite Store</th>
              <th className="px-6 py-4 font-black uppercase tracking-widest text-left">Live Quote</th>
              <th className="px-6 py-4 font-black uppercase tracking-widest text-left">Edge</th>
              <th className="px-6 py-4 font-black uppercase tracking-widest text-right">Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {prices.map((p, idx) => (
              <motion.tr
                key={p.source}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="hover:bg-white/10 transition-colors group"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${p.price === bestPrice ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`} />
                    <span className="text-white font-bold">{p.source}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={p.price === bestPrice ? 'text-green-400 font-black text-lg' : 'text-slate-300'}>
                    ₹{p.price.toLocaleString('en-IN')}
                  </span>
                </td>
                <td className="px-6 py-5">
                  {p.price === bestPrice ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                      Peak Value
                    </span>
                  ) : (
                    <span className="text-slate-500">+{pricesPercentDiff(p.price)}%</span>
                  )}
                </td>
                <td className="px-6 py-5 text-right">
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-orange-600 text-orange-400 hover:text-white transition-all duration-300 text-xs font-black uppercase tracking-widest group-hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                    >
                      Visit
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  ) : (
                    <span className="text-slate-600">—</span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
