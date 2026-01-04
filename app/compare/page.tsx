import React from 'react'
import { PRODUCTS } from '../../lib/mockData'
import CompareView from '../../components/CompareView'
import CompareSelector from '../../components/CompareSelector'
import GradientOrb from '../../components/ui/gradient-orb'
import ParticleBackground from '../../components/ui/particle-background'
import TextReveal from '../../components/animations/TextReveal'

type Props = { searchParams?: { productA?: string; productB?: string } }

export default async function ComparePage({ searchParams }: Props) {
  const { productA, productB } = searchParams || {}
  const productList = PRODUCTS

  const a = productA ? productList.find((p) => p.slug === productA) ?? null : null
  const b = productB ? productList.find((p) => p.slug === productB) ?? null : null

  return (
    <section className="relative min-h-screen">
      <ParticleBackground />

      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <GradientOrb color1="rgba(249, 115, 22, 0.1)" color2="rgba(0, 0, 0, 0)" size={600} top="-10%" left="-10%" />
        <GradientOrb color1="rgba(249, 115, 22, 0.05)" color2="rgba(0, 0, 0, 0)" size={500} bottom="10%" right="-10%" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em]">
            Precision Comparison
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 font-heading tracking-tighter text-white uppercase">
            Spec <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">Battleground</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Deploy two titans. Analyze every sensor, pixel, and megahertz in high fidelity.
          </p>

          <div className="max-w-4xl mx-auto mt-12">
            <CompareSelector products={productList} selectedA={productA} selectedB={productB} />
          </div>
        </div>

        <div className="space-y-20">
          {a && b ? (
            <CompareView a={a as any} b={b as any} />
          ) : (
            <div className="space-y-20">
              <div className="relative group p-12 text-center rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl max-w-2xl mx-auto overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="text-7xl mb-6 animate-float">⚔️</div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Choose Your Contenders</h3>
                  <p className="text-slate-400 mt-4 font-medium">Select two smartphones above to begin the deep spec-analysis.</p>
                </div>
              </div>

              {/* Trending Battles */}
              <div className="space-y-8">
                <div className="flex items-center gap-6 px-4">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter whitespace-nowrap">Trending Battles</h3>
                  <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { a: 'alpha-phone-x', b: 'beta-phone-pro', title: 'Performance War', gradient: 'from-orange-600/10 to-transparent' },
                    { a: 'beta-phone-pro', b: 'gamma-ultra-5g', title: 'Camera Siege', gradient: 'from-orange-600/10 to-transparent' },
                    { a: 'gamma-ultra-5g', b: 'alpha-phone-x', title: 'Endurance Clash', gradient: 'from-orange-600/10 to-transparent' }
                  ].map((battle, i) => (
                    <a
                      key={i}
                      href={`/compare?productA=${battle.a}&productB=${battle.b}`}
                      className={`group relative p-8 rounded-[32px] bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${battle.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      <div className="relative z-10">
                        <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-4">{battle.title}</div>
                        <div className="flex flex-col gap-2">
                          <div className="text-lg font-black text-white group-hover:text-orange-200 transition-colors truncate">
                            {productList.find(p => p.slug === battle.a)?.title || 'Phone A'}
                          </div>
                          <div className="text-xs font-black text-slate-600 uppercase">VS</div>
                          <div className="text-lg font-black text-white group-hover:text-orange-200 transition-colors truncate">
                            {productList.find(p => p.slug === battle.b)?.title || 'Phone B'}
                          </div>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
                          View Battle
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
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
