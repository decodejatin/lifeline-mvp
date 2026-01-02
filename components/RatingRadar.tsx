import React from 'react'

type Scores = {
    performance: number
    display: number
    camera: number
    battery: number
}

type Props = {
    scoresA: Scores
    scoresB: Scores
    colorA?: string // hex or tailwind class for fill
    colorB?: string
}

export default function RatingRadar({ scoresA, scoresB }: Props) {
    const size = 300
    const center = size / 2
    const radius = 100 // Max radius of the chart
    const axes = ['Performance', 'Display', 'Camera', 'Battery', 'Value'] // 5 axes

    // Convert score (0-10) to cartesian coordinates
    // axisIndex: 0=Top, 1=Right, 2=BottomRight...
    const getPoint = (score: number, axisIndex: number, totalAxes = 5) => {
        const safeScore = isNaN(score) || score === undefined ? 0 : score
        const angle = (Math.PI * 2 * axisIndex) / totalAxes - Math.PI / 2
        const distance = (safeScore / 10) * radius
        const x = center + distance * Math.cos(angle)
        const y = center + distance * Math.sin(angle)
        return { x, y }
    }

    const generatePath = (scores: Scores) => {
        // We Map our distinct score keys to axes indices
        // 0: Performance, 1: Display, 2: Camera, 3: Battery, 4: (Derived Value? Or repeat Perf? Let's use 4 axes for square or 5 if we add one)
        // Let's stick to 4 axes for simplicity of the "Diamond" shape, or add a fake 5th for "Build".
        // Actually, let's use the layout: Perf(Top), Display(Right), Battery(Bottom), Camera(Left)

        // Order: Performance -> Display -> Battery -> Camera
        const pts = [
            getPoint(scores.performance, 0, 4),
            getPoint(scores.display, 1, 4),
            getPoint(scores.battery, 2, 4),
            getPoint(scores.camera, 3, 4)
        ]

        return `M ${pts[0].x},${pts[0].y} L ${pts[1].x},${pts[1].y} L ${pts[2].x},${pts[2].y} L ${pts[3].x},${pts[3].y} Z`
    }

    const pathA = generatePath(scoresA)
    const pathB = generatePath(scoresB)

    // Background webs (Levels 2, 4, 6, 8, 10)
    const levels = [2, 4, 6, 8, 10]

    return (
        <div className="relative flex items-center justify-center p-4">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
                {/* Background Grid (Web) */}
                {levels.map(l => (
                    <path
                        key={l}
                        d={`M ${getPoint(l, 0, 4).x},${getPoint(l, 0, 4).y} 
                L ${getPoint(l, 1, 4).x},${getPoint(l, 1, 4).y} 
                L ${getPoint(l, 2, 4).x},${getPoint(l, 2, 4).y} 
                L ${getPoint(l, 3, 4).x},${getPoint(l, 3, 4).y} Z`}
                        fill="none"
                        stroke="#e2e8f0"
                        strokeDasharray="4 4"
                        strokeWidth="1"
                    />
                ))}

                {/* Axes Lines */}
                {[0, 1, 2, 3].map(i => {
                    const end = getPoint(10, i, 4)
                    return <line key={i} x1={center} y1={center} x2={end.x} y2={end.y} stroke="#cbd5e1" />
                })}

                {/* Labels */}
                <text x={center} y={center - radius - 15} textAnchor="middle" className="text-[10px] font-bold fill-slate-500 uppercase">Perfromance</text>
                <text x={center + radius + 20} y={center} textAnchor="middle" className="text-[10px] font-bold fill-slate-500 uppercase">Display</text>
                <text x={center} y={center + radius + 20} textAnchor="middle" className="text-[10px] font-bold fill-slate-500 uppercase">Battery</text>
                <text x={center - radius - 20} y={center} textAnchor="middle" className="text-[10px] font-bold fill-slate-500 uppercase">Camera</text>

                {/* Data Path A */}
                <path d={pathA} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="3" />

                {/* Data Path B */}
                <path d={pathB} fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth="3" />

                {/* Dots for A */}
                {[0, 1, 2, 3].map(i => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const vals = [scoresA.performance, scoresA.display, scoresA.battery, scoresA.camera]
                    const p = getPoint(vals[i], i, 4)
                    return <circle cx={p.x} cy={p.y} r="4" fill="#3b82f6" stroke="white" strokeWidth="2" key={i} />
                })}

                {/* Dots for B */}
                {[0, 1, 2, 3].map(i => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const vals = [scoresB.performance, scoresB.display, scoresB.battery, scoresB.camera]
                    const p = getPoint(vals[i], i, 4)
                    return <circle cx={p.x} cy={p.y} r="4" fill="#a855f7" stroke="white" strokeWidth="2" key={i} />
                })}
            </svg>
        </div>
    )
}
