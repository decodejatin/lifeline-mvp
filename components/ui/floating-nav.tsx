'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = ['hero', 'features', 'trending', 'footer']

export default function FloatingNav() {
    const [activeSection, setActiveSection] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2
            const sectionElements = sections.map(id => document.getElementById(id))

            sectionElements.forEach((section, index) => {
                if (section) {
                    const { offsetTop, offsetHeight } = section
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(index)
                    }
                }
            })
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (index: number) => {
        const section = document.getElementById(sections[index])
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4"
        >
            {sections.map((section, index) => (
                <button
                    key={section}
                    onClick={() => scrollToSection(index)}
                    className="group relative"
                >
                    <motion.div
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === index
                                ? 'bg-blue-500 scale-125'
                                : 'bg-slate-400 hover:bg-slate-600'
                            }`}
                        whileHover={{ scale: 1.5 }}
                    />

                    {/* Tooltip */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap">
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </div>
                    </div>
                </button>
            ))}
        </motion.div>
    )
}
