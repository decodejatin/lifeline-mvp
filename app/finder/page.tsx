'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { PRODUCTS } from '@/lib/mockData'
import Link from 'next/link'
import { LucideIcon, Smartphone, Camera, Battery, Cpu, ShieldCheck, Zap, ArrowRight, RotateCcw, Sparkles } from 'lucide-react'

type QuizStep = {
    id: string
    question: string
    options: { label: string; value: string; icon: LucideIcon; description: string }[]
}

const QUIZ_STEPS: QuizStep[] = [
    {
        id: 'use-case',
        question: 'What is your primary use case?',
        options: [
            { label: 'Photography', value: 'flagship+', icon: Camera, description: 'Best-in-class optics and zoom capabilities.' },
            { label: 'Gaming', value: 'gaming', icon: Zap, description: 'Maximum frame rates and cooling for long sessions.' },
            { label: 'Power User', value: 'flagship', icon: Cpu, description: 'Multitasking, high-end productivity and premium feel.' },
            { label: 'Daily Value', value: 'mid-range', icon: Smartphone, description: 'Reliable performance for social media and basic tasks.' }
        ]
    },
    {
        id: 'priority',
        question: 'What do you value most in a device?',
        options: [
            { label: 'Battery Life', value: 'battery', icon: Battery, description: 'I want my phone to last 2 days easily.' },
            { label: 'Display & Design', value: 'premium', icon: Sparkles, description: 'Sleek builds, high-res OLEDs and 120Hz.' },
            { label: 'Durability', value: 'durability', icon: ShieldCheck, description: 'IP68 rating and tough materials are a must.' },
            { label: 'Compact Size', value: 'compact', icon: Smartphone, description: 'Easy to use with one hand.' }
        ]
    },
    {
        id: 'budget',
        question: 'What is your budget range?',
        options: [
            { label: 'Ultra Premium', value: 'over-80k', icon: Sparkles, description: 'Cost is no object. I want the absolute best.' },
            { label: 'Flagship Range', value: '40k-80k', icon: Cpu, description: 'High-end performance without the absolute peak price.' },
            { label: 'Mid-Tier Value', value: '20k-40k', icon: Zap, description: 'The sweet spot for price and performance.' },
            { label: 'Entry Level', value: 'under-20k', icon: Smartphone, description: 'Essential features at a great price.' }
        ]
    }
]

export default function PhoneFinder() {
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [results, setResults] = useState<typeof PRODUCTS | null>(null)

    const handleOptionSelect = (stepId: string, value: string) => {
        const newAnswers = { ...answers, [stepId]: value }
        setAnswers(newAnswers)

        if (step < QUIZ_STEPS.length - 1) {
            setStep(step + 1)
        } else {
            calculateResults(newAnswers)
        }
    }

    const calculateResults = (finalAnswers: Record<string, string>) => {
        // Basic recommendation logic
        const filtered = PRODUCTS.filter(p => {
            let score = 0

            // Match category
            if (p.category === finalAnswers['use-case']) score += 10

            // Match tags
            if (p.tags.includes(finalAnswers['priority'])) score += 5

            // Budget filtering
            const minPrice = Math.min(...p.currentPrices.map(pr => pr.price))
            if (finalAnswers['budget'] === 'over-80k' && minPrice >= 80000) score += 20
            if (finalAnswers['budget'] === '40k-80k' && minPrice >= 40000 && minPrice < 80000) score += 20
            if (finalAnswers['budget'] === '20k-40k' && minPrice >= 20000 && minPrice < 40000) score += 20
            if (finalAnswers['budget'] === 'under-20k' && minPrice < 20000) score += 20

            return score > 5
        }).sort((a, b) => {
            // Simple sort by score (hypothetically)
            return 0
        })

        setResults(filtered.length > 0 ? filtered : PRODUCTS.slice(0, 2))
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10b981', '#06b6d4', '#ffffff']
        })
    }

    const resetQuiz = () => {
        setStep(0)
        setAnswers({})
        setResults(null)
    }

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                    {!results ? (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            <div className="text-center space-y-4">
                                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase italic">
                                    Device <span className="text-emerald-500">Oracle</span>
                                </h1>
                                <p className="text-slate-500 font-medium tracking-widest uppercase text-xs">
                                    Step {step + 1} of {QUIZ_STEPS.length} • Synthesizing Preferences
                                </p>
                                <div className="w-full bg-slate-900 h-1 max-w-xs mx-auto rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-emerald-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((step + 1) / QUIZ_STEPS.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {QUIZ_STEPS[step].options.map((option, idx) => (
                                    <motion.button
                                        key={option.value}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        onClick={() => handleOptionSelect(QUIZ_STEPS[step].id, option.value)}
                                        className="p-8 glass-dark rounded-3xl border border-white/5 hover:border-emerald-500/40 text-left transition-all group relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <option.icon size={120} />
                                        </div>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                                <option.icon size={24} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white uppercase tracking-tight">{option.label}</h3>
                                        </div>
                                        <p className="text-slate-400 font-medium leading-relaxed">
                                            {option.description}
                                        </p>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-12"
                        >
                            <div className="text-center space-y-6">
                                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-black uppercase tracking-widest">
                                    Match Analysis Complete
                                </div>
                                <h1 className="text-5xl md:text-6xl font-black text-white italic uppercase tracking-tighter">
                                    Your Perfect <span className="text-cyan-500">Upgrades</span>
                                </h1>
                                <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
                                    Based on our multidimensional spec analysis, these devices represent the peak value for your lifestyle.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {results.map((product, idx) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.2 }}
                                        className="glass-dark rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col group shadow-2xl"
                                    >
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <img
                                                src={product.thumbnail}
                                                alt={product.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute top-6 left-6 flex gap-2">
                                                {product.tags.map(tag => (
                                                    <span key={tag} className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="p-10 flex flex-col flex-1">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-1">{product.title}</h2>
                                                    <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest">
                                                        <ShieldCheck size={14} />
                                                        Verified Quality
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Starting At</div>
                                                    <div className="text-2xl font-black text-white italic">₹{Math.min(...product.currentPrices.map(cp => cp.price)).toLocaleString()}</div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 mb-8">
                                                <div className="space-y-1">
                                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Display</div>
                                                    <div className="text-xs font-bold text-white">{product.specs.display.type}</div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">CPU</div>
                                                    <div className="text-xs font-bold text-white">{product.specs.processor.name}</div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Antutu</div>
                                                    <div className="text-xs font-bold text-white">{product.specs.processor.antutuScore}</div>
                                                </div>
                                            </div>

                                            <div className="mt-auto flex gap-4">
                                                <Link
                                                    href={`/products/${product.slug}`}
                                                    className="flex-1 py-4 bg-white text-black text-sm font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-colors"
                                                >
                                                    Full Report <ArrowRight size={16} />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex justify-center pt-10">
                                <button
                                    onClick={resetQuiz}
                                    className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 hover:border-white/30 text-slate-400 hover:text-white transition-all text-xs font-black uppercase tracking-widest"
                                >
                                    <RotateCcw size={16} /> Run Oracle Again
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
