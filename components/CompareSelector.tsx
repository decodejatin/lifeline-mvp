"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Product = { id: string; slug: string; title: string; thumbnail?: string | null }

export default function CompareSelector({ products, selectedA, selectedB }: { products: Product[]; selectedA?: string; selectedB?: string }) {
  const router = useRouter()
  const [a, setA] = useState<string | undefined>(selectedA)
  const [b, setB] = useState<string | undefined>(selectedB)

  function goCompare() {
    if (a && b && a !== b) {
      router.push(`/compare?productA=${encodeURIComponent(a)}&productB=${encodeURIComponent(b)}`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-1 rounded-[32px] bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10"
    >
      <div className="bg-slate-900/90 p-6 md:p-8 rounded-[28px] shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-6">

          {/* Product A Selector */}
          <div className="flex-1 w-full space-y-2">
            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Device One</label>
            <div className="relative group">
              <select
                className="w-full p-4 bg-slate-800/50 border border-white/5 outline-none rounded-2xl font-bold text-white focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer group-hover:bg-slate-700/50 transition-all"
                value={a || ''}
                onChange={(e) => setA(e.target.value)}
              >
                <option value="" className="bg-slate-900 text-slate-400">Choose first phone...</option>
                {products.map((p) => (
                  <option key={p.id} value={p.slug} className="bg-slate-900 text-white">{p.title}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* VS Badge */}
          <div className="relative shrink-0 w-16 h-16 rounded-full flex items-center justify-center -my-4 md:my-0 z-10 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-violet-600 rounded-full animate-pulse blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-full h-full bg-slate-900 rounded-full border-2 border-white/10 flex items-center justify-center font-black italic text-xl text-white shadow-2xl">
              VS
            </div>
          </div>

          {/* Product B Selector */}
          <div className="flex-1 w-full space-y-2">
            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Device Two</label>
            <div className="relative group">
              <select
                className="w-full p-4 bg-slate-800/50 border border-white/5 outline-none rounded-2xl font-bold text-white focus:ring-2 focus:ring-violet-500/50 appearance-none cursor-pointer group-hover:bg-slate-700/50 transition-all"
                value={b || ''}
                onChange={(e) => setB(e.target.value)}
              >
                <option value="" className="bg-slate-900 text-slate-400">Choose second phone...</option>
                {products.map((p) => (
                  <option key={p.id} value={p.slug} className="bg-slate-900 text-white">{p.title}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={goCompare}
            disabled={!a || !b || a === b}
            className={cn(
              "w-full md:w-auto px-10 py-4 font-black uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-2xl",
              (!a || !b || a === b)
                ? "bg-slate-800 text-slate-600 cursor-not-allowed border border-white/5"
                : "bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:scale-105 hover:shadow-blue-500/50 active:scale-95 animate-shimmer"
            )}
          >
            Battle
          </button>
        </div>
      </div>
    </motion.div>
  )
}
