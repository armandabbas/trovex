import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Search,
  Bookmark,
  Settings,
  LogOut,
  Plus,
  Menu,
  X,
  TrendingUp
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { MarketTicker } from '../common/MarketTicker'

interface SidebarItemProps {
  to: string
  icon: React.ReactNode
  label: string
  active?: boolean
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 no-underline transition-all ${
      active
        ? 'text-white'
        : 'text-zinc-500 hover:text-zinc-300'
    }`}
    style={active ? { background: 'var(--bg-elevated)', borderLeft: '2px solid var(--accent)' } : {}}
  >
    <div style={{ color: active ? 'var(--accent)' : 'inherit' }}>
      {icon}
    </div>
    <span className="mono-label" style={{ fontSize: '0.65rem', fontWeight: 600 }}>{label}</span>
  </Link>
)

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')

  const navItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'DASHBOARD' },
    { to: '/collection', icon: <Package size={18} />, label: 'PORTFOLIO' },
    { to: '/search', icon: <Search size={18} />, label: 'TERMINAL' },
    { to: '/watchlist', icon: <Bookmark size={18} />, label: 'WATCHLIST' },
    { to: '/settings', icon: <Settings size={18} />, label: 'SETTINGS' },
  ]

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* Ticker at the top */}
      <div className="fixed top-0 left-0 right-0 z-[60] hidden md:block">
        <MarketTicker />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 sticky top-0 z-40 bg-black border-b border-[var(--border)]">
        <Link to="/dashboard" className="heading no-underline flex items-center gap-2" style={{ fontSize: '0.85rem', letterSpacing: '0.1em' }}>
          <TrendingUp size={16} className="text-[var(--accent)]" />
          TROVEX
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 -mr-2" style={{ color: 'var(--text-muted)' }}>
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-60 transform transition-transform duration-500 md:relative md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `} style={{ 
        background: 'var(--bg-base)', 
        borderRight: '1px solid var(--border)', 
        transitionTimingFunction: 'var(--ease-wqf)',
        marginTop: 'var(--ticker-height, 35px)'
      }}>
        <div className="flex flex-col h-full py-8">
          <div className="hidden md:block px-6 mb-12">
            <Link to="/dashboard" className="heading no-underline flex items-center gap-2" style={{ fontSize: '1.1rem', letterSpacing: '0.1em' }}>
              <TrendingUp size={20} className="text-[var(--accent)]" />
              TROVEX
            </Link>
            <div className="mt-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
              <p className="mono-label" style={{ color: 'var(--text-muted)', fontSize: '0.55rem' }}>LIVE TERMINAL V3.0</p>
            </div>
          </div>

          <nav className="flex-1">
            {navItems.map((item) => (
              <SidebarItem key={item.to} {...item} active={isActive(item.to)} />
            ))}
          </nav>

          <div className="px-5 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 w-full text-zinc-600 hover:text-red-500 transition-all"
            >
              <LogOut size={16} />
              <span className="mono-label" style={{ fontSize: '0.65rem' }}>TERMINATE SESSION</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/80 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-28 md:pb-10 pt-10 md:pt-14">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 px-3 py-2 flex justify-around items-center z-40 pb-safe bg-black border-t border-[var(--border)]">
         {navItems.slice(0, 4).map((item) => (
           <Link key={item.to} to={item.to}
             className={`p-3 transition-all ${isActive(item.to) ? 'text-[var(--accent)]' : 'text-zinc-600'}`}>
             {React.cloneElement(item.icon as React.ReactElement<any>, { size: 20 })}
           </Link>
         ))}
         <Link to="/collection/add"
           className="p-3 -mt-10 border-4 border-black"
           style={{ background: 'var(--accent)', color: 'white' }}>
            <Plus size={24} />
         </Link>
      </div>
    </div>
  )
}
