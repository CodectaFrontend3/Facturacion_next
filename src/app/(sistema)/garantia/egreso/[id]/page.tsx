import { EgresoProps } from "../../interfaces";

import { InfoCard } from "../../components/cards-info/cards-info";
import { InfoUser, DocumentTitle, TopHeader } from "../../components/cards-info/detail-header";
import { DocumentActions } from "../../components/cards-info/document-actions";
import { GridContent } from "../../components/cards-info/detail-grid";
import { ContactInfoCard } from "../../components/cards-info/cards-info";
import { GeneralContainer } from "../../components/cards-info/general-container";

import garantiaMock from "../../data/garantia-mock.json";
import 'font-awesome/css/font-awesome.min.css';

export default async function EgresoDetallePage({ params }: EgresoProps) {
    const { id } = await params;

    const garantia = garantiaMock.find(
        (item) => item.id === Number(id)
    );

    if (!garantia) {
        return <div>No encontrado</div>
    }

    function Prueba() {
        console.log("Prueba");
    }

    return (
        <div className="p-5 pb-2">
            <GeneralContainer>
                <TopHeader>
                    <InfoUser
                        codigo={garantia.codigo}
                        ruc={garantia.cliente.ruc}
                    />

                    <DocumentTitle
                        title="GUÍA DE EGRESO"
                    />

                    <DocumentActions />
                </TopHeader>
                <GridContent>
                    <InfoCard title="Contacto Cliente">
                        <div>
                            <p><strong>Empresa: </strong>{garantia.cliente.empresa}</p>
                            <p><strong>RUC: </strong>{garantia.cliente.ruc}</p>
                            <p><strong>Teléfono: </strong>{garantia.cliente.telefono}</p>
                            <p><strong>Dirección: </strong>{garantia.cliente.direccion}</p>
                        </div>

                        <div>
                            <p><strong>Contacto: </strong>{garantia.cliente.nombre}</p>
                            <p><strong>Fecha: </strong>{garantia.fechas.egreso || garantia.fechas.ingreso}</p>
                            <p><strong>Correo: </strong>{garantia.cliente.correo}</p>
                        </div>
                    </InfoCard>

                    <InfoCard title="Condiciones Generales">
                        <div>
                            <p><strong>Técnico Asignado: </strong>{garantia.tecnico.asignado}</p>
                            <p><strong>Motivo: </strong>{garantia.ingreso.motivo || "Revisión técnica"}</p>
                            <p><strong>Marca: </strong>{garantia.equipo.marca}</p>
                            <p><strong>Asunto: </strong>{garantia.egreso.asunto || "Entrega de equipo"}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Datos del Equipo"
                        className="col-span-6"
                    >
                        <div>
                            <p><strong>Modelo: </strong>{garantia.equipo.modelo}</p>
                            <p><strong>Número de serie: </strong>{garantia.equipo.serie}</p>
                        </div>

                        <div>
                            <p><strong>Código Interno: </strong>{garantia.codigo}</p>
                            <p><strong>Fecha de Compra: </strong>{garantia.equipo.fechaCompra}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Descripción del Problema"
                        className="col-span-2"
                    >
                        <div className="col-span-2">
                            <p>{garantia.ingreso.problemaReportado}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Revisión y diagnóstico"
                        className="col-span-2"
                    >
                        <div className="col-span-2">
                            <p>{garantia.tecnico.revision}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Recomendaciones"
                        className="col-span-2"
                    >
                        <div className="col-span-2">
                            <p>{garantia.tecnico.recomendaciones}</p>
                        </div>
                    </InfoCard>
                </GridContent>
                <ContactInfoCard
                    title="Centro de Atención"
                />
            </GeneralContainer>
        </div>
    );
}