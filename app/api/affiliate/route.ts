import { NextResponse } from 'next/server'
import { recordAffiliateClick } from '../../../lib/affiliate'

function isValidUrl(u: string) {
  try {
    const parsed = new URL(u)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch (err) {
    return false
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const productId = searchParams.get('productId')
  const source = searchParams.get('source')
  const url = searchParams.get('url')

  if (!url || !isValidUrl(url) || url.length > 2048) {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 })
  }

  // Non-blocking: record click but don't prevent redirect if DB fails
  recordAffiliateClick(productId, source, url)

  // TODO: add anti-fraud/referrer checks, attach UTM params, sign affiliate redirects if required
  return NextResponse.redirect(url)
}
