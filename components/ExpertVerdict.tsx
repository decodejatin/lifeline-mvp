'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ShieldAlert, Zap, Target, Award, Info } from 'lucide-react'

interface ExpertVerdictProps {
    score: number
    summary: string
    verdict: 'Buy' | 'Wait' | 'Avoid'
    subScores: { label: string; value: number }[]
}

export default function ExpertVerdict({ score, summary, verdict, subScores }: ExpertVerdictProps) {
    const getVerdictStyles = () => {
        switch (verdict) {
            case 'Buy': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
            case 'Wait': return 'text-amber-500 bg-amber-500/10 border-amber-500/20'
            case 'Avoid': return 'text-rose-500 bg-rose-500/10 border-rose-500/20'
        }
    }

    return (
        <div className="py-20 border-t border-white/5 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Direct Score Column */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="p-10 glass-dark rounded-[3rem] border border-white/5 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500" />
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 italic">Lifeline Intelligence Score</div>
                        <div className="text-8xl font-black text-white italic tracking-tighter mb-4">{score}<span className="text-2xl text-slate-700">/100</span></div>
                        <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full border text-xs font-black uppercase tracking-widest ${getVerdictStyles()}`}>
                            <Target size={14} /> Official Verdict: {verdict}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {subScores.map((s, i) => (
                            <div key={i} className="p-6 glass-dark rounded-3xl border border-white/5">
                                <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{s.label}</div>
                                <div className="text-xl font-black text-white italic">{s.value}%</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Narrative Verdict Column */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="h-full flex flex-col justify-center p-12 glass-dark rounded-[3rem] border border-white/5">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500">
                                <Award size={24} />
                            </div>
                            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">The Final <span className="text-emerald-500">Synthesis</span></h3>
                        </div>
                        <p className="text-2xl text-slate-300 font-light leading-relaxed italic mb-10">
                            "{summary}"
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1 p-6 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4">
                                <Zap className="text-emerald-500" size={20} />
                                <div>
                                    <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Key Takeaway</div>
                                    <p className="text-xs text-slate-400 font-medium">Top-tier performance with specialized focus on imaging efficiency.</p>
                                </div>
                            </div>
                            <div className="flex-1 p-6 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4">
                                <ShieldAlert className="text-rose-500" size={20} />
                                <div>
                                    <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Risk Factor</div>
                                    <p className="text-xs text-slate-400 font-medium">Marginal thermal throttling during 4K RAW capture cycles.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
