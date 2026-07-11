"use client";

import React from "react";
import { ComprobantesTabTemplate } from "../components/ComprobantesTabTemplate";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export interface BoletaRow {
  id: string | number;
  nro: string;
  rucDni: string;
  cliente: string;
  emision: string;
  forma: string;
  importe: string;
  // Puedes tener campos distintos a Factura si quieres
}

const columns: ColumnDef<BoletaRow>[] = [
  { id: "select", header: ({ table }) => <Checkbox />, cell: ({ row }) => <Checkbox /> },
  { accessorKey: "id", header: "ID" },
  { accessorKey: "nro", header: "N° de Boleta" }, // Título de columna diferente
  { accessorKey: "cliente", header: "Cliente" },
  // ... demás columnas
];

export default function BoletasPage() {
  return (
    <ComprobantesTabTemplate 
      activeTab="boleta" 
      columns={columns} 
      data={[]} 
      total="S/0.00"
      totalGeneral="S/0.00"
    />
  );
}