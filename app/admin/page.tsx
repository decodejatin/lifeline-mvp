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
        <div className="flex justify-between items-end border-b border-slate-800 pb-6 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold font-heading bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Command Center</h1>
            <p className="text-slate-400 mt-1">System Status: <span className="text-emerald-400 font-bold">ONLINE</span></p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sm font-medium rounded-lg transition border border-slate-700">Refresh Data</button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-sm font-bold rounded-lg transition shadow-lg shadow-blue-500/20">System Logs</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in-up animate-delay-100">
          <div className="glass-dark p-6 rounded-2xl relative overflow-hidden">
            <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Total Products</div>
            <div className="text-4xl font-black text-white">{products.length}</div>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>
            </div>
          </div>
          <div className="glass-dark p-6 rounded-2xl relative overflow-hidden">
            <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Price Updates (24h)</div>
            <div className="text-4xl font-black text-emerald-400">1,248</div>
            <div className="text-xs text-emerald-500/80 mt-1">↑ 12% vs yesterday</div>
          </div>
          <div className="glass-dark p-6 rounded-2xl relative overflow-hidden">
            <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Affiliate Clicks</div>
            <div className="text-4xl font-black text-blue-400">8.5k</div>
            <div className="text-xs text-blue-500/80 mt-1">↑ 24% vs last week</div>
          </div>
          <div className="glass-dark p-6 rounded-2xl relative overflow-hidden">
            <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Pending Alerts</div>
            <div className="text-4xl font-black text-orange-400">3</div>
            <div className="text-xs text-orange-500/80 mt-1">Requires attention</div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Recent Products */}
          <div className="col-span-2 glass-dark p-6 rounded-2xl animate-fade-in-up animate-delay-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Recent Inventory</h3>
              <Link href="/admin/products" className="text-xs text-blue-400 hover:text-blue-300 font-semibold uppercase tracking-wide">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="text-xs uppercase bg-slate-800/50 text-slate-300">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Product</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3 rounded-r-lg">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {products.slice(0, 5).map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/30 transition">
                      <td className="px-4 py-3 font-medium text-white">{p.title}</td>
                      <td className="px-4 py-3"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-400">Active</span></td>
                      <td className="px-4 py-3">₹{Math.min(...p.currentPrices.map(c => c.price)).toLocaleString()}</td>
                      <td className="px-4 py-3">2 mins ago</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="space-y-6 animate-fade-in-up animate-delay-300">
            <div className="glass-dark p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-300 font-medium transition flex items-center gap-3 group">
                  <span className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition">➕</span>
                  Add New Product
                </button>
                <button className="w-full text-left px-4 py-3 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 rounded-xl text-purple-300 font-medium transition flex items-center gap-3 group">
                  <span className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition">🔄</span>
                  Sync Affiliate Prices
                </button>
                <button className="w-full text-left px-4 py-3 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30 rounded-xl text-slate-300 font-medium transition flex items-center gap-3 group">
                  <span className="p-2 bg-slate-600/20 rounded-lg group-hover:bg-slate-600/30 transition">⚙️</span>
                  Settings & API Keys
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/20">
              <h4 className="font-bold text-indigo-300 mb-2">Pro Tip</h4>
              <p className="text-xs text-indigo-200/70 leading-relaxed">
                Connect your Amazon Associate Tag in settings to automatically start tracking commissions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
