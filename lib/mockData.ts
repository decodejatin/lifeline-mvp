


export type ProductSpec = {
  display: { size: string; type: string; resolution: string; refreshRate: string; protection: string }
  processor: { name: string; cores: string; gpu: string; antutuScore: string }
  memory: { ram: string; storage: string; expandable: string }
  camera: { main: string; ultrawide: string; telephoto: string; selfie: string; features: string[] }
  battery: { capacity: string; charging: string; wireless: string }
  build: { weight: string; thickness: string; material: string; rating: string }
  connectivity: { sim: string; fiveG: boolean; wifi: string; bluetooth: string }
  software: { os: string; updates: string }
}

export interface SentimentItem {
  point: string
  impact: 'positive' | 'negative'
  relevance: number
}

export type Product = {
  id: string
  slug: string
  title: string
  category: string
  tags: string[]
  description: string
  thumbnail: string
  currentPrices: { source: string; price: number; url: string }[]
  affiliates: { amazon: string; flipkart: string }
  priceHistory: { recordedAt: string; price: number }[]
  specs: ProductSpec
  sentiment: {
    positive: SentimentItem[]
    negative: SentimentItem[]
  }
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'alpha-phone-x',
    title: 'Alpha Phone X',
    category: 'flagship',
    tags: ['compact', 'ios', 'premium'],
    description: 'Compact flagship — good camera, long battery life.',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
    currentPrices: [
      { source: 'Amazon', price: 44999, url: '#' },
      { source: 'Flipkart', price: 42999, url: '#' }
    ],
    affiliates: { amazon: '#', flipkart: '#' },
    priceHistory: [
      { recordedAt: '2025-12-01', price: 45999 },
      { recordedAt: '2025-12-10', price: 44999 },
      { recordedAt: '2025-12-20', price: 42999 },
      { recordedAt: '2025-12-30', price: 43500 },
      { recordedAt: '2026-01-05', price: 42999 }
    ],
    specs: {
      display: { size: '6.1 inches', type: 'OLED', resolution: '2532 x 1170', refreshRate: '120Hz', protection: 'Ceramic Shield' },
      processor: { name: 'A16 Bionic', cores: 'Hexa-core', gpu: '5-core GPU', antutuScore: '980,000' },
      memory: { ram: '6GB', storage: '128GB', expandable: 'No' },
      camera: { main: '48MP Main f/1.6', ultrawide: '12MP Ultra-wide 120°', telephoto: '12MP 2x Zoom', selfie: '12MP TrueDepth', features: ['Night Mode', '4K Dolby Vision'] },
      battery: { capacity: '3200 mAh', charging: '20W Wired', wireless: '15W MagSafe' },
      build: { weight: '172g', thickness: '7.6mm', material: 'Glass back, Aluminum frame', rating: 'IP68' },
      connectivity: { sim: 'Dual SIM (Nano-SIM + eSIM)', fiveG: true, wifi: 'Wi-Fi 6', bluetooth: '5.3' },
      software: { os: 'iOS 17', updates: '5 years' }
    },
    sentiment: {
      positive: [
        { point: 'Exceptional Display Accuracy', impact: 'positive', relevance: 98 },
        { point: 'Industry Leading Video Quality', impact: 'positive', relevance: 95 },
        { point: 'Long-term Software Reliability', impact: 'positive', relevance: 92 }
      ],
      negative: [
        { point: 'Slow Charging Speed (20W)', impact: 'negative', relevance: 85 },
        { point: 'Restricted File Management', impact: 'negative', relevance: 60 },
        { point: 'Premium Entry Tax', impact: 'negative', relevance: 75 }
      ]
    }
  },
  {
    id: 'prod-2',
    slug: 'beta-phone-pro',
    title: 'Beta Phone Pro',
    category: 'flagship',
    tags: ['large', 'android', 'clean-os'],
    description: 'Balanced performance with clean software.',
    thumbnail: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=800&auto=format&fit=crop',
    currentPrices: [
      { source: 'Amazon', price: 35999, url: '#' },
      { source: 'Flipkart', price: 34999, url: '#' }
    ],
    affiliates: { amazon: '#', flipkart: '#' },
    priceHistory: [
      { recordedAt: '2025-11-01', price: 37999 },
      { recordedAt: '2025-11-20', price: 36999 },
      { recordedAt: '2025-12-15', price: 35999 },
      { recordedAt: '2026-01-01', price: 34999 }
    ],
    specs: {
      display: { size: '6.7 inches', type: 'LTPO AMOLED', resolution: '3200 x 1440', refreshRate: '120Hz', protection: 'Gorilla Glass Victus' },
      processor: { name: 'Snapdragon 8 Gen 2', cores: 'Octa-core', gpu: 'Adreno 740', antutuScore: '1,250,000' },
      memory: { ram: '12GB', storage: '256GB', expandable: 'No' },
      camera: { main: '50MP Main f/1.8', ultrawide: '48MP Ultra-wide', telephoto: '32MP 2x Zoom', selfie: '16MP', features: ['Magic Eraser', 'Real Tone', 'Super Res Zoom'] },
      battery: { capacity: '5000 mAh', charging: '30W Wired', wireless: '23W Wireless' },
      build: { weight: '212g', thickness: '8.9mm', material: 'Glass back, Aluminum frame', rating: 'IP68' },
      connectivity: { sim: 'Nano-SIM + eSIM', fiveG: true, wifi: 'Wi-Fi 6E', bluetooth: '5.3' },
      software: { os: 'Android 14', updates: '3 years OS, 5 years security' }
    },
    sentiment: {
      positive: [
        { point: 'Cleanest Android Implementation', impact: 'positive', relevance: 96 },
        { point: 'Intelligent AI Photo Editing', impact: 'positive', relevance: 88 }
      ],
      negative: [
        { point: 'Modest Charging Speeds', impact: 'negative', relevance: 70 },
        { point: 'Occasional Thermal Spikes', impact: 'negative', relevance: 45 }
      ]
    }
  },
  {
    id: 'prod-3',
    slug: 'gamma-ultra-5g',
    title: 'Gamma Ultra 5G',
    category: 'flagship+',
    tags: ['titanium', 'ultra-zoom', 'android'],
    description: 'Ultimate camera flagship with 200MP sensor.',
    thumbnail: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800&auto=format&fit=crop',
    currentPrices: [
      { source: 'Amazon', price: 89999, url: '#' },
      { source: 'Flipkart', price: 88999, url: '#' }
    ],
    affiliates: { amazon: '#', flipkart: '#' },
    priceHistory: [
      { recordedAt: '2025-10-01', price: 92999 },
      { recordedAt: '2025-11-15', price: 90999 },
      { recordedAt: '2025-12-30', price: 89999 }
    ],
    specs: {
      display: { size: '6.8 inches', type: 'Dynamic AMOLED 2X', resolution: '3088 x 1440', refreshRate: '120Hz', protection: 'Titanium Frame' },
      processor: { name: 'Snapdragon 8 Gen 3 for Galaxy', cores: 'Octa-core', gpu: 'Adreno 750', antutuScore: '1,500,000' },
      memory: { ram: '16GB', storage: '512GB', expandable: 'No' },
      camera: { main: '200MP Main f/1.7', ultrawide: '12MP', telephoto: '50MP 5x Zoom', selfie: '40MP', features: ['100x Space Zoom', '8K Video', 'Nightography'] },
      battery: { capacity: '5500 mAh', charging: '45W Wired', wireless: '15W Wireless' },
      build: { weight: '232g', thickness: '8.6mm', material: 'Titanium frame, Glass back', rating: 'IP68' },
      connectivity: { sim: 'Dual SIM', fiveG: true, wifi: 'Wi-Fi 7', bluetooth: '5.4' },
      software: { os: 'Android 14 (One UI)', updates: '7 years' }
    },
    sentiment: {
      positive: [
        { point: 'Unmatched 100x Space Zoom', impact: 'positive', relevance: 99 },
        { point: 'Titanium Build Durability', impact: 'positive', relevance: 94 }
      ],
      negative: [
        { point: 'Substantial Device Weight', impact: 'negative', relevance: 65 },
        { point: 'Slow In-Display Fingerprint', impact: 'negative', relevance: 20 }
      ]
    }
  },
  {
    id: 'prod-4',
    slug: 'nova-mid-z',
    title: 'Nova Mid Z',
    category: 'mid-range',
    tags: ['balanced', 'fast-charging', 'youthful'],
    description: 'High performance at an affordable mid-range price.',
    thumbnail: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop',
    currentPrices: [
      { source: 'Amazon', price: 24999, url: '#' },
      { source: 'Flipkart', price: 23999, url: '#' }
    ],
    affiliates: { amazon: '#', flipkart: '#' },
    priceHistory: [
      { recordedAt: '2025-11-10', price: 26999 },
      { recordedAt: '2025-12-05', price: 25999 },
      { recordedAt: '2026-01-02', price: 24999 }
    ],
    specs: {
      display: { size: '6.67 inches', type: 'AMOLED', resolution: '2400 x 1080', refreshRate: '120Hz', protection: 'Gorilla Glass 5' },
      processor: { name: 'Dimensity 8200', cores: 'Octa-core', gpu: 'Mali-G610', antutuScore: '850,000' },
      memory: { ram: '8GB', storage: '256GB', expandable: 'Yes' },
      camera: { main: '64MP f/1.8 OIS', ultrawide: '8MP', telephoto: 'None', selfie: '16MP', features: ['HDR', 'Panorama'] },
      battery: { capacity: '5000 mAh', charging: '67W Wired', wireless: 'No' },
      build: { weight: '189g', thickness: '7.9mm', material: 'Polycarbonate', rating: 'IP53' },
      connectivity: { sim: 'Dual SIM', fiveG: true, wifi: 'Wi-Fi 6', bluetooth: '5.2' },
      software: { os: 'Android 13', updates: '2 years' }
    },
    sentiment: {
      positive: [
        { point: '67W Ultra Fast Charging', impact: 'positive', relevance: 92 },
        { point: 'Outstanding Price-to-Performance', impact: 'positive', relevance: 95 }
      ],
      negative: [
        { point: 'Average Low-Light Camera', impact: 'negative', relevance: 55 },
        { point: 'Plentiful Pre-installed Apps', impact: 'negative', relevance: 88 }
      ]
    }
  },
  {
    id: 'prod-5',
    slug: 'echo-budget-s',
    title: 'Echo Budget S',
    category: 'budget',
    tags: ['value', 'long-battery'],
    description: 'Unbeatable value for basic daily tasks.',
    thumbnail: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=800&auto=format&fit=crop',
    currentPrices: [
      { source: 'Amazon', price: 12999, url: '#' },
      { source: 'Flipkart', price: 11999, url: '#' }
    ],
    affiliates: { amazon: '#', flipkart: '#' },
    priceHistory: [
      { recordedAt: '2025-12-01', price: 13999 },
      { recordedAt: '2025-12-25', price: 12999 }
    ],
    specs: {
      display: { size: '6.5 inches', type: 'LCD', resolution: '1600 x 720', refreshRate: '90Hz', protection: 'Standard Glass' },
      processor: { name: 'Snapdragon 680', cores: 'Octa-core', gpu: 'Adreno 610', antutuScore: '280,000' },
      memory: { ram: '4GB', storage: '64GB', expandable: 'Yes' },
      camera: { main: '13MP', ultrawide: 'None', telephoto: 'None', selfie: '5MP', features: ['Basic AI'] },
      battery: { capacity: '6000 mAh', charging: '18W Wired', wireless: 'No' },
      build: { weight: '198g', thickness: '9.2mm', material: 'Plastic', rating: 'No' },
      connectivity: { sim: 'Dual SIM', fiveG: false, wifi: 'Wi-Fi 5', bluetooth: '5.0' },
      software: { os: 'Android 12', updates: '1 year' }
    },
    sentiment: {
      positive: [
        { point: 'Colossal 6000mAh Battery', impact: 'positive', relevance: 97 },
        { point: 'Reliable Core Navigation', impact: 'positive', relevance: 75 }
      ],
      negative: [
        { point: 'Slow 18W Charging Node', impact: 'negative', relevance: 90 },
        { point: 'Limited Multitasking Power', impact: 'negative', relevance: 85 }
      ]
    }
  },
  {
    id: 'prod-6',
    slug: 'photon-gaming-x',
    title: 'Photon Gaming X',
    category: 'gaming',
    tags: ['performance', 'RGB', 'fast-charging'],
    description: 'Engineered for extreme mobile gaming performance.',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    currentPrices: [
      { source: 'Amazon', price: 54999, url: '#' },
      { source: 'Flipkart', price: 52999, url: '#' }
    ],
    affiliates: { amazon: '#', flipkart: '#' },
    priceHistory: [
      { recordedAt: '2025-11-15', price: 59999 },
      { recordedAt: '2025-12-10', price: 56999 },
      { recordedAt: '2026-01-05', price: 54999 }
    ],
    specs: {
      display: { size: '6.78 inches', type: 'AMOLED', resolution: '2448 x 1080', refreshRate: '165Hz', protection: 'Victus 2' },
      processor: { name: 'Snapdragon 8 Gen 3', cores: 'Octa-core', gpu: 'Adreno 750', antutuScore: '1,650,000' },
      memory: { ram: '16GB', storage: '256GB', expandable: 'No' },
      camera: { main: '50MP f/1.9', ultrawide: '13MP', telephoto: '5MP Macro', selfie: '32MP', features: ['Gimbal OIS', 'Raw Video'] },
      battery: { capacity: '6000 mAh', charging: '80W HyperCharge', wireless: '15W' },
      build: { weight: '239g', thickness: '10.3mm', material: 'Glass/Metal with active cooling ports', rating: 'IP54' },
      connectivity: { sim: 'Dual SIM', fiveG: true, wifi: 'Wi-Fi 7 Ready', bluetooth: '5.4' },
      software: { os: 'Android 14 (GameOS)', updates: '2 years' }
    },
    sentiment: {
      positive: [
        { point: '165Hz Ultra-Fluid Refresh', impact: 'positive', relevance: 98 },
        { point: 'Advanced Thermal Management', impact: 'positive', relevance: 93 }
      ],
      negative: [
        { point: 'Bulky Chassis Profile', impact: 'negative', relevance: 75 },
        { point: 'Niche Gaming UI Aesthetic', impact: 'negative', relevance: 40 }
      ]
    }
  }
]

