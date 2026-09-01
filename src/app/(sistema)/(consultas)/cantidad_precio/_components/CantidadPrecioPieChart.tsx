"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface CantidadPrecioPieChartProps {
  data: { name: string; value: number; color: string }[];
  totalLabel: string;
  totalCount: number;
}

export function CantidadPrecioPieChart({
  data,
  totalLabel,
  totalCount,
}: CantidadPrecioPieChartProps) {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Prevención de superposición: Ocultar textos para sectores menores al 5% (0.05)
    if (percent < 0.05) return null;

    return (
      <text
        x={x}
        y={y}
        fill="#1e293b"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-[13px] font-bold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="flex flex-col items-center justify-between p-1 bg-white w-full h-[360px]">
      {/* Área del gráfico agrandada exclusivamente para este módulo */}
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={135}
              fill="#8884d8"
              dataKey="value"
              animationDuration={500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} elementos`, name]}
              contentStyle={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Leyenda personalizada y Cantidad Total */}
      <div className="flex flex-col items-center gap-1.5 shrink-0 pt-1">
        <div className="flex gap-4 text-[12px] font-semibold text-gray-700">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 shrink-0 rounded-none"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        <div className="text-[#0070f3] font-bold text-[14px]">
          {totalLabel}: {totalCount}
        </div>
      </div>
    </div>
  );
}
