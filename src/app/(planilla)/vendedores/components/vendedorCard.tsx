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
        <div className="w-[220px] space-y-4">
            <div className="bg-white border border-gray-200 p-4" style={{ fontSize: "10px"}}>
                <p className="font-semibold text-gray-700">{header}</p>
                <div className="mt-2 space-y-1 text-gray-600">
                    <p className="text-xs" style={{ fontSize: "10px"}}>DNI: {document}</p>
                    <p className="text-xs" style={{ fontSize: "10px"}}>Correo: {correo}</p>
                    <div className="flex justify-between items-center">
                        <div className='flex items-center gap-2'>
                            <i className="fa fa-user"></i>
                            <p>{tipo}</p>
                        </div>
                        <p>Porcentaje de Venta: {porcentaje}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}