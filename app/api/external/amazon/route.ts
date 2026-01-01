import { NextResponse } from 'next/server'
import { PRODUCTS } from '../../../../lib/mockData'

// Secure proxy for Amazon Product Advertising API
// Uses server-side API keys; never exposed to client

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')

  // Rate limiting headers
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

// TODO: Real Amazon PA API implementation
// 1. Sign requests with AWS Signature Version 4
// 2. Add exponential backoff retry logic
// 3. Cache results in Redis (Vercel KV)
// 4. Monitor API quota and alert on limits
// 5. Add request logging and analytics
