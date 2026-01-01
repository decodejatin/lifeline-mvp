import { prisma } from './db'

export async function recordAffiliateClick(productId: string | null, source: string | null, url: string) {
  try {
    // TODO: validate productId and source; handle missing DB gracefully
    await prisma.affiliateClick.create({
      data: {
        productId: productId ?? undefined,
        source: source ?? 'unknown',
        affiliateUrl: url
      }
    })
  } catch (err) {
    // In MVP, do not block redirect on DB failure
    console.error('Failed to record affiliate click', err)
  }
}
