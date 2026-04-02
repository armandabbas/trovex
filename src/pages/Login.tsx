import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const { signIn, resetPassword } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Anmeldung fehlgeschlagen.')
    } finally {
      setLoading(false)
    }
  }

  async function handleResetPassword() {
    if (!email) { setError('Bitte gib deine E-Mail-Adresse ein.'); return }
    try { await resetPassword(email); setResetSent(true) }
    catch (err) { setError(err instanceof Error ? err.message : 'Passwort-Reset fehlgeschlagen.') }
  }

  const inputStyle: React.CSSProperties = { background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)' }

  return (
    <div className="min-h-screen flex items-center justify-center px-5" style={{ background: 'var(--bg-base)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link to="/" className="heading no-underline" style={{ fontSize: '1.25rem', letterSpacing: '0.06em' }}>TROVEX</Link>
          <p className="mono-label mt-3" style={{ color: 'var(--text-muted)' }}>Bei deinem Konto anmelden</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[20px] p-8 space-y-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          {error && (
            <div className="p-3 rounded-[8px] text-sm" style={{ background: 'var(--danger-muted)', color: '#ed6d40', border: '1px solid rgba(203,53,0,0.2)' }}>
              {error}
            </div>
          )}
          {resetSent && (
            <div className="p-3 rounded-[8px] text-sm" style={{ background: 'var(--success-muted)', color: 'var(--success)' }}>
              Reset-Link an {email} gesendet.
            </div>
          )}

          <div>
            <label htmlFor="email" className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>E-Mail</label>
            <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5c939f]"
              style={inputStyle} placeholder="name@beispiel.de" />
          </div>

          <div>
            <label htmlFor="password" className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Passwort</label>
            <input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5c939f]"
              style={inputStyle} placeholder="••••••••" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3.5 rounded-[8px] mono-label disabled:opacity-50 hover-lift"
            style={{ background: 'var(--text-primary)', color: 'var(--bg-base)' }}>
            {loading ? 'Wird angemeldet...' : 'Anmelden'}
          </button>

          <button type="button" onClick={handleResetPassword}
            className="w-full mono-label" style={{ color: 'var(--accent)', fontSize: '0.688rem' }}>
            Passwort vergessen?
          </button>
        </form>

        <p className="text-center mono-label mt-8" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>
          Noch kein Konto?{' '}
          <Link to="/register" className="no-underline" style={{ color: 'var(--accent)' }}>Jetzt registrieren</Link>
        </p>
      </div>
    </div>
  )
}
