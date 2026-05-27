import Image from "next/image"
import { type ColumnDef } from "@tanstack/react-table"
import { type FacturacionRow } from "../types"

export const getFacturacionColumns = (): ColumnDef<FacturacionRow>[] => [
	{
		accessorKey: "item",
		header: "Item",
		size: 80,
		cell: ({ row }) => <span className="font-medium text-[#676A6C]">{row.original.item}</span>,
	},
	{
		accessorKey: "codigo",
		header: "Código",
		size: 150,
	},
	{
		accessorKey: "rucDni",
		header: "RUC | DNI",
		size: 150,
	},
	{
		accessorKey: "cliente",
		header: "Cliente",
	},
	{
		accessorKey: "fechaCreacion",
		header: "Fecha de Creacion",
		size: 180,
	},
	{
		id: "sunatStatus",
		header: () => (
			<div className="flex items-center justify-center gap-1">
				<Image
					src="http://jypsac.dyndns.org:190/facturacion_20522045773/public/sunat.png"
					alt="sunat"
					width={15}
					height={15}
				/>
				<span className="font-extrabold text-[#0073c1] tracking-tighter text-[11px]">SUNAT</span>
			</div>
		),
		size: 120,
		cell: ({ row }) => {
			const status = row.original.sunatStatus
			return (
				<>
					{status === "enviado" && (
						<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-800">
							Enviado
						</span>
					)}
					{status === "pendiente" && (
						<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-yellow-100 text-yellow-800">
							Pendiente
						</span>
					)}
					{status === "error" && (
						<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-800">
							Error
						</span>
					)}
				</>
			)
		},
	},
]
