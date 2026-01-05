'use client'
import React from 'react'
import { motion } from 'framer-motion'

const BRANDS = [
    'Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Realme', 'Oppo', 'Vivo', 'Asus', 'Sony'
]

export default function TrustBanner() {
    return (
        <div className="py-12 border-y border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden whitespace-nowrap">
            <div className="flex animate-marquee">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-16 px-8 items-center">
                        {BRANDS.map((brand) => (
                            <span key={brand} className="text-2xl font-black text-white/20 uppercase tracking-tighter hover:text-emerald-500/40 transition-colors cursor-default">
                                {brand}
                            </span>
                        ))}
                    </div>
                ))}
            </div>

            <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
      `}</style>
        </div>
    )
}
