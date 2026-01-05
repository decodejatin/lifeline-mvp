'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Product {
    id: string
    title: string
    slug: string
    description: string
    thumbnail: string
    currentPrices: { source: string; price: number; url: string }[]
    rating?: number
}

interface FlipCardProps {
    product: Product
    index: number
}

export default function FlipCard({ product, index }: FlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false)
    const brand = product.title.split(' ')[0] // Extract brand from title
    const price = product.currentPrices[0]?.price || 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="perspective-1000 h-[400px]"
        >
            <motion.div
                className="relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer"
                style={{
                    transformStyle: 'preserve-3d',
                }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                {/* Front of card */}
                <div
                    className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="relative h-full bg-gradient-to-br from-slate-900 via-blue-900 to-violet-900 p-6 flex flex-col justify-between group">
                        {/* Animated border */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />

                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl" />

                        {/* Content */}
                        <div>
                            <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 mb-4">
                                {brand}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                                {product.title}
                            </h3>
                            {product.rating && (
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.floor(product.rating!) ? 'text-yellow-400' : 'text-gray-600'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="text-3xl font-bold text-white">
                                ₹{price.toLocaleString()}
                            </div>
                            <div className="text-sm text-white/60">
                                Click to see details →
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back of card */}
                <div
                    className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <div className="h-full bg-gradient-to-br from-violet-900 via-purple-900 to-pink-900 p-6 flex flex-col justify-between">
                        <div>
                            <h4 className="text-xl font-bold text-white mb-4">Quick Specs</h4>
                            <div className="space-y-3 text-white/80 text-sm">
                                <div className="flex justify-between">
                                    <span>Display</span>
                                    <span className="font-semibold">6.7" AMOLED</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Processor</span>
                                    <span className="font-semibold">Snapdragon 8 Gen 2</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>RAM</span>
                                    <span className="font-semibold">12GB</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Camera</span>
                                    <span className="font-semibold">200MP</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Link
                                href={`/products/${product.slug}`}
                                className="block w-full py-3 bg-white text-purple-900 rounded-xl font-semibold text-center hover:bg-blue-100 transition-colors"
                            >
                                View Details
                            </Link>
                            <Link
                                href="/compare"
                                className="block w-full py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-center hover:bg-white/20 transition-colors"
                            >
                                Compare
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
