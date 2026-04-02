import React from 'react'

const TICKER_ITEMS = [
  { label: 'BTC/USD', value: '$94,231.50', change: '+1.2%' },
  { label: 'ROLEX SUBMARINER', value: '$14,200', change: '+0.8%' },
  { label: 'CHARIZARD 1ST ED', value: '$420,000', change: '-2.4%' },
  { label: 'ETH/USD', value: '$2,451.20', change: '+0.5%' },
  { label: 'JORDAN 1 RETRO', value: '$1,850', change: '+4.1%' },
  { label: 'PATEK NAUTILUS', value: '$124,000', change: '+1.5%' },
  { label: 'MTG BLACK LOTUS', value: '$510,000', change: '-0.3%' },
]

export const MarketTicker: React.FC = () => {
  return (
    <div className="w-full bg-black border-y border-[var(--border)] py-1.5 overflow-hidden whitespace-nowrap z-50">
      <div className="inline-block animate-ticker">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-2 mx-8">
            <span className="mono-label text-[10px] text-[var(--text-muted)]">{item.label}</span>
            <span className="mono-label text-[11px] text-[var(--text-primary)] font-semibold">{item.value}</span>
            <span className={`mono-label text-[10px] ${item.change.startsWith('+') ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
              {item.change}
            </span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: inline-block;
          animation: ticker 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
