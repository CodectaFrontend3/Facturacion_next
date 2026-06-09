import { IngresoProps } from "../../interfaces";

import { ContactInfoCard, InfoCard } from "../../components/cards-info/cards-info";
import { InfoUser, DocumentTitle, TopHeader } from "../../components/cards-info/detail-header";
import { DocumentActions } from "../../components/cards-info/document-actions";
import { GridContent } from "../../components/cards-info/detail-grid";

import ingresoData from "../../data/ingreso.json";
import 'font-awesome/css/font-awesome.min.css';

export default async function IngresoDetallesPage({ params }: IngresoProps) {
    const { id } = await params;

    const ingreso = ingresoData.find(
        (item) => item.id === Number(id)
    );

    if (!ingreso) {
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
                        codigo={ingreso.codigo}
                        ruc={ingreso.ruc}
                    />
                    <DocumentTitle
                        title="GUÍA DE INGRESO"
                    />
                    <DocumentActions />
                </TopHeader>
                <GridContent>
                    <InfoCard title="Contacto Cliente">
                        <div>
                            <p><strong>Empresa: </strong>{ingreso.empresa}</p>
                            <p><strong>RUC: </strong>{ingreso.ruc}</p>
                            <p><strong>Teléfono: </strong>{ingreso.telefono}</p>
                            <p><strong>Dirección: </strong>{ingreso.direccion}</p>
                        </div>

                        <div>
                            <p><strong>Contacto: </strong>{ingreso.cliente}</p>
                            <p><strong>Fecha: </strong>{ingreso.fecha}</p>
                            <p><strong>Correo: </strong>{ingreso.correo}</p>
                        </div>
                    </InfoCard>

                    <InfoCard title="Condiciones Generales">
                        <div>
                            <p><strong>Técnico Asignado: </strong>{ingreso.asignado}</p>
                            <p><strong>Marca: </strong>{ingreso.marca}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Datos del Equipo"
                        className="col-span-6"
                    >
                        <div>
                            <p><strong>Modelo: </strong>{ingreso.modelo}</p>
                            <p><strong>Número de serie: </strong>{ingreso.serie}</p>
                        </div>
                        <div>
                            <p><strong>Código Interno: </strong>{ingreso.codigo}</p>
                            <p><strong>Fecha de Compra: </strong>{ingreso.fecha}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Descripción del Problema"
                        className="col-span-2"
                    >
                        <div className="col-span-2">
                            <p>{ingreso.problema}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Revisión y diagnóstico"
                        className="col-span-2"
                    >
                        <div className="col-span-2">
                            <p>{ingreso.revision}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Estética"
                        className="col-span-2"
                    >
                        <div className="col-span-2">
                            <p>{ingreso.estetica}</p>
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