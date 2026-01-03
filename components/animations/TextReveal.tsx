'use client'

import { useEffect, useRef } from 'react'
import SplitType from 'split-type'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface TextRevealProps {
    children: string
    className?: string
    delay?: number
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
}

export default function TextReveal({
    children,
    className = '',
    delay = 0,
    as: Component = 'div'
}: TextRevealProps) {
    const textRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!textRef.current) return

        const split = new SplitType(textRef.current, { types: 'chars,words' })

        gsap.from(split.chars, {
            opacity: 0,
            y: 20,
            rotateX: -90,
            stagger: 0.02,
            delay,
            duration: 0.6,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: textRef.current,
                start: 'top 80%',
            },
        })

        return () => split.revert()
    }, [children, delay])

    return (
        <Component ref={textRef as any} className={className}>
            {children}
        </Component>
    )
}
