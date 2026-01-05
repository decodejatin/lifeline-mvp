'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const BRANDS = [
    { name: 'Apple', slogan: 'Think Different.', color: 'from-gray-400 to-gray-600', count: '12 Devices' },
    { name: 'Samsung', slogan: 'Inspired by You.', color: 'from-blue-500 to-blue-700', count: '24 Devices' },
    { name: 'Google', slogan: 'Simply Pixel.', color: 'from-red-400 via-yellow-400 to-green-500', count: '8 Devices' },
    { name: 'OnePlus', slogan: 'Never Settle.', color: 'from-rose-600 to-rose-800', count: '15 Devices' }
]

export default function BrandShowcase() {
    return (
        <section className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Brand <span className="text-emerald-500">Dynasties</span></h2>
                        <p className="text-slate-500 font-medium uppercase tracking-widest text-xs mt-2">Explore Manufacturer Hubs</p>
                    </div>
                    <button className="hidden md:block text-xs font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
                        View All Brands
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {BRANDS.map((brand, idx) => (
                        <motion.div
                            key={brand.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative h-[300px] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-tr ${brand.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-500" />

                            <div className="relative h-full p-10 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10">
                                        <span className="text-xl font-black italic">{brand.name[0]}</span>
                                    </div>
                                    <div className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                        {brand.count}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-1">{brand.name}</h3>
                                    <p className="text-sm text-slate-400 font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                                        {brand.slogan}
                                    </p>
                                </div>

                                <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                                    <ArrowUpRight size={20} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
