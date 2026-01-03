'use client'

import { useRef, MouseEvent } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    href?: string
    strength?: number
}

export default function MagneticButton({
    children,
    className,
    onClick,
    href,
    strength = 0.3
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        const button = buttonRef.current
        if (!button) return

        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        gsap.to(button, {
            x: x * strength,
            y: y * strength,
            duration: 0.3,
            ease: 'power2.out',
        })
    }

    const handleMouseLeave = () => {
        gsap.to(buttonRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
        })
    }

    const baseClasses = cn(
        'relative px-8 py-4 rounded-full font-semibold',
        'bg-gradient-to-r from-blue-600 to-violet-600',
        'text-white shadow-lg hover:shadow-xl',
        'transition-shadow duration-300',
        'cursor-pointer inline-block',
        className
    )

    if (href) {
        return (
            <a
                ref={buttonRef as any}
                href={href}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={baseClasses}
            >
                {children}
            </a>
        )
    }

    return (
        <button
            ref={buttonRef as any}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={baseClasses}
        >
            {children}
        </button>
    )
}
