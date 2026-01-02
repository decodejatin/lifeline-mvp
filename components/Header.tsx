"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Products', href: '/products' },
        { name: 'Admin', href: '/admin' },
    ]

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
                ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                        L
                    </div>
                    <span className={`text-xl font-bold font-heading tracking-tight transition-colors duration-300 ${isScrolled || mobileMenuOpen ? 'text-slate-900' : 'text-slate-900/90' // Since hero is light, text is dark
                        }`}>
                        Lifeline
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors duration-300 relative group ${pathname === link.href ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                }`}></span>
                        </Link>
                    ))}
                    <Link
                        href="/compare"
                        className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-slate-900/20 hover:-translate-y-0.5"
                    >
                        Start Comparison
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-600 hover:text-slate-900"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <nav className="flex flex-col p-4 space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`text-base font-medium p-2 rounded-lg transition-colors ${pathname === link.href ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-2 border-t border-slate-100">
                        <Link
                            href="/compare"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block w-full py-3 text-center bg-blue-600 text-white font-bold rounded-xl shadow-md"
                        >
                            Start Comparison
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}
