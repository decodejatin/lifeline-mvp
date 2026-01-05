'use client'
import React from 'react'
import ScrollReveal from './scroll-reveal'

export default function NewsletterSection() {
    return (
        <section className="py-24 px-4 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full -z-10" />

            <div className="max-w-4xl mx-auto glass-dark p-12 md:p-20 rounded-[3rem] border border-white/10 text-center">
                <ScrollReveal direction="up">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Stay Ahead of the <span className="text-emerald-500">Market</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-light">
                        Receive exclusive price drop alerts and expert analysis on the latest flagship releases direct to your inbox.
                    </p>

                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                            required
                        />
                        <button className="px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                            Join Lifeline
                        </button>
                    </form>

                    <p className="mt-8 text-xs text-slate-500 font-medium uppercase tracking-widest">
                        Privacy First. No Spam. Unsubscribe anytime.
                    </p>
                </ScrollReveal>
            </div>
        </section>
    )
}
