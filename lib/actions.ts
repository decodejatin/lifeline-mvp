'use server'
import { prisma } from './db'

type ProductInput = {
  slug: string
  title: string
  description: string
  brand?: string
}

export async function createProduct(data: ProductInput) {
  try {
    if (!data.slug || !data.title) {
      throw new Error('Slug and title are required')
    }

    const existing = await prisma.product.findUnique({ where: { slug: data.slug } })
    if (existing) {
      throw new Error('Product with this slug already exists')
    }

    const product = await prisma.product.create({
      data: {
        slug: data.slug.toLowerCase().trim(),
        title: data.title.trim(),
        description: data.description?.trim(),
        brand: data.brand?.trim()
      }
    })

    return { success: true, data: product }
  } catch (err) {
    return { success: false, error: (err as any).message }
  }
}

export async function updateProduct(id: string, data: Partial<ProductInput>) {
  try {
    if (!id) throw new Error('Product ID required')

    const product = await prisma.product.update({
      where: { id },
      data: {
        slug: data.slug?.toLowerCase().trim(),
        title: data.title?.trim(),
        description: data.description?.trim(),
        brand: data.brand?.trim()
      }
    })

    return { success: true, data: product }
  } catch (err) {
    return { success: false, error: (err as any).message }
  }
}

export async function deleteProduct(id: string) {
  try {
    if (!id) throw new Error('Product ID required')

    // Delete related records first
    await prisma.priceHistory.deleteMany({ where: { productId: id } })
    await prisma.affiliateClick.deleteMany({ where: { productId: id } })

    // Then delete product
    const product = await prisma.product.delete({ where: { id } })

    return { success: true, data: product }
  } catch (err) {
    return { success: false, error: (err as any).message }
  }
}

export async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        priceHistory: {
          orderBy: { recordedAt: 'desc' },
          take: 30
        }
      }
    })

    if (!product) throw new Error('Product not found')
    return { success: true, data: product }
  } catch (err) {
    return { success: false, error: (err as any).message }
  }
}

export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        _count: {
          select: { priceHistory: true, affiliateClicks: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return { success: true, data: products }
  } catch (err) {
    return { success: false, error: (err as any).message }
  }
}

export async function addPriceHistory(productId: string, price: number, source: string) {
  try {
    if (!productId || price < 0 || !source) {
      throw new Error('Invalid input')
    }

    const priceRecord = await prisma.priceHistory.create({
      data: {
        productId,
        price,
        source: source.toLowerCase()
      }
    })

    return { success: true, data: priceRecord }
  } catch (err) {
    return { success: false, error: (err as any).message }
  }
}
