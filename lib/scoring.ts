// Scoring Algorithm to normalize product specs into a 0-10 score
// This logic allows us to generate "AI Ratings" dynamically

type Specs = {
    processor?: { antutuScore: string }
    battery?: { capacity: string; charging: string }
    display?: { refreshRate: string; resolution: string }
    memory?: { ram: string }
    camera?: { main: string }
}

export function calculateScores(specs: Specs) {
    // Helpers to parse numbers from strings like "5000 mAh" or "120Hz"
    const getNum = (str: string | undefined) => parseInt((str || '').replace(/[^0-9]/g, '') || '0')

    // 1. Performance Score (Based on Antutu)
    // Baseline: 500k = 5.0, 1.5M = 10.0
    const antutu = getNum(specs.processor?.antutuScore)
    const perfScore = antutu > 0 ? Math.min(10, Math.max(1, antutu / 150000)) : 5 // Default 5 if unknown

    // 2. Battery Score (Capacity + Charging)
    // Baseline: 3000mAh = 3, 6000mAh = 10
    const battery = getNum(specs.battery?.capacity)
    const charging = getNum(specs.battery?.charging)
    let battScore = (battery / 6000) * 8

    // Minimal fallback if data missing
    if (battery === 0) battScore = 6

    if (charging > 50) battScore += 2
    else if (charging > 20) battScore += 1

    // 3. Display Score (Refresh Rate + Resolution)
    const hz = getNum(specs.display?.refreshRate)
    let dispScore = 5
    if (hz >= 120) dispScore += 3
    if (hz >= 90) dispScore += 1
    if (specs.display?.resolution?.includes('3200') || specs.display?.resolution?.includes('1440')) dispScore += 1 // QHD bonus

    // 4. Camera Score (Megapixels - purely heuristic for MVP)
    // Real world would use DXOMARK, but here we use main sensor MP + simplistic logic
    const mp = getNum(specs.camera?.main)
    const camScore = mp > 0 ? Math.min(10, 4 + (mp / 20)) : 6

    // 5. Value Score (Not calculated here, depends on price)

    return {
        performance: Number(perfScore.toFixed(1)),
        battery: Number(Math.min(10, battScore).toFixed(1)),
        display: Number(Math.min(10, dispScore).toFixed(1)),
        camera: Number(Math.min(10, camScore).toFixed(1)),
        // Average overall rating
        overall: Number(((perfScore + battScore + dispScore + camScore) / 4).toFixed(1))
    }
}

