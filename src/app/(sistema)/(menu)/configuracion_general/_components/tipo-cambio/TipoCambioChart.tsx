"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { TipoCambioChartPoint } from "../../types/tipo-cambio";

interface TipoCambioChartProps {
  data: TipoCambioChartPoint[];
}

export function TipoCambioChart({ data }: TipoCambioChartProps) {
  return (
    <div className="flex h-[200px] w-full flex-col sm:h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 15, right: 20, left: -15, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="0"
            vertical={false}
            stroke="#e5e7eb"
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 11 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            domain={[3.24, 3.36]}
            ticks={[3.24, 3.28, 3.32, 3.35]}
            tickFormatter={(val: number) => val.toFixed(2)}
            tick={{ fill: "#9ca3af", fontSize: 11 }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const point = payload[0].payload as TipoCambioChartPoint;
                return (
                  <div className="rounded border border-gray-200 bg-white px-2.5 py-1.5 shadow-md">
                    <p className="text-[11px] font-medium text-gray-700">
                      {point.date}
                    </p>
                    <p className="text-[11px] font-semibold text-[#18a689]">
                      Valor: {point.valor.toFixed(2)}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="valor"
            stroke="#18a689"
            strokeWidth={3}
            dot={{ r: 4, fill: "#18a689", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#18a689", stroke: "#fff", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
