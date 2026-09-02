"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface EstadoPieChartProps {
  data: { name: string; value: number; color: string }[]
  totalLabel: string
  totalCount: number
}

export function EstadoPieChart({ data, totalLabel, totalCount }: EstadoPieChartProps) {
  // Calcular porcentajes para mostrar en las etiquetas
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    if (percent === 0) return null

    return (
      <text
        x={x}
        y={y}
        fill="#1e293b"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-[12px] font-bold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white w-full h-[280px]">
      <div className="w-full h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={75}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} elementos`, name]}
              contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Leyenda personalizada */}
      <div className="flex gap-4 text-[12px] font-semibold text-gray-700 mt-2 shrink-0">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <span className="w-3 h-3 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* Cantidad Total */}
      <div className="text-[#0070f3] font-bold text-[14px] mt-2 shrink-0">
        {totalLabel}: {totalCount}
      </div>
    </div>
  )
}
