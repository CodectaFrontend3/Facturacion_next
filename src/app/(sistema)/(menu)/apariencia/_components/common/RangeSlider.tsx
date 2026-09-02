"use client";

import { useState } from "react";

interface RangeSliderProps {
  id?: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export function RangeSlider({
  id,
  min = 0,
  max = 100,
  defaultValue = 35,
  value: controlledValue,
  onChange,
  className = "",
}: RangeSliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setInternalValue(val);
    onChange?.(val);
  };

  return (
    <div className={`relative flex w-full items-center ${className}`}>
      {/* Slider Track background & filled bar */}
      <div className="relative h-3.5 w-full overflow-hidden rounded-[2px] bg-[#f1f3f5] border border-gray-200">
        <div
          className="absolute left-0 top-0 h-full bg-[#20b2aa] transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Actual Range input overlaid */}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="absolute inset-0 z-10 w-full cursor-pointer opacity-0"
      />

      {/* Visual Thumb matching screenshot */}
      <div
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 transition-all"
        style={{ left: `calc(${percentage}% - 10px)` }}
      >
        <div className="h-6 w-5 rounded-[3px] border border-gray-300 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.18)]" />
      </div>
    </div>
  );
}
