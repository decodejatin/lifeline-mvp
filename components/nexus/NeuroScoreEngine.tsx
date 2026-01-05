'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpecData {
    [key: string]: any;
}

interface NeuroScoreEngineProps {
    device1: { title: string; specs: SpecData };
    device2: { title: string; specs: SpecData };
    isVisible: boolean;
}

const SPEC_WEIGHTS: { [key: string]: number } = {
    // Performance
    'processor': 1,
    'ram': 0.8,
    'antutu': 1.2,
    // Display
    'refresh_rate': 0.9,
    'resolution': 0.7,
    'panel_type': 0.6,
    // Battery
    'capacity': 0.5,
    'charging_speed': 0.8,
    // Ease of use
    'weight': -0.4, // Light is better
    'thickness': -0.3,
};

export const NeuroScoreEngine = ({ device1, device2, isVisible }: NeuroScoreEngineProps) => {
    const [analyzing, setAnalyzing] = useState(true);

    useEffect(() => {
        if (isVisible) {
            setAnalyzing(true);
            const timer = setTimeout(() => setAnalyzing(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, device1.title, device2.title]);

    const calculateScores = (device: { specs: SpecData }) => {
        let totalScore = 0;
        const breakdown: { [key: string]: number } = {};

        // Helper to extract numeric value
        const getNum = (val: any) => {
            if (typeof val === 'number') return val;
            if (typeof val === 'string') {
                const matches = val.match(/(\d+(\.\d+)?)/);
                return matches ? parseFloat(matches[1]) : 0;
            }
            return 0;
        };

        // Flatten specs for easier analysis
        const flatSpecs: { [key: string]: any } = {};
        Object.entries(device.specs).forEach(([cat, s]) => {
            if (typeof s === 'object') {
                Object.entries(s).forEach(([k, v]) => { flatSpecs[k] = v; });
            } else {
                flatSpecs[cat] = s;
            }
        });

        Object.entries(SPEC_WEIGHTS).forEach(([key, weight]) => {
            const val = getNum(flatSpecs[key]);
            // Normalize values roughly (real apps would use better normalization)
            let normalized = 0;
            if (key === 'antutu') normalized = val / 1500000;
            else if (key === 'ram') normalized = val / 16;
            else if (key === 'capacity') normalized = val / 6000;
            else if (key === 'charging_speed') normalized = val / 120;
            else if (key === 'refresh_rate') normalized = val / 144;
            else if (key === 'weight') normalized = (300 - val) / 100; // Inverse
            else normalized = val ? 0.8 : 0.2;

            const weighted = normalized * Math.abs(weight) * 100;
            totalScore += weighted;
            breakdown[key] = weighted;
        });

        return { total: Math.round(totalScore), breakdown };
    };

    const scores1 = useMemo(() => calculateScores(device1), [device1]);
    const scores2 = useMemo(() => calculateScores(device2), [device2]);

    const RadarChart = ({ d1, d2 }: { d1: any; d2: any }) => {
        const keys = Object.keys(SPEC_WEIGHTS).slice(0, 6);
        const angleStep = (Math.PI * 2) / keys.length;
        const centerX = 150;
        const centerY = 150;
        const radius = 100;

        const getPath = (breakdown: any, scale: number = 1) => {
            return keys.map((key, i) => {
                const val = (breakdown[key] || 0) * scale;
                const x = centerX + Math.cos(i * angleStep - Math.PI / 2) * (val * 1.5);
                const y = centerY + Math.sin(i * angleStep - Math.PI / 2) * (val * 1.5);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ') + ' Z';
        };

        return (
            <svg width="300" height="300" viewBox="0 0 300 300" className="drop-shadow-2xl">
                {/* Grid */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((step) => (
                    <path
                        key={step}
                        d={keys.map((_, i) => {
                            const x = centerX + Math.cos(i * angleStep - Math.PI / 2) * radius * step;
                            const y = centerY + Math.sin(i * angleStep - Math.PI / 2) * radius * step;
                            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ') + ' Z'}
                        fill="none"
                        stroke="white"
                        strokeOpacity="0.1"
                    />
                ))}
                {/* Axes */}
                {keys.map((key, i) => (
                    <line
                        key={key}
                        x1={centerX}
                        y1={centerY}
                        x2={centerX + Math.cos(i * angleStep - Math.PI / 2) * radius}
                        y2={centerY + Math.sin(i * angleStep - Math.PI / 2) * radius}
                        stroke="white"
                        strokeOpacity="0.1"
                    />
                ))}
                {/* Labels */}
                {keys.map((key, i) => (
                    <text
                        key={key}
                        x={centerX + Math.cos(i * angleStep - Math.PI / 2) * (radius + 20)}
                        y={centerY + Math.sin(i * angleStep - Math.PI / 2) * (radius + 20)}
                        fill="#94a3b8"
                        fontSize="10"
                        textAnchor="middle"
                        className="uppercase font-mono"
                    >
                        {key.split('_')[0]}
                    </text>
                ))}
                {/* Data Shapes */}
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    d={getPath(d1.breakdown)}
                    fill="#3b82f6"
                    stroke="#60a5fa"
                    strokeWidth="2"
                />
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    d={getPath(d2.breakdown)}
                    fill="#ec4899"
                    stroke="#f472b6"
                    strokeWidth="2"
                />
            </svg>
        );
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 pointer-events-none"
                >
                    <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto">
                        {/* Background Accent */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 blur-[100px] pointer-events-none" />

                        <div className="relative flex flex-col md:flex-row items-center gap-12">
                            {/* Analysis Status */}
                            <div className="flex-1 space-y-8 w-full">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                            Neuro-Link Analysis
                                        </h3>
                                        <p className="text-slate-400 text-sm font-mono">NEURAL_SYNC_ESTABLISHED // DATA_PORT_8080</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Deep Score</div>
                                        <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                                            {analyzing ? "---" : `LQ ${Math.round((scores1.total + scores2.total) / 2)}`}
                                        </div>
                                    </div>
                                </div>

                                {/* Score Bars */}
                                <div className="space-y-6">
                                    {[
                                        { label: device1.title, score: scores1.total, color: "bg-blue-500", glow: "shadow-blue-500/20" },
                                        { label: device2.title, score: scores2.total, color: "bg-pink-500", glow: "shadow-pink-500/20" }
                                    ].map((item, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between items-end">
                                                <span className="text-sm font-semibold text-slate-300 truncate max-w-[200px]">{item.label}</span>
                                                <span className="text-lg font-mono font-bold text-white">{analyzing ? "CALCULATING..." : `${item.score} LQ`}</span>
                                            </div>
                                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: analyzing ? "30%" : `${Math.min(item.score / 5, 100)}%` }}
                                                    transition={{ duration: 1, delay: i * 0.2 }}
                                                    className={`h-full ${item.color} shadow-[0_0_10px_rgba(255,255,255,0.3)] ${item.glow}`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Diagnostic Log */}
                                <div className="h-24 bg-black/40 rounded-xl p-3 font-mono text-[10px] text-blue-400/70 overflow-hidden space-y-1 relative">
                                    <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                                    <p>{`> INITIALIZING SPEC_WEIGHT_MATRIX... OK`}</p>
                                    <p>{`> ANALYZING PHYSICAL_DIMENSIONS: { weight: ${device1.specs.weight}, thickness: ${device1.specs.thickness} }`}</p>
                                    <p>{`> COMPARING POWERTRAIN: ${device1.specs.processor} vs ${device2.specs.processor}`}</p>
                                    <p className="animate-pulse">{`> NEUROLINK STATUS: [OPTIMIZED]`}</p>
                                    <p>{`> GENERATING LIFELINE_QUOTIENT (LQ)...`}</p>
                                </div>
                            </div>

                            {/* Visual Analytics */}
                            <div className="relative p-4 border border-white/5 rounded-2xl bg-white/2 backdrop-blur-md">
                                <RadarChart d1={scores1} d2={scores2} />
                                {analyzing && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 rounded-2xl">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                                            <span className="text-xs font-mono text-blue-400">SYNCING...</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
