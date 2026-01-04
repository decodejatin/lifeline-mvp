"use client"
import React from 'react'
import { motion } from 'framer-motion'

type Product = {
    id: string
    slug: string
    title: string
    thumbnail?: string | null
}

export default function CompareHeader({ a, b }: { a: Product; b: Product }) {
    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-24 z-40 p-1 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 mx-1 mb-8 shadow-2xl"
        >
            <div className="grid grid-cols-2 divide-x divide-white/10 bg-black/50 rounded-[14px]">
                <div className="p-4 flex items-center gap-4">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-orange-500/20 rounded-xl blur group-hover:bg-orange-500/40 transition-colors" />
                        <div className="relative w-14 h-14 shrink-0 bg-white/5 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                            {a.thumbnail ? (
                                <img src={a.thumbnail} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                                <span className="text-2xl font-black text-slate-600">{a.title[0]}</span>
                            )}
                        </div>
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-extrabold text-white truncate text-sm md:text-lg leading-tight uppercase tracking-tight">{a.title}</h3>
                        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest hidden md:block">Challenger A</p>
                    </div>
                </div>

                <div className="p-4 flex items-center gap-4 justify-end text-right">
                    <div className="min-w-0">
                        <h3 className="font-extrabold text-white truncate text-sm md:text-lg leading-tight uppercase tracking-tight">{b.title}</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden md:block text-right">Challenger B</p>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-white/10 rounded-xl blur group-hover:bg-white/20 transition-colors" />
                        <div className="relative w-14 h-14 shrink-0 bg-white/5 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                            {b.thumbnail ? (
                                <img src={b.thumbnail} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                                <span className="text-2xl font-black text-slate-600">{b.title[0]}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
