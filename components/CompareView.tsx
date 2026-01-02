import React from 'react'
import CompareHeader from './CompareHeader'
import SpecSection from './SpecSection'
import RatingRadar from './RatingRadar'
import { calculateScores } from '../lib/scoring'

type Price = { source: string; price: number; url?: string }

// Reuse types from mockData (simplified here for local prop usage)
// In a real app, import shared types.
type Product = {
  id: string
  slug: string
  title: string
  description?: string
  thumbnail?: string | null
  currentPrices: Price[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  priceHistory: { recordedAt: string; price: number }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  specs?: any
}

export default function CompareView({ a, b }: { a: Product; b: Product }) {
  const pricesA = a.currentPrices || []
  const pricesB = b.currentPrices || []
  const bestPriceA = pricesA.length > 0 ? Math.min(...pricesA.map((x) => x.price)) : 0
  const bestPriceB = pricesB.length > 0 ? Math.min(...pricesB.map((x) => x.price)) : 0
  const priceDiff = bestPriceA - bestPriceB

  // Safe fallback if specs are missing (e.g. old data)
  const sA = a.specs || {}
  const sB = b.specs || {}

  const scoresA = calculateScores(sA)
  const scoresB = calculateScores(sB)

  return (
    <div className="pb-20">
      <CompareHeader a={a} b={b} />

      {/* Pricing Card (The most important part!) */}
      <div className="grid grid-cols-2 gap-4 mb-4 animate-fade-in-up animate-delay-200">
        <div className={`p-6 rounded-3xl border transition-all relative overflow-hidden group ${bestPriceA > 0 && bestPriceA < bestPriceB ? 'bg-green-50/90 border-green-200 ring-4 ring-green-100/50 shadow-xl' : 'glass hover:bg-white/80'}`}>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Best Price</div>
          <div className={`text-2xl md:text-3xl font-black ${bestPriceA > 0 && bestPriceA < bestPriceB ? 'text-green-700' : 'text-slate-900'}`}>
            {bestPriceA > 0 ? `₹${bestPriceA.toLocaleString()}` : 'N/A'}
          </div>
          {pricesA[0]?.url ? (
            <a href={pricesA[0].url} target="_blank" className="mt-4 block text-center w-full py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 hover:scale-[1.02] transition-all shadow-lg shadow-slate-900/20">
              Buy Now
            </a>
          ) : (
            <div className="mt-4 py-2.5 text-center text-sm text-slate-400 font-medium">Out of stock</div>
          )}
        </div>

        <div className={`p-6 rounded-3xl border transition-all relative overflow-hidden group ${bestPriceB > 0 && bestPriceB < bestPriceA ? 'bg-green-50/90 border-green-200 ring-4 ring-green-100/50 shadow-xl' : 'glass hover:bg-white/80'}`}>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Best Price</div>
          <div className={`text-2xl md:text-3xl font-black ${bestPriceB > 0 && bestPriceB < bestPriceA ? 'text-green-700' : 'text-slate-900'}`}>
            {bestPriceB > 0 ? `₹${bestPriceB.toLocaleString()}` : 'N/A'}
          </div>
          {pricesB[0]?.url ? (
            <a href={pricesB[0].url} target="_blank" className="mt-4 block text-center w-full py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 hover:scale-[1.02] transition-all shadow-lg shadow-slate-900/20">
              Buy Now
            </a>
          ) : (
            <div className="mt-4 py-2.5 text-center text-sm text-slate-400 font-medium">Out of stock</div>
          )}
        </div>
      </div>

      {/* 🚀 NEW: The Beastly Radar Analysis */}
      <div className="mb-8 overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl ring-1 ring-white/10 animate-fade-in-up animate-delay-300">
        <div className="p-6 md:p-8 grid md:grid-cols-2 items-center gap-8">
          <div>
            <h3 className="text-2xl font-bold font-heading mb-2 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Lifeline DNA Analysis</h3>
            <p className="text-slate-400 text-sm mb-6">
              Our AI algorithm normalized specs to generate this comparison.
              <span className="text-blue-400 font-bold ml-1">{a.title} is Blue</span>,
              <span className="text-violet-400 font-bold ml-1">{b.title} is Purple</span>.
            </p>

            <div className="space-y-4">
              {/* Quick stats */}
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-sm font-medium text-slate-300">Overall Score</span>
                <div className="flex gap-4 font-bold">
                  <span className="text-blue-400">{scoresA.overall}/10</span>
                  <span className="text-slate-600">vs</span>
                  <span className="text-violet-400">{scoresB.overall}/10</span>
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs leading-relaxed text-blue-200">
                <strong>AI Verdict:</strong> {
                  scoresA.overall > scoresB.overall
                    ? `${a.title} takes the lead with superior ${scoresA.performance > scoresB.performance ? 'raw performance' : 'features'}, making it the better choice for power users.`
                    : `${b.title} edges out the competition with a more balanced profile, offering better value for features like ${scoresB.display > scoresA.display ? 'display quality' : 'battery life'}.`
                }
              </div>
            </div>
          </div>

          <div className="flex justify-center py-4 bg-slate-900/50 rounded-2xl">
            <RatingRadar scoresA={scoresA} scoresB={scoresB} />
          </div>
        </div>
      </div>

      {/* Spec Sections */}
      <div className="space-y-6 animate-fade-in-up animate-delay-300">
        <SpecSection title="Display" iconKey="display" dataA={sA.display} dataB={sB.display} />
        <SpecSection title="Performance" iconKey="processor" dataA={sA.processor} dataB={sB.processor} />
        <SpecSection title="Cameras" iconKey="camera" dataA={sA.camera} dataB={sB.camera} />
        <SpecSection title="Memory & Storage" iconKey="memory" dataA={sA.memory} dataB={sB.memory} />
        <SpecSection title="Battery & Charging" iconKey="battery" dataA={sA.battery} dataB={sB.battery} />
        <SpecSection title="Design & Build" iconKey="build" dataA={sA.build} dataB={sB.build} />
        <SpecSection title="Connectivity" iconKey="connectivity" dataA={sA.connectivity} dataB={sB.connectivity} />
        <SpecSection title="Software" iconKey="software" dataA={sA.software} dataB={sB.software} />
      </div>
    </div>
  )
}
