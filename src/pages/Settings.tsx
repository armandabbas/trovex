import React, { useState } from 'react'
import { Layout } from '../components/layout/Layout'
import { useAuth } from '../context/AuthContext'
import { User, Shield, CreditCard, Bell, Globe, Save, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

export const Settings: React.FC = () => {
  const { user, profile, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    username: profile?.username || '', display_name: profile?.display_name || '', preferred_currency: profile?.preferred_currency || 'EUR'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!user) return; setLoading(true); setSuccess(false)
    try {
      const updates = { username: formData.username, display_name: formData.display_name, preferred_currency: formData.preferred_currency }
      // @ts-ignore
      const { error } = await supabase.from('profiles').update(updates as any).eq('id', user.id)
      if (error) throw error
      await updateProfile(updates); setSuccess(true); setTimeout(() => setSuccess(false), 3000)
    } catch { alert('Fehler beim Aktualisieren.') } finally { setLoading(false) }
  }

  const inputClass = "w-full px-4 py-3 rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5c939f]"
  const inputStyle: React.CSSProperties = { background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)' }

  const sidebarItems = [
    { icon: User, label: 'Profil', active: true },
    { icon: Shield, label: 'Sicherheit', active: false },
    { icon: Bell, label: 'Benachrichtigungen', active: false },
    { icon: CreditCard, label: 'Abonnement', active: false },
    { icon: Globe, label: 'Anzeige', active: false },
  ]

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="heading" style={{ fontSize: '1.375rem' }}>Einstellungen</h1>
          <p className="mt-1" style={{ color: 'var(--text-muted)' }}>Verwalte dein Konto und Präferenzen</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside className="space-y-1">
            {sidebarItems.map((item, i) => (
              <button key={i} className="w-full flex items-center gap-3 px-4 py-3 rounded-[8px] mono-label transition-all"
                style={item.active
                  ? { background: 'var(--bg-elevated)', color: 'var(--text-primary)', borderLeft: '2px solid var(--accent)', fontSize: '0.688rem' }
                  : { color: 'var(--text-muted)', fontSize: '0.688rem' }}>
                <item.icon size={16} /> <span>{item.label}</span>
              </button>
            ))}
          </aside>

          <main className="lg:col-span-2 space-y-6">
            <section className="p-6 sm:p-8 rounded-[20px]" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              <h2 className="heading mb-6" style={{ fontSize: '1.125rem' }}>Profil Informationen</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Benutzername</label>
                    <input className={inputClass} style={inputStyle} value={formData.username}
                      onChange={e => setFormData({...formData, username: e.target.value})} />
                  </div>
                  <div>
                    <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Anzeigename</label>
                    <input className={inputClass} style={inputStyle} value={formData.display_name}
                      onChange={e => setFormData({...formData, display_name: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>E-Mail</label>
                  <input disabled className={inputClass} style={{ ...inputStyle, opacity: 0.4, cursor: 'not-allowed' }} value={user?.email || ''} />
                  <p className="mono-label mt-2" style={{ color: 'var(--text-muted)', fontSize: '0.563rem', textTransform: 'none' }}>Kann derzeit nicht geändert werden.</p>
                </div>
                <div>
                  <label className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Währung</label>
                  <select className={inputClass} style={inputStyle} value={formData.preferred_currency}
                    onChange={e => setFormData({...formData, preferred_currency: e.target.value})}>
                    <option value="EUR">Euro (€)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="GBP">British Pound (£)</option>
                    <option value="CHF">Swiss Franc (CHF)</option>
                  </select>
                </div>
                <div className="pt-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--border)' }}>
                  {success && <span className="mono-label" style={{ color: 'var(--success)', fontSize: '0.688rem' }}>Gespeichert!</span>}
                  <button type="submit" disabled={loading}
                    className="ml-auto inline-flex items-center px-6 py-3 rounded-[8px] mono-label disabled:opacity-50 hover-lift"
                    style={{ background: 'var(--accent-warm)', color: 'var(--bg-base)', fontSize: '0.688rem' }}>
                    {loading ? <Loader2 size={14} className="mr-2 animate-spin" /> : <Save size={14} className="mr-2" />}
                    Speichern
                  </button>
                </div>
              </form>
            </section>

            <section className="p-6 sm:p-8 rounded-[20px]" style={{ background: 'var(--danger-muted)', border: '1px solid rgba(203,53,0,0.2)' }}>
              <h2 className="heading mb-2" style={{ fontSize: '1.125rem', color: 'var(--accent-warm)' }}>Gefahrenzone</h2>
              <p className="text-sm mb-6" style={{ color: 'rgba(237,109,64,0.7)' }}>Dauerhaft und nicht rückgängig machbar.</p>
              <button className="px-6 py-3 rounded-[8px] mono-label" style={{ background: 'var(--danger)', color: 'white', fontSize: '0.688rem' }}>
                Konto löschen
              </button>
            </section>
          </main>
        </div>
      </div>
    </Layout>
  )
}
