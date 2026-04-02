import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../../lib/utils'

const COLORS = ['#FF4F00', '#FFFFFF', '#606060', '#303030', '#151515', '#A0A0A0']

interface Props {
  data: { name: string; value: number }[]
}

export function CategoryDistribution({ data }: Props) {
  if (data.length === 0) {
    return <p className="mono-label text-[10px] text-center py-12" style={{ color: 'var(--text-muted)' }}>ALLOCATION_NODES_NULL</p>
  }

  return (
    <div className="flex items-center gap-10">
      <div className="w-1/2">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie 
              data={data} 
              dataKey="value" 
              nameKey="name" 
              cx="50%" 
              cy="50%" 
              outerRadius={85} 
              innerRadius={70} 
              paddingAngle={2}
              strokeWidth={0}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any) => formatCurrency(value)}
              contentStyle={{ 
                background: '#000000', 
                border: '1px solid var(--border)', 
                borderRadius: '0px', 
                color: '#ffffff', 
                fontFamily: 'Azeret Mono', 
                fontSize: '10px' 
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 space-y-4">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="mono-label text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">{item.name}</span>
            </div>
            <span className="mono-label text-[10px] text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
              {((item.value / data.reduce((s, d) => s + d.value, 0)) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
