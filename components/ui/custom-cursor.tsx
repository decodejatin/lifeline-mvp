'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const cursorDotRef = useRef<HTMLDivElement>(null)
    const trailRefs = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        const cursor = cursorRef.current
        const cursorDot = cursorDotRef.current
        if (!cursor || !cursorDot) return

        let mouseX = 0
        let mouseY = 0
        let cursorX = 0
        let cursorY = 0

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY

            // Update dot immediately
            cursorDot.style.left = `${mouseX}px`
            cursorDot.style.top = `${mouseY}px`
        }

        const animate = () => {
            // Smooth follow for main cursor
            cursorX += (mouseX - cursorX) * 0.15
            cursorY += (mouseY - cursorY) * 0.15

            cursor.style.left = `${cursorX}px`
            cursor.style.top = `${cursorY}px`

            requestAnimationFrame(animate)
        }

        window.addEventListener('mousemove', handleMouseMove)
        animate()

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <>
            {/* Main cursor ring */}
            <div
                ref={cursorRef}
                className="fixed w-10 h-10 border-2 border-blue-500/50 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{ transform: 'translate(-50%, -50%)' }}
            />

            {/* Cursor dot */}
            <div
                ref={cursorDotRef}
                className="fixed w-2 h-2 bg-blue-500 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{ transform: 'translate(-50%, -50%)' }}
            />
        </>
    )
}
