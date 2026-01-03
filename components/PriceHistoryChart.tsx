'use client'
import React from 'react'
import { motion } from 'framer-motion'

type Point = { recordedAt: string; price: number }

export default function PriceHistoryChart({ history }: { history: Point[] }) {
  if (!history || history.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white/5 rounded-3xl border border-dashed border-white/10">
        No price trajectory data available.
      </div>
    )
  }

  const prices = history.map((h) => h.price)
  const max = Math.max(...prices)
  const min = Math.min(...prices)

  // Padding for the chart
  const paddingY = 20
  const chartHeight = 100
  const effectiveHeight = chartHeight - paddingY * 2

  const points = history
    .map((h, i) => {
      const x = (i / (history.length - 1)) * 100
      const y = max === min
        ? 50
        : paddingY + (1 - (h.price - min) / (max - min)) * effectiveHeight
      return `${x},${y}`
    })
    .join(' ')

  const pathData = history
    .map((h, i) => {
      const x = (i / (history.length - 1)) * 100
      const y = max === min
        ? 50
        : paddingY + (1 - (h.price - min) / (max - min)) * effectiveHeight
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  const areaData = `${pathData} L 100 100 L 0 100 Z`

  return (
    <div className="relative p-6 bg-slate-900 border border-white/10 rounded-[32px] overflow-hidden group">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-5 grid-rows-4 opacity-[0.03] pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="border-[0.5px] border-white" />
        ))}
      </div>

      <div className="relative h-40 w-full">
        <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          {/* Gradient for area */}
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Fill area */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            d={areaData}
            fill="url(#chartGradient)"
          />

          {/* Main Path */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d={pathData}
            fill="none"
            stroke="#60a5fa"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          {/* Points */}
          {history.map((h, i) => {
            const x = (i / (history.length - 1)) * 100
            const y = max === min
              ? 50
              : paddingY + (1 - (h.price - min) / (max - min)) * effectiveHeight
            return (
              <circle key={i} cx={x} cy={y} r="1" fill="#fff" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )
          })}
        </svg>
      </div>

      <div className="mt-4 flex justify-between items-center relative z-10">
        <div className="flex gap-4">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            Min: <span className="text-green-400 font-bold ml-1">₹{min.toLocaleString()}</span>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            Max: <span className="text-red-400 font-bold ml-1">₹{max.toLocaleString()}</span>
          </div>
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
          Volatility Analyzed
        </div>
      </div>
    </div>
  )
}
