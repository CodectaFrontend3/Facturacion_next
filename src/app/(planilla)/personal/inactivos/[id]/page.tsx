import { InactivosProps } from "@/app/(planilla)/interfaces/personal/inactivos"
import inactivoData from "@/app/(planilla)/data/personal/inactivos.json"

import ProfileHeader from "../../components/DataCards/profile-header"
import InfoSection from "../../components/DataCards/info-section"
import DataGrid from "../../components/DataCards/data-grid"
import DataItem from "../../components/DataCards/data-item"

export default async function InactivoDetallePage({ params }: InactivosProps) {
    const { id } = await params;

    const inactivo = inactivoData.find(
        (item) => item.id === Number(id)
    );

    if (!inactivo) {
        return <div>No encontrado</div>
    }

    function Prueba() {
        console.log("Prueba onClick");
    }

    return (
        <div className="bg-gray-100 p-5 min-h-screen">
            <ProfileHeader personal={inactivo} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mt-3">
                <InfoSection title="Datos Generales">
                    <DataGrid>
                        <DataItem
                            label="Documento"
                            value={inactivo.documento}
                        />

                        <DataItem
                            label="Número Documento"
                            value={inactivo.n_documento}
                        />

                        <DataItem
                            label="Fecha Nacimiento"
                            value={inactivo.fecha_nacimiento}
                        />

                        <DataItem
                            label="Género"
                            value={inactivo.genero}
                        />

                        <DataItem
                            label="Celular"
                            value={inactivo.celular}
                        />

                        <DataItem
                            label="Teléfono"
                            value={inactivo.telefono}
                        />

                        <DataItem
                            label="Correo"
                            value={inactivo.correo}
                        />

                        <DataItem
                            label="Dirección"
                            value={inactivo.direccion}
                        />

                        <DataItem
                            label="Nivel Educativo"
                            value={inactivo.nivel_educativo}
                        />

                        <DataItem
                            label="Carrera Profesional"
                            value={inactivo.carrera_profesional}
                        />

                        <DataItem
                            label="Estado Civil"
                            value={inactivo.estado_civil}
                        />

                        <DataItem
                            label="Licencia de Conducir"
                            value={inactivo.licencia}
                        />
                    </DataGrid>
                </InfoSection>

                <InfoSection title="Datos Laborales">
                    <DataGrid>
                        <DataItem
                            label="Área"
                            value={inactivo.area}
                        />

                        <DataItem
                            label="Cargo"
                            value={inactivo.cargo}
                        />

                        <DataItem
                            label="Tipo Trabajador"
                            value={inactivo.tipo_trabajador}
                        />

                        <DataItem
                            label="Sede"
                            value={inactivo.sede}
                        />

                        <DataItem
                            label="Turno"
                            value={inactivo.turno}
                        />

                        <DataItem
                            label="Salario"
                            value={inactivo.salario}
                        />

                        <DataItem
                            label="Fecha Vinculación"
                            value={inactivo.fecha_vinculacion}
                        />

                        <DataItem
                            label="Fecha Retiro"
                            value={inactivo.fecha_retiro}
                        />

                        <DataItem
                            label="Forma Pago"
                            value={inactivo.forma_pago}
                        />

                        <DataItem
                            label="Banco Abonado"
                            value={inactivo.banco}
                        />

                        <DataItem
                            label="Número Cuenta"
                            value={inactivo.numero_cuenta}
                        />

                        <DataItem
                            label="Seguro de Salud"
                            value={inactivo.seguro_salud}
                        />

                        <DataItem
                            label="Tipo Contrato"
                            value={inactivo.tipo_contrato}
                        />

                        <DataItem
                            label="Régimen Pensionario"
                            value={inactivo.regimen}
                        />

                        <DataItem
                            label="Estado Del Trabajador"
                            value={inactivo.estado}
                        />
                    </DataGrid>
                </InfoSection>
            </div>
        </div>
    );
}