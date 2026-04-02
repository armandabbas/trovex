import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useCategories } from '../hooks/useCategories'
import type { WatchlistRow } from '../types/database'
import { Layout } from '../components/layout/Layout'
import { Plus, Trash2, ExternalLink, Bookmark, Loader2 } from 'lucide-react'
import { formatCurrency } from '../lib/utils'

export const Watchlist: React.FC = () => {
  const { user } = useAuth()
  const { categories } = useCategories()
  const [items, setItems] = useState<WatchlistRow[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({ name: '', category_id: '', target_price: '', external_url: '', notes: '' })

  const fetchWatchlist = async () => {
    if (!user) return; setLoading(true)
    const { data, error } = await supabase.from('watchlist').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    if (!error) setItems(data || []); setLoading(false)
  }
  useEffect(() => { fetchWatchlist() }, [user])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault(); if (!user) return; setIsSaving(true)
    try {
      const { error } = await supabase.from('watchlist').insert({
        user_id: user.id, name: formData.name, category_id: formData.category_id,
        target_price: formData.target_price ? parseFloat(formData.target_price) : null,
        external_url: formData.external_url, notes: formData.notes
      } as any)
      if (error) throw error
      setShowAddModal(false); setFormData({ name: '', category_id: '', target_price: '', external_url: '', notes: '' }); fetchWatchlist()
    } catch { alert('Fehler beim Hinzufügen.') } finally { setIsSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Von Watchlist entfernen?')) return
    await supabase.from('watchlist').delete().eq('id', id); setItems(items.filter(i => i.id !== id))
  }

  const inputClass = "w-full px-4 py-3 rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5c939f]"
  const inputStyle: React.CSSProperties = { background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)' }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bookmark size={20} style={{ color: 'var(--accent)' }} />
            <h1 className="heading" style={{ fontSize: '1.375rem' }}>Watchlist</h1>
          </div>
          <button onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] mono-label hover-lift"
            style={{ background: 'var(--accent-warm)', color: 'var(--bg-base)', fontSize: '0.688rem' }}>
            <Plus size={16} /> Hinzufügen
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin" style={{ color: 'var(--accent)' }} /></div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 rounded-[20px]" style={{ border: '2px dashed var(--border-hover)', background: 'var(--bg-surface)' }}>
            <Bookmark className="mx-auto mb-4" size={56} style={{ color: 'var(--text-muted)', opacity: 0.2 }} />
            <h3 className="heading mb-2" style={{ fontSize: '1.25rem' }}>Watchlist ist leer</h3>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>Füge Items hinzu, die du beobachten möchtest.</p>
            <button onClick={() => setShowAddModal(true)} className="mono-label" style={{ color: 'var(--accent)', fontSize: '0.688rem' }}>Erstes Item hinzufügen</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map(item => (
              <div key={item.id} className="p-6 rounded-[20px] hover-lift" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>{item.name}</h3>
                    <p className="mono-label mt-0.5" style={{ color: 'var(--accent)', fontSize: '0.563rem' }}>
                      {categories.find(c => c.id === item.category_id)?.name || 'Kategorie'}
                    </p>
                  </div>
                  <button onClick={() => handleDelete(item.id)} className="text-zinc-600 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-[8px]" style={{ background: 'var(--bg-elevated)' }}>
                    <span className="mono-label" style={{ color: 'var(--text-muted)', fontSize: '0.563rem' }}>Target</span>
                    <span className="heading" style={{ fontSize: '1rem' }}>{formatCurrency(item.target_price || 0)}</span>
                  </div>
                  {item.external_url && (
                    <a href={item.external_url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-2.5 rounded-[8px] mono-label no-underline transition-all"
                      style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid var(--border-accent)', fontSize: '0.688rem' }}>
                      <ExternalLink size={14} className="mr-2" /> Angebot
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(17,17,17,0.7)', backdropFilter: 'blur(10px)' }}>
          <div className="w-full max-w-lg rounded-[20px] p-8" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <h2 className="heading mb-6" style={{ fontSize: '1.375rem' }}>Zur Watchlist</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Name</label>
                <input required className={inputClass} style={inputStyle} value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Zielpreis (€)</label>
                <input type="number" className={inputClass} style={inputStyle} value={formData.target_price}
                  onChange={e => setFormData({...formData, target_price: e.target.value})} />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3.5 rounded-[8px] mono-label" style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}>
                  Abbrechen
                </button>
                <button type="submit" disabled={isSaving}
                  className="flex-1 py-3.5 rounded-[8px] mono-label disabled:opacity-50"
                  style={{ background: 'var(--accent-warm)', color: 'var(--bg-base)' }}>
                  {isSaving ? 'Speichert...' : 'Hinzufügen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}
