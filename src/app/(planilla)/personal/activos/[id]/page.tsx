import { ActivosProps } from "@/app/(planilla)/interfaces/personal/activos"
import activoData from "@/app/(planilla)/data/personal/activos.json"

import ProfileHeader from "../../components/DataCards/profile-header"
import InfoSection from "../../components/DataCards/info-section"
import DataGrid from "../../components/DataCards/data-grid"
import DataItem from "../../components/DataCards/data-item"

export default async function activoDetallePage({ params }: ActivosProps) {
    const { id } = await params;

    const activo = activoData.find(
        (item) => item.id === Number(id)
    );

    if (!activo) {
        return <div>No encontrado</div>
    }

    function Prueba() {
        console.log("Prueba onClick");
    }

    return (
        <div className="bg-gray-100 p-5 min-h-screen">
            <ProfileHeader personal={activo} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mt-3">
                <InfoSection title="Datos Generales">
                    <DataGrid>
                        <DataItem
                            label="Documento"
                            value={activo.documento}
                        />
                        <DataItem
                            label="Número Documento"
                            value={activo.n_documento}
                        />
                        <DataItem
                            label="Fecha Nacimiento"
                            value={activo.fecha_nacimiento}
                        />
                        <DataItem
                            label="Género"
                            value={activo.genero}
                        />
                        <DataItem
                            label="Celular"
                            value={activo.celular}
                        />
                        <DataItem
                            label="Teléfono"
                            value={activo.telefono}
                        />
                        <DataItem
                            label="Correo"
                            value={activo.correo}
                        />
                        <DataItem
                            label="Dirección"
                            value={activo.direccion}
                        />
                        <DataItem
                            label="Nivel Educativo"
                            value={activo.nivel_educativo}
                        />
                        <DataItem
                            label="Carrera Profesional"
                            value={activo.carrera_profesional}
                        />
                        <DataItem
                            label="Estado Civil"
                            value={activo.estado_civil}
                        />
                        <DataItem
                            label="Licencia de Conducir"
                            value={activo.licencia}
                        />
                    </DataGrid>
                </InfoSection>
                <InfoSection title="Datos Laborales">
                    <DataGrid>
                        <DataItem
                            label="Área"
                            value={activo.area}
                        />
                        <DataItem
                            label="Cargo"
                            value={activo.cargo}
                        />
                        <DataItem
                            label="Tipo Trabajador"
                            value={activo.tipo_trabajador}
                        />
                        <DataItem
                            label="Sede"
                            value={activo.sede}
                        />
                        <DataItem
                            label="Turno"
                            value={activo.turno}
                        />
                        <DataItem
                            label="Salario"
                            value={activo.salario}
                        />
                        <DataItem
                            label="Fecha Vinculación"
                            value={activo.fecha_vinculacion}
                        />
                        <DataItem
                            label="Fecha Retiro"
                            value={activo.fecha_retiro}
                        />
                        <DataItem
                            label="Forma Pago"
                            value={activo.forma_pago}
                        />
                        <DataItem
                            label="Banco Abonado"
                            value={activo.banco}
                        />
                        <DataItem
                            label="Número Cuenta"
                            value={activo.numero_cuenta}
                        />
                        <DataItem
                            label="Seguro de Salud"
                            value={activo.seguro_salud}
                        />
                        <DataItem
                            label="Tipo Contrato"
                            value={activo.tipo_contrato}
                        />
                        <DataItem
                            label="Régimen Pensionario"
                            value={activo.regimen}
                        />
                        <DataItem
                            label="Estado Del Trabajador"
                            value={activo.estado}
                        />
                    </DataGrid>
                </InfoSection>
            </div>
        </div>
    );
}