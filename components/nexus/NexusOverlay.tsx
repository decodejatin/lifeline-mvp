'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { PRODUCTS } from '../../lib/mockData';
import { NeuroScoreEngine } from './NeuroScoreEngine';

const parseNumber = (val: string) => {
    if (typeof val !== 'string') return 0;
    const num = parseFloat(val.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
};

const getAdvantage = (category: string, key: string, val1: any, val2: any) => {
    if (typeof val1 !== 'string' || typeof val2 !== 'string') return 'draw';

    const num1 = parseNumber(val1);
    const num2 = parseNumber(val2);

    if (num1 === 0 || num2 === 0) return 'draw';

    // Categories where LOWER is better
    const lowerIsBetter = ['weight', 'thickness'];
    if (lowerIsBetter.includes(key)) {
        if (num1 < num2) return 'device1';
        if (num2 < num1) return 'device2';
        return 'draw';
    }

    // Default: HIGHER is better
    if (num1 > num2) return 'device1';
    if (num2 > num1) return 'device2';
    return 'draw';
};

const SpecRow = ({ label, val1, val2, advantage }: { label: string, val1: any, val2: any, advantage: string }) => (
    <div className="grid grid-cols-2 gap-4 py-3 border-b border-white/5 last:border-0 items-center hover:bg-white/[0.01] transition-colors rounded-lg px-2">
        <div className={`text-right transition-all duration-500 ${advantage === 'device1' ? 'text-blue-400 font-bold scale-105' : 'text-slate-300'}`}>
            <span className="text-[10px] opacity-40 block uppercase tracking-[0.2em] mb-1">{label}</span>
            <span className="text-lg md:text-xl font-medium">{Array.isArray(val1) ? val1.join(', ') : (val1 === true ? 'Yes' : (val1 === false ? 'No' : val1))}</span>
        </div>
        <div className={`text-left transition-all duration-500 ${advantage === 'device2' ? 'text-pink-400 font-bold scale-105' : 'text-slate-300'}`}>
            <span className="text-[10px] opacity-40 block uppercase tracking-[0.2em] mb-1">{label}</span>
            <span className="text-lg md:text-xl font-medium">{Array.isArray(val2) ? val2.join(', ') : (val2 === true ? 'Yes' : (val2 === false ? 'No' : val2))}</span>
        </div>
    </div>
);

interface NexusOverlayProps {
    isBattleStarted: boolean;
    setIsBattleStarted: (val: boolean) => void;
    selectedDevices: any[];
    setSelectedDevices: (val: any[]) => void;
    advantageScores: { device1: number; device2: number };
    setAdvantageScores: (val: { device1: number; device2: number }) => void;
    setFocus: (val: 'left' | 'right' | 'center') => void;
}

export const NexusOverlay = ({
    isBattleStarted,
    setIsBattleStarted,
    selectedDevices,
    setSelectedDevices,
    advantageScores,
    setAdvantageScores,
    setFocus
}: NexusOverlayProps) => {
    const uiRef = useRef<HTMLDivElement>(null);
    const [showDiagnostics, setShowDiagnostics] = React.useState(false);

    useEffect(() => {
        if (isBattleStarted) {
            const tl = gsap.timeline();
            tl.to('.nexus-title', { y: -100, opacity: 0, duration: 0.8, ease: 'power4.inOut' })
                .fromTo('.battle-arena', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'expo.out' }, '-=0.4')
                .fromTo('.spec-category', { y: 100, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power4.out' });

            // Calculate overall victory
            let d1 = 0;
            let d2 = 0;
            selectedDevices[0] && selectedDevices[1] && Object.entries(selectedDevices[0].specs).forEach(([cat, specs]: [string, any]) => {
                Object.entries(specs).forEach(([key, val]) => {
                    const adv = getAdvantage(cat, key, val, selectedDevices[1].specs[cat][key]);
                    if (adv === 'device1') d1++;
                    if (adv === 'device2') d2++;
                });
            });
            setAdvantageScores({ device1: d1, device2: d2 });
        } else {
            setFocus('center');
        }
    }, [isBattleStarted, selectedDevices, setAdvantageScores, setFocus]);

    const selectDevice = (device: any) => {
        if (selectedDevices.find(d => d.id === device.id)) {
            setSelectedDevices(selectedDevices.filter(d => d.id !== device.id));
            return;
        }
        if (selectedDevices.length < 2) {
            setSelectedDevices([...selectedDevices, device]);
        }
    };

    const getCategoryFocus = (cat: string): 'left' | 'right' | 'center' => {
        const mapping: Record<string, 'left' | 'right' | 'center'> = {
            display: 'center',
            processor: 'left',
            memory: 'right',
            camera: 'left',
            battery: 'right',
            build: 'left',
            connectivity: 'right',
            software: 'center'
        };
        return mapping[cat.toLowerCase()] || 'center';
    };

    return (
        <div ref={uiRef} className="relative z-10 min-h-screen pointer-events-none">
            <div className="max-w-7xl mx-auto px-4 py-20 pointer-events-auto">
                {!isBattleStarted ? (
                    <div className="text-center pt-20">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="nexus-title text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase italic"
                        >
                            The <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Nexus</span>
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="nexus-title text-xl text-slate-400 mb-20 max-w-2xl mx-auto uppercase tracking-widest font-light"
                        >
                            Deep specimen analysis. Select two devices for real-time comparison.
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                            {PRODUCTS.map((product, idx) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => selectDevice(product)}
                                    className={`p-1 border-2 transition-all duration-500 cursor-pointer rounded-[2.5rem] overflow-hidden relative group font-heading ${selectedDevices.find(d => d.id === product.id)
                                        ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_40px_rgba(59,130,246,0.3)]'
                                        : 'border-white/5 bg-white/5 hover:border-white/20'
                                        }`}
                                >
                                    <div className="p-8 relative z-10">
                                        <h3 className="text-3xl font-black text-white mb-1 uppercase italic tracking-tighter">{product.title}</h3>
                                        <p className="text-slate-500 text-[10px] uppercase tracking-[0.5em] mb-6">Specimen Data #0{idx + 1}</p>

                                        <div className="space-y-4">
                                            <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-widest">
                                                <span>Performance</span>
                                                <span className="text-blue-400 font-mono">{product.specs.processor.antutuScore}</span>
                                            </div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(parseNumber(product.specs.processor.antutuScore) / 1600000) * 100}%` }}
                                                    className="h-full bg-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-10 flex items-center justify-between">
                                            <span className="text-2xl font-mono text-white/50 group-hover:text-blue-400 transition-colors">
                                                ₹{product.currentPrices[0].price.toLocaleString()}
                                            </span>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${selectedDevices.find(d => d.id === product.id) ? 'bg-blue-500 border-blue-500' : 'border-white/10 group-hover:border-white/30'}`}>
                                                {selectedDevices.find(d => d.id === product.id) ? (
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                ) : (
                                                    <div className="w-2 h-2 rounded-full bg-white opacity-20" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute -right-6 -bottom-6 text-[10rem] font-black text-white/[0.02] italic uppercase pointer-events-none group-hover:text-white/[0.04] transition-colors -rotate-12">
                                        {product.title.split(' ')[0][0]}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex justify-center flex-col items-center gap-8">
                            <div className="flex gap-6">
                                <AnimatePresence mode="popLayout">
                                    {selectedDevices.map((d, i) => (
                                        <motion.div
                                            initial={{ y: 20, opacity: 0, scale: 0.8 }}
                                            animate={{ y: 0, opacity: 1, scale: 1 }}
                                            exit={{ y: -20, opacity: 0, scale: 0.8 }}
                                            key={d.id}
                                            className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-black uppercase tracking-tighter text-lg flex items-center gap-6 shadow-2xl backdrop-blur-xl"
                                        >
                                            <div className={`w-3 h-3 rounded-full animate-pulse ${i === 0 ? 'bg-blue-500' : 'bg-pink-500'}`} />
                                            {d.title}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                            <button
                                disabled={selectedDevices.length < 2}
                                onClick={() => setIsBattleStarted(true)}
                                className={`group relative px-20 py-6 rounded-full font-black text-2xl uppercase tracking-[0.3em] transition-all duration-700 overflow-hidden ${selectedDevices.length === 2
                                    ? 'bg-white text-black hover:scale-110 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.4)]'
                                    : 'bg-white/5 text-white/5 cursor-not-allowed'
                                    }`}
                            >
                                <span className="relative z-10 italic">Analyze</span>
                                {selectedDevices.length === 2 && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                                )}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="battle-arena pt-10">
                        {/* Battle Header */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-12 relative px-4">
                            <div className="flex-1 w-full">
                                <motion.div
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="text-left"
                                >
                                    <h2 className="text-4xl md:text-7xl font-black text-white tracking-widest uppercase italic mb-4">{selectedDevices[0].title}</h2>
                                    <div className="flex items-center gap-6">
                                        <div className="h-4 flex-grow bg-white/[0.03] rounded-full overflow-hidden border border-white/5 p-1">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(advantageScores.device1 / (advantageScores.device1 + advantageScores.device2 || 1)) * 100}%` }}
                                                className="h-full bg-gradient-to-r from-blue-700 to-blue-400 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                                            />
                                        </div>
                                        <span className="text-blue-400 font-mono text-4xl font-black italic">{advantageScores.device1}</span>
                                    </div>
                                    <p className="text-blue-500/40 text-xs uppercase tracking-[0.5em] mt-3 font-black">Specimen Advantage Level</p>
                                </motion.div>
                            </div>

                            <div className="px-10">
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    className="text-8xl md:text-9xl font-black text-white/5 uppercase italic tracking-tighter"
                                >
                                    VS
                                </motion.div>
                            </div>

                            <div className="flex-1 w-full">
                                <motion.div
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="text-right"
                                >
                                    <h2 className="text-4xl md:text-7xl font-black text-white tracking-widest uppercase italic mb-4">{selectedDevices[1].title}</h2>
                                    <div className="flex items-center gap-6">
                                        <span className="text-pink-400 font-mono text-4xl font-black italic">{advantageScores.device2}</span>
                                        <div className="h-4 flex-grow bg-white/[0.03] rounded-full overflow-hidden border border-white/5 p-1">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(advantageScores.device2 / (advantageScores.device1 + advantageScores.device2 || 1)) * 100}%` }}
                                                className="h-full bg-gradient-to-l from-pink-700 to-pink-400 rounded-full shadow-[0_0_30px_rgba(236,72,153,0.6)] ml-auto"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-pink-500/40 text-xs uppercase tracking-[0.5em] mt-3 font-black">Specimen Advantage Level</p>
                                </motion.div>
                            </div>
                        </div>

                        {/* Spec Grid */}
                        <div className="grid grid-cols-1 gap-16 max-w-5xl mx-auto pb-60 px-4">
                            {Object.entries(selectedDevices[0].specs).map(([cat, specs]: [string, any]) => (
                                <motion.div
                                    key={cat}
                                    className="spec-category"
                                    onViewportEnter={() => setFocus(getCategoryFocus(cat))}
                                    viewport={{ amount: 0.8 }}
                                >
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                        <h3 className="text-sm md:text-md uppercase tracking-[0.8em] text-white/40 font-black italic">{cat}</h3>
                                        <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent via-white/10 to-transparent" />
                                    </div>

                                    <div className="bg-white/[0.01] border border-white/[0.03] rounded-[3rem] p-10 backdrop-blur-3xl relative group hover:border-white/10 transition-all duration-700 shadow-2xl">
                                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {Object.entries(specs).map(([key, val]) => (
                                            <SpecRow
                                                key={key}
                                                label={key}
                                                val1={val}
                                                val2={selectedDevices[1].specs[cat][key]}
                                                advantage={getAdvantage(cat, key, val, selectedDevices[1].specs[cat][key])}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-50 pointer-events-auto">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowDiagnostics(!showDiagnostics)}
                                className={`px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all duration-700 backdrop-blur-2xl shadow-2xl ${showDiagnostics ? 'bg-blue-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                {showDiagnostics ? 'CLOSE DIAGNOSTICS' : 'DEEP DIAGNOSTICS'}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setIsBattleStarted(false);
                                    setSelectedDevices([]);
                                    setShowDiagnostics(false);
                                }}
                                className="px-12 py-5 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 rounded-full font-black uppercase tracking-widest text-xs transition-all duration-700 backdrop-blur-2xl group overflow-hidden shadow-2xl"
                            >
                                <span className="relative z-10">TERMINATE ANALYSIS</span>
                                <div className="absolute inset-0 bg-red-600/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.button>
                        </div>

                        {/* Neuro-Link Engine Overlay */}
                        <NeuroScoreEngine
                            device1={selectedDevices[0]}
                            device2={selectedDevices[1]}
                            isVisible={showDiagnostics}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
