"use client";

import {
  bordePerfilOptions,
  fondoPerfilOptions,
} from "../../data/apariencia-options";
import { FormSelect } from "../common/FormSelect";
import { RangeSlider } from "../common/RangeSlider";
import { ColorPalettePicker } from "./ColorPalettePicker";

export function PerfilSection() {
  return (
    <div className="relative rounded-[4px] border border-gray-200 bg-white p-6 pt-7 sm:p-8">
      {/* Top right "Perfil" tag/badge */}
      <span className="absolute -top-3.5 right-6 rounded-[2px] border border-gray-200 bg-white px-3 py-0.5 text-[12px] font-bold text-[#676a6c] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        Perfil
      </span>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left Column: Fondo, Borde, Tamaño */}
        <div className="flex flex-col gap-5">
          {/* Fondo de perfil */}
          <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-12">
            <label
              htmlFor="fondo-perfil"
              className="text-[13px] font-normal text-[#676a6c] sm:col-span-4"
            >
              Fondo de perfil:
            </label>
            <div className="sm:col-span-8">
              <FormSelect
                id="fondo-perfil"
                options={fondoPerfilOptions}
                value="noche_oscura.png"
              />
            </div>
          </div>

          {/* Borde de perfil */}
          <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-12">
            <label
              htmlFor="borde-perfil"
              className="text-[13px] font-normal text-[#676a6c] sm:col-span-4"
            >
              Borde de perfil:
            </label>
            <div className="sm:col-span-8">
              <FormSelect
                id="borde-perfil"
                options={bordePerfilOptions}
                value="0px"
              />
            </div>
          </div>

          {/* Tamaño de Nombre */}
          <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-12">
            <label
              htmlFor="tamano-nombre"
              className="text-[13px] font-normal text-[#676a6c] sm:col-span-4"
            >
              Tamaño de Nombre:
            </label>
            <div className="sm:col-span-8">
              <RangeSlider id="tamano-nombre" defaultValue={35} />
            </div>
          </div>
        </div>

        {/* Right Column: Color Palette & Swatches */}
        <div>
          <ColorPalettePicker />
        </div>
      </div>
    </div>
  );
}
