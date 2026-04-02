import React from 'react'
import { Package, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Collectible } from '../../types'

interface ItemCardProps {
  item: Collectible & { primary_image?: string }
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <Link
      to={`/collection/${item.id}`}
      className="rounded-[20px] overflow-hidden no-underline hover-lift group"
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
    >
      <div className="aspect-[4/5] relative overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
        {item.primary_image ? (
          <img src={item.primary_image} alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ color: 'var(--text-muted)' }}>
            <Package size={48} />
          </div>
        )}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-[4px] glass">
          <span className="mono-label" style={{ fontSize: '0.563rem', color: 'var(--text-secondary)' }}>{item.condition || 'MINT'}</span>
        </div>
      </div>
      <div className="p-4 space-y-1.5">
        <p className="mono-label" style={{ fontSize: '0.563rem', color: 'var(--accent)' }}>{item.brand || 'Sammlerstück'}</p>
        <h3 className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{item.name}</h3>
        <div className="flex items-center justify-between pt-2">
          <p className="heading" style={{ fontSize: '1rem' }}>{item.current_estimated_value?.toLocaleString('de-DE')} €</p>
          <div className="flex items-center" style={{ color: 'var(--text-muted)' }}>
            <Calendar size={11} className="mr-1" />
            <span className="mono-label" style={{ fontSize: '0.563rem', textTransform: 'none' }}>{item.year || '-'}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

interface CollectionGridProps {
  items: (Collectible & { primary_image?: string })[]
  loading?: boolean
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({ items, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-[20px] aspect-[4/6] animate-pulse" style={{ background: 'var(--bg-elevated)' }} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {items.map((item) => (<ItemCard key={item.id} item={item} />))}
    </div>
  )
}
