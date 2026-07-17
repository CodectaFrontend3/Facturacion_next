"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Banknote, ChevronDown, Clock9, Eye } from "lucide-react"; // Añadí Eye para simular el botón azul de tus capturas
import { ComprobanteBase, TipoComprobante } from "../types/ComprobanteBase";
import { ActionButton } from "@/components/common/ActionButton";
import { PagoCuotasModal } from "../components/PagoCuotasModal";

interface ConfigColumnas {
  tipo: TipoComprobante;
  esPagado: boolean;
}

export const getColumns = ({
  tipo,
  esPagado,
}: ConfigColumnas): ColumnDef<ComprobanteBase>[] => {
  // 1. Columna del Identificador Único Dinámico (Cambia según tus imágenes)
  const columnaDocumento: ColumnDef<ComprobanteBase> = {
    id: "numero_documento",
    size: 140,
    header: () => {
      if (tipo === "Boleta") return "Nº de Boleta";
      if (tipo === "NotaVenta") return "Nº de Nota Venta"; // Alineado con tu captura de Pagados
      return "Nº de Factura M"; // Para Factura
    },
    cell: ({ row }) => {
      const data = row.original as any;
      if (tipo === "Boleta") return data.numero_boleta;
      if (tipo === "NotaVenta") return data.n_nota_venta;
      return data.numero_factura;
    },
  };

  // 2. Esqueleto Inicial Base (Item, Estado, Documento, Cliente, Emisión)
  const columnasBase: ColumnDef<ComprobanteBase>[] = [
    {
      accessorKey: "estado",
      header: "Estado",
      size: 100,
      cell: ({ row }) => {
        const estado = row.original.estado; // "Sin Pagar" o "Pagado"

        if (estado === "Pagado") {
          return (
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Pagado
            </span>
          );
        }

        return (
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
            Sin Pagar
          </span>
        );
      },
    },
    columnaDocumento,
    { accessorKey: "cliente", header: "Cliente", size: 150 },
    { accessorKey: "fecha_emision", header: "Emisión", size: 120 },
  ];

  // 3. Inyección de columnas respetando rigurosamente el ORDEN de tus capturas
  if (esPagado) {
    // --- ESTRUCTURA PAGADOS (Ver imagen 3) ---
    // Orden: ...Emisión -> Forma de Pago -> Total -> Fecha Cancelado -> Acciones
    // Nota: Las boletas/facturas meten Nº Cuotas antes de Total si aplican.

    if (tipo !== "NotaVenta") {
      columnasBase.push({
        id: "numero_cuotas",
        header: "Nº Cuotas",
        size: 120,
        cell: ({ row }) => (row.original as any).numero_cuotas || "-",
      });
    }

    columnasBase.push(
      {
        id: "forma_pago",
        header: "Forma de Pago",
        size: 130,
        cell: ({ row }) => (row.original as any).forma_pago || "-",
      },
      {
        accessorKey: "monto_total",
        header: "Total",
        size: 120,
      },
      {
        accessorKey: "fecha_cancelado",
        header: "Fecha Cancelado",
        size: 140,
      },
    );
  } else {
    // --- ESTRUCTURA SIN PAGAR (Ver imagen 2) ---
    // Orden: ...Emisión -> Monto Total -> [Forma Pago / Cuotas] -> Saldo -> [Fecha V. / Obs] -> Acciones
    columnasBase.push({
      accessorKey: "monto_total",
      header: "Monto Total",
      size: 120,
    });

    if (tipo === "NotaVenta") {
      columnasBase.push({
        id: "forma_pago",
        header: "Forma pago",
        size: 130,
        cell: ({ row }) => (row.original as any).forma_pago || "-",
      });
    } else {
      columnasBase.push({
        id: "numero_cuotas",
        header: "Nº Cuotas",
        size: 120,
        cell: ({ row }) => (row.original as any).numero_cuotas || "-",
      });
    }

    columnasBase.push({
      accessorKey: "saldo",
      header: "Saldo",
      size: 120,
    });

    if (tipo !== "NotaVenta") {
      columnasBase.push({
        accessorKey: "fecha_vencimiento",
        header: "Fecha V.",
        size: 120,
      });
    }

    if (tipo === "Factura") {
      columnasBase.push({
        id: "observaciones",
        header: "Obs.",
        size: 120,
        cell: ({ row }) => (row.original as any).observaciones || "",
      });
    }
  }

  // Variable de estado para controlar la apertura del modal de pago
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 4. Columna de Acciones final ajustable
  columnasBase.push({
    id: "actions",
    header: "Acciones",
    size: 140,
    cell: ({ row }) => (
      <div className="flex gap-2">
        {esPagado ? (
          // Botón naranja de "Tiempo pendiente"
          <Button
            size="icon-sm"
            className="bg-[#0052CC] hover:bg-[#0040A3] text-white rounded-sm h-9 w-10 cursor-pointer"
            onClick={() =>
              alert(`Ver detalle del documento: ${row.original.id}`)
            }
          >
            <Eye size={16} />
          </Button>
        ) : (
          <>
            {/* Botón azul de "Ver" */}
            <Button
              size="icon-sm"
              className="bg-[#0052CC] hover:bg-[#0040A3] text-white rounded-sm h-9 w-10 cursor-pointer"
              onClick={() =>
                alert(`Ver detalle del documento: ${row.original.id}`)
              }
            >
              <Eye size={16} />
            </Button>
            {/* Boton desplegable de "Opciones" de pago */}
            <ActionButton
              isPopover={true}
              popoverOptions={[
                {
                  label: "Pagar",
                  onClick: () => setIsModalOpen(true), // Abrir modal de pago
                },
                {
                  label: "Adelantar",
                  onClick: () =>
                    alert(`Editar pago del documento: ${row.original.id}`),
                },
              ]}
              className="bg-[#0052CC] hover:bg-[#2C8F7B] data-[state=open]:bg-[#2C8F7B] text-white rounded-md transition-colors w-14 flex items-center justify-center px-0"
              popoverClassName="bg-white rounded-md border border-gray-100 shadow-md min-w-[150px]"
              icon={
                <div className="flex items-center justify-center gap-1 w-full h-full">
                  <Banknote className="size-5 shrink-0" />
                  <ChevronDown className="size-3 shrink-0 transition-transform duration-200" />
                </div>
              }
            />
          </>
        )}

        {/* Modal de Pago */}
        <PagoCuotasModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          boletasSeleccionadas={[row.original]}
        />
      </div>
    ),
  });

  return columnasBase;
};
