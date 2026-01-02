import React from 'react'

type Product = {
    id: string
    slug: string
    title: string
    thumbnail?: string | null
}

export default function CompareHeader({ a, b }: { a: Product; b: Product }) {
    return (
        <div className="sticky top-[10px] z-50 glass shadow-sm rounded-2xl mx-1 mb-8 transition-all duration-300">
            <div className="grid grid-cols-2 divide-x divide-slate-100">
                <div className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 shrink-0 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center">
                        {/* Fallback image if no thumbnail */}
                        {a.thumbnail ? (
                            <img src={a.thumbnail} alt={a.title} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xl font-bold text-slate-300">{a.title[0]}</span>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 truncate max-w-[120px] md:max-w-[200px] leading-tight">{a.title}</h3>
                        <p className="text-xs text-slate-500 hidden md:block">VS</p>
                    </div>
                </div>

                <div className="p-4 flex items-center gap-4 justify-end md:justify-start text-right md:text-left">
                    <div className="order-2 md:order-1">
                        <h3 className="font-bold text-slate-900 truncate max-w-[120px] md:max-w-[200px] leading-tight">{b.title}</h3>
                    </div>
                    <div className="order-1 md:order-2 w-12 h-12 shrink-0 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center">
                        {b.thumbnail ? (
                            <img src={b.thumbnail} alt={b.title} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xl font-bold text-slate-300">{b.title[0]}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
