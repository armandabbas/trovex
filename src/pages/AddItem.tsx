import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Loader2, ArrowLeft, Save, X } from 'lucide-react'
import { Layout } from '../components/layout/Layout'
import { useCategories } from '../hooks/useCategories'
import { useCollection } from '../hooks/useCollection'
import type { CollectibleInsert } from '../types/database'

export const AddItem: React.FC = () => {
  const navigate = useNavigate()
  const { categories } = useCategories()
  const { addItem } = useCollection()
  const [saving, setSaving] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: '', category_id: '', brand: '', series: '', year: '',
    condition: 'Near Mint', purchase_price: '', current_estimated_value: '', notes: '', status: 'in_collection'
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setImages([...images, ...newFiles])
      setPreviews([...previews, ...newFiles.map(f => URL.createObjectURL(f))])
    }
  }
  const removeImage = (i: number) => { setImages(images.filter((_, idx) => idx !== i)); setPreviews(previews.filter((_, idx) => idx !== i)) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    try {
      const itemData: any = {
        name: formData.name, category_id: formData.category_id, brand: formData.brand, series: formData.series,
        year: formData.year ? parseInt(formData.year) : null, condition: formData.condition,
        purchase_price: formData.purchase_price ? parseFloat(formData.purchase_price) : null,
        current_estimated_value: formData.current_estimated_value ? parseFloat(formData.current_estimated_value) : null,
        notes: formData.notes, status: formData.status, description: '', user_id: '', is_favorite: false, quantity: 1
      }
      const newId = await addItem(itemData as CollectibleInsert, images)
      navigate(`/collection/${newId}`)
    } catch { alert('Fehler beim Hinzufügen.') } finally { setSaving(false) }
  }

  const inputClass = "w-full px-4 py-3 rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5c939f]"
  const inputStyle: React.CSSProperties = { background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)' }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 rounded-[8px] transition-colors" style={{ color: 'var(--text-muted)' }}>
            <ArrowLeft size={22} />
          </button>
          <h1 className="heading" style={{ fontSize: '1.375rem' }}>Neues Item</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="p-6 sm:p-8 rounded-[20px] space-y-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <h2 className="mono-label" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Fotos hinzufügen</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {previews.map((preview, i) => (
                <div key={i} className="aspect-square relative rounded-[12px] overflow-hidden group" style={{ border: '1px solid var(--border)' }}>
                  <img src={preview} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={12} />
                  </button>
                </div>
              ))}
              <label className="aspect-square flex flex-col items-center justify-center rounded-[12px] cursor-pointer transition-all"
                style={{ border: '2px dashed var(--border-hover)', color: 'var(--text-muted)' }}>
                <Camera size={22} className="mb-2" />
                <span className="mono-label text-center px-2" style={{ fontSize: '0.563rem' }}>Hochladen</span>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </section>

          <section className="p-6 sm:p-8 rounded-[20px] space-y-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <div>
              <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Bezeichnung</label>
              <input required placeholder="z.B. Pokémon Glurak 1st Edition"
                className={`${inputClass} !text-base !font-medium !py-4`} style={inputStyle}
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
                <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Serie / Set</label>
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
                <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Wertschätzung (€)</label>
                <input type="number" step="0.01" className={inputClass} style={inputStyle} value={formData.current_estimated_value}
                  onChange={e => setFormData({...formData, current_estimated_value: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Notizen</label>
              <textarea rows={4} className={inputClass} style={inputStyle} value={formData.notes}
                onChange={e => setFormData({...formData, notes: e.target.value})} />
            </div>
          </section>

          <footer className="pt-4 flex justify-end">
            <button type="submit" disabled={saving}
              className="inline-flex items-center px-8 py-4 rounded-[8px] mono-label disabled:opacity-50 hover-lift"
              style={{ background: 'var(--accent-warm)', color: 'var(--bg-base)' }}>
              {saving ? <Loader2 size={18} className="mr-3 animate-spin" /> : <Save size={18} className="mr-3" />}
              Item speichern
            </button>
          </footer>
        </form>
      </div>
    </Layout>
  )
}
