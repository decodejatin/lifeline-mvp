  'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface GradientOrbProps {
    color1: string
    color2: string
    size: number
    top?: string
    left?: string
    right?: string
    bottom?: string
    delay?: number
}

export default function GradientOrb({
    color1,
    color2,
    size,
    top,
    left,
    right,
    bottom,
    delay = 0
}: GradientOrbProps) {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay, duration: 1.5, ease: 'easeOut' }}
            className="absolute rounded-full blur-3xl pointer-events-none"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                background: `radial-gradient(circle, ${color1}, ${color2})`,
                top,
                left,
                right,
                bottom,
            }}
        >
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="w-full h-full rounded-full"
                style={{
                    background: `radial-gradient(circle, ${color1}, transparent)`,
                }}
            />
        </motion.div>
    )
}
