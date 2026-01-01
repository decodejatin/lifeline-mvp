export type PricePoint = { recordedAt: string; price: number }

export const PRODUCTS = [
  {
    id: 'prod-1',
    slug: 'alpha-phone-x',
    title: 'Alpha Phone X',
    description: 'Compact flagship — good camera, long battery life.',
    thumbnail: null,
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
    ]
  },
  {
    id: 'prod-2',
    slug: 'beta-phone-pro',
    title: 'Beta Phone Pro',
    description: 'Balanced performance with clean software.',
    thumbnail: null,
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
    ]
  }
]
