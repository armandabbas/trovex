import { TrendingUp, TrendingDown, Package, Activity } from 'lucide-react'
import { formatCurrency } from '../../lib/utils'

interface Props {
  totalValue: number
  itemCount: number
  totalGainLoss: number
  prevValue: number
}

export function PortfolioSummary({ totalValue, itemCount, totalGainLoss, prevValue }: Props) {
  const changePercent = prevValue > 0 ? ((totalValue - prevValue) / prevValue) * 100 : 0
  const isPositive = totalGainLoss >= 0

  const cards = [
    {
      label: 'TOTAL_ASSET_VALUATION',
      icon: Activity,
      value: formatCurrency(totalValue),
      sub: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(1)}%_DELTA_7D`,
      subColor: changePercent >= 0 ? 'var(--success)' : 'var(--danger)',
      iconColor: 'var(--accent)',
    },
    {
      label: 'UNIT_COUNT_INDEX',
      icon: Package,
      value: String(itemCount),
      sub: 'ACTIVE_DEPOSITS',
      subColor: 'var(--text-muted)',
      iconColor: 'var(--accent)',
    },
    {
      label: 'NET_YIELD_REALIZED',
      icon: isPositive ? TrendingUp : TrendingDown,
      value: `${isPositive ? '+' : ''}${formatCurrency(totalGainLoss)}`,
      sub: 'CURRENT_VS_BASIS',
      subColor: 'var(--text-muted)',
      iconColor: isPositive ? 'var(--success)' : 'var(--accent)',
      valueColor: isPositive ? 'var(--success)' : 'var(--accent)',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {cards.map((card, idx) => (
        <div key={card.label} 
          className={`p-10 border-[var(--border)] transition-all hover:bg-[var(--bg-hover)] ${idx < 2 ? 'md:border-r' : ''} ${idx === 0 ? 'border-t md:border-t-0' : 'border-t md:border-t-0'}`}
          style={{ background: 'var(--bg-base)' }}>
          <div className="flex items-center justify-between mb-8">
            <p className="mono-label text-[9px] tracking-[0.2em] text-[var(--text-muted)]">{card.label}</p>
            <card.icon size={14} style={{ color: card.iconColor }} />
          </div>
          <p className="heading text-4xl mb-4" style={{ color: card.valueColor || 'var(--text-primary)' }}>
            {card.value}
          </p>
          <div className="flex items-center gap-2">
            <div className={`h-1 w-1 rounded-full ${card.sub.includes('+') ? 'bg-[var(--success)]' : 'bg-[var(--accent)]'}`} />
            <p className="mono-label text-[9px] tracking-widest" style={{ color: card.subColor }}>{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
