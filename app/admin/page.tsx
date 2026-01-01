import React from 'react'
import Link from 'next/link'
import { PRODUCTS } from '../../lib/mockData'

export default async function AdminPage() {
  // TODO: Protect this route with NextAuth and role-based access control
  const products = PRODUCTS

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-slate-600 mb-4">Minimal admin area — add auth and audit logging before production.</p>

      <div className="mb-4">
        <Link href="/admin/products" className="px-3 py-2 bg-slate-900 text-white rounded">Manage Products</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded border">
          <h3 className="font-semibold">Recent products</h3>
          <ul className="mt-2">
            {products.slice(0, 5).map((p) => (
              <li key={p.id} className="text-sm py-1">{p.title}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-white rounded border">
          <h3 className="font-semibold">Quick actions</h3>
          <ul className="mt-2 text-sm">
            <li>Create product (TODO)</li>
            <li>Import prices from affiliate APIs (TODO)</li>
            <li>View affiliate click logs (TODO)</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
