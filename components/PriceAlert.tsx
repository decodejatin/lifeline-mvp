"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function PriceAlert({ productTitle }: { productTitle: string }) {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return
        setStatus('loading')
        setTimeout(() => setStatus('success'), 1500)
    }

    return (
        <div className="p-1 rounded-[32px] bg-gradient-to-br from-orange-500/20 to-slate-500/10 border border-white/10 overflow-hidden">
            <div className="bg-black/40 backdrop-blur-xl p-8 rounded-[30px] relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 space-y-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 mb-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Price Sentinel</span>
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Track This Device</h3>
                            <p className="text-sm text-slate-400 font-medium">Get an elite alert when {productTitle} hits your target price.</p>
                        </div>
                        <div className="text-4xl">🔔</div>
                    </div>

                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-8 text-center space-y-4"
                            >
                                <div className="text-5xl">✅</div>
                                <h4 className="text-xl font-black text-white uppercase tracking-tight">Access Granted</h4>
                                <p className="text-sm text-slate-400 font-medium">Tracking active for <span className="text-orange-400 font-bold">{email}</span>. We will notify you of any shifts.</p>
                                <button
                                    onClick={() => { setStatus('idle'); setEmail('') }}
                                    className="text-[10px] font-black text-orange-500 uppercase tracking-widest hover:text-white transition-colors"
                                >
                                    Reset Sentinel
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Elite Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="commander@lifeline.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-500/50 transition-all font-medium"
                                    />
                                </div>
                                <button
                                    disabled={status === 'loading'}
                                    className={cn(
                                        "w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all relative overflow-hidden group",
                                        status === 'loading'
                                            ? "bg-white/10 text-slate-500 cursor-wait"
                                            : "bg-white text-black hover:bg-orange-600 hover:text-white"
                                    )}
                                >
                                    {status === 'loading' ? 'Encrypting...' : 'Activate Tracking'}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
