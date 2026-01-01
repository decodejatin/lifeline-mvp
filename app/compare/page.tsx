import React from 'react'
import { PRODUCTS } from '../../lib/mockData'
import CompareView from '../../components/CompareView'
import dynamic from 'next/dynamic'

const CompareSelector = dynamic(() => import('../../components/CompareSelector'), { ssr: false })

type Props = { searchParams?: { productA?: string; productB?: string } }

export default async function ComparePage({ searchParams }: Props) {
  const { productA, productB } = searchParams || {}
  const productList = PRODUCTS

  const a = productA ? productList.find((p) => p.slug === productA) ?? null : null
  const b = productB ? productList.find((p) => p.slug === productB) ?? null : null

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Compare mobiles</h1>
      <p className="text-slate-600 mb-4">Select two models to compare features, prices and price history.</p>

      <div className="mb-6">
        <CompareSelector products={productList} selectedA={productA} selectedB={productB} />
      </div>

      {a && b ? <CompareView a={a} b={b} /> : <div className="text-slate-500">Choose two products to see a comparison.</div>}
    </section>
  )
}
