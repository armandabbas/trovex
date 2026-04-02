import React, { useState, useEffect, useCallback } from 'react'
import { Search as SearchIcon, X, Loader2, Package, Terminal } from 'lucide-react'
import { Layout } from '../components/layout/Layout'
import { ItemCard } from '../components/collection/CollectionGrid'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useCategories } from '../hooks/useCategories'
import type { CollectibleWithImages } from '../types/database'
import { cn } from '../lib/utils'

export const Search: React.FC = () => {
  const { user } = useAuth()
  const { categories } = useCategories()
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [results, setResults] = useState<CollectibleWithImages[]>([])
  const [loading, setLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  useEffect(() => { const s = localStorage.getItem('recent_searches'); if (s) setRecentSearches(JSON.parse(s)) }, [])

  const saveSearch = (term: string) => {
    if (!term.trim()) return
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5)
    setRecentSearches(updated); localStorage.setItem('recent_searches', JSON.stringify(updated))
  }

  const handleSearch = useCallback(async (searchTerm: string, categoryId: string | null) => {
    if (!user) return; setLoading(true)
    try {
      let q = supabase.from('collectibles').select(`*, collectible_images (image_url, is_primary)`).eq('user_id', user.id)
      if (searchTerm) q = q.or(`name.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%,series.ilike.%${searchTerm}%`)
      if (categoryId) q = q.eq('category_id', categoryId)
      const { data, error } = await q.order('created_at', { ascending: false })
      if (error) throw error
      setResults((data as any) || [])
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }, [user])

  useEffect(() => {
    const t = setTimeout(() => {
      if (query || selectedCategory) { handleSearch(query, selectedCategory); if (query) saveSearch(query) }
      else setResults([])
    }, 300)
    return () => clearTimeout(t)
  }, [query, selectedCategory, handleSearch])

  return (
    <Layout>
      <div className="space-y-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Terminal size={14} className="text-[var(--accent)]" />
            <span className="mono-label text-[0.65rem] text-[var(--text-muted)] tracking-widest uppercase">TERMINAL_QUERY_SERVICE</span>
          </div>
          <h1 className="heading text-4xl">GLOBAL_DISCOVERY</h1>

          <div className="relative group">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[var(--accent)] transition-colors" size={18} style={{ color: 'var(--text-muted)' }} />
            <input type="text" placeholder="QUERY_BY_NAME_BRAND_OR_SERIES..."
              className="w-full pl-12 pr-12 py-5 bg-black border border-[var(--border)] focus:border-[var(--accent)] text-xs mono-label focus:outline-none transition-all placeholder:text-zinc-800"
              style={{ color: 'var(--text-primary)' }}
              value={query} onChange={e => setQuery(e.target.value)} />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-white transition-colors">
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
            <button onClick={() => setSelectedCategory(null)}
              className={cn(
                "flex-shrink-0 px-5 py-2.5 mono-label text-[0.65rem] tracking-widest transition-all border",
                selectedCategory === null
                  ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                  : "bg-black border-[var(--border)] text-[var(--text-muted)] hover:text-white hover:border-[var(--text-muted)]"
              )}>
              ALL_SYSTEMS
            </button>
            {categories.map((cat: { id: string, name: string }) => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "flex-shrink-0 px-5 py-2.5 mono-label text-[0.65rem] tracking-widest transition-all border",
                  selectedCategory === cat.id
                    ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                    : "bg-black border-[var(--border)] text-[var(--text-muted)] hover:text-white hover:border-[var(--text-muted)]"
                )}>
                {cat.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-32 border border-[var(--border)] bg-[var(--bg-surface)]">
            <Loader2 size={32} className="animate-spin mb-6 text-[var(--accent)]" />
            <p className="mono-label text-[10px] tracking-[0.2em] text-[var(--text-muted)]">FETCHING_REMOTE_DEPOSITS...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map(item => {
              const img = item.collectible_images?.find(i => i.is_primary)?.image_url || item.collectible_images?.[0]?.image_url
              return <ItemCard key={item.id} item={{ ...item, primary_image: img }} />
            })}
          </div>
        ) : query ? (
          <div className="text-center py-32 border border-[var(--border)] bg-[var(--bg-surface)]">
            <Package className="mx-auto mb-6 opacity-10" size={80} />
            <h3 className="heading text-xl mb-4">NULL_RESULTS_RETURNED</h3>
            <p className="mono-label text-[10px] text-[var(--text-muted)]">ADJUST QUERY PARAMETERS AND RE-EXECUTE.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {recentSearches.length > 0 && (
              <div className="border border-[var(--border)] p-8 bg-black">
                <h3 className="mono-label text-[10px] tracking-widest text-[var(--text-muted)] mb-6">HISTORICAL_QUERY_LOGS</h3>
                <div className="flex flex-wrap gap-3">
                  {recentSearches.map((s, i) => (
                    <button key={i} onClick={() => setQuery(s)} 
                      className="px-4 py-2 border border-[var(--border)] mono-label text-[10px] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all">
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="p-12 border border-[var(--border)] text-center bg-[var(--bg-surface)] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)]" />
              <h3 className="heading text-2xl mb-4 tracking-tight">UNIFIED_ASSET_SEARCH</h3>
              <p className="max-w-md mx-auto mono-label text-[10px] leading-relaxed text-[var(--text-muted)] uppercase tracking-wide">
                INSTANT DISCOVERY ACROSS ALL REPOSITORIES. FILTER BY CATEGORY, BRAND, OR SERIES FOR HIGH-PRECISION INDEXING.
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
