import { NextResponse } from 'next/server'
import { PRODUCTS } from '../../../../lib/mockData'

// Secure proxy for Flipkart Affiliate API
// API keys stored server-side only; responses cached

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')

  const response = NextResponse.json(
    { success: true, data: mockSearch(q) },
    {
      headers: {
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': '99',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'Content-Type': 'application/json'
      }
    }
  )

  return response
}

function mockSearch(query: string | null) {
  if (!query) return PRODUCTS

  return PRODUCTS.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase())
  )
}

// TODO: Real Flipkart Affiliate API implementation
// 1. Use Flipkart's REST API with Bearer token auth
// 2. Implement pagination for large result sets
// 3. Add request validation and sanitization
// 4. Cache popular searches in Vercel KV
// 5. Monitor quota usage and implement circuit breaker
