/* eslint-disable react-hooks/static-components */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

export default function ModalNuevoCliente() {
  const [paso, setPaso] = useState(1);

  // Auxiliar para los campos (Label + Input)
  const FormField = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-[11px] font-bold text-gray-600 ml-1">
        {label}
      </label>
      {children}
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#6c757d] text-white px-3 py-1.5 rounded-r-md hover:bg-[#5a6268] transition-colors cursor-pointer">
          <Plus size={16} />
        </button>
      </DialogTrigger>

      <DialogContent className="w-[800px] max-w-[90vw] sm:max-w-[800px] p-0 border-none shadow-2xl overflow-hidden bg-white">
        <DialogHeader className="px-6 py-4 border-b border-gray-100 bg-white">
          <DialogTitle className="text-[#444] font-bold text-lg">
            Agregar Nuevo Cliente
          </DialogTitle>
        </DialogHeader>

        <div className="p-8">
          {/* 1. Buscador Superior */}
          <div className="flex flex-col items-center mb-8">
            <h3 className="text-[14px] font-bold text-gray-800 mb-3 uppercase italic tracking-wider">
              Consultar (RUC - DNI)
            </h3>
            <div className="flex w-full max-w-md">
              <Input
                placeholder="Ingrese RUC o DNI"
                className="rounded-l-full rounded-r-none border-gray-300 focus-visible:ring-0 h-10 text-[12px] w-full"
              />
              <Button className="rounded-r-full rounded-l-none bg-[#2a00cc] hover:bg-[#2100a3] px-8 h-10 text-[12px] font-bold text-white shrink-0">
                Buscar
              </Button>
            </div>
          </div>

          {/* 2. Cabecera de Pasos (Manual para evitar errores de Shadcn) */}
          <div className="flex w-full border-b border-gray-200 mb-8">
            {[
              { id: 1, label: "1. Datos Personales" },
              { id: 2, label: "2. Información" },
              { id: 3, label: "3. Contacto" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setPaso(t.id)}
                className={`flex-1 py-3 text-[12px] font-bold transition-all border-x border-t rounded-t-md -mb-[1px] cursor-pointer ${
                  paso === t.id
                    ? "bg-white border-gray-200 text-gray-800"
                    : "bg-transparent border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* 3. Contenido según el paso */}
          <div className="min-h-[300px]">
            {paso === 1 && (
              <div className="grid grid-cols-2 gap-x-12 gap-y-5 animate-in fade-in duration-300">
                <FormField label="Documento Identificación">
                  <Select defaultValue="dni">
                    <SelectTrigger className="rounded-full border-gray-300 h-10 text-[12px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dni">DNI</SelectItem>
                      <SelectItem value="ruc">RUC</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Número de Documento">
                  <Input
                    defaultValue="61102133"
                    className="rounded-full border-gray-300 h-10 text-[12px]"
                  />
                </FormField>
                <FormField label="Nombre:">
                  <Input
                    defaultValue="DEMO"
                    className="rounded-full border-gray-300 h-10 text-[12px] bg-blue-50/50"
                  />
                </FormField>
                <FormField label="Dirección:">
                  <Input
                    defaultValue="Lima"
                    className="rounded-full border-gray-300 h-10 text-[12px]"
                  />
                </FormField>
                <FormField label="Correo:">
                  <Input
                    defaultValue="sincorreo@gmail.com"
                    className="rounded-full border-gray-300 h-10 text-[12px]"
                  />
                </FormField>
                <FormField label="Distrito:">
                  <Input
                    defaultValue="Lima"
                    className="rounded-full border-gray-300 h-10 text-[12px]"
                  />
                </FormField>
                <FormField label="Teléfono">
                  <Input
                    defaultValue="0000"
                    className="rounded-full border-gray-300 h-10 text-[12px]"
                  />
                </FormField>
                <FormField label="Celular">
                  <Input
                    defaultValue="0000000"
                    className="rounded-full border-gray-300 h-10 text-[12px]"
                  />
                </FormField>
              </div>
            )}

            {paso === 2 && (
              <div className="grid grid-cols-2 gap-x-12 gap-y-5 animate-in fade-in duration-300">
                <FormField label="Cod. Ubigeo:">
                  <Input
                    defaultValue="150101"
                    className="rounded-full border-gray-300 h-10 text-[12px]"
                  />
                </FormField>
                <FormField label="Departamento:">
                  <Input
                    defaultValue="Lima"
                    className="rounded-full border-gray-300 h-10 text-[12px]"
                  />
                </FormField>
                <FormField label="País:">
                  <Input
                    defaultValue="Perú"
                    className="rounded-full border-gray-300 h-10 text-[12px]"
                  />
                </FormField>
                <FormField label="Aniversario:">
                  <Input
                    type="date"
                    className="rounded-full border-gray-300 h-10 text-[12px]"
                  />
                </FormField>
              </div>
            )}

            {paso === 3 && (
              <div className="grid grid-cols-2 gap-x-12 gap-y-5 animate-in fade-in duration-300">
                <FormField label="Nombre Contacto:">
                  <Input
                    placeholder="Nombre"
                    className="rounded-full border-gray-300 h-10 text-[12px]"
                  />
                </FormField>
                <FormField label="Cargo:">
                  <Input
                    placeholder="Cargo"
                    className="rounded-full border-gray-300 h-10 text-[12px]"
                  />
                </FormField>
                <div className="col-span-2">
                  <FormField label="Correo del Contacto:">
                    <Input
                      placeholder="correo@ejemplo.com"
                      className="rounded-full border-gray-300 h-10 text-[12px]"
                    />
                  </FormField>
                </div>
              </div>
            )}
          </div>

          {/* 4. Botones de Navegación */}
          <div className="mt-12 flex justify-end gap-3 pt-5 border-t border-gray-100">
            <Button
              variant="outline"
              className="bg-[#adb5bd] text-white hover:bg-[#868e96] border-none px-8 h-9 text-[12px] font-bold cursor-pointer transition-all disabled:opacity-50"
              onClick={() => setPaso(paso - 1)}
              disabled={paso === 1}
            >
              Ant.
            </Button>
            <Button
              className="bg-[#0056b3] hover:bg-[#004494] px-8 h-9 text-[12px] font-bold text-white cursor-pointer transition-all"
              onClick={() => {
                if (paso < 3) setPaso(paso + 1);
                else console.log("Guardar...");
              }}
            >
              {paso === 3 ? "Guardar" : "Sig."}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
