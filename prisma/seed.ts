import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.affiliateClick.deleteMany({})
  await prisma.priceHistory.deleteMany({})
  await prisma.product.deleteMany({})

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        slug: 'iphone-15-pro',
        title: 'iPhone 15 Pro',
        description: 'Latest Apple flagship with A17 Pro chip, advanced camera system, and titanium design.',
        brand: 'Apple'
      }
    }),
    prisma.product.create({
      data: {
        slug: 'samsung-s24-ultra',
        title: 'Samsung Galaxy S24 Ultra',
        description: 'Premium Android phone with S Pen, 200MP camera, and 120Hz display.',
        brand: 'Samsung'
      }
    }),
    prisma.product.create({
      data: {
        slug: 'pixel-8-pro',
        title: 'Google Pixel 8 Pro',
        description: 'Google\'s flagship with advanced AI features, Tensor chip, and exceptional camera.',
        brand: 'Google'
      }
    })
  ])

  // Add price history for each product
  for (const product of products) {
    const prices = [49999, 48999, 47999, 46999]
    for (let i = 0; i < prices.length; i++) {
      await prisma.priceHistory.create({
        data: {
          productId: product.id,
          price: prices[i],
          source: i % 2 === 0 ? 'amazon' : 'flipkart',
          recordedAt: new Date(Date.now() - (prices.length - i - 1) * 7 * 24 * 60 * 60 * 1000)
        }
      })
    }
  }

  console.log('✓ Seeding complete')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
