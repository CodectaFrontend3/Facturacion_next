"use client";

import { useState } from "react";

interface ToggleSwitchProps {
  id?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function ToggleSwitch({
  id,
  defaultChecked = true,
  checked: controlledChecked,
  onChange,
  className = "",
}: ToggleSwitchProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked =
    controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleToggle = () => {
    const next = !isChecked;
    setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
      className={`relative inline-flex h-6 w-12 cursor-pointer items-center justify-between rounded-[3px] px-1.5 transition-colors ${
        isChecked
          ? "bg-[#1ab394] border border-[#18a689]"
          : "bg-gray-300 border border-gray-400"
      } ${className}`}
    >
      <span
        className={`text-[9px] font-bold text-white transition-opacity ${
          isChecked ? "opacity-100" : "opacity-0"
        }`}
      >
        ON
      </span>

      <span
        className={`size-4 rounded-[2px] bg-white shadow-sm transition-transform ${
          isChecked ? "translate-x-0" : "-translate-x-6"
        }`}
      />

      <span
        className={`absolute right-1 text-[9px] font-bold text-white transition-opacity ${
          !isChecked ? "opacity-100" : "opacity-0"
        }`}
      >
        OFF
      </span>
    </button>
  );
}
