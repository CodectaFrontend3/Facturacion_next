/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

import { Egreso } from "@/app/(sistema)/servicio-tecnico/types/servicios/Egreso";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RepararModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  egreso: Egreso | null;
  onSubmit?: (data: {
    estado: string;
    descripcion: string;
    fechaFinReparacion: string;
    egresoId: number | null;
  }) => void;
};

function RepararModal({
  open,
  onOpenChange,
  egreso,
  onSubmit,
}: RepararModalProps) {
  const [estado, setEstado] = useState("revision");
  const [descripcion, setDescripcion] = useState("");
  const [fechaFinReparacion, setFechaFinReparacion] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    setEstado("revision");
    setDescripcion("");
    setFechaFinReparacion(egreso?.fechaFinReparacion ?? "");
  }, [egreso, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[780px] max-w-[calc(100vw-2rem)] overflow-hidden border-0 bg-white p-0 shadow-2xl sm:max-w-[780px]">
        <DialogHeader className="border-b border-slate-200 px-6 py-4">
          <DialogTitle className="text-base font-semibold text-slate-800">
            Reparar Equipo
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Equipo">
              <input
                readOnly
                value={egreso?.equipo ?? ""}
                className="h-10 w-full rounded-sm border border-slate-200 bg-slate-100 px-3 text-sm text-slate-700 outline-none"
              />
            </FormField>

            <FormField label="Serie">
              <input
                readOnly
                value={egreso?.serie ?? ""}
                className="h-10 w-full rounded-sm border border-slate-200 bg-slate-100 px-3 text-sm text-slate-700 outline-none"
              />
            </FormField>

            <div className="md:col-span-2">
              <FormField label="Técnico encargado">
                <input
                  readOnly
                  value={egreso?.tecnicoEncargado ?? ""}
                  className="h-10 w-full rounded-sm border border-slate-200 bg-slate-100 px-3 text-sm text-slate-700 outline-none"
                />
              </FormField>
            </div>

            <div className="md:col-span-2">
              <FormField label="Diagnóstico">
                <textarea
                  rows={4}
                  readOnly
                  value={egreso?.diagnostico ?? ""}
                  className="min-h-[104px] w-full resize-none rounded-sm border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 outline-none"
                />
              </FormField>
            </div>

            <div className="md:col-span-2">
              <FormField label="Descripción">
                <textarea
                  rows={4}
                  placeholder="Escribe la descripción del trabajo realizado"
                  className="min-h-[104px] w-full resize-none rounded-sm border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </FormField>
            </div>

            <FormField label="Fecha fin reparación">
              <div className="relative">
                <input
                  type="date"
                  value={fechaFinReparacion}
                  onChange={(event) =>
                    setFechaFinReparacion(event.target.value)
                  }
                  className="h-10 w-full rounded-sm border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-700 outline-none"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="size-4"
                  >
                    <rect x="4" y="5" width="16" height="15" rx="2" />
                    <path d="M8 3v4M16 3v4M4 9h16" />
                  </svg>
                </span>
              </div>
            </FormField>

            <FormField label="Estado">
              <Select value={estado} onValueChange={setEstado}>
                <SelectTrigger className="h-10 w-full rounded-sm border-slate-200 bg-white px-3 text-sm text-slate-700">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">En revisión</SelectItem>
                  <SelectItem value="2">Revisado</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-white px-6 py-4">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="bg-slate-500 text-white hover:bg-slate-600"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="bg-[#1A5EB3] text-white hover:bg-[#164d93]"
            onClick={() => {
              onSubmit?.({
                estado,
                descripcion,
                fechaFinReparacion,
                egresoId: egreso?.id ?? null,
              });
              console.log("Guardar reparación", {
                estado,
                descripcion,
                fechaFinReparacion,
                egresoId: egreso?.id,
              });
            }}
          >
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-normal text-slate-700">{label}</label>
      {children}
    </div>
  );
}

export default RepararModal;
