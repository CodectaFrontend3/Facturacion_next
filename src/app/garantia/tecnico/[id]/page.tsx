import { TecnicoProps } from "../../interfaces";

import { ContactInfoCard, InfoCard } from "../../components/cards-info/cards-info";
import { InfoUser, DocumentTitle, TopHeader } from "../../components/cards-info/detail-header";
import { DocumentActions } from "../../components/cards-info/document-actions";
import { GridContent } from "../../components/cards-info/detail-grid";

import tecnicoData from "../../data/tecnico.json";
import 'font-awesome/css/font-awesome.min.css';

export default async function TecnicoDetallePage({ params }: TecnicoProps) {
    const { id } = await params;

    const tecnico = tecnicoData.find(
        (item) => item.id === Number(id)
    );

    if (!tecnico) {
        return <div>No encontrado</div>
    }

    function Prueba() {
        console.log("Prueba");
    }

    return (
        <div className="bg-gray-100 p-5 min-h-screen">
            <div className="bg-white border border-gray-200 py-5">
                <TopHeader>
                    <InfoUser
                        codigo={tecnico.codigo}
                        ruc={tecnico.ruc}
                    />

                    <DocumentTitle
                        title="INFORME TÉCNICO"
                    />

                    <DocumentActions />
                </TopHeader>
                <GridContent>
                    <InfoCard title="Contacto Cliente">
                        <div>
                            <p><strong>Empresa: </strong>{tecnico.empresa}</p>
                            <p><strong>RUC: </strong>{tecnico.ruc}</p>
                            <p><strong>Teléfono: </strong>{tecnico.telefono}</p>
                            <p><strong>Dirección: </strong>{tecnico.direccion}</p>
                        </div>

                        <div>
                            <p><strong>Contacto: </strong>{tecnico.cliente}</p>
                            <p><strong>Fecha: </strong>{tecnico.fecha}</p>
                            <p><strong>Correo: </strong>{tecnico.correo}</p>
                        </div>
                    </InfoCard>

                    <InfoCard title="Condiciones Generales">
                        <div>
                            <p><strong>Técnico Asignado: </strong>{tecnico.asignado}</p>
                            <p><strong>Marca: </strong>{tecnico.marca}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Datos del Equipo"
                        className="col-span-6"
                    >
                        <div>
                            <p><strong>Modelo: </strong>{tecnico.modelo}</p>
                            <p><strong>Número de serie: </strong>{tecnico.serie}</p>
                            <p><strong>Descripcion del Problema: </strong>{tecnico.problema}</p>
                        </div>

                        <div>
                            <p><strong>Código Interno: </strong>{tecnico.codigo}</p>
                            <p><strong>Fecha de Compra: </strong>{tecnico.fecha}</p>
                            <p><strong>Revisión y Diagnóstico: </strong>{tecnico.revision}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Estética"
                        className="col-span-3"
                    >
                        <div className="col-span-2">
                            <p>{tecnico.estetica}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Revisión y diagnóstico"
                        className="col-span-3"
                    >
                        <div className="col-span-2">
                            <p>{tecnico.revision}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Causas del Problema"
                        className="col-span-3"
                    >
                        <div className="col-span-2">
                            <p>{tecnico.problema}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Solución"
                        className="col-span-3"
                    >
                        <div className="col-span-2">
                            <p>{tecnico.solucion}</p>
                        </div>
                    </InfoCard>
                </GridContent>
                <ContactInfoCard
                    title="Centro de Atención"
                />
            </div>
        </div>
    );
}