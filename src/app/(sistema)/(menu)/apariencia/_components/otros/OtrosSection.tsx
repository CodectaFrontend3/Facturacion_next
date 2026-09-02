"use client";

import {
  colorFondoOptions,
  fuenteOptions,
} from "../../data/apariencia-options";
import { FormSelect } from "../common/FormSelect";
import { RangeSlider } from "../common/RangeSlider";

export function OtrosSection() {
  return (
    <div className="relative h-full rounded-[4px] border border-gray-200 bg-white p-6 pt-7 sm:p-8">
      {/* Top left "Otros" tag/badge */}
      <span className="absolute -top-3.5 left-6 rounded-[2px] border border-gray-200 bg-white px-3 py-0.5 text-[12px] font-bold text-[#676a6c] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        Otros
      </span>

      <div className="flex flex-col gap-4">
        {/* Tamaño de Fuente */}
        <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-12">
          <label
            htmlFor="tamano-fuente"
            className="text-[13px] font-normal text-[#676a6c] sm:col-span-4"
          >
            Tamaño de Fuente:
          </label>
          <div className="sm:col-span-8">
            <RangeSlider id="tamano-fuente" defaultValue={45} />
          </div>
        </div>

        {/* Fuente */}
        <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-12">
          <label
            htmlFor="fuente-select"
            className="text-[13px] font-normal text-[#676a6c] sm:col-span-4"
          >
            Fuente:
          </label>
          <div className="sm:col-span-8">
            <FormSelect
              id="fuente-select"
              options={fuenteOptions}
              value="Times New Roman"
            />
          </div>
        </div>

        {/* Color de fondo */}
        <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-12">
          <label
            htmlFor="color-fondo-select"
            className="text-[13px] font-normal text-[#676a6c] sm:col-span-4"
          >
            Color de fondo:
          </label>
          <div className="sm:col-span-8">
            <FormSelect
              id="color-fondo-select"
              options={colorFondoOptions}
              value="Claro"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
