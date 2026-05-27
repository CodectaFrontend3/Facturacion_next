import { InactivosProps } from "@/app/(sistema)/(planilla)/interfaces/personal/inactivos"
import inactivoData from "@/app/(sistema)/(planilla)/data/personal/inactivos.json"

import InactivoDetalleClient from "./InactivoDetalleClient"

export default async function InactivoDetallePage({
    params
}: InactivosProps) {
    const { id } = await params;

    const inactivo = inactivoData.find(
        (item) => item.id === Number(id)
    );

    if (!inactivo) {
        return <div>No encontrado</div>;
    }

    return (
        <InactivoDetalleClient
            inactivo={inactivo}
        />
    );
}