import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Edit2, Trash2, Star, Info, Package, Calendar, Loader2, ShieldCheck, Activity } from 'lucide-react'
import { Layout } from '../components/layout/Layout'
import { useCollection } from '../hooks/useCollection'
import { formatCurrency, STATUS_LABELS } from '../lib/utils'
import type { CollectibleWithImages } from '../types/database'
import { supabase } from '../lib/supabase'

export const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toggleFavorite, deleteItem } = useCollection()
  const [item, setItem] = useState<CollectibleWithImages | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return
      const { data, error } = await supabase.from('collectibles').select('*, collectible_images(*), categories(*)').eq('id', id).single()
      if (!error && data) setItem(data as CollectibleWithImages)
      setLoading(false)
    }
    fetchItem()
  }, [id])

  if (loading) return <Layout><div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-[var(--accent)]" /></div></Layout>
  if (!item) return (
    <Layout>
      <div className="text-center py-32 border border-[var(--border)] bg-[var(--bg-surface)]">
        <h2 className="heading text-xl mb-4">ASSET_NOT_LOCATED</h2>
        <Link to="/collection" className="mono-label no-underline text-[var(--accent)] text-[10px] tracking-widest uppercase">RETURN_TO_ARCHIVE</Link>
      </div>
    </Layout>
  )

  const handleDelete = async () => { if (window.confirm('PERMANENTLY DE-LIST ASSET FROM INTERNAL LEDGER?')) { await deleteItem(item.id); navigate('/collection') } }
  const profitLoss = (item.current_estimated_value || 0) - (item.purchase_price || 0)
  const isPositive = profitLoss >= 0

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <button onClick={() => navigate(-1)} className="flex items-center mono-label text-[10px] tracking-widest text-[var(--text-muted)] hover:text-white transition-colors">
            <ArrowLeft size={14} className="mr-2" /> EXIT_DOSSIER
          </button>
          <div className="flex items-center gap-3">
             <div className="h-2 w-2 rounded-full bg-[var(--success)] animate-pulse" />
             <span className="mono-label text-[9px] text-[var(--text-muted)] tracking-widest uppercase">REAL_TIME_FEED_ACTIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="space-y-6">
            <div className="aspect-square bg-black border border-[var(--border)] relative overflow-hidden group">
              {item.collectible_images?.[activeImage] ? (
                <img src={item.collectible_images[activeImage].image_url} alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center opacity-10"><Package size={120} /></div>
              )}
              <div className="absolute top-0 left-0 bg-black/80 px-4 py-2 border-b border-r border-[var(--border)]">
                <span className="mono-label text-[9px] tracking-widest text-white uppercase">PRIMARY_VISUAL_NODE</span>
              </div>
              <button onClick={() => toggleFavorite(item.id, item.is_favorite)}
                className={`absolute top-6 right-6 p-3 transition-all ${item.is_favorite ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : 'bg-black/50 text-zinc-400 border-[var(--border)] hover:text-white'}`}
                style={{ border: '1px solid' }}>
                <Star size={18} className={item.is_favorite ? 'fill-current' : ''} />
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {item.collectible_images?.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 w-20 h-20 bg-black border transition-all ${activeImage === i ? 'border-[var(--accent)] scale-95' : 'border-[var(--border)] opacity-50 hover:opacity-100'}`}>
                  <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div className="border-b border-[var(--border)] pb-8">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={14} className="text-[var(--accent)]" />
                <span className="mono-label text-[0.6rem] text-[var(--accent)] tracking-[0.3em] uppercase">{item.categories?.name || 'GENERIC_CLASS'}</span>
              </div>
              <h1 className="heading text-5xl mb-4 tracking-tighter uppercase">{item.name}</h1>
              <div className="flex items-center gap-6" style={{ color: 'var(--text-muted)' }}>
                <span className="mono-label text-[10px] tracking-widest uppercase flex items-center gap-2"><Package size={12} /> {item.brand || '---'}</span>
                <span className="mono-label text-[10px] tracking-widest uppercase flex items-center gap-2"><Calendar size={12} /> {item.year || '----'}</span>
                {item.condition && (
                   <div className="px-2 py-1 bg-[var(--bg-elevated)] border border-[var(--border)]">
                     <span className="mono-label text-[9px] tracking-widest text-white uppercase">{item.condition}</span>
                   </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="p-6 bg-black border border-[var(--border)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Activity size={32} />
                </div>
                <p className="mono-label text-[9px] tracking-widest text-[var(--text-muted)] mb-4 uppercase">COST_BASIS</p>
                <p className="heading text-2xl">{formatCurrency(item.purchase_price ?? 0)}</p>
              </div>
              <div className="p-6 bg-black border border-[var(--accent)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent)]" />
                <p className="mono-label text-[9px] tracking-widest text-[var(--accent)] mb-4 uppercase">MARKET_VALUATION</p>
                <p className="heading text-2xl text-white">{formatCurrency(item.current_estimated_value ?? 0)}</p>
              </div>
              <div className={`p-6 bg-black border relative overflow-hidden transition-all ${isPositive ? 'border-[var(--success)] shadow-[0_0_20px_rgba(89,169,147,0.05)]' : 'border-[var(--accent)] opacity-80'}`}>
                <p className="mono-label text-[9px] tracking-widest mb-4 uppercase" style={{ color: isPositive ? 'var(--success)' : 'var(--text-muted)' }}>NET_POSITION</p>
                <p className="heading text-2xl" style={{ color: isPositive ? 'var(--success)' : 'var(--text-primary)' }}>
                  {isPositive ? '+' : ''}{formatCurrency(profitLoss)}
                </p>
              </div>
            </div>

            <div className="p-8 bg-[var(--bg-surface)] border border-[var(--border)] space-y-8">
              <div className="flex items-center justify-between border-b border-[var(--border)]/30 pb-4">
                <div className="flex items-center gap-3">
                  <Info size={14} className="text-[var(--text-muted)]" />
                  <span className="mono-label text-[10px] tracking-[0.2em] text-white uppercase">DETERMINISTIC_DATA</span>
                </div>
                <span className="mono-label text-[9px] text-[var(--text-muted)]">REF_ID: #{item.id.slice(0, 8).toUpperCase()}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <p className="mono-label text-[9px] tracking-widest text-[var(--text-muted)] mb-2 uppercase">CURRENT_STATUS</p>
                  <p className="heading text-sm uppercase tracking-wider">{STATUS_LABELS[item.status as keyof typeof STATUS_LABELS] || item.status}</p>
                </div>
                <div>
                  <p className="mono-label text-[9px] tracking-widest text-[var(--text-muted)] mb-2 uppercase">SERIES_IDENTIFIER</p>
                  <p className="heading text-sm uppercase tracking-wider">{item.series || 'UNASSIGNED'}</p>
                </div>
              </div>

              {item.notes && (
                <div className="pt-8 border-t border-[var(--border)]/30">
                  <p className="mono-label text-[9px] tracking-widest text-[var(--text-muted)] mb-4 uppercase">ENCRYPTED_FIELD_NOTES</p>
                  <p className="text-xs leading-relaxed text-[var(--text-secondary)] tracking-wide uppercase font-medium">{item.notes}</p>
                </div>
              )}
            </div>

            <div className="flex gap-6 pt-6">
              <Link to={`/collection/${item.id}/edit`}
                className="flex-1 inline-flex items-center justify-center px-10 py-5 bg-white text-black mono-label text-[11px] font-bold tracking-[0.2em] no-underline hover:bg-[var(--accent)] hover:text-white transition-all uppercase">
                <Edit2 size={16} className="mr-3" /> MODIFY_RECORDS
              </Link>
              <button onClick={handleDelete}
                className="px-6 py-5 border border-zinc-800 text-zinc-600 hover:border-red-500 hover:text-red-500 transition-all">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
