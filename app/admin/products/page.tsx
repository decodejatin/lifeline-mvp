import React from 'react'
import Link from 'next/link'
import { PRODUCTS } from '../../../lib/mockData'

export default async function AdminProductsPage() {
  // TODO: Replace PRODUCTS with Prisma query and protect with auth
  const products = PRODUCTS

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/new" className="px-3 py-2 bg-amber-500 text-white rounded">New Product</Link>
      </div>

      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="p-3 bg-white rounded border flex items-center justify-between">
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-slate-500">{p.slug}</div>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/products/${p.id}/edit`} className="text-sm text-slate-700">Edit</Link>
              <button className="text-sm text-red-600" disabled>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
