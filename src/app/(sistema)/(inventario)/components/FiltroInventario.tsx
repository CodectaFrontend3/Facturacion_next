"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface FiltroInventarioProps {
  titulo?: string;
  // Props controlados provistos por el Hook
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  almacen: string;
  setAlmacen: (value: string) => void;
  categoria: string;
  setCategoria: (value: string) => void;
  onConsultar: () => void;
  onDescargarPDF?: () => void;
}

export default function FiltroInventario({
  titulo = "Nueva Entradas",
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  almacen,
  setAlmacen,
  categoria,
  setCategoria,
  onConsultar,
  onDescargarPDF,
}: FiltroInventarioProps) {
  return (
    <Card className="w-full rounded-none border border-slate-200 shadow-none bg-white font-sans">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2.5 px-4 border-b border-slate-200">
        <CardTitle className="text-[14px] font-bold text-slate-700 tracking-wide">
          {titulo}
        </CardTitle>
        <div className="flex items-center space-x-1 text-slate-400">
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={onDescargarPDF}
                  className="h-8 w-8 bg-[#1e5bb4] hover:bg-[#16468c] text-white rounded-md shadow-sm flex items-center justify-center transition-colors shrink-0 p-0 border-none cursor-pointer"
                >
                  <FileText className="h-4 w-4 stroke-[2.5]" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-slate-800 text-white text-[12px] px-2 py-1 rounded-sm border-none shadow-md"
              >
                <p>Descargar PDF</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className="p-5 pb-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {/* --- COLUMNA IZQUIERDA --- */}
          <div className="space-y-4">
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
                        format(startDate, "dd/MM/yyyy")
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

            <div className="flex items-center gap-x-4">
              <label className="text-[13px] text-slate-700 w-24 shrink-0">
                Almacén:
              </label>
              <div className="flex-1">
                <Select value={almacen} onValueChange={setAlmacen}>
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
                        format(endDate, "dd/MM/yyyy")
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

            <div className="flex items-center gap-x-4">
              <label className="text-[13px] text-slate-700 w-24 shrink-0">
                Categoría:
              </label>
              <div className="flex-1">
                <Select value={categoria} onValueChange={setCategoria}>
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

        <div className="pt-2 flex justify-start">
          <Button
            onClick={onConsultar}
            className="bg-[#1e5bb4] hover:bg-[#16468c] text-white px-5 h-9 text-[13px] font-normal rounded-sm transition-colors cursor-pointer"
          >
            Consultar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
