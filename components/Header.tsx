"use client"
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const headerRef = useRef<HTMLElement>(null)
    const logoRef = useRef<HTMLDivElement>(null)

    // Enhanced scroll effect with GSAP
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // GSAP scroll animation for header
    useEffect(() => {
        if (!headerRef.current) return

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                start: 'top top',
                end: 'bottom top',
                onUpdate: (self) => {
                    const progress = self.progress
                    if (headerRef.current) {
                        // Shrink header on scroll
                        gsap.to(headerRef.current, {
                            paddingTop: progress > 0.1 ? '0.75rem' : '1.25rem',
                            paddingBottom: progress > 0.1 ? '0.75rem' : '1.25rem',
                            duration: 0.3,
                        })
                    }
                },
            })
        }, headerRef)

        return () => ctx.revert()
    }, [])

    // Magnetic effect for logo
    const handleLogoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!logoRef.current) return
        const rect = logoRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        gsap.to(logoRef.current, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: 'power2.out',
        })
    }

    const handleLogoMouseLeave = () => {
        gsap.to(logoRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
        })
    }

    const navLinks = [
        { name: 'Products', href: '/products' },
        { name: 'Nexus 3D', href: '/nexus' },
        { name: 'Admin', href: '/admin' },
    ]

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
                ? 'bg-black/80 backdrop-blur-xl shadow-lg border-b border-white/10'
                : 'bg-black/50 backdrop-blur-sm border-b border-white/5'
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                {/* Logo with magnetic effect */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div
                        ref={logoRef}
                        onMouseMove={handleLogoMouseMove}
                        onMouseLeave={handleLogoMouseLeave}
                        className="w-10 h-10 bg-gradient-to-tr from-emerald-600 via-emerald-500 to-emerald-400 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300 relative overflow-hidden font-heading"
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                        <span className="relative z-10">L</span>
                    </div>
                    <span className="text-xl font-bold font-heading tracking-tight bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                        Lifeline
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-all duration-300 relative group ${pathname === link.href
                                ? 'text-emerald-500'
                                : 'text-slate-300 hover:text-white hover:-translate-y-0.5'
                                }`}
                        >
                            {link.name}
                            <span
                                className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-600 to-emerald-400 transform origin-left transition-transform duration-300 ${pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                    }`}
                            />
                        </Link>
                    ))}
                    <Link
                        href="/compare"
                        className="group relative px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-500/50 hover:-translate-y-0.5 overflow-hidden"
                    >
                        {/* Shimmer on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer" />
                        <span className="relative z-10">Start Comparison</span>
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay with smooth animation */}
            <div
                className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-xl transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <nav className="flex flex-col p-4 space-y-4">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`text-base font-medium p-3 rounded-xl transition-all duration-300 ${pathname === link.href
                                ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 text-emerald-500 shadow-sm border border-emerald-500/30'
                                : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                }`}
                            style={{
                                animationDelay: `${index * 50}ms`,
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-2 border-t border-white/10">
                        <Link
                            href="/compare"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block w-full py-3 text-center bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            Start Comparison
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}
