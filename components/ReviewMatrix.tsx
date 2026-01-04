"use client"
import React from 'react'
import { motion } from 'framer-motion'

const reviewData = [
    { label: "Build Quality", positive: 85, mixed: 10, negative: 5 },
    { label: "Performance", positive: 92, mixed: 5, negative: 3 },
    { label: "Camera", positive: 78, mixed: 15, negative: 7 },
    { label: "Battery", positive: 88, mixed: 8, negative: 4 }
]

export default function ReviewMatrix() {
    return (
        <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Citizen <span className="text-slate-500">Sentiment</span></h3>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Aggregated Public Intelligence</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Positive</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-500" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mixed</span>
                    </div>
                </div>
            </div>

            <div className="space-y-10">
                {reviewData.map((item, i) => (
                    <div key={item.label} className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 items-center">
                        <span className="text-xs font-black text-white uppercase tracking-widest">{item.label}</span>
                        <div className="flex h-3 rounded-md overflow-hidden bg-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.positive}%` }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className="bg-orange-500 h-full"
                            />
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.mixed}%` }}
                                transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                                className="bg-slate-500 h-full"
                            />
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.negative}%` }}
                                transition={{ duration: 0.4, delay: i * 0.1 + 0.5 }}
                                className="bg-slate-800 h-full"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 text-center">
                <blockquote className="text-slate-400 italic font-medium leading-relaxed">
                    "This device feels like a generational leap in raw efficiency. The optical system however remains surgical but familiar."
                </blockquote>
                <div className="mt-4 text-[10px] font-black text-orange-500 uppercase tracking-widest">— Top Operative Review</div>
            </div>
        </div>
    )
}
