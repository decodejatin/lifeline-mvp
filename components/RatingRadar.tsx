import React from 'react'
import { motion } from 'framer-motion'

type Scores = {
    performance: number
    display: number
    camera: number
    battery: number
}

type Props = {
    scoresA: Scores
    scoresB: Scores
}

export default function RatingRadar({ scoresA, scoresB }: Props) {
    const size = 300
    const center = size / 2
    const radius = 100
    const levels = [2, 4, 6, 8, 10]

    const getPoint = (score: number, axisIndex: number, totalAxes = 4) => {
        const safeScore = isNaN(score) || score === undefined ? 0 : score
        const angle = (Math.PI * 2 * axisIndex) / totalAxes - Math.PI / 2
        const distance = (safeScore / 10) * radius
        const x = center + distance * Math.cos(angle)
        const y = center + distance * Math.sin(angle)
        return { x, y }
    }

    const generatePath = (scores: Scores) => {
        const pts = [
            getPoint(scores.performance, 0),
            getPoint(scores.display, 1),
            getPoint(scores.battery, 2),
            getPoint(scores.camera, 3)
        ]
        return `M ${pts[0].x},${pts[0].y} L ${pts[1].x},${pts[1].y} L ${pts[2].x},${pts[2].y} L ${pts[3].x},${pts[3].y} Z`
    }

    const pathA = generatePath(scoresA)
    const pathB = generatePath(scoresB)

    return (
        <div className="relative flex items-center justify-center p-4">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible drop-shadow-2xl">
                {/* Background Grid */}
                {levels.map(l => (
                    <motion.path
                        key={l}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: l * 0.05 }}
                        d={`M ${getPoint(l, 0).x},${getPoint(l, 0).y} 
                           L ${getPoint(l, 1).x},${getPoint(l, 1).y} 
                           L ${getPoint(l, 2).x},${getPoint(l, 2).y} 
                           L ${getPoint(l, 3).x},${getPoint(l, 3).y} Z`}
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                    />
                ))}

                {/* Axes Lines */}
                {[0, 1, 2, 3].map(i => {
                    const end = getPoint(10, i)
                    return <line key={i} x1={center} y1={center} x2={end.x} y2={end.y} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
                })}

                {/* Labels */}
                <text x={center} y={center - radius - 20} textAnchor="middle" className="text-[10px] font-black fill-slate-500 uppercase tracking-widest">Perf</text>
                <text x={center + radius + 25} y={center + 4} textAnchor="start" className="text-[10px] font-black fill-slate-500 uppercase tracking-widest">Disp</text>
                <text x={center} y={center + radius + 25} textAnchor="middle" className="text-[10px] font-black fill-slate-500 uppercase tracking-widest">Batt</text>
                <text x={center - radius - 25} y={center + 4} textAnchor="end" className="text-[10px] font-black fill-slate-500 uppercase tracking-widest">Cam</text>

                {/* Data Paths with Glow */}
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    d={pathA}
                    fill="rgba(249, 115, 22, 0.15)"
                    stroke="#f97316"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                />
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    d={pathB}
                    fill="rgba(148, 163, 184, 0.15)"
                    stroke="#94a3b8"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                />

                {/* Interactive Points */}
                {[0, 1, 2, 3].map(i => {
                    const vA = [scoresA.performance, scoresA.display, scoresA.battery, scoresA.camera][i]
                    const vB = [scoresB.performance, scoresB.display, scoresB.battery, scoresB.camera][i]
                    const pA = getPoint(vA, i)
                    const pB = getPoint(vB, i)
                    return (
                        <g key={i}>
                            <circle cx={pA.x} cy={pA.y} r="3" fill="#f97316" />
                            <circle cx={pB.x} cy={pB.y} r="3" fill="#94a3b8" />
                        </g>
                    )
                })}
            </svg>
        </div>
    )
}
