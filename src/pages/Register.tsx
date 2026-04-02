import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password.length < 6) { setError('Passwort muss mindestens 6 Zeichen lang sein.'); return }
    if (username.length < 3) { setError('Benutzername muss mindestens 3 Zeichen lang sein.'); return }
    setLoading(true)
    try { await signUp(email, password, username); navigate('/dashboard') }
    catch (err) { setError(err instanceof Error ? err.message : 'Registrierung fehlgeschlagen.') }
    finally { setLoading(false) }
  }

  const inputStyle: React.CSSProperties = { background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)' }

  return (
    <div className="min-h-screen flex items-center justify-center px-5" style={{ background: 'var(--bg-base)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link to="/" className="heading no-underline" style={{ fontSize: '1.25rem', letterSpacing: '0.06em' }}>TROVEX</Link>
          <p className="mono-label mt-3" style={{ color: 'var(--text-muted)' }}>Erstelle dein kostenloses Konto</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[20px] p-8 space-y-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          {error && (
            <div className="p-3 rounded-[8px] text-sm" style={{ background: 'var(--danger-muted)', color: '#ed6d40' }}>{error}</div>
          )}

          <div>
            <label htmlFor="username" className="mono-label block mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>Benutzername</label>
            <input id="username" type="text" required value={username} onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5c939f]"
              style={inputStyle} placeholder="sammler123" />
          </div>

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
              style={inputStyle} placeholder="Mindestens 6 Zeichen" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3.5 rounded-[8px] mono-label disabled:opacity-50 hover-lift"
            style={{ background: 'var(--text-primary)', color: 'var(--bg-base)' }}>
            {loading ? 'Wird erstellt...' : 'Konto erstellen'}
          </button>
        </form>

        <p className="text-center mono-label mt-8" style={{ color: 'var(--text-muted)', fontSize: '0.688rem' }}>
          Bereits ein Konto?{' '}
          <Link to="/login" className="no-underline" style={{ color: 'var(--accent)' }}>Anmelden</Link>
        </p>
      </div>
    </div>
  )
}
