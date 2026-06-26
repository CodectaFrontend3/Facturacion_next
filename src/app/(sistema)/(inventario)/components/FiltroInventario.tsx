"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

export default function FiltroInventario() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleConsultar = () => {
    console.log("Consultando datos...");
  };

  const handleDescargarPDF = () => {
    console.log("Descargando PDF...");
  };

  return (
    <Card className="w-full rounded-none border border-slate-200 shadow-none bg-white">
      {/* Línea divisoria plomo claro */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2.5 px-4 border-b border-slate-200">
        <CardTitle className="text-[14px] font-bold text-slate-700 tracking-wide">
          Nueva Entradas
        </CardTitle>
        <div className="flex items-center space-x-1 text-slate-400">
          {/* Botón de descarga PDF*/}
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              {" "}
              {/* Controla qué tan rápido aparece (en ms) */}
              <TooltipTrigger asChild>
                {/* Tu botón con el diseño que ya definimos */}
                <button
                  type="button"
                  onClick={handleDescargarPDF}
                  className="h-8 w-8 bg-[#1e5bb4] hover:bg-[#16468c] text-white rounded-md shadow-sm flex items-center justify-center transition-colors shrink-0 p-0 border-none cursor-pointer"
                >
                  <FileText className="h-4 w-4 stroke-[2.5]" />
                </button>
              </TooltipTrigger>
              {/* El texto flotante que quieres mostrar */}
              <TooltipContent
                side="bottom" // Aparecerá abajo del botón, puedes cambiarlo a "top", "left" o "right"
                className="bg-slate-800 text-white text-[12px] px-2 py-1 rounded-sm border-none shadow-md"
              >
                <p>Descargar PDF</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      {/* Agregamos pb-6 para garantizar espacio abajo para el botón */}
      <CardContent className="p-5 pb-6 space-y-5">
        {/* Grid de 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {/* --- COLUMNA IZQUIERDA --- */}
          <div className="space-y-4">
            {/* Fecha Inicio */}
            <div className="flex items-center gap-x-4">
              <label className="text-[13px] text-slate-700 w-24 shrink-0">
                Fecha Inicio:
              </label>
              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-between text-left font-normal h-9 rounded-none border-slate-200 px-3 text-[13px] bg-[#f8fafc]",
                        !startDate && "text-slate-400",
                      )}
                    >
                      {startDate ? (
                        format(startDate, "dd/MM/yyyy HH:mm")
                      ) : (
                        <span>dd/mm/aaaa --:--</span>
                      )}
                      <CalendarIcon className="h-4 w-4 text-slate-700" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 rounded-none"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Almacén */}
            <div className="flex items-center gap-x-4">
              <label className="text-[13px] text-slate-700 w-24 shrink-0">
                Almacén:
              </label>
              <div className="flex-1">
                <Select defaultValue="todos">
                  <SelectTrigger className="w-full h-9 rounded-none border-slate-200 px-3 text-[13px] text-slate-700 bg-[#f8fafc]">
                    <SelectValue placeholder="Seleccione Almacén" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="todos" className="text-[13px]">
                      Todos los almacenes
                    </SelectItem>
                    <SelectItem value="almacen-1" className="text-[13px]">
                      Almacén Central
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* --- COLUMNA DERECHA --- */}
          <div className="space-y-4">
            {/* Fecha Final */}
            <div className="flex items-center gap-x-4">
              <label className="text-[13px] text-slate-700 w-24 shrink-0">
                Fecha Final:
              </label>
              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-between text-left font-normal h-9 rounded-none border-slate-200 px-3 text-[13px] bg-[#f8fafc]",
                        !endDate && "text-slate-400",
                      )}
                    >
                      {endDate ? (
                        format(endDate, "dd/MM/yyyy HH:mm")
                      ) : (
                        <span>dd/mm/aaaa --:--</span>
                      )}
                      <CalendarIcon className="h-4 w-4 text-slate-700" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 rounded-none"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Categoría */}
            <div className="flex items-center gap-x-4">
              <label className="text-[13px] text-slate-700 w-24 shrink-0">
                Categoría:
              </label>
              <div className="flex-1">
                <Select defaultValue="seleccion">
                  <SelectTrigger className="w-full h-9 rounded-none border-slate-200 px-3 text-[13px] text-slate-700 bg-[#f8fafc]">
                    <SelectValue placeholder="Seleccione Categoría" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="seleccion" className="text-[13px]">
                      Seleccione Categoría
                    </SelectItem>
                    <SelectItem value="cat-1" className="text-[13px]">
                      Electrónicos
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* BOTÓN CONSULTAR */}
        <div className="pt-2 flex justify-start">
          <Button
            onClick={handleConsultar}
            className="bg-[#1e5bb4] hover:bg-[#16468c] text-white px-5 h-9 text-[13px] font-normal rounded-sm transition-colors cursor-pointer"
          >
            Consultar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
