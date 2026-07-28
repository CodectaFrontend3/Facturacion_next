"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface BarDataItem {
  name: string
  count: number
}

interface MarcasBarChartProps {
  data: BarDataItem[]
  barLabel: string
}

export function MarcasBarChart({ data, barLabel }: MarcasBarChartProps) {
  // Asegurar que haya al menos 5 elementos en el gráfico para que se vea consistente, si no rellenar con count 0
  const chartData = [...data]
  while (chartData.length < 5) {
    chartData.push({ name: "-", count: 0 })
  }

  // Obtener el valor máximo para calcular ticks de la escala Y de forma dinámica si excede 5
  const maxVal = Math.max(...chartData.map((d) => d.count), 5)
  const yTicks = Array.from({ length: 6 }, (_, i) => Math.round((maxVal / 5) * i))

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white w-full h-[280px]">
      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
            barSize={45}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 10, fontWeight: "bold" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, maxVal]}
              ticks={yTicks}
              tickFormatter={(val) => val.toFixed(1)}
              tick={{ fill: "#64748b", fontSize: 10 }}
            />
            <Tooltip
              formatter={(value) => [`${value} elementos`, "Cantidad"]}
              contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }}
            />
            <Bar dataKey="count" fill="#35c2a5" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-[11px] font-bold text-gray-500 mt-2 uppercase tracking-wider">
        {barLabel}
      </div>
    </div>
  )
}
