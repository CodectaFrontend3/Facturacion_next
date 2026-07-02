"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react"; 

export interface SearchSelectOption {
  label: string;
  value: string;
  subLabel?: string; // Opcional, para mostrar información adicional
}

interface FilterSearchSelectProps {
  name: string;
  label?: string;
  value: string;
  onChange: (name: string, value: string) => void;
  options: SearchSelectOption[];
  placeholder?: string;
}

export function FilterSearchSelect({
  name,
  label,
  value,
  onChange,
  options,
  placeholder = "Seleccionar...",
}: FilterSearchSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Encontrar la opción seleccionada actualmente para mostrar su label en el input principal
  const selectedOption = options.find((opt) => opt.value === value);

  // Cerrar el dropdown si el usuario hace clic afuera del componente
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtrar las opciones locales según lo que el usuario escribe
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (opt.subLabel && opt.subLabel.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex items-center gap-2 relative w-full" ref={containerRef}>
      {label && (
        <label className="text-sm text-[#676A6C] whitespace-nowrap font-sans">
          {label}
        </label>
      )}

      <div className="relative w-full">
        {/* Botón/Input Principal del Select */}
        <div
          onClick={() => {
            setIsOpen(!isOpen);
            setSearchTerm(""); // Resetea el buscador local al abrir
          }}
          className="h-9 w-full border border-gray-300 px-3 flex items-center justify-between bg-white text-sm text-[#676A6C] font-sans cursor-pointer select-none focus-within:border-[#18a689]"
        >
          <span className={selectedOption ? "text-slate-800" : "text-gray-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>

        {/* Dropdown Desplegable */}
        {isOpen && (
          <div className="absolute left-0 mt-1 w-full bg-white border border-gray-300 shadow-lg z-50 rounded-none max-h-60 overflow-hidden flex flex-col">
            {/* Input buscador interno */}
            <div className="p-1.5 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
                className="w-full h-7 px-2 text-xs border border-gray-300 focus:outline-hidden focus:border-[#18a689] font-sans"
                autoFocus
              />
            </div>

            {/* Lista de Opciones */}
            <div className="overflow-y-auto flex-1 max-h-48 custom-scrollbar">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => {
                  const isSelected = opt.value === value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        onChange(name, opt.value);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-sans transition-colors flex items-center justify-between
                        ${
                          isSelected
                            ? "bg-[#2f80ed] text-white font-medium"
                            : "text-[#676A6C] hover:bg-gray-100"
                        }
                      `}
                    >
                      <span>
                        {opt.label}
                        {opt.subLabel && (
                          <span className={`ml-1 text-[11px] ${isSelected ? "text-blue-100" : "text-gray-400"}`}>
                            | {opt.subLabel}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="p-3 text-xs text-gray-400 font-sans text-center">
                  No se encontraron resultados
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}