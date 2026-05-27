import 'font-awesome/css/font-awesome.min.css'

interface VendedorCardProps {
    header: string
    correo: string
    document: string
    tipo: string
    porcentaje: number
}

export default function VendedorCard({
    header,
    correo,
    document,
    tipo,
    porcentaje
}: VendedorCardProps) {
    return (
        <div className="border-b border-gray-200 px-3 py-2 text-[11px] text-gray-600 bg-white cursor-pointer hover:bg-gray-100">
            <p className="font-semibold text-[#1c84c6]">{header}</p>
            <p>DNI: {document}</p>
            <p className="truncate">Correo: {correo}</p>
            <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-1">
                    <i className="fa fa-user text-gray-500"></i>
                    <span>{tipo}</span>
                </div>
                <span>Porcentaje de Venta:{porcentaje}</span>
            </div>
        </div>
    )
}