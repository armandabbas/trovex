import React, { useEffect, useState } from 'react'
import { Package, TrendingUp, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { PortfolioSummary } from '../components/dashboard/PortfolioSummary'
import { ValueChart } from '../components/dashboard/ValueChart'
import { CategoryDistribution } from '../components/dashboard/CategoryDistribution'
import { useCollection } from '../hooks/useCollection'
import type { CollectibleWithImages } from '../types/database'

export const Dashboard: React.FC = () => {
  const { items, loading: itemsLoading, categories } = useCollection()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalValue: 0, totalPurchasePrice: 0, itemCount: 0,
    categoryData: [] as { name: string; value: number }[],
    historyData: [] as { date: string; value: number }[],
    topItems: [] as CollectibleWithImages[]
  })

  useEffect(() => {
    if (itemsLoading) return
    const totalValue = items.reduce((sum, item) => sum + (item.current_estimated_value || 0), 0)
    const totalPurchasePrice = items.reduce((sum, item) => sum + (item.purchase_price || 0), 0)

    const categoryValueMap: Record<string, number> = {}
    items.forEach(item => {
      if (item.category_id) categoryValueMap[item.category_id] = (categoryValueMap[item.category_id] || 0) + (item.current_estimated_value || 0)
    })
    const categoryData = Object.entries(categoryValueMap).map(([id, value]) => ({
      name: categories.find(c => c.id === id)?.name || 'UNBEKANNT', value
    }))
    const topItems = [...items].sort((a, b) => (b.current_estimated_value || 0) - (a.current_estimated_value || 0)).slice(0, 5)
    
    // Technical History Generation
    const historyData = Array.from({ length: 12 }, (_, i) => ({
      date: `${10 + i}.03`,
      value: totalValue * (0.92 + Math.random() * 0.1)
    }))
    historyData[historyData.length - 1] = { date: 'HEUTE', value: totalValue }

    setStats({ totalValue, totalPurchasePrice, itemCount: items.length, categoryData, historyData, topItems })
    setLoading(false)
  }, [items, itemsLoading, categories])

  if (loading || itemsLoading) {
    return (
      <Layout>
        <div className="animate-pulse space-y-12">
          <div className="h-48 w-full bg-[var(--bg-elevated)]" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-[var(--bg-elevated)]" />)}
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-12 pb-20">
        {/* V3 Impact Hero */}
        <div className="relative overflow-hidden pt-10 pb-16 border-b border-[var(--border)]">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-l from-[var(--accent)] to-transparent" />
            <div className="h-full w-full opacity-30" style={{ backgroundImage: 'radial-gradient(var(--accent) 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Zap size={14} className="text-[var(--accent)]" />
              <span className="mono-label text-[0.6rem] tracking-[0.2em] text-[var(--accent)]">THE ARCHIVE // V3.0</span>
            </div>
            <h1 className="heading text-5xl md:text-7xl mb-8 tracking-tighter leading-[0.85]">
              FORGING ASSETS THAT PULL THE <span className="text-[var(--accent)]">FUTURE</span> FORWARD.
            </h1>
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col">
                <span className="mono-label text-[10px] text-[var(--text-muted)]">SYSTEM STATUS</span>
                <span className="mono-label text-xs text-[var(--success)]">OPERATIONAL</span>
              </div>
              <div className="flex flex-col">
                <span className="mono-label text-[10px] text-[var(--text-muted)]">ACTIVE CATEGORIES</span>
                <span className="mono-label text-xs">{categories.length} UNITS</span>
              </div>
              <div className="flex flex-col">
                <span className="mono-label text-[10px] text-[var(--text-muted)]">LAST RE-VIBRATION</span>
                <span className="mono-label text-xs uppercase">{new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} UTC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Summary Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[var(--accent)]" />
              <h2 className="heading text-sm tracking-[0.1em]">EXECUTIVE SUMMARY</h2>
            </div>
            <Link to="/collection/add"
              className="px-4 py-2 bg-[var(--accent)] text-white mono-label text-[10px] tracking-widest hover:brightness-110 transition-all">
              INVOKE_ADD_ASSET
            </Link>
          </div>
          
          <PortfolioSummary totalValue={stats.totalValue} itemCount={stats.itemCount}
            totalGainLoss={stats.totalValue - stats.totalPurchasePrice} prevValue={stats.totalValue * 0.95} />
        </section>

        {/* Technical Visualization Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[var(--bg-surface)] p-8 border border-[var(--border)]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="mono-label text-[10px] text-[var(--text-muted)]">VALUE_ACTION_90D</h3>
              <div className="px-2 py-0.5 border border-[var(--border)] mono-label text-[9px]">LIVE_FEED</div>
            </div>
            <ValueChart data={stats.historyData} />
          </div>
          
          <div className="bg-[var(--bg-surface)] p-8 border border-[var(--border)]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="mono-label text-[10px] text-[var(--text-muted)]">ALLOCATION_MATRIX</h3>
              <TrendingUp size={14} className="text-[var(--text-muted)]" />
            </div>
            <CategoryDistribution data={stats.categoryData} />
          </div>
        </div>

        {/* High-Density Asset Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Assets */}
          <div className="lg:col-span-2 border border-[var(--border)] bg-[var(--bg-surface)]">
            <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between bg-black">
              <h3 className="mono-label text-[10px] text-[var(--text-muted)] tracking-[0.15em]">HIGH_VALUE_INDEX</h3>
              <Link to="/collection" className="mono-label text-[9px] text-[var(--accent)] hover:underline">VIEW_ALL</Link>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {stats.topItems.map((item) => (
                <Link key={item.id} to={`/collection/${item.id}`}
                  className="flex items-center p-5 hover:bg-[var(--bg-hover)] transition-colors group">
                  <div className="h-12 w-12 bg-black overflow-hidden flex-shrink-0 border border-[var(--border)] group-hover:border-[var(--accent)] transition-colors">
                    {item.collectible_images?.[0] ? (
                      <img src={item.collectible_images[0].image_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)]"><Package size={20} /></div>
                    )}
                  </div>
                  <div className="ml-5 flex-1 min-w-0">
                    <p className="heading text-xs tracking-wider truncate mb-1">{item.name}</p>
                    <p className="mono-label text-[9px] text-[var(--text-muted)] uppercase">{item.brand || 'PHYSICAL_ASSET'}</p>
                  </div>
                  <div className="text-right">
                    <p className="mono-label text-sm font-bold text-[var(--text-primary)]">{item.current_estimated_value?.toLocaleString('de-DE')} €</p>
                    <p className="mono-label text-[9px] text-[var(--success)]">+2.4%</p>
                  </div>
                </Link>
              ))}
              {stats.topItems.length === 0 && (
                <p className="p-10 text-xs mono-label text-center text-[var(--text-muted)]">DATA_ARRAY_EMPTY</p>
              )}
            </div>
          </div>

          {/* Activity Logs */}
          <div className="border border-[var(--border)] bg-[var(--bg-surface)]">
            <div className="px-6 py-4 border-b border-[var(--border)] bg-black">
              <h3 className="mono-label text-[10px] text-[var(--text-muted)] tracking-[0.15em]">SESSION_LOGS</h3>
            </div>
            <div className="p-6 space-y-6">
              {items.slice(0, 4).map((item) => (
                <div key={item.id} className="relative pl-6 border-l border-[var(--border)] py-1">
                  <div className="absolute top-2 -left-[4.5px] h-2 w-2 bg-[var(--accent)]" />
                  <p className="mono-label text-[10px] text-[var(--text-secondary)] leading-relaxed">
                    ASSET_INJECTED: <span className="text-[var(--text-primary)] font-bold">{item.name}</span>
                  </p>
                  <p className="mono-label text-[9px] mt-1 text-[var(--text-muted)]">
                    TIMESTAMP: {new Date(item.created_at).toISOString().slice(0, 19).replace('T', ' ')}
                  </p>
                </div>
              ))}
              {items.length === 0 && <p className="mono-label text-[10px] text-[var(--text-muted)]">LOGS_NODE_EMPTY</p>}
            </div>
            <div className="mt-4 p-6 pt-0">
              <div className="bg-black p-4 border border-[var(--border)]">
                <p className="mono-label text-[9px] text-[var(--text-muted)] mb-2">SYSTEM_INTEGRITY</p>
                <div className="h-1.5 w-full bg-zinc-900 overflow-hidden">
                  <div className="h-full bg-[var(--accent)] w-[94%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
