import React from 'react'
import { PRODUCTS } from '../../lib/mockData'
import CompareView from '../../components/CompareView'
import CompareSelector from '../../components/CompareSelector'

type Props = { searchParams?: { productA?: string; productB?: string } }

export default async function ComparePage({ searchParams }: Props) {
  const { productA, productB } = searchParams || {}
  const productList = PRODUCTS

  const a = productA ? productList.find((p) => p.slug === productA) ?? null : null
  const b = productB ? productList.find((p) => p.slug === productB) ?? null : null

  return (
    <section className="relative min-h-screen">
      {/* Background Gradients: Blue vs Orange (Fire vs Ice) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-pulse-slow"></div>
        <div className="absolute top-40 right-[-10%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-pulse-slow"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-10 pt-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-4 font-heading">Compare <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">Powerhouses</span></h1>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">Select two models to see a side-by-side battle of specs, features, and AI analysis.</p>

          <div className="max-w-4xl mx-auto">
            <CompareSelector products={productList} selectedA={productA} selectedB={productB} />
          </div>
        </div>

        <div className="animate-fade-in-up animate-delay-100">
          {a && b ? <CompareView a={a} b={b} /> : (
            <div className="space-y-12">
              <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/60 mx-auto max-w-2xl shadow-sm">
                <div className="text-6xl mb-4 animate-bounce">👇</div>
                <h3 className="text-xl font-bold text-slate-800">Select two smartphones above</h3>
                <p className="text-slate-500 mt-2">or choose a trending battle below</p>
              </div>

              {/* Trending Battles */}
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center font-heading">Trending Battles 🔥</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { a: 'iphone-15-pro', b: 'samsung-s24-ultra', title: 'Flagship War' },
                    { a: 'oneplus-12r', b: 'pixel-8a', title: 'Mid-Range Kings' },
                    { a: 'samsung-s24-ultra', b: 'pixel-8-pro', title: 'Android Apex' }
                  ].map((battle, i) => (
                    <a
                      key={i}
                      href={`/compare?productA=${battle.a}&productB=${battle.b}`}
                      className="group relative overflow-hidden bg-white hover:bg-white/80 p-6 rounded-2xl border border-white/20 shadow-lg transition-all hover:scale-[1.02] hover:-translate-y-1 block"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-slate-200 group-hover:text-blue-100 transition">VS</div>
                      <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">{battle.title}</div>
                      <div className="flex items-center justify-between text-slate-700 font-semibold group-hover:text-blue-700 transition">
                        <span>{productList.find(p => p.slug === battle.a)?.title || 'Phone A'}</span>
                        <span className="text-slate-300">/</span>
                        <span>{productList.find(p => p.slug === battle.b)?.title || 'Phone B'}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
