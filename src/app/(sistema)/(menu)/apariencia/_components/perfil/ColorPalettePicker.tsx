"use client";

import { useState } from "react";
import { colorSwatches } from "../../data/apariencia-options";

interface ColorPalettePickerProps {
  initialColor?: string;
  onChange?: (color: string) => void;
}

export function ColorPalettePicker({
  initialColor = "#1ab394",
  onChange,
}: ColorPalettePickerProps) {
  const [selectedColor, setSelectedColor] = useState(initialColor);

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
    onChange?.(color);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* "Color de Nombre:" row with native Color Picker input */}
      <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-12">
        <label
          htmlFor="color-picker-input"
          className="text-[13px] font-normal text-[#676a6c] sm:col-span-4"
        >
          Color de Nombre:
        </label>
        <div className="relative sm:col-span-8">
          <div className="flex h-9 w-full items-center justify-between rounded-[4px] border border-gray-300 bg-white px-3 text-[13px] text-[#676a6c] shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all hover:bg-gray-50 focus-within:border-[#1ab394]">
            <span className="flex items-center gap-2">
              <span
                className="size-4 shrink-0 rounded-[2px] border border-gray-300 shadow-2xs"
                style={{ backgroundColor: selectedColor }}
              />
              <span className="font-mono text-[12px]">{selectedColor}</span>
            </span>
            <span className="text-[12px] text-gray-500">Paleta de colores</span>
          </div>

          {/* Native HTML5 Color Picker Input covering the button */}
          <input
            id="color-picker-input"
            type="color"
            value={selectedColor}
            onChange={(e) => handleSelectColor(e.target.value)}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
            title="Seleccionar color"
          />
        </div>
      </div>

      {/* "Color:" row with 4 large circle swatches */}
      <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-12">
        <label className="text-[13px] font-normal text-[#676a6c] sm:col-span-4">
          Color:
        </label>

        <div className="flex items-center gap-3 sm:col-span-8">
          {colorSwatches.map((swatch) => {
            const isSelected = selectedColor === swatch.color;

            return (
              <button
                key={swatch.id}
                type="button"
                aria-label={swatch.label}
                title={swatch.label}
                onClick={() => handleSelectColor(swatch.color)}
                className={`size-11 cursor-pointer rounded-full transition-all sm:size-12 hover:scale-105 focus:outline-none ${
                  isSelected
                    ? "ring-2 ring-[#2C1FF3] ring-offset-2 scale-105 shadow-md"
                    : "opacity-95 hover:opacity-100 shadow-sm"
                }`}
                style={{ backgroundColor: swatch.color }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
