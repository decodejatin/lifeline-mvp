import React from 'react'
import Link from 'next/link'
import { PRODUCTS } from '../../lib/mockData'

export default async function AdminPage() {
  // TODO: Protect this route with NextAuth and role-based access control
  const products = PRODUCTS

  return (
    <section className="min-h-screen bg-slate-900 -m-4 md:-m-8 p-4 md:p-8 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-800 pb-8 gap-6 animate-fade-in-up">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">v4.2.0-stable</span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <h1 className="text-4xl font-bold font-heading text-white tracking-tight">System Control</h1>
            <p className="text-slate-500 mt-1 font-medium">Global infrastructure is performing within optimal parameters.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-sm font-semibold rounded-xl transition border border-slate-700 text-slate-300">Diagnostics</button>
            <button className="flex-1 md:flex-none px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-sm font-bold rounded-xl transition shadow-lg shadow-emerald-500/20 text-white">Deploy Updates</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up animate-delay-100">
          <div className="glass-dark p-6 rounded-2xl border border-white/5 group hover:border-emerald-500/20 transition-all">
            <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-3">Inventory Alpha</div>
            <div className="text-4xl font-black text-white group-hover:text-emerald-400 transition-colors">{products.length}</div>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-500/60 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Synchronized
            </div>
          </div>
          <div className="glass-dark p-6 rounded-2xl border border-white/5 group hover:border-cyan-400/20 transition-all">
            <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-3">Price Vectors (24h)</div>
            <div className="text-4xl font-black text-cyan-400">1,482</div>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-cyan-500/60 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              ↑ 12.4% Delta
            </div>
          </div>
          <div className="glass-dark p-6 rounded-2xl border border-white/5 group hover:border-violet-500/20 transition-all">
            <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-3">Click Intelligence</div>
            <div className="text-4xl font-black text-violet-400">12.5k</div>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-violet-500/60 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
              Active Conversion
            </div>
          </div>
          <div className="glass-dark p-6 rounded-2xl border border-white/5 group hover:border-orange-500/20 transition-all">
            <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-3">System Anomalies</div>
            <div className="text-4xl font-black text-white group-hover:text-orange-400 transition-colors">0</div>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-green-500/60 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Baseline Normal
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Activity Heatmap - NEW COMPONENT */}
          <div className="col-span-1 lg:col-span-12 glass-dark p-6 rounded-2xl border border-white/5 animate-fade-in-up animate-delay-150">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">System Activity Matrix</h3>
              <div className="flex gap-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-slate-800"></div>
                  <div className="w-3 h-3 rounded-sm bg-emerald-900"></div>
                  <div className="w-3 h-3 rounded-sm bg-emerald-700"></div>
                  <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
                </div>
                <span className="text-[10px] text-slate-500 font-bold uppercase">More</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[...Array(91)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-sm transition-all hover:scale-150 cursor-pointer ${Math.random() > 0.7 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' :
                      Math.random() > 0.4 ? 'bg-emerald-800/40' : 'bg-slate-800/50'
                    }`}
                  title={`${Math.floor(Math.random() * 100)} updates on Day ${i}`}
                />
              ))}
            </div>
          </div>

          {/* Recent Products */}
          <div className="col-span-1 lg:col-span-8 glass-dark p-8 rounded-2xl border border-white/5 animate-fade-in-up animate-delay-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-white">Live Inventory</h3>
              <Link href="/admin/products" className="px-4 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-300 font-bold uppercase tracking-widest transition border border-white/10">Manage All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5">
                    <th className="px-2 py-4 font-black">Identifier</th>
                    <th className="px-4 py-4 font-black">Entity Status</th>
                    <th className="px-4 py-4 font-black">Current Value</th>
                    <th className="px-4 py-4 font-black text-right">Last Sync</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.slice(0, 6).map((p) => (
                    <tr key={p.id} className="group hover:bg-white/5 transition-colors">
                      <td className="px-2 py-4 font-semibold text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{p.title}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 uppercase tracking-widest">
                          <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                          Operational
                        </span>
                      </td>
                      <td className="px-4 py-4 font-mono text-slate-300">₹{Math.min(...p.currentPrices.map(c => c.price)).toLocaleString()}</td>
                      <td className="px-4 py-4 text-right text-slate-500 font-mono text-xs">{(Math.random() * 10).toFixed(0)}m ago</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alerts & Actions Panel */}
          <div className="col-span-1 lg:col-span-4 space-y-6 animate-fade-in-up animate-delay-300">
            <div className="glass-dark p-8 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6">Alert Center</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 group cursor-pointer hover:bg-orange-500/10 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Pricing Conflict</span>
                    <span className="text-[10px] text-slate-500 font-mono">14:02</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">SKU-7729 shows 15% discrepancy between Amazon and Flipkart nodes.</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 group cursor-pointer hover:bg-emerald-500/10 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">System Update</span>
                    <span className="text-[10px] text-slate-500 font-mono">09:15</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">Core engine v4.2.0 successfully deployed to all 12 edge clusters.</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 group cursor-pointer hover:bg-blue-500/10 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Traffic Spike</span>
                    <span className="text-[10px] text-slate-500 font-mono">Yesterday</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">Nexus interface experienced 400% increase in concurrent sessions.</p>
                </div>
              </div>
              <button className="w-full mt-6 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Clear All Clearances</button>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/10 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-all"></div>
              <h4 className="font-bold text-emerald-400 mb-3 uppercase tracking-widest text-xs">Node Intelligence</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium mb-4">
                Your affiliate nodes are currently capturing 84% of potential conversion traffic. Optimization suggested for mobile views.
              </p>
              <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline decoration-emerald-500/30 underline-offset-4">Optimize Now →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
