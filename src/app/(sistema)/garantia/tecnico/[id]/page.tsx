import { TecnicoProps } from "../../interfaces";

import { ContactInfoCard, InfoCard } from "../../components/cards-info/cards-info";
import { InfoUser, DocumentTitle, TopHeader } from "../../components/cards-info/detail-header";
import { DocumentActions } from "../../components/cards-info/document-actions";
import { GridContent } from "../../components/cards-info/detail-grid";
import { GeneralContainer } from "../../components/cards-info/general-container";

import garantiaMock from "../../data/garantia-mock.json";
import 'font-awesome/css/font-awesome.min.css';

export default async function TecnicoDetallePage({ params }: TecnicoProps) {
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
                        title="INFORME TÉCNICO"
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
                            <p><strong>Fecha: </strong>{garantia.fechas.revision || garantia.fechas.ingreso}</p>
                            <p><strong>Correo: </strong>{garantia.cliente.correo}</p>
                        </div>
                    </InfoCard>

                    <InfoCard title="Condiciones Generales">
                        <div>
                            <p><strong>Técnico Asignado: </strong>{garantia.tecnico.asignado}</p>
                            <p><strong>Marca: </strong>{garantia.equipo.marca}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Datos del Equipo"
                        className="col-span-6"
                    >
                        <div>
                            <p><strong>Modelo: </strong>{garantia.equipo.modelo}</p>
                            <p><strong>Número de serie: </strong>{garantia.equipo.serie}</p>
                            <p><strong>Descripcion del Problema: </strong>{garantia.ingreso.problemaReportado}</p>
                        </div>

                        <div>
                            <p><strong>Código Interno: </strong>{garantia.codigo}</p>
                            <p><strong>Fecha de Compra: </strong>{garantia.equipo.fechaCompra}</p>
                            <p><strong>Revisión y Diagnóstico: </strong>{garantia.tecnico.revision}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Estética"
                        className="col-span-3"
                    >
                        <div className="col-span-2">
                            <p>{garantia.ingreso.estetica}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Revisión y diagnóstico"
                        className="col-span-3"
                    >
                        <div className="col-span-2">
                            <p>{garantia.tecnico.revision}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Causas del Problema"
                        className="col-span-3"
                    >
                        <div className="col-span-2">
                            <p>{garantia.ingreso.problemaReportado}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Solución"
                        className="col-span-3"
                    >
                        <div className="col-span-2">
                            <p>{garantia.tecnico.solucion}</p>
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