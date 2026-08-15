"use client";

import { comprobanteItems } from "../../data/apariencia-options";
import { ToggleSwitch } from "./ToggleSwitch";

export function ComprobanteSection() {
  return (
    <div className="relative h-full rounded-[4px] border border-gray-200 bg-white p-6 pt-7 sm:p-8">
      {/* Top left "Comprobante" tag/badge */}
      <span className="absolute -top-3.5 left-6 rounded-[2px] border border-gray-200 bg-white px-3 py-0.5 text-[12px] font-bold text-[#676a6c] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        Comprobante
      </span>

      <div className="flex flex-col gap-4">
        {comprobanteItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <ToggleSwitch id={item.id} defaultChecked={item.enabled} />
            <label
              htmlFor={item.id}
              className="cursor-pointer text-[13px] font-normal text-[#676a6c]"
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
