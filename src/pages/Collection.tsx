import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { useCollection } from '../hooks/useCollection'
import { formatCurrency, STATUS_LABELS, cn } from '../lib/utils'
import { Plus, Package, Grid3X3, List, Trash2, Star, Database } from 'lucide-react'
import { ItemCard } from '../components/collection/CollectionGrid'

type ViewMode = 'grid' | 'list'
type SortKey = 'name' | 'current_estimated_value' | 'purchase_date' | 'created_at'

export const Collection: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState<string>()
  const [statusFilter, setStatusFilter] = useState<string>()
  const [sortBy] = useState<SortKey>('created_at')
  const [sortOrder] = useState<'asc' | 'desc'>('desc')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  const { items, categories, loading, toggleFavorite, deleteItem } = useCollection({
    categoryFilter, statusFilter, sortBy, sortOrder,
  })

  async function handleDelete(id: string) {
    if (!window.confirm('PERMANENTLY DELETE ASSET FROM ARCHIVE?')) return
    try { await deleteItem(id) } catch { alert('ERROR_DELETING_ASSET.') }
  }

  if (loading) {
    return (
      <Layout>
        <div className="animate-pulse space-y-8">
          <div className="h-10 w-full bg-[var(--bg-elevated)]" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="h-64 bg-[var(--bg-elevated)]" />)}
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 border-b border-[var(--border)] pb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Database size={14} className="text-[var(--accent)]" />
            <span className="mono-label text-[0.65rem] text-[var(--text-muted)] tracking-widest uppercase">REPOSITORY_INDEX_01</span>
          </div>
          <h1 className="heading text-4xl">ASSET_REPOSITORY</h1>
          <p className="mono-label mt-2" style={{ color: 'var(--text-muted)', fontSize: '0.625rem' }}>TOTAL_UNITS: {items.length} [STABLE]</p>
        </div>
        <Link to="/collection/add"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white mono-label no-underline hover:brightness-110 transition-all"
          style={{ fontSize: '0.7rem' }}>
          <Plus size={18} /> INJECT_NEW_ASSET
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-10">
        <select value={categoryFilter ?? ''} onChange={e => setCategoryFilter(e.target.value || undefined)}
          className="px-4 py-3 bg-black border border-[var(--border)] text-xs mono-label text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] uppercase">
          <option value="">ALL_CATEGORIES</option>
          {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>)}
        </select>
        <select value={statusFilter ?? ''} onChange={e => setStatusFilter(e.target.value || undefined)}
          className="px-4 py-3 bg-black border border-[var(--border)] text-xs mono-label text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] uppercase">
          <option value="">ALL_STATES</option>
          {Object.entries(STATUS_LABELS).map(([key, label]) => <option key={key} value={key}>{label.toUpperCase()}</option>)}
        </select>

        <div className="flex border border-[var(--border)] ml-auto bg-black">
          <button onClick={() => setViewMode('grid')}
            className={cn('p-3 transition-colors', viewMode === 'grid' ? 'text-[var(--accent)]' : 'text-zinc-600')}>
            <Grid3X3 size={18} />
          </button>
          <button onClick={() => setViewMode('list')}
            className={cn('p-3 transition-colors border-l border-[var(--border)]', viewMode === 'list' ? 'text-[var(--accent)]' : 'text-zinc-600')}>
            <List size={18} />
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-32 bg-[var(--bg-surface)] border border-[var(--border)]">
          <Package className="mx-auto mb-8 opacity-10" size={80} />
          <h2 className="heading text-xl mb-4">REPOSITORY_EMPTY</h2>
          <p className="max-w-xs mx-auto mb-8 mono-label text-[10px] leading-relaxed text-[var(--text-muted)]">
            NO ASSETS DETECTED IN THE CURRENT SESSION. START DATA INJECTION TO INITIALIZE THE ARCHIVE.
          </p>
          <Link to="/collection/add"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white mono-label no-underline hover:brightness-110 transition-all font-bold">
            <Plus size={20} /> INITIALIZE_INJECTION
          </Link>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(item => {
            const primaryImage = item.collectible_images?.find(img => img.is_primary)?.image_url || item.collectible_images?.[0]?.image_url
            return <ItemCard key={item.id} item={{ ...item, primary_image: primaryImage }} />
          })}
        </div>
      ) : (
        <div className="border border-[var(--border)] bg-black">
          {items.map((item, idx) => {
            const primaryImage = item.collectible_images?.find(img => img.is_primary)?.image_url || item.collectible_images?.[0]?.image_url
            return (
              <div key={item.id} className={`flex items-center gap-6 p-6 hover:bg-[var(--bg-surface)] transition-all group ${idx !== items.length - 1 ? 'border-b border-[var(--border)]' : ''}`}>
                <Link to={`/collection/${item.id}`} className="w-14 h-14 bg-[var(--bg-elevated)] border border-[var(--border)] group-hover:border-[var(--accent)] overflow-hidden flex-shrink-0 transition-colors">
                  {primaryImage ? <img src={primaryImage} alt="" className="w-full h-full object-cover" /> :
                    <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)]"><Package size={22} /></div>}
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/collection/${item.id}`} className="block no-underline">
                    <h3 className="heading text-xs tracking-wider mb-1 group-hover:text-[var(--accent)] transition-colors">{item.name}</h3>
                    <p className="mono-label text-[9px] text-[var(--text-muted)] uppercase">{item.brand || 'GENERIC_ASSET'}</p>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <p className="mono-label text-[9px] text-[var(--text-muted)] mb-1">CONDITION</p>
                  <p className="mono-label text-[10px] text-[var(--text-primary)] font-bold">{item.condition?.toUpperCase() || 'N/A'}</p>
                </div>
                <div className="text-right min-w-[100px]">
                  <p className="mono-label text-[10px] text-[var(--text-muted)] mb-1">VALUATION</p>
                  <p className="heading text-sm">{formatCurrency(item.current_estimated_value ?? 0)}</p>
                </div>
                <div className="flex items-center gap-3 pl-4 border-l border-[var(--border)]">
                  <button onClick={() => toggleFavorite(item.id, item.is_favorite)}
                    className={`p-2 border border-[var(--border)] transition-all ${item.is_favorite ? 'bg-[var(--accent-glow)] text-[var(--accent)] border-[var(--accent)]' : 'text-zinc-600 hover:text-[var(--accent)]'}`}>
                    <Star size={14} className={item.is_favorite ? 'fill-current' : ''} />
                  </button>
                  <button onClick={() => handleDelete(item.id)}
                    className="p-2 border border-[var(--border)] text-zinc-600 hover:border-red-500 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Layout>
  )
}
