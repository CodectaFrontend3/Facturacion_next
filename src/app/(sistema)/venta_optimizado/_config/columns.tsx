// src/app/(sistema)/ventas/_config/columns.tsx

import { ColumnDef } from "@tanstack/react-table";
import { DocumentoFilaLista, RenovacionFilaLista } from "../_domain/types/documento.types";
import { ClienteFilaLista } from "../_domain/types/cliente.types";
import { ActionButton } from "@/components/common/ActionButton";

interface NoteColumnOptions {
  getNote?: (rowId: string) => string;
  onNoteClick?: (rowId: string) => void;
}

/**
 *  Botón informativo flotante con Tooltip interactivo
 */
function NotaButton({
  note,
  onClick,
}: {
  note?: string;
  onClick?: () => void;
}) {
  if (!note) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative ml-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[2px] bg-[#0b65d8] text-[12px] font-bold italic leading-none text-white shadow-sm transition-transform hover:-translate-y-0.5"
      aria-label="Ver nota informativa"
    >
      i
      <span className="pointer-events-none absolute left-1/2 top-[26px] z-30 hidden w-[164px] -translate-x-1/2 overflow-hidden rounded-[4px] bg-white p-2 text-left text-[11px] font-normal not-italic text-gray-700 shadow-[0_4px_16px_rgba(0,0,0,0.22)] border border-gray-100 group-hover:block">
        <span className="absolute -top-[7px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 bg-white border-t border-l border-gray-100"></span>
        {note}
      </span>
    </button>
  );
}

/**
 * COMPONENTE DE COMPARTIR TOTALMENTE DINÁMICO
 * Consume las propiedades inyectadas desde el Cliente a través del Mapper.
 */
function CompartirButtons({ 
  celular, 
  correo, 
  numeroDoc 
}: { 
  celular?: string | null; 
  correo?: string | null; 
  numeroDoc: string; 
}) {
  const telefonoDestino = celular || "Sin número";
  const correoDestino = correo || "Sin correo";

  return (
    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
      {/* BOTÓN CORREO ELECTRÓNICO */}
      <ActionButton
        icon={<i className="bi bi-envelope"></i>}
        className="w-9 h-9 bg-[#6c757d] hover:bg-[#5a6268] rounded-[3px] text-white"
        isPopover={true}
        popoverOptions={[
          {
            label: `Enviar a: ${correoDestino}`,
            onClick: () => {
              if (correo) {
                window.open(`mailto:${correo}?subject=Documento Comercial %23${numeroDoc}`, "_blank");
              } else {
                alert("Este cliente no cuenta con correo electrónico registrado.");
              }
            }
          }
        ]}
      />

      {/* BOTÓN WHATSAPP */}
      <ActionButton
        icon={<i className="bi bi-whatsapp"></i>}
        className="w-9 h-9 bg-[#28a745] hover:bg-[#218838] rounded-[3px] text-white"
        isPopover={true}
        popoverOptions={[
          {
            label: `Enviar al: ${telefonoDestino}`,
            onClick: () => {
              if (celular) {
                const numeroLimpio = celular.replace(/\s+/g, "").replace(/-/g, "");
                const mensaje = encodeURIComponent(`Hola, le hacemos llegar su documento comercial N° ${numeroDoc}.`);
                window.open(`https://api.whatsapp.com/send?phone=${numeroLimpio}&text=${mensaje}`, "_blank");
              } else {
                alert("Este cliente no cuenta con un número de celular registrado.");
              }
            }
          }
        ]}
      />
    </div>
  );
}

// ============================================================================
// 1. COLUMNAS PARA COTIZACIÓN (TRADICIONAL)
// ============================================================================
export const getCotizacionColumns = (noteOptions: NoteColumnOptions = {}): ColumnDef<DocumentoFilaLista>[] => [
  { accessorKey: "id", header: "ID", size: 40 },
  {
    accessorKey: "numero",
    header: "N°",
    size: 110,
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <span className="font-medium text-gray-900">{row.original.numero}</span>
        <NotaButton 
          note={noteOptions.getNote?.(row.original.id)} 
          onClick={() => noteOptions.onNoteClick?.(row.original.id)} 
        />
      </div>
    )
  },
  { accessorKey: "clienteDocumento", header: "RUC-DNI", size: 120 },
  { accessorKey: "clienteNombre", header: "Cliente" },
  { accessorKey: "fechaEmision", header: "Emisión", size: 100 },
  { accessorKey: "formaPago", header: "Forma", size: 100 },
  { 
    accessorKey: "total", 
    header: "Importe T.", 
    size: 120,
    cell: ({ row }) => `S/ ${row.original.total.toFixed(2)}`
  },
  {
    id: "acciones",
    header: "Acciones",
    size: 140,
    cell: () => (
      <div className="flex items-center gap-1.5">
        <ActionButton icon={<i className="bi bi-info-circle"></i>} className="w-9 h-9 bg-[#0b65d8] hover:bg-[#0952b1] rounded-[3px]" />
        <ActionButton icon={<i className="bi bi-clock"></i>} className="w-9 h-9 bg-[#f6a041] hover:bg-[#e08b33] rounded-[3px]" />
        <ActionButton icon={<i className="bi bi-check-circle"></i>} className="w-9 h-9 bg-[#20c997] hover:bg-[#1ba87e] rounded-[3px]" />
      </div>
    )
  },
  {
    id: "compartir",
    header: "Compartir R.",
    size: 110,
    cell: ({ row }) => (
      <CompartirButtons 
        celular={row.original.clienteCelular} 
        correo={row.original.clienteCorreo} 
        numeroDoc={row.original.numero} 
      />
    )
  }
];

// ============================================================================
// 2. COLUMNAS PARA COTIZACIÓN MANUAL
// ============================================================================
export const getCotizacionManualColumns = (noteOptions: NoteColumnOptions = {}): ColumnDef<DocumentoFilaLista>[] => [
  { accessorKey: "id", header: "ID", size: 40 },
  {
    accessorKey: "numero",
    header: "N°",
    size: 110,
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <span className="font-medium text-gray-900">{row.original.numero}</span>
        <NotaButton 
          note={noteOptions.getNote?.(row.original.id)} 
          onClick={() => noteOptions.onNoteClick?.(row.original.id)} 
        />
      </div>
    )
  },
  { accessorKey: "clienteDocumento", header: "RUC-DNI", size: 120 },
  { accessorKey: "clienteNombre", header: "Cliente" },
  { accessorKey: "fechaEmision", header: "Emisión", size: 100 },
  { accessorKey: "formaPago", header: "Forma", size: 100 },
  { 
    accessorKey: "total", 
    header: "Importe T.", 
    size: 120,
    cell: ({ row }) => `S/ ${row.original.total.toFixed(2)}`
  },
  {
    id: "acciones",
    header: "Acciones",
    size: 90,
    cell: () => (
      <div className="flex items-center gap-1.5">
        <ActionButton icon={<i className="bi bi-info-circle"></i>} className="w-9 h-9 bg-[#0b65d8] hover:bg-[#0952b1] rounded-[3px]" />
        <ActionButton icon={<i className="bi bi-check-circle"></i>} className="w-9 h-9 bg-[#20c997] hover:bg-[#1ba87e] rounded-[3px]" />
      </div>
    )
  },
  {
    id: "compartir",
    header: "Compartir R.",
    size: 110,
    cell: ({ row }) => (
      <CompartirButtons 
        celular={row.original.clienteCelular} 
        correo={row.original.clienteCorreo} 
        numeroDoc={row.original.numero} 
      />
    )
  }
];

// ============================================================================
// 3. COLUMNAS PARA NOTAS DE VENTA
// ============================================================================
export const getNotaVentaColumns = (noteOptions: NoteColumnOptions = {}): ColumnDef<DocumentoFilaLista>[] => [
  { accessorKey: "id", header: "ID", size: 40 },
  { accessorKey: "numero", header: "N°", size: 100 },
  { accessorKey: "clienteDocumento", header: "RUC-DNI", size: 120 },
  { accessorKey: "clienteNombre", header: "Cliente" },
  { accessorKey: "fechaEmision", header: "Emisión", size: 100 },
  { accessorKey: "formaPago", header: "Forma", size: 100 },
  { 
    accessorKey: "total", 
    header: "Importe T.", 
    size: 120,
    cell: ({ row }) => `S/ ${row.original.total.toFixed(2)}`
  },
  {
    id: "acciones",
    header: "Acciones",
    size: 90,
    cell: () => (
      <div className="flex items-center gap-1.5">
        <ActionButton icon={<i className="bi bi-info-circle"></i>} className="w-9 h-9 bg-[#0b65d8] hover:bg-[#0952b1] rounded-[3px]" />
      </div>
    )
  },
  {
    id: "compartir",
    header: "Compartir R.",
    size: 110,
    cell: ({ row }) => (
      <CompartirButtons 
        celular={row.original.clienteCelular} 
        correo={row.original.clienteCorreo} 
        numeroDoc={row.original.numero} 
      />
    )
  }
];

// ============================================================================
// 4. COLUMNAS PARA RENOVACIONES
// ============================================================================
export const getRenovacionColumns = (noteOptions: NoteColumnOptions = {}): ColumnDef<RenovacionFilaLista>[] => [
  { accessorKey: "id", header: "ID", size: 40 },
  { accessorKey: "numero", header: "N°", size: 100 },
  { accessorKey: "clienteDocumento", header: "RUC-DNI", size: 120 },
  { accessorKey: "clienteNombre", header: "Cliente" },
  { accessorKey: "fechaEmision", header: "Emisión", size: 100 },
  { accessorKey: "fechaRenovacion", header: "Renovación", size: 110 },
  { 
    accessorKey: "diasRestantes", 
    header: "Días R.", 
    size: 80,
    cell: ({ row }) => {
      const dias = row.original.diasRestantes;
      const alerta = row.original.alertaVisual;
      
      let badgeClass = "bg-green-100 text-green-800";
      if (alerta === "vencido") badgeClass = "bg-red-100 text-red-800 font-bold";
      else if (alerta === "por_vencer") badgeClass = "bg-amber-100 text-amber-800 animate-pulse";

      return (
        <span className={`px-2 py-0.5 rounded text-xs ${badgeClass}`}>
          {dias <= 0 ? `Vencido hace ${Math.abs(dias)} d.` : `${dias} días`}
        </span>
      );
    }
  },
  { 
    accessorKey: "total", 
    header: "Importe T.", 
    size: 110,
    cell: ({ row }) => `S/ ${row.original.total.toFixed(2)}`
  },
  {
    id: "acciones",
    header: "Acciones",
    size: 90,
    cell: () => (
      <div className="flex items-center gap-1.5">
        <ActionButton icon={<i className="bi bi-info-circle"></i>} className="w-9 h-9 bg-[#0b65d8] hover:bg-[#0952b1] rounded-[3px]" />
      </div>
    )
  },
  {
    id: "compartir",
    header: "Compartir R.",
    size: 110,
    cell: ({ row }) => (
      <CompartirButtons 
        celular={row.original.clienteCelular} 
        correo={row.original.clienteCorreo} 
        numeroDoc={row.original.numero} 
      />
    )
  }
];

// ============================================================================
// 5. COLUMNAS PARA CLIENTES
// ============================================================================
export const getClienteColumns = (): ColumnDef<ClienteFilaLista>[] => [
  { accessorKey: "id", header: "ID", size: 40 },
  { accessorKey: "tipoDocumento", header: "T. Doc", size: 80 },
  { accessorKey: "numeroDocumento", header: "N° Documento", size: 120 },
  { accessorKey: "nombre", header: "Nombres y Apellidos / Razón Social" },
  { accessorKey: "celular", header: "Celular", size: 100, cell: ({ row }) => row.original.celular || "---" },
  { accessorKey: "correo", header: "Correo", cell: ({ row }) => row.original.correo || "---" },
  { accessorKey: "fechaRegistro", header: "Fecha Registro", size: 120 },
  {
    id: "acciones",
    header: "Acciones",
    size: 90,
    cell: () => (
      <div className="flex items-center gap-1.5">
        <ActionButton icon={<i className="bi bi-info-circle"></i>} className="w-9 h-9 bg-[#0b65d8] hover:bg-[#0952b1] rounded-[3px]" />
      </div>
    )
  }
];

/**
 * SELECTOR GENERAL DE COLUMNAS SEGÚN TAB ACTIVO
 */
export const getColumnsForTab = (tab: string, noteOptions: NoteColumnOptions = {}): ColumnDef<any>[] => {
  switch (tab) {
    case "cotizacion":
      return getCotizacionColumns(noteOptions);
    case "cotizacion-manual":
      return getCotizacionManualColumns(noteOptions);
    case "nota-venta":
      return getNotaVentaColumns(noteOptions);
    case "renovacion":
      return getRenovacionColumns(noteOptions);
    case "clientes":
      return getClienteColumns();
    default:
      return [];
  }
};