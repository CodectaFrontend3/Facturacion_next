import DataGrid from "../DataGrid"

import InputItem from "../InputItem"
import SelectItem from "../SelectItem"
import ButtonItem from "../ButtonItem"

import { PersonalLaboral } from "../../types/personal"

type Props = {
    personal: PersonalLaboral
    setPersonalData: React.Dispatch<
        React.SetStateAction<any>
    >
    onSave: () => void
}

export default function EditLaboralData({
    personal,
    setPersonalData,
    onSave
}: Props) {
    return (
        <DataGrid>
            <SelectItem
                label="Área"
                value={personal.area}
                options={[
                    "Administración",
                    "Almacén",
                    "Compras",
                    "Recursos Humanos",
                    "Otros",
                ]}
                onChange={(e) => setPersonalData({
                    ...personal,
                    area: e.target.value
                })}
            />
            <SelectItem
                label="Cargo"
                value={personal.cargo}
                options={[
                    "Empleado",
                    "Vendedor",
                    "Obrero"
                ]}
                onChange={(e) => setPersonalData({
                    ...personal,
                    cargo: e.target.value
                })}
            />
            <SelectItem
                label="Tipo Trabajador"
                value={personal.tipo_trabajador}
                options={[
                    "Interno",
                    "Externo",
                    "Temporal"
                ]}
                onChange={(e) => setPersonalData({
                    ...personal,
                    tipo_trabajador: e.target.value
                })}
            />
            <InputItem
                label="Sede"
                value={personal.sede}
                onChange={(e) => setPersonalData({
                    ...personal,
                    sede: e.target.value
                })}
            />
            <SelectItem
                label="Turno"
                value={personal.turno}
                options={[
                    "Mañana",
                    "Tarde",
                    "Noche",
                ]}
                onChange={(e) => setPersonalData({
                    ...personal,
                    turno: e.target.value
                })}
            />
            <InputItem
                label="Salario"
                value={personal.salario}
                onChange={(e) => setPersonalData({
                    ...personal,
                    salario: e.target.value
                })}
            />
            <InputItem
                type="date"
                label="Fecha Vinculación"
                value={personal.fecha_vinculacion}
                onChange={(e) => setPersonalData({
                    ...personal,
                    fecha_vinculacion: e.target.value
                })}
            />
            <InputItem
                type="date"
                label="Fecha Retiro"
                value={personal.fecha_retiro}
                onChange={(e) => setPersonalData({
                    ...personal,
                    fecha_retiro: e.target.value
                })}
            />
            <SelectItem
                label="Forma Pago"
                value={personal.forma_pago}
                options={[
                    "Semanal",
                    "Quincenal",
                    "Mensual",
                ]}
                onChange={(e) => setPersonalData({
                    ...personal,
                    forma_pago: e.target.value
                })}
            />
            <SelectItem
                label="Banco Abonado"
                value={personal.banco}
                options={[
                    "BCP",
                    "BN",
                    "Interbank",
                    "Continental",
                    "Scotiabank"
                ]}
                onChange={(e) => setPersonalData({
                    ...personal,
                    banco: e.target.value
                })}
            />
            <InputItem
                label="Número Cuenta"
                value={personal.numero_cuenta}
                onChange={(e) => setPersonalData({
                    ...personal,
                    numero_cuenta: e.target.value
                })}
            />
            <SelectItem
                label="Seguro de Salud"
                value={personal.seguro_salud}
                options={[
                    "Sin Seguro",
                    "AFP Integra",
                    "AFP Horizonte",
                    "ONP"
                ]}
                onChange={(e) => setPersonalData({
                    ...personal,
                    seguro_salud: e.target.value
                })}
            />
            <SelectItem
                label="Tipo Contrato"
                value={personal.tipo_contrato}
                options={[
                    "Indefinido",
                    "Fijo",
                    "Temporal"
                ]}
                onChange={(e) => setPersonalData({
                    ...personal,
                    tipo_contrato: e.target.value
                })}
            />
            <SelectItem
                label="Régimen Pensionario"
                value={personal.regimen}
                options={[
                    "Sin Régimen",
                    "Privado",
                    "Nacional",
                ]}
                onChange={(e) => setPersonalData({
                    ...personal,
                    regimen: e.target.value
                })}
            />
            <SelectItem
                label="Estado Del Trabajador"
                value={personal.estado}
                options={[
                    "Activo",
                    "Inactivo"
                ]}
                onChange={(e) => setPersonalData({
                    ...personal,
                    estado: e.target.value
                })}
            />

            <div className="col-start-2">
                <ButtonItem
                    title="Actualizar"
                    buttonText="Guardar"
                    bgColor="#1c84c6"
                    hoverColor="#176fa5"
                    onClick={onSave}
                />
            </div>
        </DataGrid>
    )
}