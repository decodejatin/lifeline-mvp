'use client'
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'

interface PriceHistoryChartProps {
  data: { recordedAt: string; price: number }[]
}

export default function PriceHistoryChart({ data }: PriceHistoryChartProps) {
  return (
    <div className="w-full h-[300px] mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
          <XAxis
            dataKey="recordedAt"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
            tickFormatter={(str) => new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis
            hide
            domain={['dataMin - 1000', 'dataMax + 1000']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#020617',
              border: '1px solid #ffffff10',
              borderRadius: '12px',
              color: '#fff'
            }}
            itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
            formatter={(value) => [`₹${(value as number).toLocaleString()}`, 'Price']}
            labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#10b981"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#priceGradient)"
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
