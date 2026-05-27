import { ActivosProps } from "@/app/(sistema)/(planilla)/interfaces"
import activoData from "@/app/(sistema)/(planilla)/data/personal/activos.json"

import ActivoDetalleClient from "./activoDetalleClient"

export default async function ActivoDetallePage({
    params
}: ActivosProps) {
    const { id } = await params;

    const activo = activoData.find(
        (item) => item.id === Number(id)
    );

    if (!activo) {
        return <div>No encontrado</div>
    }

    return (
        <ActivoDetalleClient
            activo={activo}
        />
    )
}