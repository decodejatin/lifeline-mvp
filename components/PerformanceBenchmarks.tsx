'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { BarChart, Gauge, Zap, Trophy, Cpu, Activity } from 'lucide-react'

const BENCHMARKS = [
    { label: 'Compute Power', value: 98, color: 'bg-emerald-500', icon: Cpu },
    { label: 'Neural Engine', value: 92, color: 'bg-cyan-500', icon: Zap },
    { label: 'Thermal Stability', value: 85, color: 'bg-blue-500', icon: Gauge },
    { label: 'Gaming Fidelity', value: 96, color: 'bg-indigo-500', icon: Trophy }
]

export default function PerformanceBenchmarks() {
    return (
        <section className="py-24 px-4 bg-slate-950/40 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0,transparent_70%)]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark border border-white/10 text-emerald-400 text-xs font-black uppercase tracking-widest mb-6"
                    >
                        <Activity size={14} /> Laboratory Verification
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none mb-6">
                        Pushing the <span className="text-emerald-500">Silicon Limit</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Our benchmarks aren't just numbers. They are high-resolution snapshots of engineering excellence, verified through 1,000+ stress tests.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {BENCHMARKS.map((item, idx) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-dark p-10 rounded-[3rem] border border-white/5 hover:border-emerald-500/20 transition-all group"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${item.color}/10 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform`}>
                                <item.icon size={28} className={item.color.replace('bg-', 'text-')} />
                            </div>

                            <div className="flex justify-between items-end mb-4">
                                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter leading-none">{item.label}</h3>
                                <span className="text-3xl font-black text-emerald-400 italic">{item.value}%</span>
                            </div>

                            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${item.value}%` }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className={`h-full ${item.color}`}
                                />
                            </div>

                            <p className="mt-6 text-sm text-slate-500 font-medium leading-relaxed">
                                Aggregated performance metric based on sustained peak operation cycles.
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Dynamic Comparison Banner */}
                <div className="mt-20 glass-dark rounded-[3.5rem] border border-white/5 p-12 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-8">
                        <div className="p-6 bg-emerald-500/10 rounded-[2rem] text-emerald-400">
                            <BarChart size={40} />
                        </div>
                        <div>
                            <h4 className="text-2xl font-black text-white uppercase italic tracking-tight">Performance Delta Analysis</h4>
                            <p className="text-slate-500 text-sm mt-1">Comparing current generation silicon against legacy architectures.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all">
                            Download Raw Data
                        </button>
                        <button className="px-10 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all">
                            Compare Chips
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
