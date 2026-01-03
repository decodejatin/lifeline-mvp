'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export function useGSAP(callback: (ctx: gsap.Context) => void, deps: any[] = []) {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            callback(ctx)
        }, ref)

        return () => ctx.revert()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    return ref
}
