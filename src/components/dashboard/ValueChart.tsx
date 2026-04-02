import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../../lib/utils'

interface Props {
  data: { date: string; value: number }[]
}

export function ValueChart({ data }: Props) {
  if (data.length === 0) {
    return <p className="mono-label text-[10px] text-center py-12" style={{ color: 'var(--text-muted)' }}>STREAM_OFFLINE_NO_DATA</p>
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 9, fill: '#404040', fontFamily: 'Azeret Mono' }} 
          axisLine={{ stroke: '#1a1a1a' }}
          tickLine={false}
        />
        <YAxis 
          hide
          domain={['dataMin - 1000', 'dataMax + 1000']}
        />
        <Tooltip
          cursor={{ stroke: '#FF4F00', strokeWidth: 1 }}
          formatter={(value: any) => [formatCurrency(value), 'VALUE']}
          contentStyle={{ 
            background: '#000000', 
            border: '1px solid var(--accent)', 
            borderRadius: '0px',
            fontFamily: 'Azeret Mono', 
            fontSize: '10px',
            color: '#ffffff'
          }}
          itemStyle={{ color: '#FF4F00' }}
          labelStyle={{ color: '#404040', marginBottom: '4px' }}
        />
        <Line 
          type="stepAfter" 
          dataKey="value" 
          stroke="#FF4F00" 
          strokeWidth={1.5} 
          dot={false} 
          activeDot={{ r: 3, fill: '#FF4F00', stroke: '#000000', strokeWidth: 2 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
