"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Clock9, Eye } from "lucide-react"; // Añadí Eye para simular el botón azul de tus capturas
import { ComprobanteBase, TipoComprobante } from "../types/ComprobanteBase";

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
      id: "item",
      header: "Item",
      size: 40,
      cell: ({ row }) => row.id,
    },
    { accessorKey: "estado", header: "Estado", size: 100 },
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

  // 4. Columna de Acciones final ajustable
  columnasBase.push({
    id: "actions",
    header: "Acciones",
    size: 140,
    cell: ({ row }) => (
      <div className="flex gap-2">
        {esPagado ? (
          // Botón azul de "Ver" simulando tus capturas de completados
          <Button
            size="icon-sm"
            className="bg-[#0052CC] hover:bg-[#0040A3] text-white rounded-sm h-8.5 w-9"
            onClick={() =>
              alert(`Ver detalle del documento: ${row.original.id}`)
            }
          >
            <Eye size={16} />
          </Button>
        ) : (
          // Botón naranja de "Tiempo pendiente"
          <Button
            size="icon-sm"
            className="bg-[#FBAF5D] hover:bg-[#e89d4d] text-white rounded-sm h-8.5 w-9"
            onClick={() => alert(`Servicio pendiente: ${row.original.id}`)}
            aria-label="Tiempo pendiente"
          >
            <Clock9 size={16} />
          </Button>
        )}
      </div>
    ),
  });

  return columnasBase;
};
