"use client"

import React from 'react'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 mt-auto">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand Section */}
                <div className="space-y-4">
                    <Link href="/" className="text-2xl font-bold text-white font-heading">
                        Lifeline
                    </Link>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Your trusted companion for mobile comparisons. We help you find the perfect device at the best price.
                    </p>
                    <div className="flex gap-4">
                        {/* Social Icons (SVGs) */}
                        <a href="#" className="hover:text-white transition">
                            <span className="sr-only">Twitter</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </a>
                        <a href="#" className="hover:text-white transition">
                            <span className="sr-only">GitHub</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Explore</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/products" className="hover:text-blue-400 transition">All Phones</Link></li>
                        <li><Link href="/compare" className="hover:text-blue-400 transition">Compare Tool</Link></li>
                        <li><Link href="/best-5g-phones" className="hover:text-blue-400 transition">Best 5G Phones</Link></li>
                        <li><Link href="/under-20000" className="hover:text-blue-400 transition">Under ₹20,000</Link></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about" className="hover:text-blue-400 transition">About Us</Link></li>
                        <li><Link href="/privacy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-blue-400 transition">Terms of Service</Link></li>
                        <li><Link href="/transparency" className="hover:text-blue-400 transition">Affiliate Disclosure</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
                    <p className="text-slate-400 text-xs mb-3">
                        Get the latest price drops and tech news delivered.
                    </p>
                    <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded transition">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
                <p>© {new Date().getFullYear()} Lifeline. All rights reserved. Prices provided by Amazon/Flipkart APIs.</p>
            </div>
        </footer>
    )
}
