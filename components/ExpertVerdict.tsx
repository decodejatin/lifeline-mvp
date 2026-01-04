"use client"
import React from 'react'
import { motion } from 'framer-motion'

type Category = {
    label: string
    score: number
    color: string
}

export default function ExpertVerdict({ scores }: { scores: Record<string, number> }) {
    const categories: Category[] = [
        { label: 'Raw Power', score: scores.performance * 10, color: '#f97316' },
        { label: 'Visual Engine', score: scores.display * 10, color: '#f97316' },
        { label: 'Optics System', score: scores.camera * 10, color: '#64748b' },
        { label: 'Endurance', score: scores.battery * 10, color: '#64748b' }
    ]

    return (
        <div className="p-8 md:p-12 rounded-[40px] bg-black border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
                            <span className="w-2 h-2 rounded-full bg-orange-500" />
                            <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Lab Analysis</span>
                        </div>
                        <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Expert <span className="text-orange-500">Verdict</span></h2>
                        <p className="mt-4 text-slate-400 font-medium">Our neural processors have analyzed 200+ data points to generate this elite efficiency rating.</p>
                    </div>

                    <div className="space-y-6">
                        {categories.map((cat, i) => (
                            <div key={cat.label} className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-black text-white uppercase tracking-widest">{cat.label}</span>
                                    <span className="text-lg font-black text-orange-500">{cat.score}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${cat.score}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: cat.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative aspect-square flex items-center justify-center p-8">
                    <div className="absolute inset-0 border-2 border-white/5 rounded-full animate-spin-slow" />
                    <div className="absolute inset-4 border border-white/5 rounded-full border-dashed" />

                    <div className="relative text-center">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            className="text-[120px] font-black text-white tracking-tighter leading-none"
                        >
                            {scores.overall}
                        </motion.div>
                        <div className="text-xs font-black text-orange-500 uppercase tracking-[0.4em] -mt-4">Overall Score</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
