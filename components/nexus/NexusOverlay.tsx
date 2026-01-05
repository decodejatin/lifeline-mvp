'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { PRODUCTS } from '../../lib/mockData';
import MagneticButton from '../ui/magnetic-button';

export const NexusOverlay = () => {
    const [selectedDevices, setSelectedDevices] = useState<any[]>([]);
    const [isBattleStarted, setIsBattleStarted] = useState(false);
    const battleRef = useRef<HTMLDivElement>(null);
    const uiRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isBattleStarted) {
            const tl = gsap.timeline();
            tl.to('.nexus-title', { y: -100, opacity: 0, duration: 0.8, ease: 'power4.inOut' })
                .fromTo('.battle-arena', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'expo.out' }, '-=0.4')
                .fromTo('.spec-item', { x: (i) => i % 2 === 0 ? -100 : 100, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(1.7)' });
        }
    }, [isBattleStarted]);

    const selectDevice = (device: any) => {
        if (selectedDevices.length < 2) {
            setSelectedDevices([...selectedDevices, device]);
        }
    };

    const startBattle = () => {
        if (selectedDevices.length === 2) {
            setIsBattleStarted(true);
        }
    };

    return (
        <div ref={uiRef} className="relative z-10 min-h-screen pointer-events-none">
            <div className="max-w-7xl mx-auto px-4 py-20 pointer-events-auto">
                {!isBattleStarted ? (
                    <div className="text-center pt-20">
                        <h1 className="nexus-title text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase italic">
                            The <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Nexus</span>
                        </h1>
                        <p className="nexus-title text-xl text-slate-400 mb-20 max-w-2xl mx-auto uppercase tracking-widest font-light">
                            Enter the interactive battle arena. Select two devices to begin the ultimate specimen analysis.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                            {PRODUCTS.map((product) => (
                                <motion.div
                                    key={product.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => selectDevice(product)}
                                    className={`p-6 rounded-2xl border ${selectedDevices.find(d => d.id === product.id)
                                        ? 'border-blue-500 bg-blue-500/20'
                                        : 'border-white/10 bg-white/5'
                                        } backdrop-blur-md cursor-pointer transition-colors duration-500 group overflow-hidden relative`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <h3 className="text-2xl font-bold text-white mb-2">{product.title}</h3>
                                    <p className="text-slate-400 text-sm line-clamp-2">{product.description}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-xl font-mono text-blue-400">₹{product.currentPrices[0].price.toLocaleString()}</span>
                                        {selectedDevices.find(d => d.id === product.id) && (
                                            <span className="text-xs uppercase tracking-tighter bg-blue-500 text-white px-2 py-1 rounded">Locked</span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex justify-center flex-col items-center gap-4">
                            <div className="flex gap-4 mb-4">
                                {selectedDevices.map((d, i) => (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} key={i} className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm">
                                        {d.title}
                                    </motion.div>
                                ))}
                            </div>
                            <button
                                disabled={selectedDevices.length < 2}
                                onClick={startBattle}
                                className={`px-12 py-4 rounded-full font-bold text-lg uppercase tracking-widest transition-all duration-500 ${selectedDevices.length === 2
                                    ? 'bg-white text-black hover:scale-110 active:scale-90 shadow-[0_0_50px_rgba(255,255,255,0.3)]'
                                    : 'bg-white/5 text-white/20'
                                    }`}
                            >
                                Initiate Battle
                            </button>
                        </div>
                    </div>
                ) : (
                    <div ref={battleRef} className="battle-arena pt-20">
                        <div className="flex justify-between items-center mb-20 px-10">
                            <div className="text-left">
                                <h2 className="text-5xl font-black text-blue-400 tracking-tighter uppercase italic">{selectedDevices[0].title}</h2>
                                <div className="h-1 w-20 bg-blue-500 mt-2" />
                            </div>
                            <div className="text-center">
                                <span className="text-8xl font-black text-white/10 uppercase italic">VS</span>
                            </div>
                            <div className="text-right">
                                <h2 className="text-5xl font-black text-pink-500 tracking-tighter uppercase italic">{selectedDevices[1].title}</h2>
                                <div className="h-1 w-20 bg-pink-500 mt-2 ml-auto" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto pb-40">
                            {selectedDevices[0] && selectedDevices[1] && Object.entries(selectedDevices[0].specs).map(([key, value]) => {
                                const spec1 = value;
                                const spec2 = selectedDevices[1].specs[key];

                                return (
                                    <div key={key} className="spec-item bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group hover:border-white/30 transition-colors">
                                        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                        <h4 className="text-center text-xs uppercase tracking-[0.3em] text-slate-500 mb-6 font-bold">{key}</h4>
                                        <div className="grid grid-cols-2 gap-10 items-center">
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-white mb-2">
                                                    {typeof spec1 === 'string' ? spec1 : JSON.stringify(spec1)}
                                                </p>
                                            </div>
                                            <div className="text-left border-l border-white/10 pl-10">
                                                <p className="text-2xl font-bold text-white mb-2">
                                                    {typeof spec2 === 'string' ? spec2 : JSON.stringify(spec2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="fixed bottom-10 left-1/2 -translate-x-1/2">
                            <button
                                onClick={() => {
                                    setIsBattleStarted(false);
                                    setSelectedDevices([]);
                                }}
                                className="px-8 py-3 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 rounded-full text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-md"
                            >
                                Exit Arena
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
