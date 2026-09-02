import { ColumnDef } from "@tanstack/react-table";

export interface CantidadPrecioTablaRow {
  id: number;
  codigoProducto: string;
  nombre: string;
  marca: string;
  garantia: string;
  stock: number;
  precioNacional: string;
  precioIgvNacional: string;
  precioExtranjero: string;
  precioIgvExtranjero: string;
  tipo: "producto" | "servicio";
}

export const cantidadPrecioColumns: ColumnDef<CantidadPrecioTablaRow>[] = [
  {
    accessorKey: "id",
    header: "Id",
    size: 50,
  },
  {
    accessorKey: "codigoProducto",
    header: "Codigo Producto",
    size: 140,
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
    size: 200,
    cell: ({ row }) => (
      <div className="whitespace-normal break-words max-w-[200px]">
        {row.original.nombre}
      </div>
    ),
  },
  {
    accessorKey: "marca",
    header: "Marca",
    size: 120,
  },
  {
    accessorKey: "garantia",
    header: "Garantia",
    size: 110,
  },
  {
    accessorKey: "stock",
    header: "Stock",
    size: 80,
  },
  {
    accessorKey: "precioNacional",
    header: "Precio Nacional",
    size: 140,
  },
  {
    accessorKey: "precioIgvNacional",
    header: "Precio + IGV",
    size: 130,
  },
  {
    accessorKey: "precioExtranjero",
    header: "Precio Extranjero",
    size: 140,
  },
  {
    accessorKey: "precioIgvExtranjero",
    header: "Precio + IGV",
    size: 130,
  },
];
