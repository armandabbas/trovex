import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2, ArrowLeft, Save } from 'lucide-react'
import { Layout } from '../components/layout/Layout'
import { supabase } from '../lib/supabase'
import { useCategories } from '../hooks/useCategories'
import { useCollection } from '../hooks/useCollection'
import type { CollectibleUpdate, CollectibleRow } from '../types/database'

interface FormData {
  name: string; category_id: string; brand: string; series: string; year: string
  condition: string; purchase_price: string; current_estimated_value: string; notes: string; status: string
}

export const EditItem: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { categories } = useCategories()
  const { updateItem } = useCollection()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '', category_id: '', brand: '', series: '', year: '',
    condition: 'Near Mint', purchase_price: '', current_estimated_value: '', notes: '', status: 'in_collection'
  })

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return
      const { data, error } = await supabase.from('collectibles').select('*').eq('id', id).single()
      if (!error && data) {
        const item = data as CollectibleRow
        setFormData({
          name: item.name || '', category_id: item.category_id || '', brand: item.brand || '', series: item.series || '',
          year: item.year?.toString() || '', condition: item.condition || 'Near Mint',
          purchase_price: item.purchase_price?.toString() || '', current_estimated_value: item.current_estimated_value?.toString() || '',
          notes: item.notes || '', status: item.status || 'in_collection'
        })
      }
      setLoading(false)
    }
    fetchItem()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!id) return; setSaving(true)
    try {
      await updateItem(id, {
        name: formData.name, category_id: formData.category_id, brand: formData.brand, series: formData.series,
        year: formData.year ? parseInt(formData.year) : null, condition: formData.condition,
        purchase_price: formData.purchase_price ? parseFloat(formData.purchase_price) : null,
        current_estimated_value: formData.current_estimated_value ? parseFloat(formData.current_estimated_value) : null,
        notes: formData.notes, status: formData.status
      } as CollectibleUpdate)
      navigate(`/collection/${id}`)
    } catch { alert('Fehler beim Aktualisieren.') } finally { setSaving(false) }
  }

  const inputClass = "w-full px-4 py-3 rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5c939f]"
  const inputStyle: React.CSSProperties = { background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)' }

  if (loading) {
    return <Layout><div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin" style={{ color: 'var(--accent)' }} /></div></Layout>
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center mono-label" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>
            <ArrowLeft size={16} className="mr-2" /> Abbrechen
          </button>
          <h1 className="heading" style={{ fontSize: '1.375rem' }}>Item bearbeiten</h1>
          <div className="w-20" />
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-[20px] space-y-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <div>
            <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Name</label>
            <input required className={`${inputClass} !text-base !font-medium !py-4`} style={inputStyle}
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Kategorie</label>
              <select required className={inputClass} style={inputStyle} value={formData.category_id}
                onChange={e => setFormData({...formData, category_id: e.target.value})}>
                <option value="">Wähle eine Kategorie</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Zustand</label>
              <select className={inputClass} style={inputStyle} value={formData.condition}
                onChange={e => setFormData({...formData, condition: e.target.value})}>
                {['Mint','Near Mint','Excellent','Good','Fair','Poor'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Marke</label>
              <input className={inputClass} style={inputStyle} value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} />
            </div>
            <div>
              <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Serie</label>
              <input className={inputClass} style={inputStyle} value={formData.series} onChange={e => setFormData({...formData, series: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Jahr</label>
              <input type="number" className={inputClass} style={inputStyle} value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
            </div>
            <div>
              <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Kaufpreis (€)</label>
              <input type="number" step="0.01" className={inputClass} style={inputStyle} value={formData.purchase_price}
                onChange={e => setFormData({...formData, purchase_price: e.target.value})} />
            </div>
            <div>
              <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Aktueller Wert (€)</label>
              <input type="number" step="0.01" className={inputClass} style={inputStyle} value={formData.current_estimated_value}
                onChange={e => setFormData({...formData, current_estimated_value: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Notizen</label>
            <textarea rows={4} className={inputClass} style={inputStyle} value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})} />
          </div>
          <div className="pt-4 flex justify-end" style={{ borderTop: '1px solid var(--border)' }}>
            <button type="submit" disabled={saving}
              className="inline-flex items-center px-8 py-4 rounded-[8px] mono-label disabled:opacity-50 hover-lift"
              style={{ background: 'var(--accent-warm)', color: 'var(--bg-base)' }}>
              {saving ? <Loader2 size={18} className="animate-spin mr-3" /> : <Save size={18} className="mr-3" />}
              Speichern
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
