'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Smartphone, Cpu, Battery, Camera, Wifi, Shield, Package, HardDrive } from 'lucide-react'

interface DetailedSpecsProps {
    specs: any
}

export default function DetailedSpecs({ specs }: DetailedSpecsProps) {
    const [activeTab, setActiveTab] = useState('display')

    const TABS = [
        { id: 'display', label: 'Screen', icon: Smartphone, data: specs.display },
        { id: 'processor', label: 'Engine', icon: Cpu, data: specs.processor },
        { id: 'camera', label: 'Optics', icon: Camera, data: specs.camera },
        { id: 'battery', label: 'Power', icon: Battery, data: specs.battery },
        { id: 'memory', label: 'Storage', icon: HardDrive, data: specs.memory },
        { id: 'connectivity', label: 'Network', icon: Wifi, data: specs.connectivity },
        { id: 'build', label: 'Chassis', icon: Package, data: specs.build },
        { id: 'software', label: 'Kernel', icon: Shield, data: specs.software }
    ]

    return (
        <div className="w-full space-y-12 py-20">
            <div className="text-center">
                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Atomic <span className="text-emerald-500">Specifications</span></h2>
                <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em]">Precision Component Analysis</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all border ${activeTab === tab.id
                                ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20'
                                : 'bg-white/5 border-white/5 text-slate-500 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <tab.icon size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="glass-dark p-12 rounded-[3.5rem] border border-white/5 min-h-[400px] relative overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full" />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12"
                    >
                        {Object.entries(TABS.find(t => t.id === activeTab)?.data || {}).map(([key, value]: [string, any], i) => (
                            <div key={key} className="flex flex-col gap-2 group/item">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover/item:scale-150 transition-transform" />
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</span>
                                </div>
                                <div className="text-xl font-black text-white italic pl-4 border-l border-white/5 group-hover/item:border-emerald-500 transition-colors">
                                    {Array.isArray(value) ? value.join(', ') : (typeof value === 'boolean' ? (value ? 'YES' : 'NO') : value)}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
