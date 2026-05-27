import DataGrid from "../DataGrid"
import DataItem from "../DataItem"
import { PersonalGeneral } from "../../types/personal"

type Props = {
    personal: PersonalGeneral
}

export default function ViewGeneralData({
    personal
}: Props) {
    return (
        <DataGrid>
            <DataItem
                label="Documento"
                value={personal.documento}
            />
            <DataItem
                label="Número Documento"
                value={personal.n_documento}
            />
            <DataItem
                label="Fecha Nacimiento"
                value={personal.fecha_nacimiento}
            />
            <DataItem
                label="Género"
                value={personal.genero}
            />
            <DataItem
                label="Celular"
                value={personal.celular}
            />
            <DataItem
                label="Teléfono"
                value={personal.telefono}
            />
            <DataItem
                label="Correo"
                value={personal.correo}
            />
            <DataItem
                label="Dirección"
                value={personal.direccion}
            />
            <DataItem
                label="Nivel Educativo"
                value={personal.nivel_educativo}
            />
            <DataItem
                label="Carrera Profesional"
                value={personal.carrera_profesional}
            />
            <DataItem
                label="Estado Civil"
                value={personal.estado_civil}
            />
            <DataItem
                label="Licencia de Conducir"
                value={personal.licencia}
            />
        </DataGrid>
    );
}