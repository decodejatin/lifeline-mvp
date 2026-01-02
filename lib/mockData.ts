


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

export const PRODUCTS = [
  {
    id: 'prod-1',
    slug: 'alpha-phone-x',
    title: 'Alpha Phone X',
    description: 'Compact flagship — good camera, long battery life.',
    thumbnail: 'https://placehold.co/400x600/1e293b/ffffff?text=Alpha+X',
    currentPrices: [
      { source: 'Amazon', price: 44999, url: 'https://amazon.example/alpha' },
      { source: 'Flipkart', price: 42999, url: 'https://flipkart.example/alpha' }
    ],
    affiliates: {
      amazon: 'https://amazon.example/alpha?aff=demo',
      flipkart: 'https://flipkart.example/alpha?aff=demo'
    },
    priceHistory: [
      { recordedAt: '2025-12-01', price: 45999 },
      { recordedAt: '2025-12-10', price: 44999 },
      { recordedAt: '2025-12-20', price: 42999 }
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
    }
  },
  {
    id: 'prod-2',
    slug: 'beta-phone-pro',
    title: 'Beta Phone Pro',
    description: 'Balanced performance with clean software.',
    thumbnail: 'https://placehold.co/400x600/3b82f6/ffffff?text=Beta+Pro',
    currentPrices: [
      { source: 'Amazon', price: 35999, url: 'https://amazon.example/beta' },
      { source: 'Flipkart', price: 34999, url: 'https://flipkart.example/beta' }
    ],
    affiliates: {
      amazon: 'https://amazon.example/beta?aff=demo',
      flipkart: 'https://flipkart.example/beta?aff=demo'
    },
    priceHistory: [
      { recordedAt: '2025-11-01', price: 37999 },
      { recordedAt: '2025-11-20', price: 36999 },
      { recordedAt: '2025-12-15', price: 35999 }
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
    }
  },
  {
    id: 'prod-3',
    slug: 'gamma-ultra-5g', // Added a third one for variety
    title: 'Gamma Ultra 5G',
    description: 'Ultimate camera flagship with 200MP sensor.',
    thumbnail: 'https://placehold.co/400x600/10b981/ffffff?text=Gamma+Ultra',
    currentPrices: [
      { source: 'Amazon', price: 89999, url: 'https://amazon.example/gamma' },
      { source: 'Flipkart', price: 88999, url: 'https://flipkart.example/gamma' }
    ],
    affiliates: {
      amazon: 'https://amazon.example/gamma?aff=demo',
      flipkart: 'https://flipkart.example/gamma?aff=demo'
    },
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
    }
  }
]
