'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Star, ThumbsUp, ThumbsDown, MessageSquare, ArrowBigUp, Zap } from 'lucide-react'

import { SentimentItem } from '@/lib/mockData'

interface ReviewMatrixProps {
    positive: SentimentItem[]
    negative: SentimentItem[]
}

export default function ReviewMatrix({ positive, negative }: ReviewMatrixProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Positive Synthesis */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                        <ThumbsUp size={20} />
                    </div>
                    <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Core Strengths</h3>
                </div>

                <div className="space-y-4">
                    {positive.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 glass-dark rounded-2xl border border-emerald-500/10 group hover:border-emerald-500/30 transition-all"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="text-emerald-500" size={16} />
                                    <span className="text-sm font-bold text-white uppercase tracking-tight">{item.point}</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-[8px] font-black text-emerald-500 uppercase tracking-widest">
                                    <Zap size={8} /> {item.relevance}% impact
                                </div>
                            </div>
                            <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-emerald-500/50"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${item.relevance}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Negative Synthesis */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                        <ThumbsDown size={20} />
                    </div>
                    <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Trade-offs</h3>
                </div>

                <div className="space-y-4">
                    {negative.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 glass-dark rounded-2xl border border-rose-500/10 group hover:border-rose-500/30 transition-all"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <XCircle className="text-rose-500" size={16} />
                                    <span className="text-sm font-bold text-white uppercase tracking-tight">{item.point}</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/10 text-[8px] font-black text-rose-500 uppercase tracking-widest">
                                    <Activity size={8} /> {item.relevance}% friction
                                </div>
                            </div>
                            <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-rose-500/50"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${item.relevance}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Community Synthesis - Bottom Banner */}
            <div className="md:col-span-2 p-8 glass-dark rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 mt-4">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                        <MessageSquare size={32} />
                    </div>
                    <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Expert Sentiment Score</div>
                        <div className="flex items-center gap-2">
                            <span className="text-4xl font-black text-white italic">8.8/10</span>
                            <div className="flex text-emerald-500">
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                        <div className="text-[8px] font-black text-slate-500 uppercase mb-1">User Satisfaction</div>
                        <div className="text-xl font-black text-white uppercase italic">94%</div>
                    </div>
                    <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                        <div className="text-[8px] font-black text-slate-500 uppercase mb-1">Long-term Value</div>
                        <div className="text-xl font-black text-white uppercase italic">Elite</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Activity({ size, className }: { size?: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    )
}
