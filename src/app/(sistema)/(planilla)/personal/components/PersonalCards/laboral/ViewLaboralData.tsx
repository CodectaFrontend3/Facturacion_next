import DataGrid from "../DataGrid"
import DataItem from "../DataItem"
import { PersonalLaboral } from "../../types/personal"

type Props = {
    personal: PersonalLaboral
}

export default function ViewLaboralData({
    personal
}: Props) {
    return (
        <DataGrid>
            <DataItem
                label="Área"
                value={personal.area}
            />
            <DataItem
                label="Cargo"
                value={personal.cargo}
            />
            <DataItem
                label="Tipo Trabajador"
                value={personal.tipo_trabajador}
            />
            <DataItem
                label="Sede"
                value={personal.sede}
            />
            <DataItem
                label="Turno"
                value={personal.turno}
            />
            <DataItem
                label="Salario"
                value={personal.salario}
            />
            <DataItem
                label="Fecha Vinculación"
                value={personal.fecha_vinculacion}
            />
            <DataItem
                label="Fecha Retiro"
                value={personal.fecha_retiro}
            />
            <DataItem
                label="Forma Pago"
                value={personal.forma_pago}
            />
            <DataItem
                label="Banco Abonado"
                value={personal.banco}
            />
            <DataItem
                label="Número Cuenta"
                value={personal.numero_cuenta}
            />
            <DataItem
                label="Seguro de Salud"
                value={personal.seguro_salud}
            />
            <DataItem
                label="Tipo Contrato"
                value={personal.tipo_contrato}
            />
            <DataItem
                label="Régimen Pensionario"
                value={personal.regimen}
            />
            <DataItem
                label="Estado Del Trabajador"
                value={personal.estado}
            />
        </DataGrid>
    )
}