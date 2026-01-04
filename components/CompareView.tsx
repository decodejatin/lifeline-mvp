import React from 'react'
import CompareHeader from './CompareHeader'
import SpecSection from './SpecSection'
import RatingRadar from './RatingRadar'
import { calculateScores } from '../lib/scoring'
import { motion } from 'framer-motion'

type Price = { source: string; price: number; url?: string }

type Product = {
  id: string
  slug: string
  title: string
  description?: string
  thumbnail?: string | null
  currentPrices: Price[]
  priceHistory: { recordedAt: string; price: number }[]
  specs?: any
}

export default function CompareView({ a, b }: { a: Product; b: Product }) {
  const pricesA = a.currentPrices || []
  const pricesB = b.currentPrices || []
  const bestPriceA = pricesA.length > 0 ? Math.min(...pricesA.map((x) => x.price)) : 0
  const bestPriceB = pricesB.length > 0 ? Math.min(...pricesB.map((x) => x.price)) : 0

  const sA = a.specs || {}
  const sB = b.specs || {}

  const scoresA = calculateScores(sA)
  const scoresB = calculateScores(sB)

  return (
    <div className="pb-20 space-y-12">
      <CompareHeader a={a} b={b} />

      {/* Pricing Battle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { p: a, price: bestPriceA, other: bestPriceB, theme: 'orange' },
          { p: b, price: bestPriceB, other: bestPriceA, theme: 'slate' }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className={`relative p-8 rounded-3xl border transition-all duration-500 overflow-hidden group ${item.price > 0 && item.price < item.other
              ? `bg-${item.theme}-500/10 border-${item.theme}-500/50 shadow-[0_0_30px_rgba(249,115,22,0.1)]`
              : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
          >
            {/* Winner Badge */}
            {item.price > 0 && item.price < item.other && (
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-${item.theme}-500 text-white text-[10px] font-black uppercase tracking-widest animate-pulse`}>
                Best Deal
              </div>
            )}

            <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Current Best Price</div>
            <div className={`text-4xl md:text-5xl font-black tracking-tighter ${item.price > 0 && item.price < item.other
              ? `text-${item.theme}-400`
              : 'text-white'
              }`}>
              {item.price > 0 ? `₹${item.price.toLocaleString()}` : 'N/A'}
            </div>

            <div className="mt-8 space-y-4">
              {item.p.currentPrices[0]?.url ? (
                <a
                  href={item.p.currentPrices[0].url}
                  target="_blank"
                  className={`block w-full py-4 rounded-2xl text-center font-black uppercase tracking-widest transition-all duration-300 ${item.price > 0 && item.price < item.other
                    ? `bg-${item.theme}-600 text-white hover:bg-${item.theme}-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]`
                    : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                >
                  Grab Deal
                </a>
              ) : (
                <div className="py-4 text-center text-slate-500 font-bold uppercase tracking-widest text-xs bg-white/5 rounded-2xl">
                  Currently Unavailable
                </div>
              )}
            </div>

            {/* Background Glow */}
            <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[80px] opacity-20 bg-${item.theme}-500 group-hover:opacity-40 transition-opacity`} />
          </motion.div>
        ))}
      </div>

      {/* AI Analysis Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[40px] bg-black border border-white/10 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 via-transparent to-orange-900/5" />

        <div className="relative p-8 md:p-12 grid lg:grid-cols-2 items-center gap-12">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">AI Comparison Engine</span>
              </div>
              <h3 className="text-4xl font-black font-heading text-white leading-tight uppercase tracking-tighter">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Lifeline DNA</span> Analysis
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-orange-500/30 transition-colors">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{a.title}</div>
                  <div className="text-3xl font-black text-orange-400">{scoresA.overall}<span className="text-sm text-slate-600">/10</span></div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-slate-500/30 transition-colors text-right">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{b.title}</div>
                  <div className="text-3xl font-black text-slate-400">{scoresB.overall}<span className="text-sm text-slate-600">/10</span></div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-700/10 border border-white/10 rounded-2xl backdrop-blur-md">
                <div className="flex gap-4 items-start">
                  <div className="text-3xl">🤖</div>
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2">AI Verdict</h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                      {scoresA.overall > scoresB.overall
                        ? `${a.title} dominates this battle with superior ${scoresA.performance > scoresB.performance ? 'raw engine performance' : 'feature set'}. It's the definitive choice for power seekers.`
                        : `${b.title} provides a more surgical balance, outperforming in key areas like ${scoresB.display > scoresA.display ? 'visual fidelity' : 'endurance'}. The smarter choice for most users.`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center p-8 bg-white/5 rounded-[32px] border border-white/5">
            <RatingRadar scoresA={scoresA} scoresB={scoresB} />
          </div>
        </div>
      </motion.div>

      {/* Comparisons Grid */}
      <div className="space-y-8">
        {[
          { title: "Display", key: "display" },
          { title: "Performance", key: "processor" },
          { title: "Cameras", key: "camera" },
          { title: "Endurance", key: "battery" },
          { title: "Build", key: "build" },
          { title: "Logic", key: "software" }
        ].map((section, idx) => (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <SpecSection
              title={section.title}
              iconKey={section.key as any}
              dataA={sA[section.key]}
              dataB={sB[section.key]}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
