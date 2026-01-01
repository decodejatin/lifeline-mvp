import React from 'react'

type Point = { recordedAt: string; price: number }

export default function PriceHistoryChart({ history }: { history: Point[] }) {
  if (!history || history.length === 0) {
    return <div className="text-slate-500">No history available</div>
  }

  // Simple placeholder sparkline SVG. TODO: Replace with proper chart library (recharts / chart.js)
  const prices = history.map((h) => h.price)
  const max = Math.max(...prices)
  const min = Math.min(...prices)
  const points = history
    .map((h, i) => {
      const x = (i / (history.length - 1)) * 100
      const y = max === min ? 50 : ((1 - (h.price - min) / (max - min)) * 100)
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="p-3 bg-white rounded border">
      <svg viewBox="0 0 100 100" className="w-full h-28">
        <polyline fill="none" stroke="#7c3aed" strokeWidth={1.5} points={points} />
      </svg>
      <div className="text-xs text-slate-500 mt-2">Simple price sparkline; replace with full chart later.</div>
    </div>
  )
}
