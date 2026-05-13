import { EgresoProps } from "../../interfaces";

import { InfoCard } from "../../components/cards-info/cards-info";
import { InfoUser, DocumentTitle, TopHeader } from "../../components/cards-info/detail-header";
import { DocumentActions } from "../../components/cards-info/document-actions";
import { GridContent } from "../../components/cards-info/detail-grid";
import { ContactInfoCard } from "../../components/cards-info/cards-info";

import egresoData from "../../data/egreso.json";
import 'font-awesome/css/font-awesome.min.css';

export default async function EgresoDetallePage({ params }: EgresoProps) {
    const { id } = await params;

    const egreso = egresoData.find(
        (item) => item.id === Number(id)
    );

    if (!egreso) {
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
                        codigo={egreso.codigo}
                        ruc={egreso.ruc}
                    />

                    <DocumentTitle
                        title="GUÍA DE INGRESO"
                    />

                    <DocumentActions />
                </TopHeader>
                <GridContent>
                    <InfoCard title="Contacto Cliente">
                        <div>
                            <p><strong>Empresa: </strong>EMPRESA</p>
                            <p><strong>RUC: </strong>{egreso.ruc}</p>
                            <p><strong>Teléfono: </strong>TELEFONO</p>
                            <p><strong>Dirección: </strong>DIRECCION</p>
                        </div>

                        <div>
                            <p><strong>Contacto: </strong>{egreso.cliente}</p>
                            <p><strong>Fecha: </strong>{egreso.fecha}</p>
                            <p><strong>Correo: </strong>EMAIL</p>
                        </div>
                    </InfoCard>

                    <InfoCard title="Condiciones Generales">
                        <div>
                            <p><strong>Técnico Asignado: </strong>egreso</p>
                            <p><strong>Motivo: </strong>MOTIVO</p>
                            <p><strong>Marca: </strong>{egreso.marca}</p>
                            <p><strong>Asunto: </strong>ASUNTO</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Datos del Equipo"
                        className="col-span-6"
                    >
                        <div>
                            <p><strong>Modelo: </strong>MODELO</p>
                            <p><strong>Número de serie: </strong>{egreso.serie}</p>
                        </div>

                        <div>
                            <p><strong>Código Interno: </strong>{egreso.codigo}</p>
                            <p><strong>Fecha de Compra: </strong>{egreso.fecha}</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Descripción del Problema"
                        className="col-span-2"
                    >
                        <div>
                            <p>DESCRIPCIÓN</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Revisión y diagnóstico"
                        className="col-span-2"
                    >
                        <div>
                            <p>DESCRIPCIÓN</p>
                        </div>
                    </InfoCard>

                    <InfoCard
                        title="Recomendaciones"
                        className="col-span-2"
                    >
                        <div>
                            <p>DESCRIPCIÓN</p>
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