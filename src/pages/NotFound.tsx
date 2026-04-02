import React from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: 'var(--bg-base)' }}>
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-[20px] mb-4"
          style={{ background: 'var(--accent-glow)', color: 'var(--accent)' }}>
          <Search size={48} />
        </div>
        <h1 className="heading" style={{ fontSize: '2.5rem' }}>404</h1>
        <p style={{ color: 'var(--text-muted)' }}>Die gesuchte Seite existiert nicht.</p>
        <Link to="/dashboard"
          className="inline-block px-8 py-3 rounded-[8px] mono-label no-underline hover-lift"
          style={{ background: 'var(--text-primary)', color: 'var(--bg-base)', fontSize: '0.688rem' }}>
          Zum Dashboard
        </Link>
      </div>
    </div>
  )
}
