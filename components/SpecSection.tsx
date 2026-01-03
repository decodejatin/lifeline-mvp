'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

// Simple SVG Icons map
const Icons: Record<string, React.ReactNode> = {
    display: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    processor: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
    memory: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
    camera: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    battery: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    build: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    connectivity: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>,
    software: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
}

// Utility to format keys nicely
const formatKey = (key: string) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())

type SpecProps = {
    title: string
    iconKey: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataA: Record<string, any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataB: Record<string, any>
}

export default function SpecSection({ title, iconKey, dataA, dataB }: SpecProps) {
    const keys = Object.keys(dataA || {})
    const sectionRef = useRef<HTMLDivElement>(null)
    const rowsRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        if (!sectionRef.current || keys.length === 0) return

        const ctx = gsap.context(() => {
            // Animate section entrance
            gsap.from(sectionRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                },
            })

            // Stagger animate rows
            gsap.from(rowsRef.current, {
                opacity: 0,
                x: -20,
                duration: 0.4,
                stagger: 0.05,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [keys.length])

    if (keys.length === 0) return null

    return (
        <div
            ref={sectionRef}
            className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-soft border border-white/20 overflow-hidden mb-6 hover:shadow-xl transition-shadow duration-300"
        >
            {/* Header with gradient background */}
            <div className="relative bg-gradient-to-r from-slate-50 to-blue-50/30 px-6 py-4 border-b border-slate-100/50 flex items-center gap-3">
                <div className="text-blue-600 bg-white p-2 rounded-xl shadow-sm">
                    {Icons[iconKey] || Icons.display}
                </div>
                <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
            </div>

            <div className="divide-y divide-slate-50">
                {keys.map((key, index) => {
                    const valA = dataA[key]
                    const valB = dataB[key]
                    const isArray = Array.isArray(valA)
                    const isDifferent = valA !== valB

                    return (
                        <div
                            key={key}
                            ref={(el) => { rowsRef.current[index] = el }}
                            className="grid grid-cols-2 group hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-violet-50/30 transition-all duration-300"
                        >
                            {/* Column A */}
                            <div className="p-4 border-r border-slate-50">
                                <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-1.5">
                                    {formatKey(key)}
                                </div>
                                <div className="font-medium text-slate-700">
                                    {isArray ? (
                                        <div className="flex flex-wrap gap-1.5">
                                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                            {(valA as any[]).map((v: string) => (
                                                <span
                                                    key={v}
                                                    className="text-xs bg-gradient-to-r from-slate-100 to-slate-50 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200/50"
                                                >
                                                    {v}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className={isDifferent ? 'text-slate-900 font-semibold' : 'text-slate-600'}>
                                            {String(valA)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Column B */}
                            <div className="p-4">
                                <div className="md:hidden text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-1.5">
                                    {formatKey(key)}
                                </div>
                                <div className="font-medium text-slate-700">
                                    {isArray ? (
                                        <div className="flex flex-wrap gap-1.5">
                                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                            {(valB as any[]).map((v: string) => (
                                                <span
                                                    key={v}
                                                    className="text-xs bg-gradient-to-r from-slate-100 to-slate-50 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200/50"
                                                >
                                                    {v}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className={isDifferent ? 'text-slate-900 font-semibold' : 'text-slate-600'}>
                                            {String(valB)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
